import { LISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { getListedCases } from "@/lib/cases/registry";
import {
  RESUME_COMPOSER_MARKETS,
  type ComposerLocaleText,
  type ComposerMarketEmphasis,
  type ComposerMarketMode,
  type ComposerMarketSpec,
} from "./composer-markets";

export {
  RESUME_COMPOSER_MARKETS,
  type ComposerLocaleText,
  type ComposerMarketEmphasis,
  type ComposerMarketMode,
  type ComposerMarketSpec,
};

export type ComposerRoleId = "ixd-ai" | "design-tech" | "product-ux";
export type ComposerSlug = (typeof LISTED_PROJECT_SLUGS)[number];

export interface ResumeComposerPreset {
  id: ComposerRoleId;
  label: ComposerLocaleText;
  roleTitle: ComposerLocaleText;
  summary: ComposerLocaleText;
  marketEmphasis: Record<ComposerMarketMode, ComposerMarketEmphasis>;
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
  date: ComposerLocaleText;
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
      en: "Interaction & Product Designer · Human-AI Safety & Physical Computing",
      zh: "交互与产品设计师 · 人机协同边界与 AI 信任设计",
    },
    summary: {
      en: "Designs explicit refusal rules, asymmetric hardware confirmations, and bilingual evaluation boundaries that prevent habitual approval and hallucinated automation.",
      zh: "专注于高风险 AI 操作确权、不越权留白规则及物理交互护栏设计，避免盲按确认与 AI 幻觉代填。",
    },
    marketEmphasis: {
      "apac-closed-loop": {
        headline: {
          en: "Interaction & Product Designer · Human-in-the-Loop Delivery",
          zh: "交互与产品设计师 · 面向生产可用与工程交付",
        },
        pitch: {
          en: "Cuts blind Enter approvals and ATS hallucinations by separating risky triggers into hardware keys and confidence tiers shipped end-to-end.",
          zh: "用户痛点是高危命令盲按放行与网申 AI 瞎填。用物理双键门控与三档置信度分流落到可测代码中，明显降低误执行风险。",
        },
        evidenceOrderNote: {
          en: "Lead order: Walkie (hardware AES-256-GCM) -> Resume Autofill (confidence tiers) -> Lamplight (Not now triage).",
          zh: "优先呈现：Walkie（端到端加密与实体防误触）→ Resume Autofill（三档确权）→ Lamplight（先不要挂起流）。",
        },
      },
      "anz-critique": {
        headline: {
          en: "Interaction & Product Designer · Human-AI Control Boundaries & Critical Trade-offs",
          zh: "交互与产品设计师 · 拒绝静默自动化与高风险默认回退",
        },
        pitch: {
          en: "Rejects ambient voice-only permissions and silent form guessing in favour of inspectable diffs, default refusal states, and explicit bench-vs-cohort caveats.",
          zh: "明确否决无手部隔离的纯语音放行与 100% 自动编造填充。坚持默认停在安全侧，并如实划清台架自测与外部用户验证界限。",
        },
        evidenceOrderNote: {
          en: "Lead order: Walkie rejected-alternatives -> Lamplight default-refusal -> 24-essay critique library.",
          zh: "优先呈现：Walkie 否决路径剖析 → Lamplight 默认拒答准则 → /vault 停做复盘与专文库。",
        },
      },
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
        "非对称物理按键语法（ESP32-S3 / ESP-NOW）",
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
      en: "Interaction & Product Designer · TypeScript, Next.js, Motion & Hardware Prototypes",
      zh: "交互与产品设计师 · TypeScript / React / GSAP / 硬件原型工程化",
    },
    summary: {
      en: "Builds production-grade interactive prototypes and design-system infrastructure across Next.js 15, TypeScript, GSAP ScrollTrigger, Three.js, Electron, and ESP32/Arduino.",
      zh: "独立串联从设计规范到生产代码的完整工程链路：Next.js 15、GSAP、Three.js、Electron 及 ESP32/Arduino 物理原型。",
    },
    marketEmphasis: {
      "apac-closed-loop": {
        headline: {
          en: "Interaction & Product Designer · Next.js 15, Motion & Hardware Telemetry",
          zh: "交互与产品设计师 · 设计系统组件化 + 软硬件全链路交付",
        },
        pitch: {
          en: "Compresses concept-to-production loop across React 19 UI primitives, BFS-verified FSMs, bundle budgets (<= 22 kB route JS), and ESP32-S3 Web Serial tooling.",
          zh: "从交互定义到生产上线零断层。兼具 AAA 视觉系统、BFS 死锁校验状态机与 22 kB 路由包预算约束，覆盖桌面端、扩展与嵌入式联调。",
        },
        evidenceOrderNote: {
          en: "Lead order: Walkie (protocol + bridge) -> MazeRunners (Arduino hardware bus) -> Protocol Replay Studio.",
          zh: "优先呈现：Walkie 端云协议 → MazeRunners 多传感并发总线 → /studio/replay 帧重放调试台。",
        },
      },
      "anz-critique": {
        headline: {
          en: "Interaction & Product Designer · Accessible Primitives, Protocol Timing & CI Gates",
          zh: "交互与产品设计师 · 原生无障碍原语、通信时序与严谨工程门禁",
        },
        pitch: {
          en: "Eliminates fragile UI state via explicit state machines, WCAG 2.2 AA target/focus enforcement, zero-mock replay telemetry, and deterministic Playwright/Vitest CI gates.",
          zh: "用状态机取代胶水逻辑，在 CI 强制守住 WCAG 2.2 AA 焦点与热区底线，并以真实固件协议日志替代虚假演示动画。",
        },
        evidenceOrderNote: {
          en: "Lead order: /studio/replay millisecond traces -> /lab FSM auditor -> Grassland rule consistency.",
          zh: "优先呈现：/studio/replay 毫秒抓包帧 → /lab 状态机验证器 → Grassland 跨关卡规则统一。",
        },
      },
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
      en: "Interaction & Product Designer · Research Tradeoffs & Multi-State Architecture",
      zh: "交互与产品设计师 · 决策权衡架构与多状态流程",
    },
    summary: {
      en: "Turns ambiguous problem spaces into verifiable five-state journeys, auditable trade-off archives, and repeatable cross-screen command grammars.",
      zh: "擅长将高不确定性需求拆解为完整的五态边界矩阵、可追溯方案取舍档案与跨关卡/跨端统一语法。",
    },
    marketEmphasis: {
      "apac-closed-loop": {
        headline: {
          en: "Interaction & Product Designer · Complex Workflow Architecture",
          zh: "交互与产品设计师 · 复杂多状态流转与双语体验规范",
        },
        pitch: {
          en: "Turns noisy agent logs and fragmented multi-portal flows into five-state UI specs, shared grammars across five missions, and dual-locale copy systems.",
          zh: "将杂乱的 Agent 运行日志与多后台流程整理为可读状态矩阵。建立跨模块复用语法与中英零翻译腔文案体系，减少研发返工。",
        },
        evidenceOrderNote: {
          en: "Lead order: Lamplight Nook (agent workspace) -> Resume Autofill (portal UX) -> Grassland (command grammar).",
          zh: "优先呈现：Lamplight Nook（Agent 工作区重构）→ Resume Autofill（表单边界）→ Grassland（命令语法）。",
        },
      },
      "anz-critique": {
        headline: {
          en: "Interaction & Product Designer · Evidence Hygiene, Five-State Specs & Critique",
          zh: "交互与产品设计师 · 实证规范、五态边界设计与现场调研",
        },
        pitch: {
          en: "Built on observed exhibition friction, privacy-preserving social handshakes (On The Beat), and transparent separation of validated outcomes from untested assumptions.",
          zh: "基于展览现场观察与公共空间社交隐私推演（On The Beat），坚持不拿自测或合成指标冒充外部受试定论。",
        },
        evidenceOrderNote: {
          en: "Lead order: On The Beat (privacy handshake) -> MazeRunners (exhibition study) -> /vault evolution lineage.",
          zh: "优先呈现：On The Beat（双重握手退避）→ MazeRunners（现场观察）→ /vault 演进谱系。",
        },
      },
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
        "Nielsen 十大可用性原则与结构性护栏检查",
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
      date: { en: record.card.en.date, zh: record.card.zh.date },
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
