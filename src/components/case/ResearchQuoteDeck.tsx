"use client";

import { useId, useState } from "react";
import type { CaseQuoteCategory, CaseResearchQuotes } from "@/lib/cases/schema";

interface ResearchQuoteDeckProps {
  data: CaseResearchQuotes;
  locale: "en" | "zh";
  /** Inside the case appendix this sits one heading level down. */
  headingLevel?: 2 | 3 | 4;
}

export function ResearchQuoteDeck({ data, locale, headingLevel = 2 }: ResearchQuoteDeckProps) {
  const HeadingTag = headingLevel === 4 ? "h4" : headingLevel === 3 ? "h3" : "h2";
  const isZh = locale === "zh";
  const headingId = useId();
  const [selectedId, setSelectedId] = useState<string>(data.items[0]?.id ?? "");

  const categoryTags: Record<CaseQuoteCategory, string> = isZh
    ? { structure: "结构卡点", trust: "信任边界", physical: "物理反馈" }
    : { structure: "Structure", trust: "Trust boundary", physical: "Physical feedback" };

  const fieldLabels = isZh
    ? { context: "发生场景", friction: "暴露卡点", decision: "触发改动" }
    : { context: "Context", friction: "Friction exposed", decision: "Design decision" };

  const activeItem =
    data.items.find((item) => item.id === selectedId) ?? data.items[0] ?? null;

  return (
    <article className="case-sim-shell" aria-labelledby={headingId}>
      <div className="case-sim-head">
        <div className="case-sim-head-copy">
          <div className="label">{data.eyebrow[locale]}</div>
          <HeadingTag id={headingId}>{data.title[locale]}</HeadingTag>
        </div>
      </div>

      <div className="case-sim-stage proc-stage">
        <div className="v3-card-grid">
          {data.items.map((item) => {
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
