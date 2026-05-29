"use client";

import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import {
  PIPELINE_STAGES,
  LEAD_NAME,
  type PipelineStage,
} from "./conversation-script";

interface PipelinePanelProps {
  leadStage: PipelineStage | null;
}

export function PipelinePanel({ leadStage }: PipelinePanelProps) {
  const currentIndex = leadStage
    ? PIPELINE_STAGES.findIndex((s) => s.id === leadStage)
    : -1;

  return (
    <div className="flex flex-col rounded-xl border border-white/[0.08] bg-[oklch(0.10_0.01_95/0.95)] backdrop-blur-sm overflow-hidden h-[280px] shadow-[0_8px_40px_oklch(0_0_0/0.5)]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[oklch(0.12_0.01_95)]">
        <svg
          className="w-4 h-4 text-[oklch(0.86_0.27_148)]"
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
        <p className="text-sm font-medium text-[oklch(0.90_0.005_95)]">
          Pipeline de Ventas
        </p>
      </div>

      {/* Kanban columns */}
      <LayoutGroup>
        <div className="flex-1 flex gap-1.5 p-3 overflow-hidden">
          {PIPELINE_STAGES.map((stage, stageIndex) => {
            const isActive = leadStage === stage.id;
            const isPast = currentIndex > stageIndex;

            return (
              <div key={stage.id} className="flex-1 flex flex-col min-w-0">
                {/* Column header */}
                <div className="flex items-center gap-1.5 mb-2 px-1">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${stage.dotColor} ${
                      isActive ? "ring-2 ring-white/20" : ""
                    }`}
                  />
                  <span className="text-[10px] font-medium text-[oklch(0.50_0.005_95)] truncate">
                    {stage.label}
                  </span>
                  <AnimatePresence>
                    {(isActive || isPast) && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="ml-auto text-[9px] font-medium text-[oklch(0.50_0.005_95)] bg-white/[0.06] rounded-full w-4 h-4 flex items-center justify-center shrink-0"
                      >
                        {isPast ? "✓" : "1"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Column body */}
                <div
                  className={`flex-1 rounded-lg border border-dashed p-1.5 transition-colors duration-300 ${
                    isActive
                      ? "border-white/[0.15] bg-white/[0.02]"
                      : "border-white/[0.06]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="hero-demo-lead"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="relative rounded-md bg-[oklch(0.16_0.01_95)] border border-white/[0.1] p-2"
                    >
                      <p className="text-[10px] font-medium text-[oklch(0.85_0.005_95)] truncate">
                        {LEAD_NAME}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.86_0.27_148)] shrink-0" />
                        <span className="text-[8px] text-[oklch(0.45_0.005_95)]">
                          WhatsApp
                        </span>
                      </div>

                      {/* Checkmark badge on Cerrado */}
                      {stage.id === "cerrado" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                            delay: 0.2,
                          }}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[oklch(0.86_0.27_148)] flex items-center justify-center"
                        >
                          <svg
                            className="w-2.5 h-2.5 text-[oklch(0.20_0.01_95)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}
