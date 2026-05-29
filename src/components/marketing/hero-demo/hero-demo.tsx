"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  CONVERSATION,
  type ScriptMessage,
  type PipelineStage,
} from "./conversation-script";
import { ChatPanel } from "./chat-panel";
import { PhoneFrame } from "./phone-frame";
import { PipelinePanel } from "./pipeline-panel";

export function HeroDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const [messages, setMessages] = useState<ScriptMessage[]>([]);
  const [typingSender, setTypingSender] = useState<
    "customer" | "ai" | null
  >(null);
  const [leadStage, setLeadStage] = useState<PipelineStage | null>(null);

  const show = useCallback((index: number) => {
    const msg = CONVERSATION[index];
    setTypingSender(null);
    setMessages((prev) => [...prev, msg]);
    if (msg.pipelineEvent) setLeadStage(msg.pipelineEvent);
  }, []);

  const reset = useCallback(() => {
    setMessages([]);
    setTypingSender(null);
    setLeadStage(null);
  }, []);

  useGSAP(
    () => {
      if (shouldReduceMotion === true) return;
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 2,
        onRepeat: reset,
      });

      tl.set(containerRef.current, { opacity: 1 }, 0);

      // Msg 1: Customer greeting → Pipeline: Nuevo
      tl.call(() => setTypingSender("customer"), [], 0.5);
      tl.call(() => show(0), [], 1.5);

      // Msg 2: AI greeting
      tl.call(() => setTypingSender("ai"), [], 2.3);
      tl.call(() => show(1), [], 3.5);

      // Msg 3: Customer wants to reserve → Pipeline: Interesado
      tl.call(() => setTypingSender("customer"), [], 5.0);
      tl.call(() => show(2), [], 6.5);

      // Msg 4: AI asks how many people
      tl.call(() => setTypingSender("ai"), [], 7.3);
      tl.call(() => show(3), [], 8.8);

      // Msg 5: Customer details → Pipeline: Calificado
      tl.call(() => setTypingSender("customer"), [], 10.3);
      tl.call(() => show(4), [], 11.5);

      // Msg 6: AI price + payment link
      tl.call(() => setTypingSender("ai"), [], 12.3);
      tl.call(() => show(5), [], 14.0);

      // Msg 7: Customer confirms → Pipeline: Cerrado
      tl.call(() => setTypingSender("customer"), [], 15.5);
      tl.call(() => show(6), [], 16.3);

      // Msg 8: AI confirmation
      tl.call(() => setTypingSender("ai"), [], 17.0);
      tl.call(() => show(7), [], 18.5);

      // Fade out before loop restart
      tl.to(containerRef.current, { opacity: 0, duration: 0.8 }, 21.5);

      timelineRef.current = tl;
    },
    { scope: containerRef },
  );

  // Play/pause based on visibility — also re-check when timeline ref changes
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isInView) {
      tl.play();
    } else {
      tl.pause();
    }
  }, [isInView]);

  // Safety: if timeline was created while already in view, ensure it plays
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const tl = timelineRef.current;
      if (tl && tl.paused() && isInView) {
        tl.play();
      }
    });
    return () => cancelAnimationFrame(id);
  });

  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className="relative">
        <PhoneFrame>
          <ChatPanel messages={CONVERSATION} typingSender={null} />
        </PhoneFrame>
        <div className="absolute -bottom-10 -left-24 w-[340px] hidden lg:block">
          <PipelinePanel leadStage="cerrado" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <PhoneFrame>
        <ChatPanel messages={messages} typingSender={typingSender} />
      </PhoneFrame>
      <div className="absolute -bottom-10 -left-24 w-[340px] hidden lg:block">
        <PipelinePanel leadStage={leadStage} />
      </div>
    </div>
  );
}
