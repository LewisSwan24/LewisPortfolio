"use client";

import { useMemo, useState } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import type { CaseHeuristicEntry, HeuristicSeverity } from "@/data/heuristics/case-heuristics";
import { VerifiedStatusBadge } from "@/components/case/deep/VerifiedStatusBadge";
import type { FsmProjectSlug } from "@/lib/fsm/schema";
import styles from "../lab-engines.module.css";

type CaseFilter = "all" | FsmProjectSlug;
type SeverityFilter = "all" | HeuristicSeverity;

/** Cards shown on a phone before "Show all" (v6.9 review R23). */
const PHONE_PREVIEW_COUNT = 6;

const CASE_OPTIONS: Array<{ id: CaseFilter; en: string; zh: string }> = [
  { id: "all", en: "All 6 Cases", zh: "全部 6 项案例" },
  { id: "walkie", en: "Walkie", zh: "Walkie" },
  { id: "lamplight", en: "Lamplight", zh: "Lamplight" },
  { id: "autofill", en: "Autofill", zh: "Autofill" },
  { id: "maze", en: "MazeRunners", zh: "MazeRunners" },
  { id: "onthebeat", en: "On The Beat", zh: "On The Beat" },
  { id: "grassland", en: "Grassland", zh: "Grassland" },
];

const SEVERITY_OPTIONS: Array<{ id: SeverityFilter; en: string; zh: string }> = [
  { id: "all", en: "All Tiers", zh: "全部审计等级" },
  { id: "structural-guard", en: "Structural Guard", zh: "结构性硬保护" },
  { id: "feedback", en: "Status & Feedback", zh: "状态与可见反馈" },
  { id: "open-risk", en: "Open Risk / Pending", zh: "待补测开放风险" },
];

const SEVERITY_LABELS: Record<HeuristicSeverity, { en: string; zh: string }> = {
  "structural-guard": { en: "Structural Guard", zh: "结构保护" },
  feedback: { en: "Feedback", zh: "状态反馈" },
  "open-risk": { en: "Open Risk / Pending", zh: "待验证风险" },
};

export function HeuristicAuditWorkbench({
  audits,
  locale,
}: {
  audits: readonly CaseHeuristicEntry[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const [caseFilter, setCaseFilter] = useState<CaseFilter>("all");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const [expanded, setExpanded] = useState(false);

  const filteredEntries = useMemo(() => {
    return audits.filter((entry) => {
      if (caseFilter !== "all" && entry.slug !== caseFilter) return false;
      if (severityFilter !== "all" && entry.severity !== severityFilter) return false;
      return true;
    });
  }, [audits, caseFilter, severityFilter]);

  return (
    <section
      id="heuristic-auditor"
      className={styles.engineSection}
      aria-labelledby="heuristic-auditor-heading"
    >
      <header className={styles.engineHead}>
        <div>
          <div className="label">
            07 · {isZh ? "Nielsen 十大可用性原则 × WCAG 2.1 检查矩阵" : "Nielsen 10 Heuristics × WCAG 2.1 Auditor"}
          </div>
          <h2 id="heuristic-auditor-heading" className={styles.engineTitle}>
            {isZh
              ? "逐项对照已落地的防御保护与仍待实地补测的风险"
              : "Inspect implemented structural safeguards alongside unproven field gaps"}
          </h2>
          <p className={styles.engineLead}>
            {isZh
              ? "按项目或审计级别筛选，每条记录直接锚定对应项目的状态矩阵、打回档案或交互模式库。"
              : "Filter by case or audit severity tier. Every card links back to verifiable case artifacts or open limits."}
          </p>
        </div>

        <output role="status" className={styles.statusBar} data-testid="heuristic-count-status">
          {isZh
            ? `展示 ${filteredEntries.length} / ${audits.length} 条启发式核查`
            : `Showing ${filteredEntries.length} of ${audits.length} audit checks`}
        </output>
      </header>

      <div
        className={styles.pillBar}
        role="group"
        aria-label={isZh ? "按公开案例筛选" : "Filter audits by case"}
      >
        <span className={styles.kicker}>{isZh ? "案例范围" : "Case"}</span>
        {CASE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={styles.pillBtn}
            aria-pressed={caseFilter === opt.id}
            onClick={() => setCaseFilter(opt.id)}
          >
            {opt[locale]}
          </button>
        ))}
      </div>

      <div
        className={styles.pillBar}
        role="group"
        aria-label={isZh ? "按保护或风险级别筛选" : "Filter audits by severity"}
      >
        <span className={styles.kicker}>{isZh ? "审计层级" : "Tier"}</span>
        {SEVERITY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={styles.pillBtn}
            aria-pressed={severityFilter === opt.id}
            onClick={() => setSeverityFilter(opt.id)}
          >
            {opt[locale]}
          </button>
        ))}
      </div>

      <div
        id="heuristic-audit-grid"
        className={
          expanded ? styles.auditGrid : `${styles.auditGrid} ${styles.auditGridCollapsed}`
        }
      >
        {filteredEntries.map((entry) => (
          <article key={entry.id} className={styles.auditCard} data-testid={`audit-card-${entry.id}`}>
            <div className={styles.auditMetaRow}>
              <span className={styles.kicker}>
                {entry.slug} · {entry.wcagRef}
              </span>
              <span className={styles.severityPill} data-severity={entry.severity}>
                {SEVERITY_LABELS[entry.severity][locale]}
              </span>
            </div>

            <h3 className={styles.auditHeading}>{entry.heuristic}</h3>
            <p className={styles.auditFinding}>{entry.finding[locale]}</p>

            <div className={styles.auditFoot}>
              <VerifiedStatusBadge status={entry.verifiedStatus} locale={locale} />
              <Link href={entry.proofHref} style={{ color: "var(--accent)", textDecoration: "underline" }}>
                {isZh ? "查看实证 ↗" : "Inspect proof ↗"}
              </Link>
            </div>
          </article>
        ))}
      </div>
      {!expanded && filteredEntries.length > PHONE_PREVIEW_COUNT && (
        <button
          type="button"
          className={styles.showAllBtn}
          aria-controls="heuristic-audit-grid"
          aria-expanded={false}
          onClick={() => setExpanded(true)}
        >
          {isZh ? `显示全部 ${filteredEntries.length} 条` : `Show all ${filteredEntries.length}`}
        </button>
      )}
    </section>
  );
}
