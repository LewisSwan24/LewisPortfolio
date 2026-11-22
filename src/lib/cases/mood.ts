import type { CSSProperties } from "react";
import type { CurrentProjectSlug } from "@/lib/project-routes";

export interface CaseMoodPalette {
  category: "hardware" | "ai-trust" | "narrative";
  light: string;
  dark: string;
  labelEn: string;
  labelZh: string;
}

const HARDWARE_STEEL: CaseMoodPalette = {
  category: "hardware",
  light: "#2B4D6F",
  dark: "#92BAE0",
  labelEn: "Steel Blue · Hardware & Signal",
  labelZh: "冷钢蓝 · 硬件物理通道",
};

const HARDWARE_SIGNAL: CaseMoodPalette = {
  category: "hardware",
  light: "#A63F2A",
  dark: "#E69682",
  labelEn: "Signal Vermilion · Physical Control",
  labelZh: "信号朱砂 · 实体控制回路",
};

const AI_MOSS: CaseMoodPalette = {
  category: "ai-trust",
  light: "#2F5939",
  dark: "#8EC29A",
  labelEn: "Deep Moss · AI Safety & Consent",
  labelZh: "深苔绿 · AI 安全授权",
};

const AI_SLATE: CaseMoodPalette = {
  category: "ai-trust",
  light: "#3B4D70",
  dark: "#A3B6E0",
  labelEn: "Slate Indigo · Precision Gate",
  labelZh: "岩板靛 · 精确校验门控",
};

const NARRATIVE_UMBER: CaseMoodPalette = {
  category: "narrative",
  light: "#6E451F",
  dark: "#DAB082",
  labelEn: "Warm Umber · Play & Narrative",
  labelZh: "琥珀棕 · 叙事与游戏系统",
};

const NARRATIVE_OCHRE: CaseMoodPalette = {
  category: "narrative",
  light: "#933E29",
  dark: "#E29B84",
  labelEn: "Clay Ochre · Editorial Craft",
  labelZh: "陶土赭 · 体验与结构重构",
};

export const CASE_MOOD_MAP: Record<CurrentProjectSlug, CaseMoodPalette> = {
  walkie: HARDWARE_SIGNAL,
  maze: HARDWARE_STEEL,
  onthebeat: HARDWARE_STEEL,
  vigil: HARDWARE_STEEL,
  fencepost: AI_MOSS,
  autofill: AI_SLATE,
  pricewise: AI_SLATE,
  rules: AI_MOSS,
  lamplight: NARRATIVE_UMBER,
  connect: NARRATIVE_OCHRE,
  hoop: NARRATIVE_UMBER,
  grassland: NARRATIVE_UMBER,
  spectra: HARDWARE_STEEL,
  gapmapper: NARRATIVE_OCHRE,
};

export function getCaseMood(slug: CurrentProjectSlug): CaseMoodPalette {
  return CASE_MOOD_MAP[slug];
}

export function getCaseMoodStyle(slug: CurrentProjectSlug): CSSProperties {
  const mood = getCaseMood(slug);
  return {
    "--case-mood-light": mood.light,
    "--case-mood-dark": mood.dark,
  } as CSSProperties;
}
