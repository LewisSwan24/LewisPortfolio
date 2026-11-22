"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useTheme } from "next-themes";
import { getGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LabPrimitivesGallery } from "./primitives/LabPrimitivesGallery";

type Locale = "en" | "zh";
type EaseId = "power2.out" | "power3.out" | "back.out(1.2)";

const SWATCHES = [
  { token: "--bg", hexLight: "#F6F4EF", hexDark: "#111110", ratio: "Warm Bone / Deep Studio" },
  { token: "--surface", hexLight: "#FCFBF8", hexDark: "#181816", ratio: "Primary Card Layer" },
  { token: "--surface-2", hexLight: "#ECE8DF", hexDark: "#222220", ratio: "Elevated Workbench" },
  { token: "--text", hexLight: "#151412", hexDark: "#F4F2ED", ratio: "16.4:1 / 16.9:1" },
  { token: "--text-2", hexLight: "#3E3A33", hexDark: "#D6D3CB", ratio: "10.3:1 / 12.6:1 (AAA)" },
  { token: "--text-3", hexLight: "#4E4940", hexDark: "#B8B5AD", ratio: "8.1:1 / 9.2:1 (AAA)" },
  { token: "--border-strong", hexLight: "#6E675C", hexDark: "#726F67", ratio: "1px structural grid" },
  { token: "--accent", hexLight: "#A63F2A", hexDark: "#F4F2ED", ratio: "5.4:1 · primary action" },
] as const;

const CASE_MOOD_SWATCHES = [
  {
    labelEn: "Signal Vermilion · Physical Control",
    labelZh: "信号朱砂 · 实体控制回路",
    token: "#A63F2A",
    darkHex: "#E69682",
    cases: "walkie",
  },
  {
    labelEn: "Steel Blue · Hardware & Signal",
    labelZh: "冷钢蓝 · 硬件物理通道",
    token: "#2B4D6F",
    darkHex: "#92BAE0",
    cases: "maze / onthebeat",
  },
  {
    labelEn: "Slate Indigo · Precision Gate",
    labelZh: "岩板靛 · 精确校验门控",
    token: "#3B4D70",
    darkHex: "#A3B6E0",
    cases: "autofill",
  },
  {
    labelEn: "Warm Umber · Play & Narrative",
    labelZh: "琥珀棕 · 叙事与游戏系统",
    token: "#6E451F",
    darkHex: "#DAB082",
    cases: "lamplight / grassland",
  },
] as const;

export function LabWorkbench({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const { resolvedTheme, setTheme } = useTheme();
  const osReducedMotion = useReducedMotion();

  const toggleTheme = () => {
    const isDomDark =
      typeof document !== "undefined" &&
      (document.documentElement.dataset.theme === "dark" ||
        document.documentElement.classList.contains("dark"));
    const isDark = resolvedTheme ? resolvedTheme === "dark" : isDomDark;
    setTheme(isDark ? "light" : "dark");
  };

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
      {/* Module 01: V4 Swiss Editorial Token & Contrast Inspector */}
      <section className="lab-module" aria-labelledby="lab-tokens-title">
        <div className="lab-module-head">
          <div>
            <div className="label">01 · {isZh ? "V4 设计语言检查器" : "V4 Design System Inspector"}</div>
            <h2 id="lab-tokens-title">
              {isZh ? "现代瑞士编辑 · 暖骨白与深炭工作台色板" : "Swiss Editorial · Warm Bone White & Charcoal Studio"}
            </h2>
            <p>
              {isZh
                ? "1px 建筑级分隔线与 12 列不对称编辑网格。旗舰案例在顶栏与交互焦点注册专属 --case-mood 低饱和氛围色带。"
                : "1px architectural hairlines on a 12-column asymmetric editorial grid. Flagship cases add a restrained AA-verified --case-mood ribbon."}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={toggleTheme}
          >
            {isZh ? (
              <>
                切换主题（当前：
                <span className="lab-only-light">亮色</span>
                <span className="lab-only-dark">暗色</span>
                ）
              </>
            ) : (
              <>
                Toggle theme (
                <span className="lab-only-light">light</span>
                <span className="lab-only-dark">dark</span>
                )
              </>
            )}
          </button>
        </div>

        <div className="lab-swatch-grid">
          {SWATCHES.map((s) => (
            <div className="lab-swatch" key={s.token}>
              <div className="lab-swatch-chip" style={{ background: `var(${s.token})` }} />
              <div className="lab-swatch-meta">
                <code>{s.token}</code>
                <span>
                  <span className="lab-only-light">{s.hexLight}</span>
                  <span className="lab-only-dark">{s.hexDark}</span>
                </span>
                <span>{s.ratio}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lab-type-row">
          <div className="lab-type-card">
            <div className="eyebrow">01 · Editorial Display (500 / 700)</div>
            <div className="lab-type-sample-title">
              {isZh ? "交互即规则" : "Rules you can feel"}
            </div>
            <span className="eyebrow">Space Grotesk + Noto Sans SC · 1.25 scale</span>
          </div>
          <div className="lab-type-card">
            <div className="eyebrow">02 · Bilingual Body & UI (400 / 600)</div>
            <div className="lab-type-sample-ui">
              {isZh ? "清晰胜过装饰，证据先于修辞。" : "Clarity over ornament, proof before prose."}
            </div>
            <span className="eyebrow">Inter + Noto Sans SC · high legibility</span>
          </div>
          <div className="lab-type-card">
            <div className="eyebrow">03 · Technical Index (400)</div>
            <div className="lab-type-sample-mono">2026-11-22 · AAA · #151412 / #F6F4EF</div>
            <span className="eyebrow">Geist Mono · tokens, specs, telemetry</span>
          </div>
        </div>

        <div className="lab-pill-row" aria-label={isZh ? "六大案例氛围色带" : "Listed case mood tokens"}>
          {CASE_MOOD_SWATCHES.map((m) => (
            <span
              key={m.labelEn}
              className="tag"
              data-case-mood={m.labelEn}
              style={
                {
                  "--case-mood-light": m.token,
                  "--case-mood-dark": m.darkHex,
                  borderColor: "var(--case-mood)",
                  color: "var(--case-mood)",
                } as CSSProperties
              }
            >
              {isZh ? m.labelZh : m.labelEn} ({m.cases})
            </span>
          ))}
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
                ? "全站统一采用轻量化 GSAP 曲线层，仅驱动 x / rotation / opacity 合成属性，并在 reduced-motion 下自动退化为 0ms 瞬时切换。"
                : "Powered by a single calibrated GSAP layer animating transform and opacity properties only, snapping instantly to settled states under reduced motion."}
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
