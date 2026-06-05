"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/marketing/animation/animated-counter";
import { DashboardFrame, reveal } from "./frames";
import { CUSTOMER_NAME, formatCOP, ORDER_TOTAL } from "./story-script";

const recientes = [
  { id: "#1042", name: CUSTOMER_NAME, total: ORDER_TOTAL, status: "Confirmado", hot: true },
  { id: "#1041", name: "Andrés Ruiz", total: 142000, status: "Confirmado", hot: false },
  { id: "#1040", name: "María León", total: 78000, status: "Confirmado", hot: false },
];

function MetricTile({
  label,
  children,
  active,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  active: boolean;
  delay: number;
}) {
  return (
    <motion.div
      {...reveal(active, delay)}
      className="flex-1 rounded-xl border border-white/[0.06] bg-[oklch(0.13_0.01_95)] p-3"
    >
      <p className="text-[10px] text-[oklch(0.50_0.005_95)]">{label}</p>
      <div className="mt-1 text-[18px] font-bold text-white">{children}</div>
    </motion.div>
  );
}

/** Act 3 — everything lands on the dashboard + business answers by WhatsApp. */
export function DashboardScene({ active }: { active: boolean }) {
  return (
    <div className="relative">
      <DashboardFrame title="conagentes · Panel">
        {/* Metrics */}
        <div className="flex gap-2.5">
          <MetricTile label="Pedidos hoy" active={active} delay={0.1}>
            <AnimatedCounter to={7} duration={1.2} />
          </MetricTile>
          <MetricTile label="Ventas hoy" active={active} delay={0.2}>
            <span className="text-[oklch(0.86_0.27_148)]">
              {formatCOP(1240000)}
            </span>
          </MetricTile>
        </div>

        {/* Recent orders */}
        <p className="mt-4 mb-2 text-[10px] font-medium uppercase tracking-wider text-[oklch(0.45_0.005_95)]">
          Pedidos recientes
        </p>
        <div className="space-y-1.5">
          {recientes.map((r, i) => (
            <motion.div
              key={r.id}
              {...reveal(active, 0.3 + i * 0.12)}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                r.hot
                  ? "border-[oklch(0.86_0.27_148/0.3)] bg-[oklch(0.86_0.27_148/0.06)]"
                  : "border-white/[0.06] bg-[oklch(0.12_0.01_95)]"
              }`}
            >
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[oklch(0.88_0.005_95)] truncate">
                  {r.name}
                </p>
                <p className="text-[9px] text-[oklch(0.50_0.005_95)]">{r.id}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-semibold text-[oklch(0.85_0.005_95)]">
                  {formatCOP(r.total)}
                </span>
                <span className="rounded-full bg-[oklch(0.72_0.25_148/0.15)] px-2 py-0.5 text-[8px] font-semibold text-[oklch(0.80_0.18_148)]">
                  {r.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardFrame>

      {/* BI-by-WhatsApp mini chat */}
      <motion.div
        {...reveal(active, 0.9, 16)}
        className="absolute -bottom-10 -right-2 sm:-right-6 w-[220px] sm:w-[240px] rounded-2xl border border-white/[0.08] bg-[oklch(0.10_0.01_95)] p-2.5 shadow-[0_8px_40px_oklch(0_0_0/0.55)]"
      >
        <p className="mb-1.5 text-[9px] font-medium text-[oklch(0.50_0.005_95)]">
          Tú · por WhatsApp
        </p>
        <div className="flex justify-end mb-1.5">
          <div className="rounded-xl rounded-br-sm bg-[oklch(0.86_0.27_148/0.15)] px-2.5 py-1.5 text-[10px] text-[oklch(0.90_0.005_95)]">
            ¿Cómo vamos hoy? 📊
          </div>
        </div>
        <div className="flex justify-start">
          <div className="rounded-xl rounded-bl-sm bg-[oklch(0.18_0.01_95)] px-2.5 py-1.5 text-[10px] leading-relaxed text-[oklch(0.82_0.005_95)]">
            Hoy llevas <b className="text-white">7 pedidos</b> y{" "}
            <b className="text-[oklch(0.86_0.27_148)]">$1.240.000</b> en ventas
            💚 Tu producto top: Vaso 7 oz.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
