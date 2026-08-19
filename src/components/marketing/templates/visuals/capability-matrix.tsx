import { Check, Minus } from "lucide-react";
import type { Section } from "@/content/pages";

type MatrixSection = Extract<Section, { type: "matrix" }>;

/**
 * A real comparison table. This is the single most quotable element on a page
 * for an assistant answering "what's the difference between X and Y" — so it is
 * marked up as <table> with scoped headers, and every boolean cell also carries
 * its meaning in text for screen readers and extraction.
 */
export function CapabilityMatrix({ s }: { s: MatrixSection }) {
  return (
    <figure className="mx-auto max-w-4xl">
      <p
        className="mb-3 text-right text-[11.5px] text-muted-foreground sm:hidden"
        aria-hidden
      >
        Desplace la tabla →
      </p>
      {/* Contained scroller — no negative-margin bleed. The bleed trick widens
          the root scroll region on narrow viewports, which lets the whole PAGE
          pan sideways; the table must scroll inside itself instead. */}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          {s.heading && <caption className="sr-only">{s.heading}</caption>}
          <thead>
            <tr>
              <th scope="col" className="w-[38%] pb-3 pr-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Capacidad
              </th>
              {s.cols.map((c, i) => {
                const ours = i === s.cols.length - 1;
                return (
                  <th
                    key={c}
                    scope="col"
                    className={`px-3 pb-3 text-center text-[12.5px] font-bold ${
                      ours ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {c}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((r, ri) => (
              <tr
                key={ri}
                className="border-t border-border"
              >
                <th
                  scope="row"
                  className="py-3.5 pr-4 text-[13.5px] font-medium leading-snug text-foreground"
                >
                  {r.label}
                </th>
                {r.cells.map((cell, ci) => {
                  const ours = ci === s.cols.length - 1;
                  return (
                    <td
                      key={ci}
                      className={`px-3 py-3.5 text-center align-middle ${
                        ours ? "bg-[oklch(0.74_0.185_50/0.06)]" : ""
                      }`}
                    >
                      {typeof cell === "boolean" ? (
                        cell ? (
                          <>
                            <Check
                              className="mx-auto h-4.5 w-4.5 text-[oklch(0.5_0.16_150)]"
                              aria-hidden
                            />
                            <span className="sr-only">Sí</span>
                          </>
                        ) : (
                          <>
                            <Minus
                              className="mx-auto h-4 w-4 text-[oklch(0.78_0.008_95)]"
                              aria-hidden
                            />
                            <span className="sr-only">No</span>
                          </>
                        )
                      ) : (
                        <span
                          className={`text-[12.5px] leading-snug ${
                            ours ? "font-semibold text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {cell}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {s.footnote && (
        <figcaption className="mt-5 text-[12px] leading-relaxed text-muted-foreground">
          {s.footnote}
        </figcaption>
      )}
    </figure>
  );
}
