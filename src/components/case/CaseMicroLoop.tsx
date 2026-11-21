"use client";

import { useEffect, useId, useState } from "react";
import type { CaseMicroLoopData } from "@/lib/cases/schema";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CaseMicroLoopProps {
  data: CaseMicroLoopData;
  locale: "en" | "zh";
}

export function CaseMicroLoop({ data, locale }: CaseMicroLoopProps) {
  const isZh = locale === "zh";
  const headingId = useId();
  const reducedMotion = useReducedMotion();

  // Default to paused on keyframe 1 when prefers-reduced-motion is enabled (WCAG 2.2.2)
  const [playing, setPlaying] = useState(() => !reducedMotion);
  const [stepIdx, setStepIdx] = useState(() => (reducedMotion ? 1 : 0));

  useEffect(() => {
    if (reducedMotion) {
      setPlaying(false);
      setStepIdx((prev) => (prev === 0 ? Math.min(1, data.steps.length - 1) : prev));
    }
  }, [data.steps.length, reducedMotion]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStepIdx((prev) => (prev + 1) % data.steps.length);
    }, 1700);
    return () => window.clearInterval(timer);
  }, [data.steps.length, playing]);

  const currentStep = data.steps[stepIdx] ?? data.steps[0];

  return (
    <article className="case-sim-shell" aria-labelledby={headingId}>
      <div className="case-sim-head">
        <div className="case-sim-head-copy">
          <div className="label">{data.eyebrow[locale]}</div>
          <h2 id={headingId}>{data.title[locale]}</h2>
          <p className="case-sim-prompt">{data.summary[locale]}</p>
        </div>

        <button
          type="button"
          className="btn btn-ghost case-sim-reset"
          aria-pressed={!playing}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing
            ? isZh
              ? "暂停循环"
              : "Pause loop"
            : isZh
              ? "播放循环"
              : "Play loop"}
        </button>
      </div>

      <div className="case-sim-stage proc-stage">
        <svg
          viewBox="0 0 720 150"
          className="proc-loop"
          role="img"
          aria-label={data.title[locale]}
        >
          <line
            x1="80"
            y1="72"
            x2="640"
            y2="72"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          {data.steps.map((step, i) => {
            const x = 90 + i * (540 / Math.max(1, data.steps.length - 1));
            const active = i === stepIdx;
            return (
              <g key={step.label.en}>
                <circle
                  cx={x}
                  cy="72"
                  r={active ? 26 : 19}
                  fill={active ? "var(--accent)" : "var(--surface)"}
                  stroke={active ? "var(--accent)" : "var(--border-strong)"}
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y="77"
                  textAnchor="middle"
                  fontFamily="var(--font-monospace)"
                  fontSize="13"
                  fontWeight="600"
                  fill={active ? "var(--on-accent)" : "var(--text)"}
                >
                  0{i + 1}
                </text>
                <text
                  x={x}
                  y="124"
                  textAnchor="middle"
                  fontFamily="var(--font-ui)"
                  fontSize="12"
                  fontWeight={active ? "600" : "400"}
                  fill={active ? "var(--text)" : "var(--text-3)"}
                >
                  {step.label[locale]}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="sim-segmented" role="group" aria-label={isZh ? "循环关键帧" : "Loop keyframes"}>
          {data.steps.map((step, i) => (
            <button
              key={step.label.en}
              type="button"
              className="sim-seg-btn"
              aria-pressed={i === stepIdx}
              onClick={() => {
                setPlaying(false);
                setStepIdx(i);
              }}
            >
              0{i + 1} · {step.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="case-sim-takeaway" role="status" aria-live="polite">
        <span className="case-sim-takeaway-label">0{stepIdx + 1} · {currentStep.label[locale]}</span>
        <p>{currentStep.detail[locale]}</p>
      </div>
    </article>
  );
}
