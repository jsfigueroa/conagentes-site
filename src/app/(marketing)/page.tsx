import { HeroSection } from "@/components/marketing/sections/hero";
import { PainPointsSection } from "@/components/marketing/sections/pain-points";
import { SolutionSection } from "@/components/marketing/sections/solution";
import { FeaturesBentoSection } from "@/components/marketing/sections/features-bento";
import { IndustriesSection } from "@/components/marketing/sections/industries";
import { HowItWorksSection } from "@/components/marketing/sections/how-it-works";
import { SocialProofSection } from "@/components/marketing/sections/social-proof";
import { PricingSection } from "@/components/marketing/sections/pricing";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <PainPointsSection />
      <SolutionSection />
      <FeaturesBentoSection />
      <IndustriesSection />
      <HowItWorksSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCtaSection />
    </>
  );
}
