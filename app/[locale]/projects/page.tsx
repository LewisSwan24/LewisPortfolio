import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { WorkIndex } from "./WorkIndex";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await getLocale()) as "en" | "zh";
  const title = t("nav.work");
  const description =
    locale === "zh"
      ? "七个案例，涵盖 UX、信息架构与交互设计。"
      : "Seven cases across UX, IA, and interaction design.";
  return {
    title,
    description,
    alternates: buildAlternates("/projects", locale),
    openGraph: buildOpenGraph({ title, description, path: "/projects", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default function ProjectsPage() {
  return <WorkIndex />;
}
