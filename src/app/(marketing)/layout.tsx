import { Navbar } from "@/components/marketing/sections/navbar";
import { Footer } from "@/components/marketing/sections/footer";
import { SmoothScrollProvider } from "@/components/marketing/providers/smooth-scroll";
import { MotionProvider } from "@/components/marketing/providers/motion-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <SmoothScrollProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </MotionProvider>
  );
}
