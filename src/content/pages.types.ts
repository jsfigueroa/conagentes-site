/**
 * Content model for the data-driven marketing pages (Solutions / Features /
 * Resources / Company). One registry entry per URL → rendered by a single
 * catch-all route + the MarketingPageView template. See docs/site-architecture.md §4.
 *
 * Anti-duplication rule: a Feature page explains a mechanism ONCE (canonical);
 * a Solution page describes outcomes for a segment and LINKS to the feature.
 */

export type Section =
  | {
      type: "steps";
      heading?: string;
      sub?: string;
      /** Emit HowTo structured data from these steps (GEO). */
      howto?: boolean;
      items: { title: string; body: string }[];
    }
  | {
      type: "features";
      heading?: string;
      sub?: string;
      items: { title: string; body: string; href?: string }[];
    }
  | { type: "stats"; heading?: string; items: { value: string; label: string }[] }
  | { type: "prose"; heading: string; body: string[]; bullets?: string[] }
  | { type: "quote"; text: string; author: string }
  | { type: "faq"; heading?: string; items: { q: string; a: string }[] };

export type MarketingPage = {
  /** full path after the route group, e.g. "producto" or "hoteles/upsell" */
  slug: string;
  experience: "general" | "hotel";
  eyebrow?: string;
  title: string;
  lede: string;
  meta: { title: string; description: string };
  sections: Section[];
  related?: { label: string; href: string }[];
  cta?: { title: string; sub?: string; button?: string };
};

/** Default closing CTA reused by most pages. */
export const DEFAULT_CTA = {
  title: "¿Listo para ver a su agente IA vender?",
  sub: "Le mostramos, con sus productos y sus precios, cómo atiende, cotiza y cierra por WhatsApp.",
  button: "Quiero una demo",
};
