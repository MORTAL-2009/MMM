-- Make My Marriage: Initial Database Schema with Complete RLS Policies
-- Compatible with Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL DEFAULT '',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. WEDDINGS
CREATE TABLE IF NOT EXISTS public.weddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    bride_name TEXT NOT NULL,
    groom_name TEXT NOT NULL,
    wedding_date DATE NOT NULL,
    wedding_time TIME,
    venue_name TEXT NOT NULL,
    venue_address TEXT,
    total_budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_budget >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. WEDDING_MEMBERS
CREATE TABLE IF NOT EXISTS public.wedding_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    family_side TEXT NOT NULL CHECK (family_side IN ('groom', 'bride')),
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'invited', 'removed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_wedding_user UNIQUE(wedding_id, user_id)
);

-- 4. WEDDING_INVITATIONS (Internal family/admin member invites)
CREATE TABLE IF NOT EXISTS public.wedding_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    invited_email TEXT NOT NULL,
    role_to_assign TEXT NOT NULL DEFAULT 'member' CHECK (role_to_assign IN ('admin', 'member')),
    family_side TEXT NOT NULL DEFAULT 'groom' CHECK (family_side IN ('groom', 'bride')),
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    invited_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. EXPENSES
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    category TEXT NOT NULL CHECK (category IN (
        'Venue', 'Catering', 'Decoration', 'Clothing',
        'Photography', 'Transport', 'Gifts', 'Invitations', 'Other'
    )),
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_status TEXT NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Paid', 'Pending')),
    family_side TEXT NOT NULL CHECK (family_side IN ('groom', 'bride')),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. MESSAGES (Realtime family conversation)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL CHECK (char_length(trim(message_text)) > 0 AND char_length(message_text) <= 2000),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ
);

-- 7. WEDDING_PUBLIC_INVITATIONS (Digital Public Invitations)
CREATE TABLE IF NOT EXISTS public.wedding_public_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL UNIQUE REFERENCES public.weddings(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    is_published BOOLEAN NOT NULL DEFAULT false,
    custom_message TEXT,
    host_names TEXT,
    cover_image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    target_path TEXT,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. ACTIVITY_LOGS (Audit Trail)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_members_user ON public.wedding_members(user_id);
CREATE INDEX IF NOT EXISTS idx_members_wedding ON public.wedding_members(wedding_id);
CREATE INDEX IF NOT EXISTS idx_expenses_wedding ON public.expenses(wedding_id);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(wedding_id, category);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON public.expenses(wedding_id, expense_date);
CREATE INDEX IF NOT EXISTS idx_messages_wedding ON public.messages(wedding_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id, read_at);
CREATE INDEX IF NOT EXISTS idx_public_invitations_slug ON public.wedding_public_invitations(slug);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_public_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper security function: Check membership
CREATE OR REPLACE FUNCTION public.is_wedding_member(_wedding_id UUID, _user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.wedding_members
    WHERE wedding_id = _wedding_id AND user_id = _user_id AND status = 'active'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper security function: Check admin or owner role
CREATE OR REPLACE FUNCTION public.is_wedding_admin_or_owner(_wedding_id UUID, _user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.wedding_members
    WHERE wedding_id = _wedding_id AND user_id = _user_id AND status = 'active' AND role IN ('owner', 'admin')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- PROFILES Policies
CREATE POLICY "Users can view any profile" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- WEDDINGS Policies
CREATE POLICY "Members can view their wedding" ON public.weddings
  FOR SELECT USING (public.is_wedding_member(id, auth.uid()));

CREATE POLICY "Authenticated users can create weddings" ON public.weddings
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners and admins can update wedding details" ON public.weddings
  FOR UPDATE USING (public.is_wedding_admin_or_owner(id, auth.uid()));

-- WEDDING_MEMBERS Policies
CREATE POLICY "Members can view fellow members" ON public.wedding_members
  FOR SELECT USING (public.is_wedding_member(wedding_id, auth.uid()));

CREATE POLICY "Admins or owners can manage members" ON public.wedding_members
  FOR ALL USING (public.is_wedding_admin_or_owner(wedding_id, auth.uid()));

-- EXPENSES Policies
CREATE POLICY "Members can view expenses" ON public.expenses
  FOR SELECT USING (public.is_wedding_member(wedding_id, auth.uid()));

CREATE POLICY "Members can insert expenses" ON public.expenses
  FOR INSERT WITH CHECK (public.is_wedding_member(wedding_id, auth.uid()));

CREATE POLICY "Admins, owners or expense creators can update expenses" ON public.expenses
  FOR UPDATE USING (
    public.is_wedding_admin_or_owner(wedding_id, auth.uid()) OR created_by = auth.uid()
  );

CREATE POLICY "Admins or owners can delete expenses" ON public.expenses
  FOR DELETE USING (public.is_wedding_admin_or_owner(wedding_id, auth.uid()));

-- MESSAGES Policies
CREATE POLICY "Members can view messages" ON public.messages
  FOR SELECT USING (public.is_wedding_member(wedding_id, auth.uid()));

CREATE POLICY "Members can send messages" ON public.messages
  FOR INSERT WITH CHECK (
    public.is_wedding_member(wedding_id, auth.uid()) AND sender_id = auth.uid()
  );

-- PUBLIC INVITATIONS Policies (Public guest read access only for published ones)
CREATE POLICY "Public can view published invitations" ON public.wedding_public_invitations
  FOR SELECT USING (is_published = true);

CREATE POLICY "Members can view invitation draft" ON public.wedding_public_invitations
  FOR SELECT USING (public.is_wedding_member(wedding_id, auth.uid()));

CREATE POLICY "Admins or owners can update public invitations" ON public.wedding_public_invitations
  FOR ALL USING (public.is_wedding_admin_or_owner(wedding_id, auth.uid()));

-- ACTIVITY LOGS Policies
CREATE POLICY "Members can view activity logs" ON public.activity_logs
  FOR SELECT USING (public.is_wedding_member(wedding_id, auth.uid()));

CREATE POLICY "Members can insert activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (public.is_wedding_member(wedding_id, auth.uid()));

-- REALTIME publication setup
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
