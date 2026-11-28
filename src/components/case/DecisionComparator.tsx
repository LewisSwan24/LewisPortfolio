"use client";

import Link from "next/link";
import { useState } from "react";
import { localizeInternalHref } from "@/lib/locale-href";
import type {
  ComparatorFocusFilter,
  DecisionComparatorRow,
} from "@/lib/cases/comparator";
import type { ProofLocale } from "@/lib/portfolio-proof";

export function DecisionComparator({
  rows,
  locale,
}: {
  rows: DecisionComparatorRow[];
  locale: ProofLocale;
}) {
  const isZh = locale === "zh";
  const [focus, setFocus] = useState<ComparatorFocusFilter>("all");

  const visibleRows =
    focus === "all" ? rows : rows.filter((row) => row.themes.includes(focus));

  const filters: Array<{ id: ComparatorFocusFilter; en: string; zh: string }> = [
    { id: "all", en: "All 6 decisions", zh: "全部 6 项对比" },
    { id: "ai-trust", en: "AI Trust & Agency", zh: "AI 信任与控制权" },
    { id: "physical", en: "Physical & Social", zh: "软硬实体与社交" },
    { id: "rules", en: "Rules & Safety", zh: "规则与安全门槛" },
  ];

  const copy = isZh
    ? {
        eyebrow: "设计决策横向对照 · 设计主任视角",
        title: "每个方案背后，究竟在解决人的什么摩擦，又拒绝了什么捷径？",
        sub: "把六个公开案例放在同一张表里比较，重点看人的心理摩擦和明确否决项，不按技术工具清单罗列。",
        colCase: "案例",
        colTension: "人的真实痛点",
        colRejected: "明确否决方案",
        colTradeoff: "最终交互取舍",
        colCost: "仍保留的代价",
        readCase: "查看详情 →",
      }
    : {
        eyebrow: "Design Tradeoff Matrix · Principal Critique View",
        title: "Across all 6 listed cases: human friction, rejected shortcuts, and honest costs",
        sub: "Compare every shipped prototype by what human discomfort triggered the rule, which seductive alternatives were turned down, and what risk remains.",
        colCase: "Case",
        colTension: "Human tension",
        colRejected: "Rejected alternative",
        colTradeoff: "Chosen tradeoff",
        colCost: "Residual cost",
        readCase: "Open case →",
      };

  return (
    <section
      id="decision-comparator"
      className="section container comparator-section"
      aria-labelledby="decision-comparator-heading"
    >
      <div className="comparator-head">
        <div>
          <div className="label">{copy.eyebrow}</div>
          <h2 id="decision-comparator-heading" className="h-display" style={{ fontSize: "clamp(24px, 2.8vw, 34px)", marginTop: 8 }}>
            {copy.title}
          </h2>
          <p className="prose" style={{ marginTop: 8, maxWidth: "66ch" }}>
            {copy.sub}
          </p>
        </div>

        <div className="idx-filters" role="group" aria-label={isZh ? "按决策主题筛选" : "Filter decisions by theme"}>
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`idx-filter${focus === item.id ? " active" : ""}`}
              aria-pressed={focus === item.id}
              onClick={() => setFocus(item.id)}
            >
              {isZh ? item.zh : item.en}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop architectural comparison table */}
      <div className="comparator-table-wrap">
        <table className="comparator-table">
          <thead>
            <tr>
              <th scope="col">{copy.colCase}</th>
              <th scope="col">{copy.colTension}</th>
              <th scope="col">{copy.colRejected}</th>
              <th scope="col">{copy.colTradeoff}</th>
              <th scope="col">{copy.colCost}</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.slug} data-testid="comparator-row">
                <th scope="row">
                  <div className="comparator-case-cell">
                    <strong>{row.title}</strong>
                    <span>{row.kicker}</span>
                    <Link href={localizeInternalHref(`/projects/${row.slug}#design-decisions`, locale)}>
                      {copy.readCase}
                    </Link>
                  </div>
                </th>
                <td>{row.humanTension}</td>
                <td>
                  {row.rejectedOption && (
                    <>
                      <strong>{row.rejectedOption}</strong>
                      <span>{row.rejectedFlaw}</span>
                    </>
                  )}
                </td>
                <td>{row.chosenTradeoff}</td>
                <td>{row.residualCostOrRisk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile accessible accordion stack (zero headings inside <summary>) */}
      <div className="comparator-mobile-list">
        {visibleRows.map((row) => (
          <details className="comparator-accordion" key={`mob-${row.slug}`}>
            <summary className="comparator-accordion-summary">
              <span className="comparator-acc-title">{row.title}</span>
              <span className="comparator-acc-meta">{row.decisionTitle}</span>
            </summary>
            <div className="comparator-accordion-body">
              <dl>
                <div>
                  <dt>{copy.colTension}</dt>
                  <dd>{row.humanTension}</dd>
                </div>
                {row.rejectedOption && (
                  <div>
                    <dt>{copy.colRejected}</dt>
                    <dd>
                      <strong>{row.rejectedOption}</strong> — {row.rejectedFlaw}
                    </dd>
                  </div>
                )}
                <div>
                  <dt>{copy.colTradeoff}</dt>
                  <dd>{row.chosenTradeoff}</dd>
                </div>
                <div>
                  <dt>{copy.colCost}</dt>
                  <dd>{row.residualCostOrRisk}</dd>
                </div>
              </dl>
              <Link href={localizeInternalHref(`/projects/${row.slug}#design-decisions`, locale)} className="btn btn-ghost">
                {copy.readCase}
              </Link>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
