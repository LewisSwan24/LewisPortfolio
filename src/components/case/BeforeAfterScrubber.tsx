"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { CaseScrubber } from "@/lib/cases/schema";
import { AdaptiveCaseMedia } from "./AdaptiveCaseMedia";
import { ProcessWireframe } from "./wireframes/ProcessWireframes";
import { DiagramViewer } from "./DiagramViewer";

interface BeforeAfterScrubberProps {
  data: CaseScrubber;
  locale: "en" | "zh";
  /** Inside the case appendix this sits one heading level down. */
  headingLevel?: 2 | 3 | 4;
}

const isRasterSrc = (src: string) => /\.(?:jpe?g|png|webp|avif)$/i.test(src);

/** True only when both sides are photos, the one case a drag slider suits. */
export function isPhotoPair(data: CaseScrubber): boolean {
  return Boolean(
    data.beforeImage && isRasterSrc(data.beforeImage.src) && isRasterSrc(data.afterImage.src)
  );
}

export function BeforeAfterScrubber({ data, locale, headingLevel = 2 }: BeforeAfterScrubberProps) {
  const HeadingTag = headingLevel === 4 ? "h4" : headingLevel === 3 ? "h3" : "h2";
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

  const head = (
    <div className="case-sim-head-copy">
      <div className="label">{data.eyebrow[locale]}</div>
      <HeadingTag id={headingId}>{data.title[locale]}</HeadingTag>
      <p className="case-sim-prompt">{data.summary[locale]}</p>
    </div>
  );

  const afterMedia = (
    <AdaptiveCaseMedia
      src={data.afterImage.src}
      alt={data.afterImage.alt[locale]}
      width={data.afterImage.width}
      height={data.afterImage.height}
      sizes="(max-width: 960px) 100vw, 960px"
      className="proc-wf-svg"
    />
  );

  // A drag slider halves whatever it covers, which cuts text mid-word. Only a
  // photo-on-photo pair gets the slider; drawings with text sit side by side.
  if (!isPhotoPair(data)) {
    return (
      <article className="case-sim-shell" aria-labelledby={headingId}>
        <div className="case-sim-head">{head}</div>
        <div className="case-sim-stage proc-stage">
          <div className="proc-compare">
            <figure>
              <figcaption className="eyebrow">{data.beforeLabel[locale]}</figcaption>
              <div className="proc-compare-media">
                <DiagramViewer label={`${data.title[locale]} · ${data.beforeLabel[locale]}`} isZh={isZh}>
                  <ProcessWireframe id={data.wireframeId} locale={locale} />
                </DiagramViewer>
              </div>
            </figure>
            <figure>
              <figcaption className="eyebrow">{data.afterLabel[locale]}</figcaption>
              <div className="proc-compare-media">
                <DiagramViewer label={`${data.title[locale]} · ${data.afterLabel[locale]}`} isZh={isZh}>
                  {afterMedia}
                </DiagramViewer>
              </div>
            </figure>
          </div>
        </div>
      </article>
    );
  }

  const beforeImage = data.beforeImage!;

  return (
    <article className="case-sim-shell" aria-labelledby={headingId}>
      <div className="case-sim-head">
        {head}
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
          <div className="proc-layer">{afterMedia}</div>

          <div
            className="proc-layer"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            aria-hidden="true"
          >
            <AdaptiveCaseMedia
              src={beforeImage.src}
              alt={beforeImage.alt[locale]}
              width={beforeImage.width}
              height={beforeImage.height}
              sizes="(max-width: 960px) 100vw, 960px"
              className="proc-wf-svg"
              decorative
            />
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
