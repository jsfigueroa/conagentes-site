import type { NavItem } from "@/content/nav";

/**
 * How the footer's columns are derived from the nav config.
 *
 * This lives outside the Footer component for one reason: it is the part that
 * can be wrong, and a "use client" component that imports next/navigation
 * cannot be unit-tested cheaply. Keeping the derivation pure means the
 * invariants below are actually enforced instead of merely intended.
 *
 * The invariants:
 *   1. no on-page anchors (they only exist on the page that defines them)
 *   2. no repeated href inside a column
 *   3. no derived heading may collide with FOOTER_EXTRA_HEADING
 *
 * (3) is not hypothetical: NAV_GENERAL's «Producto» third column used to be
 * headed "Más", the same catch-all the footer appends itself, so every
 * non-hospedaje page rendered TWO columns titled «Más» — which reads as a
 * layout bug, not as two deliberate groupings. A catch-all heading is fine in a
 * mega-menu, where the parent item gives it context; the footer strips that
 * context away.
 */

/** Heading of the column the footer appends after the derived ones. */
export const FOOTER_EXTRA_HEADING = "Más";

/** How many nav-derived columns the footer shows. */
export const FOOTER_NAV_COLUMNS = 3;

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

/** Flatten one nav experience into footer columns, dropping anchors + dupes. */
export function footerColumnsFrom(nav: NavItem[]): FooterColumn[] {
  const cols: FooterColumn[] = [];

  for (const item of nav) {
    if (item.kind === "link") continue; // top-level links are covered elsewhere
    for (const col of item.columns) {
      const seen = new Set<string>();
      const links = col.links.filter((l) => {
        // On-page anchors are not footer material, and a repeated href inside
        // one column reads as a mistake.
        if (l.href.includes("#")) return false;
        if (seen.has(l.href)) return false;
        seen.add(l.href);
        return true;
      });
      if (links.length) {
        cols.push({
          heading: col.heading,
          links: links.map((l) => ({ label: l.label, href: l.href })),
        });
      }
    }
  }

  return cols.slice(0, FOOTER_NAV_COLUMNS);
}
