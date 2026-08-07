"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import type { ScriptMessage } from "./conversation-script";
import { ChatBubble } from "./chat-bubble";
import { TypingIndicator } from "./typing-indicator";

interface ChatPanelProps {
  messages: ScriptMessage[];
  typingSender: "customer" | "ai" | null;
}

export function ChatPanel({ messages, typingSender }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, typingSender]);

  return (
    <div className="flex flex-col bg-[oklch(0.10_0.01_95)] overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[oklch(0.12_0.01_95)]">
        <div className="w-8 h-8 rounded-full bg-[oklch(0.74_0.185_50/0.15)] flex items-center justify-center">
          <span className="text-[10px] font-bold text-[oklch(0.74_0.185_50)]">
            HB
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[oklch(0.90_0.005_95)]">
            Hotel Boutique Cartagena
          </p>
          <p className="text-[11px] text-[oklch(0.50_0.005_95)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.74_0.185_50)] shrink-0" />
            Agente IA · en línea
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-3 space-y-2"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        <AnimatePresence>
          {typingSender && <TypingIndicator sender={typingSender} />}
        </AnimatePresence>
      </div>

      {/* Input bar (decorative) */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-white/[0.06] bg-[oklch(0.12_0.01_95)]">
        <div className="flex-1 rounded-full bg-[oklch(0.16_0.01_95)] px-4 py-2 text-xs text-[oklch(0.40_0.005_95)]">
          Escribe un mensaje...
        </div>
        <div className="w-8 h-8 rounded-full bg-[oklch(0.74_0.185_50)] flex items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 text-[oklch(0.20_0.01_95)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
