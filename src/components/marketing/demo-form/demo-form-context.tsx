"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { track } from "@/lib/analytics/client";

interface DemoFormContextValue {
  isOpen: boolean;
  source: string;
  open: (source?: string) => void;
  close: () => void;
}

const DemoFormContext = createContext<DemoFormContextValue>({
  isOpen: false,
  source: "landing",
  open: () => {},
  close: () => {},
});

export function DemoFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("landing");

  const open = useCallback((src?: string) => {
    const resolved = src || "landing";
    setSource(resolved);
    setIsOpen(true);
    // `source` is which CTA opened it, so the abandonment rate can be read per
    // placement — the pricing page and the hero convert very differently.
    track("form_open", { source: resolved });
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <DemoFormContext.Provider value={{ isOpen, source, open, close }}>
      {children}
    </DemoFormContext.Provider>
  );
}

export function useDemoForm() {
  return useContext(DemoFormContext);
}
