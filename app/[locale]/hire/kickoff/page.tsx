import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringKickoffView } from "@/components/hiring/HiringKickoffComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringKickoffAlignment, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Kickoff Alignment Pack | Lewis Dong"
      : "Kickoff Alignment Pack | Interview Lewis";
  const description =
    "A kickoff alignment pack for reviewing Lewis Dong's proof anchor, first project brief, success metric, stakeholder question, delivery artifact, risk guardrail, and next action.";
  const path = "/hire/kickoff";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringKickoffPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringKickoffAlignment(proofLocale);

  return (
    <main className="page hiring-kickoff-page" data-screen-label="31 Hiring Kickoff">
      <HiringKickoffView pack={pack} />
    </main>
  );
}
