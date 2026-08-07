import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import type { MarketingPage, Section } from "@/content/pages";
import { DemoButton } from "./page-cta";
import { PageFaq } from "./page-faq";

/* ————— section renderers ————— */

function SectionHeading({ heading, sub }: { heading?: string; sub?: string }) {
  if (!heading) return null;
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {heading}
      </h2>
      {sub && <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">{sub}</p>}
    </div>
  );
}

function StepsSection({ s }: { s: Extract<Section, { type: "steps" }> }) {
  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading heading={s.heading} sub={s.sub} />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((item, i) => (
          <li key={i} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-neon text-sm font-bold text-ink tabular-nums">
              {i + 1}
            </span>
            <h3 className="mt-4 text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function FeaturesSection({ s }: { s: Extract<Section, { type: "features" }> }) {
  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading heading={s.heading} sub={s.sub} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item, i) => {
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                {item.href && (
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-[oklch(0.64_0.19_42)]" />
                )}
              </div>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{item.body}</p>
            </>
          );
          return item.href ? (
            <Link
              key={i}
              href={item.href}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-[oklch(0.74_0.185_50/0.4)]"
            >
              {inner}
            </Link>
          ) : (
            <div key={i} className="rounded-2xl border border-border bg-card p-6">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatsSection({ s }: { s: Extract<Section, { type: "stats" }> }) {
  return (
    <div className="mx-auto max-w-6xl rounded-3xl border border-white/[0.06] bg-[oklch(0.1_0.01_95)] px-6 py-12">
      {s.heading && (
        <h2 className="mb-8 text-center text-2xl font-bold text-white">{s.heading}</h2>
      )}
      <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {s.items.map((item, i) => (
          <div key={i} className="text-center">
            <dt className="text-4xl font-extrabold tabular-nums text-[oklch(0.74_0.185_50)] sm:text-5xl">
              {item.value}
            </dt>
            <dd className="mt-2 text-[13px] leading-snug text-[oklch(0.7_0.005_95)]">{item.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ProseSection({ s }: { s: Extract<Section, { type: "prose" }> }) {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {s.heading}
      </h2>
      <div className="mt-5 space-y-4">
        {s.body.map((p, i) => (
          <p key={i} className="text-pretty text-[16px] leading-relaxed text-muted-foreground">{p}</p>
        ))}
      </div>
      {s.bullets && (
        <ul className="mt-6 space-y-3">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-foreground">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.64_0.19_42)]" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function QuoteSection({ s }: { s: Extract<Section, { type: "quote" }> }) {
  return (
    <figure className="mx-auto max-w-3xl text-center">
      <blockquote className="text-balance text-2xl font-medium leading-snug text-foreground sm:text-3xl">
        <span className="text-[oklch(0.64_0.19_42)]">«</span>
        {s.text}
        <span className="text-[oklch(0.64_0.19_42)]">»</span>
      </blockquote>
      <figcaption className="mt-5 text-sm text-muted-foreground">{s.author}</figcaption>
    </figure>
  );
}

function FaqSection({ s }: { s: Extract<Section, { type: "faq" }> }) {
  return (
    <div className="mx-auto max-w-3xl">
      <SectionHeading heading={s.heading ?? "Preguntas frecuentes"} />
      <PageFaq items={s.items} />
    </div>
  );
}

function renderSection(s: Section, i: number) {
  const dark = s.type === "stats";
  return (
    <section
      key={i}
      className={`px-6 py-16 sm:py-20 ${i % 2 === 1 && !dark ? "bg-secondary/40" : ""}`}
    >
      {s.type === "steps" && <StepsSection s={s} />}
      {s.type === "features" && <FeaturesSection s={s} />}
      {s.type === "stats" && <StatsSection s={s} />}
      {s.type === "prose" && <ProseSection s={s} />}
      {s.type === "quote" && <QuoteSection s={s} />}
      {s.type === "faq" && <FaqSection s={s} />}
    </section>
  );
}

/* ————— breadcrumb ————— */

function humanize(seg: string) {
  return seg.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function Breadcrumb({ page }: { page: MarketingPage }) {
  const root = page.experience === "hotel" ? { label: "Hoteles", href: "/hoteles" } : { label: "Inicio", href: "/" };
  const segs = page.slug.split("/");
  // first segment links to its hub (if it isn't the experience root itself)
  const crumbs = segs.slice(0, -1);
  return (
    <nav aria-label="Ruta" className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-[oklch(0.6_0.005_95)]">
      <Link href={root.href} className="hover:text-white">{root.label}</Link>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span aria-hidden>/</span>
          <span>{humanize(c)}</span>
        </span>
      ))}
    </nav>
  );
}

/* ————— page ————— */

export function MarketingPageView({ page }: { page: MarketingPage }) {
  const cta = page.cta;
  return (
    <>
      {/* Hero — dark band so the fixed header stays readable */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.01_95)] px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-left sm:text-center">
            <Breadcrumb page={page} />
          </div>
          {page.eyebrow && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[oklch(0.74_0.185_50)]">
              {page.eyebrow}
            </p>
          )}
          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[oklch(0.72_0.005_95)]">
            {page.lede}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DemoButton
              source={`page:${page.slug}`}
              className="cursor-pointer rounded-full bg-neon px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_30px_oklch(0.74_0.185_50/0.35)] transition-all hover:brightness-110"
            >
              {cta?.button ?? "Quiero una demo"}
            </DemoButton>
          </div>
        </div>
      </section>

      {/* Sections */}
      {page.sections.map((s, i) => renderSection(s, i))}

      {/* Related */}
      {page.related && page.related.length > 0 && (
        <section className="border-t border-border px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Siga explorando
            </p>
            <div className="flex flex-wrap gap-3">
              {page.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[oklch(0.74_0.185_50/0.4)]"
                >
                  {r.label}
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      {cta && (
        <section className="bg-[oklch(0.08_0.01_95)] px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {cta.title}
            </h2>
            {cta.sub && (
              <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-[oklch(0.72_0.005_95)]">
                {cta.sub}
              </p>
            )}
            <div className="mt-8">
              <DemoButton
                source={`page-cta:${page.slug}`}
                className="cursor-pointer rounded-full bg-neon px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_0_30px_oklch(0.74_0.185_50/0.35)] transition-all hover:brightness-110"
              >
                {cta.button ?? "Quiero una demo"}
              </DemoButton>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
