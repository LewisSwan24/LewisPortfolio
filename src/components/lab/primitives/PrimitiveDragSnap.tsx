"use client";

import { useRef, useState } from "react";
import { getGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Locale = "en" | "zh";

export function PrimitiveDragSnap({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const reducedMotion = useReducedMotion();

  const [damping, setDamping] = useState(0.32);
  const [threshold, setThreshold] = useState(72);
  const [commits, setCommits] = useState(0);
  const [snapBacks, setSnapBacks] = useState(0);
  const [lastEvent, setLastEvent] = useState<string>(
    isZh ? "水平拖动上方纸面卡片，松手观察吸附回弹还是切牌提交。" : "Drag the card horizontally and release to test snap vs commit."
  );

  const cardRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ active: boolean; startX: number; lastDx: number }>({
    active: false,
    startX: 0,
    lastDx: 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragState.current = { active: true, startX: e.clientX, lastDx: 0 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state.active || !cardRef.current) return;
    const rawDx = e.clientX - state.startX;
    const dampedDx = rawDx * damping;
    state.lastDx = dampedDx;

    const { gsap } = getGsap();
    gsap.set(cardRef.current, {
      x: dampedDx,
      rotation: reducedMotion ? 0 : Math.max(-6, Math.min(6, dampedDx * 0.04)),
    });
  };

  const finishDrag = () => {
    const state = dragState.current;
    if (!state.active || !cardRef.current) return;
    state.active = false;
    const committed = Math.abs(state.lastDx) >= threshold;
    const { gsap } = getGsap();

    if (committed) {
      setCommits((c) => c + 1);
      setLastEvent(
        isZh
          ? `已超过提交阈值 (${Math.round(Math.abs(state.lastDx))}px >= ${threshold}px) -> 触发切牌提交`
          : `Committed (${Math.round(Math.abs(state.lastDx))}px >= ${threshold}px) -> Next card snapped`
      );
    } else {
      setSnapBacks((s) => s + 1);
      setLastEvent(
        isZh
          ? `未达阈值 (${Math.round(Math.abs(state.lastDx))}px < ${threshold}px) -> 弹簧回弹归位`
          : `Below threshold (${Math.round(Math.abs(state.lastDx))}px < ${threshold}px) -> Snapped back`
      );
    }

    if (reducedMotion) {
      gsap.set(cardRef.current, { x: 0, rotation: 0 });
    } else {
      gsap.to(cardRef.current, {
        x: 0,
        rotation: 0,
        duration: 0.36,
        ease: "back.out(1.2)",
        overwrite: "auto",
      });
    }
  };

  return (
    <div className="lab-prim-panel">
      <p className="lab-prim-summary">
        {isZh
          ? "基于 GSAP + Pointer Events 调节阻尼系数与提交阈值，直接体验首页 PracticeDeck 的纸面拖拽手感。"
          : "Tune pointer damping and commit threshold with GSAP to feel how PracticeDeck separates accidental nudges from card commits."}
      </p>

      <div className="lab-drag-stage">
        <div
          ref={cardRef}
          className="lab-drag-card"
          role="application"
          aria-label={isZh ? "可横向拖拽卡片" : "Draggable paper card"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <strong>{isZh ? "按住左右拖动卡片 ↔" : "Drag horizontally ↔"}</strong>
          <span className="eyebrow">
            {isZh
              ? `阻尼 ${damping.toFixed(2)} · 阈值 ${threshold}px`
              : `Damping ${damping.toFixed(2)} · Threshold ${threshold}px`}
          </span>
        </div>
      </div>

      <div className="lab-drag-controls">
        <div className="lab-control-row">
          <label htmlFor="lab-drag-damping">
            <span>{isZh ? "阻尼系数 (damping)" : "Damping ratio"}</span>
            <span>{damping.toFixed(2)}</span>
          </label>
          <input
            id="lab-drag-damping"
            type="range"
            min={0.15}
            max={0.65}
            step={0.05}
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
          />
        </div>

        <div className="lab-control-row">
          <label htmlFor="lab-drag-threshold">
            <span>{isZh ? "提交阈值 (threshold)" : "Commit threshold"}</span>
            <span>{threshold}px</span>
          </label>
          <input
            id="lab-drag-threshold"
            type="range"
            min={40}
            max={120}
            step={8}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="lab-sm-rule" role="status" aria-live="polite">
        {lastEvent} · ({isZh ? `提交 ${commits} / 回弹 ${snapBacks}` : `Commits ${commits} / Snap-backs ${snapBacks}`})
      </div>
    </div>
  );
}
