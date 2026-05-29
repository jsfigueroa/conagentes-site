"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FloatingElementProps {
  children?: React.ReactNode;
  duration?: number;
  distance?: number;
  delay?: number;
  className?: string;
}

export function FloatingElement({
  children,
  duration = 6,
  distance = 20,
  delay = 0,
  className,
}: FloatingElementProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
        rotate: [-1.5, 1.5, -1.5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
