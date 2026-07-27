import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { HiringShortlistView } from "@/components/hiring/HiringShortlistComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getHiringShortlistMemo, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Hiring Shortlist Memo"
      : "Hiring Shortlist Memo";
  const description =
    "A recruiter-facing shortlist memo for sharing Lewis Dong's role-fit proof, scorecard boundary, and next action with a hiring manager.";
  const path = "/hire/shortlist";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HiringShortlistPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const memo = getHiringShortlistMemo(proofLocale);

  return (
    <main className="page hiring-shortlist-page" data-screen-label="26 Hiring Shortlist">
      <HiringShortlistView memo={memo} />
    </main>
  );
}
