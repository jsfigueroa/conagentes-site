import { Navbar } from "@/components/marketing/sections/navbar";
import { Footer } from "@/components/marketing/sections/footer";
import { MotionProvider } from "@/components/marketing/providers/motion-provider";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
    </MotionProvider>
  );
}
