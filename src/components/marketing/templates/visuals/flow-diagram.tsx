"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Section } from "@/content/pages";
import { resolveIcon } from "./icon-map";

type FlowSection = Extract<Section, { type: "flow" }>;

/**
 * A mechanism diagram: the steps the agent actually runs, joined by a rail
 * with a travelling pulse. It is an <ol> underneath — the sequence is real
 * markup, so an assistant reads it as an ordered process, not as decoration.
 */
export function FlowDiagram({ s }: { s: FlowSection }) {
  const reduce = useReducedMotion();
  const n = s.nodes.length;

  return (
    <figure className="mx-auto max-w-6xl">
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {/* rail — desktop only */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[26px] hidden h-px overflow-hidden lg:block"
          aria-hidden
        >
          <motion.div
            className="h-px w-full origin-left bg-[oklch(0.88_0.008_95)]"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          {!reduce && (
            <motion.div
              className="absolute top-0 h-px w-24 bg-brand-gradient"
              initial={{ x: "-10%", opacity: 0 }}
              whileInView={{ x: "110%", opacity: [0, 1, 1, 0] }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 2.4, delay: 0.8, repeat: Infinity, repeatDelay: 1.6 }}
            />
          )}
        </div>

        {s.nodes.map((node, i) => {
          const Icon = resolveIcon(node.icon);
          return (
            <motion.li
              key={i}
              // Offset only — never opacity. See the note in chat-replay.tsx:
              // content must be readable without a scroll event ever firing.
              initial={reduce ? false : { y: 14 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.09 * i, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative flex items-center gap-3 lg:block">
                <span className="relative z-10 flex size-[52px] shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-[0_2px_10px_-4px_oklch(0.2_0.01_95/0.2)]">
                  <Icon className="h-[22px] w-[22px] text-[oklch(0.64_0.19_42)]" aria-hidden />
                  <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold tabular-nums text-white">
                    {i + 1}
                  </span>
                </span>
                {node.tag && (
                  // bg-card (opaque) so the rail passes behind the pill instead
                  // of striking through it.
                  <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground lg:absolute lg:right-0 lg:top-3.5">
                    {node.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-[15.5px] font-semibold leading-snug text-foreground">
                {node.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                {node.body}
              </p>
              {/* connector — mobile */}
              {i < n - 1 && (
                <span
                  className="mt-5 block h-5 w-px bg-[oklch(0.9_0.008_95)] lg:hidden"
                  style={{ marginLeft: "25px" }}
                  aria-hidden
                />
              )}
            </motion.li>
          );
        })}
      </ol>
      {s.footnote && (
        <figcaption className="mt-8 text-center text-[12.5px] leading-relaxed text-muted-foreground">
          {s.footnote}
        </figcaption>
      )}
    </figure>
  );
}
