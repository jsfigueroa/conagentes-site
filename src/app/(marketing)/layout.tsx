import { MegaMenuHeader } from "@/components/marketing/header/mega-menu-header";
import { Footer } from "@/components/marketing/sections/footer";
import { SmoothScrollProvider } from "@/components/marketing/providers/smooth-scroll";
import { MotionProvider } from "@/components/marketing/providers/motion-provider";
import { DemoFormProvider } from "@/components/marketing/demo-form/demo-form-context";
import { DemoFormModal } from "@/components/marketing/demo-form/demo-form-modal";
import { VoiceCallProvider } from "@/components/marketing/voice-call/voice-call-context";
import { VoiceCallModal } from "@/components/marketing/voice-call/voice-call-modal";
import { CallInvitePopup } from "@/components/marketing/voice-call/call-invite-popup";
import { MarketingJsonLd } from "@/components/marketing/seo/json-ld";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <DemoFormProvider>
        <VoiceCallProvider>
          <SmoothScrollProvider>
            <MarketingJsonLd />
            <MegaMenuHeader />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
          <DemoFormModal />
          {/* Mounted once, outside the scroll container, so a call survives
              navigation between marketing pages. */}
          <VoiceCallModal />
          {/* CON-293. Mounted here and not per page so it fires once per load
              and never twice; it sits BELOW the call panel's z-index so the
              panel it opens always covers it. */}
          <CallInvitePopup />
        </VoiceCallProvider>
      </DemoFormProvider>
    </MotionProvider>
  );
}
