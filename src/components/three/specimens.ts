import type { SpecimenNodeSpec } from "./types";

export const SPECIMEN_NODES: readonly SpecimenNodeSpec[] = [
  {
    slug: "walkie",
    title: "Walkie",
    axisCoords: [0.75, 0.9, 0.9],
    svgPos: [495, 95],
    colorLight: "#A63F2A",
    colorDark: "#E69682",
    mediumTag: { en: "Hardware × AI Control", zh: "硬件 × AI 控制" },
    thesisQuestion: {
      en: "Where does human consent live when hands leave the keyboard?",
      zh: "离开键盘后，人的最终确认权应当落在哪里？",
    },
    decisionSummary: {
      en: "Front & Side physical watch keys own tool approvals; voice never auto-runs destructive bash commands.",
      zh: "前后实体手表键守住工具审批闸门；语音只录上下文，绝不自动放行高危命令。",
    },
    honestScope: {
      en: "Three hardware/relay gates pass on S3; represented here via schematics and live simulation pending real wearer photography.",
      zh: "真机与加密中继三道门禁已通过；目前以系统架构图与手腕交互模拟呈现，暂未录入外部开发者试戴实拍。",
    },
  },
  {
    slug: "lamplight",
    title: "Lamplight Nook",
    axisCoords: [-0.4, 0.75, -0.75],
    svgPos: [195, 115],
    colorLight: "#6E451F",
    colorDark: "#DAB082",
    mediumTag: { en: "AI Agency × Desktop", zh: "AI 协同 × 桌面状态" },
    thesisQuestion: {
      en: "How do you keep a background agent legible without inviting blind Enter-key fatigue?",
      zh: "后台代理跑几十分钟时，如何既消除黑盒焦虑又不诱导习惯性误放行？",
    },
    decisionSummary: {
      en: "Spatialize the plan onto a calm café blackboard and lock risky modals onto 'Not now' by default.",
      zh: "把计划按结构摆在咖啡馆黑板上，高风险弹窗默认把焦点锁在「先不要」。",
    },
    honestScope: {
      en: "Used daily by Lewis on Electron + Phaser; external user testing not yet run.",
      zh: "作者日常在用这套 Electron + Phaser 版本，尚未做外部用户可用性测试。",
    },
  },
  {
    slug: "autofill",
    title: "Resume Autofill",
    axisCoords: [-0.7, 0.95, -0.85],
    svgPos: [140, 82],
    colorLight: "#3B4D70",
    colorDark: "#A3B6E0",
    mediumTag: { en: "Refusal Boundary × Local AI", zh: "拒答边界 × 本地填表" },
    thesisQuestion: {
      en: "When is leaving a form field blank safer than guessing a plausible answer?",
      zh: "面对签证或开放题时，什么时候「刻意留白」比「猜一个像样的答案」更负责？",
    },
    decisionSummary: {
      en: "Refuse to autofill below deterministic confidence, keep all resume data local, and block auto-submit.",
      zh: "低于确定性阈值直接停填，全部简历文本不出本地设备，且禁止自动提交。",
    },
    honestScope: {
      en: "Tested on 3 synthetic sites (native HTML, Ant Design, Element Plus); real ATS field variance still unmeasured.",
      zh: "在 3 个合成测试站点上测过（原生 HTML、Ant Design、Element Plus）；真实招聘网站的字段准确率尚未实测。",
    },
  },
  {
    slug: "maze",
    title: "MazeRunners",
    axisCoords: [0.8, 0.35, 0.95],
    svgPos: [505, 215],
    colorLight: "#2B4D6F",
    colorDark: "#92BAE0",
    mediumTag: { en: "Tactile Co-Play × Physical", zh: "双人互锁 × 实体协作" },
    thesisQuestion: {
      en: "How can shared hardware mechanics break solo isolation in a public room?",
      zh: "实体装置怎样靠规则结构（不靠口头倡议）促成陌生人抬头配合？",
    },
    decisionSummary: {
      en: "Paired conductive wristbands interlock two players per axis, swapping shock threats for gentle sleeve vibration.",
      zh: "共色导电指套把每个方向绑在两名玩家手里，并用柔和振动袖套替代原本吓人的电击惩罚。",
    },
    honestScope: {
      en: "9 groups (36 players) tested publicly (~3 finished); paper leaderboard was not archived.",
      zh: "公开展出共 9 组 36 人实测（约 3 组通关）；纸质积分榜当时未留存。",
    },
  },
  {
    slug: "onthebeat",
    title: "On The Beat",
    axisCoords: [0.9, 0.55, 0.8],
    svgPos: [445, 172],
    colorLight: "#2B4D6F",
    colorDark: "#92BAE0",
    mediumTag: { en: "Social Friction × ESP-NOW", zh: "社交退让 × 临近破冰" },
    thesisQuestion: {
      en: "When should an interactive social wearable step out of the way?",
      zh: "现场社交工具什么时候应当帮人开口，又在什么时候立刻静默退场？",
    },
    decisionSummary: {
      en: "Three non-intrusive wave cards reveal names only after mutual nod, then withdraw into silence.",
      zh: "仅三张渐进破冰卡，双方都点头同意才公开姓名与碰面点，随后硬件主动静默退场。",
    },
    honestScope: {
      en: "Teammate-led 3-card concept; firmware dual-boot & relay verified; live gig wearer study pending.",
      zh: "组员主导三卡片原型构想；双启动与云中继已验证；真实演出现场穿戴体验待测。",
    },
  },
  {
    slug: "grassland",
    title: "Grassland Iron Tide",
    axisCoords: [-0.25, -0.35, -0.5],
    svgPos: [265, 252],
    colorLight: "#6E451F",
    colorDark: "#DAB082",
    mediumTag: { en: "Rules Grammar × Dual UI", zh: "统一规则语法 × 双界面" },
    thesisQuestion: {
      en: "How do five strategy chapters escalate without betraying player muscle memory?",
      zh: "多章节难度递进时，如何避免临时补丁破坏玩家已建立的操作直觉？",
    },
    decisionSummary: {
      en: "Enforce one shared command grammar and deterministic checkpoint rollback across all 5 missions.",
      zh: "五个关卡全程锁定同一套框选/指令/回滚语法，且拒绝自动托管，保住战术判断感。",
    },
    honestScope: {
      en: "430 local engine/contract assertions passing; structured outside player usability tests next.",
      zh: "430 项本地单测已通过；下一步安排外部玩家做结构化可用性走查。",
    },
  },
];
