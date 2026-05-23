import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringImpactView } from "@/components/hiring/HiringImpactComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringImpactReview, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Impact Review Pack | Lewis Dong"
      : "Impact Review Pack | Interview Lewis";
  const description =
    "An early impact review pack for reviewing Lewis Dong's proof anchor, first-month evidence, stakeholder checkpoint, delivery review, risk watch, and next milestone.";
  const path = "/hire/impact";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringImpactPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringImpactReview(proofLocale);

  return (
    <main className="page hiring-impact-page" data-screen-label="32 Hiring Impact">
      <HiringImpactView pack={pack} />
    </main>
  );
}
