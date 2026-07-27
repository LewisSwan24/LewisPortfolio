import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringCommandView } from "@/components/hiring/HiringCommandComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringCommandCenter, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "招聘控制台"
      : "Hiring Command Center";
  const description =
    locale === "zh"
      ? "招聘控制台，用来选择下一条证据路径，检查最强岗位路径，并把 Lewis Dong 的证据从面试评审延续到协作运行。"
      : "A hiring command center for choosing the next proof route, inspecting the strongest role lane, and carrying Lewis Dong's evidence from interview review through partnership operating.";
  const path = "/hire/command";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringCommandPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const pack = getHiringCommandCenter(proofLocale);

  return (
    <main className="page hiring-command-page" data-screen-label="36 Hiring Command">
      <HiringCommandView pack={pack} />
    </main>
  );
}
