import type { MarketingPage } from "../pages.types";
import { DATOS, ENTIDADES_BASE, HOTEL_CTA, UPDATED } from "./shared";

/**
 * PLATAFORMA — how the machine works. Each page here is the CANONICAL
 * explanation of one mechanism; solution pages describe outcomes and link here.
 */
export const HOTEL_PLATAFORMA: MarketingPage[] = [
  /* ─────────────────────────── el agente ─────────────────────────── */
  {
    slug: "hoteles/agente-ia",
    experience: "hotel",
    eyebrow: "La plataforma · El agente de huéspedes",
    title: "No es un chatbot. Es el mejor vendedor de su hotel",
    lede: "Un chatbot responde preguntas. Su agente IA consulta la disponibilidad real, cotiza, sube el valor de la estadía, cobra, factura y le entrega la conversación a recepción cuando toca un humano. Trabaja las 24 horas y nunca se le olvida hacer seguimiento.",
    answer:
      "El agente IA de conagentes es un empleado digital para hoteles en Colombia y Latinoamérica. Atiende por WhatsApp, Instagram, las bandejas de las OTAs, el chat web y el teléfono; consulta la disponibilidad real del PMS; cotiza y cierra reservas directas; cobra en el chat con Wompi o Mercado Pago; emite la factura electrónica DIAN; y escala a una persona del hotel cuando la consulta lo requiere.",
    heroChips: [
      "Responde en menos de 5 segundos",
      "Atiende en 32 idiomas",
      "Nunca inventa precios ni disponibilidad",
    ],
    meta: {
      title: "Agente IA para hoteles — atiende, cotiza, cobra y factura",
      description:
        "Agente de inteligencia artificial para hoteles en Colombia: atiende por WhatsApp, Instagram, OTAs, web y teléfono, cotiza con disponibilidad real del PMS, cierra reservas directas, cobra en el chat y emite factura DIAN.",
    },
    keywords: [
      "agente IA para hoteles",
      "chatbot para hoteles Colombia",
      "inteligencia artificial hotelería",
      "agente de reservas WhatsApp",
      "asistente virtual hotel español",
      "IA que cierra reservas",
    ],
    entities: [
      ...ENTIDADES_BASE,
      "Instagram",
      "Wompi",
      "Mercado Pago",
      "GPT",
      "PMS",
    ],
    updated: UPDATED,
    sections: [
      {
        type: "compare",
        heading: "La diferencia entre responder y vender",
        sub: "Casi toda la categoría vende lo de la izquierda. Nosotros construimos lo de la derecha.",
        before: {
          label: "Un chatbot de preguntas frecuentes",
          items: [
            "Contesta con un texto guardado: «tenemos habitaciones desde $280.000».",
            "No sabe qué hay libre esta noche, así que promete lo que no puede cumplir.",
            "Cuando el huésped dice «la quiero», le pide que llame o que escriba a otro número.",
            "No cobra: manda al huésped a un motor de reservas y ahí se pierde la mitad.",
            "No sabe quién es el huésped ni si ya se hospedó antes.",
            "Si no entiende, repite el menú hasta que la persona se rinde.",
          ],
        },
        after: {
          label: "Su agente IA de conagentes",
          items: [
            "Consulta el PMS y responde con la habitación exacta que está libre y su tarifa de hoy.",
            "Arma la reserva, propone el complemento que encaja y manda el link de pago en el chat.",
            "Cobra por Wompi, Mercado Pago, PSE o Nequi, confirma y emite la factura DIAN.",
            "Reconoce al huésped que ya estuvo y le habla como a alguien conocido.",
            "Cuando no está seguro, pregunta a su equipo en vez de inventar — y aprende la respuesta.",
            "Le muestra a usted qué hizo, por qué lo hizo y con qué palabras del huésped lo decidió.",
          ],
        },
        footnote:
          "conagentes es una plataforma de agentes de IA construida en Colombia. El agente ejecuta dentro de las reglas que usted define, y cada acción queda registrada.",
      },
      {
        type: "chat",
        heading: "Una reserva completa, de principio a fin",
        sub: "Esto es una conversación real de WhatsApp: consulta, cotización con disponibilidad real, complemento, cobro y factura. Sin que nadie del hotel tocara el teléfono.",
        channel: "whatsapp",
        who: "Camila Restrepo",
        thread: [
          { from: "guest", text: "Hola 👋 ¿Tienen habitación para el puente? Somos 2 adultos." },
          {
            from: "ai",
            text: "¡Hola Camila! Con gusto 😊 Para el puente (viernes 21 a domingo 23) sí tengo disponibilidad. Déjeme mostrarle:",
          },
          {
            from: "ai",
            card: {
              kind: "habitacion",
              title: "Doble Superior",
              banner: "Vista al mar",
              lines: ["2 noches · desayuno incluido", "Cancelación gratis hasta 48 h antes"],
              price: "$395.000 / noche",
            },
          },
          {
            from: "ai",
            text: "Es la última con vista al mar para esas fechas. ¿Le aparto?",
          },
          { from: "guest", text: "Sí. ¿Y hay algo para llegar temprano? Aterrizamos 9 a. m." },
          {
            from: "ai",
            text: "Puedo dejarle la habitación lista desde las 10 a. m. por $70.000, y le sumo el traslado desde el aeropuerto por $85.000. ¿Le agrego los dos?",
          },
          { from: "guest", text: "Los dos, perfecto 🙌" },
          {
            from: "ai",
            card: {
              kind: "pago",
              title: "Reserva #A-2291",
              lines: ["2 noches + early check-in + traslado"],
              price: "$945.000",
              cta: "Pagar ahora",
              foot: "Wompi · Mercado Pago · PSE · Nequi",
            },
          },
          {
            from: "ai",
            text: "Pago recibido ✅ Reserva confirmada. ¿La factura va a nombre suyo o a nombre de una empresa?",
          },
          { from: "guest", text: "A mi nombre." },
          {
            from: "ai",
            text: "Listo, Camila. Le mandé la factura electrónica al correo y la reserva a este chat. Nos vemos el viernes 🌊",
          },
        ],
        notes: [
          {
            at: 2,
            label: "Cotizó sobre datos reales, no sobre un texto guardado",
            body: "Antes de responder consultó el PMS: tipo de habitación, tarifa vigente para esas fechas y política de cancelación. No puede ofrecer algo que no exista.",
          },
          {
            at: 3,
            label: "Usó la escasez real, no una inventada",
            body: "«Es la última con vista al mar» es verdad: quedaba una. El agente solo usa urgencia cuando el inventario la respalda — la urgencia falsa quema la marca del hotel.",
          },
          {
            at: 5,
            label: "Subió el ticket leyendo el contexto",
            body: "Aterrizan a las 9 a. m., así que ofreció early check-in y traslado. No un descuento genérico: el complemento que resuelve el problema que la huésped acaba de contar. Son $155.000 de margen casi puro.",
          },
          {
            at: 7,
            label: "Cobró sin sacarla de la conversación",
            body: "El link de pago vive dentro del chat. Cada clic que se le pide a un huésped es una reserva que se puede caer.",
          },
          {
            at: 9,
            label: "Cumplió con la DIAN sin que nadie lo pensara",
            body: "Preguntó una sola vez a nombre de quién va la factura y emitió la factura electrónica al confirmarse el pago. Su contadora no tuvo que hacer nada.",
          },
        ],
      },
      {
        type: "video",
        heading: "Vea al agente trabajando",
        sub: "Sesenta segundos: un huésped escribe, el agente cotiza, cobra y factura.",
        caption:
          "Video de demostración del agente IA de conagentes atendiendo una consulta de reserva por WhatsApp: consulta disponibilidad en el PMS, cotiza una habitación doble, ofrece un complemento, envía el link de pago y emite la factura electrónica DIAN.",
        aspect: "16/9",
      },
      {
        type: "flow",
        heading: "Qué pasa entre el mensaje del huésped y su respuesta",
        sub: "Cuatro segundos, cinco pasos. Este es el mecanismo, sin misterio.",
        nodes: [
          {
            icon: "mensaje",
            title: "Entiende la intención",
            body: "Lee el mensaje completo —fechas, número de personas, idioma, tono— y entiende qué quiere realmente, no solo qué palabras usó.",
            tag: "Paso 1",
          },
          {
            icon: "datos",
            title: "Consulta la verdad del hotel",
            body: "Va al PMS por disponibilidad y tarifas, y a la base de conocimiento por políticas, servicios y respuestas que su equipo ya dio antes.",
            tag: "Paso 2",
          },
          {
            icon: "cerebro",
            title: "Decide con criterio",
            body: "Elige qué ofrecer, si vale la pena proponer un complemento y si es momento de pedir el cierre o de dar espacio.",
            tag: "Paso 3",
          },
          {
            icon: "rayo",
            title: "Ejecuta la acción",
            body: "Crea la reserva, genera el link de pago, agenda el servicio, emite la factura. Actúa dentro del sistema, no solo habla de él.",
            tag: "Paso 4",
          },
        ],
        footnote:
          "Si en el paso 2 no encuentra la respuesta, no improvisa: le pregunta a su equipo, le responde al huésped cuando la tiene y guarda esa respuesta para la próxima vez.",
      },
      {
        type: "features",
        heading: "Todo lo que su agente sabe hacer",
        sub: "No son módulos que se compran aparte. Es un solo empleado que hace todo esto.",
        items: [
          {
            title: "Atender en todos los canales",
            body: "WhatsApp, Instagram, las bandejas de Booking y Airbnb, el chat de su web y el teléfono. Una sola bandeja para su equipo.",
            href: "/hoteles/recepcion-24-7",
          },
          {
            title: "Vender reservas directas",
            body: "Cotiza con la disponibilidad real del PMS y cierra con el cobro en el chat. Sin comisión de OTA.",
            href: "/hoteles/reservas-directas",
          },
          {
            title: "Subir el valor de cada estadía",
            body: "Upgrade, early check-in, late check-out, desayuno, traslado, spa, tour — en el momento en que el huésped dice sí.",
            href: "/hoteles/upsell",
          },
          {
            title: "Agendar servicios y experiencias",
            body: "Spa, tours, traslados y mesas del restaurante, con la disponibilidad real de cada servicio.",
            href: "/hoteles/agenda-servicios",
          },
          {
            title: "Recuperar huéspedes",
            body: "Sabe quién ya se hospedó y lo invita a volver directo, uno a uno, en el momento oportuno.",
            href: "/hoteles/reactivacion",
          },
          {
            title: "Cobrar y facturar",
            body: "Link de pago en el chat y factura electrónica DIAN emitida sola al confirmarse el pago.",
            href: "/hoteles/cobros",
          },
          {
            title: "Sugerir tarifas",
            body: "Lee su ritmo de reservas y el mercado, y le propone qué tarifa cobrar cada día.",
            href: "/hoteles/revenue-manager",
          },
          {
            title: "Responderle a usted",
            body: "Pregúntele por WhatsApp cómo va el mes y le responde con los números de su hotel.",
            href: "/hoteles/gerencia",
          },
          {
            title: "Cumplir en Colombia",
            body: "Factura electrónica DIAN y registro de huéspedes TRA automáticos. El reporte SIRE está en construcción.",
            href: "/hoteles/factura-dian-sire",
          },
        ],
      },
      {
        type: "matrix",
        heading: "Cómo se compara con lo que ya probó",
        sub: "Sin nombres propios: las tres formas en que hoy se atiende a un huésped que escribe.",
        cols: ["Recepción sola", "Chatbot de FAQ", "conagentes"],
        rows: [
          { label: "Responde a cualquier hora", cells: [false, true, true] },
          { label: "Responde en segundos", cells: [false, true, true] },
          { label: "Sabe qué habitación está libre hoy", cells: [true, false, true] },
          { label: "Cotiza con la tarifa vigente", cells: [true, false, true] },
          { label: "Cierra el cobro sin salir del chat", cells: ["A veces", false, true] },
          { label: "Propone el complemento correcto", cells: ["Si hay tiempo", false, true] },
          { label: "Contesta los mensajes de Booking y Airbnb", cells: ["Manual", false, true] },
          { label: "Emite la factura electrónica DIAN", cells: ["Manual", false, true] },
          { label: "Hace el registro de huéspedes TRA", cells: ["Manual", false, true] },
          { label: "Le explica a usted por qué hizo lo que hizo", cells: [true, false, true] },
          { label: "Atiende en 32 idiomas", cells: ["Según el turno", "Traducción literal", true] },
        ],
        footnote:
          "«En piloto» significa que está construido y activándose con los primeros hoteles. Nunca vendemos como disponible algo que todavía no lo está.",
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre el agente IA para hoteles",
        items: [
          {
            q: "¿Qué es un agente de IA para un hotel?",
            a: "Un agente de IA para hotel es un empleado digital que conversa con los huéspedes y además ejecuta acciones en los sistemas del hotel: consulta disponibilidad en el PMS, crea reservas, envía links de pago, agenda servicios y emite facturas. Se diferencia de un chatbot en que un chatbot solo entrega información guardada, mientras que un agente actúa. conagentes es un agente de IA para hoteles en Colombia y Latinoamérica.",
          },
          {
            q: "¿La IA le va a decir cosas inventadas a mis huéspedes?",
            a: "No puede inventar precios ni disponibilidad: los toma del PMS en el momento de responder, y solo puede vender lo que existe. Para políticas y servicios usa la base de conocimiento del hotel. Cuando no tiene la respuesta, escala a una persona de su equipo en lugar de improvisar, y esa respuesta queda guardada para la próxima vez. Cada acción queda registrada y usted puede ver qué hizo y por qué.",
          },
          {
            q: "¿Reemplaza a mi recepción?",
            a: "No. Le quita el trabajo repetitivo —responder lo mismo cien veces, cotizar, hacer seguimiento, transcribir datos— y le pasa a su equipo lo que de verdad necesita un humano: grupos, quejas, casos delicados y huéspedes en casa. Usted define qué hace el agente solo y qué requiere su visto bueno.",
          },
          {
            q: "¿En qué idiomas atiende el agente IA?",
            a: "En 32 idiomas, y no hay que configurar nada: el agente detecta en qué idioma le escribió el huésped y le responde en ese mismo idioma. Entre ellos español, inglés, portugués, alemán, francés, italiano, neerlandés, ruso, chino, japonés, coreano, árabe, hindi, polaco, sueco, danés, noruego, finés, turco, checo, griego, rumano, búlgaro, croata, eslovaco, ucraniano, húngaro, indonesio, malayo, filipino, tamil y vietnamita. Para un hotel colombiano que recibe grupos de Europa, Norteamérica y Brasil, esto significa que un mensaje en alemán a las 2 a. m. se responde en alemán, sin que nadie del equipo lo hable.",
          },
          {
            q: "¿Cuánto tarda en estar funcionando?",
            a: "Días, no meses. Conectamos WhatsApp, cargamos habitaciones, tarifas y políticas, y hacemos pruebas con conversaciones reales antes de dejarlo atender huéspedes. La primera versión atendiendo suele estar lista en la misma semana.",
          },
          {
            q: "¿Qué modelo de inteligencia artificial usa?",
            a: "Usa modelos de lenguaje de última generación conectados a las herramientas del hotel mediante llamadas a función, que es lo que le permite ejecutar acciones y no solo conversar. La plataforma es independiente del proveedor de modelo: podemos cambiarlo sin que el hotel note nada.",
          },
        ],
      },
    ],
    related: [
      { label: "Recepción 24/7", href: "/hoteles/recepcion-24-7" },
      { label: "Control y seguridad", href: "/hoteles/control-y-seguridad" },
      { label: "PMS incluido", href: "/hoteles/pms" },
      { label: "Precios", href: "/hoteles/precios" },
    ],
    cta: HOTEL_CTA,
  },

  /* ──────────────────── el agente de administración ──────────────────── */
  {
    slug: "hoteles/agente-admin",
    experience: "hotel",
    eyebrow: "La plataforma",
    title: "El segundo agente no atiende huéspedes. Trabaja para usted",
    lede: "El agente de huéspedes vende y atiende. El agente de administración hace lo otro: le dice cómo va el hotel, encuentra lo que usted no alcanza a mirar y ejecuta los cambios que usted le apruebe. Vive en su WhatsApp y dentro de la plataforma, y responde igual en los dos.",
    answer:
      "conagentes trabaja con dos agentes distintos. El agente de huéspedes atiende, cotiza, reserva y cobra por WhatsApp, Instagram, las OTAs y la web. El agente de administración trabaja para el dueño o el gerente: analiza los datos del hotel y responde con ocupación, ADR, RevPAR, mezcla de canales e ingreso por servicios, y ejecuta acciones sobre la plataforma —cambiar tarifas, actualizar políticas, lanzar campañas— siempre con la aprobación explícita del hotelero. Funciona en el WhatsApp del administrador y dentro del panel.",
    heroChips: [
      "En su WhatsApp y en el panel",
      "Analiza y recomienda, no solo reporta",
      "Ninguna acción sin su aprobación",
    ],
    meta: {
      title: "Agente de administración: analiza y ejecuta por usted",
      description:
        "El agente de administración de conagentes analiza los datos de su hotel y ejecuta acciones sobre la plataforma con su aprobación. En el WhatsApp del administrador y dentro del panel.",
    },
    keywords: [
      "agente IA para administradores de hotel",
      "BI hotelero por WhatsApp",
      "copiloto para gerentes de hotel",
      "analitica hotelera con inteligencia artificial",
      "agente que ejecuta acciones en el PMS",
      "asistente de gerencia hotel Colombia",
    ],
    entities: [...ENTIDADES_BASE, "ADR", "RevPAR", "business intelligence"],
    updated: UPDATED,
    sections: [
        {
        type: "matrix",
        heading: "Dos agentes, dos oficios",
        sub: "No es el mismo agente con otro sombrero. Tienen datos, permisos y criterio distintos, porque los trabajos son distintos.",
        cols: ["Agente de huéspedes", "Agente de administración"],
        rows: [
          { label: "Con quién habla", cells: ["El huésped", "El dueño o el gerente"] },
          { label: "Dónde vive", cells: ["WhatsApp, Instagram, OTAs y web", "WhatsApp del administrador y el panel"] },
          { label: "Cotiza y cierra reservas", cells: [true, false] },
          { label: "Cobra y emite la factura DIAN", cells: [true, false] },
          { label: "Sube el valor de la estadía", cells: [true, false] },
          { label: "Ve ocupación, ADR, RevPAR e ingresos", cells: [false, true] },
          { label: "Avisa cuando algo se sale del patrón", cells: [false, true] },
          { label: "Cambia tarifas, políticas y servicios", cells: [false, "Con su aprobación"] },
          { label: "Ve los datos financieros del hotel", cells: [false, true] },
        ],
        footnote:
          "La separación no es cosmética: es la razón por la que un agente no puede filtrarle a un huésped lo que sabe del negocio, ni un huésped puede pedirle al agente que le cambie una tarifa.",
      },
      {
        type: "features",
        heading: "Qué hace el agente de administración",
        sub: "Tres oficios: analizar, avisar y ejecutar.",
        items: [
          {
            title: "Responde con los números, no con un tablero",
            body: "«¿Cómo vamos este mes?», «¿qué canal está trayendo más?», «¿cuánto dejó el spa?». Contesta en lenguaje normal, comparando siempre contra el mismo periodo del año anterior, y le dice qué movió el número — no solo cuál es.",
            href: "/hoteles/gerencia",
          },
          {
            title: "Encuentra lo que usted no alcanza a mirar",
            body: "Revisa el ritmo de reservas, la mezcla de canales, las conversaciones que se enfriaron y los servicios que se dejaron de vender. Cuando algo se sale de su patrón normal, le avisa con la evidencia — no espera a que usted pregunte.",
          },
          {
            title: "Ejecuta lo que usted apruebe",
            body: "Cambiar una tarifa, ajustar una política, cargar un servicio, lanzar una campaña de reactivación. Le muestra qué va a hacer y qué efecto espera; se ejecuta solo cuando usted confirma.",
            href: "/hoteles/control-y-seguridad",
          },
          {
            title: "Prepara la conversación difícil",
            body: "Antes de una reunión de junta o de una negociación con una OTA, le arma el resumen con los números que importan y de dónde salieron.",
          },
        ],
      },
      {
        type: "panel",
        heading: "Los mismos datos, en los dos lados",
        sub: "En el panel tiene la vista completa; en WhatsApp, la respuesta corta cuando está en el lobby o fuera del hotel. Es el mismo agente.",
        kind: "bi",
        points: [
          {
            title: "En el WhatsApp del administrador",
            body: "Usted registra su número como número de administrador y le escribe como a cualquier contacto. Sirve para la pregunta rápida y la alerta: «¿cómo viene el fin de semana?».",
          },
          {
            title: "Dentro del panel",
            body: "El mismo agente, con la pantalla al lado: puede señalar la reserva, la conversación o la tarifa de la que está hablando, y ejecutar el cambio ahí mismo.",
          },
          {
            title: "Una sola memoria",
            body: "Lo que preguntó por WhatsApp sigue en contexto cuando abre el panel. No repite la conversación dos veces.",
          },
          {
            title: "Solo para quien usted autorice",
            body: "Responde únicamente a los números y las cuentas que el hotel registró como administración. A un número desconocido no le cuenta nada del negocio.",
          },
        ],
      },
      {
        type: "chat",
        heading: "Una conversación real de administración",
        sub: "Preguntar, entender por qué, y actuar — en el mismo hilo.",
        channel: "whatsapp",
        who: "Agente de administración",
        thread: [
          { from: "staff", text: "¿Cómo viene agosto contra el año pasado?" },
          {
            from: "ai",
            text: "Ocupación 61 % contra 58 % en agosto del año pasado, ADR $312.000 contra $296.000. El ingreso va 9 % arriba. Lo que cambió: 23 reservas directas más que el año pasado, casi todas de WhatsApp de madrugada.",
          },
          { from: "staff", text: "¿Y qué se está cayendo?" },
          {
            from: "ai",
            text: "El spa. Van 14 servicios contra 27 el año pasado a esta altura. En 41 conversaciones el huésped preguntó por spa y no se le ofreció el paquete, porque el horario del sábado quedó sin cargar.",
          },
          { from: "staff", text: "Cárgalo con el mismo horario del año pasado." },
          {
            from: "ai",
            text: "Le dejo listo: spa sábados 9:00 a 18:00, mismos precios del año pasado. Voy a cargarlo y a ofrecerlo en las conversaciones activas que preguntaron. ¿Confirmo?",
          },
          { from: "staff", text: "Confirmo" },
        ],
        notes: [
          {
            at: 1,
            label: "Explica, no solo reporta",
            body: "Da el número y la causa. Un dato sin causa no sirve para decidir.",
          },
          {
            at: 3,
            label: "Encuentra la plata que se está quedando",
            body: "Cruza la agenda con las conversaciones: 41 huéspedes preguntaron y nadie ofreció.",
          },
          {
            at: 5,
            label: "Pide permiso antes de tocar nada",
            body: "Describe la acción y su efecto. Sin un «confirmo» explícito no ejecuta.",
          },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿Es el mismo agente que atiende a mis huéspedes?",
            a: "No. Son dos agentes distintos, y a propósito: el de huéspedes conversa con el huésped y no tiene acceso a los datos del negocio; el de administración trabaja con los datos del hotel y no le escribe nunca a un huésped. Así ninguno puede hacer el trabajo del otro por error.",
          },
          {
            q: "¿Funciona por WhatsApp o dentro de la plataforma?",
            a: "En los dos. Usted registra el número del administrador y le escribe por WhatsApp como a cualquier contacto, y el mismo agente está dentro del panel. En el panel es más capaz, porque tiene la pantalla al lado para señalar la reserva o la tarifa de la que están hablando; por WhatsApp gana la pregunta rápida y la alerta.",
          },
          {
            q: "¿Puede cambiar cosas en mi hotel sin avisarme?",
            a: "No. Toda acción que modifique algo —una tarifa, una política, un servicio, una campaña— se le presenta antes con lo que va a hacer y el efecto esperado, y solo se ejecuta cuando usted confirma explícitamente. Las consultas de datos no necesitan confirmación porque no cambian nada.",
          },
          {
            q: "¿Cualquiera del equipo puede preguntarle los números del hotel?",
            a: "Solo quien usted autorice. El agente de administración responde únicamente a los números registrados como administración y a las cuentas con ese permiso en el panel. A cualquier otro número no le cuenta nada del negocio.",
          },
          {
            q: "¿Qué indicadores maneja?",
            a: "Ocupación, tarifa promedio (ADR), RevPAR, ingreso, mezcla de canales, reservas directas frente a OTA, ingreso por servicios, desempeño del equipo y estado de las conversaciones. Siempre comparados contra el mismo periodo del año anterior, porque en hotelería la estacionalidad mueve más que cualquier cambio operativo.",
          },
          {
            q: "¿Reemplaza a mi contador o a mi revenue manager?",
            a: "No. Le da los números y las recomendaciones para decidir más rápido, con la evidencia a la vista. La decisión y la responsabilidad siguen siendo suyas — y para la parte de tarifas hay una capacidad dedicada, el Revenue Manager, que está en piloto.",
          },
        ],
      },
    ],
    related: [
      { label: "El agente de huéspedes", href: "/hoteles/agente-ia" },
      { label: "Sus números por WhatsApp", href: "/hoteles/gerencia" },
      { label: "Control y seguridad", href: "/hoteles/control-y-seguridad" },
      { label: "Revenue Manager", href: "/hoteles/revenue-manager" },
    ],
    cta: HOTEL_CTA,
  },

  /* ─────────────────────── recepción 24/7 ─────────────────────── */
  {
    slug: "hoteles/recepcion-24-7",
    experience: "hotel",
    eyebrow: "La plataforma",
    title: "Una recepción que nunca cierra, en todos los canales a la vez",
    lede: "El huésped no escoge su horario: escribe cuando se le antoja, por donde se le antoja. WhatsApp a medianoche, Instagram el domingo, Booking en alemán, el teléfono en plena temporada alta. Todo eso llega a una sola bandeja, y todo se responde.",
    answer:
      "conagentes reúne WhatsApp, Instagram, las bandejas de Booking.com y Airbnb, el chat web y las llamadas telefónicas en una sola bandeja para el hotel. El agente IA responde en segundos las 24 horas —disponibilidad, tarifas, políticas, servicios, cómo llegar— y cuando una consulta necesita a una persona, le entrega la conversación a recepción con todo el contexto y el historial del huésped.",
    heroChips: [
      "Menos de 5 segundos de primera respuesta",
      "Una bandeja para todos los canales",
      "El humano toma el control con un clic",
    ],
    meta: {
      title: "Recepción 24/7 con IA para hoteles: WhatsApp, Instagram y OTAs",
      description:
        "Bandeja omnicanal con agente IA para hoteles: WhatsApp, Instagram, Booking.com, Airbnb, chat web y teléfono en un solo lugar. Respuesta en segundos 24/7 y traspaso a recepción con contexto completo.",
    },
    keywords: [
      "recepción virtual 24/7 hotel",
      "bandeja omnicanal hotelería",
      "atención al huésped WhatsApp automática",
      "responder mensajes Booking automáticamente",
      "chatbot recepción hotel español",
    ],
    entities: [...ENTIDADES_BASE, "Instagram", "Harvard Business Review", "Cotelco"],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "La reserva no se pierde por precio. Se pierde por silencio",
        body: [
          DATOS.respuesta,
          "Piense en lo que pasa a las 11 de la noche. Alguien está en la cama, con el celular, decidiendo dónde dormir el fin de semana. Le escribe a tres hoteles. El primero que responde con una habitación concreta y un precio se queda con la reserva. Los otros dos responden a las 8 de la mañana y encuentran un «gracias, ya reservé».",
          "Ese huésped no era más barato ni más caro para nadie. Simplemente fue del hotel que estaba despierto. Y en Colombia el problema es peor de lo que parece: " +
            DATOS.ocupacionCuatrimestre.replace("Según Cotelco, la", "según Cotelco la"),
        ],
        bullets: [
          "El 100 % de las consultas recibe respuesta, incluso las de las 3 a. m.",
          "Un mensaje en alemán a las 2 a. m. se responde en alemán: el agente atiende en 32 idiomas y nadie de su equipo tiene que hablarlos.",
          "Su equipo llega en la mañana a conversaciones avanzadas, no a una pila de mensajes sin abrir.",
          "Nadie vuelve a copiar y pegar la misma respuesta sobre el parqueadero.",
        ],
      },
      {
        type: "panel",
        heading: "Todo en una sola bandeja",
        sub: "WhatsApp, Booking, Instagram, Airbnb. Su equipo trabaja en un solo lugar y ve quién está respondiendo qué.",
        kind: "inbox",
        points: [
          {
            title: "El canal es un detalle, no un silo",
            body: "El mismo huésped puede escribir por Instagram y seguir por WhatsApp. El agente lo reconoce y no le pide que repita nada.",
          },
          {
            title: "Se ve quién responde: la IA o una persona",
            body: "Cada conversación muestra si está en manos del agente o de alguien de su equipo. Un clic la pasa de un lado al otro, en cualquier momento.",
          },
          {
            title: "El traspaso lleva el contexto completo",
            body: "Cuando escala, su recepcionista no recibe «hola»: recibe el resumen de lo que el huésped quiere, lo que ya se le ofreció y por qué el agente prefirió no seguir solo.",
          },
          {
            title: "Nada se queda esperando",
            body: "Si una conversación lleva demasiado tiempo sin respuesta humana, el sistema avisa. Los huéspedes no se pierden en una bandeja.",
          },
        ],
        caption:
          "Bandeja omnicanal de conagentes: conversaciones de WhatsApp, Booking.com, Instagram y Airbnb en una sola lista, con indicación de si responde el agente IA o una persona del hotel.",
      },
      {
        type: "bars",
        heading: "Qué tan rápido responde cada quien",
        sub: "El tiempo hasta la primera respuesta es el dato que más peso tiene en si esa consulta se convierte en reserva.",
        unit: "Tiempo hasta la primera respuesta · menos es mejor",
        items: [
          { label: "Su agente IA de conagentes", value: 4, display: "< 5 s", tone: "accent" },
          { label: "Recepción, en un turno tranquilo", value: 22, display: "5–15 min", tone: "muted" },
          { label: "Recepción, en temporada alta o de noche", value: 58, display: "2–12 h", tone: "warn" },
          { label: "Correo electrónico, promedio del sector", value: 100, display: "12–24 h", tone: "warn" },
        ],
        note: "Tiempos del sector según estudios de atención hotelera; el tiempo del agente es el que medimos en la plataforma. Responder en el primer minuto multiplica por siete la probabilidad de cierre frente a responder una hora después (Harvard Business Review).",
      },
      {
        type: "journey",
        heading: "Y no se acaba cuando reserva",
        sub: "El agente acompaña las cinco etapas de la estadía. Cada una tiene una conversación que casi ningún hotel alcanza a tener.",
        stages: [
          {
            label: "Antes de reservar",
            title: "Contesta la pregunta que decide la reserva",
            body: "Disponibilidad, tarifas, si aceptan mascotas, si hay parqueadero, cómo llegar desde el aeropuerto, si el desayuno está incluido. Las mismas veinte preguntas, siempre bien contestadas.",
            bullets: [
              "Cotiza con la disponibilidad real del PMS",
              "Manda fotos de la habitación por WhatsApp",
              "Explica las políticas de cancelación tal como usted las definió",
              "Si el huésped duda, hace seguimiento a las horas — sin acosar",
            ],
            metric: { value: "< 5 s", label: "primera respuesta, a cualquier hora" },
          },
          {
            label: "Al reservar",
            title: "Cierra y cobra en la misma conversación",
            body: "El momento más frágil de toda la venta: el huésped dijo sí y hay que cobrarle. Cada paso extra ahí es una reserva que se cae.",
            bullets: [
              "Arma la reserva sobre tarifas y disponibilidad reales",
              "Envía el link de pago en el chat (Wompi, Mercado Pago, PSE, Nequi)",
              "Puede pedir solo el anticipo, según su política",
              "Confirma al detectar el pago y emite la factura DIAN",
            ],
          },
          {
            label: "Antes de llegar",
            title: "Sube el valor de la estadía sin sonar a vendedor",
            body: "Es el momento con la mejor conversión de todo el upsell hotelero: el huésped ya decidió venir y está entusiasmado con el viaje.",
            bullets: [
              "Ofrece upgrade, early check-in, late check-out o desayuno",
              "Propone traslado, spa o tour según el perfil del viaje",
              "Recuerda la llegada y resuelve las dudas de última hora",
              "Recoge los datos del registro de huéspedes por adelantado",
            ],
            metric: { value: "12–18 %", label: "conversión típica del upsell previo a la llegada" },
          },
          {
            label: "Durante la estadía",
            title: "Es el conserje que su hotel no puede pagar",
            body: "El huésped escribe desde la habitación por WhatsApp en vez de bajar a recepción o llamar por el teléfono fijo.",
            bullets: [
              "Agenda spa, tours, traslados y mesas del restaurante",
              "Resuelve pedidos de toallas, horarios y recomendaciones",
              "Ofrece late check-out cuando queda disponible",
              "Pasa a recepción cualquier queja, de inmediato y con contexto",
            ],
          },
          {
            label: "Al salir y después",
            title: "Convierte la buena estadía en la próxima reserva",
            body: "El huésped que se fue contento es su reserva más rentable — y la única que casi ningún hotel colombiano trabaja de forma sistemática.",
            bullets: [
              "Agradece, pide la reseña en el momento justo",
              "Guarda las preferencias para la próxima visita",
              "Lo invita a volver directo cuando llega su temporada",
              "Detecta al huésped frecuente y lo trata como tal",
            ],
            metric: { value: "0 %", label: "de comisión cuando vuelve directo" },
          },
        ],
      },
      {
        type: "features",
        heading: "Su equipo no desaparece: trabaja mejor",
        sub: "La bandeja está diseñada para que una persona y un agente compartan la misma conversación sin pisarse.",
        items: [
          {
            title: "Tomar el control",
            body: "Un clic y la IA se calla. La persona escribe. Otro clic y el agente retoma.",
          },
          {
            title: "Etiquetas y equipos",
            body: "Grupos, eventos, quejas, corporativo. Se enrutan al área que corresponde.",
          },
          {
            title: "Ventana de 24 horas de WhatsApp",
            body: "La plataforma le muestra cuánto tiempo queda para responder por chat libre y le ofrece la plantilla correcta cuando se cierra.",
          },
          {
            title: "Sin mensajes perdidos",
            body: "Conversaciones asignadas, pospuestas o cerradas — con alerta si algo se queda quieto.",
          },
          {
            title: "Calidad revisada",
            body: "Un evaluador automático califica las conversaciones del agente y le muestra dónde mejorar.",
            href: "/hoteles/control-y-seguridad",
          },
          {
            title: "Aprende de su equipo",
            body: "Cada respuesta que da un humano y el agente no tenía queda guardada como conocimiento del hotel.",
          },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿La IA puede responder los mensajes de Booking.com y Airbnb?",
            a: "Sí. Las bandejas de las OTAs llegan a la misma bandeja de conagentes y el agente las responde, respetando las políticas de cada plataforma: dentro de un hilo de Booking.com o Airbnb no comparte links de pago ni intenta llevarse al huésped fuera de la plataforma. Esta capacidad está en vivo.",
          },
          {
            q: "¿Qué pasa si el huésped pide hablar con una persona?",
            a: "El agente escala de inmediato y avisa a su equipo por WhatsApp, con el resumen de la conversación. Mientras alguien contesta, le dice al huésped la verdad: que ya lo están buscando. Nunca finge ser humano si le preguntan directamente.",
          },
          {
            q: "¿Necesito cambiar mi número de WhatsApp?",
            a: "No necesariamente. Trabajamos sobre el número que su hotel ya usa y que sus huéspedes ya conocen, o sobre uno nuevo si prefiere separar la operación. Lo definimos en la puesta en marcha.",
          },
          {
            q: "¿Y las llamadas por teléfono?",
            a: "El agente de voz contesta el teléfono del hotel, entiende lo que pide quien llama y puede consultar disponibilidad y tomar datos. Cuando la conversación necesita un link —una cotización o un pago— la pasa a WhatsApp. Está en piloto con los primeros hoteles.",
          },
        ],
      },
    ],
    related: [
      { label: "El agente IA", href: "/hoteles/agente-ia" },
      { label: "Mensajes de OTAs", href: "/hoteles/otas" },
      { label: "Recepción telefónica con IA", href: "/hoteles/voz" },
      { label: "Control y seguridad", href: "/hoteles/control-y-seguridad" },
    ],
    cta: HOTEL_CTA,
  },

  /* ───────────────────────────── PMS ───────────────────────────── */
  {
    slug: "hoteles/pms",
    experience: "hotel",
    eyebrow: "La plataforma",
    title: "PMS incluido, sin costo aparte. O conectamos el suyo",
    lede: "Habitaciones, tarifas, temporadas, reservas y disponibilidad. Todo lo que el agente necesita para vender de verdad viene incluido en conagentes. Y si su hotel ya tiene PMS o channel manager, no lo cambie: nos conectamos.",
    answer:
      "conagentes incluye su propio PMS (sistema de gestión hotelera) sin costo adicional: tipos de habitación, tarifas por temporada, reservas, calendario y disponibilidad en tiempo real. El agente IA cotiza y reserva sobre esos datos, por lo que no puede prometer habitaciones que no existen. Si el hotel ya usa otro PMS o un channel manager, conagentes se conecta con él en vez de reemplazarlo.",
    heroChips: [
      "Incluido en el plan, no es un módulo aparte",
      "El agente solo vende lo que existe",
      "O se conecta con el PMS que ya usa",
    ],
    meta: {
      title: "PMS para hoteles incluido gratis — o conectamos el suyo",
      description:
        "PMS hotelero incluido sin costo adicional: habitaciones, tarifas, temporadas, reservas y disponibilidad en tiempo real. El agente IA cotiza sobre datos reales. Compatible con PMS y channel managers existentes.",
    },
    keywords: [
      "PMS para hoteles Colombia",
      "PMS gratis hotel",
      "software de gestión hotelera",
      "sistema de reservas para hotel pequeño",
      "PMS con inteligencia artificial",
      "conectar PMS con WhatsApp",
    ],
    entities: [
      ...ENTIDADES_BASE,
      "LobbyPMS",
      "Cloudbeds",
      "Mews",
      "Channex",
      "channel manager",
    ],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "Un agente sin datos reales es un folleto que habla",
        body: [
          "Aquí está el problema con casi toda la IA hotelera del mercado: se vende como una capa que se pega encima. Y para que esa capa sirva, el hotel tiene que tener ya un PMS moderno, con API, y pagar la integración. Los hoteles independientes de Latinoamérica —que son la mayoría— quedan por fuera de esa conversación.",
          "Nosotros lo resolvimos al revés. conagentes trae su propio PMS incluido. Si su hotel maneja las reservas en un cuaderno, en Excel o en un grupo de WhatsApp, no necesita comprar nada más: carga sus habitaciones y sus tarifas y el agente ya puede vender sobre información real.",
          "Y si su hotel ya trabaja con un PMS, un motor de reservas o un channel manager que le funciona, no le vamos a pedir que lo cambie. Nos conectamos con lo que tiene y el agente vende sobre esos datos.",
        ],
      },
      {
        type: "panel",
        heading: "La disponibilidad que ve el agente",
        sub: "Esta es la única fuente de verdad para cotizar. Si no está aquí, el agente no puede venderlo.",
        kind: "pms",
        points: [
          {
            title: "Tipos de habitación y tarifas",
            body: "Cada tipo con su capacidad, su tarifa base, sus temporadas y sus políticas de cancelación. El agente cotiza exactamente eso.",
          },
          {
            title: "Calendario y ocupación",
            body: "Quién llega, quién sale, qué queda libre. Actualizado en el momento en que se confirma una reserva, venga del agente o del mostrador.",
          },
          {
            title: "Servicios y experiencias",
            body: "Spa, tours, traslados y restaurante con su propia disponibilidad, para que el agente pueda agendarlos y no solo mencionarlos.",
          },
          {
            title: "Anticipos y depósitos",
            body: "Si su política pide un porcentaje por adelantado, el PMS lo sabe y el agente cobra ese monto, no la estadía completa.",
          },
        ],
        caption:
          "PMS incluido de conagentes: disponibilidad por tipo de habitación. El agente IA cotiza sobre estos datos en tiempo real.",
      },
      {
        type: "logos",
        heading: "Si ya tiene herramientas, se queda con ellas",
        sub: "Conectamos por API, por channel manager o por el puente que haga falta.",
        groups: [
          {
            label: "PMS y channel managers",
            marks: ["LobbyPMS", "Cloudbeds", "Mews", "Channex", "Su PMS actual"],
          },
          {
            label: "OTAs y distribución",
            marks: ["Booking.com", "Airbnb", "Expedia", "Trivago", "Despegar"],
          },
          {
            label: "Pagos y facturación",
            marks: ["Wompi", "Mercado Pago", "PSE", "Nequi", "Alegra", "DIAN"],
          },
        ],
        footnote:
          "Las marcas pertenecen a sus dueños y se mencionan para indicar compatibilidad. La conexión con PMS externos y con el channel manager Channex está en piloto con los primeros hoteles; el PMS incluido de conagentes está en vivo.",
      },
      {
        type: "features",
        heading: "Tres caminos, según cómo esté hoy su hotel",
        items: [
          {
            title: "No tengo PMS",
            body: "Use el nuestro, incluido. Cargamos habitaciones, tarifas y políticas en la puesta en marcha y queda operando en días.",
          },
          {
            title: "Tengo PMS y me gusta",
            body: "Nos conectamos con él. El agente lee disponibilidad y escribe reservas ahí; su equipo sigue trabajando donde ya sabe.",
          },
          {
            title: "Tengo PMS y lo odio",
            body: "Migramos habitaciones, tarifas y reservas futuras al PMS incluido. Sin costo de licencia adicional.",
          },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿El PMS de conagentes es realmente gratis?",
            a: "Está incluido en el plan de conagentes, sin licencia ni costo por habitación aparte. No es una versión recortada: es el mismo PMS con el que opera el agente —habitaciones, tarifas, temporadas, reservas, disponibilidad, servicios y anticipos.",
          },
          {
            q: "¿Tengo que cambiar mi PMS para usar el agente de IA?",
            a: "No. Si su hotel ya usa un PMS o un channel manager, conagentes se conecta con él y el agente cotiza y reserva sobre esos datos. La conexión con PMS externos está en piloto con los primeros hoteles. Si prefiere no integrar nada, puede usar el PMS incluido.",
          },
          {
            q: "¿Sirve para un hotel pequeño de 10 o 15 habitaciones?",
            a: "Sí, y es donde más se nota. Un hotel pequeño no tiene recepción de noche ni un equipo de reservas, así que cada consulta sin responder pesa más. El PMS incluido evita que tenga que comprar dos sistemas para empezar.",
          },
          {
            q: "¿Qué pasa si alguien reserva en el mostrador al mismo tiempo?",
            a: "El PMS es la única fuente de verdad para todos: mostrador, agente y OTAs leen y escriben en el mismo lugar. Cuando una habitación se ocupa, deja de estar disponible para todos al instante.",
          },
        ],
      },
    ],
    related: [
      { label: "Integraciones", href: "/hoteles/integraciones" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "Revenue Manager", href: "/hoteles/revenue-manager" },
      { label: "Precios", href: "/hoteles/precios" },
    ],
    cta: HOTEL_CTA,
  },

  /* ───────────────────── revenue manager ───────────────────── */
  {
    slug: "hoteles/revenue-manager",
    experience: "hotel",
    eyebrow: "La plataforma",
    title: "El revenue manager que su hotel no puede contratar",
    lede: "Un revenue manager cuesta más que su nómina de recepción. La mayoría de los hoteles independientes en Colombia no tiene uno — así que la tarifa se define «como el año pasado» y se deja plata sobre la mesa todos los días. conagentes le sugiere qué cobrar cada noche, y le explica por qué.",
    answer:
      "El Revenue Manager de conagentes analiza el ritmo de reservas del hotel, la ocupación proyectada por fecha y el comportamiento del mercado, y recomienda una tarifa para cada día con la razón detrás de la recomendación. El hotelero puede aprobar cada cambio o activar el piloto automático dentro de un rango que él define. Está en piloto con los primeros hoteles.",
    heroChips: [
      "Una tarifa sugerida por día, con su razón",
      "Piloto automático dentro del rango que usted fija",
      "En piloto con los primeros hoteles",
    ],
    meta: {
      title: "Revenue management con IA para hoteles — tarifas sugeridas a diario",
      description:
        "Revenue Manager con inteligencia artificial para hoteles en Colombia: recomienda la tarifa de cada día según ritmo de reservas, ocupación proyectada y mercado, con piloto automático y control total del hotelero.",
    },
    keywords: [
      "revenue management hotel Colombia",
      "software de tarifas dinámicas hotel",
      "cómo fijar la tarifa de mi hotel",
      "revenue manager con inteligencia artificial",
      "aumentar ADR hotel",
      "aumentar RevPAR hotel 2026",
    ],
    entities: [...ENTIDADES_BASE, "RevPAR", "ADR", "TRevPAR", "Cotelco", "revenue management"],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "La tarifa fija es la forma más silenciosa de perder plata",
        body: [
          "Casi todos los hoteles independientes cobran lo mismo un martes de abril que un sábado de puente. El resultado es doble y siempre malo: los días buenos se venden por menos de lo que valían, y los días flojos se quedan vacíos porque el precio no bajó a tiempo para llenarlos.",
          "Nadie lo hace por descuido. Se hace porque revisar tarifa por tarifa, día por día, mirando cómo va el ritmo de reservas y qué está haciendo la competencia, es un trabajo de tiempo completo. Y un revenue manager de verdad cuesta varios millones de pesos al mes.",
          DATOS.ocupacionMitadAno +
            " En un año así, subir la tarifa promedio no es codicia: es lo único que sostiene el margen cuando no hay más huéspedes por repartir.",
        ],
        bullets: [
          "Los días de alta demanda se venden a lo que valen, no a la tarifa de siempre.",
          "Los días flojos bajan a tiempo, mientras todavía hay tiempo de llenarlos.",
          "Usted decide cuánto poder le da: sugerencias para aprobar, o piloto automático con límites.",
        ],
      },
      {
        type: "panel",
        heading: "Así se ve la recomendación",
        sub: "Cada fila es una noche. Cada sugerencia trae la razón por la que existe — usted no tiene que confiar a ciegas.",
        kind: "tarifas",
        caption:
          "Revenue Manager de conagentes: tarifa sugerida por fecha, con ocupación proyectada y la razón de cada recomendación. El piloto automático aplica cambios dentro del rango que define el hotel.",
      },
      {
        type: "flow",
        heading: "En qué se basa para recomendar",
        sub: "No es un número que sale de la nada. Son cuatro señales, todas del mundo real.",
        nodes: [
          {
            icon: "subir",
            title: "Su ritmo de reservas",
            body: "Cuántas reservas lleva para esa fecha comparado con cómo iba en la misma cantidad de días de anticipación otras veces. El indicador que más anticipa.",
            tag: "Señal 1",
          },
          {
            icon: "tarifa",
            title: "La ocupación que viene",
            body: "Lo confirmado más lo que el ritmo proyecta. Una noche al 96 % y una al 34 % no se tratan igual.",
            tag: "Señal 2",
          },
          {
            icon: "mundo",
            title: "El mercado alrededor",
            body: "Qué está pasando con la demanda de su zona y sus fechas: puentes, temporadas, eventos, ferias, congresos.",
            tag: "Señal 3",
          },
          {
            icon: "control",
            title: "Sus reglas",
            body: "Tarifa mínima, tarifa máxima, cuánto puede moverse de un día a otro y qué requiere su aprobación. El sistema nunca sale de ahí.",
            tag: "Señal 4",
          },
        ],
        footnote:
          "Cada cambio de tarifa queda registrado: qué tarifa había, cuál quedó, por qué se movió y si lo aprobó una persona o el piloto automático.",
      },
      {
        type: "chat",
        heading: "Y puede consultarlo por WhatsApp",
        sub: "El mismo agente que atiende a sus huéspedes le responde a usted sobre tarifas y ocupación. Sin abrir un tablero.",
        channel: "whatsapp",
        who: "Rodrigo Salazar · Gerente",
        thread: [
          { from: "staff", text: "¿Cómo vamos con el puente? ¿Subo tarifa?" },
          {
            from: "ai",
            text: "Vamos bien: el viernes está al 92 % y el sábado al 96 %, con 12 días de anticipación. El año pasado a estas alturas iba en 71 %.",
          },
          {
            from: "ai",
            card: {
              kind: "tarifa",
              title: "Sugerencia para el sábado 22",
              lines: ["Tarifa actual: $340.000", "Quedan 3 habitaciones", "Competencia de la zona: +14 %"],
              price: "Subir a $430.000",
              cta: "Aplicar",
            },
          },
          {
            from: "ai",
            text: "Si aplica esta y la del viernes, son cerca de $2,4 M más en el puente sin vender una habitación adicional. ¿Las aplico?",
          },
          { from: "staff", text: "Aplícalas. Y el lunes y martes déjalos como los tengas." },
          {
            from: "ai",
            text: "Hecho ✅ Viernes a $395.000 y sábado a $430.000, en el PMS y en las OTAs. El lunes y el martes van al 38 % y 34 %: le dejo dos opciones para llenarlos cuando quiera verlas.",
          },
        ],
        notes: [
          {
            at: 1,
            label: "Compara contra su propia historia, no contra un promedio",
            body: "«El año pasado iba en 71 %» es lo que convierte un dato en una decisión. La referencia útil es su hotel, no el mercado en abstracto.",
          },
          {
            at: 3,
            label: "Traduce la tarifa a pesos",
            body: "Nadie aprueba un cambio de tarifa porque un algoritmo lo diga. Se aprueba cuando alguien le dice cuántos millones son.",
          },
          {
            at: 5,
            label: "Ejecuta en el PMS y en las OTAs",
            body: "Una tarifa que solo cambia en el sistema interno no sirve. El cambio se propaga a los canales donde el huésped compra.",
          },
        ],
      },
      {
        type: "features",
        heading: "Usted manda. Siempre",
        sub: "La confianza no se pide, se construye con límites explícitos.",
        items: [
          {
            title: "Modo sugerencia",
            body: "El sistema propone, usted aprueba una por una. Es donde empiezan todos los hoteles.",
          },
          {
            title: "Piloto automático con límites",
            body: "Aplica cambios dentro del rango que usted fija (por ejemplo ±15 %) y le avisa. Fuera de ese rango, pide permiso.",
          },
          {
            title: "Tarifa mínima intocable",
            body: "Define el piso por tipo de habitación y por temporada. Nada baja de ahí, por ninguna razón.",
          },
          {
            title: "Todo queda registrado",
            body: "Cada cambio con su fecha, su motivo y su responsable. Puede revertir en un clic.",
          },
          {
            title: "Sin canibalizar el directo",
            body: "Las sugerencias respetan la paridad y su estrategia de canales.",
          },
          {
            title: "Se apaga cuando quiera",
            body: "Un interruptor. Vuelve a sus tarifas manuales y no pasa nada.",
          },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre revenue management con IA",
        items: [
          {
            q: "¿Qué es el revenue management en un hotel?",
            a: "El revenue management es la práctica de ajustar la tarifa y la disponibilidad según la demanda esperada, para maximizar el ingreso por habitación disponible (RevPAR) en lugar de solo llenar el hotel. En la práctica significa cobrar más los días de alta demanda y bajar a tiempo los días flojos.",
          },
          {
            q: "¿Necesito un revenue manager si uso conagentes?",
            a: "Si su hotel ya tiene uno, el sistema le ahorra el trabajo mecánico de revisar fecha por fecha y le deja la estrategia. Si no tiene —el caso de la mayoría de los hoteles independientes en Colombia—, el Revenue Manager de conagentes le da la disciplina de tarifa que hoy no tiene, sin contratar a nadie.",
          },
          {
            q: "¿Va a subir mis tarifas sin que yo sepa?",
            a: "No. Empieza en modo sugerencia: propone y usted aprueba. Si activa el piloto automático, usted define el rango dentro del cual puede moverse y la tarifa mínima que nunca se toca. Cualquier cambio fuera del rango requiere su permiso, y todo queda registrado y es reversible.",
          },
          {
            q: "¿Cómo mide si está funcionando?",
            a: "Con tres números suyos: tarifa promedio (ADR), ocupación e ingreso por habitación disponible (RevPAR), comparados contra el mismo periodo del año anterior. Si el RevPAR no mejora, la herramienta no está sirviendo, y así se lo diremos.",
          },
          {
            q: "¿Está disponible hoy?",
            a: "Está construido y en piloto con los primeros hoteles. Si le interesa entrar en ese grupo, escríbanos: los pilotos tienen acompañamiento directo del equipo que lo construyó.",
          },
        ],
      },
    ],
    related: [
      { label: "PMS incluido", href: "/hoteles/pms" },
      { label: "Gerencia y BI", href: "/hoteles/gerencia" },
      { label: "Resultados y ROI", href: "/hoteles/resultados" },
      { label: "Upsell", href: "/hoteles/upsell" },
    ],
    cta: {
      title: "¿Quiere entrar al piloto del Revenue Manager?",
      sub: "Trabajamos con un grupo pequeño de hoteles, con acompañamiento directo. Veinte minutos para saber si su hotel encaja.",
      button: "Quiero entrar al piloto",
    },
  },

  /* ─────────────────── agenda de servicios ─────────────────── */
  {
    slug: "hoteles/agenda-servicios",
    experience: "hotel",
    eyebrow: "La plataforma",
    title: "Spa, tours, traslados y restaurante: agendados en el chat",
    lede: "El huésped ya está en su hotel. Cada servicio que le vende ahí es margen casi puro — y cada uno que no le vende es plata que se lleva a un operador de la calle. El agente los ofrece y los agenda en la conversación, con la disponibilidad real de cada servicio.",
    answer:
      "conagentes permite que el agente IA agende los servicios del hotel —spa, tours, traslados, mesas del restaurante, actividades— directamente en la conversación de WhatsApp, consultando la disponibilidad real de cada servicio y cobrando en el chat cuando corresponde. Las reservas de servicios aparecen en la Agenda del hotel, que reemplaza el calendario genérico y muestra el día completo por horario.",
    heroChips: [
      "Disponibilidad real por servicio",
      "Cobra en el mismo chat",
      "La agenda del día, en un solo lugar",
    ],
    meta: {
      title: "Agendar spa, tours y servicios del hotel por WhatsApp con IA",
      description:
        "El agente IA agenda spa, tours, traslados y restaurante por WhatsApp con la disponibilidad real de cada servicio y cobra en el chat. Ingreso extra por huésped sin contratar más personal.",
    },
    keywords: [
      "agendar spa hotel WhatsApp",
      "vender tours a huéspedes",
      "ingresos extra hotel servicios",
      "ancillary revenue hotel Colombia",
      "software para reservas de servicios hotel",
    ],
    entities: [...ENTIDADES_BASE, "TRevPAR", "ancillary revenue"],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "El ingreso que ya está adentro de su hotel",
        body: [
          "Un huésped que se hospeda tres noches va a comer, va a moverse por la ciudad, probablemente quiera un masaje o un tour. Va a gastar ese dinero de todas formas. La única pregunta es si lo gasta con usted o con el taxista que lo lleva a otra parte.",
          "En 2026 esta pregunta pesa más que nunca: con las tarifas planas y la ocupación estancada, el ingreso por servicios es lo que separa a un hotel que crece de uno que apenas se sostiene. En propiedades con buen programa de servicios, el ingreso complementario llega a representar entre el 20 % y el 40 % del total.",
          "El problema nunca fue la oferta. Es que nadie tiene tiempo de escribirle a cada huésped en el momento correcto, con la cosa correcta, y de coordinar la agenda del spa mientras atiende el check-in.",
        ],
      },
      {
        type: "chat",
        heading: "De «¿qué hay para hacer?» a un servicio pagado",
        sub: "Sin llamar al spa, sin bajar a recepción, sin que nadie del hotel intervenga.",
        channel: "whatsapp",
        who: "Hans Müller · Hab. 512",
        thread: [
          { from: "guest", text: "Hola, ¿tienen algo de spa? Mañana en la tarde." },
          {
            from: "ai",
            text: "¡Hola Hans! Sí 😊 Para mañana en la tarde tengo estos horarios libres:",
          },
          {
            from: "ai",
            card: {
              kind: "servicio",
              title: "Masaje relajante · 60 min",
              lines: ["Mañana: 2:00 p. m. · 4:30 p. m. · 6:00 p. m.", "En el spa del hotel, piso 2"],
              price: "$180.000",
            },
          },
          { from: "guest", text: "El de 4:30. ¿Se puede para dos personas?" },
          {
            from: "ai",
            text: "Sí, tengo las dos camillas libres a las 4:30. Serían $360.000 por los dos. ¿Le confirmo?",
          },
          { from: "guest", text: "Confirma, y cárgalo a la habitación." },
          {
            from: "ai",
            text: "Listo ✅ Masaje para dos, mañana 4:30 p. m., cargado a la habitación 512. El spa ya lo tiene en agenda. Los esperamos 🧖",
          },
          {
            from: "ai",
            text: "Por si les interesa: el sábado tenemos tour al atardecer con cupo para 2. Si quiere le aparto.",
          },
        ],
        notes: [
          {
            at: 2,
            label: "Ofreció horarios reales, no «déjeme consultar»",
            body: "El agente ve la agenda del spa como ve el calendario de habitaciones. Ofrecer tres horarios concretos es lo que convierte una consulta en una reserva.",
          },
          {
            at: 4,
            label: "Verificó capacidad antes de prometer",
            body: "Dos personas significa dos camillas. El agente lo confirma contra la disponibilidad real del servicio, no contra una suposición.",
          },
          {
            at: 6,
            label: "Cobró como el hotel lo pide",
            body: "Cargo a la habitación, link de pago o anticipo: según la política que usted defina para cada servicio.",
          },
          {
            at: 7,
            label: "Sembró la siguiente venta, sin encimar",
            body: "Una sola propuesta más, relevante, después de cerrar. No una lista de todo el catálogo.",
          },
        ],
      },
      {
        type: "panel",
        heading: "El día del hotel, en una agenda",
        sub: "Su equipo ve lo que viene sin perseguir mensajes en cuatro grupos de WhatsApp.",
        kind: "agenda",
        points: [
          {
            title: "Un servicio, sus propias reglas",
            body: "Cada servicio tiene su horario, su capacidad, su duración y su precio. Spa por camilla, tour por cupo, traslado por vehículo.",
          },
          {
            title: "Quién lo pidió y desde dónde",
            body: "Cada reserva de servicio queda ligada al huésped y a su habitación, con la conversación completa a un clic.",
          },
          {
            title: "Cobrado o por cobrar",
            body: "La agenda muestra el estado del pago de cada servicio, así nadie sale del hotel con un masaje sin facturar.",
          },
          {
            title: "Reemplaza el calendario genérico",
            body: "Para hoteles, la Agenda sustituye el calendario de citas: está hecha para el día de un hotel, no para una clínica.",
          },
        ],
        caption:
          "Agenda de servicios de conagentes: reservas de spa, tours, traslados y restaurante del día, con huésped, habitación y estado de pago.",
      },
      {
        type: "calc",
        heading: "Cuánto vale esto en su hotel",
        sub: "Mueva los tres números y vea qué le deja el complemento en un año.",
        variant: "upsell",
        footnote:
          "El cálculo usa sus propios supuestos. Las referencias de conversión del sector: 3–5 % en el motor de reservas, 12–18 % en el mensaje previo a la llegada y 22–28 % en el check-in.",
      },
      {
        type: "features",
        heading: "Qué se puede agendar",
        sub: "Si tiene horario y capacidad, el agente lo puede vender.",
        items: [
          { title: "Spa y bienestar", body: "Masajes, tratamientos, sauna, jacuzzi. Por camilla y por horario." },
          { title: "Tours y experiencias", body: "Propios o de operadores aliados, con cupos y punto de encuentro." },
          { title: "Traslados", body: "Aeropuerto, terminal, city tour. Por vehículo y hora de recogida." },
          { title: "Restaurante", body: "Mesas por franja, con número de personas y notas de la cocina." },
          { title: "Salones y eventos", body: "Consultas de grupos y cotizaciones, con escalamiento al área comercial." },
          { title: "Lo que usted quiera", body: "Cualquier servicio con horario, capacidad y precio: clases, alquileres, mascotas." },
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿El agente puede reservar el spa de mi hotel por WhatsApp?",
            a: "Sí. El agente consulta la disponibilidad real del servicio —horarios, camillas o cupos libres, duración— ofrece las opciones concretas, confirma y cobra según la política del hotel: cargo a la habitación, link de pago o anticipo. La reserva queda en la Agenda del hotel.",
          },
          {
            q: "¿Sirve si mis tours los opera un tercero?",
            a: "Sí. Se cargan los cupos y horarios del operador aliado y el agente los vende como cualquier otro servicio. El hotel conserva su comisión y el huésped nunca sale de la conversación.",
          },
          {
            q: "¿Va a llenar de ofertas a mis huéspedes?",
            a: "No. El agente propone cuando hay una razón —el huésped preguntó, o el contexto lo pide— y se detiene después de una propuesta. Usted define qué puede ofrecer, con qué frecuencia y en qué momentos de la estadía.",
          },
          {
            q: "¿Cómo se entera el spa o el conductor?",
            a: "La reserva aparece en la Agenda del hotel al instante y el área responsable recibe la notificación. No hay que reenviar nada por WhatsApp.",
          },
        ],
      },
    ],
    related: [
      { label: "Upsell y ancillaries", href: "/hoteles/upsell" },
      { label: "Cobros en el chat", href: "/hoteles/cobros" },
      { label: "El agente IA", href: "/hoteles/agente-ia" },
    ],
    cta: HOTEL_CTA,
  },

  /* ────────────────────────── cobros ────────────────────────── */
  {
    slug: "hoteles/cobros",
    experience: "hotel",
    eyebrow: "La plataforma",
    title: "Cobre la reserva antes de que se enfríe",
    lede: "Entre el «sí, la quiero» y el pago se pierden más reservas que en toda la conversación anterior. El agente manda el link de pago dentro del chat, cobra el anticipo que su política pida y confirma solo. Sin motores externos, sin transferencias que hay que perseguir.",
    answer:
      "El agente IA de conagentes cobra la reserva dentro de la conversación: genera un link de pago con la pasarela del hotel (Wompi o Mercado Pago, con PSE, Nequi y tarjetas), puede cobrar solo el anticipo según la política del hotel, detecta el pago, confirma la reserva al instante y emite la factura electrónica DIAN. El huésped nunca sale del chat.",
    heroChips: [
      "Wompi · Mercado Pago · PSE · Nequi",
      "Anticipo o pago total, según su política",
      "Confirma y factura solo",
    ],
    meta: {
      title: "Cobrar reservas de hotel por WhatsApp: link de pago y anticipos",
      description:
        "Cobre reservas en el chat con Wompi o Mercado Pago: link de pago por WhatsApp, anticipos según su política de depósito, confirmación automática y factura electrónica DIAN. Menos reservas caídas.",
    },
    keywords: [
      "cobrar reservas por WhatsApp hotel",
      "link de pago hotel Colombia",
      "anticipo reserva hotel",
      "Wompi hotel",
      "depósito de garantía reserva hotel",
      "pasarela de pagos para hoteles",
    ],
    entities: [...ENTIDADES_BASE, "Wompi", "Mercado Pago", "PSE", "Nequi"],
    updated: UPDATED,
    sections: [
      {
        type: "prose",
        heading: "El momento más frágil de toda la venta",
        body: [
          "Su agente hizo todo bien: respondió en segundos, cotizó la habitación correcta, resolvió las dudas. El huésped dice «perfecto, la reservo». Y ahí es donde la mayoría de los hoteles pierde la venta.",
          "Porque en ese punto lo normal es mandarlo a otra parte: «entre a nuestro motor de reservas», «hágame una transferencia y me manda el comprobante», «llame mañana a reservas». Cada uno de esos pasos es una puerta abierta para que se distraiga, para que compare otra vez, para que reserve por Booking porque ahí son dos clics.",
          "El principio es simple y no cambia: cobre donde el huésped ya está. Si dijo sí en WhatsApp, el pago tiene que estar en WhatsApp.",
        ],
      },
      {
        type: "flow",
        heading: "Del sí a la reserva pagada",
        sub: "Cuatro pasos, todos dentro de la conversación.",
        nodes: [
          {
            icon: "habitacion",
            title: "Arma la reserva",
            body: "Con la habitación, las fechas y la tarifa reales del PMS. Nada estimado, nada que después haya que corregir.",
            tag: "Paso 1",
          },
          {
            icon: "cobro",
            title: "Cobra en el chat",
            body: "Link de pago con la pasarela de su hotel, en pesos colombianos. PSE, Nequi, tarjeta o efectivo en corresponsal.",
            tag: "Paso 2",
          },
          {
            icon: "sello",
            title: "Confirma solo",
            body: "Detecta el pago, bloquea la habitación en el PMS y le manda la confirmación al huésped en segundos.",
            tag: "Paso 3",
          },
          {
            icon: "factura",
            title: "Factura y cumple",
            body: "Emite la factura electrónica DIAN y deja listo el registro de huéspedes TRA.",
            tag: "Paso 4",
          },
        ],
        footnote:
          "Cada hotel cobra en su propia cuenta de Wompi o Mercado Pago. La plata le llega a usted directo — conagentes no es intermediario de sus pagos.",
      },
      {
        type: "features",
        heading: "Su política de pago, respetada al pie de la letra",
        sub: "Los hoteles no cobran todos igual. El agente aprende cómo cobra el suyo.",
        items: [
          {
            title: "Anticipo o total",
            body: "Cobre el 30 %, el 50 % o la estadía completa. El agente calcula el monto según su regla y lo explica al huésped.",
          },
          {
            title: "Depósito de garantía",
            body: "Si su hotel pide depósito reembolsable, el agente lo gestiona y explica cuándo y cómo se devuelve.",
          },
          {
            title: "Políticas de cancelación",
            body: "Las dice tal como usted las escribió, antes de cobrar. Menos disputas después.",
          },
          {
            title: "Cargo a la habitación",
            body: "Para servicios durante la estadía: se acumula y se liquida al salir.",
          },
          {
            title: "Reserva pagada, reserva intocable",
            body: "Una vez pagada, no se modifica por accidente: los cambios pasan por su política y quedan registrados.",
          },
          {
            title: "Corporativo y grupos",
            body: "Cotización formal, orden de compra y pago a crédito se escalan a su equipo comercial.",
          },
        ],
      },
      {
        type: "logos",
        heading: "Cobra con lo que ya usa Colombia",
        groups: [
          { label: "Pasarelas", marks: ["Wompi", "Mercado Pago"] },
          { label: "Medios de pago", marks: ["PSE", "Nequi", "Tarjeta de crédito", "Tarjeta débito", "Efectivo en corresponsal"] },
          { label: "Facturación", marks: ["DIAN", "Alegra"] },
        ],
        footnote:
          "El hotel usa su propia cuenta de pasarela. Los pagos en pesos colombianos (COP) se acreditan directamente al hotel.",
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿Cómo cobra un hotel una reserva por WhatsApp?",
            a: "El agente genera un link de pago de la pasarela del hotel —Wompi o Mercado Pago— y lo envía dentro de la conversación de WhatsApp. El huésped paga con PSE, Nequi, tarjeta o efectivo en corresponsal; el sistema detecta el pago, confirma la reserva en el PMS y emite la factura electrónica DIAN, todo sin que el huésped salga del chat.",
          },
          {
            q: "¿La plata pasa por conagentes?",
            a: "No. Cada hotel cobra en su propia cuenta de Wompi o Mercado Pago y el dinero se acredita directamente allí. conagentes genera el link y detecta el pago, pero no toca los fondos.",
          },
          {
            q: "¿Puedo cobrar solo un anticipo?",
            a: "Sí. Usted define el porcentaje o el monto fijo del anticipo, y el agente calcula lo que corresponde a esa reserva, lo cobra y le explica al huésped cuánto queda por pagar y cuándo.",
          },
          {
            q: "¿Qué pasa si el huésped no paga?",
            a: "El agente hace seguimiento en el momento adecuado y, si la reserva no se paga dentro del plazo que usted defina, libera la habitación para que vuelva a estar disponible. Nada de habitaciones bloqueadas por reservas que nunca se concretaron.",
          },
        ],
      },
    ],
    related: [
      { label: "Factura DIAN, TRA y SIRE", href: "/hoteles/factura-dian-sire" },
      { label: "Reservas directas", href: "/hoteles/reservas-directas" },
      { label: "PMS incluido", href: "/hoteles/pms" },
    ],
    cta: HOTEL_CTA,
  },

  /* ───────────────── cumplimiento colombiano ───────────────── */
  {
    slug: "hoteles/factura-dian-sire",
    experience: "hotel",
    eyebrow: "Cumplimiento",
    title: "Factura DIAN y registro TRA, sin que nadie los haga",
    lede: "Ningún hotelero abrió un hotel para llenar planillas. La factura electrónica y el registro de huéspedes son obligatorios, tediosos y caros de equivocar — y son exactamente el tipo de trabajo que un sistema debería hacer solo. En conagentes lo hace.",
    answer:
      "conagentes automatiza el cumplimiento hotelero colombiano: emite la factura electrónica ante la DIAN al confirmarse el pago de una reserva y genera el registro de huéspedes TRA (Tarjeta de Registro de Alojamiento) ante el Registro Nacional de Turismo. Ambos están en vivo. El reporte SIRE de huéspedes extranjeros ante Migración Colombia está en construcción. Es un diferencial frente a las plataformas hoteleras globales, que no resuelven la normativa colombiana.",
    heroChips: [
      "Factura DIAN: en vivo",
      "Registro TRA: en vivo",
      "Reporte SIRE: en construcción",
    ],
    meta: {
      title: "Factura electrónica DIAN, registro TRA y SIRE para hoteles",
      description:
        "Cumplimiento hotelero colombiano automático: factura electrónica DIAN al confirmarse el pago y registro de huéspedes TRA ante el Registro Nacional de Turismo. Reporte SIRE a Migración Colombia en construcción.",
    },
    keywords: [
      "factura electrónica hotel DIAN",
      "registro TRA hoteles Colombia",
      "Tarjeta de Registro de Alojamiento",
      "reporte SIRE Migración Colombia hoteles",
      "cumplimiento normativo hotel Colombia",
      "facturación automática hotelera",
    ],
    entities: [
      ...ENTIDADES_BASE,
      "Migración Colombia",
      "SIRE",
      "Tarjeta de Registro de Alojamiento",
      "Alegra",
      "RNT",
    ],
    updated: UPDATED,
    sections: [
      {
        type: "panel",
        heading: "Tres obligaciones, tres estados. Sin ambigüedad",
        sub: "Le decimos exactamente qué está funcionando hoy y qué todavía no. Preferimos eso a una sorpresa después de firmar.",
        kind: "cumplimiento",
        points: [
          {
            title: "Factura electrónica DIAN — en vivo",
            body: "Se emite sola cuando se confirma el pago de la reserva o de un servicio. El agente pregunta una sola vez a nombre de quién va: consumidor final por defecto, o con NIT y razón social si el huésped la pide a nombre de una empresa.",
          },
          {
            title: "Registro de huéspedes TRA — en vivo",
            body: "La Tarjeta de Registro de Alojamiento ante el Registro Nacional de Turismo se genera con los datos que el agente ya recogió durante la conversación. Sin volver a preguntar, sin transcribir de un formulario de papel.",
          },
          {
            title: "Reporte SIRE — en construcción",
            body: "El reporte de huéspedes extranjeros ante Migración Colombia está en desarrollo. No lo vendemos como disponible: cuando esté, se lo decimos.",
          },
          {
            title: "Por qué esto casi nadie lo tiene",
            body: "Las plataformas de IA hotelera globales resuelven conversación, no normativa local. Construir para la DIAN y el RNT solo tiene sentido si su mercado principal es Colombia. El nuestro lo es.",
          },
        ],
        caption:
          "Estado del cumplimiento colombiano en conagentes: factura electrónica DIAN y registro de huéspedes TRA en vivo; reporte SIRE ante Migración Colombia en construcción.",
      },
      {
        type: "chat",
        heading: "El dato fiscal se pide una vez, en el momento natural",
        sub: "Nadie quiere que le pidan el NIT tres veces. Y nadie quiere perseguir a un huésped que ya se fue para poder facturar.",
        channel: "whatsapp",
        who: "Camila Restrepo",
        thread: [
          { from: "guest", text: "Ya pagué 🙌" },
          {
            from: "ai",
            text: "Pago recibido ✅ Reserva #A-2291 confirmada. ¿Necesita factura electrónica a nombre de una empresa, o la dejo a nombre suyo?",
          },
          { from: "guest", text: "A nombre de la empresa. NIT 900.123.456-7" },
          {
            from: "ai",
            text: "Perfecto. ¿La razón social es Inversiones Andinas S.A.S.?",
          },
          { from: "guest", text: "Sí, esa." },
          {
            from: "ai",
            card: {
              kind: "factura",
              title: "Factura electrónica emitida",
              lines: [
                "Inversiones Andinas S.A.S. · NIT 900.123.456-7",
                "Reserva #A-2291 · 2 noches + servicios",
                "Validada ante la DIAN",
              ],
              price: "$945.000",
              cta: "Descargar PDF",
            },
          },
          {
            from: "ai",
            text: "Listo. Se la envié también al correo. Para el registro de huéspedes ya tengo sus datos, así que el check-in va a ser rápido 😊",
          },
        ],
        notes: [
          {
            at: 1,
            label: "Pregunta una sola vez, y en el momento correcto",
            body: "Justo después del pago, cuando el huésped está atento y el dato es fácil de dar. No a la llegada, con la maleta en la mano y fila detrás.",
          },
          {
            at: 3,
            label: "Valida el NIT antes de emitir",
            body: "Verifica el dígito de verificación del NIT. Una factura mal emitida es una nota crédito y una llamada incómoda.",
          },
          {
            at: 5,
            label: "Emite y entrega en el chat",
            body: "La factura validada ante la DIAN llega al chat y al correo. Su contadora no tuvo que hacer nada, y no hay una carpeta de facturas pendientes.",
          },
          {
            at: 6,
            label: "Reutiliza los datos para el TRA",
            body: "Los datos que ya se recogieron sirven para el registro de huéspedes. Un solo dato, una sola vez, dos obligaciones cumplidas.",
          },
        ],
      },
      {
        type: "prose",
        heading: "Lo que se ahorra, en horas y en riesgo",
        body: [
          "El costo del cumplimiento manual casi nunca se mide, porque está repartido: quince minutos de la recepcionista por cada registro, una tarde de su contadora al mes cuadrando facturas, la llamada al huésped que ya se fue y necesita su factura a nombre de la empresa.",
          "Y hay un costo peor, que solo aparece cuando aparece: la sanción. Una factura que no se emitió, un registro que no se reportó. Un sistema que lo hace solo, siempre, no se equivoca por cansancio a las 11 de la noche de un puente festivo.",
          "También hay una exención que muchos hoteles colombianos no aprovechan porque exige papeleo: los servicios de alojamiento a huéspedes no residentes en Colombia pueden estar exentos de IVA, siempre que el hotel tenga su RNT vigente y conserve el pasaporte, el documento migratorio y el registro de control correspondiente. Cuando el sistema captura y guarda esos datos solos, la exención deja de ser un trámite y pasa a ser algo que simplemente se cumple.",
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes sobre facturación y registro hotelero",
        items: [
          {
            q: "¿conagentes emite factura electrónica ante la DIAN?",
            a: "Sí. La factura electrónica se emite automáticamente al confirmarse el pago de una reserva o de un servicio, con validación ante la DIAN, y se entrega al huésped por chat y por correo. Está en vivo.",
          },
          {
            q: "¿Qué es el registro TRA y conagentes lo hace?",
            a: "El TRA es la Tarjeta de Registro de Alojamiento: el registro de huéspedes que los prestadores de servicios turísticos deben reportar ante el Registro Nacional de Turismo. conagentes lo genera con los datos que el agente ya recogió en la conversación, sin transcripción manual. Está en vivo.",
          },
          {
            q: "¿Y el reporte SIRE de extranjeros ante Migración Colombia?",
            a: "Está en construcción. Hoy no está disponible y no lo presentamos como si lo estuviera. Cuando entre en operación lo anunciaremos y lo activaremos en los hoteles que lo necesiten.",
          },
          {
            q: "¿Sirve si ya trabajo con un software contable?",
            a: "Sí. La facturación se emite a través de un proveedor tecnológico autorizado y puede convivir con su software contable. También exportamos el paquete mensual que su contador necesita.",
          },
          {
            q: "¿Los precios que cotiza el agente incluyen IVA?",
            a: "Por defecto sí: el agente cotiza precios con IVA incluido, que es lo que un huésped espera ver en Colombia. La configuración se ajusta a la política de su hotel.",
          },
        ],
      },
    ],
    related: [
      { label: "Cobros en el chat", href: "/hoteles/cobros" },
      { label: "PMS incluido", href: "/hoteles/pms" },
      { label: "Control y seguridad", href: "/hoteles/control-y-seguridad" },
    ],
    cta: HOTEL_CTA,
  },

  /* ──────────────── control, confianza y seguridad ──────────────── */
  {
    slug: "hoteles/control-y-seguridad",
    experience: "hotel",
    eyebrow: "Confianza",
    title: "«¿Y si la IA le dice cualquier cosa a mis huéspedes?»",
    lede: "Es la primera pregunta de todo hotelero serio, y es la pregunta correcta. Su marca la construyó durante años; no se la va a entregar a un sistema que improvisa. Así es exactamente como evitamos que eso pase.",
    answer:
      "En conagentes el agente IA no puede inventar precios ni disponibilidad: los toma del PMS en el momento de responder. Para políticas y servicios usa solo la base de conocimiento del hotel, y cuando no tiene la respuesta escala a una persona en lugar de improvisar. Cada acción queda registrada con su justificación, un evaluador automático califica las conversaciones, y el hotel puede tomar el control de cualquier chat en un clic.",
    heroChips: [
      "No puede inventar precios ni disponibilidad",
      "Cada acción registrada y reversible",
      "Un humano toma el control cuando quiera",
    ],
    meta: {
      title: "Control, seguridad y confianza del agente IA hotelero",
      description:
        "Cómo conagentes evita que el agente IA invente información: datos del PMS como única fuente, base de conocimiento del hotel, escalamiento en vez de improvisación, registro de cada acción y evaluación automática de calidad.",
    },
    keywords: [
      "IA hotelera confiable",
      "evitar alucinaciones chatbot hotel",
      "control del agente de IA",
      "seguridad de datos huéspedes",
      "auditoría conversaciones IA hotel",
    ],
    entities: [...ENTIDADES_BASE, "Ley 1581 de 2012", "RLS", "PMS"],
    updated: UPDATED,
    sections: [
      {
        type: "features",
        heading: "Seis barreras, no una promesa",
        sub: "La confianza no se pide con adjetivos. Se construye con restricciones que se pueden verificar.",
        items: [
          {
            title: "1. Los precios no se generan: se consultan",
            body: "Tarifas y disponibilidad salen del PMS en el instante de responder. El agente no tiene forma de ofrecer una habitación que no existe ni una tarifa que usted no fijó.",
          },
          {
            title: "2. Las políticas son las suyas, textuales",
            body: "Cancelación, mascotas, niños, check-in, parqueadero: el agente responde con la base de conocimiento de su hotel. Si algo no está ahí, no se lo inventa.",
          },
          {
            title: "3. Cuando no sabe, pregunta",
            body: "Escala a su equipo por WhatsApp, le dice la verdad al huésped y espera. Y la respuesta que recibe queda guardada como conocimiento del hotel para la próxima vez.",
          },
          {
            title: "4. Todo queda registrado",
            body: "Cada acción con su hora, su justificación y las palabras del huésped que la motivaron. Puede auditar cualquier conversación y revertir lo que haga falta.",
          },
          {
            title: "5. La calidad se mide, no se supone",
            body: "Un evaluador automático califica las conversaciones del agente en varias dimensiones —precisión, tono, cumplimiento, criterio para escalar— y le muestra dónde está flojo.",
          },
          {
            title: "6. Usted tiene el interruptor",
            body: "Tome el control de una conversación con un clic. O apague al agente por completo. Su operación no depende de nuestro permiso.",
          },
        ],
      },
      {
        type: "compare",
        heading: "Lo que el agente sí hace y lo que nunca hace",
        before: {
          label: "Nunca",
          items: [
            "Inventar una tarifa, un descuento o una habitación disponible.",
            "Prometer algo que su hotel no ofrece.",
            "Decir que es humano si el huésped pregunta directamente.",
            "Escribirle a un huésped fuera de la ventana que permite WhatsApp.",
            "Compartir un link de pago dentro de un hilo de Booking.com o Airbnb.",
            "Seguir insistiendo cuando alguien pide que lo dejen en paz.",
          ],
        },
        after: {
          label: "Siempre",
          items: [
            "Cotizar sobre la disponibilidad y las tarifas reales del PMS.",
            "Repetir sus políticas tal como usted las escribió.",
            "Escalar a una persona cuando la consulta lo amerita.",
            "Dejar registro de qué hizo, cuándo y por qué.",
            "Respetar los límites de cada canal y de cada plataforma.",
            "Obedecer las reglas del hotel por encima de cualquier oportunidad de venta.",
          ],
        },
        footnote:
          "El agente ejecuta dentro de las reglas que usted define. Las reglas ganan siempre, incluso cuando romperlas cerraría una venta.",
      },
      {
        type: "prose",
        heading: "Los datos de sus huéspedes",
        body: [
          "Cada hotel es un espacio aislado dentro de la plataforma: sus conversaciones, sus huéspedes, sus tarifas y sus reportes no son visibles para ningún otro hotel. El aislamiento está aplicado en la base de datos, no solo en la interfaz.",
          "Los datos personales de sus huéspedes se tratan conforme a la Ley 1581 de 2012 de protección de datos personales de Colombia, y el hotel sigue siendo el responsable del tratamiento: nosotros operamos como su encargado. Los datos no se usan para entrenar modelos generales.",
          "El acceso de su equipo se controla por rol: quién puede ver conversaciones, quién puede cambiar tarifas, quién puede ver los números del negocio. Y si algún día decide irse, sus datos son suyos y se los entregamos.",
        ],
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            q: "¿Puede la IA darle un precio equivocado a un huésped?",
            a: "El agente no genera precios: los lee del PMS en el momento de responder, junto con la disponibilidad. Si una tarifa está mal en el PMS, estará mal en la respuesta; si el PMS está bien, la respuesta está bien. Esa es la diferencia con un chatbot que contesta con textos guardados que envejecen.",
          },
          {
            q: "¿Qué pasa si un huésped intenta manipular al agente?",
            a: "El agente opera dentro de límites que no puede negociar: no puede ofrecer descuentos que usted no autorizó, ni cambiar políticas, ni saltarse la tarifa mínima, por más convincente que sea el mensaje. Los intentos de manipulación quedan registrados.",
          },
          {
            q: "¿Puedo revisar qué le dijo el agente a mis huéspedes?",
            a: "Sí. Todas las conversaciones están en la bandeja, completas y buscables, con el registro de cada acción que el agente ejecutó y su justificación. Además, un evaluador automático las califica y le señala las que conviene revisar.",
          },
          {
            q: "¿Los datos de mis huéspedes se comparten con otros hoteles?",
            a: "No. Cada hotel opera en un espacio aislado, con el aislamiento aplicado a nivel de base de datos. Ningún hotel puede ver los datos de otro, y sus datos no se usan para entrenar modelos generales.",
          },
        ],
      },
    ],
    related: [
      { label: "El agente IA", href: "/hoteles/agente-ia" },
      { label: "Recepción 24/7", href: "/hoteles/recepcion-24-7" },
      { label: "Gerencia y BI", href: "/hoteles/gerencia" },
    ],
    cta: HOTEL_CTA,
  },
];
