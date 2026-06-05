"use client";

import { motion } from "framer-motion";
import { DashboardFrame, reveal } from "./frames";
import { CUSTOMER_NAME } from "./story-script";

/** Act 4 — the agent learns the buying pattern and flags the next reorder. */
export function IntelligenceScene({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center">
      <DashboardFrame title="Inteligencia de cliente">
        {/* Customer header */}
        <motion.div {...reveal(active, 0.1, 8)}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.86_0.27_148/0.15)] text-[12px] font-bold text-[oklch(0.86_0.27_148)]">
              LG
            </div>
            <div>
              <p className="text-[13px] font-bold text-white">{CUSTOMER_NAME}</p>
              <span className="text-[9px] font-semibold rounded-full bg-white/[0.06] px-2 py-0.5 text-[oklch(0.65_0.005_95)]">
                Cliente recurrente
              </span>
            </div>
          </div>
        </motion.div>

        {/* Pattern stats */}
        <motion.div {...reveal(active, 0.25, 8)}>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-white/[0.06] bg-[oklch(0.13_0.01_95)] p-3">
              <p className="text-[9px] text-[oklch(0.50_0.005_95)]">Compra cada</p>
              <p className="mt-0.5 text-[15px] font-bold text-white">~3 semanas</p>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-[oklch(0.13_0.01_95)] p-3">
              <p className="text-[9px] text-[oklch(0.50_0.005_95)]">Última compra</p>
              <p className="mt-0.5 text-[15px] font-bold text-white">hace 19 días</p>
            </div>
          </div>
        </motion.div>

        {/* Reorder readiness */}
        <motion.div {...reveal(active, 0.4, 8)}>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-[oklch(0.55_0.005_95)]">
                Próxima compra
              </span>
              <span className="text-[10px] font-semibold text-[oklch(0.86_0.27_148)]">
                Está por reordenar
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: "8%" }}
                animate={{ width: active ? "90%" : "8%" }}
                transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[oklch(0.72_0.25_148)] to-[oklch(0.86_0.27_148)]"
              />
            </div>
          </div>
        </motion.div>

        {/* Next-best-action */}
        <motion.div {...reveal(active, 0.8, 8)}>
          <div className="mt-4 rounded-xl border border-[oklch(0.86_0.27_148/0.25)] bg-[oklch(0.86_0.27_148/0.06)] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-[oklch(0.80_0.18_148)]">
              Sugerencia del agente
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-[oklch(0.85_0.005_95)]">
              Escríbele a {CUSTOMER_NAME.split(" ")[0]} y ofrécele su pedido de
              siempre antes de que se le acabe.
            </p>
            <div className="mt-2.5 flex items-center justify-center gap-1.5 rounded-lg bg-[oklch(0.86_0.27_148)] py-1.5">
              <span className="text-[11px] font-semibold text-[oklch(0.20_0.01_95)]">
                Reordenar en 1 toque
              </span>
            </div>
          </div>
        </motion.div>
      </DashboardFrame>
    </div>
  );
}
