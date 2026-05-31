"use client";

import { createContext, useContext, useState, useCallback } from "react";

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
    setSource(src || "landing");
    setIsOpen(true);
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
