import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringGrowthView } from "@/components/hiring/HiringGrowthComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringGrowthRoadmap, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Growth Roadmap Pack | Lewis Dong"
      : "Growth Roadmap Pack | Interview Lewis";
  const description =
    "A 90-day growth roadmap pack for extending Lewis Dong's proof anchor, first-month impact, team leverage, capability transfer, operating rhythm, risk watch, and next review.";
  const path = "/hire/growth";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringGrowthPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringGrowthRoadmap(proofLocale);

  return (
    <main className="page hiring-growth-page" data-screen-label="33 Hiring Growth">
      <HiringGrowthView pack={pack} />
    </main>
  );
}
