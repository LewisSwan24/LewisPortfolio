export type ComposerMarketMode = "apac-closed-loop" | "anz-critique";

export interface ComposerLocaleText {
  en: string;
  zh: string;
}

export interface ComposerMarketSpec {
  id: ComposerMarketMode;
  label: ComposerLocaleText;
  shortLabel: ComposerLocaleText;
  summary: ComposerLocaleText;
}

export interface ComposerMarketEmphasis {
  headline: ComposerLocaleText;
  pitch: ComposerLocaleText;
  evidenceOrderNote: ComposerLocaleText;
}

export const RESUME_COMPOSER_MARKETS: readonly ComposerMarketSpec[] = [
  {
    id: "apac-closed-loop",
    label: {
      en: "APAC AI / Big-Tech Closed-Loop",
      zh: "APAC AI / 大厂业务闭环版",
    },
    shortLabel: {
      en: "APAC Closed-Loop",
      zh: "APAC 业务闭环",
    },
    summary: {
      en: "Structures every bullet along pain point -> control rule -> engineering delivery -> verification ceiling.",
      zh: "按「用户痛点 → 交互机制 → 工程闭环 → 系统边界」压缩表述，直击产品与研发联合评审焦点。",
    },
  },
  {
    id: "anz-critique",
    label: {
      en: "ANZ / Global Engineering Critique",
      zh: "ANZ / 欧美工程批判版",
    },
    shortLabel: {
      en: "ANZ/Global Critique",
      zh: "ANZ 工程批判",
    },
    summary: {
      en: "Highlights human trade-offs, rejected automation shortcuts, accessibility guarantees, and honest test limits.",
      zh: "前置人工干预护栏、被否决方案及 WCAG 2.2 AA 边界审计，贴合澳新及欧美资深工程师面试语境。",
    },
  },
];
