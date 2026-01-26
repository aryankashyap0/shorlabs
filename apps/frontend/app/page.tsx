import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { PricingSection } from "@/components/PricingSection";
import SectionNavigation from "@/components/SectionNavigation";

export default function Home() {
  return (
    <>
      <SectionNavigation />
      <HeroSection />
      <FeatureSection />
      <PricingSection />
    </>
  );
}

