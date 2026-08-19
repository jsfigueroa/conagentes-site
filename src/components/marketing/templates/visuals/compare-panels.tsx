import { Check, X } from "lucide-react";
import type { Section } from "@/content/pages";

type CompareSection = Extract<Section, { type: "compare" }>;

/**
 * Two stacked realities, side by side. Deliberately a plain server component:
 * no JS, no motion — the contrast IS the visual, and it stays fully readable
 * for assistants and for anyone on a slow connection.
 */
export function ComparePanels({ s }: { s: CompareSection }) {
  return (
    <figure className="mx-auto max-w-5xl">
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {/* Hoy — the cost of doing nothing */}
        <div className="rounded-2xl border border-border bg-secondary/50 p-6">
          <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-muted-foreground">
            <span
              className="flex size-5 items-center justify-center rounded-full bg-[oklch(0.62_0.2_25/0.12)]"
              aria-hidden
            >
              <X className="h-3 w-3 text-[oklch(0.55_0.2_25)]" />
            </span>
            {s.before.label}
          </p>
          <ul className="mt-5 space-y-3.5">
            {s.before.items.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-muted-foreground"
              >
                <X
                  className="mt-1 h-4 w-4 shrink-0 text-[oklch(0.55_0.2_25)]"
                  aria-hidden
                />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Con conagentes */}
        <div className="relative overflow-hidden rounded-2xl border border-[oklch(0.74_0.185_50/0.35)] bg-card p-6 shadow-[0_1px_0_oklch(0.74_0.185_50/0.2),0_18px_40px_-28px_oklch(0.64_0.19_42/0.35)]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-gradient"
            aria-hidden
          />
          <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-foreground">
            <span
              className="flex size-5 items-center justify-center rounded-full bg-[oklch(0.74_0.185_50/0.18)]"
              aria-hidden
            >
              <Check className="h-3 w-3 text-[oklch(0.64_0.19_42)]" />
            </span>
            {s.after.label}
          </p>
          <ul className="mt-5 space-y-3.5">
            {s.after.items.map((it, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-foreground"
              >
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-[oklch(0.64_0.19_42)]"
                  aria-hidden
                />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {s.footnote && (
        <figcaption className="mt-5 text-center text-[12.5px] leading-relaxed text-muted-foreground">
          {s.footnote}
        </figcaption>
      )}
    </figure>
  );
}
