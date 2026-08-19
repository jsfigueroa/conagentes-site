import type { MarketingPage } from "../pages.types";
import { DATOS, ENTIDADES_BASE, HOTEL_CTA, UPDATED } from "./shared";

/**
 * SOLUCIONES — outcomes, by objective. These pages sell the result and link to
 * the platform page that explains the mechanism. They never re-explain it.
 */
export const HOTEL_SOLUCIONES: MarketingPage[] = [
  /* ─────────────────── reservas directas ─────────────────── */
  {
    slug: "hoteles/reservas-directas",
    experience: "hotel",
    eyebrow: "Solución",
    title: "Cada consulta que se enfría es una noche que le vende Booking",
    lede: "El huésped que le escribe directo ya era suyo. Si nadie le responde en minutos, reserva por una OTA y usted paga comisión por un cliente que había llegado solo. El agente responde primero, cotiza con disponibilidad real y cobra en el chat.",
    answer:
      "Para aumentar las reservas directas de un hotel hay que responder más rápido que la OTA y cerrar en el mismo canal. El agente IA de conagentes responde en menos de cinco segundos por WhatsApp, Instagram, web y teléfono, cotiza con la disponibilidad real del PMS, envía el link de pago dentro del chat y confirma la reserva. Una reserva directa cuesta al hotel entre 2 % y 5 %, frente al 15 % a 25 % de comisión de una OTA.",
    heroChips: [
      "0 % de comisión en la reserva directa",
      "Menos de 5 segundos de respuesta",
      "Cobro y confirmación en el chat",
    ],
    meta: {
      title: "Cómo aumentar las reservas directas de su hotel con IA",
      description:
        "Aumente las reservas directas y reduzca la comisión de OTAs: el agente IA responde en segundos por WhatsApp, cotiza con disponibilidad real del PMS y cobra en el chat. Calculadora de ahorro incluida.",
    },
    keywords: [
      "cómo aumentar reservas directas hotel",
      "reducir comisión Booking",
      "reservas directas WhatsApp hotel",
      "estrategia de venta directa hotelera",
      "costo de adquisición reserva directa",
    ],
    entities: [...ENTIDADES_BASE, "Wompi", "Mercado Pago", "Harvard Business Review", "Cotelco"],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "El problema no es su precio. Es su tiempo de respuesta",
        body: [
          "Su hotel ya aparece en Booking y ya tiene Instagram. La gente le escribe. El cuello de botella está en otra parte: no hay quien responda a las 11 de la noche, ni en medio del check-in del sábado, ni en inglés, ni las tres cosas a la vez.",
          DATOS.respuesta,
          "Mientras usted tarda, la OTA no tarda: muestra precio, disponibilidad y confirma en dos clics. Por eso gana. No porque sea más barata para el huésped —muchas veces es igual o más cara— sino porque nunca lo hace esperar.",
        ],
      },
      {
        type: "calc",
        heading: "Cuánto le está costando la comisión",
        sub: "Mueva los datos de su hotel. La cifra grande es lo que le paga a las OTAs este año.",
        variant: "ota",
        footnote:
          "Referencias 2026: Booking.com ronda el 15 % de comisión y Expedia entre 18 % y 22 %; una reserva directa cuesta al hotel entre 2 % y 5 % con pasarela, motor y pauta incluidos. La ocupación por defecto (56 %) es la que Cotelco proyectó para mitad de año 2026 en Colombia.",
      },
      {
        type: "flow",
        heading: "Cómo el agente cierra una reserva directa",
        nodes: [
          {
            icon: "reloj",
            title: "Llega primero",
            body: "Responde en menos de cinco segundos, a cualquier hora y en el idioma del huésped. Antes de que compare con nadie más.",
            tag: "Paso 1",
          },
          {
            icon: "habitacion",
            title: "Cotiza de verdad",
            body: "Consulta el PMS y responde con la habitación exacta que está libre, su tarifa de hoy, fotos y política de cancelación.",
            tag: "Paso 2",
          },
          {
            icon: "cobro",
            title: "Cobra sin fricción",
            body: "Link de pago en el mismo chat, con anticipo si su política lo pide. Cero pasos extra, cero motores externos.",
            tag: "Paso 3",
          },
          {
            icon: "sello",
            title: "Confirma y factura",
            body: "Bloquea la habitación, confirma al huésped y emite la factura electrónica DIAN.",
            tag: "Paso 4",
          },
        ],
        footnote:
          "Y si el huésped no responde, el agente hace un seguimiento en el momento oportuno. La mayoría de las reservas perdidas no se pierden por un «no»: se pierden por un silencio que nadie retomó.",
      },
      {
        type: "compare",
        heading: "La misma consulta, dos hoteles",
        sub: "Un jueves, 10:40 p. m. Alguien busca habitación para el fin de semana y escribe a dos hoteles del mismo nivel.",
        before: {
          label: "El hotel de al lado",
          items: [
            "10:40 p. m. — el mensaje entra. Nadie en el mostrador.",
            "8:15 a. m. — la recepcionista abre WhatsApp: 23 mensajes sin leer.",
            "9:30 a. m. — responde «buenos días, ¿para qué fechas?».",
            "9:31 a. m. — el huésped ya reservó anoche por Booking.",
            "La noche se vendió, sí: con 18 % de comisión.",
            "Y ese huésped nunca quedó en la base de datos del hotel.",
          ],
        },
        after: {
          label: "Su hotel con conagentes",
          items: [
            "10:40 p. m. — el mensaje entra.",
            "10:40 p. m. — el agente responde con la habitación libre y su tarifa.",
            "10:44 p. m. — propone desayuno y traslado; el huésped acepta uno.",
            "10:47 p. m. — link de pago enviado y pagado. Reserva confirmada.",
            "10:47 p. m. — factura DIAN emitida y enviada.",
            "El huésped queda en su base, con nombre, preferencias y WhatsApp.",
          ],
        },
        footnote:
          "Nadie del hotel estaba despierto. La diferencia no fue el precio ni la habitación: fue que uno contestó.",
      },
      {
        type: "stats",
        heading: "Lo que cambia en la mezcla de canales",
        sub: "Las referencias del sector para un hotel independiente que trabaja el directo en serio.",
        items: [
          { value: "15–25 %", label: "cuesta una reserva por OTA" },
          { value: "2–5 %", label: "cuesta una reserva directa, todo incluido" },
          { value: "25–35 %", label: "de reservas directas tiene un hotel independiente típico" },
          { value: "40–60 %", label: "es la meta de un programa de directo maduro" },
        ],
        note: "Referencias públicas de la industria hotelera para 2026. No son promesas de resultado para su hotel: son el rango donde se mueve el problema. En la demo calculamos su punto de partida real.",
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre reservas directas",
        items: [
          {
            q: "¿Cómo puedo aumentar las reservas directas de mi hotel?",
            a: "Responda antes que la OTA y cierre en el mismo canal donde el huésped escribió. En la práctica: atención inmediata 24/7 en WhatsApp, Instagram y teléfono; cotización con disponibilidad y tarifa reales; cobro con link de pago dentro del chat; y seguimiento a quien no respondió. conagentes automatiza esas cuatro cosas con un agente de IA.",
          },
          {
            q: "¿Cuánto cuesta una reserva directa frente a una de OTA?",
            a: "En 2026 una reserva por OTA cuesta entre 15 % y 25 % del valor de la noche en comisión, mientras una reserva directa cuesta al hotel entre 2 % y 5 % contando pasarela de pago, motor de reservas y pauta. Por cada noche de $340.000, la diferencia está entre $36.000 y $70.000 que se quedan en el hotel.",
          },
          {
            q: "¿Esto va a molestar a Booking?",
            a: "No. Usted sigue en Booking, sigue recibiendo sus huéspedes y sigue pagando su comisión por ellos. Lo que cambia es que las personas que le escriben directo ya no terminan reservando por allá por falta de respuesta, y que el huésped que ya vino una vez vuelve por su canal.",
          },
          {
            q: "¿Y si mi hotel no tiene motor de reservas?",
            a: "No lo necesita para empezar. El agente cotiza sobre el PMS incluido y cobra con un link de pago en el chat: es un canal de venta completo sin motor de reservas. Si ya tiene uno, conviven.",
          },
        ],
      },
    ],
    related: [
      { label: "Mensajes de OTAs", href: "/hoteles/otas" },
      { label: "Cobros en el chat", href: "/hoteles/cobros" },
      { label: "Recepción 24/7", href: "/hoteles/recepcion-24-7" },
      { label: "Resultados y ROI", href: "/hoteles/resultados" },
    ],
    cta: HOTEL_CTA,
  },

  /* ─────────────────────── upsell ─────────────────────── */
  {
    slug: "hoteles/upsell",
    experience: "hotel",
    eyebrow: "Solución",
    title: "El huésped ya dijo sí. Es el mejor momento de su año",
    lede: "Conseguir un huésped nuevo cuesta plata y tiempo. Venderle algo más a uno que ya reservó no cuesta casi nada: ya confía, ya está entusiasmado, ya tiene la tarjeta a mano. Ese momento se abre por unas horas y casi ningún hotel lo alcanza a usar.",
    answer:
      "El agente IA de conagentes hace upsell hotelero en el momento con mejor conversión: propone upgrade de habitación, early check-in, late check-out, desayuno, traslado, spa o tours cuando el huésped acaba de reservar y antes de su llegada, y agenda y cobra en la misma conversación. La conversión del upsell hotelero va de 3–5 % en el motor de reservas a 12–18 % en el mensaje previo a la llegada y 22–28 % en el check-in.",
    heroChips: [
      "Margen casi puro por cada complemento",
      "Sin contratar a nadie más",
      "Propone con criterio, no a todos lo mismo",
    ],
    meta: {
      title: "Upsell hotelero con IA: subir el ticket de cada reserva",
      description:
        "El agente IA propone upgrades, early y late check-out, desayuno, traslados, spa y tours en el momento de mayor conversión, y los agenda y cobra en el chat. Más ingreso por huésped sin más habitaciones.",
    },
    keywords: [
      "upsell hotelero",
      "aumentar ticket promedio hotel",
      "vender upgrades de habitación",
      "ingresos complementarios hotel",
      "TRevPAR hotel Colombia",
      "cómo vender late check-out",
    ],
    entities: [...ENTIDADES_BASE, "TRevPAR", "RevPAR", "ADR"],
    updated: UPDATED,
    sections: [
      {
        type: "bars",
        heading: "El upsell tiene una hora de oro, y no es la que usted cree",
        sub: "La misma oferta convierte cinco veces mejor según cuándo se hace. Este es el dato que cambia la estrategia entera.",
        unit: "Conversión del upsell · más es mejor",
        items: [
          { label: "En el motor de reservas, al reservar", value: 16, display: "3–5 %", tone: "muted" },
          { label: "En el correo previo a la llegada", value: 55, display: "12–18 %", tone: "accent" },
          { label: "En el check-in, en el mostrador", value: 92, display: "22–28 %", tone: "accent" },
        ],
        note: "Referencias de conversión del upsell hotelero por etapa, según datos públicos del sector. Su agente trabaja en la etapa previa a la llegada, pero por WhatsApp en vez de correo: eso combina la anticipación del correo con la tasa de apertura del chat, que en hotelería supera el 90 % frente a cerca del 36 % del correo electrónico. Y como también atiende durante la estadía, alcanza el momento del check-in sin ocupar a su recepcionista.",
      },
      {
        type: "chat",
        heading: "Así suena un upsell que no incomoda",
        sub: "La diferencia entre vender y encimar es una sola cosa: proponer lo que resuelve algo que el huésped acaba de contar.",
        channel: "whatsapp",
        who: "Familia Ortiz · Reserva #A-3187",
        thread: [
          {
            from: "ai",
            text: "¡Hola don Julián! Falta poco 😊 Los esperamos el viernes. ¿Vienen manejando o llegan en vuelo?",
          },
          { from: "guest", text: "Llegamos en vuelo, a las 7 de la mañana. Con los dos niños." },
          {
            from: "ai",
            text: "Ah, llegan temprano y con niños — el check-in es a la 1 p. m., así que les tocaría esperar con maletas y todo.",
          },
          {
            from: "ai",
            card: {
              kind: "servicio",
              title: "Habitación lista desde las 9 a. m.",
              lines: ["Para que lleguen y descansen de una", "Incluye desayuno para los 4"],
              price: "$120.000",
            },
          },
          { from: "guest", text: "Uy sí, eso nos salva. Agrégalo." },
          {
            from: "ai",
            text: "Listo ✅ Habitación lista a las 9 a. m. con desayuno para los cuatro. Lo cargué a la reserva.",
          },
          {
            from: "ai",
            text: "Una cosa más y lo dejo tranquilo: tenemos traslado desde el aeropuerto por $85.000 para los cuatro, y con niños y maletas suele valer la pena. ¿Se lo reservo?",
          },
          { from: "guest", text: "Sí, también." },
        ],
        notes: [
          {
            at: 0,
            label: "Empezó preguntando, no ofreciendo",
            body: "«¿Vienen manejando o llegan en vuelo?» no es cortesía: es la pregunta que le dice al agente qué complemento tiene sentido. Sin esa respuesta, cualquier oferta es un tiro al aire.",
          },
          {
            at: 2,
            label: "Nombró el problema antes de vender la solución",
            body: "«Les tocaría esperar con maletas y todo.» El huésped ve el problema, entonces el early check-in deja de ser un extra y se vuelve un alivio. Nadie compra un upgrade; compra no tener que esperar.",
          },
          {
            at: 3,
            label: "Empaquetó en vez de descontar",
            body: "Early check-in con desayuno para cuatro. Subir el valor percibido protege la tarifa; descontar la destruye.",
          },
          {
            at: 6,
            label: "Una sola propuesta más, y avisó que era la última",
            body: "«Una cosa más y lo dejo tranquilo.» El agente tiene un límite explícito de cuánto puede proponer. Un huésped incomodado no compra ni vuelve.",
          },
        ],
      },
      {
        type: "calc",
        heading: "Cuánto vale el complemento en su hotel",
        sub: "Tres números suyos. El resultado es ingreso que hoy no está entrando.",
        variant: "upsell",
        footnote:
          "El cálculo usa sus propios supuestos. Como referencia, la conversión del upsell previo a la llegada en la industria se ubica entre 12 % y 18 %.",
      },
      {
        type: "journey",
        heading: "Qué ofrecer, y cuándo",
        sub: "Cada momento de la estadía tiene su complemento natural. Ofrecer el correcto en el momento equivocado es peor que no ofrecer.",
        stages: [
          {
            label: "Justo al reservar",
            title: "Suba la categoría mientras hay entusiasmo",
            body: "El huésped acaba de decidir. Es el único momento en que comparar habitaciones se siente parte de la ilusión del viaje y no un gasto extra.",
            bullets: [
              "Upgrade de habitación con la diferencia clara en pesos",
              "Desayuno incluido por toda la estadía",
              "Noche adicional cuando las fechas dan",
              "Paquete romántico o de celebración si el contexto lo sugiere",
            ],
            metric: { value: "3–5 %", label: "conversión típica en esta etapa" },
          },
          {
            label: "Antes de llegar",
            title: "Resuelva el viaje, no venda extras",
            body: "Aquí está la mejor conversión de todo el upsell. El huésped está organizando la logística y agradece que alguien se le adelante.",
            bullets: [
              "Early check-in y late check-out según su vuelo",
              "Traslado desde el aeropuerto o la terminal",
              "Spa o masaje reservado para el día de llegada",
              "Tour con cupo apartado antes de que se llene",
            ],
            metric: { value: "12–18 %", label: "conversión típica en esta etapa" },
          },
          {
            label: "Durante la estadía",
            title: "Sea el conserje que responde al instante",
            body: "El huésped está en la habitación con el celular en la mano. Pedir por WhatsApp es más fácil que bajar a recepción, y por eso pide más.",
            bullets: [
              "Restaurante, room service, mesa en la terraza",
              "Tours para el día siguiente",
              "Late check-out cuando queda disponible",
              "Servicios del hotel que el huésped no sabía que existían",
            ],
            metric: { value: "22–28 %", label: "conversión típica de la oferta en el hotel" },
          },
          {
            label: "Al salir",
            title: "Cierre con la próxima reserva, no con la factura",
            body: "El último mensaje de una estadía buena es el mejor momento comercial que va a tener con esa persona en todo el año.",
            bullets: [
              "Agradecimiento y reseña en el momento justo",
              "Tarifa de huésped que vuelve, para reservar directo",
              "Preferencias guardadas para la próxima visita",
              "Invitación para su temporada favorita",
            ],
          },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre upsell hotelero",
        items: [
          {
            q: "¿Cuál es el mejor momento para hacer upsell en un hotel?",
            a: "El mensaje previo a la llegada y el check-in son los momentos con mejor conversión: entre 12 % y 18 % en el pre-arrival y entre 22 % y 28 % en el check-in, contra 3 % a 5 % en el motor de reservas. La razón es que el huésped ya decidió venir y está resolviendo la logística del viaje, no evaluando si viaja.",
          },
          {
            q: "¿No se van a molestar mis huéspedes con tantas ofertas?",
            a: "Se molestan con ofertas genéricas y repetidas. El agente propone cuando hay una razón concreta en la conversación, empaqueta en vez de descontar, y tiene un límite explícito de cuántas propuestas puede hacer. Usted define qué se puede ofrecer, a quién y en qué momentos.",
          },
          {
            q: "¿Qué se puede vender además de la habitación?",
            a: "Upgrade de categoría, early check-in, late check-out, desayuno, noche adicional, traslados, spa, tours, mesas del restaurante, paquetes de celebración y cualquier servicio que tenga horario, capacidad y precio. Todos se agendan y se cobran en la conversación.",
          },
          {
            q: "¿Por qué el upsell mejora tanto el margen?",
            a: "Porque no hay costo de adquisición: el huésped ya está captado y pagado. El ingreso del complemento cae casi completo al margen, y es lo que separa un hotel con RevPAR plano de uno que crece en ingreso total por habitación (TRevPAR).",
          },
        ],
      },
    ],
    related: [
      { label: "Agenda de servicios", href: "/hoteles/agenda-servicios" },
      { label: "Reactivación de huéspedes", href: "/hoteles/reactivacion" },
      { label: "Revenue Manager", href: "/hoteles/revenue-manager" },
    ],
    cta: HOTEL_CTA,
  },

  /* ────────────────────── reactivación ────────────────────── */
  {
    slug: "hoteles/reactivacion",
    experience: "hotel",
    eyebrow: "Solución",
    title: "Su mejor lista de clientes lleva años en su recepción",
    lede: "Todos los que se hospedaron en su hotel ya confiaron en usted una vez. Ya sabe cómo les gusta la habitación, cuándo viajan y con quién vienen. Traerlos de vuelta cuesta una fracción de conseguir a alguien nuevo — y casi ningún hotel colombiano lo hace de forma sistemática.",
    answer:
      "conagentes reactiva a los huéspedes anteriores de un hotel: identifica quién ya se hospedó, cuándo viaja normalmente y qué le gustó, y el agente IA le escribe uno a uno por WhatsApp en el momento oportuno para que vuelva a reservar directo, sin comisión de OTA. Son mensajes personales basados en el historial real del huésped, no envíos masivos.",
    heroChips: [
      "0 % de comisión: vuelve directo",
      "Mensajes uno a uno, no masivos",
      "Sobre la base que ya tiene",
    ],
    meta: {
      title: "Reactivación de huéspedes con IA: que vuelvan directo",
      description:
        "El agente IA identifica a los huéspedes anteriores del hotel y los invita a volver directo por WhatsApp en el momento oportuno, con mensajes personales basados en su historial. Sin comisión de OTA.",
    },
    keywords: [
      "reactivar huéspedes hotel",
      "campañas WhatsApp hotel",
      "huésped repetitivo hotelería",
      "fidelización hotel Colombia",
      "base de datos de huéspedes",
    ],
    entities: [...ENTIDADES_BASE, "CRM hotelero"],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "El activo que su hotel ya tiene y no usa",
        body: [
          "Cada huésped que pasó por su hotel dejó tres cosas: un nombre, un número de teléfono y una experiencia. Si la experiencia fue buena, ese número vale más que cualquier lista de contactos comprada y que cualquier campaña en redes.",
          "Y sin embargo casi nadie lo trabaja. Los datos quedaron en un cuaderno, en un Excel de recepción o dentro de la plataforma de la OTA que lo trajo. Nadie tiene tiempo de escribirle uno por uno a cuatrocientas personas en el momento en que a cada una le sirve.",
          DATOS.whatsapp +
            " Eso significa que el mensaje al huésped que ya lo conoce prácticamente siempre se lee. La pregunta nunca fue si funciona: fue quién lo escribe.",
        ],
        bullets: [
          "El huésped que vuelve directo no paga comisión de OTA.",
          "Ya sabe cómo funciona su hotel, así que exige menos operación y se queja menos.",
          "Suele gastar más en servicios: confía y conoce lo que hay.",
        ],
      },
      {
        type: "chat",
        heading: "Un mensaje que se siente escrito por una persona",
        sub: "Porque está escrito con información real: cuándo vino, con quién, qué habitación tuvo, qué le gustó.",
        channel: "whatsapp",
        who: "Lucía Fernández · Huésped desde 2024",
        thread: [
          {
            from: "ai",
            text: "¡Hola doña Lucía! Le escribo del Hotel Bahía Serena 🌊 El año pasado estuvo con nosotros la última semana de octubre, en la suite con vista al mar.",
          },
          {
            from: "ai",
            text: "Ya estamos armando esa temporada y quería avisarle antes de abrirla en las plataformas: la misma suite está libre esas fechas.",
          },
          {
            from: "ai",
            card: {
              kind: "habitacion",
              title: "Suite Vista al Mar",
              banner: "La misma del año pasado",
              lines: ["Última semana de octubre", "Tarifa de huésped que vuelve"],
              price: "$410.000 / noche",
            },
          },
          { from: "guest", text: "¡Qué memoria! Sí, estábamos pensando en volver. ¿Esa tarifa hasta cuándo me la guarda?" },
          {
            from: "ai",
            text: "Se la mantengo cinco días. Y si viene otra vez con don Ernesto, le dejo anotado lo del café descafeinado en la mañana 😊",
          },
          { from: "guest", text: "Jajaja sí, eso mismo. Déjame confirmar con él y te escribo mañana." },
          {
            from: "ai",
            text: "Perfecto, sin apuro. Le escribo el jueves para saber si sigue en pie. Un abrazo 🙌",
          },
        ],
        notes: [
          {
            at: 0,
            label: "Recordó lo específico, no lo genérico",
            body: "«La última semana de octubre, en la suite con vista al mar.» No es «vuelva pronto»: es una prueba de que el hotel se acuerda de ella. Eso no se puede fingir con un envío masivo.",
          },
          {
            at: 1,
            label: "Le dio prioridad real, no urgencia inventada",
            body: "«Antes de abrirla en las plataformas» es verdad y es un privilegio genuino. Es exclusividad, no presión — y es el argumento más fuerte para reservar directo.",
          },
          {
            at: 4,
            label: "Usó un detalle mínimo que vale más que un descuento",
            body: "El café descafeinado. Ese detalle está en la ficha del huésped desde su última estadía, y es lo que hace que un hotel se sienta suyo.",
          },
          {
            at: 6,
            label: "Se retiró bien y agendó el seguimiento",
            body: "No insistió. Fijó un momento concreto para volver y ahí sí volverá. La mayoría de las reservas se pierden en el silencio posterior a un «déjame confirmar».",
          },
        ],
      },
      {
        type: "features",
        heading: "Cuándo escribir, y a quién",
        sub: "La reactivación no es un envío masivo. Es la persona correcta en el momento correcto.",
        items: [
          {
            title: "Su temporada",
            body: "Al huésped que vino en Semana Santa se le escribe antes de Semana Santa, no en noviembre.",
          },
          {
            title: "El aniversario",
            body: "«Hace un año estuvo con nosotros» es una de las razones más honestas para escribir.",
          },
          {
            title: "Fechas por llenar",
            body: "Un martes flojo se llena primero con quien ya conoce el hotel y no necesita ser convencido.",
          },
          {
            title: "Cumpleaños y celebraciones",
            body: "Si el dato está, el agente lo usa con criterio y sin sonar a plantilla.",
          },
          {
            title: "El que preguntó y no reservó",
            body: "Cotizó hace tres meses y se enfrió. Sigue siendo el contacto más caliente que tiene.",
          },
          {
            title: "El huésped frecuente",
            body: "Al que ya vino tres veces se le habla distinto: con acceso primero y tarifa de siempre.",
          },
        ],
      },
      {
        type: "prose",
        heading: "Sin quemar su base de datos",
        body: [
          "Una lista de huéspedes se destruye rápido: dos promociones genéricas seguidas y la gente bloquea el número. Nosotros tratamos esa base como el activo escaso que es.",
          "Hay límites explícitos de cuántos mensajes puede recibir una persona en un periodo, la conversación siempre deja salida clara para quien no quiere más mensajes, y el agente respeta las reglas de la ventana de mensajería de WhatsApp en lugar de forzarlas. Un contacto perdido no se recupera con un descuento.",
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿Cómo hago que mis huéspedes vuelvan a reservar directo?",
            a: "Escribiéndole a cada uno en el momento en que le sirve, con información concreta de su última estadía y una razón real para reservar directo: acceso primero a sus fechas, la misma habitación, tarifa de huésped que vuelve. conagentes identifica a quién escribir y cuándo, y el agente lo hace uno a uno por WhatsApp.",
          },
          {
            q: "¿Y si mis datos de huéspedes están en un Excel o en un cuaderno?",
            a: "Se cargan. En la puesta en marcha importamos su histórico de huéspedes desde Excel, desde su PMS anterior o desde lo que tenga, y a partir de ahí la base se mantiene sola con cada nueva estadía.",
          },
          {
            q: "¿Es lo mismo que mandar una promoción masiva por WhatsApp?",
            a: "No, y la diferencia es lo que hace que funcione. Un envío masivo es el mismo texto para todos y quema la base. La reactivación es un mensaje distinto por persona, basado en su historial, con un motivo específico para escribirle en esa fecha.",
          },
          {
            q: "¿Cuánto vale una reserva reactivada frente a una nueva?",
            a: "Muchísimo menos. No hay comisión de OTA ni costo de pauta: el costo es el mensaje. Y los huéspedes que vuelven suelen gastar más en servicios porque ya conocen el hotel y confían en él.",
          },
        ],
      },
    ],
    related: [
      { label: "Upsell y ancillaries", href: "/hoteles/upsell" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "Gerencia y BI", href: "/hoteles/gerencia" },
    ],
    cta: HOTEL_CTA,
  },

  /* ────────────────────── gerencia / BI ────────────────────── */
  {
    slug: "hoteles/gerencia",
    experience: "hotel",
    eyebrow: "Solución",
    title: "Pregúntele a su hotel cómo va. Por WhatsApp",
    lede: "Usted no necesita otro tablero con doce gráficas que nadie abre. Necesita saber, en el semáforo o el domingo por la noche, cómo viene el mes, qué se está cayendo y qué hay que hacer hoy. Escríbale al mismo agente que atiende a sus huéspedes y le responde con los números de su hotel.",
    answer:
      "En conagentes el gerente o dueño del hotel puede escribirle al agente IA por WhatsApp y recibir los indicadores reales del negocio: ocupación, tarifa promedio (ADR), ingreso, mezcla de canales, reservas directas frente a OTA, ingreso por servicios, desempeño del equipo y estado de las conversaciones. Además recibe alertas cuando algo se sale de lo normal, sin tener que abrir un tablero.",
    heroChips: [
      "Sus números por WhatsApp, en lenguaje normal",
      "Alertas cuando algo se sale de lo normal",
      "Sin abrir un tablero",
    ],
    meta: {
      title: "BI hotelero por WhatsApp: pregúntele a su hotel cómo va",
      description:
        "El dueño o gerente le escribe al agente IA por WhatsApp y recibe ocupación, ADR, RevPAR, mezcla de canales, ingreso por servicios y alertas del hotel, en lenguaje claro y sin abrir un tablero.",
    },
    keywords: [
      "indicadores hoteleros WhatsApp",
      "BI para hoteles Colombia",
      "reportes de gerencia hotel",
      "ocupación y ADR en tiempo real",
      "cómo medir el desempeño de mi hotel",
    ],
    entities: [...ENTIDADES_BASE, "ADR", "RevPAR", "TRevPAR", "business intelligence"],
    updated: UPDATED,
    sections: [
      {
        type: "panel",
        heading: "Una pregunta, una respuesta con números",
        sub: "No es un reporte que llega el 5 de cada mes. Es una conversación, cuando usted quiera.",
        kind: "bi",
        points: [
          {
            title: "Pregunte como habla",
            body: "«¿Cómo vamos este mes?», «¿cuánto vendimos en spa?», «¿qué canal está trayendo más?». Sin filtros, sin fórmulas, sin aprender una interfaz.",
          },
          {
            title: "Compara contra lo que importa",
            body: "Siempre contra el mismo periodo del año anterior y contra su propio ritmo. Un número solo no dice nada.",
          },
          {
            title: "Y le dice qué lo movió",
            body: "No solo «la ocupación subió 9 puntos», sino qué la subió: cuántas reservas directas entraron que antes se iban por OTA.",
          },
          {
            title: "Alertas cuando toca",
            body: "Si el ritmo de reservas de un fin de semana se cae, o una conversación de grupo lleva horas sin respuesta, le avisa. Antes de que se convierta en un problema.",
          },
        ],
        caption:
          "BI conversacional de conagentes: el gerente del hotel consulta ocupación, ADR, reservas directas e ingreso por servicios por WhatsApp y recibe la comparación contra el año anterior.",
      },
      {
        type: "features",
        heading: "Lo que puede preguntar",
        sub: "Los indicadores que de verdad usa un hotelero, no los que se ven bien en una demo.",
        items: [
          { title: "Ocupación y ritmo", body: "Cómo viene cada fecha y cómo iba en la misma anticipación el año pasado." },
          { title: "Tarifa promedio (ADR)", body: "Por tipo de habitación, por canal y por temporada." },
          { title: "Ingreso por habitación (RevPAR)", body: "El indicador que junta ocupación y tarifa: el que de verdad manda." },
          { title: "Mezcla de canales", body: "Cuánto entró directo, cuánto por OTA y cuánta comisión pagó." },
          { title: "Ingreso por servicios", body: "Spa, tours, traslados, restaurante — y cuánto de eso lo vendió el agente." },
          { title: "Desempeño del equipo", body: "Conversaciones atendidas, tiempos de respuesta y qué se escaló." },
          { title: "Reservas en riesgo", body: "Cotizaciones sin cerrar y reservas sin pagar, con su valor." },
          { title: "Huéspedes que vuelven", body: "Cuántos repiten y cuánto valen frente a los nuevos." },
          { title: "Cumplimiento", body: "Facturas emitidas y registros de huéspedes reportados en el periodo." },
        ],
      },
      {
        type: "prose",
        heading: "Y cuando quiera profundizar, el tablero está ahí",
        body: [
          "Nada de esto reemplaza el tablero de la plataforma: la analítica completa, las conversaciones, el pipeline y los reportes exportables para su contador siguen estando donde deben estar.",
          "Lo que cambia es el 90 % de las veces en que usted no quiere abrir nada: solo quiere saber si el fin de semana va bien. Para eso, escribir un mensaje es más rápido que cualquier interfaz que podamos diseñar.",
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿Cualquiera puede preguntarle los números al agente?",
            a: "No. Solo los números de teléfono que usted registre como administradores reciben información del negocio, y el acceso se controla por rol. Un huésped que escriba al mismo número recibe atención de huésped, nunca datos internos del hotel.",
          },
          {
            q: "¿Qué tan actualizados están los datos?",
            a: "En vivo. Las respuestas se calculan sobre las reservas, pagos y conversaciones del momento, no sobre un reporte del cierre de ayer.",
          },
          {
            q: "¿Puede hacer cosas, además de informar?",
            a: "Sí, con confirmación explícita. Puede aplicar un cambio de tarifa, actualizar una política o lanzar una campaña de reactivación, pero las acciones que modifican algo requieren que usted confirme antes de ejecutarse, y quedan registradas.",
          },
          {
            q: "¿Sirve si tengo varios hoteles?",
            a: "Sí. Puede preguntar por una propiedad o por el consolidado. Cada hotel mantiene sus datos aislados y usted ve lo que su rol le permite ver.",
          },
        ],
      },
    ],
    related: [
      { label: "Revenue Manager", href: "/hoteles/revenue-manager" },
      { label: "Resultados y ROI", href: "/hoteles/resultados" },
      { label: "Control y seguridad", href: "/hoteles/control-y-seguridad" },
    ],
    cta: HOTEL_CTA,
  },

  /* ────────────────────── resultados / ROI ────────────────────── */
  {
    slug: "hoteles/resultados",
    experience: "hotel",
    eyebrow: "Resultados",
    title: "Las cuatro cuentas que decide un agente que trabaja",
    lede: "No le vamos a prometer que su ocupación sube 30 %. Le vamos a mostrar dónde está la plata que hoy se le escapa, con sus propios números, y qué parte de eso puede recuperar un agente que responde siempre, cotiza bien y no se olvida de hacer seguimiento.",
    answer:
      "El impacto de un agente IA en un hotel se mide en cuatro cuentas: comisión de OTA que deja de pagar al mover reservas a directo (15–25 % frente a 2–5 %), ingreso complementario por upsell (12–18 % de conversión antes de la llegada), reservas recuperadas de huéspedes anteriores sin costo de adquisición, y consultas que hoy se quedan sin responder. conagentes calcula el punto de partida real de cada hotel en la demo.",
    heroChips: [
      "Con sus números, no con promedios",
      "Cuatro cuentas concretas",
      "Y un plan por resultados, si prefiere",
    ],
    meta: {
      title: "Resultados y ROI de un agente IA en un hotel",
      description:
        "Las cuatro cuentas del ROI hotelero: comisión de OTA ahorrada, ingreso por upsell, reservas reactivadas y consultas sin responder. Calculadoras con los números de su hotel.",
    },
    keywords: [
      "ROI inteligencia artificial hotel",
      "cuánto ahorra un hotel con IA",
      "calculadora comisión OTA",
      "aumentar RevPAR hotel",
      "resultados chatbot hotelero",
    ],
    entities: [...ENTIDADES_BASE, "RevPAR", "ADR", "TRevPAR", "Cotelco"],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "Por qué no verá aquí un «+300 % de reservas»",
        body: [
          "La categoría está llena de cifras espectaculares sin origen. Nosotros preferimos que usted desconfíe de nosotros y haga la cuenta con sus propios datos, porque es la única forma de que la decisión aguante después de firmar.",
          "Además, el contexto de 2026 en Colombia no da para fantasear. " +
            DATOS.ocupacionCuatrimestre +
            " " +
            DATOS.ocupacionMitadAno,
          "En un año así, el crecimiento no va a venir de más huéspedes en el mercado. Va a venir de quedarse con una porción mayor de los que ya le escriben, de cobrarle mejor a cada uno y de dejar de regalar comisión. Eso es medible, y es lo que le vamos a medir.",
        ],
      },
      {
        type: "calc",
        heading: "Cuenta 1 — la comisión que se va",
        sub: "Lo que le paga a las OTAs este año, y lo que se ahorra si el agente mueve diez puntos de la mezcla a directo.",
        variant: "ota",
        footnote:
          "Referencias 2026: comisión de OTA entre 15 % y 25 %; costo de una reserva directa entre 2 % y 5 % con todo incluido. La ocupación por defecto es la que Cotelco proyectó para mitad de año 2026 en Colombia.",
      },
      {
        type: "calc",
        heading: "Cuenta 2 — el complemento que no está vendiendo",
        sub: "El ingreso extra por huésped, con las mismas habitaciones y el mismo personal.",
        variant: "upsell",
        footnote:
          "Conversión de referencia del upsell previo a la llegada en la industria hotelera: 12 % a 18 %.",
      },
      {
        type: "bars",
        heading: "Cuenta 3 — de dónde sale una reserva y cuánto cuesta",
        sub: "El mismo huésped, distinto canal, muy distinto margen. Esta es la razón por la que el orden en que llegan las reservas importa.",
        unit: "Costo de adquisición por reserva · menos es mejor",
        items: [
          { label: "Huésped que vuelve, reactivado por WhatsApp", value: 8, display: "casi 0 %", tone: "accent" },
          { label: "Reserva directa por el agente IA", value: 20, display: "2–5 %", tone: "accent" },
          { label: "Reserva directa con pauta digital", value: 45, display: "5–12 %", tone: "muted" },
          { label: "Reserva por Booking.com", value: 70, display: "≈ 15 %", tone: "warn" },
          { label: "Reserva por Expedia con visibilidad preferente", value: 100, display: "18–25 %", tone: "warn" },
        ],
        note: "Costo de adquisición como porcentaje del valor de la reserva, según referencias públicas del sector para 2026. La reactivación de un huésped anterior es la reserva más rentable que puede tener un hotel: no hay comisión ni pauta, solo el mensaje.",
      },
      {
        type: "stats",
        heading: "Cuenta 4 — lo que hoy simplemente no pasa",
        sub: "Estas no son mejoras porcentuales: son cosas que no ocurren en su hotel y con el agente empiezan a ocurrir.",
        items: [
          { value: "0", label: "consultas de huéspedes sin responder, a cualquier hora" },
          { value: "< 5 s", label: "hasta la primera respuesta, en todos los canales" },
          { value: "100 %", label: "de las reservas pagadas con su factura DIAN emitida" },
          { value: "24/7", label: "cotizando, agendando y cobrando" },
        ],
        note: "Estos cuatro son de operación, no de proyección: dependen de que el agente esté conectado, no de que el mercado se porte bien.",
      },
      {
        type: "steps",
        heading: "Cómo lo medimos con usted",
        howto: true,
        items: [
          {
            title: "1. Tomamos su punto de partida",
            body: "Antes de encender nada: ocupación, tarifa promedio, mezcla de canales, comisión pagada y cuántas consultas recibe. Sin línea base no hay medición posible.",
          },
          {
            title: "2. Encendemos el agente",
            body: "Con sus habitaciones, tarifas y políticas reales. Primero en pruebas con su equipo, después atendiendo huéspedes.",
          },
          {
            title: "3. Medimos lo que el agente causó",
            body: "Cada reserva, upsell y reactivación que cerró el agente queda atribuida. No nos llevamos el crédito de lo que ya era suyo.",
          },
          {
            title: "4. Revisamos juntos cada mes",
            body: "Con el antes y el después al lado. Si los números no se mueven, lo decimos y lo corregimos — o se lo decimos y ya.",
          },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre resultados",
        items: [
          {
            q: "¿Cuánto ahorra un hotel al usar un agente de IA?",
            a: "El ahorro más directo es la comisión de OTA: mover diez puntos de la mezcla de OTA a reserva directa en un hotel de 40 habitaciones con tarifa promedio de $320.000 y 56 % de ocupación equivale a unos 35 millones de pesos al año, descontando el costo real de una reserva directa. A eso se suman el ingreso por upsell y las reservas reactivadas. La calculadora de esta página lo estima con los datos de su hotel.",
          },
          {
            q: "¿En cuánto tiempo se ven resultados?",
            a: "Las dos primeras cuentas se mueven rápido, porque dependen de responder y de proponer: en las primeras semanas ya se ven consultas atendidas que antes se caían y complementos vendidos. La mezcla de canales tarda más, porque depende del ciclo de reserva de su hotel.",
          },
          {
            q: "¿Cómo sé que la reserva la cerró el agente y no habría entrado igual?",
            a: "Cada acción del agente queda atribuida: qué conversación abrió, qué cotizó, qué complemento propuso y qué se pagó. En el plan por resultados esto es especialmente importante, porque solo cobramos sobre lo que el agente genera de verdad, nunca sobre reservas que ya eran suyas.",
          },
          {
            q: "¿Qué indicadores debería mirar un hotel?",
            a: "Tres: ocupación, tarifa promedio (ADR) e ingreso por habitación disponible (RevPAR), comparados contra el mismo periodo del año anterior. Y dos más que casi nadie mira y deberían mirar: porcentaje de reservas directas e ingreso complementario por huésped.",
          },
        ],
      },
    ],
    related: [
      { label: "Precios", href: "/hoteles/precios" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "Gerencia y BI", href: "/hoteles/gerencia" },
      { label: "Revenue Manager", href: "/hoteles/revenue-manager" },
    ],
    cta: {
      title: "Le hacemos la cuenta con sus números",
      sub: "Veinte minutos con los datos de su hotel y sale con una estimación concreta, no con una promesa.",
      button: "Quiero la cuenta de mi hotel",
    },
  },
];
