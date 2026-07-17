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
  /** Update this URL to point to your live demo website for this service. */
  demoUrl: string;
  demoLabel: string;
};

export const services: ServiceItem[] = [
  {
    slug: "landing-page-design",
    icon: Rocket,
    title: "Landing Page Design",
    titleBn: "ল্যান্ডিং পেজ ডিজাইন",
    desc: "High-converting single-page sites built for launches, ads and lead capture.",
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
    demoLabel: "Live Landing Page Demo",
  },
  {
    slug: "ecommerce-website-design",
    icon: ShoppingCart,
    title: "E-commerce Website Design",
    titleBn: "ই-কমার্স ওয়েবসাইট ডিজাইন",
    desc: "Custom online stores with cart, checkout and payment gateways done right.",
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
      "Fashion / Clothing brand",
      "Electronics store",
      "Grocery / Food delivery",
      "Digital products",
    ],
    demoUrl: "https://example.com/demo-ecommerce",
    demoLabel: "Live E-commerce Demo",
  },
  {
    slug: "readymade-ecommerce-website",
    icon: Layers,
    title: "Readymade E-commerce Website",
    titleBn: "রেডিমেড ই-কমার্স ওয়েবসাইট",
    desc: "Launch fast with a proven, ready-to-go store template — configured for you.",
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
      "Seasonal / campaign store",
    ],
    demoUrl: "https://example.com/demo-readymade",
    demoLabel: "Readymade Store Demo",
  },
  {
    slug: "lms-site-development",
    icon: GraduationCap,
    title: "LMS Site Development",
    titleBn: "LMS সাইট ডেভেলপমেন্ট",
    desc: "Full-featured learning platforms with courses, quizzes, students and payments.",
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
      "Skill-based online course (Freelancing, Design, IT)",
      "Corporate training platform",
    ],
    demoUrl: "https://example.com/demo-lms",
    demoLabel: "LMS Platform Demo",
  },
  {
    slug: "custom-websites",
    icon: Code2,
    title: "Other Custom Websites",
    titleBn: "কাস্টম ওয়েবসাইট",
    desc: "Portfolios, business sites, directories, booking systems — built to spec.",
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
      "Corporate / agency website",
      "Portfolio / personal brand",
      "Directory / listing site",
      "Booking / appointment system",
    ],
    demoUrl: "https://example.com/demo-custom",
    demoLabel: "Custom Website Demo",
  },
  {
    slug: "software-development",
    icon: Cpu,
    title: "Software Development",
    titleBn: "সফটওয়্যার ডেভেলপমেন্ট",
    desc: "Web apps, dashboards and internal tools tailored to your workflow.",
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
      "Inventory / stock management",
      "CRM / lead management",
      "POS / billing system",
      "HR / attendance system",
    ],
    demoUrl: "https://example.com/demo-software",
    demoLabel: "Software Demo",
  },
  {
    slug: "smm-panel-website",
    icon: Server,
    title: "SMM Panel Website",
    titleBn: "SMM প্যানেল ওয়েবসাইট",
    desc: "Full SMM panel with services, orders, API providers and payment integration.",
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
      "Social media reseller",
      "Digital marketing agency add-on",
      "Freelancer service platform",
    ],
    demoUrl: "https://example.com/demo-smm",
    demoLabel: "SMM Panel Demo",
  },
  {
    slug: "ai-video-ads",
    icon: Video,
    title: "AI Video Creation / Ads",
    titleBn: "AI ভিডিও ক্রিয়েশন / অ্যাড",
    desc: "Scroll-stopping AI-generated video ads for Facebook, Instagram and TikTok.",
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
      "Product ad / demo",
      "Brand awareness video",
      "Explainer / testimonial video",
    ],
    demoUrl: "https://example.com/demo-ai-video",
    demoLabel: "AI Video Sample",
  },
  {
    slug: "facebook-business-page-setup",
    icon: Facebook,
    title: "Facebook Business Page Setup",
    titleBn: "ফেসবুক বিজনেস পেজ সেটআপ",
    desc: "Professional page setup, branding, sections and optimisation from scratch.",
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
      "নতুন ব্যবসা / brand launch",
      "Old page rebranding",
      "Verification-ready page",
    ],
    demoUrl: "https://facebook.com/",
    demoLabel: "Sample Page",
  },
  {
    slug: "facebook-pixel-setup",
    icon: Target,
    title: "Facebook Pixel Setup",
    titleBn: "ফেসবুক পিক্সেল সেটআপ",
    desc: "Pixel, events, conversions API and audience tracking — installed correctly.",
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
      "E-commerce store tracking",
      "Lead form conversion",
      "Custom funnel tracking",
    ],
    demoUrl: "https://example.com/demo-pixel-report",
    demoLabel: "Sample Pixel Report",
  },
  {
    slug: "logo-cover-poster-design",
    icon: Palette,
    title: "Logo, Cover & Poster Design",
    titleBn: "লোগো, কভার ও পোস্টার ডিজাইন",
    desc: "Business logo, Facebook cover and social media poster design that stands out.",
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
      "New brand identity",
      "Facebook / IG creative pack",
      "Event / campaign poster",
    ],
    demoUrl: "https://example.com/demo-design-portfolio",
    demoLabel: "Design Portfolio",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
