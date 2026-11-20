import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title = locale === "zh" ? "实验室 · 设计系统与原型" : "Lab · Design System & Prototypes";
  const description =
    locale === "zh"
      ? `${siteConfig.author.nameZh} 的 Lively Icons 设计系统规范与交互原型实验场。`
      : `Lively Icons design system workbench and interactive prototypes by ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: buildAlternates("/lab", locale),
    openGraph: buildOpenGraph({ title, description, path: "/lab", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function LabPage() {
  const locale = await getLocale();
  const isZh = locale === "zh";

  return (
    <main className="page" data-screen-label="07 Lab">
      <section className="container cs-hero">
        <div className="eyebrow">{isZh ? "实验室 · V3 重构中" : "Lab · Rebuilding for V3"}</div>
        <h1 className="h-display h1">
          {isZh ? "Lively Icons 规范与交互原型台" : "Lively Icons & Interactive Prototypes"}
        </h1>
        <p className="sub">
          {isZh
            ? "旧版玻璃拟态演示已下线，以对齐暖纸色、零阴影与单赤陶强调色设计规范。交互式 Token 检查器、GSAP 动效曲线台与状态机微原型将在下一阶段上线。"
            : "Legacy glassmorphism demos have been retired to match the warm-paper, shadow-free Lively Icons design language. The interactive token inspector, GSAP motion curve workbench, and state-machine micro-demos are scheduled for the next milestone."}
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link href="/projects" className="btn btn-primary">
            {isZh ? "浏览作品案例" : "Browse case studies"} <span className="arrow">→</span>
          </Link>
          <Link href="/hire" className="btn btn-ghost">
            {isZh ? "查看招聘决策页" : "Open hiring dossier"}
          </Link>
        </div>
      </section>
    </main>
  );
}
