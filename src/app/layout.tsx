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
    default: "conagentes — Agentes IA que venden por WhatsApp | Hoteles y pymes",
    template: "%s | conagentes",
  },
  description:
    "Agentes de IA que venden, atienden y hacen seguimiento por WhatsApp, Instagram y las OTAs para pymes y hoteles en Colombia y Latinoamérica. Reservas directas, upsell, cobros y factura DIAN — 24/7.",
  keywords: [
    "agente IA para hoteles",
    "automatizar hotel con inteligencia artificial",
    "agente de ventas IA WhatsApp",
    "reservas directas hotel IA",
    "chatbot IA hoteles Latinoamérica",
    "IA para pymes Colombia",
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
