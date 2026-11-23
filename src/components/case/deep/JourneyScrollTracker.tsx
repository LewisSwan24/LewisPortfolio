"use client";

import { useEffect, useState } from "react";
import styles from "./cases-deep.module.css";

export interface JourneyTrackerItem {
  id: string;
  step: number;
  title: string;
}

/**
 * Scroll-synced chapter progress strip inside CaseJourneyRail.
 * Fixed horizontal rail inside document flow (no fixed overlay shift -> CLS = 0).
 */
export function JourneyScrollTracker({
  items,
  locale,
}: {
  items: readonly JourneyTrackerItem[];
  locale: "en" | "zh";
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const isZh = locale === "zh";

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      items.length === 0
    ) {
      return;
    }

    const elements = items
      .map((item) => document.getElementById(`journey-stage-${item.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topEntry = visible[0];
        if (topEntry?.target instanceof HTMLElement) {
          const id = topEntry.target.dataset.stageId;
          if (id) setActiveId(id);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: 0.15,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const jumpToStage = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(`journey-stage-${id}`);
    if (!el) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className={styles.trackerRail}
      aria-label={isZh ? "旅程阶段快速定位" : "Journey stage quick index"}
    >
      <span className={styles.trackerLabel}>
        {isZh ? "阶段进度" : "Stage progress"}
      </span>
      <div className={styles.trackerList}>
        {items.map((item) => {
          const isCurrent = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              className={styles.trackerChip}
              aria-current={isCurrent ? "step" : undefined}
              data-active={isCurrent ? "true" : "false"}
              onClick={() => jumpToStage(item.id)}
            >
              <span className={styles.trackerNum}>
                {String(item.step).padStart(2, "0")}
              </span>
              <span className={styles.trackerTitle}>{item.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
