import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringScorecardView } from "@/components/hiring/HiringScorecardComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringScorecardBoard, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Hiring Scorecard | Lewis Dong"
      : "Hiring Scorecard | Interview Lewis";
  const description =
    "A recruiter-facing scorecard for turning Lewis Dong's role-fit proof, first-call agenda, and boundaries into a shortlist decision.";
  const path = "/hire/scorecard";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringScorecardPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const board = getHiringScorecardBoard(proofLocale);

  return (
    <main className="page hiring-scorecard-page" data-screen-label="25 Hiring Scorecard">
      <HiringScorecardView board={board} />
    </main>
  );
}
