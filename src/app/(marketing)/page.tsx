import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/sections/hero";
import { ValueOverviewSection } from "@/components/marketing/sections/value-overview";
import { FeaturesBentoSection } from "@/components/marketing/sections/features-bento";
import { IndustriesSection } from "@/components/marketing/sections/industries";
import { HowItWorksSection } from "@/components/marketing/sections/how-it-works";
import { SocialProofSection } from "@/components/marketing/sections/social-proof";
import { PricingSection } from "@/components/marketing/sections/pricing";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

export const metadata: Metadata = {
  // `absolute` on purpose: the root layout's template appends "| conagentes",
  // and this title already carries the brand — without it the tag renders
  // "conagentes — … | conagentes".
  title: {
    absolute:
      "conagentes — El agente IA que llena su hotel o alojamiento",
  },
  description:
    "El agente IA para hoteles y alojamientos en Colombia: atiende por WhatsApp, Instagram y las OTAs, cierra reservas directas, sube el valor de cada estadía y cobra en el chat — 24/7, en 32 idiomas. PMS incluido y factura DIAN.",
  keywords: [
    "agente IA para hoteles",
    "agente IA para alquiler vacacional",
    "automatizar hotel con inteligencia artificial",
    "automatizar Airbnb con inteligencia artificial",
    "software para hoteles Colombia",
    "software para alojamientos turísticos Colombia",
    "reservas directas WhatsApp",
    "chatbot para hoteles",
    "PMS para hoteles Colombia",
    "recepción virtual WhatsApp",
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
    title: "conagentes — El agente IA que llena su hotel o alojamiento",
    description:
      "Atiende por WhatsApp, Instagram y las OTAs, cierra reservas directas, sube el valor de cada estadía y cobra en el chat — 24/7. Para hoteles y alojamientos en Colombia.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "conagentes — el agente IA para hoteles y alojamientos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "conagentes — El agente IA que llena su hotel o alojamiento",
    description:
      "Reservas directas, upsell y cobros por WhatsApp — 24/7. Para hoteles y alojamientos en Colombia.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

/**
 * The root is a ROUTER, not a second product page (CON-216).
 *
 * Hospedaje leads: the hero states the positioning, `IndustriesSection` sends
 * hoteliers into the deep /hoteles hub and gives every other industry one
 * honest door. The full hospedaje narrative lives at /hoteles — we do NOT
 * retell it here (site-architecture.md: describe a mechanism once, canonically).
 *
 * `StorySection` and `SpotlightsSection` are intentionally NOT mounted: both
 * hardcode a wholesale-distributor demo ("Surti Express", vasos desechables)
 * that contradicts a hospedaje hero. They remain available for the generic
 * /producto pages. To bring them back, rewrite their scripts for hospedaje
 * first — don't just re-add them.
 */
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ValueOverviewSection />
      <IndustriesSection />
      <FeaturesBentoSection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCtaSection />
    </>
  );
}
