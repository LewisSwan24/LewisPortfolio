"use client";

import { useState } from "react";
import { AnchorNote } from "@/components/ui/AnchorNote";

type Locale = "en" | "zh";
type EdgePos = "top" | "bottom";

export function PrimitiveAnchorFocus({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const [edge, setEdge] = useState<EdgePos>("bottom");

  return (
    <div className="lab-prim-panel">
      <p className="lab-prim-summary">
        {isZh
          ? "先切换触发按钮在容器里的位置（靠近顶边 / 靠近底边），再点击带虚线的术语。可以验证原生 Popover + CSS Anchor Positioning 的自动翻转，以及按 Esc 后的焦点归位。"
          : "Switch trigger edge placement and open the AnchorNote trigger to test native Popover + CSS Anchor Positioning flip-block fallback and Esc focus return."}
      </p>

      <div className="lab-pill-row" role="group" aria-label={isZh ? "测试位置" : "Test placement"}>
        <button
          type="button"
          className="lab-pill"
          aria-pressed={edge === "top"}
          onClick={() => setEdge("top")}
        >
          {isZh ? "靠近容器顶边（触发向下翻转）" : "Near top edge (triggers flip-block)"}
        </button>
        <button
          type="button"
          className="lab-pill"
          aria-pressed={edge === "bottom"}
          onClick={() => setEdge("bottom")}
        >
          {isZh ? "靠近容器底边（默认向上弹出）" : "Near bottom edge (default block-start)"}
        </button>
      </div>

      <div className="lab-anchor-sandbox" data-edge={edge}>
        <p>
          {isZh ? "示例句：点击术语 " : "Sample sentence: inspect "}
          <AnchorNote
            term={isZh ? "position-try-fallbacks" : "position-try-fallbacks"}
            label={isZh ? "原生锚点定位" : "CSS Anchor Positioning"}
            note={
              isZh
                ? "用原生 popoverTarget 建立隐式锚点关联。遇到屏幕边缘时会自动触发 flip-block 避让，按 Esc 后焦点回到触发按钮。"
                : "Uses native popoverTarget for implicit anchoring, flips via position-try-fallbacks: flip-block, and returns focus cleanly on Esc."
            }
          />
          {isZh ? " 观察浮层与箭头朝向。" : " to verify popover placement and focus return."}
        </p>
      </div>
    </div>
  );
}
