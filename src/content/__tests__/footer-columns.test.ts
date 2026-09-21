import { describe, expect, it } from "vitest";
import {
  FOOTER_EXTRA_HEADING,
  FOOTER_NAV_COLUMNS,
  footerColumnsFrom,
} from "@/content/footer-columns";
import { NAV_GENERAL, NAV_HOTEL } from "@/content/nav";

/**
 * The footer is the same component for both nav experiences, so every
 * assertion here runs against both. Testing the REAL nav config, not a
 * fixture: the bug this guards against was in the config, and a fixture would
 * have passed while the site was wrong.
 */
const EXPERIENCES = [
  { name: "NAV_GENERAL", nav: NAV_GENERAL },
  { name: "NAV_HOTEL", nav: NAV_HOTEL },
] as const;

describe.each(EXPERIENCES)("footer columns — $name", ({ nav }) => {
  const columns = footerColumnsFrom(nav);

  it("renders the expected number of nav-derived columns", () => {
    expect(columns).toHaveLength(FOOTER_NAV_COLUMNS);
  });

  it("gives every column a heading and at least one link", () => {
    for (const col of columns) {
      expect(col.heading.trim()).not.toBe("");
      expect(col.links.length).toBeGreaterThan(0);
    }
  });

  // The actual defect: NAV_GENERAL's third column was headed "Más", the same
  // catch-all the footer appends, so non-hospedaje pages showed two columns
  // titled «Más». Unique headings, and none may equal the appended one.
  it("does not collide with the footer's own appended heading", () => {
    const headings = columns.map((c) => c.heading);
    expect(headings).not.toContain(FOOTER_EXTRA_HEADING);
  });

  it("has no duplicate headings among the derived columns", () => {
    const headings = columns.map((c) => c.heading);
    expect(new Set(headings).size).toBe(headings.length);
  });

  it("never links an on-page anchor", () => {
    // An anchor only resolves on the page that defines the section, and the
    // footer renders on every page.
    for (const col of columns) {
      for (const link of col.links) {
        expect(link.href).not.toContain("#");
      }
    }
  });

  it("never repeats an href inside one column", () => {
    for (const col of columns) {
      const hrefs = col.links.map((l) => l.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });
});
