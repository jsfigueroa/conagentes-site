"use client";

import { motion } from "framer-motion";
import { formatCOP, type StoryChatMessage } from "./story-script";

const enter = {
  initial: { opacity: 0, y: 12, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
};

/**
 * A WhatsApp-style chat bubble that supports plain text and rich product
 * cards. Matches the hero-demo bubble palette so the story reads as a
 * continuation of the hero conversation.
 */
export function StoryBubble({ message }: { message: StoryChatMessage }) {
  const isCustomer = message.sender === "customer";

  // Product-card bubble (sent by the AI)
  if (message.product) {
    const p = message.product;
    return (
      <motion.div {...enter} className="flex justify-start px-3">
        <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-[oklch(0.18_0.01_95)] p-2 overflow-hidden">
          <div className="rounded-xl bg-[oklch(0.13_0.01_95)] border border-white/[0.06] overflow-hidden">
            <div className="flex h-20 items-center justify-center bg-[oklch(0.86_0.27_148/0.10)] text-3xl">
              <span aria-hidden>{p.emoji}</span>
            </div>
            <div className="p-2.5">
              <p className="text-[12px] font-semibold text-[oklch(0.92_0.005_95)] leading-tight">
                {p.name}
              </p>
              <p className="mt-0.5 text-[10px] text-[oklch(0.55_0.005_95)]">
                {p.detail}
              </p>
              <p className="mt-1.5 text-[13px] font-bold text-[oklch(0.86_0.27_148)]">
                {formatCOP(p.price)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Plain text bubble
  return (
    <motion.div
      {...enter}
      className={`flex ${isCustomer ? "justify-end" : "justify-start"} px-3`}
    >
      <div
        className={`max-w-[80%] px-3 py-2 text-[13px] leading-relaxed ${
          isCustomer
            ? "bg-[oklch(0.86_0.27_148/0.15)] text-[oklch(0.92_0.005_95)] rounded-2xl rounded-br-md"
            : "bg-[oklch(0.18_0.01_95)] text-[oklch(0.85_0.005_95)] rounded-2xl rounded-bl-md"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}
