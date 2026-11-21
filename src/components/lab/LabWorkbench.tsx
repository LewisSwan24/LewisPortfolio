"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import { getGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LabPrimitivesGallery } from "./primitives/LabPrimitivesGallery";

type Locale = "en" | "zh";
type EaseId = "power2.out" | "power3.out" | "back.out(1.2)";

const SWATCHES = [
  { token: "--bg", hexLight: "#EFE8DA", hexDark: "#141413", ratio: "Base canvas" },
  { token: "--surface", hexLight: "#F7F4EC", hexDark: "#1C1C1B", ratio: "Card layer" },
  { token: "--surface-2", hexLight: "#E7DFD1", hexDark: "#262624", ratio: "Quiet fill" },
  { token: "--text", hexLight: "#161412", hexDark: "#F5F5F4", ratio: "15.1:1 / 16.9:1" },
  { token: "--text-2", hexLight: "#4E4840", hexDark: "#D0D0CC", ratio: "7.4:1 / 11.9:1" },
  { token: "--text-3", hexLight: "#5F584F", hexDark: "#A8A8A3", ratio: "5.8:1 / 7.7:1" },
  { token: "--border", hexLight: "#9C9182", hexDark: "#5C5C58", ratio: "1px divider" },
  { token: "--accent", hexLight: "#A63F2A", hexDark: "#F5F5F4", ratio: "5.1:1 · actions only" },
] as const;

