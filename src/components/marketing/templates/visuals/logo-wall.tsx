import { BRAND_MARKS } from "@/components/marketing/hotel/brand-marks";
import type { Section } from "@/content/pages";

type LogosSection = Extract<Section, { type: "logos" }>;

/**
 * Integration wall. Names are always rendered as TEXT next to (or instead of)
 * the mark — an assistant asked "does conagentes work with Cloudbeds?" needs to
 * read the word, not recognise a glyph. Marks are inline SVG paths under
 * nominative fair use; trademarks belong to their owners.
 */
export function LogoWall({ s }: { s: LogosSection }) {
  return (
    <figure className="mx-auto max-w-5xl">
      <div className="space-y-9">
        {s.groups.map((g) => (
          <div key={g.label}>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {g.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {g.marks.map((name) => {
                const key = name
                  .toLowerCase()
                  .replace(/[^a-z]/g, "")
                  .replace("bookingcom", "booking");
                const mark = BRAND_MARKS[key];
                return (
                  <li
                    key={name}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-[13.5px] font-medium text-foreground"
                  >
                    {mark && (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 shrink-0 fill-[oklch(0.45_0.01_95)]"
                        aria-hidden
                      >
                        <path d={mark.path} />
                      </svg>
                    )}
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {s.footnote && (
        <figcaption className="mt-8 text-[12px] leading-relaxed text-muted-foreground">
          {s.footnote}
        </figcaption>
      )}
    </figure>
  );
}
