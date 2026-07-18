## লক্ষ্য
"আমাদের কাজ" (Portfolio) ও প্রতিটি সার্ভিসের "লাইভ ডেমো" সেকশনে বাইরের `example.com` লিংকের বদলে আমাদের নিজস্ব তৈরি করা কয়েকটি ডেমো টেমপ্লেট পেজ দেখানো হবে। এই পেজগুলো শুধু দেখার জন্য — কোনো বাটন বা ফর্ম আসলে কাজ করবে না, শুধু UI/UX প্রদর্শন।

## যা তৈরি হবে

নতুন route folder: `src/routes/demo.*` (হেডার/ফুটার ছাড়া, পুরো ভিন্ন লে-আউটে যেন আসল সাইটের মতো দেখায়)।

৮টি ডেমো টেমপ্লেট পেজ:

1. `demo.luxe-landing.tsx` — ল্যান্ডিং পেজ (কোর্স/প্রোডাক্ট লঞ্চ)
2. `demo.kartplus-ecommerce.tsx` — ফ্যাশন ই-কমার্স হোম (প্রোডাক্ট গ্রিড, কার্ট আইকন)
3. `demo.freshcart-grocery.tsx` — গ্রোসারি স্টোর (ক্যাটাগরি + ডিল)
4. `demo.eduprime-lms.tsx` — LMS কোর্স ক্যাটালগ + লেসন প্রিভিউ
5. `demo.panelpro-smm.tsx` — SMM প্যানেল ড্যাশবোর্ড (অর্ডার/সার্ভিস তালিকা)
6. `demo.orbit-crm.tsx` — কাস্টম সফটওয়্যার ড্যাশবোর্ড (KPI কার্ড, চার্ট mockup)
7. `demo.pulseads-video.tsx` — AI ভিডিও অ্যাড শোকেস (থাম্বনেইল গ্রিড)
8. `demo.brandkit-design.tsx` — লোগো/কভার/পোস্টার শোকেস

প্রতিটি পেজে থাকবে:
- নিজস্ব mini-nav, hero, কনটেন্ট সেকশন, footer — সম্পূর্ণ ভিন্ন ভিজ্যুয়াল স্টাইল
- সব বাটন `type="button"` + `onClick={(e)=>e.preventDefault()}` অথবা শুধু visual (কোনো নেভিগেশন নেই)
- উপরে ছোট একটি "Demo Preview by Webtrix" ব্যানার (fixed, dismissable নয়) — যাতে ভিজিটর বোঝে এটি ডেমো
- `head()`-এ `robots: noindex`

## Wiring

- `src/lib/services-data.ts` — প্রতিটি সার্ভিসের `demoUrl` internal path-এ বদলে দেওয়া হবে (যেমন `/demo/luxe-landing`)
- `src/components/ServiceDetail.tsx` — iframe এখন internal demo route load করবে (same-origin, তাই নিশ্চিত embed হবে)
- `src/routes/services.readymade-ecommerce-website.tsx` — ৮টি টেমপ্লেট কার্ডের `demoUrl` আপডেট
- `src/routes/index.tsx` Portfolio — প্রতিটি কার্ডে `<Link to="/demo/...">` যোগ, "ডেমো দেখুন" বাটন

## টেকনিক্যাল

- প্রতিটি demo route standalone — `__root.tsx`-এর Outlet-এ render হবে, কিন্তু হেডার/ফুটার নেই (root এ কোনো global chrome নেই, ঠিক আছে)
- iframe embed করার সময় same-origin হওয়ায় CSP/X-Frame issue নেই
- সবগুলো Tailwind + inline SVG দিয়ে — কোনো নতুন dependency নেই
- সব text বাংলায়, Hind Siliguri font inherit করবে

## নয়

- কোনো backend/DB, কোনো real form submission, কোনো auth
- বিদ্যমান হোমপেজ কনটেন্ট বা স্টাইল পরিবর্তন — শুধু Portfolio কার্ডে link যোগ
