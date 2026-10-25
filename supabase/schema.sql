-- ==============================================================================
-- Make My Marriage — Complete Supabase PostgreSQL Schema & Security Architecture
-- Source: database_architecture (1).md
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUM TYPES (Idempotent creation)
DO $$ BEGIN
    CREATE TYPE family_side_type AS ENUM ('Groom''s Side', 'Bride''s Side');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('owner', 'admin', 'member');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status_type AS ENUM ('Paid', 'Pending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    preferred_theme TEXT DEFAULT 'atelier-nuptials',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. WEDDINGS TABLE (Workspaces)
CREATE TABLE IF NOT EXISTS public.weddings (
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

-- 5. WEDDING MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.wedding_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    family_side family_side_type NOT NULL,
    role user_role_type NOT NULL DEFAULT 'member',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (wedding_id, user_id)
);

-- 6. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
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

-- 7. MESSAGES (CHAT) TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_name TEXT NOT NULL,
    family_side family_side_type NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. INVITATIONS TABLE (Team / Guest access tokens)
CREATE TABLE IF NOT EXISTS public.wedding_invitations (
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

-- 9. ACTIVITY LOGS (Audit trail)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    actor_name TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. INDEXES FOR HIGH PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_wedding_members_user ON public.wedding_members(user_id);
CREATE INDEX IF NOT EXISTS idx_wedding_members_wedding ON public.wedding_members(wedding_id);
CREATE INDEX IF NOT EXISTS idx_expenses_wedding ON public.expenses(wedding_id, family_side, payment_status);
CREATE INDEX IF NOT EXISTS idx_messages_wedding ON public.messages(wedding_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON public.wedding_invitations(token);
CREATE INDEX IF NOT EXISTS idx_weddings_slug ON public.weddings(invitation_slug) WHERE invitation_published = TRUE;

-- 11. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Security helper function: Check workspace membership
CREATE OR REPLACE FUNCTION public.is_workspace_member(ws_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.wedding_members
    WHERE wedding_id = ws_id AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Users can view profiles" ON public.profiles;
CREATE POLICY "Users can view profiles" ON public.profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- WEDDINGS POLICIES
DROP POLICY IF EXISTS "Members can view their wedding workspace" ON public.weddings;
CREATE POLICY "Members can view their wedding workspace" ON public.weddings
    FOR SELECT USING (public.is_workspace_member(id) OR invitation_published = true);

DROP POLICY IF EXISTS "Owners/Admins can update workspace" ON public.weddings;
CREATE POLICY "Owners/Admins can update workspace" ON public.weddings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.wedding_members
            WHERE wedding_id = id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        )
    );

DROP POLICY IF EXISTS "Authenticated users can create wedding" ON public.weddings;
CREATE POLICY "Authenticated users can create wedding" ON public.weddings
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- WEDDING MEMBERS POLICIES
DROP POLICY IF EXISTS "Members can view fellow wedding members" ON public.wedding_members;
CREATE POLICY "Members can view fellow wedding members" ON public.wedding_members
    FOR SELECT USING (public.is_workspace_member(wedding_id));

DROP POLICY IF EXISTS "Admins or owners can manage members" ON public.wedding_members;
CREATE POLICY "Admins or owners can manage members" ON public.wedding_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.wedding_members
            WHERE wedding_id = wedding_members.wedding_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        )
    );

-- EXPENSES POLICIES
DROP POLICY IF EXISTS "Members can view expenses" ON public.expenses;
CREATE POLICY "Members can view expenses" ON public.expenses
    FOR SELECT USING (public.is_workspace_member(wedding_id));

DROP POLICY IF EXISTS "Members can create expenses" ON public.expenses;
CREATE POLICY "Members can create expenses" ON public.expenses
    FOR INSERT WITH CHECK (public.is_workspace_member(wedding_id));

DROP POLICY IF EXISTS "Members can update expenses" ON public.expenses;
CREATE POLICY "Members can update expenses" ON public.expenses
    FOR UPDATE USING (public.is_workspace_member(wedding_id));

DROP POLICY IF EXISTS "Admins/Owners can delete expenses" ON public.expenses;
CREATE POLICY "Admins/Owners can delete expenses" ON public.expenses
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.wedding_members
            WHERE wedding_id = expenses.wedding_id AND user_id = auth.uid() AND role IN ('owner', 'admin')
        )
    );

-- MESSAGES POLICIES
DROP POLICY IF EXISTS "Members can view messages" ON public.messages;
CREATE POLICY "Members can view messages" ON public.messages
    FOR SELECT USING (public.is_workspace_member(wedding_id));

DROP POLICY IF EXISTS "Members can send messages" ON public.messages;
CREATE POLICY "Members can send messages" ON public.messages
    FOR INSERT WITH CHECK (public.is_workspace_member(wedding_id) AND auth.uid() = sender_id);

-- ACTIVITY LOGS POLICIES
DROP POLICY IF EXISTS "Members can view activity logs" ON public.activity_logs;
CREATE POLICY "Members can view activity logs" ON public.activity_logs
    FOR SELECT USING (public.is_workspace_member(wedding_id));

DROP POLICY IF EXISTS "Members can insert activity logs" ON public.activity_logs;
CREATE POLICY "Members can insert activity logs" ON public.activity_logs
    FOR INSERT WITH CHECK (public.is_workspace_member(wedding_id));

-- 12. AUTOMATED PROFILE CREATION ON USER SIGNUP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Family Member'),
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 13. REALTIME REPLICATION (For instant chat, outlays, and alerts)
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
EXCEPTION WHEN others THEN null;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
EXCEPTION WHEN others THEN null;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.weddings;
EXCEPTION WHEN others THEN null;
END $$;
