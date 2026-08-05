import { Link } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, Check, ExternalLink, MessageCircle, ShieldCheck,
  Sparkles, Target, TrendingUp, Wrench, ListChecks, HelpCircle, Plus, Minus, Star,
  ChevronLeft, ChevronRight, Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import { services, type ServiceItem } from "@/lib/services-data";
const logoAsset = { url: "/webtrix-logo.png" };

import { submitLead } from "@/lib/leads.functions";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "8801835985730";
const waUrl = (title: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Bioxin, I would like to know more about your "${title}" service.`,
  )}`;


export function ServiceDetail({ service }: { service: ServiceItem }) {
  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const [demoUrl, setDemoUrl] = useState<string>(service.demoUrl);
  const [saleUrl, setSaleUrl] = useState<string>("");
  const [demoImage, setDemoImage] = useState<string | null>(null);


  useEffect(() => {
    // Ensure the service page always opens from the top, not restored/mid-scroll.
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [service.slug]);

  useEffect(() => {
    setDemoUrl(service.demoUrl);
    setSaleUrl("");
    setDemoImage(null);

    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase
          .from("service_links")
          .select("demo_url, sale_url, demo_image")

          .eq("service_slug", service.slug)
          .maybeSingle();
        if (cancelled || !data) return;
        if (data.demo_url) setDemoUrl(data.demo_url);
        if (data.sale_url) setSaleUrl(data.sale_url);
        if (data.demo_image) setDemoImage(data.demo_image);

      } catch { /* silent — fallback to defaults */ }
    })();
    return () => { cancelled = true; };
  }, [service.slug, service.demoUrl]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-brand/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Home">
            <img src={logoAsset.url} alt="Bioxin" className="h-9 w-auto shrink-0 drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)] sm:h-10" />
            <span className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">Bioxin</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-surface-2 sm:text-sm">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">All Services</span><span className="sm:hidden">Back</span>
          </Link>

        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="grid-bg absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Services
          </Link>

          <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/15 text-electric">
            <Icon className="h-7 w-7" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] sm:text-5xl">
            {service.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base text-muted-foreground sm:text-lg">
            {service.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={waUrl(service.title)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>

            {saleUrl && (
              <a href={saleUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-brand transition hover:translate-y-[-1px]">
                Order Now <ArrowRight className="h-4 w-4" />
              </a>

            )}
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-2">
              View Live Demo <ArrowRight className="h-4 w-4" />
            </a>

          </div>
        </div>
      </section>

      <Section eyebrow="Why You Need This" title={`Why You Should Choose ${service.subject}`} icon={Sparkles} accent="text-electric" bg="bg-electric/10">
        <ul className="grid gap-4 md:grid-cols-2">
          {service.why.map((w) => (
            <li key={w} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-electric" />
              <p className="text-sm leading-relaxed text-foreground">{w}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Effectiveness" title={`The Effectiveness of our ${service.subject}`} icon={Target} accent="text-lavender" bg="bg-lavender/10">
        <ul className="grid gap-4 md:grid-cols-2">
          {service.effectiveness.map((f) => (
            <li key={f} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-lavender" />
              <p className="text-sm leading-relaxed text-foreground">{f}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Benefits" title={`Benefits of our ${service.subject}`} icon={TrendingUp} accent="text-neon" bg="bg-neon/10">
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">Process & Features</p>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            How We Build Your <span className="text-gradient">{service.subject}</span>
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            We guide you through every step, ensuring transparency and professional care — so the final result is exactly what you envision.
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
                Included Features
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">Use Cases</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Who is this for?</h2>

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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">Live Demo</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Experience it <span className="text-gradient">Live</span>
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Click the link below to see a complete demo. Experience how every element works in real-time.
          </p>


          <div
            className="mt-8 overflow-hidden rounded-3xl border border-border"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow)" }}
          >
            <div className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-xs font-semibold text-neon">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-neon" /> Live Preview
                </div>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{service.demoLabel}</h3>
                <p className="mt-2 break-all text-xs text-muted-foreground">{demoUrl}</p>
              </div>
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-brand transition hover:translate-y-[-1px]"
              >
                Open in New Tab <ExternalLink className="h-4 w-4" />

              </a>
            </div>

            <div className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-background md:mx-6 md:mb-6">
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex-1 truncate rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
                  {demoUrl}
                </div>
              </div>
              <div className="relative aspect-[16/10] w-full bg-background md:aspect-[16/9]">
                {demoImage ? (
                  <img
                    src={demoImage}
                    alt={`${service.title} — Preview`}

                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <iframe
                    src={demoUrl}
                    title={`${service.title} — Live Demo`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                )}

              </div>
            </div>

            <p className="flex items-center gap-2 px-6 pb-6 text-xs text-muted-foreground md:px-8 md:pb-8">
              <ShieldCheck className="h-3.5 w-3.5 text-neon" />
              Some sites may not load in embed for security reasons — please click "Open in New Tab" in that case.

            </p>
          </div>
        </div>
      </section>

      <ReviewsSlider subject={service.subject} />
      <ServiceFAQ subject={service.subject} />
      <ServiceLeadForm serviceTitle={service.title} />

      <section className="border-t border-border/60 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Start Your <span className="text-gradient">{service.title}</span> Journey Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Send us a message on WhatsApp — get free advice, a timeline, and a quote within 24 hours.
          </p>

          <a
            href={waUrl(service.title)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px]"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp

          </a>
        </div>
      </section>

      <section className="border-t border-border/60 bg-surface/40 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">More Services</p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Other Services</h2>

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
                  <h3 className="mt-4 font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-electric">
                    View Details <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface/40 py-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5">
          <img src={logoAsset.url} alt="Bioxin" className="h-9 w-auto drop-shadow-[0_2px_10px_rgba(59,130,246,0.35)]" />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Bioxin</p>

        </div>
      </footer>

      <a
        href={waUrl(service.title)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"

        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-neon text-brand shadow-[var(--shadow-neon)] transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

    </div>
  );
}

const SITE_URL = "https://webtrixit.lovable.app";

const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/XoKKKE5uTDWSw8MRim4BZzbm9YF3/social-images/social-1785258383263-logo_no_text.webp";

export function serviceHead(service: ServiceItem) {
  const title = `${service.title} | Bioxin`;
  const desc = `${service.title} Service — ${service.tagline} Fast loading, SEO-friendly & Premium Design.`;
  const keywords = `${service.title}, ${service.subject}, skin care services, dermatological care, clinical skin treatments, bioxin, #bioxin`;


  return {
    meta: [
      { title },
      { name: "description", content: desc },
      { name: "keywords", content: keywords },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/services/${service.slug}` },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services/${service.slug}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: desc,
          provider: {
            "@type": "ProfessionalService",
            name: "Bioxin",
            url: SITE_URL,

          },
          areaServed: "Bangladesh",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,

            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: `${SITE_URL}/#services`,

            },
            {
              "@type": "ListItem",
              position: 3,
              name: service.title,
              item: `${SITE_URL}/services/${service.slug}`,
            },
          ],
        }),
      },
    ],
  };
}


export function ServiceNotFound() {
  return (
    <div className="grid min-h-dvh place-items-center bg-background px-5 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Service Not Found</h1>
        <p className="mt-3 text-muted-foreground">This link may be incorrect or has been moved.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Home
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
    { name: "Sophia Rahman", role: "Founder, Bloom Boutique", rating: 5,
      quote: `After starting our ${subject} routine with Bioxin, our results are visible in just weeks. Premium care and expert support.` },
    { name: "David Miller", role: "CEO, TechNova", rating: 5,
      quote: `Their ${subject} solutions transformed our clinical approach. Professional communication at every stage.` },
    { name: "Sarah Khan", role: "Founder, Glow Studio", rating: 5,
      quote: `I looked everywhere for ${subject} — Bioxin delivered the most premium results and timely care.` },
    { name: "Michael Chen", role: "Manager, ShopEase", rating: 5,
      quote: `I saw immediate improvements with my ${subject}. The team understands skin science perfectly.` },
    { name: "Elena Gilbert", role: "Director, EduSpark", rating: 5,
      quote: `Since the ${subject} setup, our brand feels more professional and patient trust has grown significantly.` },

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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lavender">Patient Reviews</p>
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Real Patient Stories for {subject}
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
                  aria-label={`Review ${k + 1}`}
                  className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-electric" : "w-2 bg-muted-foreground/40"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous Review" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 transition hover:bg-surface-2">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={next} aria-label="Next Review" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface/60 transition hover:bg-surface-2">
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
    { q: `How long does the ${subject} process take?`,
      a: `Depending on the scope, ${subject} plans are typically established within 7–21 days. Immediate concerns can be addressed faster.` },
    { q: `What is the cost for ${subject}?`,
      a: `Plans are personalized based on required treatments and duration. Contact us on WhatsApp for a free consultation and quote within 24 hours.` },
    { q: `Will I receive support after the initial consultation?`,
      a: `Yes. We provide follow-up care and personalized routine maintenance plans.` },
    { q: `Can I use my current products with your ${subject}?`,
      a: `Absolutely. Your ${subject} will be integrated with your existing routine where appropriate.` },
    { q: `What is the payment process?`,
      a: `We accept various payment methods including credit cards and digital transfers. Options will be discussed during consultation.` },
    { q: `Do I own my treatment records?`,
      a: `Yes, all clinical records and progress reports are available to you at any time.` },

  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-electric/10 text-electric">
            <HelpCircle className="h-4 w-4" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-electric">Common Questions</p>
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Frequently Asked Questions about {subject}
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
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", budget: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    try {
      const res = await submitLead({
        data: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: serviceTitle,
          budget: form.budget,
          message: form.message,
          source_page: typeof window !== "undefined" ? window.location.pathname : "",
        },
      });
      if (!res.ok) setErrorMsg("সেভ করতে সমস্যা হয়েছে — আপাতত WhatsApp-এ পাঠানো হচ্ছে।");
    } catch (err) {
      console.error(err);
      setErrorMsg("সেভ করতে সমস্যা হয়েছে — আপাতত WhatsApp-এ পাঠানো হচ্ছে।");
    } finally {
      setSaving(false);
    }
    const text = encodeURIComponent(
      `Hello Bioxin,\n\nI am interested in "${serviceTitle}".\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nBudget: ${form.budget}\n\nDetails: ${form.message}`,
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon">Lead Form</p>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Get a <span className="text-gradient">Free Consultation</span> for {serviceTitle}
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
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-ring transition hover:translate-y-[-1px] disabled:opacity-60"
              >
                <Send className="h-4 w-4" /> {saving ? "পাঠানো হচ্ছে..." : "কোটেশনের জন্য পাঠান"}
              </button>
              {errorMsg && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive">
                  {errorMsg}
                </p>
              )}
              {sent && !errorMsg && (
                <p className="rounded-xl border border-neon/30 bg-neon/10 px-4 py-3 text-xs text-neon">
                  ধন্যবাদ! আপনার তথ্য সেভ হয়েছে এবং WhatsApp-এ পাঠানো হয়েছে — আমরা শীঘ্রই যোগাযোগ করব।
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
