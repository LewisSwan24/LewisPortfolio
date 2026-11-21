"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Locale = "en" | "zh";
export type PrimitiveId =
  | "onthebeat"
  | "autofill"
  | "walkie"
  | "lamplight"
  | "drag"
  | "popover";

const PrimitiveWave = dynamic(
  () => import("./PrimitiveWave").then((m) => m.PrimitiveWave),
  { ssr: false }
);
const PrimitiveConfidence = dynamic(
  () => import("./PrimitiveConfidence").then((m) => m.PrimitiveConfidence),
  { ssr: false }
);
const PrimitiveWrist = dynamic(
  () => import("./PrimitiveWrist").then((m) => m.PrimitiveWrist),
  { ssr: false }
);
const PrimitiveRiskCard = dynamic(
  () => import("./PrimitiveRiskCard").then((m) => m.PrimitiveRiskCard),
  { ssr: false }
);
const PrimitiveDragSnap = dynamic(
  () => import("./PrimitiveDragSnap").then((m) => m.PrimitiveDragSnap),
  { ssr: false }
);
const PrimitiveAnchorFocus = dynamic(
  () => import("./PrimitiveAnchorFocus").then((m) => m.PrimitiveAnchorFocus),
  { ssr: false }
);

const TABS: ReadonlyArray<{
  id: PrimitiveId;
  num: string;
  label: { en: string; zh: string };
  caseRef: { en: string; zh: string };
}> = [
  {
    id: "onthebeat",
    num: "01",
    label: { en: "Zero-Identity Wave", zh: "匿名挥手配对" },
    caseRef: { en: "On The Beat", zh: "On The Beat" },
  },
  {
    id: "autofill",
    num: "02",
    label: { en: "Confidence Gate", zh: "置信度三档门控" },
    caseRef: { en: "Resume Autofill", zh: "Resume Autofill" },
  },
  {
    id: "walkie",
    num: "03",
    label: { en: "Wrist Approval", zh: "手腕实体审批流" },
    caseRef: { en: "Walkie", zh: "Walkie" },
  },
  {
    id: "lamplight",
    num: "04",
    label: { en: "Default-Safe Risk Card", zh: "默认安全风险卡" },
    caseRef: { en: "Lamplight Nook", zh: "Lamplight Nook" },
  },
  {
    id: "drag",
    num: "05",
    label: { en: "Tactile Drag & Snap", zh: "手势阻尼与吸附" },
    caseRef: { en: "Portfolio Home", zh: "Portfolio 首页" },
  },
  {
    id: "popover",
    num: "06",
    label: { en: "Focus & Anchor Popover", zh: "焦点路由与视口避让" },
    caseRef: { en: "Site Design System", zh: "全站设计系统" },
  },
];

function isPrimitiveId(value: string | null): value is PrimitiveId {
  return (
    value === "onthebeat" ||
    value === "autofill" ||
    value === "walkie" ||
    value === "lamplight" ||
    value === "drag" ||
    value === "popover"
  );
}

export function LabPrimitivesGallery({ locale }: { locale: Locale }) {
  const isZh = locale === "zh";
  const [activeId, setActiveId] = useState<PrimitiveId>("onthebeat");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("demo");
    if (isPrimitiveId(param)) {
      setActiveId(param);
    }
  }, []);

  return (
    <section className="lab-module" aria-labelledby="lab-sm-title">
      <div className="lab-module-head">
        <div>
          <div className="label">03 · {isZh ? "六大交互原语展厅" : "Interaction Primitives Gallery"}</div>
          <h2 id="lab-sm-title">
            {isZh ? "面向真实产品的六组核心交互原语" : "Six Core Interaction Primitives from Real Builds"}
          </h2>
          <p>
            {isZh
              ? "按标签按需加载不同交互原语工作台，涵盖匿名挥手、置信度门控、实体审批、默认安全卡、GSAP 拖拽阻尼与原生锚点浮层。"
              : "Switch tabs to lazy-load each primitive workbench: zero-identity pairing, confidence gating, wrist approvals, default-safe risk cards, GSAP drag physics, and anchored popovers."}
          </p>
        </div>
      </div>

      <div className="lab-sm-tabs" role="tablist" aria-label={isZh ? "选择交互原语" : "Select interaction primitive"}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeId === tab.id}
            className="lab-pill"
            onClick={() => setActiveId(tab.id)}
          >
            {tab.num} · {tab.label[locale]} ({tab.caseRef[locale]})
          </button>
        ))}
      </div>

      <div className="lab-prim-stage">
        {activeId === "onthebeat" && <PrimitiveWave locale={locale} />}
        {activeId === "autofill" && <PrimitiveConfidence locale={locale} />}
        {activeId === "walkie" && <PrimitiveWrist locale={locale} />}
        {activeId === "lamplight" && <PrimitiveRiskCard locale={locale} />}
        {activeId === "drag" && <PrimitiveDragSnap locale={locale} />}
        {activeId === "popover" && <PrimitiveAnchorFocus locale={locale} />}
      </div>
    </section>
  );
}
