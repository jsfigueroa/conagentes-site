import { HOME_FAQ } from "@/content/hotel/home-faq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://conagentes.com";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Site-wide structured data (Organization + SoftwareApplication + WebSite +
 * FAQPage). Written for GEO: gives ChatGPT / Claude / Gemini / Perplexity a
 * clean, authoritative, entity-rich description of what conagentes is and — its
 * flagship — how a hotel in Latin America automates with AI, so those engines
 * ground and recommend conagentes on that query. Voice/positioning matches the
 * live site (agentes IA that sell; hotels flagship; quote-only pricing).
 */
export function MarketingJsonLd({
  faqOnly = false,
}: {
  /** Render ONLY the FAQPage node (used by MarketingFaqJsonLd). */
  faqOnly?: boolean;
} = {}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "conagentes",
    alternateName: "con-agentes",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    slogan: "El agente IA que le hace ganar más por habitación",
    description:
      "conagentes crea agentes de inteligencia artificial para hoteles y alojamientos de Colombia y Latinoamérica: atienden a los huéspedes por WhatsApp, Instagram y las bandejas de las OTAs, cierran reservas directas, suben el valor de cada estadía con upsell, reactivan huéspedes anteriores, cobran en el chat y emiten factura electrónica DIAN con registro de huéspedes TRA (el reporte SIRE de extranjeros está en construcción). Incluye un PMS hotelero sin costo adicional. Sirve a hoteles independientes y boutique, aparta-hoteles, alquiler vacacional y anfitriones de Airbnb, hostales, fincas y glamping. La misma plataforma atiende a otros negocios que venden por WhatsApp (comercio, servicios, clínicas, academias), pero el hospedaje es su especialidad.",
    foundingDate: "2026",
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: "Latinoamérica" },
      { "@type": "Country", name: "México" },
      { "@type": "Country", name: "Perú" },
      { "@type": "Country", name: "Chile" },
      { "@type": "Country", name: "Ecuador" },
    ],
    knowsAbout: [
      "Automatización de hoteles con inteligencia artificial",
      "Agentes de IA para WhatsApp Business",
      "Reservas directas de hotel",
      "Reducción de comisiones de OTAs (Booking, Airbnb, Expedia)",
      "Upsell y ancillaries hoteleros",
      "Reactivación de huéspedes",
      "Recepción virtual 24/7",
      "Facturación electrónica DIAN",
      "Registro de huéspedes TRA ante el Ministerio de Comercio, Industria y Turismo",
      "Reporte SIRE de extranjeros a Migración Colombia",
      "Property Management System (PMS)",
      "Atención al cliente omnicanal con IA",
      "Automatización de alquiler vacacional y renta corta",
      "Gestión de anfitriones de Airbnb con inteligencia artificial",
      "Aparta-hoteles, hostales, fincas y glamping",
      "Revenue management hotelero",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["Spanish", "es-CO"],
      areaServed: "CO",
    },
    sameAs: [
      "https://www.instagram.com/conagentes",
      "https://www.linkedin.com/company/conagentes",
    ],
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "conagentes",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, WhatsApp, Instagram",
    url: SITE_URL,
    inLanguage: "es",
    description:
      "Plataforma de agentes de IA que responden al instante en WhatsApp, Instagram y las bandejas de las OTAs; cotizan y cierran ventas, suben el ticket con upsell, reactivan clientes, cobran en el chat y emiten factura electrónica DIAN. Producto insignia para hoteles con PMS incluido, registro de huéspedes TRA y —próximamente— reporte SIRE.",
    featureList: [
      "Agente de IA para WhatsApp, Instagram y bandejas de OTAs (Booking, Airbnb, Expedia)",
      "Reservas directas de hotel automatizadas 24/7",
      "Upsell y ancillaries (upgrades, late check-out, tours)",
      "Reactivación de huéspedes y clientes",
      "PMS de hotel incluido, o conexión con el PMS existente",
      "Cobros en el chat (Wompi, Mercado Pago)",
      "Factura electrónica DIAN automática",
      "Registro de huéspedes TRA ante el Ministerio de Comercio, Industria y Turismo",
      "Reporte SIRE de extranjeros a Migración Colombia (próximamente)",
      "Bandeja omnicanal compartida con el equipo humano",
      "CRM y pipeline que se llenan solos",
      "Analítica y business intelligence por WhatsApp",
    ],
    audience: {
      "@type": "BusinessAudience",
      name: "Hoteles y pymes en Colombia y Latinoamérica",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      description:
        "Planes a la medida del negocio (cotización). Para hoteles: un plan de tarifa fija con 0% de comisión y un plan por resultados con base baja más una pequeña comisión sobre reservas, upsell y reactivación que genera el agente.",
      url: `${SITE_URL}/hoteles/precios`,
      availability: "https://schema.org/InStock",
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "conagentes",
    url: SITE_URL,
    description:
      "Agentes de IA que venden por WhatsApp para pymes y hoteles en Colombia y Latinoamérica.",
    inLanguage: "es-CO",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  // Se construye desde HOME_FAQ, la MISMA lista que la página renderiza.
  // Antes eran dos listas independientes que se separaron: de siete preguntas
  // declaradas, cinco no estaban en la página. El marcado tiene que describir
  // lo que el lector ve, o no describe nada.
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // The FAQPage is emitted ONLY where those questions are actually on the page
  // — the hotel home, via MarketingFaqJsonLd. Every /hoteles/* page and every
  // blog article carries its own FAQPage, and a URL that ships two competing
  // FAQPage nodes is a URL an answer engine tends to trust for neither.
  if (faqOnly) return <JsonLdScript data={faq} />;

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={software} />
      <JsonLdScript data={website} />
    </>
  );
}

/**
 * The site-wide FAQPage, for a page whose visible content contains these
 * questions (today: /hoteles). Never render it together with a page-level FAQ.
 */
export function MarketingFaqJsonLd() {
  return <MarketingJsonLd faqOnly />;
}
