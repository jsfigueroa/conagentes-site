export type PipelineStage = "nuevo" | "interesado" | "calificado" | "cerrado";

export interface ScriptMessage {
  id: string;
  sender: "customer" | "ai";
  text: string;
  pipelineEvent?: PipelineStage;
}

export const PIPELINE_STAGES = [
  {
    id: "nuevo" as const,
    label: "Nuevo",
    dotColor: "bg-[oklch(0.62_0.18_250)]",
  },
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

export const CONVERSATION: ScriptMessage[] = [
  {
    id: "1",
    sender: "customer",
    text: "Hola, buenas tardes 👋",
    pipelineEvent: "nuevo",
  },
  {
    id: "2",
    sender: "ai",
    text: "¡Hola! Bienvenido al Hotel Boutique 🌴 ¿En qué puedo ayudarle?",
  },
  {
    id: "3",
    sender: "customer",
    text: "Quisiera reservar una habitación del 15 al 17 de junio",
    pipelineEvent: "interesado",
  },
  {
    id: "4",
    sender: "ai",
    text: "¡Disponible! ¿Cuántas personas se hospedarán?",
  },
  {
    id: "5",
    sender: "customer",
    text: "2 adultos. ¿Tienen suite con vista al mar?",
    pipelineEvent: "calificado",
  },
  {
    id: "6",
    sender: "ai",
    text: "Sí 🌊 Suite Ocean View: $380.000/noche con desayuno. ¿Le envío link de pago?",
  },
  {
    id: "7",
    sender: "customer",
    text: "¡Sí, por favor!",
    pipelineEvent: "cerrado",
  },
  {
    id: "8",
    sender: "ai",
    text: "✅ Reserva confirmada. Link enviado por este chat. ¡Le esperamos!",
  },
];

export const LEAD_NAME = "María García";
