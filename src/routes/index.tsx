import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, X, MessageCircle, Star, ShieldCheck, Menu,
  Phone, Mail, MapPin, TrendingUp, Zap, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import logoAsset from "@/assets/webtrix-logo.png.asset.json";
import { ReadingControls } from "@/components/ReadingControls";
import { services } from "@/lib/services-data";

const WHATSAPP_NUMBER = "8801700000000"; // update to real number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "আসসালামু আলাইকুম, Webtrix — আমি একটি প্রজেক্ট নিয়ে আলোচনা করতে চাই।",
)}`;

export const Route = createFileRoute("/")({
  component: HomePage,
});


const clients = ["Acme", "Nexlify", "Orbit", "Pulse", "Vantage", "Kairo", "Northwind", "Lumen", "Zephyr", "Halcyon"];

const stories = [
  { name: "রাশেদ আহমেদ", role: "প্রতিষ্ঠাতা, ShopKart BD", quote: "Webtrix আমাদের স্টোর রিবিল্ড করার পর মাত্র দুই মাসে সেল ৩.২ গুণ বেড়েছে। এদের টিম কনভার্সন ভালো বোঝে।", rating: 5 },
  { name: "নাদিয়া করিম", role: "ডিরেক্টর, EduPrime LMS", quote: "মাত্র ৩ সপ্তাহে আমাদের LMS launch হয়েছে — স্টুডেন্ট, পেমেন্ট, কোর্স সবকিছু মোবাইলে নিখুঁতভাবে কাজ করছে।", rating: 5 },
  { name: "তানভীর হোসেন", role: "CEO, GrowMedia", quote: "এদের বানানো AI ভিডিও অ্যাড আমাদের পুরনো ক্রিয়েটিভের চেয়ে CPA-তে ৪ গুণ ভালো পারফর্ম করেছে। সত্যিই প্রিমিয়াম কাজ।", rating: 5 },
];

const portfolio = [
  { title: "Luxe Landing Page", tag: "ল্যান্ডিং পেজ", gradient: "from-electric to-lavender" },
  { title: "Kart+ E-commerce", tag: "ই-কমার্স", gradient: "from-lavender to-neon" },
  { title: "EduPrime LMS", tag: "এলএমএস", gradient: "from-neon to-electric" },
  { title: "Panel Pro SMM", tag: "এসএমএম প্যানেল", gradient: "from-electric to-neon" },
  { title: "Orbit CRM", tag: "কাস্টম সফটওয়্যার", gradient: "from-lavender to-electric" },
  { title: "PulseAds Video", tag: "AI ভিডিও", gradient: "from-neon to-lavender" },
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
      <ReadingControls />

    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#services", label: "সার্ভিস" },
    { href: "#work", label: "পোর্টফোলিও" },
    { href: "#results", label: "রেজাল্ট" },
    { href: "#compare", label: "কেন আমরা" },
    { href: "#contact", label: "যোগাযোগ" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-brand/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-2" aria-label="Webtrix IT Solution হোম">
          <img src={logoAsset.url} alt="Webtrix IT Solution" className="h-10 w-auto shrink-0 rounded-md bg-white/95 px-2 py-1" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
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
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">{l.label}</a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
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

/* ---------- CLIENT LOGOS ---------- */
function ClientLogos() {
  const row = [...clients, ...clients];
  return (
    <section className="border-y border-border/60 bg-surface/40 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">বিশ্বজুড়ে অ্যাম্বিশাস টিমের বিশ্বস্ত পার্টনার</p>
        <div className="mt-6 overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-14">
            {row.map((c, i) => (
              <span key={i} className="whitespace-nowrap font-display text-2xl font-semibold text-muted-foreground/70">{c}</span>
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
    "ওয়েবসাইট পুরনো দেখায় ও ভিজিটরকে কাস্টমারে কনভার্ট করতে পারছে না।",
    "স্লো লোড টাইম আপনার অ্যাড পারফরম্যান্স ও SEO নষ্ট করছে।",
    "বিজনেস স্কেল করার মতো ঠিকঠাক ই-কমার্স, LMS বা সফটওয়্যার নেই।",
    "অ্যাড চলছে কিন্তু ফানেল লিক করছে — pixel বা tracking সেট করা নেই।",
  ];
  const solutions = [
    "আপনার ব্র্যান্ডের জন্য প্রিমিয়াম, কনভার্সন-ফোকাসড ডিজাইন।",
    "লাইটনিং-ফাস্ট, মোবাইল-অপটিমাইজড বিল্ড — ২ সেকেন্ডের মধ্যে লোড।",
    "শুরু থেকে শেষ পর্যন্ত ফুল-স্ট্যাক ই-কমার্স, LMS ও কাস্টম সফটওয়্যার।",
    "Pixel, CAPI ও analytics সঠিকভাবে ইনস্টল — প্রতিটি ইভেন্ট ট্র্যাকড।",
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="আমরা যে গ্যাপ পূরণ করি" title="আপনার আছে বিজনেস। আমরা বানাই ডিজিটাল ইঞ্জিন।" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="border-destructive/20">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
              <X className="h-3.5 w-3.5" /> সমস্যা
            </div>
            <ul className="space-y-3">
              {problems.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> {p}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="border-neon/30">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neon/10 px-3 py-1 text-xs font-semibold text-neon">
              <Check className="h-3.5 w-3.5" /> আমাদের সমাধান
            </div>
            <ul className="space-y-3">
              {solutions.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" /> {p}
                </li>
              ))}
            </ul>
          </Card>
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
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 sm:flex sm:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-neon/15 px-3 py-1 text-xs font-semibold text-neon">
                <MessageCircle className="h-3.5 w-3.5" /> সরাসরি WhatsApp
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">আগামী ৫ মিনিটের মধ্যে একজন স্ট্র্যাটেজিস্টের সাথে কথা বলুন।</h3>
              <p className="mt-2 text-sm text-muted-foreground">WhatsApp-এ আপনার প্রজেক্ট আইডিয়া পাঠান — আজই ফ্রি কোটেশন, টাইমলাইন ও রোডম্যাপ পান।</p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90">
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
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="আমাদের সার্ভিস" title="অনলাইনে লঞ্চ, সেল ও স্কেল করার জন্য প্রয়োজনীয় সবকিছু।" />
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

/* ---------- SUCCESS STORIES ---------- */
function SuccessStories() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="ক্লায়েন্ট সাকসেস স্টোরি" title="বাস্তব টিম। বাস্তব রেভিনিউ। বাস্তব ফলাফল।" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((s) => (
            <div key={s.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex gap-1 text-neon">
                {Array.from({ length: s.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">"{s.quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display font-semibold" style={{ background: "var(--gradient-hero)" }}>
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
      </div>
    </section>
  );
}

/* ---------- PORTFOLIO ---------- */
function Portfolio() {
  return (
    <section id="work" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="আমাদের কাজ" title="ওয়েব, কমার্স ও সফটওয়্যার জুড়ে বাছাইকৃত প্রজেক্ট।" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((p) => (
            <div key={p.title} className="group overflow-hidden rounded-2xl border border-border bg-card">
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient}`}>
                <div className="grid-bg absolute inset-0 opacity-40" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-2xl font-bold text-brand-foreground drop-shadow">{p.title}</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.tag}</span>
                <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BEFORE & AFTER ---------- */
