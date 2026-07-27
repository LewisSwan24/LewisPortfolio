import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringReadinessView } from "@/components/hiring/HiringReadinessComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringReadinessGate, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "招聘准备度检查"
      : "Hiring Readiness Gate";
  const description =
    locale === "zh"
      ? "招聘准备度检查页，用来判断 Lewis Dong 的每条岗位路径是否适合联系、面试、决策、入职或证据评审。"
      : "A hiring readiness gate for deciding whether each Lewis Dong role lane is ready for contact, interview, decision, onboarding, or proof review.";
  const path = "/hire/readiness";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringReadinessPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringReadinessGate(proofLocale);

  return (
    <main className="page hiring-readiness-page" data-screen-label="38 Hiring Readiness">
      <HiringReadinessView pack={pack} />
    </main>
  );
}
