"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import type { Section } from "@/content/pages";

type StatsSection = Extract<Section, { type: "stats" }>;

/**
 * The stat band. Numbers count up on entry — but the final value is what is
 * rendered on the server and what a reader with JS disabled sees, so the claim
 * is never hidden behind an animation. Values that are not numeric ("24/7",
 * "0 %") simply render as-is.
 */
function Value({ raw, run }: { raw: string; run: boolean }) {
  const m = /^([^\d-]*)(-?\d[\d.,]*)(.*)$/.exec(raw);
  const [text, setText] = useState(raw);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!run || reduce || !m) return;
    const [, pre, num, post] = m;
    const decimals = num.includes(",") ? 1 : 0;
    const target = Number(num.replace(/\./g, "").replace(",", "."));
    if (!Number.isFinite(target)) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) =>
        setText(
          pre +
            v.toLocaleString("es-CO", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }) +
            post,
        ),
    });
    return () => controls.stop();
  }, [run, reduce, m]);

  return <>{text}</>;
}

export function StatsRow({ s }: { s: StatsSection }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="mx-auto max-w-6xl rounded-3xl border border-white/[0.06] bg-[oklch(0.1_0.01_95)] px-6 py-12"
    >
      {s.heading && (
        <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">{s.heading}</h2>
      )}
      {s.sub && (
        <p className="mx-auto mb-8 max-w-2xl text-center text-[14.5px] leading-relaxed text-[oklch(0.7_0.005_95)]">
          {s.sub}
        </p>
      )}
      <dl
        className={`grid gap-8 ${s.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"} ${
          s.heading && !s.sub ? "mt-8" : ""
        }`}
      >
        {s.items.map((item, i) => (
          <div key={i} className="text-center">
            <dt className="text-4xl font-extrabold tabular-nums text-[oklch(0.74_0.185_50)] sm:text-[44px]">
              <Value raw={item.value} run={inView} />
            </dt>
            <dd className="mx-auto mt-2 max-w-[24ch] text-[13px] leading-snug text-[oklch(0.72_0.005_95)]">
              {item.label}
            </dd>
          </div>
        ))}
      </dl>
      {s.note && (
        <p className="mx-auto mt-9 max-w-3xl border-t border-white/10 pt-6 text-center text-[11.5px] leading-relaxed text-[oklch(0.58_0.005_95)]">
          {s.note}
        </p>
      )}
    </div>
  );
}
