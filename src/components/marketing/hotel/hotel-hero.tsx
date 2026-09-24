"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BedDouble, ShieldCheck } from "lucide-react";
import { MagneticButton } from "@/components/marketing/animation/magnetic-button";
import { TalkToAgentButton } from "@/components/marketing/voice-call/talk-to-agent-button";
import { ChannelOrbit } from "@/components/marketing/hotel/channel-orbit";
import { GrainOverlay } from "@/components/marketing/hotel/grain-overlay";
import {
  HotelPhoneThread,
  useThreadAutoplay,
} from "@/components/marketing/hotel/hotel-phone";

const LINE1 = ["El", "Sistema", "Operativo"];

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
      {/* Two offset blooms instead of one orange disc — the naranja/rosa pair
          is what makes the halo read as the brand rather than as a glow. */}
      <div className="absolute -inset-10 rounded-full bg-[oklch(0.74_0.185_50/0.10)] blur-[70px]" />
      <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-[oklch(0.62_0.23_349/0.14)] blur-[80px]" />
      <ChannelOrbit />
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
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[oklch(0.77_0.165_56/0.28)] bg-brand-tint-soft px-4 py-1.5 text-sm font-medium text-[oklch(0.82_0.13_50)]"
          >
            <BedDouble className="h-4 w-4" /> Agente IA para hoteles y
            alojamientos
          </motion.span>

          <h1 className="text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">
              {LINE1.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block">
                  {w}
                </motion.span>
              )).flatMap((el, i) => (i ? [" ", el] : [el]))}
            </span>{" "}
            {/* That space is load-bearing. Two sibling block spans with nothing
                between them concatenate in textContent — the H1 read as
                «El Sistema Operativocon IA para hoteles» to screen readers and
                to crawlers that walk text nodes, even though it looks right on
                screen. It renders as nothing (whitespace between two blocks
                collapses). */}
            <motion.span variants={word} className="text-brand-gradient block">
              con IA para hoteles
            </motion.span>
          </h1>

          <motion.p
            variants={word}
            className="mt-6 max-w-lg text-lg leading-relaxed text-[oklch(0.65_0.005_95)]"
          >
            No es un bot encima de su sistema. Es el sistema. Precios,
            operaciones y atención al huésped gestionados por agentes de IA que
            operan todo eso por WhatsApp, Instagram y por voz.
          </motion.p>

          {/* CON-260 / CON-298: ONE call to action. Reading about the agent is
              the slow path; hearing it answer is the demo — so the call is not
              one option among three, it is the only door on the hero. */}
          <motion.div variants={word} className="mt-9 flex flex-col items-start gap-4">
            <MagneticButton strength={0.2}>
              <TalkToAgentButton source="hotel-hero" variant="brand" />
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
