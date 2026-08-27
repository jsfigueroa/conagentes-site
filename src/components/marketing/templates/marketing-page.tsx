import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import type { MarketingPage, Section } from "@/content/pages";
import { DemoButton } from "./page-cta";
import { PageFaq } from "./page-faq";
import {
  CapabilityMatrix,
  ChatReplay,
  ComparePanels,
  FlowDiagram,
  JourneyTabs,
  LogoWall,
  MetricBars,
  ProductPanel,
  RoiCalculator,
  StatsRow,
  VideoSlot,
} from "./visuals";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

/**
 * Per-page structured data (GEO / AEO). Turns every registry page into an
 * individually citable, entity-anchored source for ChatGPT, Claude, Gemini and
 * Perplexity:
 *
 *   WebPage        — with `abstract` (the answer-first block), `dateModified`,
 *                    `keywords`, `mentions` (named entities) and `speakable`
 *                    pointing at the answer, so an assistant knows which
 *                    sentences are the quotable summary.
 *   BreadcrumbList — where the page sits.
 *   FAQPage        — verbatim questions and answers.
 *   HowTo          — the numbered process, when the page has one.
 *   ItemList       — the guest-journey stages, which otherwise live behind tabs.
 *   VideoObject    — only for video slots that actually have a file.
 */
