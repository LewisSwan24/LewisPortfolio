"use client";

import { useState } from "react";

type Locale = "en" | "zh";

const STEPS = [
  {
    id: "idle",
    name: { en: "Idle", zh: "待命" },
    aView: { en: "Phone dark · Band silent", zh: "手机息屏 · 手环静默" },
    bView: { en: "Sees nobody nearby", zh: "看不到你在附近" },
    rule: {
      en: "Design rule: Presence is opt-in per moment, never always-on broadcasting.",
      zh: "交互规则：在场状态按次主动开启，禁止常驻广播。",
    },
  },
  {
    id: "armed",
    name: { en: "Armed (SAY HI)", zh: "点亮 SAY HI" },
    aView: { en: "SAY HI lit · IMU wave armed", zh: "点亮 SAY HI · 开启挥手检测" },
    bView: { en: "Still zero identity leaked", zh: "仍未泄露任何身份信息" },
    rule: {
      en: "Design rule: Single gesture commits intent without browsing profiles.",
      zh: "交互规则：单次实体动作表达意愿，不引入刷资料卡片。",
    },
  },
  {
    id: "waved",
    name: { en: "Nearby Wave", zh: "收到匿名挥手" },
    aView: { en: "Wave pulse sent anonymously", zh: "挥手脉冲已匿名发出" },
    bView: { en: '"Someone nearby waved" (no name)', zh: "屏幕仅提示「附近有人挥手」（无名字）" },
    rule: {
      en: "Design rule: Unilateral interest never leaks identity.",
      zh: "交互规则：单方兴趣绝不泄露对方身份。",
    },
  },
  {
    id: "match",
    name: { en: "Mutual Nod", zh: "双向确认碰面" },
    aView: { en: "Meet Alex @ Stage Left", zh: "碰面点：舞台左侧 · 对方 Alex" },
    bView: { en: "Meet Lewis @ Stage Left", zh: "碰面点：舞台左侧 · 对方 Lewis" },
    rule: {
      en: "Design rule: Success means phones returning to pockets.",
      zh: "交互规则：交互成功的标准是手机重新放回口袋。",
    },
  },
] as const;

export function PrimitiveWave({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const [stepIdx, setStepIdx] = useState(0);
  const current = STEPS[stepIdx];

  return (
    <div className="lab-prim-panel">
      <p className="lab-prim-summary">
        {isZh
          ? "演出里的两位陌生人只有在双方都明确点头之后才互相看到名字与唯一碰面点，绝不提前暴露身份。"
          : "Two strangers at a gig only learn names and a meeting landmark after both opt in — never before."}
      </p>

      <div className="lab-sm-steps">
        {STEPS.map((step, i) => (
          <button
            key={step.id}
            type="button"
            className={`lab-sm-step${i === stepIdx ? " is-current" : ""}`}
            onClick={() => setStepIdx(i)}
          >
            <div className="lab-sm-step-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="lab-sm-step-name">{step.name[locale]}</div>
          </button>
        ))}
      </div>

      <div className="lab-dual-view" aria-live="polite">
        <div className="lab-dual-card">
          <span className="eyebrow">{isZh ? "玩家 A（发起者）" : "Stranger A (Sender)"}</span>
          <strong>{current.aView[locale]}</strong>
        </div>
        <div className="lab-dual-card">
          <span className="eyebrow">{isZh ? "玩家 B（附近同伴）" : "Stranger B (Nearby)"}</span>
          <strong>{current.bView[locale]}</strong>
        </div>
      </div>

      <div className="lab-sm-rule">{current.rule[locale]}</div>

      <div className="lab-sm-actions">
        <button
          type="button"
          className="btn btn-ghost"
          disabled={stepIdx === 0}
          onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
        >
          ← {isZh ? "上一步" : "Previous"}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStepIdx((i) => (i + 1) % STEPS.length)}
        >
          {stepIdx === STEPS.length - 1
            ? isZh
              ? "重新开始"
              : "Restart flow"
            : isZh
              ? "推进到下一状态 →"
              : "Advance state →"}
        </button>
      </div>
    </div>
  );
}
