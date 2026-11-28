"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { localizeInternalHref } from "@/lib/locale-href";
import type { SpecimenNodeSpec, ThreeLocale } from "./types";
import { useWebGLSupport } from "./useWebGLSupport";

const SpecimenAxisWebGL = dynamic(
  () => import("./SpecimenAxisWebGL").then((mod) => mod.SpecimenAxisWebGL),
  { ssr: false, loading: () => null }
);

/**
 * `nodes` comes from the server page (SPECIMEN_NODES) so the specimen copy
 * stays out of the /lab route chunk (v6.9 phase C budget).
 */
export function SpecimenAxisCanvas({
  locale,
  nodes,
}: {
  locale: ThreeLocale;
  nodes: readonly SpecimenNodeSpec[];
}) {
  const isZh = locale === "zh";
  const [activeSlug, setActiveSlug] = useState<SpecimenNodeSpec["slug"]>("walkie");
  const [webglLost, setWebglLost] = useState(false);
  const [inView, setInView] = useState(false);
  const [prefer2D, setPrefer2D] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const webgl = useWebGLSupport(!prefer2D && !webglLost);
  const canRender3D = inView && webgl.supported && !prefer2D && !webglLost;
  const activeNode =
    nodes.find((node) => node.slug === activeSlug) ?? nodes[0];

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const copy = isZh
    ? {
        eyebrow: "04 · 六个案例的两轴分布",
        title: "人因摩擦 × 决策边界 × 硬件实体感",
        sub: "把六个案例放到同一个空间标尺下观察：越靠近右上角，边界越落在物理动作与实时社交摩擦中；越靠近左上角，工作越聚焦 AI 协同规则与拒绝边界。",
        axisX: "人因摩擦重心（规则/认知 ← → 社交/物理）",
        axisY: "边界强硬度（明确拒绝 / 实体门禁 ↑）",
        regionLabel: "6 个案例按人因摩擦、决策边界与硬件实体感排布的图",
        mode3D: "3D 视图 · 可拖拽旋转",
        mode2D: "2D 平面图",
        toggle2D: "切到 2D 视图",
        toggle3D: "切到 3D 视图",
        openCase: "查看决策论证 →",
        limitsLabel: "诚实边界",
      }
    : {
        eyebrow: "04 · Six cases on two axes",
        title: "Human friction × boundary stance × physicality",
        sub: "Six cases plotted along one drafting frame: physical devices lock consent into buttons and bands, while local software encodes explicit refusal thresholds.",
        axisX: "Human tension (cognitive/rule ← → social/physical)",
        axisY: "Boundary stance (explicit refusal / hardware lock ↑)",
        regionLabel: "Chart of the 6 cases by human friction, boundary stance and physicality",
        mode3D: "3D view · drag to rotate",
        mode2D: "2D view",
        toggle2D: "Switch to 2D",
        toggle3D: "Switch to 3D",
        openCase: "Inspect rationale →",
        limitsLabel: "Honest scope",
      };

  return (
    <section
      className="section container specimen-section"
      aria-label={copy.regionLabel}
    >
      <div className="v4-editorial-grid" style={{ alignItems: "stretch" }}>
        <div className="v4-span-7 specimen-stage-card v4-studio-plate" ref={stageRef}>
          <div className="specimen-stage-head">
            <div>
              <div className="label">{copy.eyebrow}</div>
              <h2 className="h-display" style={{ fontSize: "clamp(22px, 2.4vw, 28px)", marginTop: 6 }}>
                {copy.title}
              </h2>
            </div>
            <div className="specimen-mode-bar">
              <span className="eyebrow">{canRender3D ? copy.mode3D : copy.mode2D}</span>
              {webgl.supported && (
                <button
                  type="button"
                  className="btn btn-ghost specimen-mode-btn"
                  onClick={() => setPrefer2D((v) => !v)}
                >
                  {prefer2D ? copy.toggle3D : copy.toggle2D}
                </button>
              )}
            </div>
          </div>

          <div className="specimen-canvas-frame">
            <svg
              viewBox="0 0 640 320"
              className="specimen-svg-baseline"
              data-testid="specimen-svg-baseline"
              role="img"
              aria-label={copy.regionLabel}
              style={{ opacity: canRender3D ? 0 : 1 }}
            >
              <line x1="56" y1="268" x2="594" y2="268" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
              <line x1="320" y1="32" x2="320" y2="290" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
              <rect x="64" y="38" width="512" height="222" fill="none" stroke="currentColor" strokeOpacity="0.14" strokeDasharray="4 4" />
              <text className="specimen-axis-label" x="64" y="294" fill="currentColor" fillOpacity="0.58" fontSize="11">
                {copy.axisX}
              </text>
              <text className="specimen-axis-label" x="330" y="42" fill="currentColor" fillOpacity="0.58" fontSize="11">
                {copy.axisY}
              </text>

              {nodes.map((node) => {
                const active = node.slug === activeSlug;
                return (
                  <g
                    key={node.slug}
                    transform={`translate(${node.svgPos[0]}, ${node.svgPos[1]})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActiveSlug(node.slug)}
                  >
                    {active && (
                      <circle r="18" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
                    )}
                    <circle
                      r={active ? 8 : 6}
                      fill={node.colorLight}
                      stroke="var(--surface)"
                      strokeWidth="1.5"
                    />
                    <text
                      className="specimen-node-label"
                      x="13"
                      y="4"
                      fill="currentColor"
                      fontSize={active ? "13" : "11"}
                      fontWeight={active ? "600" : "400"}
                    >
                      {node.title}
                    </text>
                  </g>
                );
              })}
            </svg>

            {canRender3D && (
              <div className="specimen-webgl-overlay">
                <SpecimenAxisWebGL
                  activeSlug={activeSlug}
                  onSelect={setActiveSlug}
                  onContextLost={() => setWebglLost(true)}
                />
              </div>
            )}
          </div>

          {/* On phones the SVG scales to ~0.5x, so its 11-unit labels drop to ~6px.
              home.css hides them there and shows the axis names here instead;
              the pills below already name every case. */}
          <dl className="specimen-axis-captions">
            <dt>X</dt>
            <dd>{copy.axisX}</dd>
            <dt>Y</dt>
            <dd>{copy.axisY}</dd>
          </dl>
          <div
            className="specimen-node-pills"
            role="group"
            aria-label={isZh ? "切换设计标本" : "Select design specimen"}
          >
            {nodes.map((node) => {
              const isSelected = node.slug === activeSlug;
              return (
                <button
                  key={node.slug}
                  type="button"
                  aria-label={`Select specimen: ${node.title}`}
                  aria-pressed={isSelected}
                  className={`idx-filter specimen-pill${isSelected ? " active" : ""}`}
                  onClick={() => setActiveSlug(node.slug)}
                >
                  {node.title}
                </button>
              );
            })}
          </div>
        </div>

        <aside className="v4-span-5 v4-studio-plate specimen-detail-card" aria-live="polite">
          <div className="specimen-detail-meta">
            <span className="tag">{activeNode.mediumTag[locale]}</span>
          </div>
          <h3 data-testid="specimen-active-title" className="h-display">
            {activeNode.title}
          </h3>
          <p data-testid="specimen-active-question" className="specimen-question">
            “{activeNode.thesisQuestion[locale]}”
          </p>
          <p className="specimen-summary">{activeNode.decisionSummary[locale]}</p>

          <div className="specimen-limit-box">
            <span className="eyebrow">{copy.limitsLabel}</span>
            <p>{activeNode.honestScope[locale]}</p>
          </div>

          <div className="specimen-detail-foot">
            <Link
              href={localizeInternalHref(`/projects/${activeNode.slug}#design-decisions`, locale)}
              className="btn btn-primary"
            >
              {copy.openCase}
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
