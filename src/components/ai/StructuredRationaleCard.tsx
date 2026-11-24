import Link from "next/link";
import type { GroundedCitation } from "@/lib/ai/client";
import styles from "./ai-workbench.module.css";

interface StructuredRationaleCardProps {
  citation: GroundedCitation;
  locale: "en" | "zh";
  compact?: boolean;
  showInspector?: boolean;
}

export function StructuredRationaleCard({
  citation,
  locale,
  compact = false,
  showInspector = true,
}: StructuredRationaleCardProps) {
  const isZh = locale === "zh";

  return (
    <div className={styles.citationCard}>
      <div className={styles.citationHead}>
        <span className={styles.citationTitle}>{citation.title}</span>
        <span className={styles.corpusTag}>{citation.pillar}</span>
      </div>

      {citation.structured ? (
        <div className={compact ? styles.quadGridCompact : styles.quadGrid}>
          <div className={styles.quadCell}>
            <span className={styles.quadLabel}>{isZh ? "人的摩擦" : "Human Tension"}</span>
            <p>{citation.structured.tension}</p>
          </div>
          <div className={styles.quadCell}>
            <span className={styles.quadLabel}>{isZh ? "否决方案" : "Rejected Path"}</span>
            <p>{citation.structured.rejected}</p>
          </div>
          <div className={styles.quadCell}>
            <span className={styles.quadLabel}>{isZh ? "最终取舍" : "Chosen Tradeoff"}</span>
            <p>{citation.structured.chosen}</p>
          </div>
          <div className={`${styles.quadCell} ${styles.quadLimit}`}>
            <span className={styles.quadLabel}>{isZh ? "诚实边界" : "Honest Limit"}</span>
            <p>{citation.structured.limit}</p>
          </div>
        </div>
      ) : (
        <p className={styles.plainCitation}>{citation.text}</p>
      )}

      <div className={styles.citationFoot}>
        <Link href={citation.href} className={styles.jumpLink}>
          {citation.href.includes("/blog/")
            ? isZh
              ? "阅读专栏原文 ↗"
              : "Read source essay ↗"
            : citation.href.includes("/patterns")
              ? isZh
                ? "查看交互模式图谱 ↗"
                : "Inspect in Pattern Atlas ↗"
              : citation.href.includes("/lab")
                ? isZh
                  ? "进入实验室状态机 / 审计台 ↗"
                  : "Inspect in Lab Workbench ↗"
                : isZh
                  ? "直达案例论证 ↗"
                  : "Inspect in case study ↗"}
        </Link>

        {showInspector && (
          <details className={styles.traceDetails}>
            <summary className={styles.traceSummary}>
              {isZh ? "溯源校验" : "Traceability"}
            </summary>
            <div className={styles.traceBody}>
              <div>
                <strong>corpusId:</strong> <code>{citation.id}</code>
              </div>
              {typeof citation.score === "number" && (
                <div>
                  <strong>Hybrid score:</strong> <code>{citation.hybridScore ?? citation.score}</code>
                  {typeof citation.bm25Score === "number" && typeof citation.vectorScore === "number" ? (
                    <span>
                      {" "}
                      (BM25 {citation.bm25Score} · vec {citation.vectorScore})
                    </span>
                  ) : null}
                  {typeof citation.weight === "number" && (
                    <span> · weight {citation.weight}x</span>
                  )}
                </div>
              )}
              {citation.matchedTerms && citation.matchedTerms.length > 0 && (
                <div className={styles.termList}>
                  {citation.matchedTerms.map((term) => (
                    <span key={term} className={styles.termChip}>
                      {term}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
