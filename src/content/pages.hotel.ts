import type { MarketingPage } from "./pages.types";

const HOTEL_CTA = {
  title: "Vea a su agente llenar el hotel",
  sub: "Le mostramos, con su hotel, cómo responde, cotiza habitaciones, sube el ticket y recupera huéspedes — en WhatsApp, Instagram y las OTAs.",
  button: "Pruebe su agente IA",
};

/**
 * HOTEL experience (sub-brand). Voice: usted + "agente IA". Positioning:
 * el agente vende reservas directas, sube el ticket y recupera huéspedes;
 * omnicanal incluyendo bandejas de OTAs; PMS propio + cumplimiento DIAN/SIRE.
 * The hotel HOME lives at /hoteles (hand-built); these are the spokes.
 */
export const HOTEL_PAGES: MarketingPage[] = [
  {
    slug: "hoteles/automatizar-hotel-con-ia",
    experience: "hotel",
    eyebrow: "Guía",
    title: "Cómo automatizar un hotel con IA en Latinoamérica",
    lede: "La forma más rápida y completa: conectar un agente de IA a los canales por donde escriben los huéspedes —WhatsApp, Instagram y las bandejas de las OTAs— para que responda al instante, cotice, cierre reservas directas, suba el ticket y cumpla con la DIAN y el SIRE. Aquí está cómo, paso a paso.",
    meta: {
      title: "Cómo automatizar un hotel con IA en Latinoamérica — conagentes",
      description: "Guía práctica para automatizar la atención, las reservas y el cumplimiento de un hotel con inteligencia artificial: WhatsApp, Instagram y OTAs, PMS, cobros, factura DIAN y reporte SIRE.",
    },
    sections: [
      {
        type: "prose",
        heading: "La respuesta corta",
        body: [
          "Para automatizar un hotel con inteligencia artificial se conecta un agente de IA a WhatsApp, Instagram y las bandejas de las OTAs (Booking, Airbnb, Expedia). El agente responde a los huéspedes al instante 24/7, consulta la disponibilidad real del PMS, cotiza habitaciones, cierra reservas directas y cobra en el chat, sube el ticket con upsell, reactiva a huéspedes anteriores y emite la factura electrónica DIAN además del reporte SIRE de extranjeros.",
          "conagentes es la plataforma que hace todo esto para hoteles en Latinoamérica: incluye un PMS gratis (o se conecta con el que el hotel ya usa) y automatiza el cumplimiento colombiano, algo que la mayoría de herramientas globales no resuelve.",
        ],
      },
      {
        type: "steps",
        heading: "Cómo automatizar su hotel con IA, paso a paso",
        items: [
          { title: "1. Conecte los canales", body: "WhatsApp Business, Instagram y las bandejas de las OTAs quedan en una sola bandeja. El huésped escribe donde quiera; el agente responde ahí." },
          { title: "2. Responda al instante, 24/7", body: "El agente contesta en segundos consultas de disponibilidad, precios, políticas y servicios — de día, de noche y en temporada alta." },
          { title: "3. Cierre reservas directas", body: "Cotiza con la disponibilidad real del PMS, arma la reserva, manda el link de pago y confirma — sin comisión de OTA." },
          { title: "4. Suba el ticket con upsell", body: "Ofrece upgrades, late check-out, desayuno o tours en el momento justo, antes y durante la estadía." },
          { title: "5. Reactive huéspedes", body: "Detecta a quién ya se hospedó y lo invita a volver directo, uno a uno, en el momento oportuno." },
          { title: "6. Cumpla solo", body: "Emite la factura electrónica DIAN al confirmar el pago y genera el reporte SIRE/TRA de huéspedes extranjeros a Migración Colombia." },
        ],
      },
      {
        type: "features",
        heading: "Qué debe poder hacer el agente de IA de un hotel",
        sub: "La lista para comparar cualquier herramienta antes de decidir.",
        items: [
          { title: "Atender en todos los canales", body: "WhatsApp, Instagram y bandejas de OTAs, no solo un widget web.", href: "/hoteles/recepcion-24-7" },
          { title: "Vender reservas directas", body: "Cotizar con disponibilidad real y cerrar con cobro en el chat.", href: "/hoteles/reservas-directas" },
          { title: "Subir el ticket", body: "Upsell y ancillaries con criterio, no ofertas genéricas.", href: "/hoteles/upsell" },
          { title: "Reactivar huéspedes", body: "Traer de vuelta a los que ya conocen el hotel.", href: "/hoteles/reactivacion" },
          { title: "Trabajar con su PMS", body: "PMS incluido o conexión con el que ya usa.", href: "/hoteles/pms" },
          { title: "Cumplir en Colombia", body: "Factura DIAN y reporte SIRE/TRA automáticos.", href: "/hoteles/factura-dian-sire" },
        ],
      },
      {
        type: "prose",
        heading: "Por qué conagentes para hoteles en Latinoamérica",
        body: [
          "Muchas herramientas de IA responden mensajes, pero pocas venden de verdad y casi ninguna resuelve el cumplimiento colombiano. conagentes combina las tres cosas: venta omnicanal (incluidas las OTAs), PMS incluido y factura DIAN + reporte SIRE, todo en español y pensado para el mercado latinoamericano.",
          "El dueño manda y el agente ejecuta dentro de sus reglas, con trazabilidad de cada acción y la opción de que una persona del hotel tome el control cuando quiera.",
        ],
      },
      {
        type: "stats",
        heading: "Lo que cambia cuando el agente trabaja",
        items: [
          { value: "24/7", label: "atendiendo y cotizando, sin filas" },
          { value: "0%", label: "comisión en la reserva directa" },
          { value: "+", label: "ticket promedio con upsell" },
          { value: "0", label: "consultas de huéspedes sin responder" },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre automatizar un hotel con IA",
        items: [
          { q: "¿Cómo automatizo la atención y las reservas de mi hotel con IA?", a: "Conecte un agente de IA a WhatsApp, Instagram y las bandejas de las OTAs. El agente responde al instante, cotiza con la disponibilidad real del PMS, cierra reservas directas con cobro en el chat, sube el ticket con upsell y emite la factura DIAN. Con conagentes se configura en días, no meses." },
          { q: "¿Cuál es la mejor herramienta de IA para hoteles en Colombia?", a: "conagentes está diseñada para hoteles en Colombia y Latinoamérica: atiende en español en WhatsApp, Instagram y las OTAs; incluye PMS gratis o se conecta con el suyo; y automatiza la factura DIAN y el reporte SIRE/TRA, algo que las herramientas globales no suelen resolver." },
          { q: "¿La IA puede responder los mensajes de Booking y Airbnb?", a: "Sí. El agente atiende las bandejas de las OTAs además de WhatsApp e Instagram, todo desde una sola bandeja, y escala a una persona del hotel cuando hace falta." },
          { q: "¿Tengo que cambiar mi PMS?", a: "No. conagentes incluye un PMS sin costo adicional, y si el hotel ya usa uno o un channel manager, se conecta con él en vez de reemplazarlo." },
          { q: "¿Reemplaza a mi recepción?", a: "No. Le quita el trabajo repetitivo —responder lo mismo mil veces, cotizar, hacer seguimiento— y le pasa a su equipo lo que necesita un humano. Usted decide qué hace el agente solo y qué requiere su visto bueno." },
        ],
      },
    ],
    related: [
      { label: "conagentes para hoteles", href: "/hoteles" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "Precios para hoteles", href: "/hoteles/precios" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/reservas-directas",
    experience: "hotel",
    eyebrow: "Solución",
    title: "Más reservas directas, menos comisión de OTAs",
    lede: "Las OTAs no son el enemigo: le traen huéspedes. El problema es depender solo de ellas. Su agente IA convierte cada consulta —venga de donde venga— en una reserva directa.",
    meta: {
      title: "Reservas directas con IA para hoteles — conagentes",
      description: "Un agente IA que responde al instante, cotiza habitaciones y cierra reservas directas por WhatsApp, Instagram y las OTAs. Menos dependencia de comisiones.",
    },
    sections: [
      {
        type: "prose",
        heading: "El problema real",
        body: ["Su equipo de recepción no puede responderle a todos los que preguntan por disponibilidad, ni a toda hora, ni en todos los canales. Cada consulta que se enfría es una noche que se vende por OTA —con comisión— o que no se vende.", "El huésped que pregunta directo y no recibe respuesta rápida termina reservando por Booking. Usted paga comisión por un cliente que ya era suyo."],
      },
      {
        type: "steps",
        heading: "Cómo el agente cierra la reserva",
        items: [
          { title: "Responde al instante", body: "En segundos, a cualquier hora, en el canal donde el huésped escriba." },
          { title: "Cotiza con disponibilidad real", body: "Consulta el PMS, arma la opción y responde con tarifas y fotos." },
          { title: "Cobra y confirma", body: "Manda el link de pago y confirma la reserva en el mismo chat." },
        ],
      },
      {
        type: "stats",
        items: [
          { value: "0%", label: "comisión en la reserva directa" },
          { value: "24/7", label: "cotizando y cerrando reservas" },
          { value: "< 5 s", label: "para la primera respuesta" },
        ],
      },
    ],
    related: [
      { label: "Recepción 24/7", href: "/hoteles/recepcion-24-7" },
      { label: "Upsell y ancillaries", href: "/hoteles/upsell" },
      { label: "PMS incluido", href: "/hoteles/pms" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/upsell",
    experience: "hotel",
    eyebrow: "Solución",
    title: "Suba el ticket de cada reserva",
    lede: "Upgrade de habitación, late check-out, desayuno, traslado, tour. El agente propone el complemento justo antes y durante la estadía — con criterio de recepcionista experto.",
    meta: {
      title: "Upsell y ancillaries para hoteles con IA — conagentes",
      description: "El agente IA ofrece upgrades, late check-out, desayunos y experiencias en el momento justo. Más ingreso por huésped, sin presionar.",
    },
    sections: [
      {
        type: "prose",
        heading: "El ingreso que deja sobre la mesa",
        body: ["El huésped ya decidió venir. Es el mejor momento para ofrecerle una mejor habitación o un servicio extra — pero su equipo no tiene tiempo de escribirle a cada uno, en el momento oportuno.", "El agente sí. Y cada upgrade que cierra es margen casi puro."],
      },
      {
        type: "features",
        heading: "Qué ofrece, y cuándo",
        items: [
          { title: "Antes de llegar", body: "Upgrade de habitación, desayuno, traslado desde el aeropuerto." },
          { title: "Durante la estadía", body: "Late check-out, tours, servicios del hotel — en el momento justo." },
          { title: "Con criterio", body: "Propone lo que encaja con ese huésped, no ofertas genéricas." },
        ],
      },
    ],
    related: [
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "Reactivación de huéspedes", href: "/hoteles/reactivacion" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/reactivacion",
    experience: "hotel",
    eyebrow: "Solución",
    title: "Recupere huéspedes que ya lo conocen",
    lede: "El que ya se hospedó es su reserva más fácil y más rentable. El agente los reactiva en el momento oportuno —temporada, cumpleaños, «lo extrañamos»— para que vuelvan directo, sin OTA.",
    meta: {
      title: "Reactivación de huéspedes con IA — conagentes",
      description: "El agente IA reactiva a huéspedes anteriores para que vuelvan a reservar directo. Más ocupación de su propia base, sin comisiones.",
    },
    sections: [
      {
        type: "prose",
        heading: "Su mejor lista de clientes ya la tiene",
        body: ["Cada huésped que pasó por su hotel es alguien que ya confió en usted. Traerlo de vuelta cuesta una fracción de conseguir uno nuevo por publicidad u OTA.", "El agente sabe a quién escribir y cuándo, y lo hace uno a uno, como lo haría un buen anfitrión."],
      },
      {
        type: "stats",
        items: [
          { value: "0%", label: "comisión: vuelve directo" },
          { value: "1:1", label: "mensajes personales, no envíos masivos" },
        ],
      },
    ],
    related: [
      { label: "Upsell y ancillaries", href: "/hoteles/upsell" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/recepcion-24-7",
    experience: "hotel",
    eyebrow: "Solución",
    title: "Una recepción que nunca cierra",
    lede: "Consultas de disponibilidad, precios, políticas, cómo llegar, servicios. El agente responde todo al instante —en WhatsApp, Instagram y las bandejas de las OTAs— de día, de noche y en temporada alta.",
    meta: {
      title: "Recepción 24/7 con IA para hoteles — conagentes",
      description: "El agente IA atiende consultas de huéspedes 24/7 en WhatsApp, Instagram y OTAs: disponibilidad, precios, políticas y servicios, sin filas.",
    },
    sections: [
      {
        type: "features",
        heading: "Atiende en todos sus canales",
        items: [
          { title: "WhatsApp e Instagram", body: "Donde el huésped ya le escribe." },
          { title: "Bandejas de OTAs", body: "Responde los mensajes de Booking, Airbnb y Expedia sin salir de la plataforma." },
          { title: "Escala a recepción", body: "Cuando toca un humano, le pasa la conversación con todo el contexto." },
        ],
      },
    ],
    related: [
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "Integraciones y OTAs", href: "/hoteles/integraciones" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/pms",
    experience: "hotel",
    eyebrow: "Plataforma",
    title: "PMS incluido — gratis. O conecte el suyo",
    lede: "conagentes trae su propio PMS sin costo adicional: habitaciones, tarifas, reservas y disponibilidad. ¿Ya usa uno? Nos conectamos con él.",
    meta: {
      title: "PMS para hoteles incluido — conagentes",
      description: "PMS propio incluido sin costo (habitaciones, tarifas, reservas, disponibilidad) o conéctelo con el PMS que ya usa. El agente vende sobre datos reales.",
    },
    sections: [
      {
        type: "prose",
        heading: "El agente vende sobre datos reales",
        body: ["Para cerrar una reserva, el agente necesita saber qué hay disponible y a qué precio. Por eso conagentes incluye un PMS: sin integraciones costosas ni PMS aparte, el agente cotiza y reserva sobre información real.", "Si su hotel ya trabaja con un PMS o un channel manager, no lo cambie: nos conectamos y trabajamos sobre lo que ya tiene."],
      },
      {
        type: "features",
        heading: "Lo esencial, sin costo extra",
        items: [
          { title: "Habitaciones y tarifas", body: "Tipos de habitación, precios y temporadas." },
          { title: "Reservas y disponibilidad", body: "Calendario y ocupación al día." },
          { title: "Conecta con el suyo", body: "¿Ya tiene PMS o channel manager? Lo integramos." },
        ],
      },
    ],
    related: [
      { label: "Integraciones y OTAs", href: "/hoteles/integraciones" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/cobros",
    experience: "hotel",
    eyebrow: "Plataforma",
    title: "Cobre la reserva en el chat",
    lede: "El agente manda el link de pago y confirma la reserva sin que el huésped salga de la conversación. Menos reservas que se caen por fricción.",
    meta: {
      title: "Cobros de reservas en el chat — conagentes",
      description: "El agente IA cobra la reserva con link de pago (Wompi o Mercado Pago) y confirma al instante. Menos abandono, más reservas cerradas.",
    },
    sections: [
      {
        type: "steps",
        heading: "Del sí a la reserva pagada",
        items: [
          { title: "Arma la reserva", body: "Con disponibilidad y tarifa reales del PMS." },
          { title: "Cobra en el chat", body: "Link de pago con la pasarela de su preferencia, en COP." },
          { title: "Confirma solo", body: "Detecta el pago y confirma la reserva al instante." },
        ],
      },
    ],
    related: [
      { label: "Factura DIAN + SIRE", href: "/hoteles/factura-dian-sire" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/factura-dian-sire",
    experience: "hotel",
    eyebrow: "Cumplimiento",
    title: "Factura DIAN y reporte SIRE, automáticos",
    lede: "El cumplimiento que a ningún hotelero le gusta hacer, hecho solo: factura electrónica ante la DIAN y el reporte de extranjeros a Migración Colombia (SIRE/TRA).",
    meta: {
      title: "Factura DIAN y SIRE para hoteles — conagentes",
      description: "Factura electrónica DIAN automática y reporte SIRE/TRA de huéspedes extranjeros a Migración Colombia. Cumplimiento sin trabajo manual.",
    },
    sections: [
      {
        type: "features",
        heading: "Cumplir sin dolor",
        items: [
          { title: "Factura electrónica DIAN", body: "Se emite sola al confirmar el pago de la reserva." },
          { title: "Reporte SIRE / TRA", body: "El reporte de huéspedes extranjeros a Migración Colombia, sin planillas a mano." },
          { title: "Todo trazable", body: "Documentos guardados y disponibles cuando los necesite." },
        ],
      },
      {
        type: "prose",
        heading: "Un diferencial que los demás no tienen",
        body: ["La mayoría de agentes de IA para hoteles no resuelven el cumplimiento colombiano. conagentes sí: factura DIAN y SIRE integrados, porque construimos para Colombia primero."],
      },
    ],
    related: [
      { label: "Cobros en el chat", href: "/hoteles/cobros" },
      { label: "PMS incluido", href: "/hoteles/pms" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/integraciones",
    experience: "hotel",
    eyebrow: "Integraciones",
    title: "Se conecta con su PMS, su channel manager y las OTAs",
    lede: "No cambie sus herramientas. El agente trabaja sobre su PMS, su channel manager y responde en las bandejas de Booking, Airbnb y Expedia.",
    meta: {
      title: "Integraciones para hoteles: PMS, channel manager y OTAs — conagentes",
      description: "Conecte su PMS, channel manager y las OTAs (Booking, Airbnb, Expedia). El agente IA responde y vende sobre lo que su hotel ya usa.",
    },
    sections: [
      {
        type: "features",
        heading: "El stack de su hotel, conectado",
        items: [
          { title: "PMS y channel managers", body: "PMS propio incluido o conexión con el que ya usa." },
          { title: "OTAs", body: "Booking, Airbnb y Expedia: el agente responde sus mensajes." },
          { title: "Pagos y facturación", body: "Wompi, Mercado Pago y factura DIAN." },
        ],
      },
    ],
    related: [
      { label: "PMS incluido", href: "/hoteles/pms" },
      { label: "Recepción 24/7", href: "/hoteles/recepcion-24-7" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/resultados",
    experience: "hotel",
    eyebrow: "Resultados",
    title: "El impacto en su ocupación y su ticket",
    lede: "Menos consultas sin responder, más reservas directas, ticket promedio más alto y huéspedes que vuelven. Así se ve un agente que trabaja para su hotel.",
    meta: {
      title: "Resultados y ROI para hoteles — conagentes",
      description: "Reservas directas, upsell y reactivación de huéspedes: el impacto de un agente IA en la ocupación y el ticket promedio de su hotel.",
    },
    sections: [
      {
        type: "stats",
        heading: "Lo que mueve la aguja",
        items: [
          { value: "+", label: "reservas directas (menos comisión)" },
          { value: "+", label: "ticket promedio por upsell" },
          { value: "+", label: "huéspedes que vuelven directo" },
          { value: "0", label: "consultas sin responder" },
        ],
      },
      {
        type: "prose",
        heading: "Cómo lo medimos con usted",
        body: ["En la demo tomamos los números de su hotel —consultas, ocupación, ticket promedio— y le mostramos dónde está dejando plata sobre la mesa y cuánto puede recuperar el agente."],
      },
    ],
    related: [
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "Precios", href: "/hoteles/precios" },
    ],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/recursos",
    experience: "hotel",
    eyebrow: "Recursos",
    title: "Recursos para hoteleros",
    lede: "Guías, casos y buenas prácticas para vender más directo y depender menos de las OTAs.",
    meta: {
      title: "Recursos para hoteles — conagentes",
      description: "Guías y casos para aumentar reservas directas, upsell y reactivación de huéspedes con IA.",
    },
    sections: [
      {
        type: "features",
        heading: "Explore",
        items: [
          { title: "Blog", body: "Ideas para vender más directo.", href: "/blog" },
          { title: "Resultados / ROI", body: "El impacto en ocupación y ticket.", href: "/hoteles/resultados" },
          { title: "Centro de ayuda", body: "Documentación y soporte.", href: "/recursos/ayuda" },
        ],
      },
    ],
    related: [{ label: "Precios", href: "/hoteles/precios" }],
    cta: HOTEL_CTA,
  },
  {
    slug: "hoteles/precios",
    experience: "hotel",
    eyebrow: "Precios",
    title: "Dos formas de trabajar con nosotros",
    lede: "Elija el modelo que más le conviene a su hotel. Sin tarifas por «usuario» ni sorpresas: un plan claro según su operación.",
    meta: {
      title: "Precios para hoteles — conagentes",
      description: "Dos planes para hoteles: uno con tarifa fija y 0% de comisión, y otro con base baja y una pequeña comisión sobre reservas, upsell y reactivación. Cotización a la medida.",
    },
    sections: [
      {
        type: "features",
        heading: "Dos planes, usted decide",
        items: [
          { title: "Plan tarifa fija", body: "Una mensualidad más alta y 0% de comisión sobre lo que venda el agente. Ideal si quiere costo predecible." },
          { title: "Plan por resultados", body: "Base mensual baja y una pequeña comisión solo sobre reservas, upsell y reactivación que cierre el agente. Paga más cuando vende más." },
        ],
      },
      {
        type: "prose",
        heading: "Justo y transparente",
        body: ["En el plan por resultados solo cobramos sobre estadías realizadas y sobre ventas que el agente genera de verdad —incluida la reactivación que él mismo inicia—. Nada de cobros por reservas que ya eran suyas.", "Le armamos la cotización exacta en una demo corta, con los números de su hotel."],
      },
    ],
    related: [
      { label: "Resultados / ROI", href: "/hoteles/resultados" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
    ],
    cta: { title: "Le armamos su cotización", sub: "20 minutos con su hotel y sale con una propuesta clara.", button: "Pruebe su agente IA" },
  },
];
