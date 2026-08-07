import type { MarketingPage } from "./pages.types";
import { GENERAL_PAGES } from "./pages.general";
import { HOTEL_PAGES } from "./pages.hotel";

export type { MarketingPage, Section } from "./pages.types";

/** Every data-driven marketing page, both experiences. */
export const PAGES: MarketingPage[] = [...GENERAL_PAGES, ...HOTEL_PAGES];

const BY_SLUG = new Map(PAGES.map((p) => [p.slug, p]));

export function getPage(slug: string): MarketingPage | undefined {
  return BY_SLUG.get(slug);
}

/** Slugs as path segments, for generateStaticParams. */
export function allPageParams(): { slug: string[] }[] {
  return PAGES.map((p) => ({ slug: p.slug.split("/") }));
}

/** Flat list of canonical URLs, for sitemap.ts. */
export function allPageUrls(): string[] {
  return PAGES.map((p) => "/" + p.slug);
}
