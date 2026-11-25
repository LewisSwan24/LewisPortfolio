import type { CaseJourneyStage } from "@/lib/cases/modules-schema";
import { ManuscriptReveal } from "@/components/motion/ManuscriptReveal";
import { JourneyScrollTracker } from "./JourneyScrollTracker";
import { FocusTagList, VerifiedStatusBadge } from "./VerifiedStatusBadge";
import styles from "./cases-deep.module.css";

export function CaseJourneyRail({
  stages,
  locale,
}: {
  stages: readonly CaseJourneyStage[];
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const copy = isZh
    ? {
        eyebrow: "全流程交互旅程",
        heading: "用户心智、系统动作与边界恢复轨迹",
        lead: "逐阶段拆解触发条件、用户心理预期、系统动作、真实认知摩擦，以及脱离主路径时的恢复兜底。",
        trigger: "触发条件",
        mentalModel: "用户心智预期",
        systemAction: "系统动作",
        friction: "认知 / 工程摩擦",
        recovery: "边界与恢复兜底",
      }
    : {
        eyebrow: "Interaction Journey",
        heading: "End-to-End Mental Model & Recovery Rail",
        lead: "Step-by-step trace of triggers, user expectations, system behavior, cognitive friction, and explicit recovery paths.",
        trigger: "Trigger",
        mentalModel: "User mental model",
        systemAction: "System action",
        friction: "Cognitive friction",
        recovery: "Edge & recovery",
      };

  return (
    <section
      id="journey-map"
      className={`${styles.section} ${styles.anchorTarget}`}
      aria-labelledby="journey-map-heading"
    >
      <header className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h2 id="journey-map-heading" className={styles.heading}>
          {copy.heading}
        </h2>
        <p className={styles.lead}>{copy.lead}</p>
      </header>

      <JourneyScrollTracker
        items={stages.map((stage) => ({
          id: stage.id,
          step: stage.step,
          title: stage.shortTitle[locale],
        }))}
        locale={locale}
      />

      <ManuscriptReveal withHairline itemSelector="[data-focus-item]">
        <ol className={styles.journeyList}>
          {stages.map((stage) => (
            <li
              key={stage.id}
              id={`journey-stage-${stage.id}`}
              data-stage-id={stage.id}
              className={styles.journeyCard}
              data-focus-item=""
              data-focus-tags={stage.focusTags.join(" ")}
            >
              <div className={styles.journeyHead}>
                <div className={styles.journeyTitleGroup}>
                  <span className={styles.stepNum} aria-hidden="true">
                    {String(stage.step).padStart(2, "0")}
                  </span>
                  <h3 className={styles.cardTitle}>{stage.title[locale]}</h3>
                </div>

                <div className={styles.badgeRow}>
                  <VerifiedStatusBadge status={stage.verifiedStatus} locale={locale} />
                  <FocusTagList tags={stage.focusTags} locale={locale} />
                </div>
              </div>

              <dl className={styles.journeyGrid}>
                <div className={styles.fieldCell}>
                  <dt>{copy.trigger}</dt>
                  <dd>{stage.trigger[locale]}</dd>
                </div>
                <div className={styles.fieldCell}>
                  <dt>{copy.mentalModel}</dt>
                  <dd>{stage.userMentalModel[locale]}</dd>
                </div>
                <div className={styles.fieldCell}>
                  <dt>{copy.systemAction}</dt>
                  <dd>{stage.systemAction[locale]}</dd>
                </div>
                <div className={`${styles.fieldCell} ${styles.frictionCell}`}>
                  <dt>{copy.friction}</dt>
                  <dd>{stage.cognitiveFriction[locale]}</dd>
                </div>
                <div className={styles.fieldCell}>
                  <dt>{copy.recovery}</dt>
                  <dd>{stage.edgeRecovery[locale]}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </ManuscriptReveal>
    </section>
  );
}
