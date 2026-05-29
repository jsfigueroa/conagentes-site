"use client";

import { motion } from "framer-motion";

export function TypingIndicator({ sender }: { sender: "customer" | "ai" }) {
  const isCustomer = sender === "customer";

  return (
    <div className={`flex ${isCustomer ? "justify-end" : "justify-start"} px-3`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl ${
          isCustomer
            ? "bg-[oklch(0.86_0.27_148/0.15)]"
            : "bg-[oklch(0.18_0.01_95)]"
        }`}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[oklch(0.50_0.005_95)]"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
