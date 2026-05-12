import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringPartnershipView } from "@/components/hiring/HiringPartnershipComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringPartnershipOperatingPack, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Partnership Operating Pack | Lewis Dong"
      : "Partnership Operating Pack | Interview Lewis";
  const description =
    "A partnership operating pack for extending Lewis Dong's retention readiness into a working agreement, manager touchpoint, team ritual, escalation rule, success review, and next partnership action.";
  const path = "/hire/partnership";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringPartnershipPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringPartnershipOperatingPack(proofLocale);

  return (
    <main className="page hiring-partnership-page" data-screen-label="35 Hiring Partnership">
      <HiringPartnershipView pack={pack} />
    </main>
  );
}
