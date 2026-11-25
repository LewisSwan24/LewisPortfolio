import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { PatternWorkbenchClient } from "@/components/patterns/PatternWorkbenchClient";
import { PatternAtlasFallback } from "@/components/patterns/PatternAtlasFallback";
import { getAllInteractionPatterns } from "@/data/patterns/patterns-data";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "交互模式图谱 · 可复现规则与活原型库"
      : "Interaction Pattern Atlas · Executable Rules & Specimens";
  const description =
    locale === "zh"
      ? "从 6 大实战作品中提炼的可交互模式图谱：实体确权、三态置信度分流、默认「先不要」、双向点头显名、防抖状态机与不可变命令语法。"
      : "Six reusable interaction patterns extracted from flagship builds: physical key gates, three-tier confidence splits, default-safe focus, mutual consent, debounced hardware loops, and immutable grammars.";

  return {
    title,
    description,
    alternates: buildAlternates("/patterns", locale),
    openGraph: buildOpenGraph({ title, description, path: "/patterns", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function PatternsPage() {
  const t = await getTranslations();
  const locale = ((await getLocale()) === "zh" ? "zh" : "en") as "en" | "zh";
  const isZh = locale === "zh";
  const patterns = getAllInteractionPatterns();

  return (
    <main className="page" data-screen-label="08 Patterns">
      <section className="container cs-hero" style={{ paddingBottom: "var(--s-5)" }}>
        <Breadcrumb
          className="cs-breadcrumb"
          locale={locale}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: isZh ? "交互模式图谱" : "Pattern Atlas" },
          ]}
        />
        <div className="eyebrow">
          {isZh ? "交互模式图谱 · 6 项跨案例工程原语" : "Pattern Atlas · 6 Cross-Case Primitives"}
        </div>
        <h1 tabIndex={-1} style={{ marginTop: 12 }}>
          {isZh
            ? "把六个项目里的交互边界提炼成可运行图谱"
            : "Reusable interaction rules you can test and copy"}
        </h1>
        <p className="sub" style={{ maxWidth: "46em" }}>
          {isZh
            ? "每一条模式都源自真实产品或硬件卡点，附带常见反模式对照、活原型微沙盒、无障碍保障、可复制 TypeScript/React 片段，以及诚实的验证上限。"
            : "Each pattern traces back to a real software or hardware bottleneck — pairing problem tension, anti-pattern toggles, a live micro-sandbox, accessibility guarantees, copyable code, and explicit evidence ceilings."}
        </p>
      </section>

      <section className="container" style={{ paddingBottom: "var(--s-9)" }}>
        <Suspense fallback={<PatternAtlasFallback patterns={patterns} locale={locale} />}>
          <PatternWorkbenchClient patterns={patterns} locale={locale} />
        </Suspense>
      </section>
    </main>
  );
}
