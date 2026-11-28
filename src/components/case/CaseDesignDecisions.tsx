import Link from "next/link";
import { localizeInternalHref } from "@/lib/locale-href";
import type { DesignDecisionTradeoff } from "@/lib/cases/schema";
import type { ProofLocale } from "@/lib/portfolio-proof";

interface CaseDesignDecisionsProps {
  decisions?: DesignDecisionTradeoff[];
  locale: ProofLocale;
}

export function CaseDesignDecisions({ decisions, locale }: CaseDesignDecisionsProps) {
  if (!decisions || decisions.length === 0) {
    return null;
  }

  const isZh = locale === "zh";
  const copy = isZh
    ? {
        eyebrow: "核心论证",
        heading: "设计决策与取舍论证",
        subtitle:
          "每条交互规则都从人的真实摩擦出发，同时列出否决的方案与目前仍保留的代价。",
        tension: "人的真实痛点",
        rejected: "被否决的备选方案",
        chosen: "最终交互取舍",
        residual: "仍存在的代价与风险",
      }
    : {
        eyebrow: "Design Rationale",
        heading: "Design Decisions & Tradeoffs",
        subtitle:
          "Every interaction rule starts from human friction, weighs what had to be rejected, and leaves the remaining cost explicit.",
        tension: "Human tension",
        rejected: "Rejected alternatives",
        chosen: "Chosen tradeoff",
        residual: "Residual cost / risk",
      };

  return (
    <>
      <div id="design-decisions" className="case-anchor" aria-hidden />
      <section className="case-decisions" aria-labelledby="design-decisions-heading">
        <div className="case-decisions-head">
          <div className="label">{copy.eyebrow}</div>
          <h2 id="design-decisions-heading">{copy.heading}</h2>
          <p>{copy.subtitle}</p>
        </div>

        <div className="case-decisions-list">
          {decisions.map((item, idx) => (
            <article className="case-decision-card" key={item.id}>
              <header className="case-decision-header">
                <span className="case-decision-index" aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3>{item.decisionTitle[locale]}</h3>
              </header>

              <div className="case-decision-tension">
                <span className="case-decision-kicker">{copy.tension}</span>
                <p>{item.humanTension[locale]}</p>
              </div>

              <div className="case-decision-compare">
                <div className="case-decision-rejected">
                  <span className="case-decision-kicker">{copy.rejected}</span>
                  <ul>
                    {item.rejectedAlternatives.map((alt) => (
                      <li key={alt.option[locale]}>
                        <strong>{alt.option[locale]}</strong>
                        <span>{alt.flaw[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="case-decision-chosen">
                  <span className="case-decision-kicker">{copy.chosen}</span>
                  <p>{item.chosenTradeoff[locale]}</p>
                </div>
              </div>

              <div className="case-decision-cost">
                <span className="case-decision-kicker">{copy.residual}</span>
                <p>{item.residualCostOrRisk[locale]}</p>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <Link href={localizeInternalHref("/ai", locale)} className="u-underline" style={{ fontSize: 13.5, fontWeight: 600 }}>
            {isZh
              ? "在 AI 实验室核验本案与其他项目的冲突及边界依据 →"
              : "Interrogate tradeoffs & cross-case receipts in AI Lab →"}
          </Link>
        </div>
      </section>
    </>
  );
}
