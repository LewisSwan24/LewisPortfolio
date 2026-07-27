import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { RoleComparisonView } from "@/components/hiring/RoleComparisonComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getRoleComparisonBoard, type ProofLocale } from "@/lib/proof";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "Role Comparison Board"
      : "Role Comparison Board";
  const description =
    "A recruiter-facing comparison board for choosing Lewis Dong's UX/Product, UX Research, AI UX, or Accessibility hiring path.";
  const path = "/hire/compare";

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function RoleComparisonPage() {
  const locale = await getLocale();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const board = getRoleComparisonBoard(proofLocale);

  return (
    <main className="page role-comparison-page" data-screen-label="23 Role Compare">
      <RoleComparisonView board={board} />
    </main>
  );
}
