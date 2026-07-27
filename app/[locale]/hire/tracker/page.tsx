import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringTrackerView } from "@/components/hiring/HiringTrackerComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringFollowUpTracker, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "招聘跟进追踪"
      : "Hiring Follow-up Tracker";
  const description =
    locale === "zh"
      ? "招聘跟进追踪页，把 Lewis Dong 的岗位行动转成负责人、截止窗口、证据依赖、升级路径和收尾信号。"
      : "A hiring follow-up tracker for turning Lewis Dong role actions into owner, due window, evidence dependency, escalation, and closeout signals.";
  const path = "/hire/tracker";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringTrackerPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringFollowUpTracker(proofLocale);

  return (
    <main className="page hiring-tracker-page" data-screen-label="40 Hiring Tracker">
      <HiringTrackerView pack={pack} />
    </main>
  );
}
