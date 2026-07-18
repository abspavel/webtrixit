import { Link } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, Check, ExternalLink, MessageCircle, ShieldCheck,
  Sparkles, Target, TrendingUp, Wrench, ListChecks, HelpCircle, Plus, Minus, Star,
  ChevronLeft, ChevronRight, Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { services, type ServiceItem } from "@/lib/services-data";
import logoAsset from "@/assets/webtrix-logo.png.asset.json";
import { ReadingControls } from "@/components/ReadingControls";

const WHATSAPP_NUMBER = "8801835985730";
const waUrl = (title: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `আসসালামু আলাইকুম, আমি "${title}" সার্ভিসটি সম্পর্কে জানতে চাই।`,
  )}`;

export function ServiceDetail({ service }: { service: ServiceItem }) {
  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-brand/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="হোম">
            <img src={logoAsset.url} alt="Webtrix IT Solution" className="h-10 w-auto shrink-0 drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)]" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-surface-2 sm:text-sm">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">সব সার্ভিস</span><span className="sm:hidden">ব্যাক</span>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="grid-bg absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> সার্ভিস
          </Link>
          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/15 text-electric">
            <Icon className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
            {service.titleBn}
          </h1>
          <p className="mt-6 max-w-3xl text-base text-muted-foreground sm:text-lg">
            {service.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={waUrl(service.titleBn)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]">
              <MessageCircle className="h-4 w-4" /> WhatsApp-এ কথা বলুন
            </a>
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2">
              লাইভ ডেমো দেখুন <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Section eyebrow="কেন প্রয়োজন?" title={`${service.subject} কেন ব্যবহার করা উচিত`} icon={Sparkles} accent="text-electric" bg="bg-electric/10">
        <ul className="grid gap-4 md:grid-cols-2">
          {service.why.map((w) => (
            <li key={w} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-electric" />
              <p className="text-sm leading-relaxed text-foreground">{w}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="কার্যকারিতা" title={`${service.subject}-এর কার্যকারিতা`} icon={Target} accent="text-lavender" bg="bg-lavender/10">
        <ul className="grid gap-4 md:grid-cols-2">
          {service.effectiveness.map((f) => (
            <li key={f} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-lavender" />
              <p className="text-sm leading-relaxed text-foreground">{f}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="উপকারিতা" title={`${service.subject} ব্যবহারের উপকারিতা`} icon={TrendingUp} accent="text-neon" bg="bg-neon/10">
        <ul className="grid gap-4 md:grid-cols-3">
          {service.benefits.map((b) => (
            <li key={b} className="rounded-2xl border border-neon/30 bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neon/15 text-neon">
                <TrendingUp className="h-4 w-4" />
              </div>
              <p className="text-sm leading-relaxed text-foreground">{b}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section className="border-y border-border/60 bg-surface/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-electric/10 text-electric">
              <Wrench className="h-4 w-4" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">প্রসেস ও ফিচার</p>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            আমরা কীভাবে আপনার <span className="text-gradient">{service.subject}</span> তৈরি করি
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            প্রতিটি ধাপে আপনার সাথে আলোচনা করে, স্বচ্ছভাবে কাজ এগিয়ে নিই — যাতে ফাইনাল প্রোডাক্ট ঠিক আপনার কল্পনার মতোই হয়।
          </p>

          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {service.process.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 font-display text-sm font-bold text-electric">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neon/15 text-neon">
                <ListChecks className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                {service.subject}-এ যে যে ফিচার থাকবে
              </h3>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-surface/50 p-3.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                  <span className="text-sm leading-relaxed text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40 py-16">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">ইউজ কেস</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">কাদের জন্য উপযুক্ত</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {service.useCases.map((u) => (
              <span key={u} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                {u}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">লাইভ ডেমো</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            আপনার জন্য <span className="text-gradient">লাইভ ডেমো</span>
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            নিচের লিঙ্কে ক্লিক করে আমাদের বানানো একটি সম্পূর্ণ demo দেখুন। প্রতিটি অংশ কীভাবে কাজ করে, তার বাস্তব অভিজ্ঞতা নিতে পারবেন।
          </p>

          <div
            className="mt-8 overflow-hidden rounded-3xl border border-border"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
          >
            <div className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold text-neon">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-neon" /> লাইভ প্রিভিউ
                </div>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{service.demoLabel}</h3>
                <p className="mt-2 break-all text-xs text-muted-foreground">{service.demoUrl}</p>
              </div>
              <a
                href={service.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-brand transition hover:translate-y-[-1px]"
              >
                নতুন ট্যাবে খুলুন <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-background md:mx-6 md:mb-6">
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex-1 truncate rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
                  {service.demoUrl}
                </div>
              </div>
              <div className="relative aspect-[16/10] w-full bg-background md:aspect-[16/9]">
                <iframe
                  src={service.demoUrl}
                  title={`${service.titleBn} — লাইভ ডেমো`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>

            <p className="flex items-center gap-2 px-6 pb-6 text-xs text-muted-foreground md:px-8 md:pb-8">
              <ShieldCheck className="h-3.5 w-3.5 text-neon" />
              কিছু সাইট নিরাপত্তার কারণে embed-এ লোড নাও হতে পারে — সেক্ষেত্রে "নতুন ট্যাবে খুলুন" বাটনে ক্লিক করুন।
            </p>
          </div>
        </div>
      </section>

      <ReviewsSlider subject={service.subject} />
      <ServiceFAQ subject={service.subject} />
      <ServiceLeadForm serviceTitle={service.titleBn} />

      <section className="border-t border-border/60 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            আজই শুরু করুন আপনার <span className="text-gradient">{service.titleBn}</span> প্রজেক্ট
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            WhatsApp-এ মেসেজ দিন — ফ্রি কনসালটেশন, টাইমলাইন ও কোটেশন পাবেন ২৪ ঘণ্টার মধ্যে।
          </p>
          <a
            href={waUrl(service.titleBn)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp-এ কথা বলুন
          </a>
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/40 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">আরও সার্ভিস</p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">অন্যান্য সার্ভিস</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => {
              const RIcon = r.icon;
              return (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
                    <RIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{r.titleBn}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-electric">
                    বিস্তারিত দেখুন <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface/40 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5">
          <img src={logoAsset.url} alt="Webtrix IT Solution" className="h-9 w-auto drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)]" />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Webtrix IT Solution</p>
        </div>
      </footer>

      <a
        href={waUrl(service.titleBn)}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp-এ চ্যাট করুন"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-neon text-brand shadow-[var(--shadow-neon)] transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <ReadingControls />
    </div>
  );
}

export function serviceHead(service: ServiceItem) {
  const title = `${service.titleBn} — Webtrix IT Solution`;
  return {
    meta: [
      { title },
      { name: "description", content: service.desc },
      { property: "og:title", content: title },
      { property: "og:description", content: service.desc },
      { property: "og:type", content: "article" },
    ],
  };
}

export function ServiceNotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-background px-5 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">সার্ভিসটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-3 text-muted-foreground">এই লিঙ্কটি সম্ভবত ভুল বা সরানো হয়েছে।</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <ArrowLeft className="h-4 w-4" /> হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

function Section({
  eyebrow, title, icon: Icon, accent, bg, children,
}: {
  eyebrow: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex items-center gap-3">
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${bg} ${accent}`}>
            <Icon className="h-4 w-4" />
          </span>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent}`}>{eyebrow}</p>
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function ReviewsSlider({ subject }: { subject: string }) {
  const reviews = [
    { name: "সাদিয়া রহমান", role: "প্রতিষ্ঠাতা, Bloom Boutique", rating: 5,
      quote: `Webtrix-এর ${subject} নেওয়ার পর আমাদের অর্ডার আগের চেয়ে ৩ গুণ বেড়েছে। ডিজাইন ও সাপোর্ট — দুটোই দারুণ।` },
    { name: "আরিফুল ইসলাম", role: "CEO, TechNova BD", rating: 5,
      quote: `এদের ${subject} সলিউশন নেওয়ার পর আমাদের কাজের গতি ও কনভার্সন দুটোই আকাশছোঁয়া। প্রতিটি ধাপে স্বচ্ছ যোগাযোগ ছিল।` },
    { name: "মেহনাজ সুলতানা", role: "Founder, Glow Studio", rating: 5,
      quote: `${subject}-এর জন্য অনেক জায়গায় খোঁজ নিয়েছি — Webtrix-ই সবচেয়ে প্রিমিয়াম কাজ ও সময়মতো ডেলিভারি দিয়েছে।` },
    { name: "রাকিবুল হাসান", role: "মালিক, ShopEase", rating: 5,
      quote: `প্রথম দিন থেকেই ${subject}-এ ROI পেয়েছি। টিমটা টেকনিক্যাল ও মার্কেটিং — দুটোই বোঝে, তাই কাজ সহজ হয়েছে।` },
    { name: "ফারহানা আক্তার", role: "ডিরেক্টর, EduSpark", rating: 5,
      quote: `${subject} সেটআপের পর আমাদের ব্র্যান্ড আরও প্রফেশনাল লাগছে, কাস্টমার ট্রাস্টও অনেক বেড়েছে।` },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [reviews.length]);

  const prev = () => setI((v) => (v - 1 + reviews.length) % reviews.length);
  const next = () => setI((v) => (v + 1) % reviews.length);

  return (
    <section className="border-y border-border/60 bg-surface/40 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lavender/10 text-lavender">
            <Star className="h-4 w-4" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lavender">ক্লায়েন্ট রিভিউ</p>
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          {subject}-এর জন্য বাস্তব ক্লায়েন্টদের মতামত
        </h2>

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-10">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${i * 100}%)` }}
          >
            {reviews.map((r) => (
              <div key={r.name} className="w-full shrink-0 px-1">
                <div className="flex gap-1 text-neon">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-foreground md:text-xl">"{r.quote}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display font-semibold text-brand"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    {r.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{r.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {reviews.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`রিভিউ ${k + 1}`}
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

function ServiceFAQ({ subject }: { subject: string }) {
  const faqs = [
    { q: `${subject} বানাতে কত সময় লাগে?`,
      a: `স্কোপ অনুযায়ী সাধারণত ৭–২১ কার্যদিবসের মধ্যে ${subject} ডেলিভারি করা হয়। ছোট প্রজেক্ট আরও দ্রুত সম্ভব।` },
    { q: `${subject}-এর খরচ কেমন হবে?`,
      a: `প্রয়োজনীয় ফিচার, ডিজাইন লেভেল ও ইন্টিগ্রেশনের উপর নির্ভর করে ${subject}-এর কোটেশন দেওয়া হয়। WhatsApp-এ যোগাযোগ করলে ২৪ ঘণ্টার মধ্যে ফ্রি কোটেশন পাবেন।` },
    { q: `লঞ্চের পরে সাপোর্ট পাবো?`,
      a: `হ্যাঁ। প্রথম ৩০ দিন ফ্রি bug-fix সাপোর্ট এবং এরপর ইচ্ছেমতো মাসিক মেইনটেন্যান্স প্ল্যান নেওয়া যাবে।` },
    { q: `আমার নিজস্ব ব্র্যান্ড কালার ও লোগো ব্যবহার করা যাবে?`,
      a: `অবশ্যই। ${subject} সম্পূর্ণভাবে আপনার ব্র্যান্ড গাইডলাইন — কালার, ফন্ট, লোগো — অনুযায়ী কাস্টমাইজ করা হবে।` },
    { q: `পেমেন্ট প্রসেস কীভাবে?`,
      a: `৫০% অ্যাডভান্স এবং বাকি ৫০% ডেলিভারির আগে। bKash, Nagad, ব্যাংক ট্রান্সফার — সব পেমেন্ট অপশন সাপোর্ট করি।` },
    { q: `সোর্স কোড / ফাইলের মালিকানা কি আমার থাকবে?`,
      a: `হ্যাঁ, ফাইনাল ডেলিভারির পর ${subject}-এর সোর্স ফাইল, কোড ও অ্যাডমিন অ্যাক্সেস সম্পূর্ণভাবে আপনার হাতে হস্তান্তর করা হবে।` },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-electric/10 text-electric">
            <HelpCircle className="h-4 w-4" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">সচরাচর প্রশ্ন</p>
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          {subject} সম্পর্কে যা মানুষ প্রায়ই জিজ্ঞেস করে
        </h2>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f, k) => {
            const isOpen = open === k;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : k)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-surface/40"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-foreground sm:text-lg">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? "bg-electric text-brand" : "bg-surface-2 text-muted-foreground"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceLeadForm({ serviceTitle }: { serviceTitle: string }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম Webtrix,\n\nআমি "${serviceTitle}" সার্ভিসটি নিতে চাই।\n\nনামঃ ${form.name}\nফোনঃ ${form.phone}\nইমেইলঃ ${form.email}\nবাজেটঃ ${form.budget}\n\nবিস্তারিতঃ ${form.message}`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <section className="border-y border-border/60 bg-surface/40 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <Send className="h-4 w-4" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">লিড ফর্ম</p>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              {serviceTitle}-এর জন্য <span className="text-gradient">ফ্রি কোটেশন</span> নিন
            </h2>
            <p className="mt-4 text-muted-foreground">
              নিচের ফর্মটি পূরণ করুন — আমাদের স্ট্র্যাটেজিস্ট ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করে কাস্টম প্ল্যান, টাইমলাইন ও কোটেশন পাঠাবেন। কোনো hidden ফি নেই, কমিটমেন্টও নয়।
            </p>
            <ul className="mt-6 space-y-3 text-sm text-foreground">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon" /> আপনার তথ্য ১০০% গোপন থাকবে</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon" /> ফ্রি কনসালটেশন ও প্রজেক্ট রোডম্যাপ</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon" /> কোটেশনে সম্মতি হলে তবেই কাজ শুরু</li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="grid gap-4">
              <LeadField label="আপনার নাম *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="যেমনঃ রফিকুল ইসলাম" required />
              <LeadField label="ফোন / WhatsApp *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+৮৮০ ১XXX XXXXXX" required />
              <LeadField label="ইমেইল" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@company.com" />
              <label className="text-xs font-medium text-muted-foreground">
                বাজেট রেঞ্জ
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="">বাজেট বেছে নিন</option>
                  <option>৳ ১০,০০০ – ৩০,০০০</option>
                  <option>৳ ৩০,০০০ – ১,০০,০০০</option>
                  <option>৳ ১,০০,০০০ – ৫,০০,০০০</option>
                  <option>৳ ৫,০০,০০০+</option>
                </select>
              </label>
              <label className="text-xs font-medium text-muted-foreground">
                বিস্তারিত বলুন
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={`${serviceTitle} সম্পর্কে আপনার প্রয়োজন লিখুন...`}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]"
              >
                <Send className="h-4 w-4" /> কোটেশনের জন্য পাঠান
              </button>
              {sent && (
                <p className="rounded-xl border border-neon/30 bg-neon/10 px-4 py-3 text-xs text-neon">
                  ধন্যবাদ! আপনার তথ্য WhatsApp-এ পাঠানো হয়েছে — আমরা শীঘ্রই যোগাযোগ করব।
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function LeadField({
  label, value, onChange, placeholder, type = "text", required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <label className="text-xs font-medium text-muted-foreground">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
    </label>
  );
}
