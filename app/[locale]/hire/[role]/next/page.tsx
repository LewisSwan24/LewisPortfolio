import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { FollowThroughView } from "@/components/hiring/FollowThroughComponents";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import {
  getFollowThroughBrief,
  getProofUiLabels,
  roleRouteParams,
  type ProofLocale,
} from "@/lib/proof";

interface Props {
  params: Promise<{ role: string; locale: string }>;
}

export function generateStaticParams() {
  return roleRouteParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const locale = (await getLocale()) as "en" | "zh";
  const brief = getFollowThroughBrief(role, locale);

  if (!brief) return { title: "Follow-Through Not Found" };

  const title = `${brief.label} Follow-Through`;
  const description = brief.summary;
  const path = `/hire/${role}/next`;

  return {
    title,
    description,
    alternates: buildAlternates(path, locale),
    openGraph: buildOpenGraph({ title, description, path, locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function HireRoleNextPage({ params }: Props) {
  const { role } = await params;
  const locale = await getLocale();
  const t = await getTranslations();
  const proofLocale: ProofLocale = locale === "zh" ? "zh" : "en";
  const brief = getFollowThroughBrief(role, proofLocale);
  const labels = getProofUiLabels(proofLocale);

  if (!brief) notFound();

  return (
    <main className="page follow-through-page" data-screen-label="05 Hire Follow-Through">
      <FollowThroughView brief={brief} email={t("contact.email")} labels={labels} />
    </main>
  );
}
