"use client";

import { motion } from "framer-motion";
import type { ScriptMessage } from "./conversation-script";

export function ChatBubble({ message }: { message: ScriptMessage }) {
  const isCustomer = message.sender === "customer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex ${isCustomer ? "justify-end" : "justify-start"} px-3`}
    >
      <div
        className={`max-w-[80%] px-3 py-2 text-[13px] leading-relaxed ${
          isCustomer
            ? "bg-[oklch(0.74_0.185_50/0.15)] text-[oklch(0.92_0.005_95)] rounded-2xl rounded-br-md"
            : "bg-[oklch(0.18_0.01_95)] text-[oklch(0.85_0.005_95)] rounded-2xl rounded-bl-md"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
}
