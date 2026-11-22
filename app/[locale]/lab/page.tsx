import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LabWorkbench } from "@/components/lab/LabWorkbench";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "实验室 · V4 Swiss Editorial 设计系统与交互状态机"
      : "Lab · V4 Swiss Editorial & Interaction State Machines";
  const description =
    locale === "zh"
      ? `${siteConfig.author.nameZh} 的 V4 Swiss Editorial 暖骨白与深炭工作室 Token 检查器、GSAP 动效曲线台与真实硬件/AI 状态机微原型。`
      : `Interactive V4 Swiss Editorial token inspector, GSAP paper-motion sandbox, and state-machine micro-demos by ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: buildAlternates("/lab", locale),
    openGraph: buildOpenGraph({ title, description, path: "/lab", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function LabPage() {
  const locale = ((await getLocale()) === "zh" ? "zh" : "en") as "en" | "zh";
  const isZh = locale === "zh";

  return (
    <main className="page" data-screen-label="07 Lab">
      <section className="container lab-hero">
        <div className="eyebrow">{isZh ? "实验室 · 设计系统与原语" : "Lab · Design System & Primitives"}</div>
        <h1 className="h-display h1" style={{ marginTop: 12 }}>
          {isZh ? "把设计规则做成可操作的工作台" : "Design rules you can inspect and test"}
        </h1>
        <p className="sub">
          {isZh
            ? "这里不放装饰性的特效模板，而是直接呈现本站的 V4 Swiss Editorial 色彩对比度规范、GSAP 纸面动效曲线，以及三个项目中最核心的交互状态规则。"
            : "No decorative templates — this workbench exposes the live V4 Swiss Editorial contrast tokens, the GSAP paper-motion curve layer, and the core state rules behind three projects."}
        </p>
      </section>
      <LabWorkbench locale={locale} />
    </main>
  );
}
