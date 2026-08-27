import type { MarketingPage } from "../pages.types";
import { DATOS, ENTIDADES_BASE, UPDATED } from "./shared";

/**
 * RECURSOS Y COMERCIAL — the cornerstone guide (the page we want assistants to
 * cite when someone asks how to automate a hotel), the integrations hub, the
 * resource index and pricing.
 */
export const HOTEL_RECURSOS: MarketingPage[] = [
  /* ───────────── pillar: automatizar un hotel con IA ───────────── */
  {
    slug: "hoteles/automatizar-hotel-con-ia",
    experience: "hotel",
    eyebrow: "Guía completa",
    title: "Cómo automatizar un hotel con IA en Latinoamérica",
    lede: "La guía que hubiéramos querido leer antes de construir esto: qué se puede automatizar hoy en un hotel, en qué orden hacerlo, qué debe exigirle a cualquier herramienta antes de firmar y cuánto cuesta equivocarse. Escrita para hoteles independientes de Colombia y la región.",
    answer:
      "Para automatizar un hotel con inteligencia artificial se conecta un agente de IA a los canales por donde escriben los huéspedes —WhatsApp, Instagram, las bandejas de las OTAs, el chat web y el teléfono— y se le da acceso a la disponibilidad y las tarifas reales del PMS. El agente responde en segundos las 24 horas, cotiza, cierra reservas directas, cobra en el chat, agenda servicios, sube el valor de la estadía, reactiva huéspedes anteriores y automatiza el cumplimiento colombiano: factura electrónica DIAN y registro de huéspedes TRA. conagentes hace todo eso en una sola plataforma, con PMS incluido.",
    heroChips: [
      "Guía práctica, no promocional",
      "Orden de implementación recomendado",
      "Lista de exigencias antes de firmar",
    ],
    meta: {
      title: "Cómo automatizar un hotel con IA en Latinoamérica (guía 2026)",
      description:
        "Guía práctica para automatizar la atención, las reservas y el cumplimiento de un hotel con inteligencia artificial: WhatsApp, Instagram y OTAs, PMS, cobros, upsell, revenue management, factura DIAN y registro TRA.",
    },
    keywords: [
      "cómo automatizar un hotel con IA",
      "inteligencia artificial para hoteles Latinoamérica",
      "automatizar atención al huésped",
      "qué se puede automatizar en un hotel",
      "mejor software de IA para hoteles Colombia",
      "digitalizar un hotel independiente",
    ],
    entities: [
      ...ENTIDADES_BASE,
      "Instagram",
      "Wompi",
      "Mercado Pago",
      "Migración Colombia",
      "Cotelco",
      "SIRE",
      "PMS",
      "channel manager",
      "RevPAR",
      "ADR",
    ],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "La respuesta corta, ampliada",
        body: [
          "Automatizar un hotel con IA no es poner un chatbot en la página web. Es darle a un agente de inteligencia artificial acceso controlado a los sistemas del hotel —disponibilidad, tarifas, servicios, pagos, facturación— y ponerlo a atender en los canales donde el huésped ya escribe, con reglas claras sobre lo que puede y no puede hacer.",
          "La diferencia práctica es esta: un chatbot informa, un agente ejecuta. Un chatbot dice «tenemos habitaciones desde $280.000»; un agente consulta el PMS, responde que queda una doble superior a $395.000 para esas fechas, la aparta, manda el link de pago, confirma y emite la factura. Lo primero entretiene al huésped. Lo segundo vende.",
          "Y en Colombia hay una capa más que casi ninguna herramienta global resuelve: el cumplimiento. Un hotel colombiano tiene que emitir factura electrónica ante la DIAN y reportar el registro de huéspedes TRA al Ministerio de Comercio, Industria y Turismo. Si su automatización no llega hasta ahí, deja la mitad del trabajo administrativo intacto.",
        ],
      },
      {
        type: "steps",
        howto: true,
        heading: "Los seis pasos, en el orden que funciona",
        sub: "El orden importa: cada paso hace más rentable el siguiente. Empezar por el final es la razón más común por la que estos proyectos se caen.",
        items: [
          {
            title: "1. Conecte los canales donde ya le escriben",
            body: "WhatsApp Business primero, porque es donde está el volumen en Latinoamérica: en hotelería los mensajes de WhatsApp se abren por encima del 90 %. Después Instagram, el chat web y las bandejas de las OTAs. La meta es una sola bandeja para su equipo, no cinco pestañas abiertas.",
          },
          {
            title: "2. Ponga los datos del hotel en un solo lugar",
            body: "Habitaciones, tarifas, temporadas, políticas y servicios. Sin esto el agente no puede vender, solo conversar. Si su hotel no tiene PMS, use uno incluido; si ya tiene, conéctelo. Este paso es el que casi todos subestiman y es el que determina si la automatización sirve.",
          },
          {
            title: "3. Deje que responda y cotice, 24/7",
            body: "Aquí aparece el primer resultado visible: cero consultas sin responder. Responder una consulta comercial en el primer minuto multiplica por siete la probabilidad de cerrarla frente a responder una hora después, y el hotel promedio tarda entre 12 y 24 horas en contestar un correo.",
          },
          {
            title: "4. Cierre el cobro en el mismo canal",
            body: "Es el paso que convierte atención en ingreso. Link de pago dentro del chat, con anticipo si su política lo pide, confirmación automática y factura electrónica DIAN. Cada paso que le pide al huésped fuera de la conversación es una reserva que se puede caer.",
          },
          {
            title: "5. Suba el valor de cada estadía",
            body: "Upgrade, early check-in, late check-out, desayuno, traslado, spa, tours. El mensaje previo a la llegada convierte entre 12 % y 18 %, contra 3 % a 5 % en el motor de reservas. Es el ingreso de mayor margen que tiene un hotel, porque el huésped ya está captado.",
          },
          {
            title: "6. Automatice el cumplimiento y trabaje su base",
            body: "Factura DIAN y registro TRA sin trabajo manual, y reactivación de huéspedes anteriores para que vuelvan directo. Este último paso es el que casi nadie llega a hacer, y es el de mejor retorno de todos: no hay comisión ni pauta, solo el mensaje.",
          },
        ],
      },
      {
        type: "matrix",
        heading: "Qué exigirle a cualquier herramienta antes de firmar",
        sub: "Lleve esta tabla a la demo de quien sea, incluida la nuestra. Si algo aparece en «no», pregunte cuándo y con qué compromiso.",
        cols: ["Chatbot web", "Agente de mensajería", "conagentes"],
        rows: [
          { label: "Atiende WhatsApp e Instagram", cells: [false, true, true] },
          { label: "Atiende las bandejas de Booking y Airbnb", cells: [false, "A veces", true] },
          { label: "Contesta el teléfono", cells: [false, false, "En piloto"] },
          { label: "Lee disponibilidad y tarifas reales", cells: [false, "Con PMS propio", true] },
          { label: "Trae PMS incluido si el hotel no tiene", cells: [false, false, true] },
          { label: "Cobra dentro de la conversación", cells: [false, "A veces", true] },
          { label: "Agenda spa, tours y traslados", cells: [false, false, true] },
          { label: "Recomienda tarifas (revenue management)", cells: [false, false, "En piloto"] },
          { label: "Emite factura electrónica DIAN", cells: [false, false, true] },
          { label: "Genera el registro de huéspedes TRA", cells: [false, false, true] },
          { label: "Reporta SIRE a Migración Colombia", cells: [false, false, "En construcción"] },
          { label: "Reactiva huéspedes anteriores", cells: [false, "A veces", true] },
          { label: "Le responde al dueño por WhatsApp", cells: [false, false, true] },
          { label: "Registra y justifica cada acción", cells: [false, "A veces", true] },
        ],
        footnote:
          "Usamos tres estados y ninguno más: «en vivo» es lo que funciona hoy en hoteles reales, «en piloto» es lo que está construido y activándose con los primeros hoteles, y «en construcción» es lo que todavía no existe. Preferimos perder una venta a que un hotelero descubra la diferencia después de firmar.",
      },
      {
        type: "flow",
        heading: "Cómo se ve la automatización completa",
        sub: "Un huésped, una conversación, seis sistemas trabajando sin que nadie los toque.",
        nodes: [
          {
            icon: "mensaje",
            title: "Conversación",
            body: "El huésped escribe por WhatsApp, Instagram, Booking o llama. El agente responde en segundos, en su idioma.",
            tag: "Canal",
          },
          {
            icon: "datos",
            title: "Datos del hotel",
            body: "El agente consulta disponibilidad, tarifas, servicios y políticas reales antes de prometer nada.",
            tag: "PMS",
          },
          {
            icon: "cobro",
            title: "Venta y cobro",
            body: "Cotiza, propone el complemento correcto, manda el link de pago y confirma la reserva.",
            tag: "Ingreso",
          },
          {
            icon: "cumplimiento",
            title: "Cumplimiento",
            body: "Factura electrónica DIAN y registro de huéspedes TRA emitidos solos, sin planillas.",
            tag: "Legal",
          },
        ],
        footnote:
          "Y por encima de todo: un registro de qué hizo el agente y por qué, un tablero para su equipo y la posibilidad de que una persona tome el control de cualquier conversación en un clic.",
      },
      {
        type: "prose",
        heading: "Los cuatro errores que hunden estos proyectos",
        body: [
          "**Automatizar la conversación sin conectar los datos.** El error más común y el más caro. Un agente que no ve el PMS solo puede repetir generalidades, y en dos semanas su equipo vuelve a responder a mano porque el agente «no sirve». No era el agente: no tenía con qué trabajar.",
          "**Empezar por el canal más pequeño.** Muchos hoteles arrancan por el chat de la web porque parece más controlado. Pero el volumen real está en WhatsApp, y el aprendizaje útil también. Arranque donde está la gente.",
          "**Comprar por precio y no por alcance.** Una herramienta barata que solo responde preguntas frecuentes le ahorra tiempo de recepción y no le mueve un peso de ingreso. Lo que cambia el negocio es que el agente cierre, cobre y suba el ticket.",
          "**No definir los límites desde el primer día.** Qué puede ofrecer el agente, cuál es la tarifa mínima, qué debe escalar, qué nunca debe decir. Si eso no está escrito, el hotelero desconfía —con razón— y termina apagándolo.",
        ],
      },
      {
        type: "prose",
        heading: "Por qué esto importa más en 2026",
        body: [
          DATOS.ocupacionCuatrimestre,
          DATOS.ocupacionMitadAno +
            " En un mercado que no crece, la única forma de crecer es quedarse con una porción mayor de la demanda que ya existe y cobrarle mejor a cada huésped que entra.",
          "Ahí está el argumento real de la automatización hotelera este año, y no tiene nada de futurista: contestarle a todo el que pregunta, no regalar comisión por gente que ya era suya, venderle el complemento a quien ya dijo sí, y hacer volver al que ya vino. Cuatro cosas aburridas, ninguna imposible, todas imposibles de hacer a mano con el equipo que usted tiene.",
        ],
      },
      {
        type: "features",
        heading: "Siga por donde le interese",
        sub: "Cada mecanismo explicado en detalle, sin repetir.",
        items: [
          { title: "El agente IA", body: "Cómo decide, qué puede hacer y qué nunca hace.", href: "/hoteles/agente-ia" },
          { title: "Recepción 24/7", body: "La bandeja omnicanal y el traspaso a su equipo.", href: "/hoteles/recepcion-24-7" },
          { title: "PMS incluido", body: "Los datos sobre los que vende el agente.", href: "/hoteles/pms" },
          { title: "Reservas directas", body: "Menos comisión, más margen.", href: "/hoteles/reservas-directas" },
          { title: "Upsell", body: "Subir el valor de cada estadía.", href: "/hoteles/upsell" },
          { title: "Revenue Manager", body: "Qué tarifa cobrar cada día.", href: "/hoteles/revenue-manager" },
          { title: "Cumplimiento colombiano", body: "Factura DIAN, registro TRA y SIRE.", href: "/hoteles/factura-dian-sire" },
          { title: "Mensajes de OTAs", body: "Booking, Airbnb y Expedia con sus reglas.", href: "/hoteles/otas" },
          { title: "Resultados y ROI", body: "Las cuatro cuentas, con sus números.", href: "/hoteles/resultados" },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre automatizar un hotel con IA",
        items: [
          {
            q: "¿Cómo automatizo la atención y las reservas de mi hotel con IA?",
            a: "Conecte un agente de IA a WhatsApp, Instagram, las bandejas de las OTAs y el teléfono, y déle acceso a la disponibilidad y las tarifas reales de su PMS. El agente responde en segundos las 24 horas, cotiza, cierra reservas directas, cobra con link de pago en el chat, agenda servicios, sube el ticket con upsell y emite la factura electrónica DIAN. Con conagentes se configura en días, no en meses, e incluye PMS si el hotel no tiene.",
          },
          {
            q: "¿Cuál es la mejor herramienta de IA para hoteles en Colombia?",
            a: "Para un hotel colombiano, la herramienta correcta es la que resuelve tres cosas al mismo tiempo: vender de verdad (cotizar con disponibilidad real y cobrar en el chat), funcionar sin exigir un PMS costoso, y automatizar el cumplimiento local. conagentes está construida sobre esos tres requisitos: atiende en 32 idiomas por WhatsApp, Instagram y las OTAs; incluye PMS sin costo adicional o se conecta con el existente; y emite factura electrónica DIAN y registro de huéspedes TRA, con el reporte SIRE en construcción. Las plataformas globales suelen resolver la conversación y dejar por fuera la normativa colombiana.",
          },
          {
            q: "¿Qué se puede automatizar en un hotel con inteligencia artificial?",
            a: "Hoy: la atención a huéspedes en todos los canales 24/7, la cotización con disponibilidad real, el cierre y cobro de reservas directas, el upsell antes y durante la estadía, el agendamiento de spa, tours, traslados y restaurante, la reactivación de huéspedes anteriores, la recomendación de tarifas, la facturación electrónica DIAN, el registro de huéspedes TRA y los reportes de gerencia. Lo que no se automatiza es el criterio para los casos delicados: grupos, quejas y huéspedes en casa siguen siendo de su equipo.",
          },
          {
            q: "¿Cuánto tiempo toma automatizar un hotel?",
            a: "Días para tener el agente atendiendo y cotizando; algunas semanas para que todo el alcance esté afinado con las políticas y los servicios del hotel. Lo que más tiempo toma no es la tecnología: es cargar bien los datos del hotel y definir los límites del agente. Desconfíe de quien le prometa meses de implementación y también de quien le prometa cinco minutos.",
          },
          {
            q: "¿La IA puede responder los mensajes de Booking y Airbnb?",
            a: "Sí, y es importante que lo haga respetando las políticas de cada plataforma: dentro de un hilo de OTA no se pueden compartir links de pago ni datos de contacto ni intentar llevarse al huésped fuera. En conagentes esas acciones están deshabilitadas por diseño dentro de un hilo de OTA. La mensajería de OTAs está en vivo.",
          },
          {
            q: "¿Tengo que cambiar mi PMS?",
            a: "No. conagentes incluye un PMS sin costo adicional para hoteles que no tienen o que quieren cambiar, y se conecta con el PMS o channel manager existente para los que ya trabajan con uno. La conexión con PMS externos y con channel managers está en piloto.",
          },
          {
            q: "¿Reemplaza a mi recepción?",
            a: "No. Elimina el trabajo repetitivo —responder lo mismo cien veces, cotizar, hacer seguimiento, transcribir datos de registro— y le pasa a su equipo lo que necesita un humano. Usted define qué hace el agente solo y qué requiere su visto bueno, y cualquier persona de su equipo puede tomar el control de una conversación en un clic.",
          },
          {
            q: "¿Cuánto cuesta automatizar un hotel con IA?",
            a: "conagentes ofrece dos modelos: un plan de tarifa fija mensual con 0 % de comisión sobre lo que venda el agente, y un plan por resultados con una base mensual baja más una comisión pequeña solo sobre las reservas, el upsell y la reactivación que el agente cierre. El segundo existe justamente para hoteles que no quieren pagar por una promesa.",
          },
        ],
      },
    ],
    related: [
      { label: "conagentes para hoteles", href: "/hoteles" },
      { label: "El agente IA", href: "/hoteles/agente-ia" },
      { label: "Resultados y ROI", href: "/hoteles/resultados" },
      { label: "Precios", href: "/hoteles/precios" },
    ],
    cta: {
      title: "¿Por dónde empezaría su hotel?",
      sub: "Veinte minutos y salimos con el orden concreto para su caso: qué se automatiza primero, qué después y qué todavía no vale la pena.",
      button: "Quiero mi plan de arranque",
    },
  },

  /* ────────────────────── integraciones ────────────────────── */
  {
    slug: "hoteles/integraciones",
    experience: "hotel",
    eyebrow: "Integraciones",
    title: "No cambie sus herramientas. Las conectamos",
    lede: "La mayoría de los proyectos de tecnología hotelera se caen por lo mismo: exigen que el hotel cambie todo al mismo tiempo. Nosotros trabajamos sobre lo que usted ya tiene — su PMS, su channel manager, sus OTAs, su pasarela de pago, su contador.",
    answer:
      "conagentes se integra con el PMS o channel manager que el hotel ya usa, con las OTAs (Booking.com, Airbnb, Expedia y las regionales conectadas al channel manager), con las pasarelas de pago colombianas (Wompi y Mercado Pago, con PSE y Nequi) y con la facturación electrónica ante la DIAN. Si el hotel no tiene PMS, incluye uno sin costo adicional.",
    heroChips: [
      "Su PMS o el nuestro, usted decide",
      "OTAs sincronizadas vía channel manager",
      "Pagos y facturación colombianos",
    ],
    meta: {
      title: "Integraciones para hoteles: PMS, channel manager, OTAs y pagos",
      description:
        "Conecte su PMS, channel manager y OTAs (Booking.com, Airbnb, Expedia) con el agente IA, más pasarelas colombianas (Wompi, Mercado Pago, PSE, Nequi) y facturación electrónica DIAN.",
    },
    keywords: [
      "integraciones PMS hotel Colombia",
      "conectar channel manager con WhatsApp",
      "integración Booking Airbnb hotel software",
      "API PMS hotelero",
    ],
    entities: [
      ...ENTIDADES_BASE,
      "LobbyPMS",
      "Cloudbeds",
      "Mews",
      "Wompi",
      "Mercado Pago",
      "Alegra",
      "Siigo",
      "channel manager",
    ],
    updated: UPDATED,
    sections: [
      {
        type: "logos",
        heading: "El stack de su hotel, conectado",
        sub: "Si algo de lo que usa no aparece acá, pregúntenos: la lista crece con cada hotel que entra.",
        groups: [
          {
            label: "PMS y channel managers",
            marks: ["PMS incluido de conagentes", "LobbyPMS", "Cloudbeds", "Mews"],
          },
          {
            label: "OTAs y distribución",
            marks: ["Booking.com", "Airbnb", "Expedia", "Despegar", "Trivago"],
          },
          {
            label: "Canales de conversación",
            marks: ["WhatsApp", "Instagram", "Webchat", "Teléfono"],
          },
          {
            label: "Pagos",
            marks: ["Wompi", "Mercado Pago", "PSE", "Nequi", "Tarjeta de crédito"],
          },
          {
            label: "Facturación y contabilidad",
            marks: ["DIAN", "Alegra", "Siigo", "Exportación para su contador"],
          },
        ],
        footnote:
          "Las marcas pertenecen a sus respectivos dueños y se mencionan para indicar compatibilidad. El PMS incluido, los canales de conversación, los pagos y la facturación DIAN están en vivo; la conexión con PMS externos y la sincronización con OTAs están en piloto con los primeros hoteles.",
      },
      {
        type: "features",
        heading: "Tres formas de conectar",
        items: [
          {
            title: "Use el PMS incluido",
            body: "El camino más rápido y sin costo adicional. Cargamos habitaciones, tarifas y políticas y queda operando en días.",
            href: "/hoteles/pms",
          },
          {
            title: "Conecte su PMS por API",
            body: "El agente lee disponibilidad y escribe reservas en su sistema. Su equipo sigue trabajando donde ya sabe.",
          },
          {
            title: "Conecte por channel manager",
            body: "Si su distribución pasa por un channel manager, sincronizamos tarifas y disponibilidad por ahí y las reservas de OTA entran solas.",
            href: "/hoteles/otas",
          },
        ],
      },
      {
        type: "prose",
        heading: "Y si su PMS no tiene API",
        body: [
          "Pasa más de lo que parece, sobre todo con sistemas locales veteranos. En esos casos no fingimos una integración que no existe: le mostramos las opciones reales —un puente por channel manager, una migración al PMS incluido, o trabajar en paralelo mientras decide— y le decimos con franqueza cuál conviene.",
          "Preferimos esa conversación incómoda al comienzo antes que un proyecto que se atasca tres meses después.",
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿Con qué PMS se integra conagentes?",
            a: "Trabaja con su propio PMS incluido y se conecta con PMS y channel managers de mercado —incluidos LobbyPMS, Cloudbeds y Mews— por API o por puente de channel manager. Si su sistema no está en la lista, lo evaluamos antes de comprometer nada. Las conexiones con PMS externos están en piloto.",
          },
          {
            q: "¿Cuánto cuesta la integración?",
            a: "La conexión con las herramientas soportadas hace parte de la puesta en marcha. Si su caso requiere desarrollo específico se lo decimos antes de empezar, con alcance y tiempo, no después.",
          },
          {
            q: "¿Puedo empezar sin integrar nada?",
            a: "Sí, y es lo que hacen la mayoría de los hoteles: arrancan con el PMS incluido y WhatsApp, ven resultados, y después conectan lo demás. Es el camino de menos riesgo.",
          },
          {
            q: "¿Mi contador puede seguir con su software?",
            a: "Sí. La facturación electrónica se emite ante la DIAN y exportamos el paquete mensual que su contador necesita, además de integrarnos con plataformas contables como Alegra y Siigo.",
          },
        ],
      },
    ],
    related: [
      { label: "PMS incluido", href: "/hoteles/pms" },
      { label: "Mensajes de OTAs", href: "/hoteles/otas" },
      { label: "Cobros en el chat", href: "/hoteles/cobros" },
    ],
    cta: {
      title: "Díganos qué usa hoy y le decimos cómo se conecta",
      sub: "Veinte minutos: su PMS, su channel manager, su pasarela de pago y su contador. Sale con el mapa de conexión de su hotel.",
      button: "Quiero revisar mis integraciones",
    },
  },

  /* ─────────────────────── recursos ─────────────────────── */
  {
    slug: "hoteles/recursos",
    experience: "hotel",
    eyebrow: "Recursos",
    title: "Recursos para hoteleros",
    lede: "Guías y herramientas para vender más directo, subir el ticket y depender menos de las OTAs. Sin relleno y sin pedirle el correo por cada descarga.",
    answer:
      "Los recursos de conagentes para hoteleros incluyen la guía completa de automatización de un hotel con IA, calculadoras de comisión de OTA y de ingreso por upsell con los datos de su propio hotel, la explicación del cumplimiento colombiano (factura DIAN, registro TRA y reporte SIRE) y un blog con contenido sobre venta directa y tecnología hotelera en Latinoamérica.",
    meta: {
      title: "Recursos para hoteles: guías, calculadoras y buenas prácticas",
      description:
        "Guía de automatización hotelera con IA, calculadora de comisión de OTA, calculadora de upsell, cumplimiento colombiano y blog para hoteles de Colombia y Latinoamérica.",
    },
    keywords: [
      "guías para hoteleros Colombia",
      "calculadora comisión OTA",
      "recursos hotelería Latinoamérica",
      "blog hotelero",
    ],
    entities: [...ENTIDADES_BASE, "Cotelco"],
    updated: UPDATED,
    sections: [
      {
        type: "features",
        heading: "Empiece por acá",
        items: [
          {
            title: "Guía: automatizar un hotel con IA",
            body: "Los seis pasos en orden, los cuatro errores que hunden el proyecto y la tabla de exigencias para llevar a cualquier demo.",
            href: "/hoteles/automatizar-hotel-con-ia",
          },
          {
            title: "Calculadora: ¿cuánta comisión paga?",
            body: "Con sus habitaciones, su tarifa y su ocupación: lo que le cuestan las OTAs este año.",
            href: "/hoteles/reservas-directas",
          },
          {
            title: "Calculadora: ¿cuánto deja el upsell?",
            body: "El ingreso extra por huésped que hoy no está entrando, con las mismas habitaciones.",
            href: "/hoteles/upsell",
          },
          {
            title: "Cumplimiento colombiano explicado",
            body: "Factura electrónica DIAN, registro de huéspedes TRA y reporte SIRE: qué es cada uno y cómo se automatiza.",
            href: "/hoteles/factura-dian-sire",
          },
          {
            title: "Las cuatro cuentas del ROI",
            body: "Dónde está la plata que se escapa y qué parte puede recuperar un agente.",
            href: "/hoteles/resultados",
          },
          { title: "Blog hotelero", body: "Venta directa, revenue management, tecnología hotelera e IA aplicada, en español. Lunes, miércoles y viernes.", href: "/hoteles/blog" },
          {
            title: "Qué exigirle a cualquier herramienta",
            body: "La tabla comparativa de capacidades, con nuestros propios pendientes marcados.",
            href: "/hoteles/automatizar-hotel-con-ia",
          },
          { title: "Centro de ayuda", body: "Documentación de la plataforma y soporte.", href: "/recursos/ayuda" },
          { title: "Precios", body: "Los dos modelos, explicados sin letra menuda.", href: "/hoteles/precios" },
        ],
      },
      {
        type: "prose",
        heading: "Cómo escribimos esto",
        body: [
          "Todos los datos de mercado que citamos vienen de fuentes públicas y los nombramos: Cotelco para ocupación y facturación del sector hotelero colombiano, referencias públicas de la industria para comisiones de OTA y conversión de upsell, y estudios de atención comercial para el efecto del tiempo de respuesta.",
          "Los datos de nuestra plataforma —tiempos de respuesta del agente, acciones ejecutadas— salen de la operación real. Cuando algo es una estimación, lo decimos. Cuando algo todavía no existe, lo marcamos como en construcción.",
        ],
      },
    ],
    related: [
      { label: "conagentes para hoteles", href: "/hoteles" },
      { label: "Precios", href: "/hoteles/precios" },
      { label: "Blog hotelero", href: "/hoteles/blog" },
    ],
    cta: {
      title: "¿Prefiere verlo funcionando?",
      sub: "Las guías sirven, pero veinte minutos con su propio hotel adentro explican más que cualquier PDF.",
      button: "Quiero ver mi hotel adentro",
    },
  },

  /* ─────────────────────── precios ─────────────────────── */
  {
    slug: "hoteles/precios",
    experience: "hotel",
    eyebrow: "Precios",
    title: "Dos formas de trabajar con nosotros. Una es pagar solo si vende",
    lede: "Sabemos lo que pesa firmar software en un año flojo. Por eso puede elegir: tarifa fija y 0 % de comisión, o una base baja y una comisión pequeña solo sobre lo que el agente cierre de verdad. Si el agente no vende, casi no nos paga.",
    answer:
      "conagentes ofrece dos modelos de precio para hoteles: un plan de tarifa fija mensual con 0 % de comisión sobre las ventas del agente, ideal para costo predecible; y un plan por resultados con una base mensual baja más una comisión pequeña únicamente sobre las reservas, el upsell y las reactivaciones que el agente cierre. En el plan por resultados solo se cobra sobre estadías realizadas y sobre ventas generadas por el agente, nunca sobre reservas que el hotel ya tenía. El PMS está incluido en ambos planes.",
    heroChips: [
      "PMS incluido en los dos planes",
      "Sin cobro por usuario",
      "Cotización a la medida en 20 minutos",
    ],
    meta: {
      title: "Precios para hoteles: tarifa fija o pago por resultados",
      description:
        "Dos planes para hoteles: tarifa fija mensual con 0 % de comisión, o base baja más comisión pequeña solo sobre las reservas, el upsell y las reactivaciones que cierre el agente IA. PMS incluido.",
    },
    keywords: [
      "precio software hotelero Colombia",
      "cuánto cuesta un agente de IA para hotel",
      "pago por resultados software hotel",
      "PMS gratis con IA",
    ],
    entities: [...ENTIDADES_BASE, "COP"],
    updated: UPDATED,
    sections: [
      {
        type: "features",
        heading: "Dos planes, usted decide",
        sub: "El mismo producto completo en los dos. La diferencia es cómo prefiere pagarlo.",
        items: [
          {
            title: "Plan tarifa fija",
            body: "Una mensualidad más alta y 0 % de comisión sobre todo lo que venda el agente. Para hoteles que quieren un costo predecible y quedarse con el 100 % del upside.",
          },
          {
            title: "Plan por resultados",
            body: "Base mensual baja más una comisión pequeña solo sobre reservas, upsell y reactivación que cierre el agente. Paga más cuando vende más — y casi nada si no vende.",
          },
          {
            title: "PMS incluido en ambos",
            body: "Habitaciones, tarifas, reservas, disponibilidad y servicios. Sin licencia aparte ni cobro por habitación.",
          },
          {
            title: "Sin cobro por usuario",
            body: "Todo su equipo entra a la plataforma. No cobramos por asiento: eso solo lleva a que la gente comparta contraseñas.",
          },
          {
            title: "Sin contrato eterno",
            body: "Si no funciona, se va. Preferimos que se quede porque le sirve, no porque firmó dos años.",
          },
          {
            title: "Puesta en marcha acompañada",
            body: "Cargamos sus datos, definimos los límites del agente y probamos antes de que atienda huéspedes. No lo dejamos solo con un panel.",
          },
        ],
      },
      {
        type: "compare",
        heading: "Cómo elegir",
        sub: "No hay respuesta universal. Depende de qué le preocupa más.",
        before: {
          label: "Elija tarifa fija si…",
          items: [
            "Necesita un costo fijo para el presupuesto del año.",
            "Su hotel ya vende bien directo y el agente va a mover mucho volumen.",
            "Prefiere quedarse con todo el upside, aunque el fijo sea más alto.",
            "Le incomoda la idea de una comisión variable, por pequeña que sea.",
          ],
        },
        after: {
          label: "Elija por resultados si…",
          items: [
            "Quiere probar sin exponer caja: si no vende, casi no paga.",
            "Su ocupación es estacional y prefiere que el costo siga la temporada.",
            "Quiere que nuestro incentivo esté alineado con el suyo.",
            "Prefiere que le demostremos el valor antes de comprometer un fijo alto.",
          ],
        },
        footnote:
          "Muchos hoteles empiezan por resultados y se pasan a fijo cuando el volumen lo justifica. Ese cambio no tiene penalidad.",
      },
      {
        type: "prose",
        heading: "Qué contamos y qué no, en el plan por resultados",
        body: [
          "Esta es la parte donde suele estar la trampa en otros contratos, así que la escribimos claro.",
          "**Contamos:** reservas directas que el agente cotizó y cerró; complementos y servicios que el agente vendió (upgrade, early y late check-out, desayuno, traslados, spa, tours); y reservas de huéspedes anteriores que el agente reactivó por iniciativa propia. Y solo sobre estadías realizadas: si la reserva se cancela y no hay huésped, no hay comisión.",
          "**No contamos:** reservas que ya eran suyas —el huésped que llamó al hotel, el que reservó en el mostrador, el que entró por su motor o por una OTA sin que el agente participara—; ni reservas que se cancelaron; ni el upsell que vendió su propio equipo. No cobramos por trabajo que no hicimos.",
          "Cada peso que facturamos está trazado a la conversación y a las acciones que lo generaron. Puede auditarlo cuando quiera.",
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre precios",
        items: [
          {
            q: "¿Cuánto cuesta conagentes para un hotel?",
            a: "Depende del tamaño del hotel, del volumen de conversaciones y del plan que elija. Hay dos modelos: tarifa fija mensual con 0 % de comisión, o base mensual baja más una comisión pequeña solo sobre lo que el agente cierre. La cotización exacta se arma en una llamada de veinte minutos con los datos de su hotel: no publicamos una tabla porque un hotel de 12 habitaciones y uno de 90 no deberían pagar lo mismo.",
          },
          {
            q: "¿El PMS se cobra aparte?",
            a: "No. El PMS está incluido en los dos planes, sin licencia ni cobro por habitación. Tampoco cobramos por usuario de la plataforma.",
          },
          {
            q: "¿Hay costo de implementación?",
            a: "La puesta en marcha estándar —carga de habitaciones, tarifas y políticas, conexión de WhatsApp, definición de límites del agente y pruebas— hace parte del arranque. Si su caso necesita desarrollo específico, se lo decimos con alcance y precio antes de empezar.",
          },
          {
            q: "¿Y si quiero salirme?",
            a: "Se sale. Sus datos son suyos y se los entregamos. No trabajamos con contratos de permanencia largos porque un hotel que se queda a la fuerza no le sirve a nadie.",
          },
          {
            q: "¿Cobran por mensaje de WhatsApp?",
            a: "Los costos de la plataforma de WhatsApp los define Meta y se manejan con transparencia: le mostramos exactamente qué es tarifa nuestra y qué es costo de Meta. No hay márgenes escondidos ahí.",
          },
        ],
      },
    ],
    related: [
      { label: "Resultados y ROI", href: "/hoteles/resultados" },
      { label: "El agente IA", href: "/hoteles/agente-ia" },
      { label: "PMS incluido", href: "/hoteles/pms" },
    ],
    cta: {
      title: "Le armamos su cotización",
      sub: "Veinte minutos con los números de su hotel y sale con una propuesta concreta y el plan que le conviene.",
      button: "Quiero mi cotización",
    },
  },
];
