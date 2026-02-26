import dynamic from "next/dynamic";
import { getCurrentDictionary } from "@/lib/i18n-compat";

const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection").then(mod => ({ default: mod.HeroSection })),
  { ssr: true }
);

const StatsSection = dynamic(
  () => import("@/components/sections/StatsSection").then(mod => ({ default: mod.StatsSection })),
  { ssr: true }
);

const AnimatedSection = dynamic(
  () => import("@/components/effects/AnimatedSection").then(mod => ({ default: mod.AnimatedSection })),
  { ssr: true }
);

export default async function HomePage() {
  const { dict } = await getCurrentDictionary();

  const stats = [
    { number: 50, suffix: "+", label: dict.home.stats.userInterviews },
    { number: 300, suffix: "+", label: dict.home.stats.treeTestParticipants },
    { number: 87, suffix: "%", label: dict.home.stats.taskSuccessRate },
    { number: 78, suffix: "%", label: dict.home.stats.findabilityRate },
  ];

  return (
    <>
      <HeroSection
        greeting={dict.home.greeting}
        openToOpportunities={dict.cta.openToOpportunities}
        viewProjects={dict.cta.viewProjects}
        getInTouch={dict.cta.getInTouch || "Get in Touch"}
        findMeOn={dict.home.findMeOn}
        scroll={dict.common.scroll}
      />

      <AnimatedSection className="py-24">
        <StatsSection stats={stats} />
      </AnimatedSection>
    </>
  );
}