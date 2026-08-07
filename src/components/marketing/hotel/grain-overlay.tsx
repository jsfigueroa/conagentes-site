/**
 * Film-grain / noise overlay — a low-opacity self-contained SVG turbulence.
 * Pure, no client hooks; safe to drop into any (client or server) section.
 * Sells "premium / hand-made" on the warm near-black canvas (2026 anti-slop
 * texture move) at near-zero cost. Decorative → aria-hidden, pointer-events-none.
 */
export function GrainOverlay({
  opacity = 0.05,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
