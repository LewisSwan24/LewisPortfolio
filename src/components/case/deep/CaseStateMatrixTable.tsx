import type { CaseStateSpec } from "@/lib/cases/modules-schema";
import { FocusTagList, VerifiedStatusBadge } from "./VerifiedStatusBadge";
import styles from "./cases-deep.module.css";

export function CaseStateMatrixTable({
  states,
  locale,
}: {
  states: readonly CaseStateSpec[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const copy = isZh
    ? {
        eyebrow: "五态交互边界规范",
        heading: "正常、空状态、离线、错误与拒绝态矩阵",
        lead: "真正的交互可靠性不取决于理想路径，而取决于断网、空状态、报错与越权拒绝时焦点、反馈与退路的明确程度。",
        caption: "五态交互规范对比表",
        colState: "状态",
        colEntry: "进入条件",
        colFeedback: "界面反馈",
        colFocus: "键盘与焦点行为",
        colGuarantee: "降级与安全保障",
      }
    : {
        eyebrow: "Five-State Specification",
        heading: "Normal, Empty, Offline, Error & Refused Matrix",
        lead: "Interaction reliability is defined outside the happy path—detailing exact feedback, keyboard focus behavior, and fallback guarantees across all five interface states.",
        caption: "Five-state interaction specification matrix",
        colState: "State",
        colEntry: "Entry condition",
        colFeedback: "UI feedback",
        colFocus: "Keyboard & focus",
        colGuarantee: "Fallback guarantee",
      };

  return (
    <section
      id="state-matrix"
      className={`${styles.section} ${styles.anchorTarget}`}
      aria-labelledby="state-matrix-heading"
    >
      <header className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h2 id="state-matrix-heading" className={styles.heading}>
          {copy.heading}
        </h2>
        <p className={styles.lead}>{copy.lead}</p>
      </header>

      <div className={`${styles.tableScroll} ${styles.desktopMatrix}`}>
        <table className={styles.stateTable}>
          <caption className={styles.tableCaption}>{copy.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.colState}</th>
              <th scope="col">{copy.colEntry}</th>
              <th scope="col">{copy.colFeedback}</th>
              <th scope="col">{copy.colFocus}</th>
              <th scope="col">{copy.colGuarantee}</th>
            </tr>
          </thead>
          <tbody>
            {states.map((row) => (
              <tr
                key={row.state}
                data-focus-item=""
                data-focus-tags={row.focusTags.join(" ")}
              >
                <th scope="row">
                  <div className={styles.stateHeading}>
                    <span className={styles.stateCode}>{row.state}</span>
                    <span>{row.label[locale]}</span>
                    <div className={styles.badgeRow}>
                      <VerifiedStatusBadge status={row.verifiedStatus} locale={locale} />
                      <FocusTagList tags={row.focusTags} locale={locale} />
                    </div>
                  </div>
                </th>
                <td>{row.entryCondition[locale]}</td>
                <td>{row.uiFeedback[locale]}</td>
                <td>{row.keyboardFocus[locale]}</td>
                <td>{row.fallbackGuarantee[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileMatrix}>
        <ol className={styles.mobileStateList}>
          {states.map((row) => (
            <li
              key={`mobile-${row.state}`}
              className={styles.mobileStateCard}
              data-focus-item=""
              data-focus-tags={row.focusTags.join(" ")}
            >
              <div className={styles.stateHeading}>
                <span className={styles.stateCode}>{row.state}</span>
                <h3 className={styles.cardTitle}>{row.label[locale]}</h3>
                <div className={styles.badgeRow}>
                  <VerifiedStatusBadge status={row.verifiedStatus} locale={locale} />
                  <FocusTagList tags={row.focusTags} locale={locale} />
                </div>
              </div>

              <dl className={styles.mobileStateDl}>
                <div className={styles.mobileStateRow}>
                  <dt>{copy.colEntry}</dt>
                  <dd>{row.entryCondition[locale]}</dd>
                </div>
                <div className={styles.mobileStateRow}>
                  <dt>{copy.colFeedback}</dt>
                  <dd>{row.uiFeedback[locale]}</dd>
                </div>
                <div className={styles.mobileStateRow}>
                  <dt>{copy.colFocus}</dt>
                  <dd>{row.keyboardFocus[locale]}</dd>
                </div>
                <div className={styles.mobileStateRow}>
                  <dt>{copy.colGuarantee}</dt>
                  <dd>{row.fallbackGuarantee[locale]}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
