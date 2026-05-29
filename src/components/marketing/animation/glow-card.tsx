"use client";

import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
}

export function GlowCard({
  children,
  className,
  glowColor = "oklch(0.86 0.27 148)",
  glowSize = 25,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-400"
        style={{
          opacity,
          background: `radial-gradient(${glowSize}rem ${glowSize}rem at ${pos.x}px ${pos.y}px, ${glowColor}20, transparent 50%)`,
        }}
      />
    </div>
  );
}
