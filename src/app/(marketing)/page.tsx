import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/sections/hero";
import { ValueOverviewSection } from "@/components/marketing/sections/value-overview";
import { StorySection } from "@/components/marketing/sections/story-section";
import { SpotlightsSection } from "@/components/marketing/sections/spotlights";
import { FeaturesBentoSection } from "@/components/marketing/sections/features-bento";
import { IndustriesSection } from "@/components/marketing/sections/industries";
import { HowItWorksSection } from "@/components/marketing/sections/how-it-works";
import { SocialProofSection } from "@/components/marketing/sections/social-proof";
import { PricingSection } from "@/components/marketing/sections/pricing";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export const metadata: Metadata = {
  title: "conagentes — Agentes IA que venden por WhatsApp | 24/7",
  description:
    "Agentes IA que atienden, venden, agendan y hacen seguimiento por WhatsApp — 24/7, sin contratar más gente. Para hoteles y pymes en Colombia y Latinoamérica.",
  keywords: [
    "agente IA WhatsApp",
    "agente de ventas con IA",
    "agentes IA para empresas",
    "chatbot WhatsApp empresas",
    "automatización de ventas Colombia",
    "agente IA para hoteles Colombia",
    "software de ventas con IA pymes",
    "WhatsApp Business automatización",
    "IA para atención al cliente Colombia",
    "agendamiento automático WhatsApp",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-CO": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "conagentes",
    title: "conagentes — Agentes IA que venden por WhatsApp",
    description:
      "Agentes IA que atienden, venden, agendan y hacen seguimiento por WhatsApp — 24/7. Para hoteles y pymes en Colombia.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "conagentes — agentes IA que venden por WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "conagentes — Agentes IA que venden por WhatsApp",
    description:
      "Agentes IA que venden por WhatsApp 24/7. Para hoteles y pymes en Colombia.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ValueOverviewSection />
      <StorySection />
      <SpotlightsSection />
      <FeaturesBentoSection />
      <IndustriesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCtaSection />
    </>
  );
}
