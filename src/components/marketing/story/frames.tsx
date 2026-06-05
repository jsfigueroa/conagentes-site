"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  CUSTOMER_NAME,
  PIPELINE_STAGES,
  type PipelineStage,
} from "./story-script";

/**
 * Motion props for a scene element that rises/fades in only once its act is
 * active. Keeps off-screen mobile acts from animating before they're seen.
 */
export function reveal(active: boolean, delay = 0, y = 10) {
  return {
    initial: { opacity: 0, y },
    animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { delay, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  };
}

/**
 * A dark "app window" used by the dashboard/intelligence/campaign scenes —
 * the platform (owner) side of the story. On-brand with the phone mockups.
 */
export function DashboardFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="w-[300px] sm:w-[340px] md:w-[400px] rounded-2xl border border-white/[0.08] bg-[oklch(0.10_0.01_95)] overflow-hidden shadow-[0_8px_60px_oklch(0_0_0/0.5),0_0_80px_oklch(0.86_0.27_148/0.05)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[oklch(0.12_0.01_95)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.45_0.12_25)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.55_0.12_75)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.55_0.12_148)]" />
        <p className="ml-2 text-[11px] font-medium text-[oklch(0.55_0.005_95)]">
          {title}
        </p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/**
 * Compact horizontal pipeline rail with the lead card sitting on the active
 * stage — a lighter take on the hero's kanban, sized to sit under the phone.
 */
export function PipelineRail({ stage }: { stage: PipelineStage | null }) {
  const currentIndex = stage
    ? PIPELINE_STAGES.findIndex((s) => s.id === stage)
    : -1;

  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[oklch(0.10_0.01_95/0.95)] backdrop-blur-sm p-3 shadow-[0_8px_40px_oklch(0_0_0/0.45)]">
      <div className="flex items-center gap-2 mb-2.5">
        <svg
          className="w-3.5 h-3.5 text-[oklch(0.86_0.27_148)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <p className="text-[11px] font-medium text-[oklch(0.85_0.005_95)]">
          Pipeline de ventas
        </p>
      </div>
      <div className="flex gap-1.5">
        {PIPELINE_STAGES.map((s, i) => {
          const isActive = stage === s.id;
          const isPast = currentIndex > i;
          return (
            <div key={s.id} className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dotColor}`} />
                <span className="text-[9px] text-[oklch(0.50_0.005_95)] truncate">
                  {s.label}
                </span>
              </div>
              <div
                className={`h-9 rounded-md border border-dashed flex items-center px-1 transition-colors duration-300 ${
                  isActive
                    ? "border-white/[0.15] bg-white/[0.02]"
                    : "border-white/[0.06]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="story-lead-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full rounded bg-[oklch(0.16_0.01_95)] border border-white/[0.1] px-1.5 py-1"
                  >
                    <p className="text-[8px] font-medium text-[oklch(0.85_0.005_95)] truncate">
                      {CUSTOMER_NAME}
                    </p>
                  </motion.div>
                )}
                {isPast && (
                  <span className="text-[10px] text-[oklch(0.72_0.25_148)]">✓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
