/**
 * Content model for the data-driven marketing pages (Solutions / Features /
 * Resources / Company). One registry entry per URL → rendered by a single
 * catch-all route + the MarketingPageView template. See docs/site-architecture.md §4.
 *
 * Anti-duplication rule: a Feature page explains a mechanism ONCE (canonical);
 * a Solution page describes outcomes for a segment and LINKS to the feature.
 *
 * Sections come in two families:
 *   TEXT    — steps · features · stats · prose · quote · faq
 *   VISUAL  — chat · compare · bars · flow · calc · journey · panel · matrix
 *             · logos · video
 *
 * GEO / AEO CONTRACT (read before adding a page or a visual):
 *  1. Every page carries `answer` — a self-contained 40–70 word reply to the
 *     question the page IS. Rendered first and emitted as schema.org
 *     `abstract` + a `Question`/`Answer` pair, so an assistant can quote it
 *     without reading the rest.
 *  2. Every VISUAL renders its data as REAL DOM TEXT — <table>, <dl>,
 *     <figcaption>, <ol> — never canvas, never text baked into an image, never
 *     content that only exists after a click. Animation may only move opacity
 *     and transform on nodes that are already in the HTML.
 *  3. Numbers are always accompanied by their unit and their source framing in
 *     plain text, so the claim survives being extracted alone.
 *  4. Every page names its entities (DIAN, TRA, SIRE, Booking.com, WhatsApp
 *     Business API, Wompi, Channex, Cotelco…) in prose, and lists them in
 *     `entities` so they land in JSON-LD `mentions`.
 */

/* ————— shared visual primitives ————— */

/** A card rendered inside a chat bubble (the agent showing, not telling). */
export type ChatCard = {
  kind: "habitacion" | "pago" | "factura" | "servicio" | "tarifa" | "reserva";
  title: string;
  /** Small grey lines under the title. */
  lines?: string[];
  /** Big emphasized figure (COP, already formatted). */
  price?: string;
  /** Text of the faux button. */
  cta?: string;
  /** Tiny footnote under the button. */
  foot?: string;
  /** Optional image-band label, e.g. "Vista al mar". */
  banner?: string;
};

export type ChatMsg = {
  from: "guest" | "ai" | "staff";
  text?: string;
  card?: ChatCard;
};

/** The faux product-UI panels. Each kind is a hand-built mock. */
export type PanelKind =
  | "inbox" // bandeja omnicanal
  | "tarifas" // revenue manager: recomendaciones de tarifa
  | "agenda" // agenda de servicios del día
  | "bi" // tablero de gerencia
  | "pms" // calendario de habitaciones
  | "cumplimiento"; // DIAN / TRA / SIRE

export type Section =
  /* ——— TEXT ——— */
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
  | {
      type: "stats";
      heading?: string;
      sub?: string;
      note?: string;
      items: { value: string; label: string }[];
    }
  | { type: "prose"; heading: string; body: string[]; bullets?: string[] }
  | { type: "quote"; text: string; author: string; role?: string }
  | { type: "faq"; heading?: string; items: { q: string; a: string }[] }

  /* ——— VISUAL ——— */
  /**
   * A replayed conversation with margin notes explaining each agent move.
   * The whole thread is in the HTML from the first paint — the animation only
   * fades it in — so an assistant reading the page sees the full transcript.
   */
  | {
      type: "chat";
      heading?: string;
      sub?: string;
      channel?: "whatsapp" | "instagram" | "booking" | "airbnb" | "voz" | "web";
      /** Header name shown in the faux chat, e.g. "Camila · Huésped". */
      who?: string;
      thread: ChatMsg[];
      /** Margin annotations anchored to a message index (0-based). */
      notes?: { at: number; label: string; body: string }[];
    }
  /** Two stacked realities. The engine of loss aversion. */
  | {
      type: "compare";
      heading?: string;
      sub?: string;
      before: { label: string; items: string[] };
      after: { label: string; items: string[] };
      footnote?: string;
    }
  /** Animated horizontal bars, marked up as a <table> with visible values. */
  | {
      type: "bars";
      heading?: string;
      sub?: string;
      note?: string;
      /** What the bar length means, e.g. "conversión del upsell". */
      unit?: string;
      items: {
        label: string;
        /** Relative length, 0–100. */
        value: number;
        /** The value printed at the end of the bar, e.g. "22–28 %". */
        display: string;
        tone?: "accent" | "muted" | "warn";
      }[];
    }
  /** An animated mechanism diagram, marked up as an ordered list. */
  | {
      type: "flow";
      heading?: string;
      sub?: string;
      nodes: { icon?: string; title: string; body: string; tag?: string }[];
      footnote?: string;
    }
  /**
   * Interactive calculator. The visitor does the arithmetic on themselves.
   * Renders a worked example in plain text first, so the page still states a
   * concrete number for a reader that never moves a slider.
   */
  | {
      type: "calc";
      heading?: string;
      sub?: string;
      variant: "ota" | "upsell";
      footnote?: string;
    }
  /** Tabbed guest-journey stages. All stages stay in the DOM. */
  | {
      type: "journey";
      heading?: string;
      sub?: string;
      stages: {
        label: string;
        title: string;
        body: string;
        bullets: string[];
        metric?: { value: string; label: string };
      }[];
    }
  /** A stylized screenshot of the real product, drawn in CSS. */
  | {
      type: "panel";
      heading?: string;
      sub?: string;
      kind: PanelKind;
      caption?: string;
      /** Bullets rendered beside the panel on wide screens. */
      points?: { title: string; body: string }[];
    }
  /** Capability matrix — us vs. the category. A real <table>. */
  | {
      type: "matrix";
      heading?: string;
      sub?: string;
      cols: string[];
      rows: { label: string; cells: (boolean | string)[] }[];
      footnote?: string;
    }
  /** Integration marks, grouped. Names are text, not images. */
  | {
      type: "logos";
      heading?: string;
      sub?: string;
      groups: { label: string; marks: string[] }[];
      footnote?: string;
    }
  /**
   * Video slot. Renders NOTHING until `src` is set, so slots can be wired into
   * the content ahead of production. Drop files in /public/video/ and fill src.
   * `caption` is required in practice: it is the text an assistant reads in
   * place of the pixels, and the transcript hook for the video's own schema.
   */
  | {
      type: "video";
      heading?: string;
      sub?: string;
      src?: string;
      poster?: string;
      aspect?: "16/9" | "9/16" | "1/1";
      caption?: string;
      /** Seconds — only used for VideoObject schema when src is present. */
      seconds?: number;
    };

export type MarketingPage = {
  /** full path after the route group, e.g. "producto" or "hoteles/upsell" */
  slug: string;
  experience: "general" | "hotel";
  eyebrow?: string;
  title: string;
  lede: string;
  /**
   * ANSWER-FIRST BLOCK (required on new pages). A self-contained 40–70 word
   * answer to the question this page is, written so it can be quoted verbatim
   * by ChatGPT / Claude / Gemini / Perplexity with no surrounding context.
   * Name the product and the country. Rendered directly under the hero.
   */
  answer?: string;
  /** Short proof chips rendered under the hero CTA. */
  heroChips?: string[];
  meta: { title: string; description: string };
  /** Long-tail queries this page should answer. Feeds <meta keywords> + llms.txt. */
  keywords?: string[];
  /** Named entities to emit as schema.org `mentions` (GEO entity anchoring). */
  entities?: string[];
  /** ISO date of last substantive content review → schema `dateModified`. */
  updated?: string;
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
