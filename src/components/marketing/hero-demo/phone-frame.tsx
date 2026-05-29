import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative w-[280px] sm:w-[300px] md:w-[320px]">
      {/* Side buttons */}
      <div className="absolute -right-[3px] top-[100px] w-[3px] h-[44px] rounded-r-sm bg-[oklch(0.22_0.005_95)]" />
      <div className="absolute -left-[3px] top-[80px] w-[3px] h-[26px] rounded-l-sm bg-[oklch(0.22_0.005_95)]" />
      <div className="absolute -left-[3px] top-[116px] w-[3px] h-[26px] rounded-l-sm bg-[oklch(0.22_0.005_95)]" />

      {/* Phone body */}
      <div className="flex flex-col rounded-[2.5rem] border-[3px] border-[oklch(0.22_0.005_95)] bg-black overflow-hidden shadow-[0_8px_60px_oklch(0_0_0/0.6),0_0_80px_oklch(0.86_0.27_148/0.06)] h-[540px] sm:h-[580px] md:h-[620px]">
        {/* Dynamic island */}
        <div className="shrink-0 flex justify-center pt-2.5 pb-1.5 bg-black">
          <div className="w-[90px] h-[24px] rounded-full bg-[oklch(0.06_0.005_95)]" />
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>

        {/* Home indicator */}
        <div className="shrink-0 flex justify-center py-2 bg-[oklch(0.10_0.01_95)]">
          <div className="w-28 h-1 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}
