import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, Check, ExternalLink, MessageCircle, HelpCircle, Plus, Minus, ShoppingBag, Star,
} from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/webtrix-logo.png.asset.json";
import { ReadingControls } from "@/components/ReadingControls";

const WHATSAPP_NUMBER = "8801835985730";
const waUrl = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const Route = createFileRoute("/services/readymade-ecommerce-website")({
  head: () => ({
    meta: [
      { title: "রেডিমেড ই-কমার্স ওয়েবসাইট — Webtrix IT Solution" },
      {
        name: "description",
        content:
          "মাত্র ৪৮ ঘণ্টায় লাইভ — Webtrix-এর প্রি-বিল্ট, প্রিমিয়াম রেডিমেড ই-কমার্স টেমপ্লেট থেকে পছন্দমতো একটি বেছে নিন।",
      },
      { property: "og:title", content: "রেডিমেড ই-কমার্স ওয়েবসাইট — Webtrix IT Solution" },
      {
        property: "og:description",
        content: "নতুন নতুন প্রি-বিল্ট ই-কমার্স টেমপ্লেট — সাথে সাথেই লাইভ অনলাইন স্টোর।",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: ReadymadePage,
});

type Template = {
  id: string;
  name: string;
  niche: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  gradient: string;
  emoji: string;
  features: string[];
  demoUrl: string;
};

const templates: Template[] = [
  {
    id: "luxefash",
    name: "LuxeFash",
    niche: "ফ্যাশন / ক্লোদিং ব্র্যান্ড",
    price: "৳ ৭,৫০০",
    oldPrice: "৳ ১২,০০০",
    badge: "সবচেয়ে জনপ্রিয়",
    gradient: "from-electric to-lavender",
    emoji: "👗",
    features: ["ভ্যারিয়েন্ট (সাইজ/কালার)", "লুকবুক গ্যালারি", "bKash / Nagad / COD"],
    demoUrl: "https://example.com/demo-luxefash",
  },
  {
    id: "gadgetzone",
    name: "GadgetZone",
    niche: "ইলেকট্রনিক্স / গ্যাজেট",
    price: "৳ ৮,০০০",
    gradient: "from-neon to-electric",
    emoji: "📱",
    features: ["Compare প্রোডাক্ট", "রিভিউ সিস্টেম", "কুরিয়ার API"],
    demoUrl: "https://example.com/demo-gadgetzone",
  },
  {
    id: "freshcart",
    name: "FreshCart",
    niche: "গ্রোসারি / ফুড ডেলিভারি",
    price: "৳ ৯,০০০",
    badge: "নতুন",
    gradient: "from-neon to-lavender",
    emoji: "🛒",
    features: ["জোন-ভিত্তিক ডেলিভারি", "টাইম স্লট বুকিং", "লাইভ অর্ডার ট্র্যাকিং"],
    demoUrl: "https://example.com/demo-freshcart",
  },
  {
    id: "beautybox",
    name: "BeautyBox",
    niche: "কসমেটিক্স / স্কিনকেয়ার",
    price: "৳ ৭,৫০০",
    gradient: "from-lavender to-electric",
    emoji: "💄",
    features: ["শেড সিলেক্টর", "বান্ডেল অফার", "লয়্যালটি পয়েন্ট"],
    demoUrl: "https://example.com/demo-beautybox",
  },
  {
    id: "furnicraft",
    name: "FurniCraft",
    niche: "ফার্নিচার / হোম ডেকর",
    price: "৳ ১০,০০০",
    gradient: "from-electric to-neon",
    emoji: "🛋️",
    features: ["3D-ভিউ রেডি", "কাস্টম অর্ডার ফর্ম", "EMI পেমেন্ট"],
    demoUrl: "https://example.com/demo-furnicraft",
  },
  {
    id: "bookshelf",
    name: "BookShelf",
    niche: "বই / স্টেশনারি",
    price: "৳ ৬,৫০০",
    gradient: "from-lavender to-neon",
    emoji: "📚",
    features: ["ক্যাটাগরি ফিল্টার", "প্রি-অর্ডার", "লেখক পেজ"],
    demoUrl: "https://example.com/demo-bookshelf",
  },
  {
    id: "kidsland",
    name: "KidsLand",
    niche: "বেবি / কিডস প্রোডাক্ট",
    price: "৳ ৭,০০০",
    gradient: "from-neon to-electric",
    emoji: "🧸",
    features: ["এজ-গ্রুপ ফিল্টার", "গিফট র‍্যাপ অপশন", "সেফটি ব্যাজ"],
    demoUrl: "https://example.com/demo-kidsland",
  },
  {
    id: "healthplus",
    name: "HealthPlus",
    niche: "ফার্মেসি / হেলথকেয়ার",
    price: "৳ ৯,৫০০",
    gradient: "from-electric to-lavender",
    emoji: "💊",
    features: ["প্রেসক্রিপশন আপলোড", "সাবস্ক্রিপশন অর্ডার", "24/7 চ্যাট"],
    demoUrl: "https://example.com/demo-healthplus",
  },
];

const faqs = [
  {
    q: "রেডিমেড ই-কমার্স ওয়েবসাইট আসলে কী?",
    a: "এটি আমাদের প্রি-বিল্ট, প্রফেশনাল ডিজাইন করা প্রস্তুত ই-কমার্স ওয়েবসাইট। শুধু আপনার লোগো, প্রোডাক্ট আর ব্র্যান্ডিং বসিয়ে দিলেই ৪৮ ঘণ্টার মধ্যে অনলাইনে লাইভ করা যায়।",
  },
  {
    q: "রেডিমেড সাইট লাইভ হতে কত সময় লাগে?",
    a: "সাধারণত পেমেন্ট কনফার্ম হওয়ার পর ২৪–৪৮ ঘণ্টার মধ্যে ব্র্যান্ডিং কাস্টমাইজ ও প্রথম ২০-৫০টি প্রোডাক্ট আপলোড করে সম্পূর্ণ লাইভ করে দেওয়া হয়।",
  },
  {
    q: "bKash / Nagad / ক্যাশ অন ডেলিভারি সাপোর্ট আছে কি?",
    a: "হ্যাঁ, প্রতিটি টেমপ্লেটে bKash, Nagad, SSLCommerz ও Cash on Delivery (COD) — চারটি অপশনই কনফিগার করা হয়ে থাকে।",
  },
  {
    q: "পরে কি ডিজাইন বা ফিচার কাস্টমাইজ করা যাবে?",
    a: "অবশ্যই। কালার, ফন্ট, ব্যানার — সবই কাস্টমাইজেবল। এছাড়া পরবর্তীতে নতুন ফিচার (মাল্টি-ভেন্ডর, সাবস্ক্রিপশন, POS ইত্যাদি) অতিরিক্ত চার্জে যোগ করা যাবে।",
  },
  {
    q: "প্রোডাক্ট আমি নিজে আপলোড করতে পারব?",
    a: "হ্যাঁ, সহজ অ্যাডমিন প্যানেল থেকে আপনি নিজেই আনলিমিটেড প্রোডাক্ট, ক্যাটাগরি, ছবি ও অফার যোগ/এডিট করতে পারবেন। আমরা প্রথম সেটআপে ২০-৫০টি প্রোডাক্ট আপলোড করে দিই এবং একটি ট্রেনিং সেশনও দিই।",
  },
  {
    q: "ডোমেইন ও হোস্টিং কি এর মধ্যে আছে?",
    a: "প্রথম বছরের জন্য ১টি .com/.com.bd ডোমেইন ও ১ বছরের হোস্টিং ফ্রি। পরের বছর থেকে renewal চার্জ প্রযোজ্য।",
  },
  {
    q: "পেমেন্ট কীভাবে করব?",
    a: "bKash / Nagad / ব্যাংক ট্রান্সফারে ৫০% অ্যাডভান্স, লাইভ হওয়ার পর বাকি ৫০% — এই পদ্ধতিতে পেমেন্ট নেওয়া হয়। সব বিস্তারিত WhatsApp-এ কথা বলে ঠিক করা হবে।",
  },
  {
    q: "সাপোর্ট কত দিন পাব?",
    a: "লাইভ হওয়ার পর ৩০ দিনের ফ্রি বাগ-ফিক্স ও সাপোর্ট। এর পর মাসিক / বার্ষিক সাপোর্ট প্যাকেজ নেওয়া যাবে।",
  },
];

function ReadymadePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MiniNav />
      <Hero />
      <TemplatesGrid />
      <WhyReadymade />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ReadingControls />
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
            alt="Webtrix IT Solution"
            className="h-10 w-auto shrink-0 rounded-md bg-white/95 px-2 py-1"
          />
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
            <ShoppingBag className="h-3.5 w-3.5 text-neon" /> রেডিমেড ই-কমার্স স্টোর
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            নতুন নতুন <span className="text-gradient">রেডিমেড ই-কমার্স ওয়েবসাইট</span> — মাত্র ৪৮ ঘণ্টায় লাইভ।
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Webtrix-এর প্রিমিয়াম, প্রি-বিল্ট ই-কমার্স টেমপ্লেট থেকে পছন্দমতো একটি বেছে নিন — আমরা আপনার ব্র্যান্ডিং, প্রোডাক্ট ও পেমেন্ট বসিয়ে সম্পূর্ণ স্টোর লাইভ করে দিই।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#templates"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]"
            >
              টেমপ্লেট দেখুন <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={waUrl("আসসালামু আলাইকুম, আমি রেডিমেড ই-কমার্স ওয়েবসাইট সম্পর্কে জানতে চাই।")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp-এ কথা বলুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TemplatesGrid() {
  return (
    <section id="templates" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">
            আমাদের টেমপ্লেট কালেকশন
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            পছন্দমতো একটি বেছে নিন
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            প্রতিটি টেমপ্লেট মোবাইল-ফার্স্ট, দ্রুত লোডিং, SEO-ফ্রেন্ডলি ও Bangladesh পেমেন্ট গেটওয়ে-রেডি।
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <article
              key={t.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur transition hover:border-electric/40 hover:shadow-lg hover:shadow-electric/10"
            >
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${t.gradient} p-6`}
                aria-hidden="true"
              >
                <div className="absolute inset-0 opacity-30 mix-blend-overlay grid-bg" />
                <div className="relative flex h-full flex-col items-center justify-center">
                  <div className="text-6xl drop-shadow-lg">{t.emoji}</div>
                  <div className="mt-3 font-display text-2xl font-bold text-white drop-shadow">
                    {t.name}
                  </div>
                </div>
                {t.badge && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-neon backdrop-blur">
                    <Star className="h-3 w-3" /> {t.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.niche}
                </div>
                <ul className="mt-4 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="font-display text-2xl font-bold text-gradient">{t.price}</div>
                    {t.oldPrice && (
                      <div className="text-xs text-muted-foreground line-through">{t.oldPrice}</div>
                    )}
                  </div>
                  <a
                    href={t.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-electric hover:underline"
                  >
                    লাইভ প্রিভিউ <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                <a
                  href={waUrl(
                    `আসসালামু আলাইকুম, আমি "${t.name}" (${t.niche}) রেডিমেড ই-কমার্স টেমপ্লেটটি কিনতে চাই।`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" /> এই টেমপ্লেটটি কিনুন
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyReadymade() {
  const points = [
    { title: "৪৮ ঘণ্টায় লাইভ", desc: "কাস্টম ডেভেলপমেন্টের অপেক্ষা নয় — দ্রুততম সময়ে অনলাইনে।" },
    { title: "কম খরচে শুরু", desc: "প্রুভেন টেমপ্লেট, তাই ডেভেলপমেন্ট খরচ কয়েকগুণ কম।" },
    { title: "প্রুভেন কনভার্শন", desc: "টেস্টেড লে-আউট ও চেকআউট ফ্লো — প্রথম দিন থেকেই সেল।" },
    { title: "সহজ কাস্টমাইজেশন", desc: "কালার, ফন্ট, লোগো, ব্যানার — সবই আপনার ব্র্যান্ডে।" },
  ];
  return (
    <section className="border-y border-border/60 bg-surface/40 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            কেন <span className="text-gradient">রেডিমেড</span> ই-কমার্স?
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
            >
              <div className="font-display text-lg font-bold">{p.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <HelpCircle className="h-3.5 w-3.5 text-neon" /> সচরাচর জিজ্ঞাসিত প্রশ্ন
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            রেডিমেড ই-কমার্স সম্পর্কে FAQ
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-base font-semibold text-foreground">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition ${
                      isOpen ? "bg-neon/20 text-neon" : "text-muted-foreground"
                    }`}
                  >
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
    <section className="px-5 pb-20">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-10 text-center md:p-14"
          style={{
            background:
              "linear-gradient(120deg, oklch(0.19 0.04 265), oklch(0.22 0.05 165))",
          }}
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            টেমপ্লেট পছন্দ হয়েছে? এখনই WhatsApp করুন।
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            আমাদের টিম আপনার সাথে কথা বলে ৪৮ ঘণ্টার মধ্যে সম্পূর্ণ স্টোর লাইভ করে দেবে।
          </p>
          <a
            href={waUrl(
              "আসসালামু আলাইকুম, আমি একটি রেডিমেড ই-কমার্স টেমপ্লেট নিতে আগ্রহী।",
            )}
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
