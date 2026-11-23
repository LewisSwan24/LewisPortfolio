"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { CaseScrubber } from "@/lib/cases/schema";
import { AdaptiveCaseMedia } from "./AdaptiveCaseMedia";
import { ProcessWireframe } from "./wireframes/ProcessWireframes";

interface BeforeAfterScrubberProps {
  data: CaseScrubber;
  locale: "en" | "zh";
}

export function BeforeAfterScrubber({ data, locale }: BeforeAfterScrubberProps) {
  const isZh = locale === "zh";
  const headingId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const clampPos = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(clampPos(next));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => clampPos(p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => clampPos(p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  const copy = isZh
    ? {
        sliderAria: `${data.title.zh}，拖动或按左右方向键对比前后差异`,
        presets: [
          { label: "偏重改造前 (80%)", val: 80 },
          { label: "50 / 50 对照", val: 50 },
          { label: "偏重成品 (20%)", val: 20 },
        ],
      }
    : {
        sliderAria: `${data.title.en}. Drag or use Left and Right arrows to compare before and after.`,
        presets: [
          { label: "Inspect Before (80%)", val: 80 },
          { label: "50 / 50 Split", val: 50 },
          { label: "Inspect After (20%)", val: 20 },
        ],
      };

  return (
    <article className="case-sim-shell" aria-labelledby={headingId}>
      <div className="case-sim-head">
        <div className="case-sim-head-copy">
          <div className="label">{data.eyebrow[locale]}</div>
          <h2 id={headingId}>{data.title[locale]}</h2>
          <p className="case-sim-prompt">{data.summary[locale]}</p>
        </div>
        <div className="sim-segmented" role="group" aria-label={isZh ? "快速对比比例" : "Quick split presets"}>
          {copy.presets.map((preset) => (
            <button
              key={preset.val}
              type="button"
              className="sim-seg-btn"
              aria-pressed={pos === preset.val}
              onClick={() => setPos(preset.val)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="case-sim-stage proc-stage">
        <div className="sim-scenario-head eyebrow">
          <span>{data.beforeLabel[locale]}</span>
          <span>{data.afterLabel[locale]}</span>
        </div>

        <div
          ref={trackRef}
          className="proc-scrub"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="proc-layer">
            <AdaptiveCaseMedia
              src={data.afterImage.src}
              alt={data.afterImage.alt[locale]}
              width={data.afterImage.width}
              height={data.afterImage.height}
              sizes="(max-width: 960px) 100vw, 960px"
              className="proc-wf-svg"
            />
          </div>

          <div
            className="proc-layer"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            aria-hidden="true"
          >
            <ProcessWireframe id={data.wireframeId} locale={locale} />
          </div>

          <div
            className="proc-handle"
            style={{ left: `${pos}%` }}
            role="slider"
            tabIndex={0}
            aria-label={copy.sliderAria}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pos}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </article>
  );
}
