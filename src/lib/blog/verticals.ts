/**
 * Blog verticals — the single source of truth for which posts belong to which
 * blog hub, and for every URL that points at a post or a category.
 *
 * There are two hubs:
 *   - "general" → /blog            (the 2026 pymes/WhatsApp archive; no longer fed)
 *   - "hotel"   → /hoteles/blog    (hospitality + tech/IA — the only hub we publish to)
 *
 * A post's hub is derived from its `category`, so no DB migration is needed:
 * the category taxonomy IS the vertical key. Every category a post can carry
 * must be listed below — `/api/publish` rejects unknown categories on purpose,
 * so a typo fails loudly at publish time instead of silently orphaning a post
 * in a hub nobody links to.
 *
 * To add a category: add the slug here + its label + its listing description.
 * Nothing else needs to change (routes, sitemap, feeds and llms.txt all read
 * from this file).
 */

export type BlogVertical = "general" | "hotel";

/** The pymes/WhatsApp archive (2026-06). Kept live, not extended. */
export const GENERAL_CATEGORIES = [
  "ia-practica",
  "automatizacion",
  "ventas",
  "atencion-al-cliente",
  "whatsapp",
  "crm",
  "productividad",
  "marketing",
  "tendencias",
] as const;

/** Hospitality + technology — the taxonomy we publish into from 2026-08 on. */
export const HOTEL_CATEGORIES = [
  "reservas-directas",
  "revenue-management",
  "experiencia-huesped",
  "tecnologia-hotelera",
  "cumplimiento-hotelero",
  "operacion-hotelera",
  "mercado-hotelero",
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  // general
  "ia-practica": "IA Práctica",
  automatizacion: "Automatización",
  ventas: "Ventas",
  "atencion-al-cliente": "Atención al Cliente",
  whatsapp: "WhatsApp",
  crm: "CRM",
  productividad: "Productividad",
  marketing: "Marketing Digital",
  tendencias: "Tendencias",
  // hotel
  "reservas-directas": "Reservas directas",
  "revenue-management": "Revenue management",
  "experiencia-huesped": "Experiencia del huésped",
  "tecnologia-hotelera": "Tecnología hotelera",
  "cumplimiento-hotelero": "Cumplimiento y normativa",
  "operacion-hotelera": "Operación hotelera",
  "mercado-hotelero": "Mercado hotelero",
};

/**
 * One-line description per hotel category — used as the category page's meta
 * description and as its visible lede, so each listing page answers "what is
 * this collection about" in real DOM text instead of a generic template.
 */
export const HOTEL_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "reservas-directas":
    "Cómo vender más noches por canal propio y depender menos de la comisión de las OTAs: velocidad de respuesta, cotización, cobro en el chat y seguimiento.",
  "revenue-management":
    "Tarifas, ocupación, ADR y RevPAR para hoteles independientes: cómo leer la demanda, cuándo mover el precio y qué automatizar sin perder el control.",
  "experiencia-huesped":
    "Atención antes, durante y después de la estadía: respuesta inmediata, upsell que el huésped agradece, reseñas y huéspedes que vuelven.",
  "tecnologia-hotelera":
    "PMS, channel manager, motor de reservas e inteligencia artificial aplicada a la hotelería, explicados sin jerga y con criterios para elegir.",
  "cumplimiento-hotelero":
    "Obligaciones de un hotel en Colombia —factura electrónica DIAN, registro de huéspedes TRA, RNT, SIRE, protección de datos— y cómo automatizarlas.",
  "operacion-hotelera":
    "Recepción, equipo y procesos: cómo sostener la operación de un hotel independiente sin sumar personal en cada turno.",
  "mercado-hotelero":
    "Datos del mercado hotelero de Colombia y Latinoamérica: ocupación, tarifas, mezcla de canales y comportamiento del viajero, con fuente citada.",
};

type VerticalConfig = {
  vertical: BlogVertical;
  /** URL prefix of the hub — every post/category URL is built from this. */
  basePath: string;
  /** Human name of the hub, used in breadcrumbs + JSON-LD. */
  label: string;
  categories: readonly string[];
};

export const BLOG_VERTICALS: Record<BlogVertical, VerticalConfig> = {
  general: {
    vertical: "general",
    basePath: "/blog",
    label: "Blog",
    categories: GENERAL_CATEGORIES,
  },
  hotel: {
    vertical: "hotel",
    basePath: "/hoteles/blog",
    label: "Blog hotelero",
    categories: HOTEL_CATEGORIES,
  },
};

const HOTEL_SET = new Set<string>(HOTEL_CATEGORIES);
const GENERAL_SET = new Set<string>(GENERAL_CATEGORIES);

/** Which hub a category belongs to. Unknown categories fall back to general. */
export function verticalForCategory(category: string): BlogVertical {
  return HOTEL_SET.has(category) ? "hotel" : "general";
}

export function isKnownCategory(category: string): boolean {
  return HOTEL_SET.has(category) || GENERAL_SET.has(category);
}

export function categoriesFor(vertical: BlogVertical): readonly string[] {
  return BLOG_VERTICALS[vertical].categories;
}

export function blogBasePath(vertical: BlogVertical): string {
  return BLOG_VERTICALS[vertical].basePath;
}

export function getCategoryLabel(slug: string): string {
  return (
    CATEGORY_LABELS[slug] ??
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function postPath(vertical: BlogVertical, slug: string): string {
  return `${blogBasePath(vertical)}/${slug}`;
}

export function categoryPath(vertical: BlogVertical, category: string): string {
  return `${blogBasePath(vertical)}/categoria/${category}`;
}

/** Post URL from the category alone — convenient for sitemap/feed/llms.txt. */
export function postPathForCategory(category: string, slug: string): string {
  return postPath(verticalForCategory(category), slug);
}
