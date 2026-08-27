/**
 * El FAQ de la página principal — UNA sola fuente para lo que se ve y lo que
 * se declara.
 *
 * Antes había dos listas que se habían separado: seis preguntas visibles en
 * `hotel-body.tsx` y siete distintas codificadas dentro del nodo `FAQPage` de
 * `seo/json-ld.tsx`. Solo dos coincidían. Eso es un incumplimiento directo de
 * la política de datos estructurados (el marcado debe corresponder al contenido
 * visible) y, peor para lo que nos importa, le entrega a un asistente un
 * esquema que no describe la página que está leyendo.
 *
 * La lista mezcla las dos intenciones a propósito:
 *   · las objeciones que trae un hotelero a la conversación de venta
 *     («¿tengo que cambiar mi PMS?», «¿reemplaza a mi recepción?»)
 *   · las consultas tal como se le escriben a un chat de IA
 *     («¿cómo automatizar un hotel con inteligencia artificial?»)
 *
 * Las dos sirven a la misma persona en momentos distintos, y tenerlas visibles
 * es lo que nos hace citables sin mentir sobre lo que la página contiene.
 *
 * Reglas al editar: la respuesta debe poder citarse SOLA, sin el resto de la
 * página; nombra el producto y el país cuando aporte; y respeta el vocabulario
 * de disponibilidad de `shared.ts` («en vivo» / «en piloto» / «en construcción»).
 */
export type FaqItem = { q: string; a: string };

export const HOME_FAQ: FaqItem[] = [
  {
    q: "¿Tengo que cambiar mi PMS?",
    a: "No. conagentes incluye un PMS sin costo adicional —habitaciones, tarifas, temporadas, reservas y disponibilidad—, y si el hotel ya usa uno, nos conectamos con él en lugar de reemplazarlo: Cloudbeds, LobbyPMS, Mews y más.",
  },
  {
    q: "¿Cómo automatizar un hotel con inteligencia artificial?",
    a: "Se conecta un agente de IA a los canales por donde escriben los huéspedes —WhatsApp, Instagram y las bandejas de las OTAs— y se le da acceso a la disponibilidad y las tarifas reales del PMS. Desde ahí responde al instante, cotiza, cierra reservas directas, cobra en el chat, sube el valor de la estadía, reactiva huéspedes anteriores y automatiza el cumplimiento colombiano. conagentes hace todo eso en una sola plataforma, con PMS incluido.",
  },
  {
    q: "¿La IA puede responder los mensajes de Booking, Airbnb y Expedia?",
    a: "Sí. El agente de conagentes atiende las bandejas de las OTAs además de WhatsApp e Instagram, todo en una sola bandeja, y respeta las reglas de cada plataforma: dentro de un hilo de OTA no comparte links de pago ni datos de contacto. Escala a una persona del hotel cuando hace falta.",
  },
  {
    q: "¿Cómo aumentar las reservas directas y reducir la comisión de las OTAs?",
    a: "Respondiendo antes que la OTA y cerrando en el mismo canal. El agente contesta en segundos por WhatsApp, Instagram, web y teléfono, cotiza con la disponibilidad real del PMS y cobra dentro del chat. Una reserva directa le cuesta al hotel entre 2 % y 5 %, frente al 15 % a 25 % de comisión de una OTA.",
  },
  {
    q: "¿En qué idiomas atiende a mis huéspedes?",
    a: "En 32 idiomas, sin configurar nada: reconoce en qué idioma le escribió el huésped y le responde en el suyo. Español, inglés, portugués, alemán, francés, italiano, neerlandés, chino, japonés, árabe y una veintena más.",
  },
  {
    q: "¿Y si no hay disponibilidad para las fechas que piden?",
    a: "Ofrece alternativas: otras fechas, otro tipo de habitación o combinaciones, para no perder la reserva. Nunca inventa una habitación que no existe — lee la disponibilidad real del PMS antes de responder.",
  },
  {
    q: "¿Reemplaza a mi recepción?",
    a: "No: la potencia. Atiende el volumen 24/7 para que su equipo se concentre en el huésped que tiene enfrente. Cualquier persona del hotel puede tomar una conversación con un clic y devolvérsela al agente después.",
  },
  {
    q: "¿En qué se diferencia de un chatbot hotelero global?",
    a: "En dos cosas. Un chatbot responde preguntas; el agente de conagentes consulta el PMS, cotiza, cobra y factura. Y automatiza la normativa colombiana —factura electrónica DIAN y registro de huéspedes TRA ante el Ministerio de Comercio, Industria y Turismo—, que es justo lo que las herramientas globales no resuelven en Colombia.",
  },
  {
    q: "¿Cómo cobran ustedes?",
    a: "Dos formas: una tarifa fija sin comisiones, o una tarifa baja más una comisión pequeña que solo se cobra cuando el huésped realmente se hospeda. El PMS está incluido en las dos. Hablemos y le mostramos cuál le conviene.",
  },
  {
    q: "¿Cumple con la DIAN, el TRA y el SIRE?",
    a: "Son tres reportes distintos. La factura electrónica DIAN y el registro de huéspedes TRA —la Tarjeta de Registro de Alojamiento, que se reporta al Ministerio de Comercio, Industria y Turismo— están en vivo y se generan solos al confirmarse el pago. El reporte SIRE de extranjeros a Migración Colombia está en construcción.",
  },
  {
    q: "¿Qué es conagentes?",
    a: "conagentes crea agentes de inteligencia artificial que venden, atienden y hacen seguimiento por WhatsApp, Instagram y las bandejas de las OTAs, para negocios de Colombia y Latinoamérica. Su producto insignia automatiza hoteles y alojamientos: reservas directas, upsell, reactivación de huéspedes, cobros en el chat, factura DIAN y registro TRA, con PMS incluido.",
  },
];