export function LabWorkbench({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const { resolvedTheme, setTheme } = useTheme();
  const osReducedMotion = useReducedMotion();

  // Module 02 state: GSAP Paper Motion Sandbox
  const [duration, setDuration] = useState(0.36);
  const [ease, setEase] = useState<EaseId>("power3.out");
  const [simulateReduced, setSimulateReduced] = useState(false);
  const [cardAtRight, setCardAtRight] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const effectiveReduced = osReducedMotion || simulateReduced;

  const triggerMotion = () => {
    const nextSide = !cardAtRight;
    setCardAtRight(nextSide);
    const el = cardRef.current;
    if (!el) return;
    const { gsap } = getGsap();
    const targetX = nextSide ? 160 : 0;
    const targetRot = nextSide ? 2 : -1.5;

    if (effectiveReduced) {
      gsap.set(el, { x: targetX, rotation: 0, opacity: 1 });
      return;
    }

    gsap.to(el, {
      x: targetX,
      rotation: targetRot,
      duration,
      ease,
      overwrite: "auto",
    });
  };

  return (
    <div className="container lab-grid">
      {/* Module 01: Lively Icons Token & Contrast Inspector */}
      <section className="lab-module" aria-labelledby="lab-tokens-title">
        <div className="lab-module-head">
          <div>
            <div className="label">01 · {isZh ? "设计语言检查器" : "Design System Inspector"}</div>
            <h2 id="lab-tokens-title">
              {isZh ? "Lively Icons 暖纸色与单强调色规范" : "Lively Icons Warm-Paper & Single-Accent Tokens"}
            </h2>
            <p>
              {isZh
                ? "零阴影、零渐变、零毛玻璃。层级全靠 1px 线框区分；亮色仅用赤陶红标记可点击动作，暗色完全去色相。"
                : "No shadows, no gradients, no blur. Layers separate with 1px lines; terra marks actions only in light mode, while dark mode drops hue completely."}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {isZh
              ? `切换主题（当前：${resolvedTheme === "dark" ? "暗色" : "亮色"}）`
              : `Toggle theme (${resolvedTheme === "dark" ? "dark" : "light"})`}
          </button>
        </div>

        <div className="lab-swatch-grid">
          {SWATCHES.map((s) => (
            <div className="lab-swatch" key={s.token}>
              <div className="lab-swatch-chip" style={{ background: `var(${s.token})` }} />
              <div className="lab-swatch-meta">
                <code>{s.token}</code>
                <span>{resolvedTheme === "dark" ? s.hexDark : s.hexLight}</span>
                <span>{s.ratio}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lab-type-row">
          <div className="lab-type-card">
            <div className="eyebrow">01 · Page Title (700)</div>
            <div className="lab-type-sample-title">
              {isZh ? "交互即规则" : "Rules you can feel"}
            </div>
            <span className="eyebrow">Shantell Sans / ZCOOL KuaiLe · h1 only</span>
          </div>
          <div className="lab-type-card">
            <div className="eyebrow">02 · Interface & Body (400 / 600)</div>
            <div className="lab-type-sample-ui">
              {isZh ? "清晰胜过装饰，证据先于修辞。" : "Clarity over ornament, proof before prose."}
            </div>
            <span className="eyebrow">Lexend · no italics, two weights</span>
          </div>
          <div className="lab-type-card">
            <div className="eyebrow">03 · Technical Metadata (400)</div>
            <div className="lab-type-sample-mono">2026-11-21 · v3.0 · 15.1:1</div>
            <span className="eyebrow">Geist Mono · dates, tokens, specs</span>
          </div>
        </div>
      </section>

      {/* Module 02: GSAP Paper Motion Sandbox */}
      <section className="lab-module" aria-labelledby="lab-motion-title">
        <div className="lab-module-head">
          <div>
            <div className="label">02 · {isZh ? "GSAP 纸面动效实验台" : "GSAP Paper Motion Sandbox"}</div>
            <h2 id="lab-motion-title">
              {isZh ? "克制、仅合成属性的交互曲线" : "Restrained, Transform-Only Motion Curves"}
            </h2>
            <p>
              {isZh
                ? "全站统一采用 GSAP（移除 framer-motion），只动画 x / rotation / opacity，并在 reduced-motion 下自动退化为 0ms 瞬时切换。"
                : "Powered by a single GSAP layer (framer-motion removed), animating transform properties only and snapping instantly under reduced motion."}
            </p>
          </div>
        </div>

        <div className="lab-motion-wrap">
          <div className="lab-motion-stage">
            <div ref={cardRef} className="lab-motion-card" style={{ transform: "rotate(-1.5deg)" }}>
              <strong>{isZh ? "纸面卡片样本" : "Paper Card Specimen"}</strong>
              <span>{effectiveReduced ? "duration: 0ms (reduced)" : `${duration.toFixed(2)}s · ${ease}`}</span>
            </div>
            <button type="button" className="btn btn-primary" onClick={triggerMotion}>
              {isZh ? "触发位移" : "Trigger motion"} →
            </button>
          </div>

          <div className="lab-motion-controls">
            <div className="lab-control-row">
              <label htmlFor="lab-duration">
                <span>{isZh ? "时长 (duration)" : "Duration"}</span>
                <span>{duration.toFixed(2)}s</span>
              </label>
              <input
                id="lab-duration"
                type="range"
                min={0.16}
                max={0.65}
                step={0.02}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>

            <div className="lab-control-row">
              <label>{isZh ? "缓动曲线 (ease)" : "Easing preset"}</label>
              <div className="lab-pill-row">
                {(["power2.out", "power3.out", "back.out(1.2)"] as const).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className="lab-pill"
                    aria-pressed={ease === preset}
                    onClick={() => setEase(preset)}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="lab-control-row">
              <label>{isZh ? "无障碍降级模拟" : "Reduced-motion simulation"}</label>
              <button
                type="button"
                className="lab-pill"
                aria-pressed={simulateReduced}
                onClick={() => setSimulateReduced((v) => !v)}
              >
                {simulateReduced
                  ? isZh
                    ? "已开启 reduced-motion（瞬时切换）"
                    : "Reduced motion ON (instant)"
                  : isZh
                    ? "模拟 prefers-reduced-motion"
                    : "Simulate prefers-reduced-motion"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Module 03: Six Interaction Primitives Exhibition */}
      <LabPrimitivesGallery locale={locale} />
    </div>
  );
}
