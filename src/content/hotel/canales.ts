import type { MarketingPage } from "../pages.types";
import { DATOS, ENTIDADES_BASE, UPDATED } from "./shared";

/**
 * CANALES — the surfaces the agent works on that need their own explanation
 * because they behave differently: OTA inboxes (policy-constrained) and the
 * telephone (no links, no visuals).
 */
export const HOTEL_CANALES: MarketingPage[] = [
  /* ────────────────────────── OTAs ────────────────────────── */
  {
    slug: "hoteles/otas",
    experience: "hotel",
    eyebrow: "Canales",
    title: "Las OTAs no son el enemigo. La dependencia sí",
    lede: "Booking, Airbnb y Expedia le traen huéspedes que usted solo no alcanzaría. El problema empieza cuando son el único canal, cuando sus mensajes se quedan sin responder tres horas, y cuando el 20 % de cada noche se va en comisión. El agente atiende esas bandejas y convierte a esos huéspedes en clientes suyos.",
    answer:
      "conagentes conecta las bandejas de mensajes de Booking.com, Airbnb y Expedia a la misma bandeja del hotel, donde el agente IA las responde en segundos respetando las políticas de cada plataforma: dentro de un hilo de OTA no comparte links de pago ni datos de contacto ni intenta llevarse al huésped fuera. La mensajería de OTAs está en vivo. Además sincroniza tarifas y disponibilidad con las OTAs a través de un channel manager, una conexión que sigue en piloto.",
    heroChips: [
      "Booking · Airbnb · Expedia en una bandeja",
      "Respeta la política de cada plataforma",
      "Tarifas y disponibilidad sincronizadas",
    ],
    meta: {
      title: "Responder mensajes de Booking y Airbnb con IA — hoteles",
      description:
        "El agente IA responde los mensajes de Booking.com, Airbnb y Expedia desde una sola bandeja, respetando las políticas de cada OTA, y sincroniza tarifas y disponibilidad vía channel manager.",
    },
    keywords: [
      "responder mensajes Booking automáticamente",
      "IA para mensajes de Airbnb",
      "channel manager con inteligencia artificial",
      "reducir comisión OTA hotel",
      "sincronizar tarifas OTAs Colombia",
      "puntaje de respuesta Booking",
    ],
    entities: [
      ...ENTIDADES_BASE,
      "Despegar",
      "Trivago",
      "channel manager",
      "OTA",
    ],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "La cuenta que casi nadie hace",
        body: [
          DATOS.comision,
          "Traducido: por cada noche de $340.000 que le entra por Booking, entre $51.000 y $85.000 no llegan a su hotel. Si esa misma noche entra directo, el costo real es de unos $15.000. La diferencia, repetida cientos de veces al año, es la utilidad de su hotel.",
          "Pero hay algo más urgente que la comisión, y es el silencio. Las OTAs miden cuánto tarda usted en responder y eso afecta su posición en los resultados. Un hotel que contesta en minutos aparece mejor rankeado que uno que contesta al otro día — y aparecer mejor rankeado es exactamente lo que usted está comprando con esa comisión.",
        ],
        bullets: [
          "Cada mensaje de OTA respondido en segundos, incluso de noche y en otro idioma.",
          "Mejor tiempo de respuesta, mejor posición en la plataforma que le cobra comisión.",
          "El huésped que llegó por OTA se convierte en un huésped suyo para la próxima vez.",
        ],
      },
      {
        type: "chat",
        heading: "Dentro de un hilo de Booking, el agente juega con las reglas de Booking",
        sub: "Esto es lo que casi ninguna herramienta hace bien: entender que cada canal tiene límites y respetarlos sin dejar de vender.",
        channel: "booking",
        who: "Hans Müller · Reserva 4471-2290",
        thread: [
          { from: "guest", text: "Hallo! Is late check-out possible on Sunday? We fly at 8 pm." },
          {
            from: "ai",
            text: "Hi Hans! Yes — with a flight at 8 p. m., late check-out until 4 p. m. works well. It is COP 90,000 and I can add it to your reservation.",
          },
          { from: "guest", text: "Please add it. Can I pay at the hotel?" },
          {
            from: "ai",
            text: "Of course. It will be charged to your room at check-out. I have noted it on reservation 4471-2290 — the front desk already has it.",
          },
          { from: "guest", text: "Perfect. Also, is there airport transfer?" },
          {
            from: "ai",
            text: "Yes, we run a private transfer to the airport for COP 85,000. Sunday 5 p. m. would give you plenty of time. Shall I book it and charge it to your room as well?",
          },
        ],
        notes: [
          {
            at: 1,
            label: "Vendió, pero no envió un link",
            body: "Dentro de un hilo de OTA compartir links de pago viola la política de la plataforma y pone en riesgo la cuenta del hotel. El agente lo sabe: cobra con cargo a la habitación en vez de mandar un link.",
          },
          {
            at: 3,
            label: "No intentó sacarlo de la plataforma",
            body: "No pidió el WhatsApp, no dio un correo, no sugirió reservar directo. Esa disciplina es lo que mantiene su cuenta de Booking sana — y es una restricción que el sistema aplica solo, no una instrucción que alguien tiene que recordar.",
          },
          {
            at: 5,
            label: "Respondió en alemán… y en inglés",
            body: "Contesta en el idioma del huésped, entre 32 disponibles. En temporada, buena parte de los mensajes de OTA de un hotel colombiano no llegan en español — y el que se queda sin responder por eso es una noche perdida.",
          },
        ],
      },
      {
        type: "flow",
        heading: "Cómo el huésped de OTA se vuelve un huésped suyo",
        sub: "La estrategia no es pelear con las OTAs. Es dejar de pagar comisión dos veces por la misma persona.",
        nodes: [
          {
            icon: "mundo",
            title: "Llega por la OTA",
            body: "Paga su comisión una vez. Está bien: la OTA hizo su trabajo, le trajo un huésped que usted no tenía.",
            tag: "Primera vez",
          },
          {
            icon: "trato",
            title: "Lo atiende impecable",
            body: "El agente responde en segundos en su idioma, agenda sus servicios y resuelve todo durante la estadía. La experiencia queda buena.",
            tag: "Durante",
          },
          {
            icon: "datos",
            title: "Queda como suyo",
            body: "Cuando el huésped escribe por WhatsApp durante la estadía, pasa a ser un contacto directo del hotel — con su historial y sus preferencias.",
            tag: "Puente",
          },
          {
            icon: "volver",
            title: "Vuelve directo",
            body: "En su próxima temporada, el agente lo invita a volver por WhatsApp. Esa segunda reserva no paga comisión.",
            tag: "Segunda vez",
          },
        ],
        footnote:
          "El contacto directo se construye dentro de las reglas: durante la estadía, cuando el huésped ya está en el hotel y escribe por su cuenta. Nunca desviándolo en el hilo de la OTA.",
      },
      {
        type: "features",
        heading: "Distribución, además de mensajes",
        sub: "Responder es la mitad. La otra mitad es que sus tarifas y su disponibilidad estén bien en todos lados.",
        items: [
          {
            title: "Tarifas y disponibilidad sincronizadas",
            body: "Un cambio de tarifa o una habitación que se vende se refleja en las OTAs. Sin sobreventas por descuido.",
          },
          {
            title: "Conexión certificada",
            body: "La sincronización se hace a través de un channel manager certificado, con la conexión validada de punta a punta.",
          },
          {
            title: "Reservas de OTA en su PMS",
            body: "Las reservas que entran por OTA aparecen en el PMS incluido, no en una bandeja aparte.",
            href: "/hoteles/pms",
          },
          {
            title: "Paridad respetada",
            body: "Las sugerencias de tarifa tienen en cuenta su estrategia de canales y sus compromisos de paridad.",
            href: "/hoteles/revenue-manager",
          },
          {
            title: "Un solo lugar para todo",
            body: "Mensajes de OTA, WhatsApp, Instagram y web en la misma bandeja, con el mismo equipo.",
            href: "/hoteles/recepcion-24-7",
          },
          {
            title: "Cumplimiento por canal",
            body: "El sistema sabe qué puede y qué no puede hacer en cada plataforma, y lo aplica solo.",
            href: "/hoteles/control-y-seguridad",
          },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre OTAs y comisiones",
        items: [
          {
            q: "¿Puede la IA responder los mensajes de Booking.com y Airbnb?",
            a: "Sí. Las bandejas de mensajes de Booking.com, Airbnb y Expedia llegan a la bandeja de conagentes y el agente IA las responde en segundos, en el idioma del huésped, respetando las políticas de cada plataforma. Está en vivo.",
          },
          {
            q: "¿Me pueden bloquear la cuenta de Booking por usar IA?",
            a: "El riesgo real no es usar IA: es lo que se diga en el hilo. Compartir links de pago, dar datos de contacto o intentar llevarse al huésped fuera de la plataforma sí viola las políticas. Por eso el agente tiene esas acciones deshabilitadas por diseño dentro de un hilo de OTA: no depende de que alguien se acuerde de la regla.",
          },
          {
            q: "¿Cuánto se ahorra un hotel al pasar reservas de OTA a directo?",
            a: "Depende de su mezcla, pero la aritmética es estable: una reserva por OTA cuesta entre 15 % y 25 % del valor de la noche, y una directa entre 2 % y 5 % con todo incluido. Mover diez puntos de la mezcla hacia el directo suele valer decenas de millones de pesos al año en un hotel mediano. En la página de resultados hay una calculadora con sus propios números.",
          },
          {
            q: "¿Tengo que dejar las OTAs?",
            a: "No, y no se lo recomendaríamos. Las OTAs son un canal de adquisición legítimo: le traen huéspedes que no lo conocen. La meta no es cero OTA, es dejar de depender de ellas y no pagar comisión dos veces por el mismo huésped.",
          },
          {
            q: "¿Funciona con Despegar y otras OTAs regionales?",
            a: "La sincronización de tarifas y disponibilidad cubre las OTAs conectadas al channel manager, incluidas las regionales. La mensajería depende de que la plataforma exponga su bandeja; hoy trabajamos con Booking.com, Airbnb y Expedia.",
          },
        ],
      },
    ],
    related: [
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "Integraciones", href: "/hoteles/integraciones" },
      { label: "Recepción 24/7", href: "/hoteles/recepcion-24-7" },
      { label: "Resultados y ROI", href: "/hoteles/resultados" },
    ],
    cta: {
      title: "¿Quiere que los mensajes de sus OTAs se respondan solos?",
      sub: "Veinte minutos y le mostramos cómo quedaría su bandeja con Booking, Airbnb y Expedia adentro — y qué hace el agente para que ese huésped vuelva directo.",
      button: "Quiero ver mi bandeja",
    },
  },

  /* ────────────────────────── voz ────────────────────────── */
  {
    slug: "hoteles/voz",
    experience: "hotel",
    eyebrow: "Canales",
    title: "El teléfono del hotel, contestado siempre",
    lede: "En temporada alta el teléfono suena y nadie puede contestarlo: hay tres personas en el mostrador y una fila de check-in. Cada timbre perdido es un huésped que llama al hotel de al lado. El agente de voz contesta, entiende y resuelve — y cuando hace falta un link, sigue por WhatsApp.",
    answer:
      "El agente de voz de conagentes contesta el teléfono del hotel con una voz natural en español colombiano, entiende lo que pide quien llama, consulta disponibilidad y tarifas en el PMS, toma los datos y resuelve consultas frecuentes. Como en una llamada no se pueden enviar links, cuando hace falta cotizar o cobrar continúa la conversación por WhatsApp. Está en piloto con los primeros hoteles.",
    heroChips: [
      "Voz natural en español colombiano",
      "Consulta disponibilidad en la llamada",
      "En piloto con los primeros hoteles",
    ],
    meta: {
      title: "Agente de voz con IA para contestar el teléfono del hotel",
      description:
        "Agente de voz con inteligencia artificial que contesta el teléfono del hotel en español colombiano, consulta disponibilidad en el PMS, resuelve consultas y continúa por WhatsApp cuando se necesita un link de pago.",
    },
    keywords: [
      "recepcionista virtual telefónica hotel",
      "IA que contesta el teléfono hotel",
      "agente de voz hotelería español",
      "call center hotel automatizado",
      "no perder llamadas hotel",
    ],
    entities: [...ENTIDADES_BASE, "PSTN", "PMS"],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "La llamada perdida es la venta más invisible que existe",
        body: [
          "Un mensaje de WhatsApp sin responder por lo menos queda ahí, acusando. Una llamada perdida no deja rastro: nadie sabe quién era, qué quería ni cuánto iba a gastar. Simplemente no pasó nada.",
          "En hoteles pequeños y medianos de Colombia el teléfono sigue siendo un canal de venta grande, sobre todo para huéspedes mayores, para grupos y para todo lo urgente. Y es el canal que peor se atiende, porque contestar bien una llamada exige a una persona libre en ese segundo exacto.",
          "El agente de voz no reemplaza a su recepcionista en el mostrador. Reemplaza al timbre que suena diez veces y nadie alcanza.",
        ],
      },
      {
        type: "chat",
        heading: "Una llamada real, transcrita",
        sub: "El agente contesta, entiende y hace el puente al canal donde sí se puede cerrar.",
        channel: "voz",
        who: "Llamada entrante · +57 310 ••• ••41",
        thread: [
          { from: "ai", text: "Hotel Bahía Serena, buenas tardes. ¿Con quién tengo el gusto?" },
          { from: "guest", text: "Buenas, con Marta. Quería saber si tienen habitación para el 12 de septiembre, dos noches." },
          {
            from: "ai",
            text: "Con gusto, doña Marta. Para el 12 y 13 de septiembre tengo doble estándar y doble superior disponibles. ¿Van dos personas?",
          },
          { from: "guest", text: "Sí, dos. ¿Cuánto sale la superior?" },
          {
            from: "ai",
            text: "La doble superior está en trescientos veinte mil pesos por noche, con desayuno incluido. Serían seiscientos cuarenta mil por las dos noches.",
          },
          { from: "guest", text: "Me interesa. ¿Cómo hago para reservar?" },
          {
            from: "ai",
            text: "Le puedo mandar la cotización y el link de pago por WhatsApp a este mismo número, así lo tiene por escrito y reserva cuando quiera. ¿Le parece?",
          },
          { from: "guest", text: "Sí, mándemelo." },
          {
            from: "ai",
            text: "Listo, doña Marta, ya se lo envié. Ahí le queda la habitación, el precio y la política de cancelación. Cualquier cosa me escribe por ahí mismo. Feliz tarde.",
          },
        ],
        notes: [
          {
            at: 2,
            label: "Consultó disponibilidad real durante la llamada",
            body: "No dijo «déjeme verificar y le devuelvo la llamada». Consultó el PMS mientras hablaba y ofreció dos opciones concretas.",
          },
          {
            at: 4,
            label: "Dijo los precios en palabras",
            body: "Detalle pequeño y decisivo: por teléfono los números se dicen, no se leen. «Trescientos veinte mil pesos» se entiende; «$320.000» no se escucha.",
          },
          {
            at: 6,
            label: "Hizo el puente a WhatsApp, porque en una llamada no hay links",
            body: "El sistema sabe qué puede hacer cada canal. En una llamada no puede mandar un link de pago, así que ofrece continuar por WhatsApp en vez de intentarlo y fallar.",
          },
        ],
      },
      {
        type: "features",
        heading: "Qué resuelve en la llamada",
        items: [
          { title: "Disponibilidad y tarifas", body: "Consulta el PMS en vivo y responde con opciones concretas." },
          { title: "Preguntas frecuentes", body: "Ubicación, parqueadero, mascotas, horarios, desayuno, servicios." },
          { title: "Toma de datos", body: "Nombre, fechas, número de personas, teléfono — todo queda en la ficha del huésped." },
          { title: "Puente a WhatsApp", body: "Manda cotización, fotos o link de pago al mismo número que llamó." },
          { title: "Traspaso a recepción", body: "Si la llamada necesita a una persona, la transfiere con el contexto." },
          { title: "Registro de la llamada", body: "Transcripción y resumen quedan en la conversación del huésped." },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿Se nota que es una IA?",
            a: "La voz es natural y en español colombiano, y la conversación fluye sin menús ni «marque 1». Si la persona pregunta directamente si está hablando con una máquina, el agente lo dice: no finge ser humano.",
          },
          {
            q: "¿Qué pasa si la persona se enoja o pide hablar con alguien?",
            a: "Transfiere a recepción de inmediato, con el resumen de lo que ya se conversó. Si nadie puede atender en ese momento, toma los datos y avisa a su equipo para devolver la llamada.",
          },
          {
            q: "¿Necesito cambiar el número del hotel?",
            a: "No. El agente contesta el número que sus huéspedes ya conocen, o solo las llamadas que su central le derive, según cómo quiera organizarlo.",
          },
          {
            q: "¿Está disponible hoy?",
            a: "Está en piloto con los primeros hoteles. Los pilotos tienen acompañamiento directo del equipo que lo construyó y ayudan a definir cómo se comporta el agente en su hotel.",
          },
        ],
      },
    ],
    related: [
      { label: "Recepción 24/7", href: "/hoteles/recepcion-24-7" },
      { label: "El agente IA", href: "/hoteles/agente-ia" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
    ],
    cta: {
      title: "¿Quiere que su teléfono no vuelva a timbrar en vano?",
      sub: "El agente de voz está en piloto. Veinte minutos para ver si su hotel encaja en el grupo.",
      button: "Quiero entrar al piloto",
    },
  },
];
