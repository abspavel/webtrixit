import {
  Rocket, ShoppingCart, GraduationCap, Code2, Layers, Cpu, Server,
  Video, Facebook, Target, Palette, type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  slug: string;
  icon: LucideIcon;
  title: string;
  titleBn: string;
  desc: string;
  tagline: string;
  why: string[];
  effectiveness: string[];
  benefits: string[];
  useCases: string[];
  /** আপনার লাইভ ডেমো ওয়েবসাইটের URL এখানে দিন। */
  demoUrl: string;
  demoLabel: string;
};

export const services: ServiceItem[] = [
  {
    slug: "landing-page-design",
    icon: Rocket,
    title: "ল্যান্ডিং পেজ ডিজাইন",
    titleBn: "ল্যান্ডিং পেজ ডিজাইন",
    desc: "লঞ্চ, অ্যাড ও লিড ক্যাপচারের জন্য হাই-কনভার্টিং সিঙ্গেল পেজ।",
    tagline: "একটি স্মার্ট ল্যান্ডিং পেজই আপনার অ্যাডের ROI কয়েকগুণ বাড়িয়ে দিতে পারে।",
    why: [
      "Facebook / Google অ্যাড চালালে ট্রাফিক নষ্ট না করে সরাসরি কনভার্শনে নিতে ল্যান্ডিং পেজ অপরিহার্য।",
      "একটি ফোকাসড পেজ ভিজিটরের মনোযোগ ধরে রাখে এবং সরাসরি অ্যাকশনে (Buy / Call / Signup) নিয়ে যায়।",
      "নতুন প্রোডাক্ট বা অফার লঞ্চের জন্য দ্রুত এবং টার্গেটেড উপস্থিতি তৈরি করে।",
    ],
    effectiveness: [
      "কনভার্শন-ফোকাসড স্ট্রাকচার — Hero, Problem, Solution, Social Proof, CTA।",
      "মোবাইল-ফার্স্ট, ২ সেকেন্ডে লোড হয় এমন লাইটওয়েট বিল্ড।",
      "A/B টেস্টিং রেডি এবং Facebook Pixel + GA4 ইন্টিগ্রেটেড।",
    ],
    benefits: [
      "৩–৫× বেশি লিড / সেল, একই অ্যাড বাজেটে।",
      "Bounce rate কমে, Ad Quality Score বেড়ে CPC কমে।",
      "প্রফেশনাল ব্র্যান্ড ইমেজ, যা ট্রাস্ট বাড়ায়।",
    ],
    useCases: [
      "প্রোডাক্ট / কোর্স লঞ্চ",
      "লিড জেনারেশন ক্যাম্পেইন",
      "ইভেন্ট রেজিস্ট্রেশন",
      "অ্যাপ ডাউনলোড প্রোমোশন",
    ],
    demoUrl: "https://example.com/demo-landing",
    demoLabel: "লাইভ ল্যান্ডিং পেজ ডেমো",
  },
  {
    slug: "ecommerce-website-design",
    icon: ShoppingCart,
    title: "ই-কমার্স ওয়েবসাইট ডিজাইন",
    titleBn: "ই-কমার্স ওয়েবসাইট ডিজাইন",
    desc: "কাস্টম অনলাইন স্টোর — কার্ট, চেকআউট ও পেমেন্ট গেটওয়ে সঠিকভাবে সেটআপ।",
    tagline: "আপনার ব্যবসাকে ২৪/৭ চলমান একটি অনলাইন স্টোরে রূপান্তর করুন।",
    why: [
      "ফেসবুক পেজে অর্ডার নেওয়ার চেয়ে নিজের স্টোরে বহুগুণ বেশি অর্ডার এবং কম manual ঝামেলা।",
      "কাস্টমার নিজেই প্রোডাক্ট দেখে, ভ্যারিয়েন্ট বেছে, পেমেন্ট করে অর্ডার সম্পন্ন করতে পারে।",
      "Retargeting, Upsell, Discount — সবই automation-এ চলে।",
    ],
    effectiveness: [
      "Product catalogue, cart, checkout, order management — সব built-in।",
      "bKash, Nagad, SSLCommerz, Stripe সহ সব পেমেন্ট গেটওয়ে ইন্টিগ্রেশন।",
      "Inventory, coupon, shipping zone, invoice — full admin panel।",
    ],
    benefits: [
      "manual অর্ডার নেওয়ার ঝামেলা শেষ — সব automated।",
      "একই ভিজিটর থেকে বেশি সেল (upsell, related products)।",
      "Analytics ও Pixel দিয়ে সঠিক ROAS ট্র্যাক করা যায়।",
    ],
    useCases: [
      "ফ্যাশন / ক্লোদিং ব্র্যান্ড",
      "ইলেকট্রনিক্স স্টোর",
      "গ্রোসারি / ফুড ডেলিভারি",
      "ডিজিটাল প্রোডাক্ট",
    ],
    demoUrl: "https://example.com/demo-ecommerce",
    demoLabel: "লাইভ ই-কমার্স ডেমো",
  },
  {
    slug: "readymade-ecommerce-website",
    icon: Layers,
    title: "রেডিমেড ই-কমার্স ওয়েবসাইট",
    titleBn: "রেডিমেড ই-কমার্স ওয়েবসাইট",
    desc: "প্রস্তুত, প্রমাণিত টেমপ্লেটে দ্রুত অনলাইন স্টোর লঞ্চ — আপনার জন্য কনফিগার করে দেওয়া।",
    tagline: "মাত্র ৪৮ ঘণ্টায় আপনার পুরোপুরি প্রস্তুত অনলাইন স্টোর।",
    why: [
      "কাস্টম ডেভেলপমেন্টের সময় ও খরচ ছাড়াই দ্রুত ব্যবসা শুরু করা যায়।",
      "Proven, tested template — যাতে কনভার্শন ও UX আগে থেকেই optimized।",
      "শুধু প্রোডাক্ট আর ব্র্যান্ডিং যোগ করলেই সাইট লাইভ।",
    ],
    effectiveness: [
      "Pre-built layout, category, checkout — শুধু কনটেন্ট বসিয়ে launch।",
      "bKash / Nagad / COD সহ Bangladesh-ready payment।",
      "Mobile responsive, fast, SEO-friendly।",
    ],
    benefits: [
      "কম খরচে দ্রুত অনলাইনে আসতে পারবেন।",
      "প্রথম দিন থেকেই অর্ডার নিতে পারবেন।",
      "পরবর্তীতে সহজে upgrade / customize করা যায়।",
    ],
    useCases: [
      "নতুন উদ্যোক্তা / startup",
      "Facebook থেকে website-এ shift",
      "সিজনাল / ক্যাম্পেইন স্টোর",
    ],
    demoUrl: "https://example.com/demo-readymade",
    demoLabel: "রেডিমেড স্টোর ডেমো",
  },
  {
    slug: "lms-site-development",
    icon: GraduationCap,
    title: "LMS সাইট ডেভেলপমেন্ট",
    titleBn: "LMS সাইট ডেভেলপমেন্ট",
    desc: "ফুল-ফিচার লার্নিং প্ল্যাটফর্ম — কোর্স, কুইজ, স্টুডেন্ট ও পেমেন্ট সহ।",
    tagline: "আপনার কোর্স বিক্রি করুন নিজের ব্র্যান্ডে, ১০০% profit নিজে রাখুন।",
    why: [
      "Facebook group বা YouTube-এ কোর্স চালানোর সীমাবদ্ধতা থেকে মুক্তি।",
      "স্টুডেন্ট ট্র্যাকিং, কুইজ, সার্টিফিকেট — একটি প্ল্যাটফর্মে সব।",
      "Course sell থেকে subscription — সব monetization model support করে।",
    ],
    effectiveness: [
      "Course, module, lesson, video, quiz, assignment management।",
      "Student dashboard, progress tracking, certificate generation।",
      "Payment gateway ইন্টিগ্রেশন — one-time বা subscription।",
    ],
    benefits: [
      "নিজের ব্র্যান্ডে scalable কোর্স ব্যবসা।",
      "স্টুডেন্ট ডেটা ও কমিউনিটি নিজের হাতে।",
      "সময়ের সাথে recurring revenue বাড়তে থাকে।",
    ],
    useCases: [
      "একাডেমিক কোচিং",
      "স্কিল-বেসড অনলাইন কোর্স (Freelancing, Design, IT)",
      "কর্পোরেট ট্রেনিং প্ল্যাটফর্ম",
    ],
    demoUrl: "https://example.com/demo-lms",
    demoLabel: "LMS প্ল্যাটফর্ম ডেমো",
  },
  {
    slug: "custom-websites",
    icon: Code2,
    title: "কাস্টম ওয়েবসাইট",
    titleBn: "কাস্টম ওয়েবসাইট",
    desc: "পোর্টফোলিও, বিজনেস সাইট, ডিরেক্টরি, বুকিং সিস্টেম — আপনার প্রয়োজন অনুযায়ী তৈরি।",
    tagline: "আপনার ইউনিক আইডিয়ার জন্য সম্পূর্ণ কাস্টম, স্কেলেবল ওয়েবসাইট।",
    why: [
      "Template দিয়ে যা সম্ভব নয়, সেসব ফিচার ও ডিজাইন কাস্টম বিল্ডে পাওয়া যায়।",
      "আপনার ব্যবসার unique workflow অনুযায়ী তৈরি।",
      "Long-term scalability এবং ownership।",
    ],
    effectiveness: [
      "Requirement analysis → design → development → launch।",
      "Modern tech stack — fast, secure, SEO-optimized।",
      "Full admin panel, content management ও analytics।",
    ],
    benefits: [
      "প্রতিযোগীদের থেকে সম্পূর্ণ আলাদা identity।",
      "যেকোনো ফিচার / integration যোগ করা যায়।",
      "নিজের ডেটা ও কোডের সম্পূর্ণ মালিকানা।",
    ],
    useCases: [
      "কর্পোরেট / এজেন্সি ওয়েবসাইট",
      "পোর্টফোলিও / পার্সোনাল ব্র্যান্ড",
      "ডিরেক্টরি / লিস্টিং সাইট",
      "বুকিং / অ্যাপয়েন্টমেন্ট সিস্টেম",
    ],
    demoUrl: "https://example.com/demo-custom",
    demoLabel: "কাস্টম ওয়েবসাইট ডেমো",
  },
  {
    slug: "software-development",
    icon: Cpu,
    title: "সফটওয়্যার ডেভেলপমেন্ট",
    titleBn: "সফটওয়্যার ডেভেলপমেন্ট",
    desc: "আপনার ওয়ার্কফ্লো অনুযায়ী ওয়েব অ্যাপ, ড্যাশবোর্ড ও ইন্টারনাল টুল।",
    tagline: "আপনার ম্যানুয়াল কাজগুলোকে automation-এ রূপান্তর করুন।",
    why: [
      "Excel / Google Sheet-এ manual কাজ scale করার সীমা আছে।",
      "টিম, ইনভেন্টরি, sales, HR — সব একটি সিস্টেমে থাকলে ভুল কমে।",
      "Data-driven decision-এর জন্য central dashboard লাগে।",
    ],
    effectiveness: [
      "Custom web app, ERP, CRM, POS, dashboard — full-stack development।",
      "User role, permission, security — enterprise-grade।",
      "Cloud-hosted, scalable, mobile responsive।",
    ],
    benefits: [
      "কাজের গতি ও accuracy বহুগুণ বাড়ে।",
      "কর্মী ও অপারেশনাল খরচ কমে।",
      "Real-time reporting ও visibility।",
    ],
    useCases: [
      "ইনভেন্টরি / স্টক ম্যানেজমেন্ট",
      "CRM / লিড ম্যানেজমেন্ট",
      "POS / বিলিং সিস্টেম",
      "HR / অ্যাটেনডেন্স সিস্টেম",
    ],
    demoUrl: "https://example.com/demo-software",
    demoLabel: "সফটওয়্যার ডেমো",
  },
  {
    slug: "smm-panel-website",
    icon: Server,
    title: "SMM প্যানেল ওয়েবসাইট",
    titleBn: "SMM প্যানেল ওয়েবসাইট",
    desc: "সম্পূর্ণ SMM প্যানেল — সার্ভিস, অর্ডার, API প্রোভাইডার ও পেমেন্ট ইন্টিগ্রেশন সহ।",
    tagline: "নিজের SMM প্যানেল চালিয়ে recurring income তৈরি করুন।",
    why: [
      "Reseller ব্যবসার একটি লাভজনক ও দ্রুত বর্ধনশীল model।",
      "একবার সেটআপ করলে automation-এ চলে, কম হাত লাগে।",
      "API-এর মাধ্যমে বড় provider-দের সার্ভিস নিজের ব্র্যান্ডে বিক্রি।",
    ],
    effectiveness: [
      "User panel, admin panel, service list, order automation।",
      "Multiple provider API ইন্টিগ্রেশন।",
      "bKash, Nagad, crypto সহ payment gateway।",
    ],
    benefits: [
      "24/7 automated order processing।",
      "Passive recurring revenue।",
      "নিজের ব্র্যান্ডে সম্পূর্ণ business ownership।",
    ],
    useCases: [
      "সোশ্যাল মিডিয়া রিসেলার",
      "ডিজিটাল মার্কেটিং এজেন্সি অ্যাড-অন",
      "ফ্রিল্যান্সার সার্ভিস প্ল্যাটফর্ম",
    ],
    demoUrl: "https://example.com/demo-smm",
    demoLabel: "SMM প্যানেল ডেমো",
  },
  {
    slug: "ai-video-ads",
    icon: Video,
    title: "AI ভিডিও ক্রিয়েশন / অ্যাড",
    titleBn: "AI ভিডিও ক্রিয়েশন / অ্যাড",
    desc: "Facebook, Instagram ও TikTok-এর জন্য scroll থামানো AI-generated ভিডিও অ্যাড।",
    tagline: "কম খরচে হাই-কোয়ালিটি ভিডিও অ্যাড, যা scroll থামায়।",
    why: [
      "ভিডিও অ্যাড static image-এর তুলনায় ৩–৫× বেশি engagement আনে।",
      "AI দিয়ে কম সময়ে অনেকগুলো ভ্যারিয়েন্ট তৈরি করে A/B টেস্ট করা যায়।",
      "শুটিং, মডেল, ভয়েস আর্টিস্টের খরচ ছাড়াই প্রফেশনাল ভিডিও।",
    ],
    effectiveness: [
      "AI script + voiceover + visual — end-to-end production।",
      "Bangla ও English voiceover, brand-matched visual style।",
      "Multiple aspect ratio (9:16, 1:1, 16:9) — Facebook / Reels / TikTok।",
    ],
    benefits: [
      "Ad creative খরচ ৭০%+ কমে।",
      "দ্রুত iterate করা যায় — winning ad খুঁজে পাওয়া সহজ।",
      "উচ্চ CTR ও কম CPC।",
    ],
    useCases: [
      "প্রোডাক্ট অ্যাড / ডেমো",
      "ব্র্যান্ড অ্যাওয়ারনেস ভিডিও",
      "এক্সপ্লেইনার / টেস্টিমোনিয়াল ভিডিও",
    ],
    demoUrl: "https://example.com/demo-ai-video",
    demoLabel: "AI ভিডিও স্যাম্পল",
  },
  {
    slug: "facebook-business-page-setup",
    icon: Facebook,
    title: "ফেসবুক বিজনেস পেজ সেটআপ",
    titleBn: "ফেসবুক বিজনেস পেজ সেটআপ",
    desc: "শূন্য থেকে প্রফেশনাল পেজ সেটআপ, ব্র্যান্ডিং, সেকশন ও অপটিমাইজেশন।",
    tagline: "প্রথম দর্শনেই কাস্টমারের ট্রাস্ট তৈরি করে এমন পেজ।",
    why: [
      "একটি ভালো পেজ = brand-এর first impression।",
      "সঠিক সেটআপ ছাড়া Ad approval, verification, monetization কঠিন।",
      "Professional look = higher conversion।",
    ],
    effectiveness: [
      "Business Manager, Page, category, contact — সঠিকভাবে সেটআপ।",
      "Cover, profile, CTA button, Shop, About — brand-consistent।",
      "Response automation, message template ও review setup।",
    ],
    benefits: [
      "Ad চালানোর জন্য পেজ ready ও optimized।",
      "কাস্টমারের ট্রাস্ট ও credibility বাড়ে।",
      "Organic reach বাড়ার সুযোগ।",
    ],
    useCases: [
      "নতুন ব্যবসা / ব্র্যান্ড লঞ্চ",
      "পুরনো পেজ রিব্র্যান্ডিং",
      "ভেরিফিকেশন-রেডি পেজ",
    ],
    demoUrl: "https://facebook.com/",
    demoLabel: "স্যাম্পল পেজ",
  },
  {
    slug: "facebook-pixel-setup",
    icon: Target,
    title: "ফেসবুক পিক্সেল সেটআপ",
    titleBn: "ফেসবুক পিক্সেল সেটআপ",
    desc: "Pixel, event, Conversions API ও অডিয়েন্স ট্র্যাকিং — সঠিকভাবে ইনস্টল।",
    tagline: "ভুল পিক্সেল সেটআপ = আপনার অ্যাড বাজেটের অর্ধেক নষ্ট।",
    why: [
      "সঠিক event tracking ছাড়া Facebook AI আপনার customer খুঁজে দিতে পারে না।",
      "iOS 14+ update-এর পর CAPI ছাড়া tracking অসম্পূর্ণ।",
      "Retargeting ও Lookalike audience তৈরির ভিত্তি।",
    ],
    effectiveness: [
      "Pixel + Conversions API (CAPI) — server-side tracking।",
      "Standard event (View, AddToCart, Purchase) + custom event।",
      "Event Match Quality optimization ও domain verification।",
    ],
    benefits: [
      "CPA কমে, ROAS বাড়ে।",
      "সঠিক audience-এ অ্যাড পৌঁছায়।",
      "Retargeting-এ higher accuracy।",
    ],
    useCases: [
      "ই-কমার্স স্টোর ট্র্যাকিং",
      "লিড ফর্ম কনভার্শন",
      "কাস্টম ফানেল ট্র্যাকিং",
    ],
    demoUrl: "https://example.com/demo-pixel-report",
    demoLabel: "স্যাম্পল পিক্সেল রিপোর্ট",
  },
  {
    slug: "logo-cover-poster-design",
    icon: Palette,
    title: "লোগো, কভার ও পোস্টার ডিজাইন",
    titleBn: "লোগো, কভার ও পোস্টার ডিজাইন",
    desc: "বিজনেস লোগো, ফেসবুক কভার ও সোশ্যাল মিডিয়া পোস্টার ডিজাইন — যা আলাদা করে দেখায়।",
    tagline: "আপনার ব্র্যান্ডের visual identity — যা মানুষ মনে রাখে।",
    why: [
      "প্রথম ৩ সেকেন্ডে ব্র্যান্ড চেনা যায় visual দিয়ে।",
      "Consistent design = professional ও trustworthy image।",
      "ভালো creative = higher engagement।",
    ],
    effectiveness: [
      "Concept + multiple revision + final vector files।",
      "Logo, cover, poster, ad creative — brand-guideline সহ।",
      "Print + digital দুই ফরম্যাটেই delivery।",
    ],
    benefits: [
      "Strong, memorable brand identity।",
      "Social media-এ ধারাবাহিক professional look।",
      "কাস্টমারের চোখে বিশ্বাসযোগ্যতা।",
    ],
    useCases: [
      "নতুন ব্র্যান্ড আইডেন্টিটি",
      "Facebook / IG ক্রিয়েটিভ প্যাক",
      "ইভেন্ট / ক্যাম্পেইন পোস্টার",
    ],
    demoUrl: "https://example.com/demo-design-portfolio",
    demoLabel: "ডিজাইন পোর্টফোলিও",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
