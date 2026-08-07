// Shared data + types for the scroll-told customer journey ("StorySection").
// One continuous SMB-products story: a recurring customer buys from a small
// distributor, the AI consolidates the order, it lands on the dashboard, the
// agent anticipates the reorder, and the owner launches a campaign.
// All copy is es-CO and value-first (no technical jargon).

export type StorySceneId =
  | "chat"
  | "order"
  | "dashboard"
  | "intelligence"
  | "campaign";

export type PipelineStage = "nuevo" | "interesado" | "calificado" | "cerrado";

// ── Cast (illustrative — not a real client) ───────────────────────────────
export const BUSINESS_NAME = "Surti Express";
export const BUSINESS_INITIALS = "SE";
export const CUSTOMER_NAME = "Laura Gómez";

// ── Money ─────────────────────────────────────────────────────────────────
/** Colombian peso formatting: 1234000 → "$1.234.000" */
export function formatCOP(value: number): string {
  return `$${value.toLocaleString("es-CO")}`;
}

// ── Pipeline (mirrors hero-demo conventions) ──────────────────────────────
export const PIPELINE_STAGES = [
  { id: "nuevo" as const, label: "Nuevo", dotColor: "bg-[oklch(0.62_0.18_250)]" },
  {
    id: "interesado" as const,
    label: "Interesado",
    dotColor: "bg-[oklch(0.80_0.15_82)]",
  },
  {
    id: "calificado" as const,
    label: "Calificado",
    dotColor: "bg-[oklch(0.60_0.18_310)]",
  },
  {
    id: "cerrado" as const,
    label: "Cerrado",
    dotColor: "bg-[oklch(0.64_0.19_42)]",
  },
] as const;

// ── Catalog products shown in chat (Act 1) ────────────────────────────────
export interface StoryProduct {
  name: string;
  detail: string;
  price: number;
  emoji: string;
}

// ── Chat message model (extends the hero's text-only ScriptMessage) ───────
export interface StoryChatMessage {
  id: string;
  sender: "customer" | "ai";
  text?: string;
  /** Renders a product-card bubble instead of (or with) text */
  product?: StoryProduct;
  pipelineEvent?: PipelineStage;
}

// Act 1 — "La conversación que vende": customer asks, AI answers + sends a
// catalog product card, lead climbs the pipeline.
export const CHAT_SCRIPT: StoryChatMessage[] = [
  {
    id: "c1",
    sender: "customer",
    text: "Hola, ¿tienen vasos desechables al por mayor? 👋",
    pipelineEvent: "nuevo",
  },
  {
    id: "c2",
    sender: "ai",
    text: "¡Hola Laura! Claro que sí 🙌 Este es el más pedido:",
    pipelineEvent: "interesado",
  },
  {
    id: "c3",
    sender: "ai",
    product: {
      name: "Vaso 7 oz x 1.000",
      detail: "Caja surtida · entrega 24 h",
      price: 89000,
      emoji: "🥤",
    },
  },
  {
    id: "c4",
    sender: "customer",
    text: "Perfecto. También necesito servilletas y domos 🙏",
    pipelineEvent: "calificado",
  },
  {
    id: "c5",
    sender: "ai",
    text: "Listo, te armo el pedido completo con precios 👇",
  },
];

// ── Order lines (Act 2) ───────────────────────────────────────────────────
export interface OrderLine {
  name: string;
  qty: number;
  unit: number;
}

export const ORDER_LINES: OrderLine[] = [
  { name: "Vaso 7 oz x 1.000", qty: 3, unit: 89000 },
  { name: "Servilleta x 500", qty: 2, unit: 24000 },
  { name: "Domo 16 oz x 500", qty: 1, unit: 65000 },
];

export const ORDER_TOTAL = ORDER_LINES.reduce(
  (sum, l) => sum + l.qty * l.unit,
  0,
);

// ── The narrative spine ───────────────────────────────────────────────────
export interface StoryAct {
  id: StorySceneId;
  eyebrow: string;
  title: string;
  highlight: string; // emphasized fragment inside the title
  body: string;
  bullets: string[];
}

export const ACTS: StoryAct[] = [
  {
    id: "chat",
    eyebrow: "01 · Atiende",
    title: "La conversación que",
    highlight: "vende sola",
    body: "Su cliente escribe por WhatsApp y su agente responde en segundos, a cualquier hora. Muestra productos con foto y precio, resuelve dudas y mueve el contacto por su embudo — sin que usted esté.",
    bullets: [
      "Responde 24/7, incluso de madrugada",
      "Envía catálogo con precios al instante",
      "Ningún cliente se queda sin respuesta",
    ],
  },
  {
    id: "order",
    eyebrow: "02 · Cotiza",
    title: "El pedido",
    highlight: "se arma solo",
    body: "Cuando el cliente elige, el agente consolida todo en un pedido formal: producto por producto, cantidad, precio unitario y total en pesos. Sin recotizar a mano, sin errores de precio.",
    bullets: [
      "Suma cantidades y totales automáticamente",
      "Usa siempre los precios de su catálogo",
      "Un chat desordenado se vuelve un pedido claro",
    ],
  },
  {
    id: "dashboard",
    eyebrow: "03 · Organiza",
    title: "Todo llega a",
    highlight: "su panel",
    body: "El pedido, el cliente y la conversación quedan registrados solos en su panel. ¿Quiere saber cómo va el negocio? Escríbale a su agente por WhatsApp y le responde con números reales.",
    bullets: [
      "Su panel se llena solo, cero digitación",
      "Su negocio le responde por WhatsApp",
      "Decisiones con datos, no a la corazonada",
    ],
  },
  {
    id: "intelligence",
    eyebrow: "04 · Anticipa",
    title: "Su agente",
    highlight: "se anticipa",
    body: "Con cada compra su agente aprende cómo compra cada cliente. Sabe cuándo está por volver a pedir y se lo dice antes — para que venda primero y no pierda a nadie.",
    bullets: [
      "Reconoce el patrón de recompra de cada cliente",
      "Le avisa quién está por volver a pedir",
      "Recupera clientes antes de perderlos",
    ],
  },
  {
    id: "campaign",
    eyebrow: "05 · Reactiva",
    title: "Convierte el dato",
    highlight: "en una campaña",
    body: "Con ese conocimiento, lanza una campaña por WhatsApp al grupo exacto de clientes — por ejemplo, los que están por reordenar — y mide quién la recibió y respondió. Todo dentro de las reglas de WhatsApp.",
    bullets: [
      "Llega a cientos de clientes con un mensaje",
      "Segmenta por comportamiento de compra",
      "Sin arriesgar el bloqueo de su número",
    ],
  },
];
