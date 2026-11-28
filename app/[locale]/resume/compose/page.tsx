import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ResumeComposerClient } from "@/components/resume/ResumeComposerClient";
import {
  RESUME_COMPOSER_CASES,
  RESUME_COMPOSER_PRESETS,
} from "@/lib/resume/composer-data";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "定制双语简历组装台 | 自定义导出 A4 档案"
      : "Custom Resume & Dossier Composer | Tailored A4 Export";
  const description =
    locale === "zh"
      ? "按招聘岗位（IxD × AI、设计工程师、产品 UX）实时筛选案例、设计取舍与诚实边界，导出可打印双语 A4 PDF 简历档案。"
      : "Compose a role-tailored bilingual A4 resume and rationale dossier filtering live cases, design tradeoffs, and honest verification limits.";

  return {
    title,
    description,
    alternates: buildAlternates("/resume/compose", locale),
    openGraph: buildOpenGraph({
      title,
      description,
      path: "/resume/compose",
      locale,
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ResumeComposePage() {
  const locale = ((await getLocale()) === "zh" ? "zh" : "en") as "en" | "zh";
  const isZh = locale === "zh";

  return (
    <main className="page" data-screen-label="09 Resume Composer">
      <section className="container" style={{ paddingBlock: "var(--s-7) var(--s-5)" }}>
        <div className="eyebrow">
          {isZh ? "定制简报组装工具" : "HIRING DECISION TOOL · CUSTOM DOSSIER COMPOSER"}
        </div>
        <h1 className="h-display h2" style={{ marginTop: 10 }}>
          {isZh
            ? "按目标岗位实时拼装双语 A4 简历与设计依据。"
            : "Compose a tailored bilingual A4 resume & rationale dossier."}
        </h1>
        <p className="sub" style={{ maxWidth: "60ch", marginTop: 8 }}>
          {isZh
            ? "切换岗位方向、增减精选案例，并保留或精简实证边界声明，实时预览 A4 纸面排版并直接打印导出 PDF。"
            : "Switch specialization presets, toggle flagship works, and control tradeoff/ceiling visibility before exporting clean A4 print PDF or Markdown."}
        </p>
      </section>

      <section className="container" style={{ paddingBottom: "var(--s-9)" }}>
        <ResumeComposerClient
          presets={RESUME_COMPOSER_PRESETS}
          cases={RESUME_COMPOSER_CASES}
          initialLocale={locale}
        />
      </section>
    </main>
  );
}
