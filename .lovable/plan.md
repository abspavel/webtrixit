## লক্ষ্য
১) হোমপেজের contact form-ও Supabase-এ save করানো
২) `/auth` login + `/admin` protected dashboard বানানো যেখানে সব leads দেখা, filter, status update, delete করা যাবে

## ধাপসমূহ

### ধাপ ১ — Browser-side Supabase client
Browser থেকে login করতে হবে, তাই URL + **anon key** browser bundle-এ দরকার (এই দুটো public-safe)। যেহেতু আপনার saved secrets `MY_SUPABASE_*` server-only, একটা secure form খুলব যেখানে **একই দুটো value** `VITE_MY_SUPABASE_URL` ও `VITE_MY_SUPABASE_ANON_KEY` নামে paste করবেন — এগুলো browser-এ available হবে।

তারপর তৈরি করব:
- `src/integrations/supabase/client.ts` — browser client (anon key, session persist)
- `src/integrations/supabase/types.ts` — টেবিল type

### ধাপ ২ — হোমপেজ contact form wiring
`src/routes/index.tsx`-এ `Contact` section-এর form-কে state-driven করব, `submitLead` server fn call করব, success/error toast দেখাব (existing `ServiceLeadForm` pattern-এ), তারপর WhatsApp-এ redirect করব।

### ধাপ ৩ — Auth পেজ
`src/routes/auth.tsx` — email + password login form। `supabase.auth.signInWithPassword` → success হলে `/admin` এ navigate। এটা public route।

### ধাপ ৪ — Admin dashboard (protected)
- `src/routes/admin.tsx` — client-side gate:
  - `supabase.auth.getUser()` → না থাকলে `/auth` redirect
  - `has_role(uid, 'admin')` RPC call → না হলে "Access denied"
- Dashboard content:
  - সব leads table (name, phone, email, service, source_page, status, created_at)
  - Status filter (all / new / contacted / won / lost)
  - Search (name/phone)
  - প্রতিটি row-এ: status dropdown update, WhatsApp/Call/Email link, delete button
  - Real-time: `supabase.channel('leads').on('postgres_changes', ...)` — নতুন lead এলে auto-append
- Top-right এ signed-in email + Logout button

### ধাপ ৫ — Nav-এ ছোট Admin link
Footer-এ discreet "Admin" লিংক যাতে সহজে `/auth` খোলা যায়।

## টেকনিক্যাল বিস্তারিত
- Reads/writes সবই anon key দিয়ে RLS-এর মাধ্যমে হবে (ইতিমধ্যে migration-এ policies আছে: admin role read/update/delete করতে পারে)।
- Service role key server-only-ই থাকবে (`submitLead` server fn insert-এ ব্যবহার করে)।
- Session Supabase JS SDK-এর default localStorage-এ persist হবে।
- Toast জন্য existing shadcn `useToast` (`ServiceDetail.tsx`-এ ব্যবহৃত pattern) reuse করব।

## Approve করলে যা লাগবে
Secure form-এ **শুধু ২টি value** paste করবেন (আপনার Supabase dashboard → Settings → API থেকে — এগুলোই আগে দিয়েছিলেন, শুধু আবার VITE_ prefix-এ দরকার):
- `VITE_MY_SUPABASE_URL`
- `VITE_MY_SUPABASE_ANON_KEY`

তারপর সব code আমি সাজিয়ে দেব — আপনি `/auth` এ গিয়ে যেই admin user বানিয়েছেন সেটা দিয়ে login করলে `/admin`-এ সব leads দেখতে পাবেন।
