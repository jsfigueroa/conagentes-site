"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Radio } from "lucide-react";
import { BRAND_MARKS } from "@/components/marketing/hotel/brand-marks";

/**
 * «Se cierra en todos los canales» — the moment a direct booking is confirmed,
 * the room stops being sellable everywhere else.
 *
 * This is the single hardest thing to explain in words to a hotelier and the
 * easiest to show: one reservation, five outbound rays, five channels going
 * quiet. It is also the anti-overbooking argument, which is the fear that
 * actually keeps them off automation.
 *
 * FACTUAL BASIS — 61 OTA and booking-channel connections, verified against our
 * channel-manager integration's published directory, with Booking.com, Airbnb,
 * Expedia and Despegar each individually confirmed. So naming those four and
 * calling the rest «+57 canales» is exact, not marketing rounding.
 *
 * NEVER NAME THE CHANNEL-MANAGER VENDOR ON THE SITE (founder's call). Naming
 * the supplier tells competitors how the plumbing works and invites the client
 * to wonder why they don't go to it directly. The coverage is ours to claim;
 * the vendor is not part of the story. This applies to visible copy, `entities`
 * arrays, keywords, llms.txt and blog posts alike.
 *
 * GEO — every channel name, the count and the inventory delta are real DOM text
 * inside an <ol>/<figcaption>; the animation only moves opacity, transform and
 * pathLength on nodes that are already in the HTML.
 */

const CONNECTED_CHANNELS = 61;

type Node = { name: string; mark?: keyof typeof BRAND_MARKS; rest?: boolean };

const NODES: Node[] = [
  { name: "Booking.com", mark: "booking" },
  { name: "Airbnb", mark: "airbnb" },
  { name: "Expedia", mark: "expedia" },
  { name: "Despegar" },
  { name: `+${CONNECTED_CHANNELS - 4} canales más`, rest: true },
];

/** Stage geometry, in the SVG's own coordinate space. */
const STAGE_W = 560;
const STAGE_H = 330;
const HUB = { x: 215, y: 165 };
const ROW_Y = [42, 103, 165, 227, 289];
const CHIP_X = 352;
const CHIP_W = 190;
const CHIP_H = 40;

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

function Mark({ k }: { k: keyof typeof BRAND_MARKS }) {
  const m = BRAND_MARKS[k];
  if (!m) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 fill-current"
    >
      <path d={m.path} />
    </svg>
  );
}

