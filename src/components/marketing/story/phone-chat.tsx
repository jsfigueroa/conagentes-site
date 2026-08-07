"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { TypingIndicator } from "@/components/marketing/hero-demo/typing-indicator";
import { StoryBubble } from "./bubbles";
import {
  BUSINESS_INITIALS,
  BUSINESS_NAME,
  type StoryChatMessage,
} from "./story-script";

/** WhatsApp-style header used by all phone scenes (generic SMB, not hotel). */
function ChatHeader() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[oklch(0.12_0.01_95)]">
      <div className="w-8 h-8 rounded-full bg-[oklch(0.74_0.185_50/0.15)] flex items-center justify-center">
        <span className="text-[10px] font-bold text-[oklch(0.74_0.185_50)]">
          {BUSINESS_INITIALS}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[oklch(0.90_0.005_95)]">
          {BUSINESS_NAME}
        </p>
        <p className="text-[11px] text-[oklch(0.50_0.005_95)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.74_0.185_50)] shrink-0" />
          Agente IA · en línea
        </p>
      </div>
    </div>
  );
}

function InputBar() {
  return (
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
  );
}

interface PhoneChatScreenProps {
  messages: StoryChatMessage[];
  /** Start the sequential reveal (true once the act is active) */
  play: boolean;
  /** Rendered after the messages once they finish (e.g. an order card) */
  footer?: ReactNode;
  /** Delay before the footer appears, ms */
  footerDelay?: number;
}

/**
 * Plays a scripted conversation message-by-message (with a typing indicator
 * before each), mirroring the hero demo's rhythm. Falls back to showing the
 * whole thread instantly when the user prefers reduced motion.
 */
export function PhoneChatScreen({
  messages,
  play,
  footer,
  footerDelay = 600,
}: PhoneChatScreenProps) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState<"customer" | "ai" | null>(null);
  const [showFooter, setShowFooter] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clearAll = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    clearAll();

    if (!play) {
      timers.current.push(
        setTimeout(() => {
          setShown(0);
          setTyping(null);
          setShowFooter(false);
        }, 0),
      );
      return clearAll;
    }

    if (reduce) {
      timers.current.push(
        setTimeout(() => {
          setShown(messages.length);
          setTyping(null);
          setShowFooter(Boolean(footer));
        }, 0),
      );
      return clearAll;
    }

    let t = 300;
    messages.forEach((msg, i) => {
      timers.current.push(
        setTimeout(() => setTyping(msg.sender), t),
      );
      t += msg.sender === "customer" ? 650 : 850;
      timers.current.push(
        setTimeout(() => {
          setTyping(null);
          setShown(i + 1);
        }, t),
      );
      t += 450;
    });
    if (footer) {
      t += footerDelay;
      timers.current.push(setTimeout(() => setShowFooter(true), t));
    }

    return clearAll;
  }, [play, reduce, messages, footer, footerDelay]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [shown, typing, showFooter]);

  return (
    <div className="flex flex-col bg-[oklch(0.10_0.01_95)] overflow-hidden h-full">
      <ChatHeader />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-3 space-y-2"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.slice(0, shown).map((msg) => (
          <StoryBubble key={msg.id} message={msg} />
        ))}
        <AnimatePresence>
          {typing && <TypingIndicator sender={typing} />}
        </AnimatePresence>
        {showFooter && footer}
      </div>
      <InputBar />
    </div>
  );
}
