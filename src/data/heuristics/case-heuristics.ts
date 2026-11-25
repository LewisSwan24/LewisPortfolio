import type { CaseVerifiedStatus } from "@/lib/cases/modules-schema";
import type { FsmProjectSlug } from "@/lib/fsm/schema";

export type HeuristicCode =
  | "H1 · Visibility of system status"
  | "H2 · Match between system and real world"
  | "H3 · User control and freedom"
  | "H4 · Consistency and standards"
  | "H5 · Error prevention"
  | "H6 · Recognition rather than recall"
  | "H7 · Flexibility and efficiency"
  | "H8 · Aesthetic and minimalist design"
  | "H9 · Recover from errors cleanly"
  | "H10 · Help and documentation";

export type HeuristicSeverity = "structural-guard" | "feedback" | "open-risk";

export interface CaseHeuristicEntry {
  id: string;
  slug: FsmProjectSlug;
  heuristic: HeuristicCode;
  wcagRef: string;
  severity: HeuristicSeverity;
  finding: { en: string; zh: string };
  verifiedStatus: CaseVerifiedStatus;
  proofHref: string;
}

export const CASE_HEURISTIC_AUDITS: readonly CaseHeuristicEntry[] = [
  // Walkie
  {
    id: "wk-h1",
    slug: "walkie",
    heuristic: "H1 · Visibility of system status",
    wcagRef: "WCAG 4.1.3 Status Messages",
    severity: "feedback",
    finding: {
      en: "Splits generic offline errors into 3 diagnostic cards (No Wi-Fi / Relay Unreachable / PC Bridge Offline) so users see exact failure layer.",
      zh: "将笼统离线拆分为「无 Wi-Fi / 中继不可达 / PC 休眠」三态清晰诊断卡片。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/projects/walkie#state-matrix",
  },
  {
    id: "wk-h5",
    slug: "walkie",
    heuristic: "H5 · Error prevention",
    wcagRef: "WCAG 3.3.4 Error Prevention",
    severity: "structural-guard",
    finding: {
      en: "Asymmetric Front Approve vs Side Deny keys + firmware/guard.py pre-flash check prevent irreversible tool exec or sibling app erase.",
      zh: "实体前键批准与侧键否决物理分隔，且 guard.py 硬件脚本阻止误擦除双系统分区。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/projects/walkie#rejection-archive",
  },
  {
    id: "wk-h3",
    slug: "walkie",
    heuristic: "H3 · User control and freedom",
    wcagRef: "WCAG 2.1.1 Keyboard / Switch",
    severity: "structural-guard",
    finding: {
      en: "Single Side-Key press cleanly aborts pending Claude tool invocation with zero bash execution.",
      zh: "侧键一键中止高危工具等待队列，零终端执行副作用。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/patterns?pattern=physical-key-commitment-gate",
  },
  {
    id: "wk-h10",
    slug: "walkie",
    heuristic: "H10 · Help and documentation",
    wcagRef: "WCAG 1.4.3 Contrast / Glanceability",
    severity: "open-risk",
    finding: {
      en: "Pending outside-desk wrist fatigue & multi-hour field battery study; only Lewis's desk & S3 hardware bench gates have been verified.",
      zh: "外部程序员长期佩戴的腕部疲劳度与跨工作日续航研究尚属空白。",
    },
    verifiedStatus: "unverified-hypothesis",
    proofHref: "/projects/walkie#outcome-limits",
  },

  // Lamplight
  {
    id: "ll-h5",
    slug: "lamplight",
    heuristic: "H5 · Error prevention",
    wcagRef: "WCAG 2.4.3 Focus Order",
    severity: "structural-guard",
    finding: {
      en: "Places initial modal focus strictly on safe 'Not now' action so habitual Enter presses safely dismiss risk alerts.",
      zh: "初始弹窗焦点锁定于安全退让键「先不要」，根治盲按回车造成的误批准。",
    },
    verifiedStatus: "synthetic-gate",
    proofHref: "/patterns?pattern=default-safe-focus-lock",
  },
  {
    id: "ll-h3",
    slug: "lamplight",
    heuristic: "H3 · User control and freedom",
    wcagRef: "WCAG 2.1.2 No Keyboard Trap",
    severity: "structural-guard",
    finding: {
      en: "Esc always dismisses and restores focus back to the exact origin card; Tab shifts deliberately to proceed.",
      zh: "Esc 必归还焦距至触发原点，Tab 需显式跨过安全锁才会到达放行动作。",
    },
    verifiedStatus: "synthetic-gate",
    proofHref: "/projects/lamplight#state-matrix",
  },
  {
    id: "ll-h8",
    slug: "lamplight",
    heuristic: "H8 · Aesthetic and minimalist design",
    wcagRef: "WCAG 1.4.1 Use of Color",
    severity: "feedback",
    finding: {
      en: "Swapped bright primary proceed highlights for low-arousal editorial contrast paired with explicit text severity.",
      zh: "移除高对比主色诱导，以文字与边框清晰呈现危险层级而非视觉情绪绑架。",
    },
    verifiedStatus: "observed",
    proofHref: "/projects/lamplight#rejection-archive",
  },
  {
    id: "ll-h9",
    slug: "lamplight",
    heuristic: "H9 · Recover from errors cleanly",
    wcagRef: "WCAG 3.3.1 Error Identification",
    severity: "open-risk",
    finding: {
      en: "Protocol drafted in Sep 2026 but external participant diary study did not execute; longitudinal desensitization curves unmeasured.",
      zh: "受试日记追踪方案已定稿但未对外部受众执行，长期弹窗免疫衰减曲线未收集。",
    },
    verifiedStatus: "unverified-hypothesis",
    proofHref: "/projects/lamplight#outcome-limits",
  },

  // Autofill
  {
    id: "af-h5",
    slug: "autofill",
    heuristic: "H5 · Error prevention",
    wcagRef: "WCAG 3.3.6 Error Prevention (All)",
    severity: "structural-guard",
    finding: {
      en: "Fields it cannot match or fill get a 3px red outline instead of a guess, and it never presses Submit.",
      zh: "认不出或填不上的栏位标 3px 红框，不去猜，也从不代按提交。",
    },
    verifiedStatus: "observed",
    proofHref: "/patterns?pattern=three-tier-confidence-blank-on-doubt",
  },
  {
    id: "af-h1",
    slug: "autofill",
    heuristic: "H1 · Visibility of system status",
    wcagRef: "WCAG 1.4.1 + 4.1.3",
    severity: "feedback",
    finding: {
      en: "Color + text confidence chips distinguish Deterministic Auto-fill, Ambiguous Review, and Blank Refusal.",
      zh: "以图形徽章叠加文字状态同时标注「自动填入 / 模糊待审 / 策略留白」。",
    },
    verifiedStatus: "observed",
    proofHref: "/projects/autofill#state-matrix",
  },
  {
    id: "af-h4",
    slug: "autofill",
    heuristic: "H4 · Consistency and standards",
    wcagRef: "WCAG 1.3.5 Identify Input Purpose",
    severity: "structural-guard",
    finding: {
      en: "Chrome Extension & Android WebView app enforce identical shared confidence thresholds without off-device PII upload.",
      zh: "Chrome 扩展与 Android 端共享完全同源的三轨阈值规则，隐私留存本地。",
    },
    verifiedStatus: "observed",
    proofHref: "/projects/autofill#rejection-archive",
  },
  {
    id: "af-h6",
    slug: "autofill",
    heuristic: "H6 · Recognition rather than recall",
    wcagRef: "WCAG 3.3.2 Labels or Instructions",
    severity: "open-risk",
    finding: {
      en: "Highly non-standard custom ATS web-component dropdowns outside standard Workday/Greenhouse markup remain brittle.",
      zh: "非标准 ATS 站点的自定义 Shadow-DOM 下拉器尚未实现 100% 映射稳定性。",
    },
    verifiedStatus: "unverified-hypothesis",
    proofHref: "/projects/autofill#outcome-limits",
  },

  // MazeRunners
  {
    id: "mz-h5",
    slug: "maze",
    heuristic: "H5 · Error prevention",
    wcagRef: "WCAG 2.2.2 + Physical Safety",
    severity: "structural-guard",
    finding: {
      en: "Replaced wrist electrical shock deterrent cleanly with vibration wristband feedback + isolated SafeTouchServo rail.",
      zh: "否决并移除高风险触电惩罚，改造为独立供电的安全舵机震动袖标提示。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/projects/maze#rejection-archive",
  },
  {
    id: "mz-h1",
    slug: "maze",
    heuristic: "H1 · Visibility of system status",
    wcagRef: "WCAG 4.1.3 Status Messages",
    severity: "feedback",
    finding: {
      en: "Three-sample IR debounce + 400 ms cooldown keeps one ball pass to one score event on the Web Serial HUD.",
      zh: "红外连续三次取样去抖，再加 400 ms 冷却，Web Serial 计分屏上一次过球只记一次。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/patterns?pattern=flat-state-debounce-zero-dead-end",
  },
  {
    id: "mz-h9",
    slug: "maze",
    heuristic: "H9 · Recover from errors cleanly",
    wcagRef: "WCAG 2.1.1 Keyboard / Fallback",
    severity: "structural-guard",
    finding: {
      en: "USB Web Serial disconnect triggers automatic standalone board buzzer/vibe fallback so exhibition co-play never freezes.",
      zh: "串口脱落自动降级板载独立蜂鸣器提示，保障现场展陈双人协作成局不卡死。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/projects/maze#state-matrix",
  },
  {
    id: "mz-h7",
    slug: "maze",
    heuristic: "H7 · Flexibility and efficiency",
    wcagRef: "WCAG 2.5.1 Pointer Gestures",
    severity: "open-risk",
    finding: {
      en: "Exhibited to 9 groups of four players. Table height for seated or wheelchair players was never measured.",
      zh: "展出时有 9 组、每组 4 人玩过。坐着或坐轮椅的玩家需要多高的桌面，从未测量。",
    },
    verifiedStatus: "unverified-hypothesis",
    proofHref: "/projects/maze#outcome-limits",
  },

  // On The Beat
  {
    id: "otb-h3",
    slug: "onthebeat",
    heuristic: "H3 · User control and freedom",
    wcagRef: "WCAG 3.2.1 On Focus",
    severity: "structural-guard",
    finding: {
      en: "Names and where to meet appear only after both people say yes; anyone who has not said yes stays private.",
      zh: "互相点亮须双端实体确认，单向路过始终处于匿名安全态。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/patterns?pattern=symmetric-mutual-consent-reveal",
  },
  {
    id: "otb-h8",
    slug: "onthebeat",
    heuristic: "H8 · Aesthetic and minimalist design",
    wcagRef: "WCAG 2.2.2 Pause / Stop / Hide",
    severity: "feedback",
    finding: {
      en: "LET'S FINISH ends a meeting kindly and turns off the card the two people met on.",
      zh: "LET'S FINISH 温和地结束碰面，并熄灭两人碰面用的那张卡。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/projects/onthebeat#state-matrix",
  },
  {
    id: "otb-h9",
    slug: "onthebeat",
    heuristic: "H9 · Recover from errors cleanly",
    wcagRef: "WCAG 3.3.1 Error Identification",
    severity: "structural-guard",
    finding: {
      en: "Fixed the Sep 25 localhost blocker by moving the relay to Fly.io; a band gone quiet hides nobody and is hidden from nobody.",
      zh: "9 月 25 日把中继迁到 Fly.io，解决了依赖本机的问题。没了信号的手环不会把谁藏起来，也不会被谁藏起来。",
    },
    verifiedStatus: "bench-tested",
    proofHref: "/projects/onthebeat#rejection-archive",
  },
  {
    id: "otb-h2",
    slug: "onthebeat",
    heuristic: "H2 · Match between system and real world",
    wcagRef: "WCAG 1.4.1 + Tactile cue",
    severity: "open-risk",
    finding: {
      en: "Prototype documents S3 dual-boot safety & 3-card pacing; uncontrolled outdoor street social study remains unconducted.",
      zh: "双启动与三阶卡片已完成工程实测，公开城市街区自然社交实验待开展。",
    },
    verifiedStatus: "unverified-hypothesis",
    proofHref: "/projects/onthebeat#outcome-limits",
  },

  // Grassland
  {
    id: "gr-h4",
    slug: "grassland",
    heuristic: "H4 · Consistency and standards",
    wcagRef: "WCAG 3.2.4 Consistent Identification",
    severity: "structural-guard",
    finding: {
      en: "Zero mission-only command buttons: select, reposition, stance tradeoff & objective verbs work identically across Missions 01-05.",
      zh: "5 关全程共用同一套框选/变阵/目标指令契约，零关卡专用特例按键。",
    },
    verifiedStatus: "synthetic-gate",
    proofHref: "/patterns?pattern=immutable-cross-stage-grammar",
  },
  {
    id: "gr-h1",
    slug: "grassland",
    heuristic: "H1 · Visibility of system status",
    wcagRef: "WCAG 1.4.11 Non-text Contrast",
    severity: "feedback",
    finding: {
      en: "Weather & ridge penalties preview live on hover before player commits troop movement vector.",
      zh: "泥泞衰减与山脊增益在鼠标悬停预览线阶段实时显现。",
    },
    verifiedStatus: "synthetic-gate",
    proofHref: "/projects/grassland#state-matrix",
  },
  {
    id: "gr-h9",
    slug: "grassland",
    heuristic: "H9 · Recover from errors cleanly",
    wcagRef: "WCAG 3.3.3 Error Suggestion",
    severity: "structural-guard",
    finding: {
      en: "Impassable cliff clicks reject command without dropping active formation selection or jumping camera focus.",
      zh: "误触不可通行地形仅明确拒止当前位移指令，完整保留原有战团选中与视角。",
    },
    verifiedStatus: "synthetic-gate",
    proofHref: "/projects/grassland#rejection-archive",
  },
  {
    id: "gr-h7",
    slug: "grassland",
    heuristic: "H7 · Flexibility and efficiency",
    wcagRef: "WCAG 2.1.4 Character Key Shortcuts",
    severity: "open-risk",
    finding: {
      en: "430+ local parser/rule tests pass cleanly; external player blind playtest across all 5 missions remains uncollected.",
      zh: "已通过 430+ 项自动化数值与脚本测试，外部玩家全 5 关盲测遥测尚待采集。",
    },
    verifiedStatus: "unverified-hypothesis",
    proofHref: "/projects/grassland#outcome-limits",
  },
];
