"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CaseLensCallouts, CaseReviewFocus } from "@/lib/cases/modules-schema";
import styles from "./cases-deep.module.css";

const LENS_OPTIONS: Array<{
  id: CaseReviewFocus;
  en: string;
  zh: string;
}> = [
  { id: "all", en: "All", zh: "全部视角" },
  { id: "ux-research", en: "UX Research & IA", zh: "UX 研究与架构" },
  { id: "systems-hardware", en: "Systems & Hardware", zh: "系统与硬件" },
  { id: "ai-trust", en: "AI Trust & Rules", zh: "AI 信任与规则" },
];

export function parseCaseReviewFocus(raw: string | null): CaseReviewFocus {
  if (
    raw === "ux-research" ||
    raw === "systems-hardware" ||
    raw === "ai-trust"
  ) {
    return raw;
  }
  return "all";
}

export function CaseReviewLensSwitch({
  callouts,
  locale,
}: {
  callouts: CaseLensCallouts;
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [statusMessage, setStatusMessage] = useState("");

  const activeFocus = parseCaseReviewFocus(searchParams.get("focus"));

  const selectFocus = (nextFocus: CaseReviewFocus) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextFocus === "all") {
      params.delete("focus");
    } else {
      params.set("focus", nextFocus);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });

    const label = LENS_OPTIONS.find((item) => item.id === nextFocus);
    if (label) {
      setStatusMessage(
        isZh
          ? `已切换至「${label.zh}」审阅视角。`
          : `Switched review lens to ${label.en}.`
      );
    }
  };

  return (
    <section
      className={styles.lensShell}
      aria-labelledby="case-review-lens-heading"
    >
      <div className={styles.lensTopRow}>
        <div className={styles.lensHeadingBlock}>
          <span className={styles.eyebrow}>
            {isZh ? "审阅视角切换器" : "Case Reader Lens"}
          </span>
          <h2 id="case-review-lens-heading" className={styles.lensTitle}>
            {isZh
              ? "按你的评审重点，高亮对应旅程、五态规范与打回记录"
              : "Highlight matching journey steps, 5-state rules & rework logs"}
          </h2>
        </div>

        <div
          className={styles.lensControls}
          role="group"
          aria-label={isZh ? "选择审阅视角" : "Choose review lens"}
        >
          {LENS_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={styles.lensButton}
              aria-pressed={activeFocus === option.id}
              onClick={() => selectFocus(option.id)}
            >
              {isZh ? option.zh : option.en}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.lensCallout} data-testid="case-lens-callout">
        {callouts[activeFocus][locale]}
      </p>

      <output role="status" className={styles.srStatus}>
        {statusMessage}
      </output>
    </section>
  );
}
