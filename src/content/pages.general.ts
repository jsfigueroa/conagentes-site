import type { MarketingPage } from "./pages.types";
import { DEFAULT_CTA } from "./pages.types";

/**
 * GENERAL experience (multi-industry brand). Voice: usted + "agente IA".
 * Hubs (producto, soluciones, recursos) + flagship spokes carry fuller
 * content; secondary spokes are lean but real.
 */
export const GENERAL_PAGES: MarketingPage[] = [
  /* ─────────────────────────── PRODUCTO (hub) ─────────────────────────── */
  {
    slug: "producto",
    experience: "general",
    eyebrow: "La plataforma",
    title: "Un agente IA que vende, atiende y hace seguimiento — solo",
    lede: "No es un chatbot que responde preguntas. Es un vendedor con IA que trabaja en todos sus canales, cierra ventas, cobra, factura y le rinde cuentas a usted.",
    meta: {
      title: "Producto — La plataforma de agentes IA de conagentes",
      description: "Agentes IA que venden por WhatsApp, Instagram y web: bandeja omnicanal, CRM que se llena solo, cobros con factura DIAN, agenda, campañas y analítica.",
    },
    sections: [
      {
        type: "steps",
        heading: "Cómo trabaja su agente",
        sub: "De un «hola» a una venta cobrada y facturada, sin que usted mueva un dedo.",
        items: [
          { title: "Atiende al instante", body: "Responde en segundos, a cualquier hora, en el canal donde el cliente escriba. Sin filas, sin «le respondemos mañana»." },
          { title: "Vende y sube el ticket", body: "Entiende qué necesita el cliente, recomienda, resuelve dudas y propone el complemento justo para subir el valor de cada compra." },
          { title: "Cobra y factura", body: "Manda el link de pago en el chat y emite la factura electrónica ante la DIAN, automáticamente." },
          { title: "Hace seguimiento", body: "Retoma al que no volvió, reactiva clientes dormidos y le avisa a usted cuando algo necesita su mano." },
        ],
      },
      {
        type: "features",
        heading: "Todo en una sola plataforma",
        sub: "Cada pieza describe una capacidad; entre a cada una para el detalle.",
        items: [
          { title: "Agentes IA", body: "El vendedor que nunca duerme: vende, recomienda y hace seguimiento.", href: "/producto/agentes-ia" },
          { title: "Bandeja omnicanal", body: "WhatsApp, Instagram y web en una sola bandeja compartida con su equipo.", href: "/producto/bandeja" },
          { title: "CRM y pipeline", body: "Cada conversación se vuelve un contacto y una oportunidad. Sin digitar nada.", href: "/producto/crm-pipeline" },
          { title: "Cobros + factura DIAN", body: "Link de pago en el chat y factura electrónica automática.", href: "/producto/cobros-facturacion" },
          { title: "Agenda y citas", body: "Agenda, confirma y recuerda citas sola.", href: "/producto/agenda" },
          { title: "Campañas y reactivación", body: "Reactiva clientes y lanza campañas por WhatsApp con permiso.", href: "/producto/campanas" },
          { title: "Analítica y BI", body: "Pregúntele a su negocio por WhatsApp: ventas, top productos, funnel.", href: "/producto/analitica-bi" },
          { title: "Seguridad y cumplimiento", body: "Datos aislados por negocio, Habeas Data y factura DIAN al día.", href: "/producto/seguridad" },
        ],
      },
      {
        type: "stats",
        items: [
          { value: "24/7", label: "atendiendo, en todos los canales" },
          { value: "< 5 s", label: "para la primera respuesta" },
          { value: "0", label: "conversaciones sin contestar" },
        ],
      },
      {
        type: "faq",
        items: [
          { q: "¿Reemplaza a mi equipo?", a: "No. Le quita el trabajo repetitivo y le pasa a su equipo lo que necesita un humano. Usted decide qué hace solo y qué requiere su visto bueno." },
          { q: "¿Sirve para mi negocio?", a: "Sí. La plataforma se adapta a su sector: comercio, servicios, clínicas, educación y —nuestro producto insignia— hoteles." },
          { q: "¿Cuánto tarda en arrancar?", a: "Lo configuramos con usted en días, no meses. Entrena con su catálogo, sus precios y su forma de vender." },
        ],
      },
    ],
    related: [
      { label: "Ver soluciones por industria", href: "/soluciones" },
      { label: "conagentes para hoteles", href: "/hoteles" },
      { label: "Integraciones", href: "/integraciones" },
    ],
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────────── PRODUCTO spokes ────────────────────────── */
  {
    slug: "producto/agentes-ia",
    experience: "general",
    eyebrow: "Producto",
    title: "El agente IA: su mejor vendedor, trabajando sin parar",
    lede: "Vende, recomienda, resuelve dudas y hace seguimiento como su vendedor estrella — solo que atiende a todos los clientes a la vez, a toda hora.",
    meta: {
      title: "Agentes IA que venden",
      description: "Un vendedor con IA que atiende, recomienda, sube el ticket y hace seguimiento por WhatsApp, Instagram y web. Usted manda, él ejecuta.",
    },
    sections: [
      {
        type: "steps",
        heading: "Qué hace, exactamente",
        items: [
          { title: "Entiende lo que el cliente quiere", body: "Lee la intención real detrás del mensaje y responde con su catálogo y sus precios, nunca con inventos." },
          { title: "Recomienda y sube el ticket", body: "Propone el producto o el complemento que de verdad encaja, con criterio de vendedor." },
          { title: "Cierra y cobra", body: "Arma el pedido, manda el link de pago y confirma la venta en el mismo chat." },
          { title: "Le rinde cuentas a usted", body: "Cada acción queda registrada y explicada: qué hizo y por qué. Usted puede corregir en cualquier momento." },
        ],
      },
      {
        type: "prose",
        heading: "Usted manda. Él ejecuta.",
        body: [
          "Usted define el tono, los límites y qué decisiones puede tomar solo. El agente trabaja dentro de esas reglas y escala a un humano cuando toca.",
          "Nada de respuestas robóticas ni promesas que su negocio no puede cumplir: responde con la información real de su operación.",
        ],
      },
    ],
    related: [
      { label: "Bandeja omnicanal", href: "/producto/bandeja" },
      { label: "Cobros + factura DIAN", href: "/producto/cobros-facturacion" },
      { label: "Vender más", href: "/soluciones/mas-ventas" },
    ],
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/bandeja",
    experience: "general",
    eyebrow: "Producto",
    title: "Una sola bandeja para WhatsApp, Instagram y web",
    lede: "Todas sus conversaciones en un solo lugar, compartidas con su equipo. El agente atiende; su gente entra cuando quiere, sin perder el hilo.",
    meta: {
      title: "Bandeja omnicanal",
      description: "WhatsApp, Instagram y webchat en una bandeja compartida. El agente IA atiende y su equipo toma el control cuando hace falta.",
    },
    sections: [
      {
        type: "features",
        heading: "Pensada para trabajar en equipo",
        items: [
          { title: "Todo en un lugar", body: "Deje de saltar entre apps: cada canal llega a la misma bandeja." },
          { title: "Traspaso sin fricción", body: "El agente responde solo y le pasa la conversación a un humano con un clic. Y usted se la devuelve a la IA igual de fácil." },
          { title: "Contexto completo", body: "Quién es el cliente, qué compró y qué habló, siempre a la vista." },
          { title: "Etiquetas y equipos", body: "Organice por prioridad, área o responsable. Asignación automática opcional." },
        ],
      },
    ],
    related: [
      { label: "Agentes IA", href: "/producto/agentes-ia" },
      { label: "Canal: WhatsApp", href: "/producto/canales/whatsapp" },
      { label: "Atención 24/7", href: "/soluciones/atencion-24-7" },
    ],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/crm-pipeline",
    experience: "general",
    eyebrow: "Producto",
    title: "Un CRM que se llena solo",
    lede: "Cada conversación se convierte en un contacto y una oportunidad en su pipeline. Cero digitación, cero clientes que se pierden en el olvido.",
    meta: {
      title: "CRM y pipeline",
      description: "El agente convierte cada chat en un contacto y una oportunidad de venta. Pipeline visual, sin digitar nada.",
    },
    sections: [
      {
        type: "features",
        heading: "El seguimiento deja de depender de la memoria",
        items: [
          { title: "Se llena solo", body: "El agente crea y actualiza el contacto con cada conversación." },
          { title: "Pipeline visual", body: "Vea en qué etapa está cada oportunidad y qué falta para cerrar." },
          { title: "Nada se enfría", body: "El agente retoma al que no respondió, en el momento oportuno." },
          { title: "Lead calificado, a su correo", body: "Cuando alguien muestra intención real de comprar, usted se entera al instante." },
        ],
      },
    ],
    related: [
      { label: "Campañas y reactivación", href: "/producto/campanas" },
      { label: "Recuperar clientes", href: "/soluciones/reactivacion" },
    ],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/cobros-facturacion",
    experience: "general",
    eyebrow: "Producto",
    title: "Cobra en el chat y factura ante la DIAN — solo",
    lede: "El agente arma el pedido, manda el link de pago y emite la factura electrónica automáticamente. Sin salir de la conversación.",
    meta: {
      title: "Cobros y factura electrónica DIAN",
      description: "Link de pago en el chat (Wompi / Mercado Pago) y factura electrónica automática ante la DIAN. Cobro y cumplimiento, en un solo flujo.",
    },
    sections: [
      {
        type: "steps",
        heading: "Del pedido a la factura, sin fricción",
        items: [
          { title: "Cobra donde está el cliente", body: "Link de pago en el mismo chat, con la pasarela de su preferencia (Wompi o Mercado Pago)." },
          { title: "Confirma el pago solo", body: "El agente detecta el pago y confirma la venta al instante." },
          { title: "Factura ante la DIAN", body: "Emite la factura electrónica automáticamente y la entrega en PDF. Consumidor final por defecto; a nombre del cliente si lo pide." },
        ],
      },
    ],
    related: [
      { label: "Cobros y facturación (solución)", href: "/soluciones/cobros" },
      { label: "Integraciones", href: "/integraciones" },
    ],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/agenda",
    experience: "general",
    eyebrow: "Producto",
    title: "Agenda, confirma y recuerda citas sola",
    lede: "Para servicios y clínicas: el agente ofrece los horarios disponibles, agenda, confirma y recuerda — y llena su calendario sin llamadas.",
    meta: {
      title: "Agenda y citas",
      description: "El agente IA agenda, confirma y recuerda citas por WhatsApp. Menos ausencias, agenda llena, sin llamadas.",
    },
    sections: [
      {
        type: "features",
        heading: "Menos ausencias, agenda llena",
        items: [
          { title: "Agenda 24/7", body: "El cliente reserva cuando quiere, sin esperar a que abra." },
          { title: "Recordatorios automáticos", body: "Menos citas perdidas gracias a confirmaciones y recordatorios." },
          { title: "Reprograma solo", body: "Si el cliente no puede, el agente reubica la cita sin fricción." },
        ],
      },
    ],
    related: [
      { label: "Servicios y clínicas", href: "/soluciones/servicios" },
      { label: "Atención 24/7", href: "/soluciones/atencion-24-7" },
    ],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/campanas",
    experience: "general",
    eyebrow: "Producto",
    title: "Campañas y reactivación por WhatsApp",
    lede: "Reactive clientes dormidos y lance campañas con permiso, sin quemar su número. El agente hace el seguimiento uno a uno.",
    meta: {
      title: "Campañas y reactivación",
      description: "Reactivación de clientes y campañas por WhatsApp con buenas prácticas anti-bloqueo. Seguimiento uno a uno, no envíos masivos ciegos.",
    },
    sections: [
      {
        type: "features",
        heading: "Venderle otra vez a quien ya le compró",
        items: [
          { title: "Reactivación inteligente", body: "El agente detecta quién lleva tiempo sin comprar y lo retoma con un mensaje que sí encaja." },
          { title: "Campañas con permiso", body: "Plantillas aprobadas y buenas prácticas para cuidar su número." },
          { title: "Conversación, no spam", body: "Cada mensaje abre una conversación real que el agente atiende y cierra." },
        ],
      },
    ],
    related: [
      { label: "Recuperar clientes", href: "/soluciones/reactivacion" },
      { label: "CRM y pipeline", href: "/producto/crm-pipeline" },
    ],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/analitica-bi",
    experience: "general",
    eyebrow: "Producto",
    title: "Pregúntele a su negocio por WhatsApp",
    lede: "«¿Cómo vamos hoy?» y el agente le responde con ventas, productos top, funnel y alertas. Business intelligence sin abrir un tablero.",
    meta: {
      title: "Analítica y BI",
      description: "Business intelligence conversacional: pregunte por WhatsApp cómo va su negocio y reciba ventas, top productos y funnel al instante.",
    },
    sections: [
      {
        type: "features",
        heading: "Los números claros, sin ser experto",
        items: [
          { title: "BI por chat", body: "Pregunte en español y reciba la respuesta al instante, con contexto." },
          { title: "Alertas que importan", body: "El agente le avisa de un lead caliente, una caída o una oportunidad." },
          { title: "Tablero cuando lo quiera", body: "Y si prefiere verlo, tiene el panel completo en el dashboard." },
        ],
      },
    ],
    related: [
      { label: "BI para dueños", href: "/soluciones/bi" },
      { label: "CRM y pipeline", href: "/producto/crm-pipeline" },
    ],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/seguridad",
    experience: "general",
    eyebrow: "Producto",
    title: "Seguridad y cumplimiento, sin letra menuda",
    lede: "Sus datos aislados por negocio, tratamiento de datos conforme a la Ley 1581 (Habeas Data) y factura electrónica al día con la DIAN.",
    meta: {
      title: "Seguridad y cumplimiento",
      description: "Aislamiento de datos por negocio, cumplimiento de Habeas Data (Ley 1581) y factura electrónica DIAN. Seguridad desde el diseño.",
    },
    sections: [
      {
        type: "features",
        heading: "Diseñado para operar en Colombia",
        items: [
          { title: "Datos aislados", body: "La información de cada negocio queda separada y protegida." },
          { title: "Habeas Data", body: "Manejo de datos personales conforme a la Ley 1581." },
          { title: "Factura DIAN al día", body: "Facturación electrónica válida y trazable." },
          { title: "Usted controla al agente", body: "Reglas, límites y trazabilidad de cada acción que toma la IA." },
        ],
      },
    ],
    related: [{ label: "Cobros + factura DIAN", href: "/producto/cobros-facturacion" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────── PRODUCTO / canales ─────────────────────────── */
  {
    slug: "producto/canales/whatsapp",
    experience: "general",
    eyebrow: "Canal",
    title: "Su agente IA en WhatsApp",
    lede: "Donde de verdad le escriben sus clientes en Colombia. El agente atiende, vende y cobra en el canal número uno del país.",
    meta: {
      title: "Agente IA para WhatsApp",
      description: "Venda por WhatsApp con un agente IA que atiende al instante, recomienda, cobra y factura. El canal donde están sus clientes.",
    },
    sections: [
      {
        type: "features",
        heading: "El canal donde se cierra la venta",
        items: [
          { title: "Respuesta inmediata", body: "Nadie espera. El agente contesta en segundos, a toda hora." },
          { title: "Vende y cobra ahí mismo", body: "Catálogo, pedido, link de pago y factura, sin salir del chat." },
          { title: "Su número, cuidado", body: "Buenas prácticas y plantillas aprobadas para evitar bloqueos." },
        ],
      },
    ],
    related: [
      { label: "Bandeja omnicanal", href: "/producto/bandeja" },
      { label: "Instagram", href: "/producto/canales/instagram" },
    ],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/canales/instagram",
    experience: "general",
    eyebrow: "Canal",
    title: "Su agente IA en Instagram",
    lede: "Responde DMs y comentarios, convierte seguidores en clientes y no deja ni un mensaje sin contestar.",
    meta: {
      title: "Agente IA para Instagram",
      description: "El agente responde DMs de Instagram, atiende y vende. Convierta seguidores en ventas sin dejar mensajes sin responder.",
    },
    sections: [
      {
        type: "features",
        heading: "De seguidor a cliente",
        items: [
          { title: "DMs atendidos al instante", body: "Cada mensaje directo recibe respuesta, con su catálogo y sus precios." },
          { title: "Una sola bandeja", body: "Instagram y WhatsApp juntos, sin cambiar de app." },
        ],
      },
    ],
    related: [{ label: "Bandeja omnicanal", href: "/producto/bandeja" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/canales/voz",
    experience: "general",
    eyebrow: "Canal · En piloto",
    title: "Su agente IA que contesta el teléfono",
    lede: "Atiende llamadas con voz natural en español, resuelve, agenda y toma pedidos. Está en piloto: lo estamos activando con los primeros clientes.",
    meta: {
      title: "Agente IA de voz",
      description: "Un agente IA que contesta llamadas con voz natural en español colombiano: atiende, agenda y toma pedidos. En piloto — activándose con los primeros clientes.",
    },
    sections: [
      {
        type: "features",
        heading: "El teléfono que siempre contesta",
        items: [
          { title: "Voz natural en es-CO", body: "Conversación fluida, no un menú de opciones." },
          { title: "Resuelve y agenda", body: "Responde dudas, agenda citas y toma pedidos por teléfono." },
          { title: "En piloto", body: "Construido y activándose con los primeros clientes. Escríbanos si quiere entrar al piloto." },
        ],
      },
    ],
    related: [{ label: "Agenda y citas", href: "/producto/agenda" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "producto/canales/webchat",
    experience: "general",
    eyebrow: "Canal",
    title: "Su agente IA en su página web",
    lede: "Convierte visitas en conversaciones: atiende en su sitio y continúa por WhatsApp sin perder el hilo.",
    meta: {
      title: "Webchat con agente IA",
      description: "Un agente IA en su web que atiende visitas y las convierte en ventas, con continuidad hacia WhatsApp.",
    },
    sections: [
      {
        type: "features",
        heading: "Que la visita no se vaya en blanco",
        items: [
          { title: "Atiende en su sitio", body: "Responde dudas y guía la compra en tiempo real." },
          { title: "Continuidad total", body: "La conversación sigue por WhatsApp, con todo el contexto." },
        ],
      },
    ],
    related: [{ label: "Bandeja omnicanal", href: "/producto/bandeja" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────────── INTEGRACIONES ──────────────────────────── */
  {
    slug: "integraciones",
    experience: "general",
    eyebrow: "Integraciones",
    title: "Se conecta con lo que ya usa",
    lede: "Pasarelas de pago, facturación electrónica, e-commerce y más. El agente trabaja sobre sus herramientas, no le impone otras nuevas.",
    meta: {
      title: "Integraciones",
      description: "Wompi, Mercado Pago, Alegra, Siigo, Shopify y más. El agente IA se conecta con las herramientas que ya usa su negocio.",
    },
    sections: [
      {
        type: "features",
        heading: "El ecosistema de su negocio",
        items: [
          { title: "Pagos", body: "Wompi y Mercado Pago para cobrar en el chat, en COP." },
          { title: "Facturación DIAN", body: "Alegra y Siigo para factura electrónica válida." },
          { title: "E-commerce", body: "Shopify y más: su catálogo, sincronizado." },
          { title: "WhatsApp e Instagram", body: "Canales oficiales de Meta, multi-número." },
        ],
      },
      {
        type: "prose",
        heading: "¿Le falta una integración?",
        body: ["Cuéntenos qué usa. Estamos ampliando el catálogo de conectores constantemente y priorizamos según lo que necesitan los negocios en Colombia."],
      },
    ],
    related: [
      { label: "Cobros + factura DIAN", href: "/producto/cobros-facturacion" },
      { label: "Integraciones para hoteles", href: "/hoteles/integraciones" },
    ],
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────────── SOLUCIONES (hub) ───────────────────────── */
  {
    slug: "soluciones",
    experience: "general",
    eyebrow: "Soluciones",
    title: "Un agente IA, a la medida de su negocio",
    lede: "Mismo motor, distinta forma de vender. Encuentre su industria o el objetivo que quiere alcanzar.",
    meta: {
      title: "Soluciones",
      description: "Agentes IA por industria (comercio, servicios, educación, hoteles) y por objetivo (vender más, upsell, reactivación, cobros, 24/7, BI).",
    },
    sections: [
      {
        type: "features",
        heading: "Por industria",
        items: [
          { title: "Hoteles — insignia", body: "Reservas directas, upsell y recepción 24/7. Nuestro producto más profundo.", href: "/hoteles" },
          { title: "Comercio y distribución", body: "Catálogo, pedidos y cobros por WhatsApp.", href: "/soluciones/comercio" },
          { title: "Servicios y clínicas", body: "Agenda, confirma y recuerda citas sola.", href: "/soluciones/servicios" },
          { title: "Educación", body: "Atrae, orienta y matricula estudiantes.", href: "/soluciones/educacion" },
          { title: "Su sector", body: "¿No lo ve en la lista? Hablemos.", href: "/soluciones/tu-sector" },
        ],
      },
      {
        type: "features",
        heading: "Por objetivo",
        items: [
          { title: "Vender más", body: "Que ninguna oportunidad se enfríe.", href: "/soluciones/mas-ventas" },
          { title: "Subir el ticket (upsell)", body: "El complemento justo en cada venta.", href: "/soluciones/upsell" },
          { title: "Recuperar clientes", body: "Reactive a quien ya le compró.", href: "/soluciones/reactivacion" },
          { title: "Cobros y facturación", body: "Cobrar y facturar sin fricción.", href: "/soluciones/cobros" },
          { title: "Atención 24/7", body: "Cero mensajes sin responder.", href: "/soluciones/atencion-24-7" },
          { title: "BI para dueños", body: "Los números claros, por WhatsApp.", href: "/soluciones/bi" },
        ],
      },
    ],
    related: [{ label: "Ver la plataforma", href: "/producto" }],
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────── SOLUCIONES — industrias ────────────────────── */
  {
    slug: "soluciones/comercio",
    experience: "general",
    eyebrow: "Industria",
    title: "Un agente IA para comercio y distribución",
    lede: "Muestra el catálogo, arma el pedido, cobra y factura por WhatsApp. Sus clientes compran sin esperar y sin llamar.",
    meta: {
      title: "Agente IA para comercio y distribución",
      description: "Venda por WhatsApp: catálogo, pedidos consolidados, cobro y factura DIAN automáticos. Ideal para comercio y distribución en Colombia.",
    },
    sections: [
      {
        type: "prose",
        heading: "El problema",
        body: ["Su equipo no da abasto para responderle a todos los que escriben. Cada mensaje sin contestar es un pedido que se va con la competencia."],
      },
      {
        type: "features",
        heading: "Lo que resuelve el agente",
        items: [
          { title: "Catálogo vivo", body: "Muestra productos, precios y fotos según lo que pide el cliente.", href: "/producto/agentes-ia" },
          { title: "Pedidos consolidados", body: "Arma, modifica y confirma el pedido en la conversación." },
          { title: "Cobro y factura", body: "Link de pago y factura DIAN, automáticos.", href: "/producto/cobros-facturacion" },
        ],
      },
    ],
    related: [
      { label: "Vender más", href: "/soluciones/mas-ventas" },
      { label: "Subir el ticket", href: "/soluciones/upsell" },
    ],
    cta: DEFAULT_CTA,
  },
  {
    slug: "soluciones/servicios",
    experience: "general",
    eyebrow: "Industria",
    title: "Un agente IA para servicios y clínicas",
    lede: "Agenda, confirma y recuerda citas sola. Llena su calendario y reduce las ausencias, sin que su recepción viva pegada al teléfono.",
    meta: {
      title: "Agente IA para servicios y clínicas",
      description: "Agende citas por WhatsApp con un agente IA: agenda 24/7, recordatorios y reprogramación automática. Menos ausencias, agenda llena.",
    },
    sections: [
      {
        type: "prose",
        heading: "El problema",
        body: ["Las citas se agendan por teléfono en horario de oficina, se olvidan y generan ausencias. Cada silla vacía es plata que no vuelve."],
      },
      {
        type: "features",
        heading: "Lo que resuelve el agente",
        items: [
          { title: "Agenda 24/7", body: "El cliente reserva cuando quiere.", href: "/producto/agenda" },
          { title: "Recordatorios", body: "Menos ausencias con confirmaciones automáticas." },
          { title: "Reprograma solo", body: "Reubica citas sin fricción." },
        ],
      },
    ],
    related: [{ label: "Agenda y citas", href: "/producto/agenda" }],
    cta: DEFAULT_CTA,
  },
  {
    slug: "soluciones/educacion",
    experience: "general",
    eyebrow: "Industria",
    title: "Un agente IA para educación",
    lede: "Atrae, orienta y acompaña a cada aspirante hasta la matrícula. Resuelve dudas de programas, requisitos y fechas, y no deja a nadie esperando.",
    meta: {
      title: "Agente IA para educación",
      description: "Oriente y matricule aspirantes por WhatsApp: programas, requisitos, fechas y documentos, con seguimiento hasta la matrícula.",
    },
    sections: [
      {
        type: "prose",
        heading: "El problema",
        body: ["El aspirante pregunta a varias instituciones a la vez. La que responde primero y mejor se lleva la matrícula. Su equipo de admisiones no puede estar disponible siempre."],
      },
      {
        type: "features",
        heading: "Lo que resuelve el agente",
        items: [
          { title: "Orienta como asesor", body: "Recomienda el programa según el perfil, no dispara folletos." },
          { title: "Acompaña hasta matricular", body: "Requisitos, documentos y fechas, con seguimiento." },
          { title: "Avisa al equipo", body: "Escala a admisiones cuando hay intención real." },
        ],
      },
    ],
    related: [{ label: "Recuperar clientes", href: "/soluciones/reactivacion" }],
    cta: DEFAULT_CTA,
  },
  {
    slug: "soluciones/tu-sector",
    experience: "general",
    eyebrow: "Industria",
    title: "¿No ve su sector? Hablemos",
    lede: "El mismo agente IA se adapta a su forma de vender. Si atiende clientes por WhatsApp, tenemos algo para usted.",
    meta: {
      title: "Agente IA para su sector",
      description: "¿Su industria no está en la lista? El agente IA de conagentes se adapta a su negocio. Cuéntenos cómo vende y le mostramos cómo encaja.",
    },
    sections: [
      {
        type: "prose",
        heading: "Se adapta a usted",
        body: ["No importa el sector: si su negocio vende y atiende por WhatsApp, Instagram o teléfono, el agente aprende su catálogo, sus precios y su forma de vender.", "Cuéntenos su caso en una demo y le mostramos exactamente cómo trabajaría para usted."],
      },
    ],
    related: [{ label: "Ver la plataforma", href: "/producto" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────── SOLUCIONES — objetivos ─────────────────────── */
  {
    slug: "soluciones/mas-ventas",
    experience: "general",
    eyebrow: "Objetivo",
    title: "Vender más, sin contratar más",
    lede: "El problema no es que le falten clientes: es que no alcanza a atenderlos a todos, rápido y bien. El agente sí.",
    meta: {
      title: "Vender más con un agente IA",
      description: "Atienda a todos sus clientes al instante y no deje enfriar ninguna oportunidad. Más ventas sin ampliar el equipo.",
    },
    sections: [
      {
        type: "stats",
        items: [
          { value: "0", label: "mensajes sin responder" },
          { value: "24/7", label: "vendiendo, también de noche y festivos" },
          { value: "+", label: "conversión: nadie espera para comprar" },
        ],
      },
      {
        type: "features",
        heading: "Cómo aumenta sus ventas",
        items: [
          { title: "Responde primero", body: "El que responde primero, vende. El agente contesta en segundos.", href: "/producto/agentes-ia" },
          { title: "No deja enfriar", body: "Hace seguimiento al que no cerró.", href: "/producto/crm-pipeline" },
          { title: "Sube el ticket", body: "Recomienda el complemento justo.", href: "/soluciones/upsell" },
        ],
      },
    ],
    related: [{ label: "Recuperar clientes", href: "/soluciones/reactivacion" }],
    cta: DEFAULT_CTA,
  },
  {
    slug: "soluciones/upsell",
    experience: "general",
    eyebrow: "Objetivo",
    title: "Suba el ticket de cada venta",
    lede: "Con criterio de vendedor, el agente propone el complemento o la mejor opción en el momento justo. Más valor por cliente, sin presionar.",
    meta: {
      title: "Upsell con IA",
      description: "El agente IA recomienda el complemento justo en cada venta y sube el ticket promedio, con criterio de vendedor y sin presionar.",
    },
    sections: [
      {
        type: "features",
        heading: "El complemento justo, en el momento justo",
        items: [
          { title: "Entiende el contexto", body: "Recomienda según lo que el cliente ya está comprando." },
          { title: "Sin sonar a robot", body: "Sugiere como lo haría su mejor vendedor." },
          { title: "Mide el impacto", body: "Vea cuánto suma el upsell a sus ventas." },
        ],
      },
    ],
    related: [
      { label: "Vender más", href: "/soluciones/mas-ventas" },
      { label: "Upsell para hoteles", href: "/hoteles/upsell" },
    ],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "soluciones/reactivacion",
    experience: "general",
    eyebrow: "Objetivo",
    title: "Recupere a los clientes que ya tiene",
    lede: "Venderle a quien ya le compró es más fácil y más barato que conseguir a alguien nuevo. El agente reactiva a los dormidos, uno a uno.",
    meta: {
      title: "Reactivación de clientes con IA",
      description: "El agente IA detecta clientes dormidos y los reactiva con un mensaje que sí encaja. Más ventas de su base actual.",
    },
    sections: [
      {
        type: "features",
        heading: "Su base de datos vale plata",
        items: [
          { title: "Detecta al dormido", body: "Sabe quién lleva tiempo sin comprar y por qué reactivarlo." },
          { title: "Retoma con criterio", body: "Un mensaje relevante, no un spam genérico." },
          { title: "Convierte la conversación", body: "Abre el chat y lo lleva de nuevo a la compra." },
        ],
      },
    ],
    related: [{ label: "Campañas y reactivación", href: "/producto/campanas" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "soluciones/cobros",
    experience: "general",
    eyebrow: "Objetivo",
    title: "Cobre y facture sin fricción",
    lede: "El agente manda el link de pago y emite la factura DIAN en el chat. Menos pasos, menos pagos que se caen.",
    meta: {
      title: "Cobros y facturación con IA",
      description: "Cobre en el chat con Wompi o Mercado Pago y facture ante la DIAN automáticamente. Menos fricción, menos ventas que se caen.",
    },
    sections: [
      {
        type: "features",
        heading: "Del sí al pagado, sin vueltas",
        items: [
          { title: "Cobra en el chat", body: "Link de pago donde está el cliente.", href: "/producto/cobros-facturacion" },
          { title: "Factura sola", body: "Factura electrónica DIAN, automática." },
          { title: "Confirma el pago", body: "El agente detecta el pago y cierra la venta." },
        ],
      },
    ],
    related: [{ label: "Integraciones", href: "/integraciones" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "soluciones/atencion-24-7",
    experience: "general",
    eyebrow: "Objetivo",
    title: "Atención 24/7, sin turnos ni filas",
    lede: "Sus clientes escriben a cualquier hora. El agente responde siempre — de madrugada, en festivos y cuando su equipo está ocupado.",
    meta: {
      title: "Atención al cliente 24/7 con IA",
      description: "Un agente IA que atiende 24/7 en todos sus canales: cero mensajes sin responder, cero clientes esperando.",
    },
    sections: [
      {
        type: "features",
        heading: "Nadie se queda esperando",
        items: [
          { title: "Siempre disponible", body: "De día, de noche y en festivos." },
          { title: "Escala a un humano", body: "Cuando toca, le pasa la conversación a su equipo con contexto.", href: "/producto/bandeja" },
        ],
      },
    ],
    related: [{ label: "Bandeja omnicanal", href: "/producto/bandeja" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "soluciones/bi",
    experience: "general",
    eyebrow: "Objetivo",
    title: "Los números de su negocio, claros y por WhatsApp",
    lede: "Sin tableros complicados: pregunte cómo va y el agente le responde con ventas, productos top y alertas.",
    meta: {
      title: "BI para dueños con IA",
      description: "Business intelligence conversacional para dueños: pregunte por WhatsApp cómo va su negocio y reciba respuestas claras al instante.",
    },
    sections: [
      {
        type: "features",
        heading: "Decidir con datos, sin ser analista",
        items: [
          { title: "Pregunte en español", body: "«¿Cómo vamos hoy?» y listo.", href: "/producto/analitica-bi" },
          { title: "Alertas útiles", body: "Le avisa de lo que necesita su atención." },
        ],
      },
    ],
    related: [{ label: "Analítica y BI", href: "/producto/analitica-bi" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────────── PRECIOS ────────────────────────────────── */
  {
    slug: "precios",
    experience: "general",
    eyebrow: "Precios",
    title: "Un plan a la medida de su negocio",
    lede: "No cobramos por «usuarios» ni por funciones sueltas. Armamos un plan según su operación y lo que quiere lograr — sin sorpresas.",
    meta: {
      title: "Precios",
      description: "Planes de agentes IA a la medida de su negocio, sin costos ocultos. Agende una demo y le armamos una propuesta clara.",
    },
    sections: [
      {
        type: "features",
        heading: "Cómo lo cobramos",
        items: [
          { title: "A la medida", body: "El plan depende de su volumen, sus canales y sus objetivos." },
          { title: "Sin sorpresas", body: "Precio claro desde el inicio. Sabe qué paga y por qué." },
          { title: "Paga al salir en vivo", body: "Configure, entrene y pruebe su agente con sus datos. El cobro empieza cuando usted decide activarlo." },
        ],
      },
      {
        type: "prose",
        heading: "¿Por qué no publicamos una tabla?",
        body: ["Porque un plan honesto depende de su negocio. En una demo corta entendemos su operación y le damos una propuesta clara — sin letra menuda."],
      },
    ],
    related: [
      { label: "Ver la plataforma", href: "/producto" },
      { label: "Precios para hoteles", href: "/hoteles/precios" },
    ],
    cta: { title: "Le armamos su propuesta", sub: "Agende una demo de 20 minutos y salga con un plan claro para su negocio.", button: "Quiero una demo" },
  },

  /* ─────────────────────────── RECURSOS ───────────────────────────────── */
  {
    slug: "recursos",
    experience: "general",
    eyebrow: "Recursos",
    title: "Aprenda a vender más con IA",
    lede: "Guías, casos y herramientas para que su negocio venda más y atienda mejor por WhatsApp.",
    meta: {
      title: "Recursos",
      description: "Blog, guías, webinars y calculadora de ROI para vender más con agentes IA por WhatsApp.",
    },
    sections: [
      {
        type: "features",
        heading: "Explore",
        items: [
          { title: "Blog", body: "Ideas prácticas para vender más con IA.", href: "/blog" },
          { title: "Guías y ebooks", body: "Descargables para poner manos a la obra.", href: "/recursos/guias" },
          { title: "Webinars", body: "Sesiones en vivo y grabadas.", href: "/recursos/webinars" },
          { title: "Calculadora de ROI", body: "Estime cuánto puede recuperar con un agente IA.", href: "/recursos/calculadora-roi" },
          { title: "Casos de éxito", body: "Negocios que ya venden con conagentes.", href: "/clientes" },
          { title: "Centro de ayuda", body: "Documentación y soporte.", href: "/recursos/ayuda" },
        ],
      },
    ],
    related: [{ label: "Ver la plataforma", href: "/producto" }],
    cta: DEFAULT_CTA,
  },
  {
    slug: "recursos/guias",
    experience: "general",
    eyebrow: "Recursos",
    title: "Guías y ebooks",
    lede: "Todo lo que necesita para vender más y atender mejor con IA por WhatsApp. Publicamos guías prácticas cada semana en el blog — aquí están los temas.",
    meta: {
      title: "Guías de IA para pymes",
      description: "Guías prácticas para vender más por WhatsApp con agentes IA: automatización, atención 24/7, cobros, reactivación y más, para pymes en Latinoamérica.",
    },
    sections: [
      {
        type: "features",
        heading: "Lo que va a aprender",
        items: [
          { title: "Vender por WhatsApp con IA", body: "Cómo responder al instante y no dejar enfriar ninguna venta.", href: "/blog" },
          { title: "Atención 24/7 sin ampliar el equipo", body: "Atender a todos, a toda hora, sin contratar más.", href: "/soluciones/atencion-24-7" },
          { title: "Cobrar y facturar en el chat", body: "Link de pago y factura DIAN sin salir de la conversación.", href: "/producto/cobros-facturacion" },
          { title: "Reactivar clientes dormidos", body: "Venderle otra vez a quien ya le compró.", href: "/soluciones/reactivacion" },
        ],
      },
      {
        type: "prose",
        heading: "Guías nuevas cada semana",
        body: ["Publicamos contenido práctico en el blog constantemente. ¿Quiere algo específico para su sector? Agende una demo y se lo preparamos a su medida."],
      },
    ],
    related: [
      { label: "Blog", href: "/blog" },
      { label: "Ver la plataforma", href: "/producto" },
    ],
    cta: DEFAULT_CTA,
  },
  {
    slug: "recursos/webinars",
    experience: "general",
    eyebrow: "Recursos",
    title: "Webinars",
    lede: "Sesiones en vivo y grabadas sobre cómo vender con agentes IA. Próximamente.",
    meta: {
      title: "Webinars",
      description: "Webinars sobre agentes IA para vender por WhatsApp en Colombia.",
    },
    sections: [
      { type: "prose", heading: "Próximamente", body: ["Estamos programando nuestras primeras sesiones. Déjenos sus datos en una demo y le avisamos de la próxima."] },
    ],
    related: [{ label: "Blog", href: "/blog" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },
  {
    slug: "recursos/calculadora-roi",
    experience: "general",
    eyebrow: "Recursos",
    title: "Calculadora de ROI",
    lede: "Estime cuánto puede recuperar con un agente IA: mensajes sin responder, ventas perdidas y tiempo de su equipo.",
    meta: {
      title: "Calculadora de ROI",
      description: "Estime el retorno de un agente IA para su negocio: ventas recuperadas, respuesta inmediata y tiempo ahorrado.",
    },
    sections: [
      { type: "prose", heading: "Cálculo personalizado", body: ["Cada negocio es distinto. En una demo corta tomamos sus números reales y le mostramos, con su propia operación, cuánto podría recuperar."] },
      {
        type: "stats",
        items: [
          { value: "?", label: "mensajes sin responder al mes" },
          { value: "?", label: "ventas que se enfrían por demora" },
          { value: "?", label: "horas de su equipo en tareas repetitivas" },
        ],
      },
    ],
    related: [{ label: "Vender más", href: "/soluciones/mas-ventas" }],
    cta: { title: "Calculemos su ROI juntos", sub: "Con sus números reales, le mostramos el retorno esperado.", button: "Quiero una demo" },
  },
  {
    slug: "recursos/ayuda",
    experience: "general",
    eyebrow: "Soporte",
    title: "Centro de ayuda",
    lede: "Documentación, guías de uso y soporte para sacarle todo el provecho a su agente IA.",
    meta: {
      title: "Centro de ayuda",
      description: "Soporte y documentación de conagentes: configure y saque provecho a su agente IA.",
    },
    sections: [
      { type: "prose", heading: "¿Necesita ayuda?", body: ["Los clientes de conagentes cuentan con soporte y acompañamiento. Además, dentro de la plataforma tiene un agente de soporte que le responde sus dudas al instante."] },
    ],
    related: [{ label: "Contacto", href: "/contacto" }],
    noindex: true,
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────────── CLIENTES ───────────────────────────────── */
  {
    slug: "clientes",
    experience: "general",
    eyebrow: "Casos de éxito",
    title: "Negocios que ya venden con conagentes",
    lede: "De hoteles a comercios e instituciones educativas: agentes IA que atienden, venden y hacen seguimiento todos los días.",
    meta: {
      title: "Casos de éxito",
      description: "Historias de negocios en Colombia que venden más con agentes IA de conagentes.",
    },
    sections: [
      {
        type: "prose",
        heading: "Resultados, no anécdotas",
        body: [
          "En conagentes medimos el impacto en lo que de verdad importa: ventas que antes se enfriaban por no responder a tiempo, ticket promedio, y clientes que vuelven. Nada de métricas de vanidad.",
          "Estamos documentando los resultados de nuestros primeros clientes con números reales. Mientras tanto, aquí está exactamente lo que medimos con cada negocio.",
        ],
      },
      {
        type: "features",
        heading: "Qué medimos con cada cliente",
        items: [
          { title: "Tiempo de respuesta", body: "De horas (o nunca) a segundos, a cualquier hora." },
          { title: "Ventas recuperadas", body: "Oportunidades que antes se perdían por no contestar." },
          { title: "Ticket promedio", body: "Cuánto suma el upsell del agente a cada venta." },
          { title: "Clientes que vuelven", body: "Reactivación de quienes ya le compraron." },
        ],
      },
      {
        type: "prose",
        heading: "¿Quiere ser uno de los primeros casos?",
        body: ["Agende una demo y le mostramos, con su propio catálogo y sus precios, cómo trabajaría su agente. Si arrancamos juntos, documentamos sus resultados."],
      },
    ],
    related: [
      { label: "conagentes para hoteles", href: "/hoteles" },
      { label: "Resultados en hoteles", href: "/hoteles/resultados" },
    ],
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────────── EMPRESA ────────────────────────────────── */
  {
    slug: "empresa",
    experience: "general",
    eyebrow: "Empresa",
    title: "Hacemos que la IA venda para las pymes de Colombia",
    lede: "conagentes nació para que cualquier negocio —no solo las grandes empresas— pueda tener un vendedor con IA trabajando por WhatsApp, 24/7.",
    meta: {
      title: "Empresa",
      description: "conagentes construye agentes IA que venden por WhatsApp para pymes de Colombia y Latinoamérica.",
    },
    sections: [
      {
        type: "prose",
        heading: "Por qué existimos",
        body: ["Los negocios pequeños y medianos pierden ventas todos los días por no poder responderle a todo el que escribe, rápido y bien. La IA cambió eso — pero seguía siendo cosa de grandes empresas con presupuesto de sobra.", "Construimos conagentes para cerrar esa brecha: un agente IA que vende, cobra y factura, listo para el día a día de una pyme colombiana."],
      },
      {
        type: "features",
        heading: "En lo que creemos",
        items: [
          { title: "Usted manda", body: "La IA ejecuta dentro de sus reglas. Siempre puede corregir." },
          { title: "Hecho para Colombia", body: "WhatsApp, factura DIAN, Habeas Data y pagos en COP." },
          { title: "Resultados, no humo", body: "Medimos en ventas, no en «funciones»." },
        ],
      },
    ],
    related: [{ label: "Contacto", href: "/contacto" }],
    cta: DEFAULT_CTA,
  },

  /* ─────────────────────────── CONTACTO ───────────────────────────────── */
  {
    slug: "contacto",
    experience: "general",
    eyebrow: "Contacto",
    title: "Hablemos",
    lede: "Cuéntenos de su negocio y le mostramos, con sus productos y sus precios, cómo su agente IA atiende, vende y cobra.",
    meta: {
      title: "Contacto",
      description: "Agende una demo o escríbanos. Le mostramos su agente IA vendiendo por WhatsApp con su propio catálogo.",
    },
    sections: [
      {
        type: "features",
        heading: "Cómo prefiere empezar",
        items: [
          { title: "Agende una demo", body: "20 minutos. Sale con una propuesta clara para su negocio." },
          { title: "Escríbanos", body: "¿Prefiere primero resolver dudas? Con gusto." },
        ],
      },
    ],
    related: [
      { label: "Precios", href: "/precios" },
      { label: "Ver la plataforma", href: "/producto" },
    ],
    cta: { title: "Agende su demo", sub: "Le mostramos su agente IA en acción, con su propio catálogo.", button: "Quiero una demo" },
  },
];
