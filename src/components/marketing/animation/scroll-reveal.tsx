"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}

function getInitial(direction: Direction, distance = 40) {
  switch (direction) {
    case "up":
      return { y: distance, opacity: 0 };
    case "down":
      return { y: -distance, opacity: 0 };
    case "left":
      return { x: distance, opacity: 0 };
    case "right":
      return { x: -distance, opacity: 0 };
  }
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const initial = getInitial(direction);
  const animate = isInView ? { x: 0, y: 0, opacity: 1 } : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
