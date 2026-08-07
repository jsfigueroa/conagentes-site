import { cn } from "@/lib/utils";

function StackMark({
  size,
  variant,
}: {
  size: number;
  variant: "light" | "dark";
}) {
  const ink = variant === "dark" ? "oklch(0.92 0.005 95)" : "oklch(0.20 0.01 95)";
  const neon = "oklch(0.74 0.185 50)";
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
    >
      <rect x="28" y="100" width="80" height="80" rx="10" fill={ink} />
      <rect x="68" y="60" width="80" height="80" rx="10" fill={ink} />
      <rect x="108" y="20" width="80" height="80" rx="10" fill={neon} />
    </svg>
  );
}

const markSizes = { sm: 20, default: 24, lg: 36 } as const;
const textSizes = { sm: "text-base", default: "text-lg", lg: "text-2xl" } as const;
const gapSizes = { sm: "gap-1.5", default: "gap-2", lg: "gap-3" } as const;

export function Logo({
  className,
  size = "default",
  variant = "light",
}: {
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "light" | "dark";
}) {
  return (
    <div className={cn("flex items-center", gapSizes[size], className)}>
      <StackMark size={markSizes[size]} variant={variant} />
      <span
        className={cn(
          "font-bold tracking-tight leading-none",
          textSizes[size],
          variant === "dark" ? "text-[oklch(0.96_0.005_95)]" : "text-foreground"
        )}
      >
        conagentes
      </span>
    </div>
  );
}

export function LogoMark({
  className,
  size = 24,
  variant = "light",
}: {
  className?: string;
  size?: number;
  variant?: "light" | "dark";
}) {
  return (
    <div className={className}>
      <StackMark size={size} variant={variant} />
    </div>
  );
}
