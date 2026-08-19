import type { Section } from "@/content/pages";

type BarsSection = Extract<Section, { type: "bars" }>;

const TONE: Record<string, string> = {
  accent: "bg-brand-gradient",
  muted: "bg-[oklch(0.86_0.008_95)]",
  warn: "bg-[oklch(0.72_0.16_45/0.5)]",
};

/**
 * Horizontal comparison bars.
 *
 * Deliberately a static server component with no JS: the bar's width already
 * encodes the value, so an entry animation would add nothing but a way for the
 * data to be missing. Marked up as a real two-column table with the value
 * printed at the end of every row, so the comparison survives extraction by an
 * assistant, a screen reader or a crawler — and renders identically with
 * JavaScript disabled.
 */
export function MetricBars({ s }: { s: BarsSection }) {
  return (
    <figure className="mx-auto max-w-3xl">
      {/* Visible axis meaning. Without it the reader cannot tell whether a long
          bar is good news or bad news — and on these charts it is sometimes
          one and sometimes the other. */}
      {s.unit && (
        <p className="mb-3 border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          {s.unit}
        </p>
      )}
      <table className="w-full border-collapse">
        <caption className="sr-only">
          {s.heading ?? "Comparación"}
          {s.unit ? ` — ${s.unit}` : ""}
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Concepto</th>
            <th scope="col">{s.unit ?? "Valor"}</th>
          </tr>
        </thead>
        <tbody>
          {s.items.map((it, i) => {
            const tone = TONE[it.tone ?? "accent"];
            const isAccent = (it.tone ?? "accent") === "accent";
            return (
              <tr key={i} className="align-middle">
                <th
                  scope="row"
                  className="w-[46%] py-2.5 pr-4 text-left text-[14px] font-medium leading-snug text-foreground sm:w-[42%]"
                >
                  {it.label}
                </th>
                <td className="py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[oklch(0.94_0.004_95)]">
                      <div
                        className={`h-full rounded-full ${tone}`}
                        style={{ width: `${Math.max(2, Math.min(100, it.value))}%` }}
                      />
                    </div>
                    <span
                      className={`w-[92px] shrink-0 text-right text-[13.5px] font-bold tabular-nums ${
                        isAccent ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {it.display}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {s.note && (
        <figcaption className="mt-6 border-t border-border pt-4 text-[12.5px] leading-relaxed text-muted-foreground">
          {s.note}
        </figcaption>
      )}
    </figure>
  );
}
