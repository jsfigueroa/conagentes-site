"use client";

import { useState, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltStrength?: number;
  perspective?: number;
}

export function TiltCard({
  children,
  className,
  tiltStrength = 7,
  perspective = 1000,
}: TiltCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      setRotate({
        x: (y - centerY) / tiltStrength,
        y: (centerX - x) / tiltStrength,
      });
    },
    [tiltStrength]
  );

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      className={className}
      style={{
        transform: `perspective(${perspective}px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1,1,1)`,
        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
