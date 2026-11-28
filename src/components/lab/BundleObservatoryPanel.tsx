"use client";

import { useState } from "react";
import styles from "./bundle-observatory.module.css";

export interface TelemetryManifestView {
  schemaVersion: string;
  generatedAt: string;
  budgets: {
    source: string;
    jsChunksCount: number;
    largestStandardJsGzKb: number;
    largestLazy3dGzKb: number;
    largestAppRouteGzKb: number;
    appCssGzKb: number;
    totalCssGzKb: number;
    ceilings: {
      standardJsGzKb: number;
      lazy3dGzKb: number;
      appRouteGzKb: number;
      appCssGzKb: number;
      totalCssGzKb: number;
    };
  };
  maintenance: {
    reviewedAt: string;
    nextReviewAt: string;
    trackedEntries: number;
    missingReviewMetadata: number;
  };
  integrity: {
    listedFlagships: number;
    archivalVaultCases: number;
    unlistedLeaks: number;
    interactionPatterns: number;
    publishedEssaysPerLocale: number;
    semanticChunks: number;
    cssCompilerWarnings: number;
  };
}

type TelemetryLane = "all" | "bundles" | "integrity";

export function BundleObservatoryPanel({
  manifest,
  locale,
}: {
  manifest: TelemetryManifestView;
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const [lane, setLane] = useState<TelemetryLane>("all");
  const { budgets, maintenance, integrity } = manifest;

  const bundleCards = [
    {
      id: "route-js",
      label: isZh ? "最大单路由首屏 JS" : "Max App Route Chunk",
      measured: budgets.largestAppRouteGzKb,
      ceiling: budgets.ceilings.appRouteGzKb,
      unit: "kB gz",
    },
    {
      id: "lazy-3d",
      label: isZh ? "共享 3D 懒加载包" : "Shared Lazy 3D Chunk",
      measured: budgets.largestLazy3dGzKb,
      ceiling: budgets.ceilings.lazy3dGzKb,
      unit: "kB gz",
    },
    {
      id: "app-css",
      label: isZh ? "全站手写样式总包" : "App / UI CSS Total",
      measured: budgets.appCssGzKb,
      ceiling: budgets.ceilings.appCssGzKb,
      unit: "kB gz",
    },
    {
      id: "std-js",
      label: isZh ? "最大框架/基础包" : "Max Standard JS Chunk",
      measured: budgets.largestStandardJsGzKb,
      ceiling: budgets.ceilings.standardJsGzKb,
      unit: "kB gz",
    },
  ];

  const integrityCards = [
    {
      id: "unlisted-leaks",
      title: isZh ? "未公开项目泄露数" : "Unlisted Slug Leaks",
      value: `${integrity.unlistedLeaks}`,
      note: isZh
        ? `6 主案公开 / ${integrity.archivalVaultCases} 存档仅限 Vault`
        : `6 listed / ${integrity.archivalVaultCases} archival vault-only`,
    },
    {
      id: "css-warnings",
      title: isZh ? "LightningCSS 编译告警" : "CSS Compiler Warnings",
      value: `${integrity.cssCompilerWarnings}`,
      note: isZh ? "构建与 CI 双重零告警把关" : "Enforced via build & CI guard",
    },
    {
      id: "semantic-chunks",
      title: isZh ? "确定性语义索引块" : "Semantic Retrieval Chunks",
      value: `${integrity.semanticChunks}`,
      note: isZh
        ? `${integrity.publishedEssaysPerLocale} 篇双语长文 × ${integrity.interactionPatterns} 交互模式`
        : `${integrity.publishedEssaysPerLocale} essays × ${integrity.interactionPatterns} pattern primitives`,
    },
    {
      id: "maintenance",
      title: isZh ? "证据审查覆盖条目" : "Proof Metadata Coverage",
      value: `${maintenance.trackedEntries}`,
      note: isZh
        ? `缺漏元数据：${maintenance.missingReviewMetadata}（上次审查 ${maintenance.reviewedAt}）`
        : `Missing metadata: ${maintenance.missingReviewMetadata} (reviewed ${maintenance.reviewedAt})`,
    },
  ];

  return (
    <section
      id="bundle-observatory"
      className="container section"
      aria-labelledby="bundle-observatory-heading"
      data-testid="bundle-observatory"
    >
      <div className={`v4-studio-plate ${styles.wrap}`}>
        <div>
          <div className="label">
            08 · {isZh ? "构建包体与工程治理观测台" : "Engineering Telemetry & Bundle Observatory"}
          </div>
          <h2
            id="bundle-observatory-heading"
            className="h-display"
            style={{ fontSize: "clamp(20px, 2.2vw, 26px)", marginTop: 8 }}
          >
            {isZh
              ? "把路由体积天花板、零泄露红线与 CSS 零告警摆上台面"
              : "Live gzipped route budgets, zero-leak isolation & CSS compiler health"}
          </h2>
          <p className="prose" style={{ marginTop: 6, maxWidth: "68ch" }}>
            {isZh
              ? "所有数值均从静态构建清单 scripts/build-telemetry-manifest.mjs 导出，与 CI 体积门禁同源。"
              : "Figures originate directly from scripts/build-telemetry-manifest.mjs and the CI gzipped bundle gate — zero synthetic placeholders."}
          </p>
        </div>

        <div
          className={styles.filterRow}
          role="group"
          aria-label={isZh ? "筛选遥测维度" : "Filter telemetry view"}
        >
          {(
            [
              { id: "all", en: "All Telemetry", zh: "全部遥测指标" },
              { id: "bundles", en: "Bundle Ceilings", zh: "JS/CSS 体积预算" },
              { id: "integrity", en: "Integrity & Audits", zh: "隔离与审校台账" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={styles.tabBtn}
              aria-pressed={lane === tab.id}
              data-testid={`observatory-tab-${tab.id}`}
              onClick={() => setLane(tab.id)}
            >
              {tab[locale]}
            </button>
          ))}
        </div>

        {(lane === "all" || lane === "bundles") && (
          <div className={styles.grid} data-testid="observatory-bundle-grid">
            {bundleCards.map((item) => {
              const pct = Math.min(100, Math.round((item.measured / item.ceiling) * 100));
              return (
                <article key={item.id} className={styles.metricCard}>
                  <span className="eyebrow">{item.label}</span>
                  <div className={styles.metricVal}>
                    {item.measured} <span style={{ fontSize: 13, fontWeight: 400 }}>{item.unit}</span>
                  </div>
                  <div className={styles.barTrack} aria-hidden="true">
                    <div className={styles.barFill} style={{ width: `${pct}%` }} />
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text-2)" }}>
                    {isZh
                      ? `预算上限 <= ${item.ceiling} ${item.unit}（占 ${pct}%）`
                      : `Ceiling <= ${item.ceiling} ${item.unit} (${pct}% used)`}
                  </span>
                </article>
              );
            })}
          </div>
        )}

        {(lane === "all" || lane === "integrity") && (
          <div className={styles.grid} data-testid="observatory-integrity-grid">
            {integrityCards.map((card) => (
              <article key={card.id} className={styles.metricCard}>
                <span className="eyebrow">{card.title}</span>
                <div className={styles.metricVal}>{card.value}</div>
                <span style={{ fontSize: 12, color: "var(--text-2)" }}>{card.note}</span>
              </article>
            ))}
          </div>
        )}

        <footer className={styles.metaFoot}>
          <span>
            {isZh ? "数据源：" : "Source: "}
            {budgets.source}
          </span>
          <span>
            {isZh ? "生成日期：" : "Snapshot: "}
            {manifest.generatedAt}
          </span>
          <span>
            {isZh ? "下次定期复核：" : "Next scheduled review: "}
            {maintenance.nextReviewAt}
          </span>
        </footer>
      </div>
    </section>
  );
}
