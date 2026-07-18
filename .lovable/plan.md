## যা যা ঠিক করব

### ১) সার্ভিস পেজ ক্লিকে সঙ্গে সঙ্গে লোড
- `src/router.tsx`-এ `defaultPreload: "intent"` + `defaultPreloadDelay: 50` যোগ — hover/touch-এই route + data preload হয়ে যাবে, ক্লিকে instant।
- হোমপেজ ও ServiceDetail-এর সব সার্ভিস `<Link>`-এ `preload="intent"` explicit করে দেব (যেখানে `<a href>` আছে সেগুলো `<Link to params>` এ রূপান্তর)।

### ২) প্রত্যেক সার্ভিসের আলাদা ডেডিকেটেড পেজ
- ১১টি সার্ভিসেরই আলাদা static route ফাইল ইতিমধ্যে আছে (verified)। নতুন কিছু তৈরির দরকার নেই — শুধু হোমপেজ থেকে সঠিক dedicated slug-এ link করা নিশ্চিত করব।

### ৩) পেজ নিচ থেকে লোড হওয়া বন্ধ (top থেকে লোড)
- Root route-এ একটি `scrollToTop` মেকানিজম: প্রতিটি route change-এ `window.scrollTo(0,0)` (RouterState subscribe)।
- `scrollRestoration` রাখব কিন্তু নতুন navigation-এ top forcing।
- Initial site load-এ যদি কোনো animation/reveal-এর কারণে "নিচ থেকে ওঠা" মনে হয়, `use-reveal.ts` hook-এ prefers-reduced-motion বা first-paint guard যোগ করব যেন hero সেকশন immediately visible।

### ৪) লোগো ঠিক করা (স্পষ্ট দৃশ্যমান)
- Dark navy theme-এ existing navy-on-transparent লোগো দেখা যাচ্ছে না। premium quality-তে নতুন লোগো generate করব:
  - "W" icon: electric blue + neon green gradient, gold accent dot
  - "WEBTRIX" wordmark: clean white
  - "IT SOLUTION" subtext: lavender/gold
  - Transparent background
- Navigation এবং Footer-এ সাদা pill background সরিয়ে সরাসরি transparent logo বসাব।

### ৫) Admin Panel-এ Demo/Sale লিংক ম্যানেজমেন্ট
- Supabase-এ নতুন table `service_links`:
  ```
  id, service_slug (unique), demo_url, sale_url, updated_at
  ```
  RLS: শুধু admin read/write; anon SELECT (কারণ সাইট এগুলো public পেজে দেখাবে)।
- Migration SQL `supabase-setup.sql`-এ যোগ করব (user run করবে)।
- `src/routes/admin.tsx`-এ ট্যাব বা সেকশন "সার্ভিস লিংক":
  - ১১টি সার্ভিসের list, প্রতিটির জন্য দুটি input (Demo URL, Sale URL) + Save।
- `src/lib/services-data.ts`-এর static `demoUrl` fallback হিসাবে থাকবে; ServiceDetail runtime-এ Supabase থেকে override fetch করবে (React Query, instant fallback → override on hydrate)।

## টেকনিক্যাল ডিটেইলস

- **Preload**: `createRouter({ defaultPreload: "intent", defaultPreloadDelay: 50 })`।
- **Scroll to top**: `__root.tsx`-এ:
  ```tsx
  const router = useRouter();
  useEffect(() => router.subscribe("onResolved", () => window.scrollTo(0,0)), []);
  ```
- **Logo**: `imagegen premium` transparent PNG, `src/assets/webtrix-logo-v2.png` হিসাবে; asset JSON আপডেট।
- **service_links fetch**: `getServiceLinks(slug)` server function, admin write server function `upsertServiceLink` `requireSupabaseAuth` + admin role check সহ।

## Files to touch
- `src/router.tsx` — preload config
- `src/routes/__root.tsx` — scroll-to-top on nav
- `src/routes/index.tsx` — Link preload, logo swap
- `src/components/ServiceDetail.tsx` — logo swap, dynamic demo url
- `src/routes/admin.tsx` — Service Links section
- `src/lib/services-data.ts` — নতুন logo import
- নতুন: `src/lib/service-links.functions.ts`
- `supabase-setup.sql` — service_links table + RLS
- নতুন asset: `src/assets/webtrix-logo-v2.png`
