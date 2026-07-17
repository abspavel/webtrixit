import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Check, X, MessageCircle, Star, ShieldCheck, Menu,
  Phone, Mail, MapPin, TrendingUp, Zap,
} from "lucide-react";
import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import logoAsset from "@/assets/webtrix-logo.png.asset.json";
import { ReadingControls } from "@/components/ReadingControls";
import { services } from "@/lib/services-data";

const WHATSAPP_NUMBER = "8801700000000"; // update to real number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Webtrix, I'd like to discuss a project.",
)}`;

export const Route = createFileRoute("/")({
  component: HomePage,
});


const clients = ["Acme", "Nexlify", "Orbit", "Pulse", "Vantage", "Kairo", "Northwind", "Lumen", "Zephyr", "Halcyon"];

const stories = [
  { name: "Rashed Ahmed", role: "Founder, ShopKart BD", quote: "Webtrix rebuilt our store and sales jumped 3.2× in two months. The team just gets conversion." , rating: 5 },
  { name: "Nadia Karim", role: "Director, EduPrime LMS", quote: "Our LMS launched in 3 weeks — students, payments and courses working flawlessly on mobile.", rating: 5 },
  { name: "Tanvir Hossain", role: "CEO, GrowMedia", quote: "The AI video ads they made outperformed our old creatives by 4× on CPA. Genuinely premium work.", rating: 5 },
];

const portfolio = [
  { title: "Luxe Landing Page", tag: "Landing Page", gradient: "from-electric to-lavender" },
  { title: "Kart+ E-commerce", tag: "E-commerce", gradient: "from-lavender to-neon" },
  { title: "EduPrime LMS", tag: "LMS", gradient: "from-neon to-electric" },
  { title: "Panel Pro SMM", tag: "SMM Panel", gradient: "from-electric to-neon" },
  { title: "Orbit CRM", tag: "Custom Software", gradient: "from-lavender to-electric" },
  { title: "PulseAds Video", tag: "AI Video", gradient: "from-neon to-lavender" },
];

const beforeAfter = [
  { metric: "Conversion Rate", before: "1.2%", after: "4.8%", up: "+300%" },
  { metric: "Page Load Time", before: "6.4s", after: "1.1s", up: "6× faster" },
  { metric: "Ad ROAS", before: "1.7×", after: "5.9×", up: "+247%" },
  { metric: "Bounce Rate", before: "72%", after: "28%", up: "−61%" },
];

const comparison = [
  { point: "Premium, custom design", us: true, them: false },
  { point: "Mobile-first & lightning fast", us: true, them: false },
  { point: "Conversion-focused structure", us: true, them: false },
  { point: "Post-launch support", us: true, them: false },
  { point: "Templated, generic look", us: false, them: true },
  { point: "Hidden fees & delays", us: false, them: true },
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
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#results", label: "Results" },
    { href: "#compare", label: "Why Us" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-brand/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-2" aria-label="Webtrix IT Solution home">
          <img src={logoAsset.url} alt="Webtrix IT Solution" className="h-10 w-auto shrink-0 rounded-md bg-white/95 px-2 py-1" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-lg border border-border p-2 md:hidden">
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
              Get a Quote <ArrowRight className="h-4 w-4" />
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
            <span className="h-2 w-2 rounded-full bg-neon" /> Trusted digital partner since 2019
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            Premium <span className="text-gradient">websites & software</span> that turn visitors into customers.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Webtrix IT Solution builds landing pages, e-commerce stores, LMS platforms, custom software and AI-powered marketing — designed to be fast, mobile-first and conversion-obsessed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2">
              See Our Work
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { k: "250+", v: "Projects Delivered" },
              { k: "4.9/5", v: "Client Rating" },
              { k: "12+", v: "Countries Served" },
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
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Trusted by ambitious teams worldwide</p>
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
    "Website looks outdated and doesn't convert visitors.",
    "Slow load times killing your ad performance and SEO.",
    "No proper e-commerce, LMS or software to scale the business.",
    "Ads are running but the funnel leaks — no pixel, no tracking.",
  ];
  const solutions = [
    "Premium, conversion-first design tailored to your brand.",
    "Lightning-fast, mobile-optimised builds that load under 2s.",
    "Full-stack e-commerce, LMS and custom software done end-to-end.",
    "Pixel, CAPI and analytics installed correctly — every event tracked.",
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="The gap we close" title="You have the business. We build the digital engine." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="border-destructive/20">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
              <X className="h-3.5 w-3.5" /> The problem
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
              <Check className="h-3.5 w-3.5" /> Our solution
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
                <MessageCircle className="h-3.5 w-3.5" /> Direct WhatsApp
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Talk to a strategist in the next 5 minutes.</h3>
              <p className="mt-2 text-sm text-muted-foreground">Send us your project idea on WhatsApp — get a free quote, timeline and roadmap today.</p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
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
        <SectionHeader eyebrow="Our services" title="Everything you need to launch, sell and scale online." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            const accents = ["text-electric", "text-neon", "text-lavender"];
            const bg = ["bg-electric/10", "bg-neon/10", "bg-lavender/10"];
            const c = i % 3;
            return (
              <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40">
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg[c]} ${accents[c]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
              </div>
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
        <SectionHeader eyebrow="Client success stories" title="Real teams. Real revenue. Real results." />
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
        <SectionHeader eyebrow="Work we've done" title="Selected projects across web, commerce and software." />
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
        <SectionHeader eyebrow="Before & after" title="What premium builds actually deliver." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {beforeAfter.map((b) => (
            <div key={b.metric} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{b.metric}</div>
              <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">Before</div>
                  <div className="mt-1 font-display text-2xl font-bold text-muted-foreground line-through">{b.before}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-[10px] font-semibold uppercase text-neon">After</div>
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
        <SectionHeader eyebrow="Us vs others" title="Why teams choose Webtrix over freelancers and generic agencies." />
        <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-border bg-surface-2 px-6 py-4 text-sm">
            <div className="font-semibold">What matters</div>
            <div className="text-center font-display font-bold text-gradient">Webtrix</div>
            <div className="text-center font-semibold text-muted-foreground">Others</div>
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
                <Zap className="h-3.5 w-3.5 text-neon" /> Booking projects for this quarter
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Let's build your <span className="text-gradient">digital engine</span>.
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Tell us about your project. Get a free strategy call, quote and timeline within 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:opacity-90">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <a href="mailto:hello@webtrixit.com" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2">
                  <Mail className="h-4 w-4" /> Email Us
                </a>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-electric" /> +880 1700 000 000</div>
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-neon" /> hello@webtrixit.com</div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-lavender" /> Dhaka, Bangladesh · Serving worldwide</div>
              </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur">
              <div className="grid gap-4">
                <Field label="Your name" placeholder="Jane Doe" />
                <Field label="Email" type="email" placeholder="jane@company.com" />
                <Field label="What do you need?" placeholder="E.g. E-commerce site with 200 products" />
                <label className="text-xs font-medium text-muted-foreground">Message
                  <textarea rows={4} placeholder="Tell us more about your project..." className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                </label>
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:opacity-90">
                  Request Free Quote <ArrowRight className="h-4 w-4" />
                </button>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-neon" /> We reply within 24 hours. Your details stay private.
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
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Webtrix IT Solution. All rights reserved.</p>
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
