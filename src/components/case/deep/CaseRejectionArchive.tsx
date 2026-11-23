import type { CaseRejectionEntry } from "@/lib/cases/modules-schema";
import { ManuscriptReveal } from "@/components/motion/ManuscriptReveal";
import { FocusTagList, VerifiedStatusBadge } from "./VerifiedStatusBadge";
import styles from "./cases-deep.module.css";

export function CaseRejectionArchive({
  entries,
  locale,
}: {
  entries: readonly CaseRejectionEntry[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const copy = isZh
    ? {
        eyebrow: "打回重做与纠偏档案",
        heading: "真实暴露的漏洞与方案否决记录",
        lead: "记录来自真实调试日志、硬件台架与 AI 产出走查中暴露的结构性缺陷，以及最终落地的硬约束修复。",
        before: "返工前版本",
        failure: "暴露的致命漏洞",
        fix: "落地的约束与修复",
        receipt: "可核验依据：",
      }
    : {
        eyebrow: "Rejection & Rework Archive",
        heading: "Real Prototype Failures & Rejected Iterations",
        lead: "Logged defects exposed during hardware bench checks, live debugging, and AI-draft reviews—plus the structural fixes that replaced them.",
        before: "Artifact before",
        failure: "Failure exposed",
        fix: "Fix applied",
        receipt: "Receipt: ",
      };

  return (
    <section
      id="rejection-archive"
      className={`${styles.section} ${styles.anchorTarget}`}
      aria-labelledby="rejection-archive-heading"
    >
      <header className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h2 id="rejection-archive-heading" className={styles.heading}>
          {copy.heading}
        </h2>
        <p className={styles.lead}>{copy.lead}</p>
      </header>

      <ManuscriptReveal withHairline itemSelector="[data-focus-item]">
        <ol className={styles.rejectionList}>
          {entries.map((entry) => (
            <li
              key={entry.id}
              className={styles.rejectionCard}
              data-focus-item=""
              data-focus-tags={entry.focusTags.join(" ")}
            >
              <div className={styles.rejectionHead}>
                <div className={styles.rejectionMeta}>
                  <h3 className={styles.cardTitle}>{entry.round[locale]}</h3>
                  <span className={styles.rejectionDate}>{entry.date}</span>
                </div>

                <div className={styles.badgeRow}>
                  <VerifiedStatusBadge status={entry.verifiedStatus} locale={locale} />
                  <FocusTagList tags={entry.focusTags} locale={locale} />
                </div>
              </div>

              <dl className={styles.rejectionGrid}>
                <div className={styles.fieldCell}>
                  <dt>{copy.before}</dt>
                  <dd>{entry.artifactBefore[locale]}</dd>
                </div>
                <div className={`${styles.fieldCell} ${styles.frictionCell}`}>
                  <dt>{copy.failure}</dt>
                  <dd>{entry.failureExposed[locale]}</dd>
                </div>
                <div className={styles.fieldCell}>
                  <dt>{copy.fix}</dt>
                  <dd>{entry.fixApplied[locale]}</dd>
                </div>
              </dl>

              <p className={styles.rejectionReceipt}>
                {copy.receipt}
                {entry.sourceReceipt[locale]}
              </p>
            </li>
          ))}
        </ol>
      </ManuscriptReveal>
    </section>
  );
}
