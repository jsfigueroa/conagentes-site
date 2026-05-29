"use client";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 25,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div className={`group flex overflow-hidden relative ${className ?? ""}`}>
      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[inherit] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[inherit] to-transparent pointer-events-none" />
      <div
        className={`flex shrink-0 gap-12 pr-12 animate-marquee ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
