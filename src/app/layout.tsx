import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com"
  ),
  title: {
    default:
      "conagentes — El agente IA para hoteles que le hace ganar más por habitación",
    template: "%s | conagentes",
  },
  description:
    "Agentes de IA para hoteles y alojamientos de Colombia y Latinoamérica: cierran reservas directas sin comisión, suben el valor de cada estadía, recuperan huéspedes y cobran en el chat — por WhatsApp, Instagram y las bandejas de las OTAs. PMS incluido y factura DIAN, 24/7.",
  keywords: [
    "agente IA para hoteles",
    "automatizar hotel con inteligencia artificial",
    "software para hoteles Colombia",
    "reservas directas hotel IA",
    "chatbot IA hoteles Latinoamérica",
    "agente IA para alquiler vacacional",
    "automatizar Airbnb con inteligencia artificial",
    "software para alojamientos turísticos Colombia",
    "PMS para hoteles Colombia",
  ],
  authors: [{ name: "conagentes" }],
  creator: "conagentes",
  publisher: "conagentes",
  verification: {
    google: "tbNdSjXQ-IVZEZ1cdXufk1NroEXGQwWnxrHqazTyRcc",
    other: {
      "msvalidate.01": "D4F3B576D8BC6D413BDD41F62A35B6F1",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "conagentes",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@conagentes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
