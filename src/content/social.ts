/**
 * The brand's own social profiles — ONE source of truth.
 *
 * Two places need these URLs and they must never disagree: the footer (what a
 * person clicks) and the Organization `sameAs` in the JSON-LD (what Google and
 * the answer engines read to tie conagentes.com, the LinkedIn company page and
 * the Instagram account together as one entity). A footer link the structured
 * data does not confirm is a missed entity signal, and a `sameAs` pointing at a
 * profile the site never links to is the kind of claim that ages badly.
 *
 * `mark` is a key into BRAND_MARKS (filled 24×24 glyph, `currentColor`).
 */
export type SocialProfile = {
  /** Platform name, used in the accessible label. */
  label: string;
  href: string;
  /** BRAND_MARKS key. */
  mark: "linkedin" | "instagram";
};

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/conagentes/",
    mark: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/conagentes/",
    mark: "instagram",
  },
];
