import type { CaseModuleFocusTag, CaseVerifiedStatus } from "@/lib/cases/modules-schema";
import styles from "./cases-deep.module.css";

const VERIFIED_LABELS: Record<CaseVerifiedStatus, { en: string; zh: string }> = {
  observed: { en: "Observed in use", zh: "日常实测观察" },
  "bench-tested": { en: "Bench / hardware verified", zh: "台架 / 真机实测" },
  "synthetic-gate": { en: "Automated / synthetic gate", zh: "自动化 / 合成门禁" },
  "unverified-hypothesis": { en: "Unverified hypothesis", zh: "待验证假设" },
};

const FOCUS_TAG_LABELS: Record<CaseModuleFocusTag, { en: string; zh: string }> = {
  "ux-research": { en: "UX & IA", zh: "体验与架构" },
  "systems-hardware": { en: "Systems & HW", zh: "系统与硬件" },
  "ai-trust": { en: "AI Trust", zh: "AI 信任规则" },
};

export function VerifiedStatusBadge({
  status,
  locale,
}: {
  status: CaseVerifiedStatus;
  locale: "en" | "zh";
}) {
  return (
    <span className={styles.verifiedBadge} data-status={status}>
      <span className={styles.verifiedDot} aria-hidden="true" />
      <span>{VERIFIED_LABELS[status][locale]}</span>
    </span>
  );
}

export function FocusTagList({
  tags,
  locale,
}: {
  tags: readonly CaseModuleFocusTag[];
  locale: "en" | "zh";
}) {
  return (
    <>
      {tags.map((tag) => (
        <span key={tag} className={styles.focusTag}>
          {FOCUS_TAG_LABELS[tag][locale]}
        </span>
      ))}
    </>
  );
}
