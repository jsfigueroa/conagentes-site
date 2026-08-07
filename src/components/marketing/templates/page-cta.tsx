"use client";

import { useDemoForm } from "@/components/marketing/demo-form/demo-form-context";

/** Client CTA button that opens the shared demo-form modal. */
export function DemoButton({
  children,
  source = "page",
  className,
}: {
  children: React.ReactNode;
  source?: string;
  className?: string;
}) {
  const { open } = useDemoForm();
  return (
    <button type="button" onClick={() => open(source)} className={className}>
      {children}
    </button>
  );
}
