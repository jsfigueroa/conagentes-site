"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(from);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const rounded = useTransform(count, (latest) =>
    decimals > 0
      ? latest.toFixed(decimals)
      : Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      count.set(to);
    } else {
      animate(count, to, { duration, ease: "easeOut" });
    }
  }, [count, inView, to, duration, shouldReduceMotion]);

  return (
    <span className={className}>
      {prefix}
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
