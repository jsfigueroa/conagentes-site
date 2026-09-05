"use client";

import { createContext, useCallback, useContext, useState } from "react";

/**
 * Opens the voice-call panel from anywhere on the marketing site (CON-260),
 * mirroring the demo-form provider so a CTA deep in a page never has to own the
 * call UI. `source` records which button was pressed; it rides along so we can
 * tell a hero click from a pricing-page click when reading the leads later.
 */

interface VoiceCallContextValue {
  isOpen: boolean;
  source: string;
  open: (source?: string) => void;
  close: () => void;
}

const VoiceCallContext = createContext<VoiceCallContextValue>({
  isOpen: false,
  source: "hoteles",
  open: () => {},
  close: () => {},
});

export function VoiceCallProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("hoteles");

  const open = useCallback((src?: string) => {
    setSource(src || "hoteles");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <VoiceCallContext.Provider value={{ isOpen, source, open, close }}>
      {children}
    </VoiceCallContext.Provider>
  );
}

export function useVoiceCall() {
  return useContext(VoiceCallContext);
}
