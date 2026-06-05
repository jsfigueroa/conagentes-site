"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Check } from "lucide-react";
import { ACTS, type StoryAct, type StorySceneId } from "@/components/marketing/story/story-script";
import { ChatScene } from "@/components/marketing/story/chat-scene";
import { OrderScene } from "@/components/marketing/story/order-scene";
import { DashboardScene } from "@/components/marketing/story/dashboard-scene";
import { IntelligenceScene } from "@/components/marketing/story/intelligence-scene";
import { CampaignScene } from "@/components/marketing/story/campaign-scene";

const SCENES: Record<
  StorySceneId,
  (props: { active: boolean }) => React.ReactElement
> = {
  chat: ChatScene,
  order: OrderScene,
  dashboard: DashboardScene,
  intelligence: IntelligenceScene,
  campaign: CampaignScene,
};

// Scroll height (in vh) allotted to each act inside the pinned stage. Lower =
// less scrolling to move between acts. Total pinned height = acts × this.
const SCROLL_VH_PER_ACT = 60;

function ActNarrative({ act }: { act: StoryAct }) {
  return (
    <div className="max-w-md">
      <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
        {act.eyebrow}
      </p>
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
        {act.title}{" "}
        <span className="bg-gradient-to-r from-[oklch(0.86_0.27_148)] to-[oklch(0.72_0.25_148)] bg-clip-text text-transparent">
          {act.highlight}
        </span>
      </h3>
      <p className="mt-5 text-base md:text-lg text-[oklch(0.62_0.005_95)] leading-relaxed">
        {act.body}
      </p>
      <ul className="mt-6 space-y-3">
        {act.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.86_0.27_148/0.15)]">
              <Check className="h-3 w-3 text-[oklch(0.86_0.27_148)]" />
            </span>
            <span className="text-sm text-[oklch(0.78_0.005_95)]">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Desktop: a single pinned stage; acts advance with scroll progress ── */
function PinnedStory() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(ACTS.length - 1, Math.max(0, Math.floor(v * ACTS.length)));
    setIndex(next);
  });

  const act = ACTS[index];
  const Scene = SCENES[act.id];
  // Alternate which side the mockup sits on, act by act.
  const reversed = index % 2 === 1;

  return (
    <div
      ref={outerRef}
      className="relative hidden lg:block"
      style={{ height: `${ACTS.length * SCROLL_VH_PER_ACT}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* progress dots */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {ACTS.map((a, i) => (
            <div
              key={a.id}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "h-8 w-1.5 bg-[oklch(0.86_0.27_148)]"
                  : "h-1.5 w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

        <div className="mx-auto grid h-full max-w-7xl grid-cols-2 content-center items-center gap-12 px-6 lg:px-16">
          {/* Narrative */}
          <div className={reversed ? "lg:order-2" : "lg:order-1"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${act.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ActNarrative act={act} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mockup */}
          <div
            className={`relative flex h-full items-center justify-center ${
              reversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`scene-${act.id}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Scene active />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: acts stacked; each plays when scrolled into view ── */
function MobileAct({ act }: { act: StoryAct }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, margin: "-10% 0px -10% 0px" });
  const Scene = SCENES[act.id];

  return (
    <div ref={ref} className="flex flex-col items-center gap-10 py-16">
      <div className="flex min-h-[560px] items-center justify-center">
        <Scene active={inView} />
      </div>
      <ActNarrative act={act} />
    </div>
  );
}

export function StorySection() {
  return (
    <section
      id="features"
      className="relative bg-[oklch(0.08_0.01_95)]"
    >
      {/* ambient glow — clipped in its own layer so it never becomes an
          overflow ancestor of the sticky stage (which would break sticky) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[oklch(0.86_0.27_148/0.05)] blur-[140px]" />
      </div>

      {/* intro kicker */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 text-center lg:pt-28">
        <p className="text-sm font-semibold text-neon uppercase tracking-widest mb-4">
          El recorrido de tu cliente
        </p>
        <h2 className="mx-auto max-w-2xl text-3xl md:text-5xl font-bold tracking-tight text-white">
          Una sola historia, de principio a fin
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[oklch(0.55_0.005_95)]">
          Mira cómo un mensaje de WhatsApp se convierte en una venta, en un
          cliente que vuelve y en tu próxima campaña.
        </p>
      </div>

      <PinnedStory />

      <div className="relative z-10 mx-auto max-w-md px-6 lg:hidden">
        {ACTS.map((act) => (
          <MobileAct key={act.id} act={act} />
        ))}
      </div>
    </section>
  );
}
