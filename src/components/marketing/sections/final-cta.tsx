"use client";

import { ScrollReveal } from "@/components/marketing/animation/scroll-reveal";
import { MagneticButton } from "@/components/marketing/animation/magnetic-button";
import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";

export function FinalCtaSection() {
  const { open } = useDemoForm();

  return (
    <section className="relative py-24 md:py-32 bg-[oklch(0.08_0.01_95)] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[oklch(0.74_0.185_50/0.08)] blur-[120px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.74 0.185 50) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.185 50) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Su competencia ya empezó.
            <br />
            <span className="text-neon">¿Y usted?</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mt-6 text-lg text-[oklch(0.55_0.005_95)] max-w-xl mx-auto">
            Del primer mensaje a la próxima recompra, su agente se encarga.
            Agende una demo y vea cómo funciona en su negocio.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton strength={0.2}>
              <button
                onClick={() => open("final-cta")}
                className="inline-flex items-center justify-center rounded-full bg-neon px-10 py-4 text-base font-semibold text-ink shadow-[0_0_30px_oklch(0.74_0.185_50/0.4)] hover:shadow-[0_0_50px_oklch(0.74_0.185_50/0.6)] transition-shadow cursor-pointer"
              >
                Solicitar demo gratis
              </button>
            </MagneticButton>
          </div>
          <p className="mt-4 text-sm text-[oklch(0.4_0.005_95)]">
            Sin compromiso · Le respondemos en menos de 24 horas
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
