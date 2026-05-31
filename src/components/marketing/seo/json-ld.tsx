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

export function MarketingJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "conagentes",
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    description:
      "Plataforma CRM con agentes de inteligencia artificial para pequeñas y medianas empresas en Colombia y Latinoamérica. Automatiza ventas, atención y agendamiento por WhatsApp con IA.",
    foundingDate: "2026",
    areaServed: {
      "@type": "Place",
      name: "Colombia y Latinoamérica",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: "Spanish",
    },
    sameAs: [
      "https://www.instagram.com/conagentes",
      "https://www.linkedin.com/company/conagentes",
    ],
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "conagentes",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "CRM con agentes de IA que responden por WhatsApp y Instagram, agendan citas, gestionan pipeline de ventas y procesan pagos automáticamente. Multi-industria: hoteles, educación, servicios.",
    featureList: [
      "Agente IA para WhatsApp e Instagram",
      "Pipeline de ventas visual (Kanban)",
      "Calendario y agendamiento automático",
      "Procesamiento de pagos (Wompi)",
      "Gestión de documentos",
      "Analítica de negocios en tiempo real",
      "Multi-industria: hoteles, educación, servicios",
      "Facturación electrónica DIAN",
      "Base de conocimiento con aprendizaje automático",
      "Módulo de escalamiento inteligente",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Inicio",
        price: "559000",
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
        description:
          "1 usuario, 1 WhatsApp, agente IA básico, 4,000 mensajes/mes",
      },
      {
        "@type": "Offer",
        name: "Crecimiento",
        price: "959000",
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
        description:
          "5 usuarios, WhatsApp + Instagram, agente IA avanzado, 10,000 mensajes/mes, pagos, calendario",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "conagentes",
    },
    inLanguage: "es",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "conagentes",
    url: SITE_URL,
    description:
      "CRM con agentes de inteligencia artificial para pymes en Colombia y Latinoamérica",
    inLanguage: "es-CO",
    publisher: {
      "@type": "Organization",
      name: "conagentes",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es conagentes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "conagentes es una plataforma CRM con agentes de inteligencia artificial que automatizan la atención al cliente por WhatsApp e Instagram. Los agentes responden mensajes, agendan citas, procesan pagos y gestionan el pipeline de ventas 24/7 sin intervención humana.",
        },
      },
      {
        "@type": "Question",
        name: "¿Para qué tipo de negocios sirve conagentes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "conagentes está diseñado para pequeñas y medianas empresas en Colombia y Latinoamérica. Es ideal para hoteles (gestión de reservas y huéspedes), instituciones educativas (admisiones y matrículas), y negocios de servicios (cotizaciones y agendamiento).",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo funciona el agente de IA por WhatsApp?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El agente de IA se conecta a tu número de WhatsApp Business y responde automáticamente a los mensajes de tus clientes. Puede responder preguntas frecuentes, enviar catálogos de productos, agendar citas en tu calendario, procesar pagos y escalar a un humano cuando es necesario.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto cuesta conagentes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El plan Inicio cuesta COP $559,000/mes (1 usuario, 4,000 mensajes). El plan Crecimiento cuesta COP $959,000/mes (5 usuarios, 10,000 mensajes, WhatsApp + Instagram, pagos). Hay 14 días de prueba gratuita sin tarjeta de crédito.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se integra con WhatsApp Business oficial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, conagentes se integra directamente con la API oficial de WhatsApp Business (Meta Cloud API). Tu número queda verificado con el sello verde y cumple con todas las políticas de Meta para mensajería empresarial.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={software} />
      <JsonLdScript data={website} />
      <JsonLdScript data={faq} />
    </>
  );
}
