import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  "ia-practica": "IA Práctica",
  automatizacion: "Automatización",
  ventas: "Ventas",
  "atencion-al-cliente": "Atención al Cliente",
  whatsapp: "WhatsApp",
  crm: "CRM",
  productividad: "Productividad",
  marketing: "Marketing Digital",
  tendencias: "Tendencias",
};

export function getCategoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function CategoryBadge({
  category,
  size = "sm",
  interactive = true,
  className,
}: {
  category: string;
  size?: "sm" | "md";
  interactive?: boolean;
  className?: string;
}) {
  const label = getCategoryLabel(category);
  const classes = cn(
    "inline-block rounded-full font-medium",
    size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1",
    "bg-neon-soft text-ink",
    interactive && "hover:bg-neon hover:text-ink transition-colors",
    className
  );

  if (interactive) {
    return (
      <Link href={`/blog/categoria/${category}`} className={classes}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
