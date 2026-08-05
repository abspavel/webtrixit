-- 1. Leads Policies
CREATE POLICY "Admins can view leads" ON public.leads
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads" ON public.leads
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads" ON public.leads
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 2. User Roles Policies
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Service Links Policies
CREATE POLICY "Public can view service links" ON public.service_links
FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage service links" ON public.service_links
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Portfolio Projects Policies
CREATE POLICY "Public can view active portfolio projects" ON public.portfolio_projects
FOR SELECT TO anon, authenticated
USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage portfolio projects" ON public.portfolio_projects
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5. Revoke public execute on SECURITY DEFINER function to address linter warnings
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
