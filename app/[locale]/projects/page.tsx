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
      ? "四个端到端项目 —— 精选的 UX、信息架构与交互设计工作。"
      : "Four projects, end-to-end — selected UX, IA, and interaction design work.";
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
