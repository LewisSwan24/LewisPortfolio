import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringRetentionView } from "@/components/hiring/HiringRetentionComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringRetentionReadiness, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Retention Readiness Pack"
      : "Retention Readiness Pack";
  const description =
    "A retention readiness pack for extending Lewis Dong's 90-day growth roadmap into long-term fit, manager support, team dependency, durability risk, review cadence, and the next retention question.";
  const path = "/hire/retention";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringRetentionPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringRetentionReadiness(proofLocale);

  return (
    <main className="page hiring-retention-page" data-screen-label="34 Hiring Retention">
      <HiringRetentionView pack={pack} />
    </main>
  );
}
