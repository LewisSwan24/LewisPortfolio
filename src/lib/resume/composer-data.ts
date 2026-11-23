import { LISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { getListedCases } from "@/lib/cases/registry";

export type ComposerRoleId = "ixd-ai" | "design-tech" | "product-ux";
export type ComposerSlug = (typeof LISTED_PROJECT_SLUGS)[number];

export interface ComposerLocaleText {
  en: string;
  zh: string;
}

export interface ResumeComposerPreset {
  id: ComposerRoleId;
  label: ComposerLocaleText;
  roleTitle: ComposerLocaleText;
  summary: ComposerLocaleText;
  defaultCaseSlugs: readonly ComposerSlug[];
  skills: {
    en: readonly string[];
    zh: readonly string[];
  };
}

export interface ResumeComposerCaseItem {
  slug: ComposerSlug;
  title: ComposerLocaleText;
  kicker: ComposerLocaleText;
  date: string;
  scope: ComposerLocaleText;
  impactBullet: ComposerLocaleText;
  tradeoffNote: ComposerLocaleText;
  ceilingNote: ComposerLocaleText;
  caseHref: string;
}

export const RESUME_COMPOSER_PRESETS: readonly ResumeComposerPreset[] = [
  {
    id: "ixd-ai",
    label: { en: "IxD × AI Systems", zh: "AI 交互与信任边界" },
    roleTitle: {
      en: "Interaction Designer · Human-AI Safety & Physical Computing",
      zh: "交互设计师 · 人机共驾边界与 AI 信任体系",
    },
    summary: {
      en: "Designs explicit refusal rules, asymmetric hardware confirmations, and bilingual evaluation boundaries that prevent habitual approval and hallucinated automation.",
      zh: "专注于高风险 AI 操作确权、不越权留白规则及物理交互护栏设计，避免盲按确认与 AI 幻觉代填。",
    },
    defaultCaseSlugs: ["walkie", "lamplight", "autofill", "onthebeat"],
    skills: {
      en: [
        "Human-AI Control & Default Refusal UX",
        "Asymmetric Physical Key Grammars (ESP32-S3)",
        "Confidence Tiering & Fail-Safe Error Splits",
        "Zero-Hallucination BM25 Grounding UX",
        "WCAG 2.1 AA Focus Governance",
      ],
      zh: [
        "Human-AI 确权边界与默认拒绝交互设计",
        "非对称物理按键语法（ESP32-S3 / BLE）",
        "三层置信度分流与显性故障归因诊断",
        "BM25 可溯源零幻觉问答架构",
        "WCAG 2.1 AA 焦点流与键盘无障碍规范",
      ],
    },
  },
  {
    id: "design-tech",
    label: { en: "Design Technologist", zh: "设计工程师" },
    roleTitle: {
      en: "Design Technologist · TypeScript, Next.js, Motion & Hardware Prototypes",
      zh: "设计工程师 · TypeScript / React / GSAP / 硬件原型工程化",
    },
    summary: {
      en: "Builds production-grade interactive prototypes and design-system infrastructure across Next.js 15, TypeScript, GSAP ScrollTrigger, Three.js, Electron, and ESP32/Arduino.",
      zh: "独立打通从设计规范到生产代码的完整工程链路：Next.js 15、GSAP、Three.js、Electron 及 ESP32/Arduino 物理原型。",
    },
    defaultCaseSlugs: ["walkie", "maze", "autofill", "grassland", "onthebeat"],
    skills: {
      en: [
        "Next.js 15 App Router · React 19 · Strict TypeScript",
        "Calibrated GSAP 3 Choreography & Three.js Lazy Specimens",
        "Finite State Machines (BFS Deadlock Verified)",
        "Playwright E2E, Axe-Core Audits & Bundle Budget CI",
        "ESP32-S3 / Web Serial / AES-256-GCM Prototypes",
      ],
      zh: [
        "Next.js 15 · React 19 · TypeScript 严格工程栈",
        "GSAP 3 减动效适配编排与 Three.js 懒加载标本",
        "BFS 零死锁有限状态机与时序防抖模型",
        "Playwright E2E、Axe 无障碍扫描与包体积 CI 门禁",
        "ESP32-S3 / Web Serial / AES-256-GCM 软硬原型",
      ],
    },
  },
  {
    id: "product-ux",
    label: { en: "Product & UX Designer", zh: "产品与体验设计师" },
    roleTitle: {
      en: "Product & UX Designer · Research Tradeoffs & Multi-State Architecture",
      zh: "产品与体验设计师 · 决策权衡架构与多状态流程",
    },
    summary: {
      en: "Turns ambiguous problem spaces into verifiable five-state journeys, auditable trade-off archives, and repeatable cross-screen command grammars.",
      zh: "擅长将高不确定性需求拆解为完整的五态边界矩阵、可追溯方案取舍档案与跨关卡/跨端统一语法。",
    },
    defaultCaseSlugs: ["lamplight", "autofill", "walkie", "grassland", "maze"],
    skills: {
      en: [
        "Five-State Journey Mapping (Normal / Empty / Offline / Error / Refusal)",
        "Nielsen 10 Heuristics & Structural Safeguard Audits",
        "Bilingual Design Systems (EN / ZH Parity)",
        "Honest Evidence Separation (Observed vs Bench vs Unverified)",
        "Tactile & Screen Reader Parity Audits",
      ],
      zh: [
        "五态全流程旅程建模（正常/空态/离线/报错/拒答）",
        "Nielsen 十大可用性原则与结构性护栏审计",
        "中英双语信息架构与排版等价系统",
        "实证层级严明划分（实测 / 台架 / 待验证假设）",
        "触控与屏幕阅读器一致体验走查",
      ],
    },
  },
];

function buildComposerCases(): readonly ResumeComposerCaseItem[] {
  const cases = getListedCases();
  return cases.map((record) => {
    const firstDecision = record.designDecisions?.[0];
    return {
      slug: record.slug as ComposerSlug,
      title: { en: record.card.en.title, zh: record.card.zh.title },
      kicker: { en: record.card.en.kicker, zh: record.card.zh.kicker },
      date: record.card.en.date,
      scope: { en: record.card.en.role, zh: record.card.zh.role },
      impactBullet: { en: record.workSummary.changed.en, zh: record.workSummary.changed.zh },
      tradeoffNote: {
        en: firstDecision
          ? `${firstDecision.decisionTitle.en}: ${firstDecision.chosenTradeoff.en}`
          : record.card.en.m1,
        zh: firstDecision
          ? `${firstDecision.decisionTitle.zh}：${firstDecision.chosenTradeoff.zh}`
          : record.card.zh.m1,
      },
      ceilingNote: {
        en: firstDecision?.residualCostOrRisk.en ?? record.card.en.m3,
        zh: firstDecision?.residualCostOrRisk.zh ?? record.card.zh.m3,
      },
      caseHref: `/projects/${record.slug}`,
    };
  });
}

export const RESUME_COMPOSER_CASES: readonly ResumeComposerCaseItem[] = buildComposerCases();
