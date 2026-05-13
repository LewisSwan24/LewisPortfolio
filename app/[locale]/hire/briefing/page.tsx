import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringBriefingView } from "@/components/hiring/HiringBriefingComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringBriefingRoom, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Hiring Briefing Room | Lewis Dong"
      : "Hiring Briefing Room | Interview Lewis";
  const description =
    "A hiring briefing room for turning Lewis Dong's proof routes into stakeholder-ready handoff notes for recruiters, hiring managers, design leads, interview panels, and onboarding partners.";
  const path = "/hire/briefing";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringBriefingPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringBriefingRoom(proofLocale);

  return (
    <main className="page hiring-briefing-page" data-screen-label="37 Hiring Briefing">
      <HiringBriefingView pack={pack} />
    </main>
  );
}
