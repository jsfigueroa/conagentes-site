"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/marketing/animation/magnetic-button";
import { FloatingElement } from "@/components/marketing/animation/floating-element";
import { HeroDemo } from "@/components/marketing/hero-demo/hero-demo";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[oklch(0.08_0.01_95)]">
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.86_0.27_148/0.08)] blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[oklch(0.72_0.25_148/0.05)] blur-[100px]" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative floating elements */}
      <FloatingElement
        className="absolute top-[15%] right-[10%] w-3 h-3 rounded-full bg-[oklch(0.86_0.27_148/0.4)] hidden lg:block"
        duration={5}
        distance={30}
      />
      <FloatingElement
        className="absolute bottom-[25%] left-[8%] w-2 h-2 rounded-full bg-[oklch(0.86_0.27_148/0.3)] hidden lg:block"
        duration={7}
        distance={20}
        delay={1}
      />
      <FloatingElement
        className="absolute top-[40%] left-[15%] w-4 h-4 rounded-sm bg-[oklch(0.86_0.27_148/0.15)] hidden lg:block"
        duration={8}
        distance={25}
        delay={2}
      />

      {/* Hero content: two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.86_0.27_148/0.3)] bg-[oklch(0.86_0.27_148/0.08)] px-4 py-1.5 text-sm font-medium text-[oklch(0.86_0.27_148)] mb-8">
                Asistente IA para WhatsApp
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Responde, vende y agenda
              <br />
              <span className="bg-gradient-to-r from-[oklch(0.86_0.27_148)] to-[oklch(0.72_0.25_148)] bg-clip-text text-transparent">
                mientras duermes
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-[oklch(0.6_0.005_95)] max-w-xl leading-relaxed"
            >
              El CRM con IA para WhatsApp que convierte cada mensaje en una
              oportunidad. Agente inteligente + pipeline de ventas + calendario
              — todo en uno.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton strength={0.2}>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full bg-neon px-8 py-4 text-base font-semibold text-ink shadow-[0_0_30px_oklch(0.86_0.27_148/0.3)] hover:shadow-[0_0_40px_oklch(0.86_0.27_148/0.5)] transition-shadow"
                >
                  Empezar gratis
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.12] px-8 py-4 text-base font-semibold text-white hover:bg-white/[0.05] transition-colors"
                >
                  Ver cómo funciona
                </a>
              </MagneticButton>
            </motion.div>

            {/* Friction reducer */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm text-[oklch(0.45_0.005_95)]"
            >
              Sin tarjeta de crédito · Listo en 5 minutos · Cancela cuando
              quieras
            </motion.p>
          </motion.div>

          {/* Right: Phone mockup with demo */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute -inset-8 bg-[oklch(0.86_0.27_148/0.06)] blur-[60px] rounded-full" />
                <div className="relative">
                  <HeroDemo />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Social proof strip */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 lg:mt-20 flex flex-col items-center gap-4"
        >
          <motion.p
            variants={itemVariants}
            className="text-xs font-medium text-[oklch(0.4_0.005_95)] uppercase tracking-widest"
          >
            Negocios en Colombia que confían en nosotros
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 opacity-40"
          >
            {[
              "Hotel Boutique",
              "Academia Lingua",
              "Clínica Vital",
              "Inmob. Habitat",
              "Restaurante Sabor",
            ].map((name) => (
              <span
                key={name}
                className="text-sm font-semibold text-white whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
