"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  text,
  className,
  once = true,
  delay = 0,
  staggerDelay = 0.06,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-15%" });

  const words = text.split(" ");

  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0%",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1] as const,
        delay: delay + staggerDelay * i,
      },
    }),
  };

  return (
    <div ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden mr-[0.25em]"
          >
            <motion.span
              className="inline-block"
              custom={index}
              variants={animation}
              initial="initial"
              animate={isInView ? "enter" : "initial"}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  );
}
