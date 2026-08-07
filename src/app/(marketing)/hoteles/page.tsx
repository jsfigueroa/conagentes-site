import type { Metadata } from "next";
import { HotelHero } from "@/components/marketing/hotel/hotel-hero";
import { HotelBody } from "@/components/marketing/hotel/hotel-body";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

const description =
  "Un agente IA que atiende por WhatsApp, reserva directo, sube el valor de cada estadía y recupera huéspedes — 24/7 en español, inglés y portugués. PMS incluido, factura DIAN y reporte SIRE. Para hoteles en Colombia.";

export const metadata: Metadata = {
  title: "conagentes para hoteles — El agente IA que llena su hotel",
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
    "check-in SIRE Colombia",
    "factura electrónica hotel DIAN",
  ],
  alternates: {
    canonical: "/hoteles",
    languages: { "es-CO": "/hoteles", "x-default": "/hoteles" },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: `${SITE_URL}/hoteles`,
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
      "@id": `${SITE_URL}/hoteles#service`,
      name: "Agente IA para hoteles",
      serviceType: "Automatización de hoteles con inteligencia artificial",
      description,
      url: `${SITE_URL}/hoteles`,
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
          "Reservas directas por WhatsApp, Instagram y OTAs",
          "Upsell y ancillaries (upgrades, late check-out, tours)",
          "Reactivación de huéspedes",
          "Recepción virtual 24/7",
          "PMS incluido o conexión con el existente",
          "Cobros en el chat y factura electrónica DIAN",
          "Reporte SIRE / TRA a Migración Colombia",
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
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Hoteles",
          item: `${SITE_URL}/hoteles`,
        },
      ],
    },
  ],
};

export default function HotelesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HotelHero />
      <HotelBody />
    </>
  );
}
