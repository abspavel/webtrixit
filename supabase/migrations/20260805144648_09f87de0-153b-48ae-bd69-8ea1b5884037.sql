-- Policies for the 'images' bucket
-- Allow public access to read
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update/delete their own uploads (or all if admin)
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
CREATE POLICY "Authenticated Update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
CREATE POLICY "Authenticated Delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'images');

-- Ensure grants for portfolio_projects and service_links
-- We need to ensure that the authenticated role has permissions to insert/update
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_projects TO authenticated;
GRANT SELECT ON public.portfolio_projects TO anon;
GRANT ALL ON public.portfolio_projects TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_links TO authenticated;
GRANT SELECT ON public.service_links TO anon;
GRANT ALL ON public.service_links TO service_role;
