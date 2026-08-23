"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BedDouble, ShieldCheck } from "lucide-react";
import { MagneticButton } from "@/components/marketing/animation/magnetic-button";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";
import { GrainOverlay } from "@/components/marketing/hotel/grain-overlay";
import {
  HotelPhoneThread,
  useThreadAutoplay,
} from "@/components/marketing/hotel/hotel-phone";

const LINE1 = ["El", "agente", "IA"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};
const word = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 320, damping: 26 },
  },
};

function HeroPhone() {
  const reduce = useReducedMotion();
  const { count, typing } = useThreadAutoplay();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      <div className="absolute -inset-10 rounded-full bg-[oklch(0.74_0.185_50/0.10)] blur-[70px]" />
      <motion.div
        className="relative"
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <HotelPhoneThread count={count} typing={typing} />
      </motion.div>
    </motion.div>
  );
}

export function HotelHero() {
  const { open } = useDemoForm();

  return (
    <section className="relative overflow-hidden bg-[oklch(0.08_0.01_95)] pt-28 pb-20 md:pt-32 md:pb-28">
      {/* Atmosphere */}
      <motion.div
        aria-hidden
        className="absolute left-1/3 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[oklch(0.74_0.185_50/0.10)] blur-[140px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 right-1/4 h-[440px] w-[440px] rounded-full bg-[oklch(0.62_0.23_349/0.08)] blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <GrainOverlay opacity={0.06} />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: kinetic copy */}
        <motion.div initial="hidden" animate="show" variants={container}>
          <motion.span
            variants={word}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[oklch(0.74_0.185_50/0.3)] bg-[oklch(0.74_0.185_50/0.08)] px-4 py-1.5 text-sm font-medium text-[oklch(0.74_0.185_50)]"
          >
            <BedDouble className="h-4 w-4" /> Agente IA para hoteles y
            alojamientos
          </motion.span>

          <h1 className="text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">
              {LINE1.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className="mr-[0.22em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <motion.span variants={word} className="text-brand-gradient block">
              que llena su hotel.
            </motion.span>
          </h1>

          <motion.p
            variants={word}
            className="mt-6 max-w-lg text-lg leading-relaxed text-[oklch(0.65_0.005_95)]"
          >
            Atiende a cada huésped donde escriba —WhatsApp, Instagram y las OTAs—, reserva directo, sube el valor de
            cada estadía y recupera a los que se enfriaron — 24/7. Usted aprueba;
            un humano toma el control cuando hace falta.
          </motion.p>

          <motion.div variants={word} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <MagneticButton strength={0.2}>
              <button
                onClick={() => open("hotel-hero")}
                className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-base font-semibold text-ink shadow-[0_0_30px_oklch(0.74_0.185_50/0.35)] transition-shadow hover:shadow-[0_0_40px_oklch(0.74_0.185_50/0.55)] cursor-pointer"
              >
                Pruebe su agente IA
              </button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a
                href="#como-vende"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.14] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/[0.05]"
              >
                Ver cómo vende
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={word}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[oklch(0.6_0.005_95)]"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[oklch(0.74_0.185_50)]" /> Factura
              DIAN · Registro TRA
            </span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>Funciona con su PMS — o use el nuestro, gratis</span>
          </motion.div>
        </motion.div>

        {/* Right: live product demo */}
        <div className="flex justify-center lg:justify-end">
          <HeroPhone />
        </div>
      </div>
    </section>
  );
}
