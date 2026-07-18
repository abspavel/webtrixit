-- =========================================================================
-- Webtrix IT Solution — Supabase schema
-- আপনার Supabase project-এর SQL Editor-এ পুরো ফাইলটি একবার run করুন।
-- Dashboard → SQL Editor → New query → paste → Run
-- =========================================================================

-- 1) Leads table (contact + service form submissions)
CREATE TABLE IF NOT EXISTS public.leads (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  phone       text NOT NULL,
  email       text,
  service     text,
  budget      text,
  message     text,
  source_page text,
  status      text NOT NULL DEFAULT 'new', -- new | contacted | won | lost
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx     ON public.leads (status);

-- Data API grants (service_role writes via server function; admin dashboard reads as authenticated)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 2) Roles (admin panel)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role    public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL    ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3) Security-definer helper — avoids recursive RLS on user_roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 4) Policies

-- Leads: only admins can read/update/delete via RLS. Inserts happen through
-- the service_role from the server function (bypasses RLS).
DROP POLICY IF EXISTS "admins read leads"   ON public.leads;
DROP POLICY IF EXISTS "admins update leads" ON public.leads;
DROP POLICY IF EXISTS "admins delete leads" ON public.leads;

CREATE POLICY "admins read leads"   ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- user_roles: users can read their own row
DROP POLICY IF EXISTS "users read own roles" ON public.user_roles;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- =========================================================================
-- Admin user সেটআপ:
-- Dashboard → Authentication → Users → Add user (email + password) দিয়ে
-- একটি admin user তৈরি করুন, তারপর সেই user-এর id কপি করে নিচের query
-- চালান (YOUR-USER-UUID পরিবর্তন করে):
--
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('YOUR-USER-UUID', 'admin');
-- =========================================================================


-- =========================================================================
-- service_links: প্রতিটি সার্ভিসের জন্য admin-controlled demo ও sale URL
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.service_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_slug text NOT NULL UNIQUE,
  demo_url text,
  sale_url text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

GRANT SELECT ON public.service_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.service_links TO authenticated;
GRANT ALL ON public.service_links TO service_role;

ALTER TABLE public.service_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read service_links" ON public.service_links;
DROP POLICY IF EXISTS "admins write service_links" ON public.service_links;
DROP POLICY IF EXISTS "admins update service_links" ON public.service_links;
DROP POLICY IF EXISTS "admins delete service_links" ON public.service_links;

CREATE POLICY "public read service_links"
  ON public.service_links FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "admins write service_links"
  ON public.service_links FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins update service_links"
  ON public.service_links FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete service_links"
  ON public.service_links FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
