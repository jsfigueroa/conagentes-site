"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/marketing/animation/animated-counter";
import { DashboardFrame, reveal } from "./frames";

const stats = [
  { label: "Entregados", to: 241 },
  { label: "Leídos", to: 198 },
  { label: "Respondieron", to: 64 },
];

/** Act 5 — launch a WhatsApp campaign to the exact segment + measure it. */
export function CampaignScene({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center">
      <DashboardFrame title="Campaña WhatsApp">
        {/* Segment */}
        <motion.div
          {...reveal(active, 0.1, 8)}
          className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[oklch(0.13_0.01_95)] p-3"
        >
          <div>
            <p className="text-[9px] text-[oklch(0.50_0.005_95)]">Segmento</p>
            <p className="text-[12px] font-semibold text-white">
              Clientes por reordenar
            </p>
          </div>
          <span className="rounded-full bg-[oklch(0.74_0.185_50/0.15)] px-2.5 py-1 text-[11px] font-bold text-[oklch(0.74_0.185_50)]">
            248
          </span>
        </motion.div>

        {/* Template preview */}
        <motion.div {...reveal(active, 0.25, 8)} className="mt-3">
          <p className="mb-1.5 text-[10px] text-[oklch(0.50_0.005_95)]">
            Mensaje
          </p>
          <div className="rounded-xl rounded-bl-sm bg-[oklch(0.18_0.01_95)] px-3 py-2 text-[11px] leading-relaxed text-[oklch(0.84_0.005_95)]">
            Hola <span className="text-[oklch(0.74_0.185_50)]">{"{nombre}"}</span>{" "}
            👋 ¿Listo para tu próximo pedido? Tenemos tus Vasos 7 oz para entrega
            en 24 h 🚚
          </div>
        </motion.div>

        {/* Send */}
        <motion.div
          {...reveal(active, 0.45, 8)}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[oklch(0.74_0.185_50)] py-2"
        >
          <span className="text-[12px] font-semibold text-[oklch(0.20_0.01_95)]">
            Campaña enviada ✓
          </span>
        </motion.div>

        {/* Delivery stats */}
        <motion.div
          {...reveal(active, 0.8, 10)}
          className="mt-4 grid grid-cols-3 gap-2"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/[0.06] bg-[oklch(0.13_0.01_95)] p-2.5 text-center"
            >
              <AnimatedCounter
                to={s.to}
                duration={1.4}
                className="text-[18px] font-bold text-[oklch(0.74_0.185_50)]"
              />
              <p className="mt-0.5 text-[9px] text-[oklch(0.50_0.005_95)]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </DashboardFrame>
    </div>
  );
}
