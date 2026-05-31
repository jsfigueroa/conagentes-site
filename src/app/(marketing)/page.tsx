import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/sections/hero";
import { PainPointsSection } from "@/components/marketing/sections/pain-points";
import { SolutionSection } from "@/components/marketing/sections/solution";
import { FeaturesBentoSection } from "@/components/marketing/sections/features-bento";
import { IndustriesSection } from "@/components/marketing/sections/industries";
import { HowItWorksSection } from "@/components/marketing/sections/how-it-works";
import { SocialProofSection } from "@/components/marketing/sections/social-proof";
import { PricingSection } from "@/components/marketing/sections/pricing";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export const metadata: Metadata = {
  title: "conagentes — CRM con IA para WhatsApp | Ventas automáticas 24/7",
  description:
    "Plataforma CRM con agentes de inteligencia artificial que responden por WhatsApp, agendan citas y gestionan tu pipeline de ventas. Para hoteles y pymes en Colombia y Latinoamérica.",
  keywords: [
    "CRM WhatsApp",
    "CRM con inteligencia artificial",
    "agente IA WhatsApp",
    "chatbot WhatsApp empresas",
    "automatización ventas Colombia",
    "CRM para hoteles Colombia",
    "CRM para pymes",
    "WhatsApp Business automatización",
    "software CRM Latinoamérica",
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
    title: "conagentes — CRM con IA para WhatsApp",
    description:
      "Agentes de IA que venden por WhatsApp, agendan citas y gestionan documentos 24/7. Para hoteles y pymes en Colombia.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "conagentes — CRM con agentes de IA para WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "conagentes — CRM con IA para WhatsApp",
    description:
      "Agentes de IA que venden por WhatsApp 24/7. Para hoteles y pymes en Colombia.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <SolutionSection />
      <FeaturesBentoSection />
      <IndustriesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCtaSection />
    </>
  );
}
