"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { getPatternSimulator } from "./pattern-simulators";
import { VerifiedStatusBadge } from "@/components/case/deep/VerifiedStatusBadge";
import { ManuscriptReveal } from "@/components/motion/ManuscriptReveal";
import type { InteractionPattern, PatternCategory } from "@/lib/patterns/schema";
import styles from "./patterns.module.css";

type CategoryFilter = "all" | PatternCategory;

const CATEGORIES: Array<{ id: CategoryFilter; en: string; zh: string }> = [
  { id: "all", en: "All 6 Patterns", zh: "全部 6 类模式" },
  { id: "ai-boundaries", en: "AI Boundaries", zh: "AI 安全边界" },
  { id: "physical-hardware", en: "Physical & Hardware", zh: "硬件与物理反馈" },
  { id: "state-architecture", en: "State Architecture", zh: "状态机与语法" },
  { id: "social-consent", en: "Social Consent", zh: "社交匿名互认" },
];

const CATEGORY_LABELS: Record<PatternCategory, { en: string; zh: string }> = {
  "ai-boundaries": { en: "AI Boundaries", zh: "AI 安全边界" },
  "physical-hardware": { en: "Physical & HW", zh: "硬件与物理" },
  "state-architecture": { en: "State Grammar", zh: "状态语法" },
  "social-consent": { en: "Social Consent", zh: "社交互认" },
};

