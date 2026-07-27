import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringActionView } from "@/components/hiring/HiringActionComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringActionBoard, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "招聘行动板"
      : "Hiring Action Board";
  const description =
    locale === "zh"
      ? "招聘行动板，把 Lewis Dong 的岗位准备度转成招聘方、经理、面试、入职和证据评审的下一步。"
      : "A hiring action board for turning Lewis Dong role readiness into recruiter, manager, interview, onboarding, and proof-review next steps.";
  const path = "/hire/action";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringActionPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringActionBoard(proofLocale);

  return (
    <main className="page hiring-action-page" data-screen-label="39 Hiring Action">
      <HiringActionView pack={pack} />
    </main>
  );
}
