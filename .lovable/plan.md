## লক্ষ্য
আপনার নিজের Supabase project কানেক্ট করা এবং leads + admin panel-এর ভিত্তি তৈরি করা।

## ধাপসমূহ

1. **Secure form open করা** — নিচের ৪টি secret-এর জন্য একটি secure form open করব যেখানে আপনি Supabase dashboard থেকে value গুলো paste করবেন:
   - `SUPABASE_URL` — Project URL (https://xxxxx.supabase.co)
   - `SUPABASE_ANON_KEY` — anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` — service role key (secret — কখনো frontend-এ যাবে না)
   - `SUPABASE_PROJECT_ID` — project reference id

2. **Supabase client সেটআপ** — `src/integrations/supabase/client.ts` (browser, anon key) এবং `src/integrations/supabase/client.server.ts` (server-only, service role) তৈরি করব। Env variables wire করব।

3. **Database schema (migration)** — তৈরি করব:
   - `leads` টেবিল (name, phone, service, message, source_page, status, created_at)
   - `app_role` enum + `user_roles` টেবিল + `has_role()` security definer function
   - RLS policies: anonymous users leads insert করতে পারবে; শুধু admin role read/update করতে পারবে
   - GRANT statements (anon: INSERT on leads; authenticated: SELECT/UPDATE via policy)

4. **Lead form wiring** — সব service page-এর form (এবং homepage contact form) Supabase-এ save করবে, তারপর WhatsApp-এ redirect করবে (বর্তমান UX অক্ষুণ্ণ রেখে)।

5. **Auth + Admin panel (পরের ধাপে চাইলে)** — email/password login, `/admin` protected route, leads dashboard (list, filter, status update)। এটি আপনি চাইলে পরে একই session-এ এগোতে পারি।

## এখন approve করলে
প্রথমে secure form open করে ৪টি credential চাইব। আপনি paste করে save করার পর বাকি ধাপ (client, schema, wiring) implement করব।

## নোট
আপনার SMS/OAuth-এর মতো auth provider এখন লাগছে না — শুধু email/password admin login-এই admin panel চালানো যাবে। Admin কে হবে (আপনি একা, নাকি একাধিক), সেটি step 5-এ ঢোকার আগে জানাবেন।