export function PatternWorkbenchClient({
  patterns,
  locale,
}: {
  patterns: readonly InteractionPattern[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [category, setCategory] = useState<CategoryFilter>("all");
  const [compareMode, setCompareMode] = useState<"chosen-rule" | "anti-pattern">("chosen-rule");
  const [copyMessage, setCopyMessage] = useState("");
  const [simStatus, setSimStatus] = useState("");

  const requestedSlug = searchParams.get("pattern");
  const visiblePatterns =
    category === "all"
      ? patterns
      : patterns.filter((p) => p.category === category);

  const activePattern =
    visiblePatterns.find((p) => p.slug === requestedSlug) ??
    visiblePatterns[0] ??
    patterns[0];

  if (!activePattern) return null;

  const selectPattern = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pattern", slug);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setCopyMessage("");
    setSimStatus("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activePattern.codeSnippet.code);
      setCopyMessage(
        isZh
          ? `已复制 ${activePattern.codeSnippet.filename}`
          : `Copied ${activePattern.codeSnippet.filename}`
      );
    } catch {
      setCopyMessage(
        isZh
          ? "当前环境剪贴板受限，请直接全选代码框复制。"
          : "Clipboard unavailable — select from the code block directly."
      );
    }
  };

  const LiveWidget = getPatternSimulator(activePattern.liveWidgetId);

  return (
    <div className={styles.atlasShell}>
      <div
        className={styles.filterBar}
        role="group"
        aria-label={isZh ? "按交互模式类别筛选" : "Filter patterns by category"}
      >
        <span className={styles.filterLabel}>
          {isZh ? "分类筛选" : "Category"}
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={styles.pillBtn}
            aria-pressed={category === cat.id}
            onClick={() => {
              setCategory(cat.id);
              setCopyMessage("");
            }}
          >
            {isZh ? cat.zh : cat.en}
          </button>
        ))}
      </div>

      <div className={styles.workbenchGrid}>
        <ManuscriptReveal itemSelector="[data-manuscript-item]">
          <nav
            className={styles.selectorRail}
            aria-label={isZh ? "交互模式目录" : "Interaction pattern index"}
          >
            {visiblePatterns.map((pattern) => {
              const selected = pattern.slug === activePattern.slug;
              return (
                <button
                  key={pattern.slug}
                  type="button"
                  className={styles.patternCardBtn}
                  data-manuscript-item=""
                  aria-pressed={selected}
                  onClick={() => selectPattern(pattern.slug)}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardOrder}>
                      {String(pattern.order).padStart(2, "0")}
                    </span>
                    <span className={styles.cardCategory}>
                      {CATEGORY_LABELS[pattern.category][locale]}
                    </span>
                  </div>
                  <span className={styles.cardTitle}>{pattern.title[locale]}</span>
                  <span className={styles.cardSource}>
                    {isZh ? "源自案例：" : "Source: "}
                    {pattern.sourceCaseSlug}
                  </span>
                </button>
              );
            })}
          </nav>
        </ManuscriptReveal>

        <article className={styles.specimenPane} aria-live="off">
          <header className={styles.specimenHead}>
            <div className={styles.specimenTitleRow}>
              <div>
                <span className={styles.kicker}>
                  {CATEGORY_LABELS[activePattern.category][locale]} ·{" "}
                  {String(activePattern.order).padStart(2, "0")}
                </span>
                <h2 className={styles.specimenTitle} data-testid="pattern-active-title">
                  {activePattern.title[locale]}
                </h2>
              </div>
              <VerifiedStatusBadge
                status={activePattern.metricsCeiling.verifiedStatus}
                locale={locale}
              />
            </div>
            <p className={styles.specimenTagline}>{activePattern.tagline[locale]}</p>

            <div className={styles.deepLinks}>
              <Link
                href={`/projects/${activePattern.sourceCaseSlug}`}
                className="btn btn-primary"
              >
                {isZh
                  ? `查看完整源案例 (${activePattern.sourceCaseSlug}) ↗`
                  : `Inspect source case (${activePattern.sourceCaseSlug}) ↗`}
              </Link>
              <Link href="/ai" className="btn btn-ghost">
                {isZh ? "在 AI 实验室核验依据 →" : "Query rationale in AI Lab →"}
              </Link>
            </div>
          </header>

          <div className={styles.tensionBox}>
            <span className={styles.kicker}>
              {isZh ? "人的真实冲突 (Problem Tension)" : "Problem Tension"}
            </span>
            <p style={{ margin: 0, color: "var(--text)", lineHeight: 1.6 }}>
              {activePattern.humanTension[locale]}
            </p>
          </div>

          <div style={{ display: "grid", gap: "var(--s-3)" }}>
            <div className={styles.compareSwitchRow}>
              <span className={styles.kicker}>
                {isZh ? "交互规则对照" : "Rule vs. Anti-Pattern"}
              </span>
              <div
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                role="group"
                aria-label={isZh ? "切换规则或反模式视图" : "Toggle chosen rule or anti-pattern"}
              >
                <button
                  type="button"
                  className={styles.pillBtn}
                  aria-pressed={compareMode === "chosen-rule"}
                  onClick={() => setCompareMode("chosen-rule")}
                >
                  {isZh ? "最终交互规则" : "Chosen Rule"}
                </button>
                <button
                  type="button"
                  className={styles.pillBtn}
                  aria-pressed={compareMode === "anti-pattern"}
                  onClick={() => setCompareMode("anti-pattern")}
                >
                  {isZh ? "常见反模式" : "Common Anti-Pattern"}
                </button>
              </div>
            </div>

            <div
              className={styles.compareCard}
              data-mode={compareMode}
              data-testid="pattern-compare-box"
            >
              <span className={styles.kicker}>
                {compareMode === "chosen-rule"
                  ? isZh
                    ? "选定的交互约束"
                    : "Chosen Interaction Rule"
                  : isZh
                    ? "刻意回避的反模式"
                    : "Rejected Common Anti-Pattern"}
              </span>
              <p style={{ margin: 0, color: "var(--text)", lineHeight: 1.6 }}>
                {compareMode === "chosen-rule"
                  ? activePattern.chosenRule[locale]
                  : activePattern.commonAntiPattern[locale]}
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gap: "var(--s-2)" }}>
            <span className={styles.kicker}>
              {isZh ? "无障碍与焦点保障" : "Accessibility Guarantees"}
            </span>
            <ul className={styles.a11yList}>
              {activePattern.a11yGuarantees.map((item) => (
                <li key={item.en}>{item[locale]}</li>
              ))}
            </ul>
          </div>

          <div className={styles.sandboxWrap} data-testid="pattern-live-sandbox">
            <div className={styles.compareSwitchRow}>
              <span className={styles.kicker}>
                {isZh
                  ? "可交互微沙盒 (Live Micro-Sandbox)"
                  : "Live Interactive Micro-Sandbox"}
              </span>
              {simStatus && (
                <output role="status" className={styles.copyStatus}>
                  {simStatus}
                </output>
              )}
            </div>
            {LiveWidget ? (
              <LiveWidget locale={locale} onStatusChange={setSimStatus} />
            ) : null}
          </div>

          <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
              <div className={styles.codeMeta}>
                <strong>{activePattern.codeSnippet.filename}</strong>
                <span>· {activePattern.codeSnippet.caption[locale]}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <output role="status" className={styles.copyStatus} data-testid="pattern-copy-status">
                  {copyMessage}
                </output>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={handleCopy}
                >
                  {isZh ? "复制代码片段" : "Copy snippet"}
                </button>
              </div>
            </div>

            <pre
              className={styles.codeBlock}
              tabIndex={0}
              aria-label={
                isZh
                  ? `${activePattern.codeSnippet.filename} 参考代码`
                  : `${activePattern.codeSnippet.filename} reference code`
              }
            >
              <code>{activePattern.codeSnippet.code}</code>
            </pre>
          </div>

          <div className={styles.ceilingBox}>
            <span className={styles.kicker}>
              {isZh ? "实证边界与样本上限" : "Evidence Ceiling & Honest Scope"}
            </span>
            <p style={{ margin: 0 }}>{activePattern.metricsCeiling.summary[locale]}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
