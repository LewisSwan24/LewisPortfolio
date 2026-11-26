"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { CaseInteractiveDemo } from "@/lib/cases/schema";
import { getSimulatorComponent } from "./simulators/registry";

interface CaseSimulatorFrameProps {
  demo: CaseInteractiveDemo;
  locale: "en" | "zh";
  /**
   * Story-first case pages (v6.6) put the frame inside their own "Try it
   * yourself" section: no section wrapper, heading or takeaway of its own.
   */
  embedded?: boolean;
}

export function CaseSimulatorFrame({ demo, locale, embedded = false }: CaseSimulatorFrameProps) {
  const isZh = locale === "zh";
  const headingId = useId();
  const stageRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const SimulatorComponent = getSimulatorComponent(demo.id);

  useEffect(() => {
    if (mounted) return;
    const target = stageRef.current;
    if (!target || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [mounted]);

  const handleLoadNow = useCallback(() => {
    setMounted(true);
    setStatusMessage(
      isZh ? "交互原型已加载，可以直接点击或使用键盘操作。" : "Interactive prototype loaded and ready."
    );
  }, [isZh]);

  const handleReset = useCallback(() => {
    setMounted(true);
    setResetKey((prev) => prev + 1);
    setStatusMessage(isZh ? "原型已重置为初始状态。" : "Prototype reset to initial state.");
  }, [isZh]);

  const handleStatusChange = useCallback((message: string) => {
    setStatusMessage(message);
  }, []);

  const copy = isZh
    ? {
        reset: "重置",
        loadNow: "立即加载体验",
        skeletonHint: "接近视口时按需加载独立交互模块，零首屏体积拖累。",
        takeawayLabel: "交互设计结论",
        idleStatus: "等待操作：按上方引导试着切换状态或触发边界条件。",
        unavailable: "该交互模拟器将在下一阶段接入。",
      }
    : {
        reset: "Reset",
        loadNow: "Load interactive prototype",
        skeletonHint: "Lazy-loaded near viewport so initial case paint stays fast.",
        takeawayLabel: "Interaction takeaway",
        idleStatus: "Ready: try the controls below to test state transitions and guardrails.",
        unavailable: "This interactive simulator is scheduled for the next milestone.",
      };

  const shell = (
      <div className="case-sim-shell">
        <header className="case-sim-head">
          <div className="case-sim-head-copy">
            {!embedded && <div className="label">{demo.eyebrow[locale]}</div>}
            {!embedded && <h2 id={headingId}>{demo.title[locale]}</h2>}
            <p className="case-sim-prompt">{demo.prompt[locale]}</p>
          </div>
          <div className="case-sim-head-actions">
            <button
              type="button"
              className="btn btn-ghost case-sim-reset"
              onClick={handleReset}
            >
              {copy.reset}
            </button>
          </div>
        </header>

        <div
          ref={stageRef}
          className="case-sim-stage"
          data-mounted={mounted ? "true" : "false"}
        >
          {mounted ? (
            SimulatorComponent ? (
              <SimulatorComponent
                key={resetKey}
                locale={locale}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <p className="case-sim-unavailable">{copy.unavailable}</p>
            )
          ) : (
            <div className="case-sim-skeleton">
              <div className="case-sim-skeleton-inner" aria-hidden="true">
                <div className="case-sim-skeleton-bar case-sim-skeleton-bar--wide" />
                <div className="case-sim-skeleton-grid">
                  <div className="case-sim-skeleton-block" />
                  <div className="case-sim-skeleton-block" />
                </div>
              </div>
              <div className="case-sim-skeleton-cta">
                <p>{copy.skeletonHint}</p>
                <button
                  type="button"
                  className="btn btn-primary case-sim-load-btn"
                  onClick={handleLoadNow}
                >
                  {copy.loadNow}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="case-sim-status" role="status" aria-live="polite">
          <span className="case-sim-status-dot" aria-hidden="true" />
          <span>{statusMessage || copy.idleStatus}</span>
        </div>

        {!embedded && (
          <footer className="case-sim-takeaway">
            <span className="case-sim-takeaway-label">{copy.takeawayLabel}</span>
            <p>{demo.takeaway[locale]}</p>
          </footer>
        )}
      </div>
  );

  if (embedded) {
    return (
      <div className="case-sim-section case-sim-section--embedded" data-simulator-id={demo.id}>
        {shell}
      </div>
    );
  }

  return (
    <section
      id="interactive-demo"
      className="container case-sim-section"
      aria-labelledby={headingId}
      data-simulator-id={demo.id}
    >
      {shell}
    </section>
  );
}
