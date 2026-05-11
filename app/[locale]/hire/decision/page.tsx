import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringDecisionView } from "@/components/hiring/HiringDecisionComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringDecisionPack, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Hiring Decision Pack | Lewis Dong"
      : "Hiring Decision Pack | Interview Lewis";
  const description =
    "A final hiring decision pack for reviewing Lewis Dong's proof anchor, remaining risk, close question, and next action before an offer conversation or deeper loop.";
  const path = "/hire/decision";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringDecisionPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringDecisionPack(proofLocale);

  return (
    <main className="page hiring-decision-page" data-screen-label="28 Hiring Decision">
      <HiringDecisionView pack={pack} />
    </main>
  );
}
