import type { Metadata } from "next";
import { HotelHero } from "@/components/marketing/hotel/hotel-hero";
import { HotelBody } from "@/components/marketing/hotel/hotel-body";
import { MarketingFaqJsonLd } from "@/components/marketing/seo/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

const description =
  "Un agente IA que atiende por WhatsApp, reserva directo, sube el valor de cada estadía y recupera huéspedes — 24/7 y en 32 idiomas. PMS incluido, factura DIAN y registro de huéspedes TRA (reporte SIRE en camino). Para hoteles, aparta-hoteles y alquiler vacacional en Colombia.";

export const metadata: Metadata = {
  // No brand suffix here: the root layout's metadata template already appends
  // "| conagentes". The openGraph/twitter titles below are NOT templated, so
  // those keep the brand for shared links.
  title: "El agente IA que llena su hotel",
  description,
  keywords: [
    "software para hoteles Colombia",
    "agente IA para hoteles",
    "reservas directas WhatsApp",
    "chatbot para hoteles",
    "PMS para hoteles Colombia",
    "reducir comisión OTA",
    "upsell hotelero",
    "recepción virtual WhatsApp",
    "registro TRA hoteles Colombia",
    "reporte SIRE Migración Colombia hoteles",
    "factura electrónica hotel DIAN",
    "chatbot hotel multilingüe",
    "atender huéspedes extranjeros en su idioma",
    "agente IA para alquiler vacacional",
    "automatizar Airbnb con inteligencia artificial",
    "software para alojamientos turísticos Colombia",
    "software para aparta-hoteles",
  ],
  alternates: {
    canonical: "/",
    languages: { "es-CO": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "conagentes",
    title: "conagentes para hoteles — El agente IA que llena su hotel",
    description,
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "conagentes para hoteles — agente IA por WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "conagentes para hoteles — El agente IA que llena su hotel",
    description,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

const hotelJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service`,
      name: "Agente IA para hoteles",
      serviceType: "Automatización de hoteles con inteligencia artificial",
      description,
      url: SITE_URL,
      inLanguage: "es-CO",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: [
        { "@type": "Country", name: "Colombia" },
        { "@type": "Place", name: "Latinoamérica" },
      ],
      audience: { "@type": "BusinessAudience", name: "Hoteles" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Capacidades del agente IA para hoteles",
        itemListElement: [
          "Atención al huésped en 32 idiomas con detección automática del idioma",
          "Reservas directas por WhatsApp, Instagram y OTAs",
          "Upsell y ancillaries (upgrades, late check-out, tours)",
          "Reactivación de huéspedes",
          "Recepción virtual 24/7",
          "PMS incluido o conexión con el existente",
          "Cobros en el chat y factura electrónica DIAN",
          "Registro de huéspedes TRA (Registro Nacional de Turismo)",
          "Reporte SIRE de extranjeros a Migración Colombia (próximamente)",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "COP",
        url: `${SITE_URL}/hoteles/precios`,
        availability: "https://schema.org/InStock",
      },
    },
    // No BreadcrumbList: this IS the root now, so a breadcrumb would have a
    // single self-referential item. The /hoteles/* spokes keep their own.
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* The site FAQPage lives here: this page shows those questions. */}
      <MarketingFaqJsonLd />
      <HotelHero />
      <HotelBody />
    </>
  );
}
