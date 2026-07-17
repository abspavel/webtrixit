import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, Check, ExternalLink, MessageCircle, ShieldCheck,
  Sparkles, Target, TrendingUp, Wrench, ListChecks,
} from "lucide-react";
import { services, getService } from "@/lib/services-data";
import logoAsset from "@/assets/webtrix-logo.png.asset.json";
import { ReadingControls } from "@/components/ReadingControls";

const WHATSAPP_NUMBER = "8801700000000";
const waUrl = (title: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `আসসালামু আলাইকুম, আমি "${title}" সার্ভিসটি সম্পর্কে জানতে চাই।`,
  )}`;

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "সার্ভিসটি পাওয়া যায়নি — Webtrix IT Solution" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
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
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="grid min-h-dvh place-items-center bg-background px-5 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">সার্ভিসটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-3 text-muted-foreground">এই লিঙ্কটি সম্ভবত ভুল বা সরানো হয়েছে।</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <ArrowLeft className="h-4 w-4" /> হোমে ফিরে যান
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="grid min-h-dvh place-items-center bg-background px-5 text-center">
      <div>
        <h1 className="font-display text-2xl font-bold">এই পেজটি লোড হয়নি</h1>
        <button onClick={reset} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          আবার চেষ্টা করুন
        </button>
      </div>
    </div>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: (typeof services)[number] };
  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-brand/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="হোম">
            <img src={logoAsset.url} alt="Webtrix IT Solution" className="h-10 w-auto shrink-0 rounded-md bg-white/95 px-2 py-1" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-surface-2 sm:text-sm">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">সব সার্ভিস</span><span className="sm:hidden">ব্যাক</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
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

      {/* Why use */}
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

      {/* Effectiveness */}
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

      {/* Benefits */}
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

      {/* How we build + Features */}
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

      {/* Use cases */}
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

      {/* Demo */}
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
            className="mt-8 overflow-hidden rounded-3xl border border-border p-8 md:p-10"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
          >
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold text-neon">
                  <span className="h-2 w-2 rounded-full bg-neon" /> লাইভ প্রিভিউ
                </div>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{service.demoLabel}</h3>
                <p className="mt-2 break-all text-sm text-muted-foreground">{service.demoUrl}</p>
              </div>
              <a
                href={service.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:translate-y-[-1px]"
              >
                ডেমো দেখুন <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-neon" />
              Demo শুধু preview-এর জন্য — আপনার সাইট আপনার ব্র্যান্ড ও প্রয়োজন অনুযায়ী বানানো হবে।
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
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

      {/* Related services */}
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
          <img src={logoAsset.url} alt="Webtrix IT Solution" className="h-9 w-auto rounded-md bg-white/95 px-2 py-1" />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Webtrix IT Solution</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
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
