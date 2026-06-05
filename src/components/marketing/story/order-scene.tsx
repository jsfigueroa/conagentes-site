"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhoneFrame } from "@/components/marketing/hero-demo/phone-frame";
import { PhoneChatScreen } from "./phone-chat";
import {
  CUSTOMER_NAME,
  formatCOP,
  ORDER_LINES,
  ORDER_TOTAL,
  type StoryChatMessage,
} from "./story-script";

const INTRO: StoryChatMessage[] = [
  {
    id: "o1",
    sender: "customer",
    text: "Listo, confírmame todo el pedido 🙌",
  },
  {
    id: "o2",
    sender: "ai",
    text: "¡Claro, Laura! Te armé el pedido completo 👇",
  },
];

function OrderCard() {
  const reduce = useReducedMotion();
  const lineDelay = reduce ? 0 : 0.35;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex justify-start px-3"
    >
      <div className="max-w-[90%] w-full rounded-2xl rounded-bl-md bg-[oklch(0.18_0.01_95)] p-3">
        <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-white/[0.08]">
          <span className="text-base" aria-hidden>
            🧾
          </span>
          <div>
            <p className="text-[12px] font-bold text-[oklch(0.92_0.005_95)] leading-tight">
              Pedido #1042
            </p>
            <p className="text-[10px] text-[oklch(0.55_0.005_95)]">
              {CUSTOMER_NAME}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {ORDER_LINES.map((line, i) => (
            <motion.div
              key={line.name}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * lineDelay, duration: 0.3 }}
              className="flex items-start justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-[oklch(0.88_0.005_95)] truncate">
                  {line.name}
                </p>
                <p className="text-[9px] text-[oklch(0.50_0.005_95)]">
                  {line.qty} × {formatCOP(line.unit)}
                </p>
              </div>
              <p className="text-[11px] font-semibold text-[oklch(0.88_0.005_95)] whitespace-nowrap">
                {formatCOP(line.qty * line.unit)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ORDER_LINES.length * lineDelay, duration: 0.3 }}
          className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.08]"
        >
          <span className="text-[12px] font-medium text-[oklch(0.70_0.005_95)]">
            Total
          </span>
          <span className="text-[15px] font-bold text-[oklch(0.86_0.27_148)]">
            {formatCOP(ORDER_TOTAL)}
          </span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: ORDER_LINES.length * lineDelay + 0.35,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[oklch(0.86_0.27_148/0.12)] py-2"
        >
          <span className="text-[oklch(0.86_0.27_148)] text-[12px]">✓</span>
          <span className="text-[11px] font-semibold text-[oklch(0.86_0.27_148)]">
            Pedido confirmado
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Act 2 — the consolidated, itemized order built in-chat. */
export function OrderScene({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center">
      <PhoneFrame>
        <PhoneChatScreen
          messages={INTRO}
          play={active}
          footer={<OrderCard />}
          footerDelay={500}
        />
      </PhoneFrame>
    </div>
  );
}
