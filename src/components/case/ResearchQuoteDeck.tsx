"use client";

import { useId, useState } from "react";
import type { CaseQuoteCategory, CaseResearchQuotes } from "@/lib/cases/schema";

interface ResearchQuoteDeckProps {
  data: CaseResearchQuotes;
  locale: "en" | "zh";
}

type FilterValue = "all" | CaseQuoteCategory;

export function ResearchQuoteDeck({ data, locale }: ResearchQuoteDeckProps) {
  const isZh = locale === "zh";
  const headingId = useId();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [selectedId, setSelectedId] = useState<string>(data.items[0]?.id ?? "");

  const categoriesPresent = new Set(data.items.map((item) => item.category));
  const visibleItems =
    filter === "all"
      ? data.items
      : data.items.filter((item) => item.category === filter);

  const filterLabels: ReadonlyArray<{ id: FilterValue; label: string }> = [
    { id: "all", label: isZh ? "全部" : "All" },
    ...(categoriesPresent.has("structure")
      ? [{ id: "structure" as const, label: isZh ? "结构卡点" : "Structure" }]
      : []),
    ...(categoriesPresent.has("trust")
      ? [{ id: "trust" as const, label: isZh ? "信任边界" : "Trust boundary" }]
      : []),
    ...(categoriesPresent.has("physical")
      ? [{ id: "physical" as const, label: isZh ? "物理反馈" : "Physical feedback" }]
      : []),
  ];

  const categoryTags: Record<CaseQuoteCategory, string> = isZh
    ? { structure: "结构卡点", trust: "信任边界", physical: "物理反馈" }
    : { structure: "Structure", trust: "Trust boundary", physical: "Physical feedback" };

  const fieldLabels = isZh
    ? { context: "发生场景", friction: "暴露卡点", decision: "触发改动" }
    : { context: "Context", friction: "Friction exposed", decision: "Design decision" };

  const activeItem =
    visibleItems.find((item) => item.id === selectedId) ?? visibleItems[0] ?? null;

  return (
    <article className="case-sim-shell" aria-labelledby={headingId}>
      <div className="case-sim-head">
        <div className="case-sim-head-copy">
          <div className="label">{data.eyebrow[locale]}</div>
          <h2 id={headingId}>{data.title[locale]}</h2>
        </div>

        <div className="sim-segmented" role="group" aria-label={isZh ? "筛选调研原声" : "Filter research quotes"}>
          {filterLabels.map((btn) => (
            <button
              key={btn.id}
              type="button"
              className="sim-seg-btn"
              aria-pressed={filter === btn.id}
              onClick={() => setFilter(btn.id)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="case-sim-stage proc-stage">
        <div className="v3-card-grid">
          {visibleItems.map((item) => {
            const isSelected = activeItem?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className="sim-scenario-btn"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="sim-scenario-head">
                  <span className="tag">{categoryTags[item.category]}</span>
                  <span className="eyebrow">{item.context[locale]}</span>
                </div>
                <blockquote className="proc-q">{item.quote[locale]}</blockquote>
                <dl className="proc-meta">
                  <div>
                    <dt className="eyebrow">{fieldLabels.friction}</dt>
                    <dd>{item.friction[locale]}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">{fieldLabels.decision}</dt>
                    <dd>{item.decision[locale]}</dd>
                  </div>
                </dl>
              </button>
            );
          })}
        </div>
      </div>

      {activeItem && (
        <div className="case-sim-takeaway" role="status" aria-live="polite">
          <span className="case-sim-takeaway-label">{fieldLabels.decision}</span>
          <p>{activeItem.decision[locale]}</p>
        </div>
      )}
    </article>
  );
}
