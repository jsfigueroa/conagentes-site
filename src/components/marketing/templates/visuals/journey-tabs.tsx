"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Section } from "@/content/pages";

type JourneySection = Extract<Section, { type: "journey" }>;

/**
 * The guest journey, stage by stage. Every panel stays in the document (the
 * inactive ones carry the `hidden` attribute rather than being unmounted), so
 * the full text of all six stages is in the HTML for assistants and crawlers
 * even though a human only sees one at a time.
 */
export function JourneyTabs({ s }: { s: JourneySection }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = s.stages.length;

  function onKeyDown(e: React.KeyboardEvent) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + n) % n;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div
        role="tablist"
        aria-label={s.heading ?? "Etapas de la estadía"}
        onKeyDown={onKeyDown}
        className="flex max-w-full snap-x gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center"
      >
        {s.stages.map((st, i) => (
          <button
            key={i}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`etapa-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`etapa-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`shrink-0 snap-start cursor-pointer rounded-full border px-4 py-2.5 text-[13.5px] font-semibold transition-colors ${
              i === active
                ? "border-transparent bg-ink text-white"
                : "border-border bg-card text-muted-foreground hover:border-[oklch(0.74_0.185_50/0.4)] hover:text-foreground"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {s.stages.map((st, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`etapa-panel-${i}`}
          aria-labelledby={`etapa-tab-${i}`}
          hidden={i !== active}
          className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-9"
        >
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[oklch(0.64_0.19_42)]">
                {st.label}
              </p>
              <h3 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-[28px]">
                {st.title}
              </h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                {st.body}
              </p>
              {st.metric && (
                <div className="mt-6 inline-flex items-baseline gap-2.5 rounded-2xl border border-border bg-secondary/50 px-4 py-3">
                  <span className="text-[24px] font-extrabold leading-none tabular-nums text-foreground">
                    {st.metric.value}
                  </span>
                  <span className="text-[12.5px] leading-snug text-muted-foreground">
                    {st.metric.label}
                  </span>
                </div>
              )}
            </div>
            <ul className="space-y-3 md:border-l md:border-border md:pl-8">
              {st.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-foreground">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-[oklch(0.64_0.19_42)]" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
