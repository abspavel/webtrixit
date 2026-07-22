import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, X, MessageCircle, Star, ShieldCheck, Menu,
  Phone, Mail, MapPin, TrendingUp, Zap, ChevronLeft, ChevronRight,
  AlertTriangle, Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";
import logoAsset from "@/assets/webtrix-logo.png.asset.json";

import { services } from "@/lib/services-data";
import { useReveal, useActiveSection } from "@/hooks/use-reveal";
import { submitLead } from "@/lib/leads.functions";


const WHATSAPP_NUMBER = "8801835985730";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "আসসালামু আলাইকুম, Webtrix — আমি একটি প্রজেক্ট নিয়ে আলোচনা করতে চাই।",
)}`;

export const Route = createFileRoute("/")({
  component: HomePage,
});


/* Client logo marks — SVG-based branded chips (name-এর পরিবর্তে "logo" চিহ্ন) */
const clientLogos: { name: string; symbol: string; from: string; to: string }[] = [
  { name: "Acme",       symbol: "◆", from: "#3B82F6", to: "#8B5CF6" },
  { name: "Nexlify",    symbol: "▲", from: "#10B981", to: "#3B82F6" },
  { name: "Orbit",      symbol: "◉", from: "#8B5CF6", to: "#10B981" },
  { name: "Pulse",      symbol: "❤", from: "#F43F5E", to: "#8B5CF6" },
  { name: "Vantage",    symbol: "⬢", from: "#3B82F6", to: "#10B981" },
  { name: "Kairo",      symbol: "✦", from: "#F59E0B", to: "#8B5CF6" },
  { name: "Northwind",  symbol: "❄", from: "#38BDF8", to: "#3B82F6" },
  { name: "Lumen",      symbol: "☀", from: "#F59E0B", to: "#F43F5E" },
  { name: "Zephyr",     symbol: "≋", from: "#10B981", to: "#38BDF8" },
  { name: "Halcyon",    symbol: "◐", from: "#8B5CF6", to: "#3B82F6" },
];

const stories = [
  { name: "রাশেদ আহমেদ", role: "প্রতিষ্ঠাতা, ShopKart BD", quote: "Webtrix আমাদের স্টোর রিবিল্ড করার পর মাত্র দুই মাসে সেল ৩.২ গুণ বেড়েছে। এদের টিম কনভার্সন ভালো বোঝে।", rating: 5 },
  { name: "নাদিয়া করিম", role: "ডিরেক্টর, EduPrime LMS", quote: "মাত্র ৩ সপ্তাহে আমাদের LMS launch হয়েছে — স্টুডেন্ট, পেমেন্ট, কোর্স সবকিছু মোবাইলে নিখুঁতভাবে কাজ করছে।", rating: 5 },
  { name: "তানভীর হোসেন", role: "CEO, GrowMedia", quote: "এদের বানানো AI ভিডিও অ্যাড আমাদের পুরনো ক্রিয়েটিভের চেয়ে CPA-তে ৪ গুণ ভালো পারফর্ম করেছে। সত্যিই প্রিমিয়াম কাজ।", rating: 5 },
];

const portfolio = [
  { title: "Luxe Landing Page", tag: "ল্যান্ডিং পেজ", gradient: "from-electric to-lavender", demo: "/demo/luxe-landing" },
  { title: "Kart+ E-commerce", tag: "ই-কমার্স", gradient: "from-lavender to-neon", demo: "/demo/kartplus-ecommerce" },
  { title: "FreshCart Grocery", tag: "গ্রোসারি", gradient: "from-neon to-lavender", demo: "/demo/freshcart-grocery" },
  { title: "EduPrime LMS", tag: "এলএমএস", gradient: "from-neon to-electric", demo: "/demo/eduprime-lms" },
  { title: "PanelPro SMM", tag: "এসএমএম প্যানেল", gradient: "from-electric to-neon", demo: "/demo/panelpro-smm" },
  { title: "Orbit CRM", tag: "কাস্টম সফটওয়্যার", gradient: "from-lavender to-electric", demo: "/demo/orbit-crm" },
  { title: "PulseAds Video", tag: "AI ভিডিও", gradient: "from-neon to-lavender", demo: "/demo/pulseads-video" },
  { title: "BrandKit Design", tag: "লোগো ও পোস্টার", gradient: "from-electric to-lavender", demo: "/demo/brandkit-design" },
];

const beforeAfter = [
  { metric: "কনভার্সন রেট", before: "১.২%", after: "৪.৮%", up: "+৩০০%" },
  { metric: "পেজ লোড টাইম", before: "৬.৪সে", after: "১.১সে", up: "৬× দ্রুত" },
  { metric: "অ্যাড ROAS", before: "১.৭×", after: "৫.৯×", up: "+২৪৭%" },
  { metric: "বাউন্স রেট", before: "৭২%", after: "২৮%", up: "−৬১%" },
];

const comparison = [
  { point: "প্রিমিয়াম, কাস্টম ডিজাইন", us: true, them: false },
  { point: "মোবাইল-ফার্স্ট ও অত্যন্ত দ্রুত", us: true, them: false },
  { point: "কনভার্সন-ফোকাসড স্ট্রাকচার", us: true, them: false },
  { point: "লঞ্চের পরেও সাপোর্ট", us: true, them: false },
  { point: "টেমপ্লেট-নির্ভর সাধারণ লুক", us: false, them: true },
  { point: "লুকানো ফি ও দেরি", us: false, them: true },
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
  const links = [
    { href: "services", label: "সার্ভিস" },
    { href: "work", label: "পোর্টফোলিও" },
    { href: "results", label: "রেজাল্ট" },
    { href: "compare", label: "কেন আমরা" },
    { href: "contact", label: "যোগাযোগ" },
  ];
  const active = useActiveSection(links.map((l) => l.href));
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-brand/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-5 sm:py-4 md:flex md:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-2" aria-label="Webtrix IT Solution হোম">
          <img
            src={logoAsset.url}
            alt="Webtrix IT Solution"
            className="h-9 w-auto shrink-0 drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)] sm:h-11"
          />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
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
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            ফ্রি কোটেশন <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
        <button aria-label="মেনু" onClick={() => setOpen(!open)} className="rounded-lg border border-border p-2 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
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
              ফ্রি কোটেশন <ArrowRight className="h-4 w-4" />
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
        <img src={heroBg} alt="" width={1024} height={1024} className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,15,29,0.4) 0%, rgba(10,15,29,0.95) 100%)" }} />
      </div>
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-7xl px-5 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-neon" /> ২০১৯ সাল থেকে বিশ্বস্ত ডিজিটাল পার্টনার
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            প্রিমিয়াম <span className="text-gradient">ওয়েবসাইট ও সফটওয়্যার</span> — যা ভিজিটরকে কাস্টমারে পরিণত করে।
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Webtrix IT Solution বানায় ল্যান্ডিং পেজ, ই-কমার্স স্টোর, LMS প্ল্যাটফর্ম, কাস্টম সফটওয়্যার এবং AI-পাওয়ার্ড মার্কেটিং — দ্রুত, মোবাইল-ফার্স্ট ও কনভার্সন-কেন্দ্রিক।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]">
              প্রজেক্ট শুরু করুন <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2">
              আমাদের কাজ দেখুন
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { k: "২৫০+", v: "ডেলিভার্ড প্রজেক্ট" },
              { k: "৪.৯/৫", v: "ক্লায়েন্ট রেটিং" },
              { k: "১২+", v: "দেশে সার্ভিস" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-surface/40 p-4 backdrop-blur">
                <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CLIENT LOGOS (logo-marks, not text names) ---------- */
function ClientLogos() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="border-y border-border/60 bg-surface/40 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          দেশ-বিদেশের ১০০+ ব্র্যান্ড আমাদের ওপর আস্থা রেখেছে
        </p>
        <div className="mt-6 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10">
            {row.map((c, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-5 py-3 backdrop-blur"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl font-display text-lg font-bold text-white shadow-md"
                  style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
                  aria-hidden="true"
                >
                  {c.symbol}
                </span>
                <span className="font-display text-lg font-semibold tracking-tight text-foreground/85">
                  {c.name}
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
    { t: "পুরনো ডিজাইন, হারানো বিশ্বাস", d: "ভিজিটর ৩ সেকেন্ডেই সাইট দেখে সিদ্ধান্ত নেয় — পুরনো লুক মানেই হারানো কাস্টমার।" },
    { t: "স্লো লোড, নষ্ট বাজেট", d: "প্রতি ১ সেকেন্ড দেরিতে কনভার্সন ৭% কমে — আপনার অ্যাড বাজেটও তখন গলে যায়।" },
    { t: "স্কেল করার মতো সিস্টেম নেই", d: "অগোছালো ই-কমার্স, LMS বা অ্যাডমিন প্যানেল — বিজনেস বাড়ালেই ভেঙে পড়ে।" },
    { t: "ট্র্যাকিং ছাড়া মার্কেটিং", d: "Pixel/CAPI ঠিকমতো বসানো নেই বলেই ফানেল লিক করছে, ROAS পড়ে যাচ্ছে।" },
  ];
  const solutions = [
    { t: "প্রিমিয়াম, কনভার্সন-ফোকাসড ডিজাইন", d: "প্রথম দর্শনেই আস্থা তৈরি করে এমন ব্র্যান্ড-লেভেল UI — যেটা ভিজিটরকে বাটনে ক্লিক করায়।" },
    { t: "২ সেকেন্ডের নিচে লোড, মোবাইল-ফার্স্ট", d: "লাইটনিং-ফাস্ট বিল্ড, অপ্টিমাইজড ইমেজ ও কোড — SEO ও অ্যাড দুটোই উপকৃত হয়।" },
    { t: "স্কেলেবল ই-কমার্স, LMS ও সফটওয়্যার", d: "১০০ থেকে ১ লাখ ইউজার পর্যন্ত ভাঙে না — পেমেন্ট, ইনভেন্টরি, রোল, রিপোর্ট সব বিল্ট-ইন।" },
    { t: "নিখুঁত ট্র্যাকিং ও অ্যানালিটিক্স", d: "Pixel, CAPI, GA4, ইভেন্ট ট্র্যাকিং সঠিকভাবে সেট — প্রতিটি টাকার ROI মাপা যায়।" },
  ];
  const head = useReveal<HTMLDivElement>();
  const left = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>();
  return (
    <section className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div ref={head.ref} data-visible={head.visible} className="reveal">
          <SectionHeader
            eyebrow="আমরা যে গ্যাপ পূরণ করি"
            title="সমস্যা যেখানে, সমাধান সেখানেই — আপনার বিজনেসের জন্য ডিজিটাল ইঞ্জিন।"
          />
        </div>
        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          <div
            ref={left.ref}
            data-visible={left.visible}
            className="reveal-l rounded-3xl border border-destructive/25 bg-card p-6 sm:p-8"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" /> সমস্যা যা আপনার বিজনেসকে আটকে রাখছে
            </div>
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <li
                  key={p.t}
                  className="reveal flex gap-3 rounded-2xl border border-destructive/10 bg-destructive/5 p-3.5 sm:p-4"
                  data-visible={left.visible}
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive">
                    <X className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">{p.t}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
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
              <Sparkles className="h-3.5 w-3.5" /> আমাদের সমাধান — যা আপনি আসলেই পাবেন
            </div>
            <ul className="space-y-4">
              {solutions.map((s, i) => (
                <li
                  key={s.t}
                  className="reveal flex gap-3 rounded-2xl border border-neon/15 bg-neon/5 p-3.5 sm:p-4"
                  data-visible={right.visible}
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neon/20 text-neon">
                    <Check className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">{s.t}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
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
                <MessageCircle className="h-3.5 w-3.5" /> সরাসরি WhatsApp
              </div>
              <h3 className="mt-3 font-display text-xl font-bold sm:text-3xl">
                আপনার আইডিয়া, আমাদের এক্সপার্টিজ — চলুন একসাথে বসে আপনার পরবর্তী প্রজেক্টটি সাজিয়ে ফেলি।
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                WhatsApp-এ একটি মেসেজেই শুরু — কোনো ফর্ম, কোনো ঝামেলা নেই। আমাদের টিম আপনার প্রয়োজন বুঝে ফ্রি পরামর্শ, কাস্টম রোডম্যাপ ও ট্রান্সপারেন্ট কোটেশন পাঠাবে।
              </p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90 sm:w-auto">
              <MessageCircle className="h-4 w-4" /> WhatsApp-এ চ্যাট করুন
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
        <SectionHeader eyebrow="আমাদের সার্ভিস" title="আমাদের সার্ভিস সমূহ" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            const accents = ["text-electric", "text-neon", "text-lavender"];
            const bg = ["bg-electric/10", "bg-neon/10", "bg-lavender/10"];
            const c = i % 3;
            return (
              <Link
                key={s.title}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- SUCCESS STORIES (auto-slider) ---------- */
function SuccessStories() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % stories.length), 5000);
    return () => clearInterval(t);
  }, []);
  const prev = () => setI((v) => (v - 1 + stories.length) % stories.length);
  const next = () => setI((v) => (v + 1) % stories.length);

  return (
    <section className="py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeader eyebrow="ক্লায়েন্ট সাকসেস স্টোরি" title="বাস্তব টিম। বাস্তব রেভিনিউ। বাস্তব ফলাফল।" />

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:p-10">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {stories.map((s) => (
              <div key={s.name} className="w-full shrink-0 px-1">
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
                  onClick={() => setI(k)}
                  aria-label={`স্টোরি ${k + 1}`}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-electric" : "w-2 bg-muted-foreground/40"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="আগের রিভিউ" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 transition hover:bg-surface-2">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={next} aria-label="পরের রিভিউ" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 transition hover:bg-surface-2">
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

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, portfolio.length - perView);
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
              {portfolio.map((p) => (
                <div
                  key={p.title}
                  className="shrink-0 px-2.5"
                  style={{ width: `${100 / perView}%` }}
                >
                  <Link
                    to={p.demo}
                    className="group block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-electric/50 hover:shadow-lg hover:shadow-electric/10"
                  >
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient}`}>
                      <div className="grid-bg absolute inset-0 opacity-40" />
                      <div className="absolute inset-0 grid place-items-center px-4 text-center">
                        <span className="font-display text-2xl font-bold text-brand-foreground drop-shadow">
                          {p.title}
                        </span>
                      </div>
                      <span className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                        ডেমো দেখুন
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {p.tag}
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
                    </div>
                  </Link>
                </div>
              ))}
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
      aria-label="WhatsApp-এ চ্যাট করুন"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-neon text-brand shadow-[var(--shadow-neon)] transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ---------- SHARED ---------- */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-card p-6 md:p-8 ${className}`}>{children}</div>;
}
