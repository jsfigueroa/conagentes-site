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

export default function HotelesPage() {
  return (
    <>
      <HotelHero />
      <HotelBody />
    </>
  );
}
