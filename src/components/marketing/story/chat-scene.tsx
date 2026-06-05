"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PhoneFrame } from "@/components/marketing/hero-demo/phone-frame";
import { PhoneChatScreen } from "./phone-chat";
import { PipelineRail } from "./frames";
import { CHAT_SCRIPT, type PipelineStage } from "./story-script";

/** Act 1 — the conversation that sells. Chat + lead climbing the pipeline. */
export function ChatScene({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<PipelineStage | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    clear();
    if (!active) {
      timers.current.push(setTimeout(() => setStage(null), 0));
      return clear;
    }
    if (reduce) {
      timers.current.push(setTimeout(() => setStage("calificado"), 0));
      return clear;
    }
    timers.current.push(setTimeout(() => setStage("nuevo"), 700));
    timers.current.push(setTimeout(() => setStage("interesado"), 2400));
    timers.current.push(setTimeout(() => setStage("calificado"), 4600));
    return clear;
  }, [active, reduce]);

  return (
    <div className="flex flex-col items-center gap-4">
      <PhoneFrame>
        <PhoneChatScreen messages={CHAT_SCRIPT} play={active} />
      </PhoneFrame>
      <div className="w-[280px] sm:w-[300px] md:w-[340px]">
        <PipelineRail stage={stage} />
      </div>
    </div>
  );
}