function BeforeAfter() {
  return (
    <section id="results" className="py-20 md:py-28">
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
    <section id="compare" className="py-20 md:py-28">
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
    <section id="contact" className="px-5 py-20 md:py-28">
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
                <a href="mailto:hello@webtrixit.com" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2">
                  <Mail className="h-4 w-4" /> ইমেইল করুন
                </a>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-electric" /> +৮৮০ ১৭০০ ০০০ ০০০</div>
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-neon" /> hello@webtrixit.com</div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-lavender" /> ঢাকা, বাংলাদেশ · বিশ্বজুড়ে সার্ভিস</div>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
              <div className="grid gap-4">
                <Field label="আপনার নাম" placeholder="যেমনঃ রফিকুল ইসলাম" />
                <Field label="ইমেইল" type="email" placeholder="you@company.com" />
                <Field label="কী দরকার?" placeholder="যেমনঃ ২০০ প্রোডাক্টের ই-কমার্স সাইট" />
                <label className="text-xs font-medium text-muted-foreground">মেসেজ
                  <textarea rows={4} placeholder="আপনার প্রজেক্ট সম্পর্কে বিস্তারিত লিখুন..." className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                </label>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:opacity-90">
                  ফ্রি কোটেশন নিন <ArrowRight className="h-4 w-4" />
                </button>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-neon" /> আমরা ২৪ ঘণ্টার মধ্যে উত্তর দিই। আপনার তথ্য গোপন থাকবে।
                </p>
              </div>
            </form>
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

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <img src={logoAsset.url} alt="Webtrix IT Solution" className="h-9 w-auto shrink-0 rounded-md bg-white/95 px-2 py-1" />
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Webtrix IT Solution. সর্বস্বত্ব সংরক্ষিত।</p>
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
