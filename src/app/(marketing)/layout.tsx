import { MegaMenuHeader } from "@/components/marketing/header/mega-menu-header";
import { Footer } from "@/components/marketing/sections/footer";
import { SmoothScrollProvider } from "@/components/marketing/providers/smooth-scroll";
import { MotionProvider } from "@/components/marketing/providers/motion-provider";
import { DemoFormProvider } from "@/components/marketing/demo-form/demo-form-context";
import { DemoFormModal } from "@/components/marketing/demo-form/demo-form-modal";
import { MarketingJsonLd } from "@/components/marketing/seo/json-ld";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <DemoFormProvider>
        <SmoothScrollProvider>
          <MarketingJsonLd />
          <MegaMenuHeader />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <DemoFormModal />
      </DemoFormProvider>
    </MotionProvider>
  );
}
