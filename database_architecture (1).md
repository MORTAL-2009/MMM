# Make My Marriage — Supabase (PostgreSQL) Database Architecture

This document defines the complete Supabase PostgreSQL database schema, tables, relationships, indexes, Row Level Security (RLS) policies, and database functions for **Make My Marriage**.

---

## 1. Architectural Overview

Make My Marriage uses a **Multi-Tenant Workspace Model** in Supabase. Every workspace entity is bound to a `wedding_id` (Wedding Workspace).

### Core Tables Overview:

1. `profiles`: Extends `auth.users` with user display names and preferences.
2. `weddings`: Wedding workspace records including budget, bride/groom details, and invitation configurations.
3. `wedding_members`: Links `profiles` to `weddings` with workspace roles (`owner`, `admin`, `member`) and family sides (`Groom's Side`, `Bride's Side`).
4. `expenses`: All recorded wedding expenses, payer side, payment status, and notes.
5. `messages`: Real-time family chat messages.
6. `wedding_invitations`: Secure workspace invitation links and guest access tokens.
7. `notifications`: User-specific in-app alerts.
8. `activity_logs`: Audit trail for financial and workspace changes.

---

## 2. PostgreSQL Schema & Migrations

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------
-- 1. PROFILES TABLE
--------------------------------------------------
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    preferred_theme TEXT DEFAULT 'goldNoir',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------
-- 2. WEDDINGS (WORKSPACES) TABLE
--------------------------------------------------
CREATE TABLE public.weddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    bride_name TEXT NOT NULL,
    groom_name TEXT NOT NULL,
    wedding_date DATE NOT NULL,
    wedding_time TIME,
    venue_name TEXT NOT NULL,
    venue_address TEXT,
    total_budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_budget >= 0),
    invitation_slug TEXT UNIQUE,
    invitation_published BOOLEAN DEFAULT FALSE,
    invitation_message TEXT,
    rsvp_deadline DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------
-- 3. WEDDING MEMBERS TABLE
--------------------------------------------------
CREATE TYPE family_side_type AS ENUM ('Groom''s Side', 'Bride''s Side');
CREATE TYPE user_role_type AS ENUM ('owner', 'admin', 'member');

CREATE TABLE public.wedding_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    family_side family_side_type NOT NULL,
    role user_role_type NOT NULL DEFAULT 'member',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (wedding_id, user_id)
);

--------------------------------------------------
-- 4. EXPENSES TABLE
--------------------------------------------------
CREATE TYPE payment_status_type AS ENUM ('Paid', 'Pending');

CREATE TABLE public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    category TEXT NOT NULL,
    expense_date DATE DEFAULT CURRENT_DATE,
    payment_status payment_status_type DEFAULT 'Pending',
    family_side family_side_type NOT NULL,
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------
-- 5. MESSAGES (CHAT) TABLE
--------------------------------------------------
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_name TEXT NOT NULL,
    family_side family_side_type NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------
-- 6. INVITATIONS TABLE
--------------------------------------------------
CREATE TABLE public.wedding_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    invited_email TEXT NOT NULL,
    family_side family_side_type NOT NULL,
    role_to_assign user_role_type DEFAULT 'member',
    token TEXT NOT NULL UNIQUE,
    invited_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------
-- 7. ACTIVITY LOGS TABLE
--------------------------------------------------
CREATE TABLE public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    actor_name TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Database Indexes for High Performance

```sql
-- Indexes for workspace isolation & fast querying
CREATE INDEX idx_wedding_members_user ON public.wedding_members(user_id);
CREATE INDEX idx_expenses_wedding ON public.expenses(wedding_id, family_side, payment_status);
CREATE INDEX idx_messages_wedding ON public.messages(wedding_id, created_at DESC);
CREATE INDEX idx_invitations_token ON public.wedding_invitations(token);
CREATE INDEX idx_weddings_slug ON public.weddings(invitation_slug) WHERE invitation_published = TRUE;
```

---

## 4. Row Level Security (RLS) Policies

Enable security rules so members can only read and write data belonging to their workspace.

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

--------------------------------------------------
-- HELPER FUNCTION: Check Workspace Membership
--------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_workspace_member(ws_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.wedding_members
    WHERE wedding_id = ws_id AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

--------------------------------------------------
-- PROFILES POLICIES
--------------------------------------------------
CREATE POLICY "Users can view profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

--------------------------------------------------
-- WEDDINGS POLICIES
--------------------------------------------------
CREATE POLICY "Members can view their wedding workspace" ON public.weddings
    FOR SELECT USING (public.is_workspace_member(id) OR invitation_published = true);

CREATE POLICY "Owners/Admins can update workspace" ON public.weddings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.wedding_members
            WHERE wedding_id = id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        )
    );

--------------------------------------------------
-- EXPENSES POLICIES
--------------------------------------------------
CREATE POLICY "Members can view expenses" ON public.expenses
    FOR SELECT USING (public.is_workspace_member(wedding_id));

CREATE POLICY "Members can create expenses" ON public.expenses
    FOR INSERT WITH CHECK (public.is_workspace_member(wedding_id));

CREATE POLICY "Members can update expenses" ON public.expenses
    FOR UPDATE USING (public.is_workspace_member(wedding_id));

CREATE POLICY "Admins/Owners can delete expenses" ON public.expenses
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.wedding_members
            WHERE wedding_id = expenses.wedding_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        )
    );

--------------------------------------------------
-- MESSAGES POLICIES
--------------------------------------------------
CREATE POLICY "Members can view messages" ON public.messages
    FOR SELECT USING (public.is_workspace_member(wedding_id));

CREATE POLICY "Members can send messages" ON public.messages
    FOR INSERT WITH CHECK (public.is_workspace_member(wedding_id));
```

---

## 5. Automated Profile Trigger

Automatically create a profile entry whenever a new user signs up via Supabase Auth.

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Family Member'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```