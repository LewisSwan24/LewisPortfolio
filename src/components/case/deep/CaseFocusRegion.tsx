"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { parseCaseReviewFocus } from "./CaseReviewLensSwitch";
import styles from "./cases-deep.module.css";

export function CaseFocusRegion({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const focus = parseCaseReviewFocus(searchParams.get("focus"));

  return (
    <div
      id="case-deep-root"
      className={styles.focusScope}
      data-active-focus={focus}
    >
      {children}
    </div>
  );
}
