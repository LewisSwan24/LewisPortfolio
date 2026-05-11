import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringOnboardingView } from "@/components/hiring/HiringOnboardingComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringOnboardingReadiness, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Onboarding Readiness Plan | Lewis Dong"
      : "Onboarding Readiness Plan | Interview Lewis";
  const description =
    "An onboarding-readiness plan for reviewing Lewis Dong's proof anchor, first-week focus, first-30-days outcome, onboarding risk, manager question, and next action.";
  const path = "/hire/onboarding";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringOnboardingPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringOnboardingReadiness(proofLocale);

  return (
    <main className="page hiring-onboarding-page" data-screen-label="30 Hiring Onboarding">
      <HiringOnboardingView pack={pack} />
    </main>
  );
}
