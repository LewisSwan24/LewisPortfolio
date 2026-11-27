import type { Metadata } from "next";
import { Foldable } from "@/components/ui/Foldable";
import { getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { LabWorkbench } from "@/components/lab/LabWorkbench";
import { LabTelemetryPanel } from "@/components/lab/LabTelemetryPanel";
import { BundleObservatoryPanel } from "@/components/lab/BundleObservatoryPanel";
import telemetryManifest from "@/data/telemetry/bundle-manifest.generated.json";
import { FsmExplorerPanel } from "@/components/lab/fsm/FsmExplorerPanel";
import { HeuristicAuditWorkbench } from "@/components/lab/auditor/HeuristicAuditWorkbench";
import { CASE_FSM_SPECS } from "@/data/fsm/case-fsms";
import { CASE_HEURISTIC_AUDITS, HEURISTIC_ZH } from "@/data/heuristics/case-heuristics";
import { SpecimenAxisCanvas } from "@/components/three/SpecimenAxisCanvas";
import { SPECIMEN_NODES } from "@/components/three/specimens";
import patternStyles from "@/components/patterns/patterns.module.css";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "UI 实验室 · 设计系统与原语"
      : "UI Lab · Design System & Primitives";
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
        <div className="v4-editorial-grid">
          <div className="v4-span-8">
            <div className="eyebrow">{isZh ? "UI 实验室 · 设计系统与原语" : "UI Lab · Design System & Primitives"}</div>
            <h1 className="h-display h1 lab-h1" style={{ marginTop: 12 }}>
              {isZh ? "把设计规则做成可操作的工作台" : "Design rules you can inspect and test"}
            </h1>
            <p className="sub">
              {isZh
                ? "这一页放的是本站自己的设计规则：色彩对比度、动效曲线，以及三个项目里最核心的交互状态规则。每一条都可以动手检查。"
                : "This page holds the site's own design rules: its colour contrast, its motion curves, and the core state rules behind three projects. You can inspect and test each one."}
            </p>
            <div className={patternStyles.bannerCard} style={{ marginTop: "var(--s-4)" }}>
              <div style={{ display: "grid", gap: 4 }}>
                <span className={patternStyles.kicker}>
                  {isZh ? "模式标本库 · Pattern Atlas" : "Pattern Specimen Library"}
                </span>
                <p style={{ margin: 0, fontSize: 14, color: "var(--text-2)" }}>
                  {isZh
                    ? "查看 6 项跨案例交互模式与可复制 TypeScript/React 参考片段。"
                    : "Test all 6 cross-case interaction rules with live sandboxes and copyable code snippets."}
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <Link href="/patterns" className="btn btn-ghost">
                  {isZh ? "进入模式图谱 →" : "Open Pattern Atlas →"}
                </Link>
                <Link href="/studio/replay" className="btn btn-ghost">
                  {isZh ? "硬件协议帧重放工作台 →" : "Protocol Replay Studio →"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LabWorkbench locale={locale} />
      <SpecimenAxisCanvas locale={locale} nodes={SPECIMEN_NODES} />
      <LabTelemetryPanel locale={locale} />
      <div className="container lab-grid">
        <Foldable isZh={locale === "zh"} testId="lab-fold-fsm" label={locale === "zh" ? "状态图" : "state graphs"}>
          <FsmExplorerPanel specs={CASE_FSM_SPECS} locale={locale} />
        </Foldable>
        <HeuristicAuditWorkbench
          audits={CASE_HEURISTIC_AUDITS}
          locale={locale}
          heuristicNames={locale === "zh" ? HEURISTIC_ZH : undefined}
        />
      </div>
      <BundleObservatoryPanel manifest={telemetryManifest} locale={locale} />
    </main>
  );
}