export function OtaBroadcast({ active }: { active?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const reduce = useReducedMotion();
  // `active` lets the pinned story drive the beat; standalone use falls back to
  // the viewport. Reduced motion jumps straight to the finished state.
  const play = (active ?? inView) || !!reduce;

  const paths = ROW_Y.map(
    (y) => `M${HUB.x},${HUB.y} C${HUB.x + 62},${HUB.y} ${CHIP_X - 62},${y} ${CHIP_X},${y}`,
  );

  return (
    <figure ref={ref} className="w-full max-w-[560px]">
      {/* ——— Desktop / tablet: the fan ——— */}
      <div className="relative hidden aspect-[560/330] w-full sm:block">
        <svg
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="ota-ray" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.77 0.165 56)" />
              <stop offset="100%" stopColor="oklch(0.62 0.23 349)" />
            </linearGradient>
          </defs>
          {paths.map((d, i) => (
            <g key={i}>
              <path
                d={d}
                fill="none"
                stroke="oklch(1 0 0 / 0.10)"
                strokeWidth={1.5}
              />
              <motion.path
                d={d}
                fill="none"
                stroke="url(#ota-ray)"
                strokeWidth={1.75}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  play
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: reduce ? 0 : 0.55,
                  delay: reduce ? 0 : 0.25 + i * 0.11,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              {/* The packet itself, riding the ray outward. `offsetPath` moves
                  the dot along the exact same curve the ray draws, so the two
                  never disagree. Chrome/Safari/Firefox all support it on SVG;
                  where it is missing the dot simply sits at the hub, invisible
                  behind the card. */}
              {!reduce && (
                <motion.circle
                  r={3.2}
                  fill="#fff"
                  initial={{ opacity: 0, offsetDistance: "0%" }}
                  animate={
                    play
                      ? { opacity: [0, 1, 1, 0], offsetDistance: "100%" }
                      : { opacity: 0, offsetDistance: "0%" }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + i * 0.11,
                    ease: "easeInOut",
                    opacity: { times: [0, 0.12, 0.82, 1] },
                  }}
                  style={{ offsetPath: `path("${d}")`, offsetRotate: "0deg" }}
                />
              )}
            </g>
          ))}
        </svg>

        {/* Hub — the confirmed reservation */}
        <div
          className="absolute"
          style={{
            left: pct(24, STAGE_W),
            top: pct(120, STAGE_H),
            width: pct(191, STAGE_W),
            height: pct(90, STAGE_H),
          }}
        >
          <motion.div
            className="flex h-full flex-col justify-center rounded-2xl border border-white/[0.10] bg-[oklch(0.14_0.01_95)] px-3.5 py-3 shadow-[0_18px_50px_-24px_oklch(0_0_0/0.9)]"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={play ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.78_0.16_56)]">
              <Check className="h-3 w-3" aria-hidden /> Reserva directa
            </span>
            <p className="mt-1 text-[13px] font-bold text-white">
              Doble Superior
            </p>
            <p className="text-[11px] text-white/45">#A-2291 · vie 12 – dom 14</p>
          </motion.div>
          {/* Emitting pulse */}
          {!reduce && play && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-gradient"
              animate={{ scale: [1, 2.6, 1], opacity: [0.9, 0, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </div>

        {/* Channels */}
        <ol className="contents">
          {NODES.map((n, i) => (
            <motion.li
              key={n.name}
              className="absolute flex items-center"
              style={{
                left: pct(CHIP_X, STAGE_W),
                top: pct(ROW_Y[i] - CHIP_H / 2, STAGE_H),
                width: pct(CHIP_W, STAGE_W),
                height: pct(CHIP_H, STAGE_H),
              }}
              initial={{ opacity: 0.28, x: -8 }}
              animate={play ? { opacity: 1, x: 0 } : { opacity: 0.28, x: -8 }}
              transition={{
                duration: reduce ? 0 : 0.35,
                delay: reduce ? 0 : 0.7 + i * 0.11,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className={`flex h-full w-full items-center gap-2 rounded-xl border px-3 text-[12.5px] font-semibold ${
                  n.rest
                    ? "border-white/[0.08] bg-white/[0.02] text-white/55"
                    : "border-white/[0.10] bg-white/[0.045] text-white"
                }`}
              >
                {n.mark && <Mark k={n.mark} />}
                {n.rest && (
                  <Radio className="h-4 w-4 shrink-0 text-white/40" aria-hidden />
                )}
                <span className="min-w-0 truncate">{n.name}</span>
                <motion.span
                  className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[oklch(0.62_0.15_150)]"
                  initial={{ scale: 0 }}
                  animate={play ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 460,
                    damping: 22,
                    delay: reduce ? 0 : 0.86 + i * 0.11,
                  }}
                >
                  <Check className="h-2.5 w-2.5 text-white" aria-hidden />
                  <span className="sr-only">actualizado</span>
                </motion.span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* ——— Mobile: the same facts, stacked ——— */}
      <div className="sm:hidden">
        <div className="rounded-2xl border border-white/[0.10] bg-[oklch(0.14_0.01_95)] px-4 py-3.5">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.78_0.16_56)]">
            <Check className="h-3 w-3" aria-hidden /> Reserva directa
          </span>
          <p className="mt-1 text-sm font-bold text-white">Doble Superior</p>
          <p className="text-[12px] text-white/45">#A-2291 · vie 12 – dom 14</p>
        </div>
        <div
          aria-hidden
          className="mx-auto my-3 h-8 w-px bg-gradient-to-b from-[oklch(0.77_0.165_56)] to-transparent"
        />
        <ol className="grid grid-cols-2 gap-2">
          {NODES.map((n) => (
            <li
              key={n.name}
              className={`flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2.5 text-[12.5px] font-semibold ${
                n.rest
                  ? "col-span-2 justify-center text-white/55"
                  : "text-white"
              }`}
            >
              {n.mark && <Mark k={n.mark} />}
              <span className="min-w-0 truncate">{n.name}</span>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="mt-6 text-[13px] leading-relaxed text-white/50">
        <span className="font-semibold text-white">
          Doble Superior: 3 → 2 disponibles.
        </span>{" "}
        La habitación deja de venderse en los {CONNECTED_CHANNELS} canales
        conectados, en segundos. Sin overbooking, sin cerrar cupos a mano.
      </figcaption>
    </figure>
  );
}
