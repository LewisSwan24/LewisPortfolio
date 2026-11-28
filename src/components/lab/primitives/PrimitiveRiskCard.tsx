"use client";

import { useRef, useState } from "react";

type Locale = "en" | "zh";

export function PrimitiveRiskCard({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const [antiResult, setAntiResult] = useState<string | null>(null);
  const [calmResult, setCalmResult] = useState<string | null>(null);
  const antiDefaultRef = useRef<HTMLButtonElement>(null);
  const calmDefaultRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="lab-prim-panel">
      <p className="lab-prim-summary">
        {isZh
          ? "对比「误导性亮色主按钮确认」与「默认焦点落在先不要的冷静确认卡」。分别点击各自的「聚焦默认按钮」，再按 Enter 键测试防误触效果。"
          : "Compare a misleading bright Confirm default against Lamplight's calm card. Focus each card's default button and press Enter to test accidental confirmation."}
      </p>

      <div className="lab-dual-view">
        <article className="lab-risk-compare lab-risk-compare--anti">
          <div className="eyebrow">{isZh ? "反例 · 亮色主按钮诱导" : "Anti-pattern · Misleading primary CTA"}</div>
          <strong>{isZh ? "覆盖现有 config.json？" : "Overwrite existing config.json?"}</strong>
          <div className="lab-sm-actions">
            <button
              ref={antiDefaultRef}
              type="button"
              className="btn btn-primary"
              onClick={() =>
                setAntiResult(
                  isZh
                    ? "发生误触：按 Enter 直接覆盖了生产配置。"
                    : "Accidental overwrite: pressing Enter wiped existing config."
                )
              }
            >
              {isZh ? "确认覆盖（默认焦点）" : "Overwrite now (Default)"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setAntiResult(isZh ? "手动点击了取消。" : "Manually clicked cancel.")}
            >
              {isZh ? "取消" : "Cancel"}
            </button>
          </div>
          <button
            type="button"
            className="lab-pill"
            onClick={() => antiDefaultRef.current?.focus()}
          >
            {isZh ? "聚焦默认按钮（试按 Enter）" : "Focus default button (try Enter)"}
          </button>
          {antiResult && <p className="lab-compare-outcome" role="status">{antiResult}</p>}
        </article>

        <article className="lab-risk-compare lab-risk-compare--calm">
          <div className="eyebrow">{isZh ? "Lamplight 规范 · 默认「先不要」" : "Lamplight pattern · Default 'Not now'"}</div>
          <strong>{isZh ? "覆盖现有 config.json？" : "Overwrite existing config.json?"}</strong>
          <div className="lab-sm-actions">
            <button
              ref={calmDefaultRef}
              type="button"
              className="btn btn-primary"
              onClick={() =>
                setCalmResult(
                  isZh
                    ? "安全暂停：按 Enter 触发「先不要」，已有进度完整保留。"
                    : "Paused safely: pressing Enter chose 'Not now' and preserved progress."
                )
              }
            >
              {isZh ? "先不要（默认焦点）" : "Not now (Default focus)"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() =>
                setCalmResult(isZh ? "明确二次选择后才执行。" : "Proceeded only after explicit choice.")
              }
            >
              {isZh ? "仍要继续" : "Proceed anyway"}
            </button>
          </div>
          <button
            type="button"
            className="lab-pill"
            onClick={() => calmDefaultRef.current?.focus()}
          >
            {isZh ? "聚焦默认按钮（试按 Enter）" : "Focus default button (try Enter)"}
          </button>
          {calmResult && <p className="lab-compare-outcome" role="status">{calmResult}</p>}
        </article>
      </div>
    </div>
  );
}
