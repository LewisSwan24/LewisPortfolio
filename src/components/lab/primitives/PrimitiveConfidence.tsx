"use client";

import { useState } from "react";

type Locale = "en" | "zh";

const SAMPLE_FIELDS = [
  { id: "name", label: { en: "Full Name", zh: "姓名" }, score: 0.98, value: "Lewis Dong" },
  {
    id: "degree",
    label: { en: "Degree Title", zh: "学位名称" },
    score: 0.88,
    value: "Master of Interaction Design",
  },
  {
    id: "visa",
    label: { en: "Work Rights Dropdown", zh: "签证与工作权限" },
    score: 0.66,
    value: "Ambiguous subclass",
  },
  {
    id: "salary",
    label: { en: "Expected Salary", zh: "期望薪资" },
    score: 0.28,
    value: "Sensitive / unstored",
  },
] as const;

export function PrimitiveConfidence({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const [threshold, setThreshold] = useState(0.8);

  const classify = (score: number): "fill" | "review" | "blank" => {
    if (score >= threshold) return "fill";
    if (score >= Math.max(0.45, threshold - 0.25)) return "review";
    return "blank";
  };

  const tierLabels = isZh
    ? { fill: "实线 · 自动直填", review: "虚线 · 待人工确认", blank: "粗实线 · 刻意留空" }
    : { fill: "Solid · Auto-fill", review: "Dashed · Review", blank: "Thick · Left blank" };

  return (
    <div className="lab-prim-panel">
      <p className="lab-prim-summary">
        {isZh
          ? "拖动置信度门控阈值滑块，实时观察字段如何在「直填 / 待人工确认 / 刻意留空」之间流转，绝不静默猜测。"
          : "Drag the confidence gate threshold to watch fields route cleanly across Auto-fill, Human review, and Intentional blank."}
      </p>

      <div className="lab-control-row">
        <label htmlFor="lab-conf-threshold">
          <span>{isZh ? "自动直填置信度阈值" : "Auto-fill confidence threshold"}</span>
          <span>{Math.round(threshold * 100)}%</span>
        </label>
        <input
          id="lab-conf-threshold"
          type="range"
          min={0.5}
          max={0.95}
          step={0.05}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </div>

      <div className="lab-conf-grid" aria-live="polite">
        {SAMPLE_FIELDS.map((field) => {
          const tier = classify(field.score);
          return (
            <div key={field.id} className="lab-conf-card" data-tier={tier}>
              <div className="lab-conf-head">
                <strong>{field.label[locale]}</strong>
                <span className="eyebrow">{Math.round(field.score * 100)}%</span>
              </div>
              <div className="lab-conf-val">{field.value}</div>
              <span className="lab-conf-badge" data-tier={tier}>
                {tierLabels[tier]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="lab-sm-rule">
        {isZh
          ? "交互规则：低于阈值绝不静默写入；最终 Submit 动作始终锁定为人工点击。"
          : "Design rule: Uncertainty never writes silently; final Submit stays strictly human-triggered."}
      </div>
    </div>
  );
}
