import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringDebriefView } from "@/components/hiring/HiringDebriefComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringManagerDebrief, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Hiring Manager Debrief"
      : "Hiring Manager Debrief";
  const description =
    "A hiring-manager debrief board for turning Lewis Dong's shortlist memo, proof anchor, boundary, and second-round question into a practical next conversation.";
  const path = "/hire/debrief";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringDebriefPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const board = getHiringManagerDebrief(proofLocale);

  return (
    <main className="page hiring-debrief-page" data-screen-label="27 Hiring Debrief">
      <HiringDebriefView board={board} />
    </main>
  );
}
