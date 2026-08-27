"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BRAND_MARKS } from "@/components/marketing/hotel/brand-marks";

/**
 * The channels feeding the hero phone. Four marks drifting beside the device,
 * each pulsing in turn, so «omnicanal» is understood before a word is read.
 *
 * Deliberately decorative: the same claim is made in prose two paragraphs
 * away, so the whole cluster is aria-hidden and hidden below xl (where it
 * would crowd the headline instead of framing it).
 */

/**
 * Anchored with `right`, not `left`: percentages resolve against the phone
 * wrapper's width, so `right: 106%` guarantees the chip's right edge clears the
 * device instead of landing on top of the conversation.
 */
const CHANNELS = [
  { key: "whatsapp", name: "WhatsApp", top: "5%", right: "107%" },
  { key: "instagram", name: "Instagram", top: "30%", right: "119%" },
  { key: "booking", name: "Booking.com", top: "56%", right: "115%" },
  { key: "airbnb", name: "Airbnb", top: "81%", right: "105%" },
] as const;

export function ChannelOrbit() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 hidden xl:block"
    >
      {CHANNELS.map((c, i) => {
        const mark = BRAND_MARKS[c.key];
        return (
          <motion.span
            key={c.key}
            className="absolute inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.10] bg-white/[0.05] py-1.5 pl-2 pr-3.5 text-[12px] font-semibold text-white/80 backdrop-blur-md"
            style={{ top: c.top, right: c.right }}
            initial={{ opacity: 0, x: -12 }}
            animate={{
              opacity: 1,
              x: 0,
              // A slow, out-of-phase bob. Transform only — never layout.
              y: reduce ? 0 : [0, -7, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.9 + i * 0.12 },
              x: { duration: 0.5, delay: 0.9 + i * 0.12 },
              y: {
                duration: 6 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              },
            }}
          >
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.07]">
              {mark && (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white/75">
                  <path d={mark.path} />
                </svg>
              )}
              {/* Staggered ping = a message landing on that channel. */}
              {!reduce && (
                <motion.span
                  className="absolute inset-0 rounded-full ring-1 ring-[oklch(0.77_0.165_56/0.7)]"
                  animate={{ scale: [1, 1.75], opacity: [0.75, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatDelay: 3.2,
                    delay: 1.6 + i * 1.05,
                    ease: "easeOut",
                  }}
                />
              )}
            </span>
            {c.name}
          </motion.span>
        );
      })}
    </div>
  );
}
