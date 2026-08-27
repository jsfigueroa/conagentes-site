"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  /**
   * Element to render. `li` matters: a reveal wrapper that always emits a
   * <div> silently breaks any <ol>/<ul> it is used inside, and this site leans
   * on real list markup for machine readers.
   */
  as?: "div" | "li";
}

/**
 * Scroll-in reveal. Two rules it will not break:
 *
 * 1. NO OPACITY. framer-motion serialises `initial` into the server-rendered
 *    markup, so an opacity-0 reveal ships `style="opacity:0"` in the HTML —
 *    invisible to anything that renders the page without scrolling it, which
 *    includes several AI and search crawlers, and to anyone with JS off. The
 *    ChatReplay component already refuses opacity for exactly this reason; this
 *    is the same rule applied to every other section of the site.
 * 2. Transform only, so the browser never re-lays-out during the reveal.
 *
 * The motion is therefore a short offset settling into place — which is also
 * the better-looking option: fading content in is the tell of a generated page.
 */

const DISTANCE = 28;

function offset(direction: Direction) {
  switch (direction) {
    case "up":
      return { y: DISTANCE };
    case "down":
      return { y: -DISTANCE };
    case "left":
      return { x: DISTANCE };
    case "right":
      return { x: -DISTANCE };
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
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount });
  const reduce = useReducedMotion();

  const from = reduce ? { x: 0, y: 0 } : offset(direction);
  const shared = {
    initial: from,
    animate: isInView ? { x: 0, y: 0 } : from,
    transition: {
      duration: reduce ? 0 : duration,
      delay: reduce ? 0 : delay,
      // power4.out — long tail, arrives without a bounce.
      ease: [0.16, 1, 0.3, 1] as const,
    },
    className,
  };

  // Two explicit branches rather than a dynamic tag: motion.li and motion.div
  // take incompatible ref types, and casting a ref is exactly the kind of lie
  // that stops the compiler from catching the next mistake.
  if (as === "li") {
    return (
      <motion.li ref={ref as React.RefObject<HTMLLIElement>} {...shared}>
        {children}
      </motion.li>
    );
  }
  return (
    <motion.div ref={ref as React.RefObject<HTMLDivElement>} {...shared}>
      {children}
    </motion.div>
  );
}
