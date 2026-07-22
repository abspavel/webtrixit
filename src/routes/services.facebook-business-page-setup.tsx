import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, Check, MessageCircle, HelpCircle, Plus, Minus,
  Facebook, Clock, Sparkles, ShieldCheck, Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import logoAsset from "@/assets/webtrix-logo.png.asset.json";

const WHATSAPP_NUMBER = "8801835985730";
const waUrl = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const Route = createFileRoute("/services/facebook-business-page-setup")({
  head: () => ({
    meta: [
      { title: "ফেসবুক বিজনেস পেজ সেটআপ — Webtrix IT Solution" },
      {
        name: "description",
        content:
          "প্রফেশনাল ফেসবুক বিজনেস পেজ সেটআপ, ব্র্যান্ডিং, অটোমেশন ও Ad-রেডি অপটিমাইজেশন — সাশ্রয়ী প্যাকেজে।",
      },
      { property: "og:title", content: "ফেসবুক বিজনেস পেজ সেটআপ — Webtrix IT Solution" },
      {
        property: "og:description",
        content: "৩টি প্যাকেজ, দ্রুত ডেলিভারি ও কমপ্লিট Ad-রেডি সেটআপ।",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: FacebookPageSetup,
});

type Pkg = {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  delivery: string;
  gradient: string;
  features: string[];
  cta: string;
};

const packages: Pkg[] = [
  {
    id: "starter",
    name: "স্টার্টার",
    price: "৳ ১,৫০০",
    oldPrice: "৳ ২,৫০০",
    delivery: "২৪ ঘণ্টা",
    gradient: "from-electric to-lavender",
    features: [
      "প্রফেশনাল পেজ ক্রিয়েশন",
      "সঠিক ক্যাটাগরি ও ইউজারনেম",
      "কভার ও প্রোফাইল ডিজাইন",
      "About + Contact অপটিমাইজেশন",
      "CTA বাটন সেটআপ",
    ],
    cta: "স্টার্টার নিন",
  },
  {
    id: "standard",
    name: "স্ট্যান্ডার্ড",
    price: "৳ ৩,০০০",
    oldPrice: "৳ ৫,০০০",
    badge: "সবচেয়ে জনপ্রিয়",
    delivery: "৪৮ ঘণ্টা",
    gradient: "from-neon to-electric",
    features: [
      "স্টার্টার প্যাকেজের সবকিছু",
      "Meta Business Manager সেটআপ",
      "Shop / Services সেকশন",
      "অটো-রিপ্লাই ও মেসেজ টেমপ্লেট",
      "৫টি ব্র্যান্ডেড পোস্ট ডিজাইন",
      "Pixel ইনস্টলেশন গাইড",
    ],
    cta: "স্ট্যান্ডার্ড নিন",
  },
  {
    id: "premium",
    name: "প্রিমিয়াম",
    price: "৳ ৫,৫০০",
    oldPrice: "৳ ৮,৫০০",
    delivery: "৩–৪ দিন",
    gradient: "from-lavender to-neon",
    features: [
      "স্ট্যান্ডার্ড প্যাকেজের সবকিছু",
      "সম্পূর্ণ ব্র্যান্ড কিট (কভার + ৩ ব্যানার)",
      "১০টি প্রিমিয়াম পোস্ট ডিজাইন",
      "Ad Account + Pixel সম্পূর্ণ সেটআপ",
      "পেজ ভেরিফিকেশন গাইডলাইন",
      "৩০ দিনের ফ্রি সাপোর্ট",
    ],
    cta: "প্রিমিয়াম নিন",
  },
];

const timeline = [
  { step: "১", title: "অর্ডার ও ব্রিফ", desc: "প্যাকেজ সিলেক্ট করে ব্যবসার তথ্য, লোগো ও ব্র্যান্ড ডিটেইল শেয়ার করুন।", eta: "দিন ১ · সকাল" },
  { step: "২", title: "পেজ ক্রিয়েশন", desc: "সঠিক ক্যাটাগরি, নাম ও ইউজারনেমে পেজ তৈরি এবং Business Manager লিঙ্ক।", eta: "দিন ১ · বিকাল" },
  { step: "৩", title: "ব্র্যান্ডিং ও কনটেন্ট", desc: "কভার, প্রোফাইল, About, CTA — সব ব্র্যান্ড-কনসিস্টেন্ট ডিজাইন।", eta: "দিন ১–২" },
  { step: "৪", title: "অটোমেশন ও সেকশন", desc: "Shop/Services, অটো-রিপ্লাই, মেসেজ টেমপ্লেট ও রিভিউ সেটআপ।", eta: "দিন ২" },
  { step: "৫", title: "রিভিউ ও হ্যান্ডওভার", desc: "চূড়ান্ত রিভিউ, অ্যাক্সেস আপনার নামে ট্রান্সফার — Ad চালানোর জন্য রেডি।", eta: "দিন ২ · সন্ধ্যা" },
];

const faqs = [
  { q: "পেজ কি সম্পূর্ণ আমার নামে থাকবে?", a: "হ্যাঁ। পেজের এডমিন অ্যাক্সেস ও Business Manager ওনারশিপ আপনার নামে ট্রান্সফার করে হ্যান্ডওভার দেওয়া হবে।" },
  { q: "আমার আগের পেজ থাকলে সেটি অপটিমাইজ করা যাবে?", a: "হ্যাঁ। পুরনো পেজ রিব্র্যান্ডিং, ক্লিনআপ ও অপটিমাইজেশন সব প্যাকেজেই কাভার করা যায় — যোগাযোগ করুন।" },
  { q: "পেমেন্ট কিভাবে করব?", a: "bKash, Nagad, Rocket, ব্যাংক ট্রান্সফার ও কার্ড — সব মাধ্যম সাপোর্টেড। ৫০% অ্যাডভান্স, বাকি ডেলিভারির সময়।" },
  { q: "Ad চালাতে হলে আলাদা সার্ভিস লাগবে?", a: "পেজ সেটআপে Ad-রেডি অপটিমাইজেশন অন্তর্ভুক্ত। Ad ক্যাম্পেইন ম্যানেজমেন্ট আমাদের ডিজিটাল মার্কেটিং সার্ভিসের অংশ।" },
  { q: "রিভিশন কতবার দেওয়া যাবে?", a: "স্ট্যান্ডার্ড ও প্রিমিয়ামে আনলিমিটেড মাইনর রিভিশন, স্টার্টারে ২টি রিভিশন কাভার করা হয়।" },
];

function FacebookPageSetup() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MiniNav />
      <Hero />
      <Packages />
      <Timeline />
      <LeadForm />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function MiniNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-brand/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="হোম">
          <img
            src={logoAsset.url}
            alt="Webtrixit"
            className="h-9 w-auto shrink-0 drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)] sm:h-10"
          />
          <span className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">Webtrixit</span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-2"
        >
          <ArrowLeft className="h-4 w-4" /> হোমে ফিরে যান
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Facebook className="h-3.5 w-3.5 text-electric" /> ফেসবুক বিজনেস পেজ সেটআপ
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            প্রফেশনাল <span className="text-gradient">ফেসবুক বিজনেস পেজ</span> — Ad-রেডি সেটআপ।
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            শূন্য থেকে ব্র্যান্ডেড পেজ, Business Manager, অটোমেশন ও ভেরিফিকেশন-রেডি অপটিমাইজেশন — মাত্র ২৪–৭২ ঘণ্টায়।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#packages"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]"
            >
              প্যাকেজ দেখুন <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#lead-form"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2"
            >
              অর্ডার ফর্ম পূরণ করুন
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-neon" /> ২৪ ঘণ্টায় ডেলিভারি</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-electric" /> ১০০% ওনারশিপ আপনার</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-lavender" /> Ad-রেডি অপটিমাইজেশন</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="packages" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">প্যাকেজ ও প্রাইসিং</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            আপনার বাজেট অনুযায়ী বেছে নিন
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            সব প্যাকেজেই সম্পূর্ণ ওনারশিপ, ব্র্যান্ডেড ডিজাইন ও Ad-রেডি অপটিমাইজেশন অন্তর্ভুক্ত।
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <article
              key={p.id}
              className={`relative flex flex-col rounded-3xl border p-6 backdrop-blur transition hover:translate-y-[-4px] ${
                p.badge
                  ? "border-neon/40 bg-card/80 shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--neon)_45%,transparent)]"
                  : "border-border bg-card/60"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon px-3 py-1 text-[11px] font-bold text-brand">
                  {p.badge}
                </span>
              )}
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} text-white`}>
                <Facebook className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-foreground">{p.price}</span>
                {p.oldPrice && <span className="text-sm text-muted-foreground line-through">{p.oldPrice}</span>}
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-neon" /> ডেলিভারি: <span className="font-semibold text-foreground">{p.delivery}</span>
              </div>

              <ul className="mt-5 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={waUrl(`আসসালামু আলাইকুম, আমি "${p.name}" প্যাকেজে ফেসবুক বিজনেস পেজ সেটআপ নিতে চাই।`)}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  p.badge
                    ? "bg-neon text-brand hover:opacity-90"
                    : "border border-border bg-surface/60 text-foreground hover:bg-surface-2"
                }`}
              >
                <MessageCircle className="h-4 w-4" /> {p.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="border-y border-border/60 bg-surface/40 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">ডেলিভারি টাইমলাইন</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            অর্ডার থেকে <span className="text-gradient">লাইভ পেজ</span> — ৫ ধাপে
          </h2>
        </div>

        <ol className="relative space-y-5 border-l border-border/70 pl-6 md:pl-8">
          {timeline.map((t) => (
            <li key={t.step} className="relative">
              <span className="absolute -left-[34px] grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-electric to-lavender font-display text-sm font-bold text-white shadow-lg md:-left-[42px]">
                {t.step}
              </span>
              <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-foreground">{t.title}</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                    <Clock className="h-3 w-3 text-neon" /> {t.eta}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function LeadForm() {
  const [sent, setSent] = useState(false);
  const [pkg, setPkg] = useState("standard");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const phone = String(fd.get("phone") || "");
    const business = String(fd.get("business") || "");
    const category = String(fd.get("category") || "");
    const notes = String(fd.get("notes") || "");
    const packageName = packages.find((p) => p.id === pkg)?.name ?? pkg;

    const msg =
      `আসসালামু আলাইকুম, আমি ফেসবুক বিজনেস পেজ সেটআপ নিতে চাই।\n\n` +
      `নাম: ${name}\nফোন: ${phone}\nব্যবসার নাম: ${business}\nক্যাটাগরি: ${category}\n` +
      `প্যাকেজ: ${packageName}\nনোট: ${notes || "—"}`;

    window.open(waUrl(msg), "_blank", "noreferrer");
    setSent(true);
  }

  return (
    <section id="lead-form" className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">অর্ডার / কনসাল্টেশন ফর্ম</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            ২ মিনিটে ফর্ম পূরণ করুন
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            ফর্ম সাবমিট করলে সরাসরি WhatsApp-এ আপনার ডিটেইল পাঠানো হবে — আমাদের টিম দ্রুত রেসপন্ড করবে।
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="আপনার নাম *" name="name" placeholder="যেমন: মোহাম্মদ রহিম" required />
            <Field label="মোবাইল / WhatsApp *" name="phone" type="tel" placeholder="01XXXXXXXXX" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="ব্যবসার নাম *" name="business" placeholder="যেমন: রহিম ফ্যাশন হাউস" required />
            <Field label="ব্যবসার ক্যাটাগরি" name="category" placeholder="যেমন: ফ্যাশন / রেস্টুরেন্ট / সার্ভিস" />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              প্যাকেজ *
            </label>
            <div className="grid gap-2 sm:grid-cols-3">
              {packages.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPkg(p.id)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                    pkg === p.id
                      ? "border-neon bg-neon/10 text-foreground"
                      : "border-border bg-surface/60 text-muted-foreground hover:bg-surface-2"
                  }`}
                >
                  <div className="font-semibold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.price}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              অতিরিক্ত নোট
            </label>
            <textarea
              name="notes"
              rows={4}
              placeholder="আপনার প্রয়োজনীয়তা, ব্র্যান্ড কালার, বা বিশেষ কোনো ফিচার..."
              className="w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]"
          >
            <Send className="h-4 w-4" /> WhatsApp-এ পাঠিয়ে দিন
          </button>

          {sent && (
            <p className="text-center text-sm text-neon">
              ✓ ধন্যবাদ! আপনার তথ্য WhatsApp-এ ওপেন হয়েছে — মেসেজটি সেন্ড করে দিন।
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", placeholder, required,
}: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-electric focus:outline-none"
      />
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-y border-border/60 bg-surface/40 py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <HelpCircle className="h-3.5 w-3.5 text-neon" /> সচরাচর জিজ্ঞাসিত প্রশ্ন
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            ফেসবুক পেজ সেটআপ সম্পর্কে FAQ
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base font-semibold text-foreground">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition ${isOpen ? "bg-neon/20 text-neon" : "text-muted-foreground"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
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

function FinalCTA() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-10 text-center md:p-14"
          style={{ background: "linear-gradient(120deg, oklch(0.19 0.04 265), oklch(0.22 0.05 258))" }}
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            আজই শুরু করুন — কালই আপনার পেজ লাইভ।
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            আমাদের টিম আপনার সাথে কথা বলে ২৪ ঘণ্টার মধ্যে সেটআপ শুরু করবে।
          </p>
          <a
            href={waUrl("আসসালামু আলাইকুম, আমি ফেসবুক বিজনেস পেজ সেটআপ সম্পর্কে বিস্তারিত জানতে চাই।")}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp-এ চ্যাট করুন
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40 py-10">
      <div className="mx-auto max-w-7xl px-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Webtrix IT Solution — সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}
