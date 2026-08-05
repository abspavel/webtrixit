
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, X, MessageCircle, Star, ShieldCheck, Menu,
  Phone, Mail, MapPin, TrendingUp, Zap, ChevronLeft, ChevronRight,
  AlertTriangle, Sparkles, ExternalLink, Palette, Moon, Sun, Monitor
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTheme, type Theme } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import heroBg from "@/assets/hero-bg.jpg";
import client1 from "@/assets/client-1.jpg";
import client2 from "@/assets/client-2.jpg";
import client3 from "@/assets/client-3.jpg";
import client4 from "@/assets/client-4.jpg";
import client5 from "@/assets/client-5.jpg";
import client6 from "@/assets/client-6.jpg";
import client7 from "@/assets/client-7.jpg";
import client8 from "@/assets/client-8.jpg";
const logoAsset = { url: "/webtrix-logo.png" };

import { services } from "@/lib/services-data";
import { useReveal, useActiveSection } from "@/hooks/use-reveal";
import { Hero3DStack, PopIn } from "@/components/Hero3DStack";

import { submitLead } from "@/lib/leads.functions";
import { supabase } from "@/integrations/supabase/client";


const WHATSAPP_NUMBER = "8801835985730";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "আসসালামু আলাইকুম, Webtrix — আমি একটি প্রজেক্ট নিয়ে আলোচনা করতে চাই।",
)}`;

const SITE_URL = "https://webtrixit.lovable.app";
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/XoKKKE5uTDWSw8MRim4BZzbm9YF3/social-images/social-1785258383263-logo_no_text.webp";
const HOME_TITLE = "Bioxin — Skin Care & Health | Premium Solutions";
const HOME_DESC =
  "Experience premium skin care with Bioxin. We provide dermatologically tested products and health solutions tailored to your needs.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      {
        name: "keywords",
        content:
          "ওয়েবসাইট ডিজাইন বাংলাদেশ, ওয়েবসাইট তৈরি খরচ, ই-কমার্স ওয়েবসাইট বাংলাদেশ, ল্যান্ডিং পেজ ডিজাইন, LMS ওয়েবসাইট, কাস্টম সফটওয়্যার ডেভেলপমেন্ট, SMM প্যানেল ওয়েবসাইট, ডিজিটাল মার্কেটিং এজেন্সি চট্টগ্রাম, ফেসবুক পিক্সেল সেটআপ, লোগো ডিজাইন বাংলাদেশ, web design company Bangladesh, website development Chittagong, Webtrix IT Solution, webtrixit, #webtrixit, #webdesignBD, #ecommerceBD",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "BD-A" },
      { name: "geo.placename", content: "Chittagong, Bangladesh" },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:locale", content: "bn_BD" },
      { property: "og:site_name", content: "Webtrix IT Solution" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Bioxin",
          alternateName: "Bioxin Health",
          url: SITE_URL,
          image: OG_IMAGE,
          description: HOME_DESC,
          telephone: "+8801835985730",
          email: "webtrixofficial@gmail.com",
          priceRange: "৳৳",
          address: {
            "@type": "PostalAddress",
            streetAddress: "কর্ণফুলী",
            addressLocality: "চট্টগ্রাম",
            addressCountry: "BD",
          },
          areaServed: { "@type": "Country", name: "Bangladesh" },
          sameAs: ["https://wa.me/8801835985730"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "ওয়েব ও ডিজিটাল সার্ভিস",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.titleBn,
                url: `${SITE_URL}/services/${s.slug}`,
              },
            })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Webtrix IT Solution",
          url: SITE_URL,
          inLanguage: "bn-BD",
        }),
      },
    ],
  }),
  component: HomePage,
});



const clientPeople: { name: string; role: string; photo: string }[] = [
  { name: "Sarah Jenkins", role: "Skin Care Enthusiast", photo: client1 },
  { name: "Aisha Khan", role: "Dermatology Patient", photo: client2 },
  { name: "Emily Watson", role: "Model & Influencer", photo: client3 },
  { name: "Jessica Lee", role: "Lifestyle Blogger", photo: client4 },
  { name: "Michael Ross", role: "Fitness Coach", photo: client5 },
  { name: "Linda Brown", role: "Esthetician", photo: client6 },
  { name: "David Miller", role: "Business Professional", photo: client7 },
  { name: "Chloe Davis", role: "Student", photo: client8 },
];

const stories = [
  { name: "Sarah Jenkins", role: "Skin Care Enthusiast", quote: "My skin has never felt this hydrated. Bioxin's routine is absolute magic for my dry skin.", rating: 5 },
  { name: "Aisha Khan", role: "Dermatology Patient", quote: "The consultation changed everything. For the first time in years, my acne is under control.", rating: 5 },
  { name: "Emily Watson", role: "Model & Influencer", quote: "Bioxin's anti-aging treatments gave me that natural glow I needed for photoshoots. Highly recommended!", rating: 5 },
  { name: "Jessica Lee", role: "Lifestyle Blogger", quote: "Their products are clean, effective, and look beautiful on my vanity. My skin looks so much clearer now.", rating: 5 },
  { name: "Michael Ross", role: "Fitness Coach", quote: "I thought skin care was complicated, but Bioxin made it so simple. My skin feels fresh and protected.", rating: 5 },
  { name: "Linda Brown", role: "Esthetician", quote: "As an esthetician, I'm very picky with ingredients. Bioxin uses the exact actives I recommend to my clients.", rating: 5 },
  { name: "David Miller", role: "Business Professional", quote: "Professional, effective, and efficient. Exactly what I need for my busy schedule.", rating: 5 },
  { name: "Chloe Davis", role: "Student", quote: "Budget-friendly but high quality. My skin routine finally feels like self-care rather than a chore.", rating: 5 },
  { name: "Rachel Green", role: "Photographer", quote: "My skin tone is finally even. The brightening serum is my secret weapon for long shoots.", rating: 5 },
  { name: "Mark Taylor", role: "Chef", quote: "Bioxin’s recovery balm is a lifesaver after long hours in the kitchen near the stove. No more redness.", rating: 5 },
  { name: "Sophia Martinez", role: "Yoga Teacher", quote: "I love that they are cruelty-free and natural. It fits my lifestyle perfectly.", rating: 5 },
  { name: "James Wilson", role: "Software Engineer", quote: "Simple, easy, and works perfectly. My skin looks healthier than it has in years.", rating: 5 },
  { name: "Olivia King", role: "Designer", quote: "The packaging is beautiful, but the results are even better. My skin is noticeably softer.", rating: 5 },
  { name: "Daniel Scott", role: "Architect", quote: "I was skeptical about routines, but Bioxin showed me the science. It works.", rating: 5 },
  { name: "Ava Thompson", role: "Teacher", quote: "Teaching all day can be exhausting, but Bioxin makes me look refreshed and glowing.", rating: 5 },
  { name: "Ethan White", role: "Writer", quote: "Clean products, clear skin. Bioxin is the real deal.", rating: 5 },
];


type PortfolioProject = {
  id?: string;
  title: string;
  category: string;
  description?: string | null;
  demo_url: string;
  image_url?: string | null;
  project_screenshots?: string[] | null;
  sort_order?: number | null;
};

const fallbackPortfolio: PortfolioProject[] = [
  { id: "fallback-0", title: "Luminous Skin Analysis", category: "Consultation", demo_url: "/demo/skin-analysis", image_url: null, sort_order: 0 },
  { id: "fallback-1", title: "Hydra-Glow Kit", category: "Products", demo_url: "/demo/product-range", image_url: null, sort_order: 1 },
  { id: "fallback-2", title: "Renewal Serum", category: "Products", demo_url: "/demo/product-range", image_url: null, sort_order: 2 },
  { id: "fallback-3", title: "Youth Restoration", category: "Anti-Aging", demo_url: "/demo/anti-aging-results", image_url: null, sort_order: 3 },
  { id: "fallback-4", title: "Acne Clear Protocol", category: "Clinical", demo_url: "/demo/clinical-success", image_url: null, sort_order: 4 },
  { id: "fallback-5", title: "Skin Barrier Shield", category: "Dermatology", demo_url: "/demo/clinical-success", image_url: null, sort_order: 5 },
  { id: "fallback-6", title: "Botanical Essence", category: "Products", demo_url: "/demo/product-range", image_url: null, sort_order: 6 },
  { id: "fallback-7", title: "Dermal Care Expert", category: "Clinical", demo_url: "/demo/clinical-success", image_url: null, sort_order: 7 },
];

const portfolioGradients = [
  "from-blue-100 to-slate-100",
  "from-slate-50 to-blue-50",
  "from-blue-50 to-slate-50",
  "from-slate-100 to-blue-100",
  "from-blue-100 to-slate-50",
  "from-slate-50 to-blue-100",
];

const beforeAfter = [
  { metric: "Hydration Level", before: "18%", after: "74%", up: "+310%" },
  { metric: "Visible Fine Lines", before: "High", after: "Minimal", up: "82% Reduction" },
  { metric: "Skin Elasticity", before: "Low", after: "High", up: "+150%" },
  { metric: "Blemishes & Redness", before: "Severe", after: "Clear", up: "-90%" },
];

const comparison = [
  { point: "Clinically Proven Formulas", us: true, them: false },
  { point: "Personalized Dermatologist Review", us: true, them: false },
  { point: "Sustainable & Clean Ingredients", us: true, them: true },
  { point: "Visible Results in 28 Days", us: true, them: false },
  { point: "Generic Mass-Market Fillers", us: false, them: true },
  { point: "Inconsistent Results", us: false, them: true },
];


function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <ClientLogos />
      <ProblemSolution />
      <WhatsAppBanner variant="primary" />
      <Services />
      <WhatsAppBanner variant="neon" />
      <SuccessStories />
      <Portfolio />
      <BeforeAfter />
      <VersusOthers />
      <FinalCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const themes: { id: Theme; label: string; icon: any }[] = [
    { id: "dark", label: "ডার্ক মুড", icon: Moon },
    { id: "gray", label: "গ্রে মুড", icon: Monitor },
    { id: "green", label: "গ্রিন মুড", icon: Zap },
    { id: "orange", label: "অরেঞ্জ মুড", icon: Sparkles },
    { id: "white", label: "হোয়াইট মুড", icon: Sun },
  ];

  const links = [
    { href: "services", label: "Products" },
    { href: "work", label: "Results" },
    { href: "results", label: "About" },
    { href: "compare", label: "Why Us" },
    { href: "contact", label: "Contact" },
  ];
  const active = useActiveSection(links.map((l) => l.href));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-brand/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-5 sm:py-4 md:flex md:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-2" aria-label="Webtrixit হোম">
          <img
            src={logoAsset.url}
            alt="Webtrixit"
            className="h-9 w-auto shrink-0 drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)] sm:h-11"
          />
          <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Bioxin
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={`#${l.href}`}
                data-active={active === l.href}
                className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/40 text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
                  aria-label="থিম পরিবর্তন করুন"
                >
                  <Palette className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-border bg-surface-2 text-foreground">
                <DropdownMenuLabel>থিম বা কালার পরিবর্তন</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                {themes.map((t) => (
                  <DropdownMenuItem
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition ${
                      theme === t.id ? "bg-electric/20 text-electric font-semibold" : "hover:bg-white/5"
                    }`}
                  >
                    <t.icon className="h-4 w-4" />
                    <span>{t.label}</span>
                    {theme === t.id && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
              Book Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/40 text-muted-foreground transition hover:bg-surface-2 hover:text-foreground"
                aria-label="থিম পরিবর্তন করুন"
              >
                <Palette className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border-border bg-surface-2 text-foreground">
              <DropdownMenuLabel>থিম বা কালার পরিবর্তন</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              {themes.map((t) => (
                <DropdownMenuItem
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition ${
                    theme === t.id ? "bg-electric/20 text-electric font-semibold" : "hover:bg-white/5"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  <span>{t.label}</span>
                  {theme === t.id && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button 
            aria-label="মেনু" 
            onClick={() => setOpen(!open)} 
            className="rounded-lg border border-border p-2"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>


      </div>
      {open && (
        <div className="border-t border-border/60 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={`#${l.href}`}
                onClick={() => setOpen(false)}
                data-active={active === l.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active === l.href
                    ? "bg-electric/15 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
              Book Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


/* ---------- HERO ---------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" width={1024} height={1024} className="h-full w-full object-cover opacity-40" loading="eager" fetchPriority="high" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,15,29,0.4) 0%, rgba(10,15,29,0.95) 100%)" }} />
      </div>
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-neon" /> ২০১৯ সাল থেকে বিশ্বস্ত ডিজিটাল পার্টনার
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            Premium <span className="text-gradient">Skin Care</span> — for your natural glow.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Bioxin provides advanced dermatological products and personalized skin care solutions to help you achieve your health and beauty goals.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]">
              প্রজেক্ট শুরু করুন <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2">
              আমাদের কাজ দেখুন
            </a>
          </div>
          <Statistics />
        </div>
        <Hero3DStack />
      </div>


    </section>
  );
}

/* ---------- সন্তুষ্ট ক্লায়েন্ট (ছবি ও নাম) ---------- */
function Statistics() {
  const stats = [
    { label: "Products Sold", value: 5000, suffix: "+", icon: Zap, color: "text-electric" },
    { label: "Happy Customers", value: 12000, suffix: "+", icon: Star, color: "text-neon" },
    { label: "Years Experience", value: 10, suffix: "+", icon: ShieldCheck, color: "text-lavender" },
  ];
  return (
    <div className="mt-8 flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:mt-12 md:gap-8">
      {stats.map((s) => (
        <div 
          key={s.label} 
          className="flex flex-1 min-w-0 items-center gap-1.5 rounded-xl border border-border bg-card/50 p-2.5 text-left sm:gap-3 sm:rounded-2xl sm:p-4 md:p-6 lg:flex-initial lg:min-w-[180px]"
        >
          <s.icon className={`h-4 w-4 shrink-0 sm:h-6 sm:w-6 md:h-8 md:w-8 ${s.color}`} />
          <div className="min-w-0 truncate">
            <div className="text-sm font-bold sm:text-lg md:text-2xl lg:text-3xl">
              <Counter value={s.value} />{s.suffix}
            </div>
            <div className="truncate text-[10px] text-muted-foreground sm:text-xs md:text-sm">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useReveal<HTMLDivElement>({ threshold: 0.1 }); // lower threshold for better reactivity

  useEffect(() => {
    if (!ref.visible) return;
    
    let startTimestamp: number | null = null;
    const duration = 2000;
    
    let animationFrameId: number;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smoother start/end
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * value);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);
    
    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [ref.visible, value]);

  return <span ref={ref.ref}>{count}</span>;
}

function ClientLogos() {
  const row = [...clientPeople, ...clientPeople];
  return (
    <section className="border-y border-border/60 bg-surface/40 py-7">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Thousands of people trust Bioxin for their skin health
        </p>
        <div className="mt-6 overflow-hidden relative">
          {/* Left/Right Fading Edge */}
          <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          
          <div className="flex w-max items-center gap-8 animate-marquee hover:[animation-play-state:paused]">
            {row.map((c, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-5 py-3 backdrop-blur transition-transform hover:scale-105"
              >
                <img
                  src={c.photo}
                  alt={c.name}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-electric/40"
                />
                <span className="flex flex-col">
                  <span className="font-display text-sm font-semibold tracking-tight text-foreground/90 sm:text-base">
                    {c.name}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{c.role}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- PROBLEM → SOLUTION ---------- */
function ProblemSolution() {
  const problems = [
    { t: "Dull & Dehydrated Skin", d: "Generic products sit on the surface, leaving your skin thirsty and tired." },
    { t: "Stubborn Blemishes", d: "Inconsistent routines lead to inflammation and long-term scarring." },
    { t: "Premature Fine Lines", d: "Lack of specific actives and sun protection accelerates aging signs." },
    { t: "Confusing Routine", d: "Overloading your skin with incompatible ingredients causes irritation." },
  ];
  const solutions = [
    { t: "Deep Cellular Hydration", d: "Bio-available formulas that penetrate deep for a lasting, healthy glow." },
    { t: "Targeted Clear Care", d: "Active ingredients that treat the root cause of acne and redness." },
    { t: "Advanced Youth Restore", d: "Peptides and Retinoids that stimulate collagen for firmer skin." },
    { t: "Personalized Protocol", d: "Expert-reviewed routines designed specifically for your skin type." },
  ];
  const head = useReveal<HTMLDivElement>();
  const left = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>();
  return (
    <section className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div ref={head.ref} data-visible={head.visible || true} className="reveal">
          <SectionHeader
            eyebrow="Bridging the Skin Care Gap"
            title={<span className="text-destructive font-black">Identify the Problem, Embrace the Solution.</span>}
            description="Our dermatological approach focuses on real results, not just promises."
          />
        </div>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          <div
            ref={left.ref}
            data-visible={left.visible}
            className="reveal-l rounded-3xl border-2 border-destructive bg-card p-6 shadow-[0_0_30px_rgba(239,68,68,0.4)] sm:p-8 relative overflow-hidden"
          >
            {/* Red Zone Pulse Effect */}
            <div className="absolute inset-0 bg-destructive/5 animate-pulse pointer-events-none" />
            <div className="relative z-10 mb-5 inline-flex items-center gap-2 rounded-full bg-destructive px-3 py-1.5 text-xs font-black text-white uppercase tracking-wider animate-bounce-subtle">
              <AlertTriangle className="h-4 w-4" /> Barriers to Your Skin Health
            </div>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li
                  key={p.t}
                  className="reveal flex gap-3 rounded-2xl border border-destructive/10 bg-destructive/5 p-3.5 sm:p-4"
                  data-visible={left.visible || true}
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive">
                    <X className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">{p.t}</div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{p.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={right.ref}
            data-visible={right.visible}
            className="reveal-r rounded-3xl border border-neon/30 bg-card p-6 sm:p-8"
            style={{ boxShadow: "var(--shadow-neon)" }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-neon/15 px-3 py-1.5 text-xs font-semibold text-neon">
              <Sparkles className="h-3.5 w-3.5" /> Our Solutions — Real Results
            </div>
            <ul className="space-y-4">
              {solutions.map((s, i) => (
                <li
                  key={s.t}
                  className="reveal flex gap-3 rounded-2xl border border-neon/15 bg-neon/5 p-3.5 sm:p-4"
                  data-visible={right.visible || true}
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neon/20 text-neon">
                    <Check className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">{s.t}</div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- WHATSAPP BANNER ---------- */
function WhatsAppBanner({ variant }: { variant: "primary" | "neon" }) {
  const isNeon = variant === "neon";
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-8 md:p-10"
          style={{ background: isNeon ? "linear-gradient(120deg, oklch(0.19 0.04 265), oklch(0.22 0.05 165))" : "linear-gradient(120deg, oklch(0.19 0.04 265), oklch(0.22 0.05 258))" }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-neon/15 px-3 py-1 text-xs font-semibold text-neon">
                <MessageCircle className="h-3.5 w-3.5" /> Chat on WhatsApp
              </div>
              <h3 className="mt-3 font-display text-xl font-bold sm:text-3xl">
                Your Skin Journey, Our Expertise — Let's build your routine together.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start with a simple message. Our team provides free skin advice, personalized roadmaps, and expert product recommendations.
              </p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90 sm:w-auto">
              <MessageCircle className="h-4 w-4" /> Start Consultation
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
function Services() {
  return (
    <section id="services" className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="Our Services" title="Dermatological Excellence" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            const accents = ["text-electric", "text-neon", "text-lavender"];
            const bg = ["bg-electric/10", "bg-neon/10", "bg-lavender/10"];
            const c = i % 3;
            return (
              <PopIn key={s.title} delay={(i % 3) * 0.06} className="h-full">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg[c]} ${accents[c]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.titleBn}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-electric">
                  বিস্তারিত দেখুন <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
                <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
              </Link>
              </PopIn>
            );

          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- SUCCESS STORIES (swipe-enabled slider) ---------- */
function SuccessStories() {
  const [i, setI] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isAuto) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [isAuto, i]);

  const prev = () => {
    setIsAuto(false);
    setI((v) => (v - 1 + stories.length) % stories.length);
  };
  const next = () => setI((v) => (v + 1) % stories.length);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  return (
    <section className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeader eyebrow="Success Stories" title="Dermatologically Tested. Patient Approved." />

        <div 
          className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:p-10 touch-pan-y focus-within:ring-2 focus-within:ring-electric/20 group/slider"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setIsAuto(false)}
          onMouseLeave={() => setIsAuto(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") {
              setIsAuto(false);
              next();
            }
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client Testimonials"
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {stories.map((s, idx) => (
              <div 
                key={`${s.name}-${idx}`} 
                className="w-full shrink-0 px-1"
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${stories.length}`}
              >
                <div className="flex gap-1 text-neon">
                  {Array.from({ length: s.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-foreground md:text-xl">"{s.quote}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display font-semibold text-brand"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    {s.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{s.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{s.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {stories.map((_, k) => (
                <button
                  key={k}
                  onClick={() => {
                    setIsAuto(false);
                    setI(k);
                  }}
                  aria-label={`View story ${k + 1}`}
                  aria-current={k === i ? "true" : "false"}
                  className={`h-2 rounded-full transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-electric ${
                    k === i ? "w-8 bg-electric" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 transition hover:bg-surface-2">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={() => {
                  setIsAuto(false);
                  next();
                }} 
                aria-label="Next review" 
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 transition hover:bg-surface-2"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PORTFOLIO ---------- */
function Portfolio() {
  const [i, setI] = useState(0);
  const [perView, setPerView] = useState(3);
  const [projects, setProjects] = useState<PortfolioProject[]>(fallbackPortfolio);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; screenshots: string[]; startIndex: number }>({
    isOpen: false,
    screenshots: [],
    startIndex: 0,
  });


  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("portfolio_projects")
          .select("id, title, category, description, demo_url, image_url, project_screenshots, sort_order")
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (!cancelled && data && data.length > 0) setProjects(data as PortfolioProject[]);
      } catch {
        // Supabase না থাকলে/টেবিল সেটআপ না হলে স্ট্যাটিক পোর্টফোলিও দেখাবে।
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, projects.length - perView);
  const safeI = Math.min(i, maxIndex);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1 > maxIndex ? 0 : v + 1)), 4500);
    return () => clearInterval(t);
  }, [maxIndex]);

  const go = (dir: -1 | 1) =>
    setI((v) => {
      const n = v + dir;
      if (n < 0) return maxIndex;
      if (n > maxIndex) return 0;
      return n;
    });

  return (
    <section id="work" className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="আমাদের কাজ" title="ওয়েব, কমার্স ও সফটওয়্যার জুড়ে বাছাইকৃত প্রজেক্ট।" />

        <div className="relative mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(safeI * 100) / perView}%)` }}
            >
              {projects.map((p, idx) => {
                const gradient = portfolioGradients[idx % portfolioGradients.length];
                const isExternal = /^https?:\/\//i.test(p.demo_url);
                return (
                <div
                  key={p.id ?? p.title}
                  className="shrink-0 px-2.5"
                  style={{ width: `${100 / perView}%` }}
                >
                  <a
                    href={p.demo_url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/50 hover:shadow-lg hover:shadow-electric/10"
                  >
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${gradient}`}>
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt={`${p.title} প্রজেক্ট প্রিভিউ`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      {p.image_url && <div className="absolute inset-0 bg-brand/45" />}
                      <div className="grid-bg absolute inset-0 opacity-40" />
                      <div className="absolute inset-0 grid place-items-center px-4 text-center">
                        <span className="font-display text-2xl font-bold text-brand-foreground drop-shadow">
                          {p.title}
                        </span>
                      </div>
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                        ডেমো দেখুন {isExternal && <ExternalLink className="h-3 w-3" />}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="min-w-0">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {p.category}
                        </span>
                        {p.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>}
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
                    </div>
                    {p.project_screenshots && p.project_screenshots.length > 0 && (
                      <div className="flex gap-2 p-4 pt-0 overflow-x-auto no-scrollbar">
                        {p.project_screenshots.map((ss, ssi) => (
                          <button
                            key={ssi}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setLightbox({
                                isOpen: true,
                                screenshots: p.project_screenshots!,
                                startIndex: ssi,
                              });
                            }}
                            className="h-12 w-20 shrink-0 rounded-lg border border-border object-cover opacity-80 transition hover:opacity-100 overflow-hidden"
                          >
                            <img
                              src={ss}
                              alt={`${p.title} screenshot ${ssi + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                  </a>
                </div>
              );})}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="আগের প্রজেক্ট"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 text-foreground transition hover:bg-surface-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`স্লাইড ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    idx === safeI ? "w-6 bg-electric" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="পরের প্রজেক্ট"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 text-foreground transition hover:bg-surface-2"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {lightbox.isOpen && (
          <Lightbox
            images={lightbox.screenshots}
            startIndex={lightbox.startIndex}
            onClose={() => setLightbox({ ...lightbox, isOpen: false })}
          />
        )}
      </div>
    </section>

  );
}

/* ---------- BEFORE & AFTER ---------- */
function BeforeAfter() {
  return (
    <section id="results" className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="আগে ও পরে" title="প্রিমিয়াম বিল্ড আসলে কী ডেলিভার করে।" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {beforeAfter.map((b) => (
            <div key={b.metric} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{b.metric}</div>
              <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">আগে</div>
                  <div className="mt-1 font-display text-2xl font-bold text-muted-foreground line-through">{b.before}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-[10px] font-semibold uppercase text-neon">পরে</div>
                  <div className="mt-1 font-display text-2xl font-bold text-neon">{b.after}</div>
                </div>
              </div>
              <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-neon/10 px-3 py-1 text-xs font-semibold text-neon">
                <TrendingUp className="h-3 w-3" /> {b.up}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- VERSUS OTHERS ---------- */
function VersusOthers() {
  return (
    <section id="compare" className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="আমরা বনাম অন্যরা" title="কেন টিমগুলো ফ্রিল্যান্সার বা সাধারণ এজেন্সির বদলে Webtrix বেছে নেয়।" />
        <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-border bg-surface-2 px-6 py-4 text-sm">
            <div className="font-semibold">যা গুরুত্বপূর্ণ</div>
            <div className="text-center font-display font-bold text-gradient">Webtrix</div>
            <div className="text-center font-semibold text-muted-foreground">অন্যরা</div>
          </div>
          {comparison.map((row, i) => (
            <div key={row.point} className={`grid grid-cols-[1.4fr_1fr_1fr] items-center px-6 py-4 text-sm ${i % 2 ? "bg-surface/40" : ""}`}>
              <div className="pr-4 text-foreground">{row.point}</div>
              <div className="grid place-items-center">
                {row.us ? <Check className="h-5 w-5 text-neon" /> : <X className="h-5 w-5 text-muted-foreground/40" />}
              </div>
              <div className="grid place-items-center">
                {row.them ? <Check className="h-5 w-5 text-muted-foreground" /> : <X className="h-5 w-5 text-muted-foreground/40" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA + CONTACT ---------- */
function FinalCTA() {
  return (
    <section id="contact" className="px-4 py-14 sm:px-5 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border p-10 md:p-16" style={{ background: "var(--gradient-brand)" }}>
          <div className="grid-bg absolute inset-0 opacity-30" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Zap className="h-3.5 w-3.5 text-neon" /> এই কোয়ার্টারের জন্য বুকিং চলছে
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                চলুন তৈরি করি আপনার <span className="text-gradient">ডিজিটাল ইঞ্জিন</span>।
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                আপনার প্রজেক্ট সম্পর্কে বলুন। ২৪ ঘণ্টার মধ্যে ফ্রি স্ট্র্যাটেজি কল, কোটেশন ও টাইমলাইন পান।
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90">
                  <MessageCircle className="h-4 w-4" /> WhatsApp করুন
                </a>
                <a href="mailto:webtrixofficial@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2">
                  <Mail className="h-4 w-4" /> ইমেইল করুন
                </a>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
                <a href="tel:+8801835985730" className="flex items-center gap-3 hover:text-foreground"><Phone className="h-4 w-4 text-electric" /> মোবাইল: 01835985730</a>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-foreground"><MessageCircle className="h-4 w-4 text-neon" /> WhatsApp: 01835985730</a>
                <a href="mailto:webtrixofficial@gmail.com" className="flex items-center gap-3 hover:text-foreground"><Mail className="h-4 w-4 text-neon" /> webtrixofficial@gmail.com</a>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-lavender" /> Karnafully, Chattogram, Bangladesh</div>
              </div>
            </div>
            <ContactForm />

          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="text-xs font-medium text-muted-foreground">{label}
      <input {...props} className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
    </label>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!name.trim() || !phone.trim()) {
      toast.error("নাম ও ফোন নাম্বার দিন।");
      return;
    }
    setLoading(true);
    try {
      const res = await submitLead({
        data: {
          name, phone, email, service, message,
          source_page: typeof window !== "undefined" ? window.location.pathname : "/",
        },
      });
      if (!res.ok) throw new Error(res.error || "Submit failed");
      toast.success("ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।");
      setName(""); setPhone(""); setEmail(""); setService(""); setMessage("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "সাবমিট ব্যর্থ হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
      <div className="grid gap-4">
        <Field label="আপনার নাম" placeholder="যেমনঃ রফিকুল ইসলাম" value={name} onChange={(e) => setName(e.target.value)} required />
        <Field label="ফোন / WhatsApp" placeholder="01XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <Field label="ইমেইল (ঐচ্ছিক)" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="কী দরকার?" placeholder="যেমনঃ ২০০ প্রোডাক্টের ই-কমার্স সাইট" value={service} onChange={(e) => setService(e.target.value)} />
        <label className="text-xs font-medium text-muted-foreground">মেসেজ
          <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="আপনার প্রজেক্ট সম্পর্কে বিস্তারিত লিখুন..." className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
        </label>
        <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:opacity-90 disabled:opacity-60">
          {loading ? "সাবমিট হচ্ছে..." : <>ফ্রি কোটেশন নিন <ArrowRight className="h-4 w-4" /></>}
        </button>
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-neon" /> আমরা ২৪ ঘণ্টার মধ্যে উত্তর দিই। আপনার তথ্য গোপন থাকবে।
        </p>
      </div>
    </form>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <img src={logoAsset.url} alt="Webtrix IT Solution" className="h-10 w-auto shrink-0 drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)]" />
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-xs text-muted-foreground hover:text-foreground">Admin</Link>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Webtrix IT Solution. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- FLOATING WHATSAPP ---------- */
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-neon text-brand shadow-[var(--shadow-neon)] transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ---------- SHARED ---------- */
function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-slate-300">{description}</p>}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-card p-6 md:p-8 ${className}`}>{children}</div>;
}

/* ---------- LIGHTBOX ---------- */
function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIdx((v) => (v === 0 ? images.length - 1 : v - 1));
      if (e.key === "ArrowRight") setIdx((v) => (v === images.length - 1 ? 0 : v + 1));
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-brand/95 backdrop-blur-md">
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="rounded-full bg-surface-2 p-3 text-foreground transition hover:bg-surface-3"
          aria-label="বন্ধ করুন"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center p-4">
        <button
          onClick={() => setIdx((v) => (v === 0 ? images.length - 1 : v - 1))}
          className="absolute left-4 z-10 rounded-full bg-brand/40 p-4 text-foreground transition hover:bg-brand/60 sm:left-8"
          aria-label="আগের ছবি"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <div className="relative h-full w-full max-w-5xl">
          <img
            src={images[idx]}
            alt={`Screenshot ${idx + 1}`}
            className="h-full w-full object-contain"
          />
        </div>
        <button
          onClick={() => setIdx((v) => (v === images.length - 1 ? 0 : v + 1))}
          className="absolute right-4 z-10 rounded-full bg-brand/40 p-4 text-foreground transition hover:bg-brand/60 sm:right-8"
          aria-label="পরের ছবি"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
      <div className="flex justify-center gap-2 pb-8 pt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-electric" : "w-2 bg-muted-foreground/40"}`}
            aria-label={`ছবি ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

