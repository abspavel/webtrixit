## বর্তমান অবস্থা

মোট ১১টি সার্ভিসের মধ্যে **২টির** আলাদা ডেডিকেটেড পেজ আছে:
- ✅ `/services/readymade-ecommerce-website` — `services.readymade-ecommerce-website.tsx`
- ✅ `/services/facebook-business-page-setup` — `services.facebook-business-page-setup.tsx`

বাকি **৯টি** সার্ভিস এখন dynamic template `services.$slug.tsx` দিয়ে render হচ্ছে (আলাদা ফাইল নেই)।

## প্ল্যান

নিচের ৯টি সার্ভিসের জন্য আলাদা ডেডিকেটেড route file তৈরি করব:

1. `services.landing-page-design.tsx`
2. `services.ecommerce-website-design.tsx`
3. `services.lms-site-development.tsx`
4. `services.custom-websites.tsx`
5. `services.software-development.tsx`
6. `services.smm-panel-website.tsx`
7. `services.ai-video-ads.tsx`
8. `services.facebook-pixel-setup.tsx`
9. `services.logo-cover-poster-design.tsx`

### প্রতিটি ফাইলের গঠন

প্রতিটি ফাইল হবে thin wrapper — `services-data.ts` থেকে সেই সার্ভিসের ডেটা নিয়ে বর্তমান dynamic template-এর মতোই সেকশন render করবে (hero, why/effectiveness/benefits, process + features, live demo embed, service-specific FAQ, lead form, WhatsApp CTA)। ফলে content ও design একই থাকবে, শুধু URL ও route আলাদা হবে — future-এ কোনো নির্দিষ্ট সার্ভিসের জন্য custom section/package/pricing যোগ করা সহজ হবে (যেমনটা readymade-ecommerce ও facebook-page-setup পেজে করা হয়েছে)।

### Route precedence

TanStack Router-এ static route (`/services/landing-page-design`) dynamic route (`/services/$slug`) কে overrides করে, তাই `services.$slug.tsx` fallback হিসেবে থেকে যাবে — কোনো conflict হবে না, `routeTree.gen.ts` auto-regenerate হবে।

### Shared component

Code duplication এড়াতে একটি shared component `src/components/ServiceDetail.tsx` তৈরি করব যেটা `services.$slug.tsx`-এর বর্তমান UI ধারণ করবে। প্রতিটি নতুন dedicated route file এই component-কে সেই সার্ভিসের slug দিয়ে render করবে। এতে ১টি জায়গায় edit করলেই সব পেজে reflect হবে।

### Nav ও index পেজে কোনো পরিবর্তন লাগবে না

`Link to="/services/$slug" params={{ slug }}` type-safe থাকবে — dynamic route এখনো registered।

## ফাইল পরিবর্তনের তালিকা

- **নতুন:** `src/components/ServiceDetail.tsx` (existing `services.$slug.tsx` UI extracted)
- **নতুন:** উপরের ৯টি route file
- **আপডেট:** `src/routes/services.$slug.tsx` → নতুন `<ServiceDetail slug={slug} />` ব্যবহার করবে
- **অটো-জেনারেটেড:** `src/routeTree.gen.ts` (Vite plugin regenerate করবে)
