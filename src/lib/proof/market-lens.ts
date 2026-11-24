export type MarketLensId = "apac-closed-loop" | "anz-critique";

export interface MarketLensDeepLink {
  label: { en: string; zh: string };
  href: string;
  tag: string;
}

export interface MarketLensProfile {
  id: MarketLensId;
  badge: { en: string; zh: string };
  label: { en: string; zh: string };
  shortLabel: { en: string; zh: string };
  thesis: { en: string; zh: string };
  cadencePoints: readonly { en: string; zh: string }[];
  recommendedOrder: readonly string[];
  composerHref: string;
  deepLinks: readonly MarketLensDeepLink[];
}

const MARKET_LENS_PROFILES: readonly MarketLensProfile[] = [
  {
    id: "apac-closed-loop",
    badge: {
      en: "APAC · AI & Big-Tech Delivery",
      zh: "大中华 / 亚太 · AI 大厂业务闭环版",
    },
    label: {
      en: "APAC AI / Big-Tech Closed-Loop",
      zh: "APAC AI / 大厂业务闭环版",
    },
    shortLabel: {
      en: "APAC Closed-Loop",
      zh: "APAC 业务闭环版",
    },
    thesis: {
      en: "Frames each project along user pain points, explicit gating mechanisms, engineering loop closure (TypeScript / Electron / ESP32 / Playwright), and measurable trust ceilings.",
      zh: "严格按「用户痛点 → 交互机制 → 工程闭环 → 系统边界」叙事，突出高风险 AI 拒答护栏、双端代码交付效率与跨端一致性规范。",
    },
    cadencePoints: [
      {
        en: "Lead with concrete user drop-off or false-approval risk rather than abstract framing.",
        zh: "先交代真实业务卡点与误操作代价，避免泛泛谈概念。",
      },
      {
        en: "Pin interaction mechanisms to auditable code artifacts (FSM checks, confidence gates, and live web specs).",
        zh: "将每项交互规则落到可跑代码（五态矩阵、三层置信度、E2E 门禁）。",
      },
      {
        en: "Attach explicit verification scope so interviewers see real vs bench boundaries immediately.",
        zh: "主动拆清真机台架数据与待外部受试验证边界，减少评审沟通成本。",
      },
    ],
    recommendedOrder: ["walkie", "autofill", "lamplight", "onthebeat"],
    composerHref: "/resume/compose?market=apac-closed-loop",
    deepLinks: [
      {
        label: {
          en: "Inspect Protocol Replay Studio (/studio/replay)",
          zh: "查看硬件与协议帧重放台 (/studio/replay)",
        },
        href: "/studio/replay",
        tag: "Protocol",
      },
      {
        label: {
          en: "Review Early Autopsies in Archive Vault (/vault)",
          zh: "查阅早期停做复盘与演进档案馆 (/vault)",
        },
        href: "/vault",
        tag: "Lineage",
      },
    ],
  },
  {
    id: "anz-critique",
    badge: {
      en: "ANZ & Global · Design Engineering Critique",
      zh: "澳新 / 欧美 · 资深工程批判视角",
    },
    label: {
      en: "ANZ / Global Engineering Critique",
      zh: "ANZ / Global 工程批判版",
    },
    shortLabel: {
      en: "ANZ/Global Critique",
      zh: "ANZ/Global 工程批判版",
    },
    thesis: {
      en: "Leads with rejected shortcuts, physical & cognitive failure modes, WCAG 2.2 AA accessibility compliance, and empirical limits across firmware, host software, and browser portals.",
      zh: "前置被否决方案、人机注意力限制、WCAG 2.2 AA 无障碍硬门槛与实验边界说明，贴合澳新及全球 Design Engineering 评审语态。",
    },
    cadencePoints: [
      {
        en: "Surface every rejected shortcut first — especially voice-only approvals and blind LLM form guessing.",
        zh: "先剖析为什么拒绝「语音直批」「全字段自动代填」等看似炫酷的脆弱方案。",
      },
      {
        en: "Treat protocol invariants, dual-boot slot safety, and keyboard focus geometry as first-class UX concerns.",
        zh: "把协议时序不变量、双槽位防变砖回滚、键盘焦点不被遮挡纳入同等交互一等公民。",
      },
      {
        en: "Trace how 8 retired academic concepts directly informed the structural guardrails of 6 production builds.",
        zh: "通过 Archive Vault 追溯 8 个早期停做课题如何直接演进为 6 个主力系统的结构护栏。",
      },
    ],
    recommendedOrder: ["walkie", "maze", "lamplight", "grassland"],
    composerHref: "/resume/compose?market=anz-critique",
    deepLinks: [
      {
        label: {
          en: "Open Archive Vault & Autopsy Map (/vault)",
          zh: "浏览演进谱系与停做病理报告 (/vault)",
        },
        href: "/vault",
        tag: "Autopsy",
      },
      {
        label: {
          en: "Step Through Frame Replay Traces (/studio/replay)",
          zh: "逐毫秒步进物理与协议重放帧 (/studio/replay)",
        },
        href: "/studio/replay",
        tag: "Replay",
      },
    ],
  },
];

export function getMarketLensProfiles(): readonly MarketLensProfile[] {
  return MARKET_LENS_PROFILES;
}
