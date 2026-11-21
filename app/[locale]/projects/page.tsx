import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getListedCases } from "@/lib/cases/registry";
import type { CaseCardCopy } from "@/lib/cases/schema";
import { WorkIndex } from "./WorkIndex";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("nav.work");
  const description =
    locale === "zh"
      ? "八个案例，涵盖 UX、交互设计、实体交互与可运行原型。"
      : "Eight cases across UX, interaction design, physical computing and working prototypes.";
  return {
    title,
    description,
    alternates: buildAlternates("/projects", locale),
    openGraph: buildOpenGraph({ title, description, path: "/projects", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ProjectsPage() {
  const locale = ((await getLocale()) === "zh" ? "zh" : "en") as "en" | "zh";
  const cardsBySlug = Object.fromEntries(
    getListedCases().map((record) => [record.slug, record.card[locale]])
  ) as Record<string, CaseCardCopy>;

  return <WorkIndex cardsBySlug={cardsBySlug} />;
}