function PageStructuredData({ page }: { page: MarketingPage }) {
  const url = `${SITE_URL}/${page.slug}`;
  const crumbs: { name: string; item: string }[] = [
    page.experience === "hotel"
      ? { name: "Hoteles", item: `${SITE_URL}/hoteles` }
      : { name: "Inicio", item: SITE_URL },
  ];
  const firstSeg = page.slug.split("/")[0];
  if (page.experience !== "hotel" && firstSeg !== page.slug) {
    crumbs.push({
      name: firstSeg.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
      item: `${SITE_URL}/${firstSeg}`,
    });
  }
  crumbs.push({ name: page.title, item: url });

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: page.meta.title,
    headline: page.title,
    description: page.meta.description,
    inLanguage: "es-CO",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  if (page.answer) {
    webPage.abstract = page.answer;
    webPage.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".geo-answer"],
    };
  }
  if (page.keywords?.length) webPage.keywords = page.keywords.join(", ");
  if (page.updated) webPage.dateModified = page.updated;
  if (page.entities?.length) {
    webPage.mentions = page.entities.map((name) => ({ "@type": "Thing", name }));
  }

  const graph: Record<string, unknown>[] = [
    webPage,
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
  ];

  const faqSection = page.sections.find((s) => s.type === "faq");
  if (faqSection && faqSection.type === "faq") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage: "es-CO",
      mainEntity: faqSection.items.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    });
  }

  const howtoSection = page.sections.find((s) => s.type === "steps" && s.howto);
  if (howtoSection && howtoSection.type === "steps") {
    graph.push({
      "@type": "HowTo",
      name: howtoSection.heading ?? page.title,
      description: page.answer ?? page.lede,
      inLanguage: "es-CO",
      step: howtoSection.items.map((item, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: item.title.replace(/^\d+\.\s*/, ""),
        text: item.body,
        url: `${url}#paso-${i + 1}`,
      })),
    });
  }

  const journey = page.sections.find((s) => s.type === "journey");
  if (journey && journey.type === "journey") {
    graph.push({
      "@type": "ItemList",
      name: journey.heading ?? "Etapas de la estadía",
      inLanguage: "es-CO",
      itemListElement: journey.stages.map((st, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${st.label} — ${st.title}`,
        description: [st.body, ...st.bullets].join(" "),
      })),
    });
  }

  for (const s of page.sections) {
    if (s.type === "video" && s.src) {
      graph.push({
        "@type": "VideoObject",
        name: s.heading ?? page.title,
        description: s.caption ?? page.meta.description,
        contentUrl: `${SITE_URL}${s.src}`,
        ...(s.poster ? { thumbnailUrl: `${SITE_URL}${s.poster}` } : {}),
        inLanguage: "es-CO",
        ...(s.seconds ? { duration: `PT${s.seconds}S` } : {}),
      });
    }
  }

  const data = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/* ————— section renderers ————— */

function SectionHeading({ heading, sub }: { heading?: string; sub?: string }) {
  if (!heading) return null;
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {heading}
      </h2>
      {sub && (
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">{sub}</p>
      )}
    </div>
  );
}

function StepsSection({ s }: { s: Extract<Section, { type: "steps" }> }) {
  const cols = s.items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading heading={s.heading} sub={s.sub} />
      <ol className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
        {s.items.map((item, i) => (
          <li key={i} id={`paso-${i + 1}`} className="rounded-2xl border border-border bg-card p-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-gradient-strong text-sm font-bold tabular-nums text-white">
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
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
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

/**
 * Renders `**emphasis**` inside prose as <strong>. Deliberately the only markup
 * the content registry may use: copy stays plain text (so it extracts cleanly
 * for assistants) while a lead-in phrase can still carry weight for a reader.
 */
function withEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
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
          <p key={i} className="text-pretty text-[16px] leading-relaxed text-muted-foreground">
            {withEmphasis(p)}
          </p>
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
      <figcaption className="mt-5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{s.author}</span>
        {s.role && <> · {s.role}</>}
      </figcaption>
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

/** Sections that paint their own dark surface and must not sit on a band. */
const SELF_SURFACED = new Set(["stats"]);

function SectionBody({ s }: { s: Section }) {
  switch (s.type) {
    case "steps":
      return <StepsSection s={s} />;
    case "features":
      return <FeaturesSection s={s} />;
    case "stats":
      return <StatsRow s={s} />;
    case "prose":
      return <ProseSection s={s} />;
    case "quote":
      return <QuoteSection s={s} />;
    case "faq":
      return <FaqSection s={s} />;
    case "chat":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <ChatReplay s={s} />
        </>
      );
    case "compare":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <ComparePanels s={s} />
        </>
      );
    case "bars":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <MetricBars s={s} />
        </>
      );
    case "flow":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <FlowDiagram s={s} />
        </>
      );
    case "calc":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <RoiCalculator s={s} />
        </>
      );
    case "journey":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <JourneyTabs s={s} />
        </>
      );
    case "panel":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <ProductPanel s={s} />
        </>
      );
    case "matrix":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <CapabilityMatrix s={s} />
        </>
      );
    case "logos":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <LogoWall s={s} />
        </>
      );
    case "video":
      return (
        <>
          <SectionHeading heading={s.heading} sub={s.sub} />
          <VideoSlot s={s} />
        </>
      );
  }
}

/* ————— breadcrumb ————— */

function humanize(seg: string) {
  return seg.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function Breadcrumb({ page }: { page: MarketingPage }) {
  const root =
    page.experience === "hotel"
      ? { label: "Hoteles", href: "/hoteles" }
      : { label: "Inicio", href: "/" };
  const segs = page.slug.split("/");
  // Drop the experience root segment — "Hoteles" is already the first crumb, so
  // keeping it would render "Hoteles / Hoteles / …".
  const crumbs = segs
    .slice(0, -1)
    .filter((seg, i) => !(page.experience === "hotel" && i === 0 && seg === "hoteles"));
  return (
    <nav
      aria-label="Ruta"
      className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] text-[oklch(0.6_0.005_95)]"
    >
      <Link href={root.href} className="hover:text-white">
        {root.label}
      </Link>
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
  // Band rhythm: alternate light / tinted, counting only sections that need a band.
  let banded = 0;

  return (
    <>
      <PageStructuredData page={page} />

      {/* Hero — dark band so the fixed header stays readable */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.01_95)] px-6 pb-20 pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div
          className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "var(--brand-gradient)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
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
              className="btn-brand cursor-pointer rounded-full px-6 py-3 text-sm font-semibold"
            >
              {cta?.button ?? "Quiero una demo"}
            </DemoButton>
          </div>
          {page.heroChips && page.heroChips.length > 0 && (
            <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {page.heroChips.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-1.5 text-[12.5px] text-[oklch(0.68_0.005_95)]"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-[oklch(0.74_0.185_50)]" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Answer-first block — the quotable summary, first thing after the hero */}
      {page.answer && (
        <section className="border-b border-border bg-card px-6 py-10 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-[oklch(0.74_0.185_50/0.3)] bg-[oklch(0.74_0.185_50/0.05)] p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.5_0.19_42)]">
                En corto
              </p>
              <p className="geo-answer mt-3 text-pretty text-[17px] font-medium leading-relaxed text-foreground sm:text-[18px]">
                {page.answer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Sections */}
      {page.sections.map((s, i) => {
        if (s.type === "video" && !s.src) return null;
        const selfSurfaced = SELF_SURFACED.has(s.type);
        const tinted = !selfSurfaced && banded++ % 2 === 1;
        return (
          <section key={i} className={`px-6 py-16 sm:py-20 ${tinted ? "bg-secondary/40" : ""}`}>
            <SectionBody s={s} />
          </section>
        );
      })}

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
                className="btn-brand cursor-pointer rounded-full px-7 py-3.5 text-sm font-semibold"
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
