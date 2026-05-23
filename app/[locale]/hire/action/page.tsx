import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringActionView } from "@/components/hiring/HiringActionComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringActionBoard, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Hiring Action Board | Lewis Dong"
      : "Hiring Action Board | Interview Lewis";
  const description =
    "A hiring action board for turning Lewis Dong role readiness into recruiter, manager, interview, onboarding, and proof-review next steps.";
  const path = "/hire/action";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringActionPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringActionBoard(proofLocale);

  return (
    <main className="page hiring-action-page" data-screen-label="39 Hiring Action">
      <HiringActionView pack={pack} />
    </main>
  );
}
