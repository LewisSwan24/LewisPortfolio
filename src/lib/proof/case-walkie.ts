/**
 * Walkie, added 2026-11-21 from public repository LewisSwan24/walkie.
 * All claims verified against README.md, protocol/frames.md, firmware/, bridge/, relay/, tools/.
 * Must not claim: external user studies, shipped consumer product, or wrist photographs (none committed).
 */
import type {
  CaseDepth,
  CaseInterviewPack,
  CaseInterviewPrompt,
  CaseInterviewScan,
  CaseSummary,
  ProofLocale,
} from "./types";

export const walkieSummary: Record<ProofLocale, { walkie: CaseSummary }> = {
  en: {
    walkie: {
      challenge:
        "A wrist voice remote for Claude Code only earns trust when physical buttons control approvals, cloud relays carry only ciphertext, and flashing updates won't erase the sibling wristband app.",
      role: "Solo: physical-digital interaction model, tactile approval boundaries, hardware prototyping, and AI-assisted build acceptance",
      methods: ["physical button approval UX", "tactile pairing flow", "dual-boot flash protection", "hardware-in-the-loop verification", "voice intent routing"],
      evidence: [
        "M5StickS3 firmware running safely alongside On The Beat on dual boot slots protected by a flash guard",
        "USB-first connection with automatic fallback to an encrypted Fly.io WebSocket relay so remote relays never read plaintext prompts",
        "on-device hardware verification scripts checking screen pagination, physical button presses, encryption, and wireless reconnects",
      ],
      outcome:
        "A working wrist voice remote for multi-project Claude Code sessions, keeping deliberate physical key presses as the gate for every sensitive agent action.",
      next: "Photograph the watch in everyday desk-side use, check standby battery pacing, and run away-from-desk sessions with fellow developers.",
    },
  },
  zh: {
    walkie: {
      challenge:
        "离开工位时，AI 编码助手常常刚好卡在权限确认或一句短暂追问上。想用手表做语音遥控，前提是实体按键必须握住最终审批权，云端中继看不见对话正文。更新固件时，也不能误删同一支表里原本装着的项目。",
      role: "独立完成：软硬件交互模型、实体确认边界、硬件实测与 AI 辅助编码验收",
      methods: ["实体按键审批交互", "物理配对确认流", "双系统防误擦机制", "真机屏幕状态走查", "语音意图路由"],
      evidence: [
        "M5StickS3 双分区运行方案：与 On The Beat 同机共存，通过自定义刷机护栏隔离分区",
        "USB 有线优先、离桌自动切换端到端加密 Fly.io 中继，确保服务器只转发密文",
        "硬件在环检查覆盖小屏分页反馈、实体按压配对、加密封包与断线重连",
      ],
      outcome: "做出了一套真正跑通的多项目 Claude Code 手腕语音遥控交互。看一眼小屏，按一下实体键，就能稳妥放行或拒绝高风险操作。",
      next: "补拍真实佩戴在手腕上的操作画面，实测离桌待机续航，并邀请几位常驻终端的开发者试戴体验。",
    },
  },
};

export const walkieDepth: Record<ProofLocale, { walkie: CaseDepth }> = {
  en: {
    walkie: {
      decisions: [
        {
          label: "Physical approval authority",
          choice: "Require a physical front-key press on the S3 to pair and to approve Claude Code tool calls.",
          evidence: "README & protocol/frames.md: pair.key is only written after front-key confirmation; approvals queue to the wrist.",
          tradeoff: "Slightly slower than voice-only 'yes', but prevents background noise or an untrusted host from approving actions.",
          impact: "Physical confirmation stays the single authority for both pairing and agent permissions.",
        },
        {
          label: "USB priority & honest offline states",
          choice: "Let USB always preempt Wi-Fi relay and expose distinct offline states on the watch screen.",
          evidence: "Bridge checks USB every 3 s while on relay; OFFLINE distinguishes no-wifi, relay-down, and pc-offline.",
          tradeoff: "Switching transports mid-turn abandons the in-flight turn rather than attempting fragile seamless handoff.",
          impact: "Predictable recovery and clear failure diagnosis on a tiny wrist screen.",
        },
        {
          label: "Dual-boot flash guard",
          choice: "Keep Walkie in app1 alongside On The Beat in app0, and block -t erase / -t uploadfs in firmware/guard.py.",
          evidence: "README & tools/boot.mjs: both keys held 3 s switch apps; pio upload is routed through tools/flash.mjs.",
          tradeoff: "Custom flashing tooling instead of stock PlatformIO commands.",
          impact: "Prevents accidentally wiping the sibling wristband app during firmware iterations.",
        },
      ],
      evidence: [
        {
          method: "Host C++ & bridge unit tests",
          sample: "npm test across firmware/lib/{proto,ui} (g++), bridge/, and tools/ with fake-claude.js",
          question: "Can protocol and UI regressions be caught without flashing hardware?",
          finding: "Separating portable framing and UI state machines from hardware drivers makes protocol regressions catchable without a board.",
          implication: "Kept hardware-only code isolated in firmware/src/.",
        },
        {
          method: "On-device automated gates (gate-h, gate-p5, gate-l)",
          sample: "11 screen/key scenes + on-chip HKDF/AES-GCM vectors + 75 s Fly.io relay keep-alive",
          question: "Do screens, keys, encryption, and relay keep-alive hold on the real S3?",
          finding: "TEST hooks allow repeatable screen, key, and encryption verification without manual tapping or paid API calls.",
          implication: "Locked hardware and crypto regressions behind deterministic CLI scripts.",
        },
        {
          method: "Certificate chain & key isolation check",
          sample: "tools/check-relay-roots.mjs + %APPDATA%\\walkie\\keys.env outside repository",
          question: "Does the S3 verify relay TLS without leaking API keys?",
          finding: "ISRG Root X1/X2 pinning validates the Fly.io relay certificate; bridge refuses unknown CLI flags before loading keys.",
          implication: "Transport security and secret hygiene are checked mechanically.",
        },
      ],
      iterations: [
        {
          version: "Stage 1 — USB link, speech & Claude session manager",
          change: "Built wire frames, OpenAI/Gemini speech fallback, and per-project Claude process manager.",
          reason: "Prove the voice-to-Claude turn end-to-end before adding wireless networking.",
          improvement: "Reliable local wrist-to-Claude turn over USB with physical approval buttons.",
        },
        {
          version: "Stage 3 — Sealed frames & Fly.io relay (Plans 5–6)",
          change: "Added HKDF/AES-256-GCM sealing, 4-bit ADPCM codec, ISRG root pinning, and end-to-end encrypted wss:// relay.",
          reason: "Allow stepping away from the USB cable without exposing prompts or approvals to the relay.",
          improvement: "Seamless dual-transport fallback while preserving end-to-end confidentiality.",
        },
      ],
      limits: [
        {
          constraint: "Single developer (Lewis) has used it; no external user study has been run.",
          whyItMatters: "Tiny-screen paging and voice-approval ergonomics are untested with other engineers.",
          nextValidation: "Have 2–3 Claude Code users test an approval-heavy session away from their desk.",
        },
        {
          constraint: "No wrist photographs or live video clips are committed in the repository yet.",
          whyItMatters: "Readers see the architecture schematic rather than physical form-factor photos.",
          nextValidation: "Capture real M5StickS3 photos and short approval-flow clip on device.",
        },
        {
          constraint: "AI coding tools assisted implementation across firmware and bridge.",
          whyItMatters: "The portfolio claim is interaction design, security boundaries, and verification gates, not solo hand-typed C++.",
          nextValidation: "Keep role attribution explicit wherever Walkie is presented.",
        },
      ],
      takeaway:
        "Controlling an autonomous coding agent from a wrist watch reduces AI UX to its essentials: physical confirmation for risky actions, end-to-end encrypted transport, and honest offline states.",
    },
  },
  zh: {
    walkie: {
      decisions: [
        {
          label: "实体按键唯一授权",
          choice: "配对与 Claude Code 工具权限审批均强制走 S3 实体前键确认。",
          evidence: "README 与 protocol/frames.md：必须按前键确认才会落盘 pair.key，工具权限统一排队推送至手腕。",
          tradeoff: "比纯口头说「好」略慢半拍，但彻底杜绝环境噪音或未授权主机误放行。",
          impact: "实体按键成为配对与 Agent 权限的唯一最终授权源。",
        },
        {
          label: "USB 优先与诚实离线状态",
          choice: "插线时 USB 永远抢占中继，并在手表屏幕明确区分三种离线原因。",
          evidence: "中继态每 3 秒检测 USB；OFFLINE 屏幕分别提示连不上 Wi-Fi、连不上中继、电脑没在线。",
          tradeoff: "切换通道会放弃进行中的单轮对话，而不追求脆弱的无缝迁移。",
          impact: "小屏下故障归因清晰，恢复行为完全可预测。",
        },
        {
          label: "双启动防误擦保护",
          choice: "Walkie 驻留 app1 与 app0 的 On The Beat 共存，并用 firmware/guard.py 禁止 -t erase / -t uploadfs。",
          evidence: "README 与 tools/boot.mjs：双键长按 3 秒切换应用；刷写统一走 tools/flash.mjs。",
          tradeoff: "需要维护自定义刷机脚本，不能直接裸跑默认 pio 命令。",
          impact: "避免固件迭代时误擦除同手表上的另一个完整项目。",
        },
      ],
      evidence: [
        {
          method: "宿主机 C++ 与桥接单元测试",
          sample: "npm test 覆盖 firmware/lib/{proto,ui}（g++）、bridge/ 与 tools/（使用 fake-claude.js）",
          question: "不刷真机时能否先拦截协议与状态机回归？",
          finding: "把协议与 UI 状态机从硬件驱动剥离后，不插板子即可捕获协议与状态回归。",
          implication: "仅把强硬件依赖代码留在 firmware/src/。",
        },
        {
          method: "真机自动化门禁（gate-h / gate-p5 / gate-l）",
          sample: "11 个屏幕按键场景 + 片上 HKDF/AES-GCM 向量 + 75 秒 Fly.io 中继保活",
          question: "屏幕、按键、加密与云中继保活在真机上是否可复现？",
          finding: "TEST 帧钩子让屏幕、按键与加密校验无需手动点按或消耗付费 API 即可复现。",
          implication: "把硬件与加密回归锁进确定性 CLI 验收脚本。",
        },
        {
          method: "证书链与密钥隔离检查",
          sample: "tools/check-relay-roots.mjs 与仓库外 %APPDATA%\\walkie\\keys.env",
          question: "S3 端如何校验证书且避免日志泄露密钥？",
          finding: "锁定 ISRG Root X1/X2 校验 Fly.io 中继证书；桥接解析到非法参数时，会在加载密钥前退出。",
          implication: "传输安全与密钥管理均由脚本强制把关。",
        },
      ],
      iterations: [
        {
          version: "阶段一：USB 链路、语音与 Claude 会话管理",
          change: "实现线协议、OpenAI/Gemini 语音兜底与多项目 Claude 进程管理器。",
          reason: "先在有线环境跑通语音到 Agent 的完整链路，再引入无线中继。",
          improvement: "跑通 USB 下的手腕语音对话与实体按键审批。",
        },
        {
          version: "阶段三：加密封包与 Fly.io 离缆中继（计划 5–6）",
          change: "加入 HKDF/AES-256-GCM 加密、4-bit ADPCM、ISRG 根证书锁定与端到端加密 wss:// 中继。",
          reason: "离开数据线后仍可遥控，同时不向中继暴露任何明文指令或审批。",
          improvement: "实现双通道自动回退与端到端机密性。",
        },
      ],
      limits: [
        {
          constraint: "仅由 Lewis 本人使用，尚未开展外部用户测试。",
          whyItMatters: "微屏分页阅读与语音审批在他人手中的可用性尚未验证。",
          nextValidation: "邀请 2–3 位 Claude Code 用户在离桌场景下完成一轮审批任务。",
        },
        {
          constraint: "仓库尚未归档手腕屏幕实拍照片或运行录像。",
          whyItMatters: "读者目前看到的是源码架构图，没有实体外观照片。",
          nextValidation: "补充 M5StickS3 真机照片与审批交互短录像。",
        },
        {
          constraint: "固件与桥接代码由 AI 编码工具辅助实现。",
          whyItMatters: "本案例主张的是交互规则、安全边界与验收门禁，纯手写 C++ 不在主张之内。",
          nextValidation: "在所有展示场景保持清晰的分工说明。",
        },
      ],
      takeaway:
        "在手腕上指挥自主编码 Agent，会把 AI 交互压缩到最核心的骨架。高风险动作归实体按键，云端传输端到端加密，离线状态说实话。",
    },
  },
};

export const walkieScan: Record<ProofLocale, { walkie: CaseInterviewScan }> = {
  en: {
    walkie: {
      proves: "Shows I can design physical-digital AI agent controls with explicit security boundaries and reproducible hardware verification gates.",
      inspect: ["Why physical buttons own pairing and tool approvals.", "How USB and end-to-end encrypted Fly.io relay hand off.", "What the three automated hardware/protocol gates actually check."],
      questions: ["Why not let voice alone approve tool calls?", "How did you verify hardware screens without manual tapping?"],
      bestFit: ["Design Engineering and Creative Technology teams.", "Teams building human-in-the-loop controls for autonomous AI agents."],
    },
  },
  zh: {
    walkie: {
      proves: "说明我能为软硬结合的 AI Agent 设计清晰的安全边界与可复现的真机门禁。",
      inspect: ["为何配对与工具审批必须由实体按键确认。", "USB 与端到端加密 Fly.io 中继如何切换与报错。", "三组硬件与协议门禁分别验证了什么。"],
      questions: ["为什么不直接靠语音说同意来放行工具调用？", "没有人工一直点手表时，怎么验收固件屏幕？"],
      bestFit: ["Design Engineering 与创意技术团队。", "打造自主 AI Agent 人在回路控制界面的团队。"],
    },
  },
};

export const walkiePrompts: { walkie: CaseInterviewPrompt[] } = {
  walkie: [
    {
      question: "Why require physical wrist button presses for Claude Code approvals?",
      reason: "Tests how interaction design enforces safety under voice ambiguity.",
      anchorId: "decision-timeline",
    },
    {
      question: "How does the Fly.io relay avoid reading your prompts?",
      reason: "Probes end-to-end encryption and transport fallback trade-offs.",
      anchorId: "evidence-board",
    },
    {
      question: "What has not been verified on Walkie yet?",
      reason: "Checks honesty about single-user scope and missing wrist photos.",
      anchorId: "outcome-limits",
    },
  ],
};

export const walkiePack: Record<ProofLocale, { walkie: CaseInterviewPack }> = {
  en: {
    walkie: {
      answers: [
        {
          id: "walkie-approval",
          question: "Why require a physical button press for approvals instead of voice?",
          answer:
            "Voice recognition can mishear background speech as 'yes'. Routing Claude Code's permission queue to the S3 front key (approve) and side key (deny, with optional spoken reason) keeps high-impact actions tied to deliberate physical intent.",
          evidenceHref: "/projects/walkie#decision-timeline",
          boundary: "Ergonomics of denying with a spoken reason have only been tested by Lewis.",
        },
        {
          id: "walkie-relay",
          question: "How does the watch work away from the USB cable safely?",
          answer:
            "Every frame after pairing is encrypted with AES-256-GCM using an HKDF session key from pair.key, and the S3 pins ISRG Root X1/X2 certificates. The Fly.io relay only forwards ciphertext between rooms and drops frames if a peer is absent.",
          evidenceHref: "/projects/walkie#evidence-board",
          boundary: "Verified by gate-p5 and gate-l scripts; no external security audit.",
        },
        {
          id: "walkie-dualboot",
          question: "How do Walkie and On The Beat share one M5StickS3 without clobbering each other?",
          answer:
            "On The Beat lives in app0 and Walkie lives in app1. firmware/guard.py blocks erase and uploadfs targets, tools/flash.mjs writes only app1, and holding both watch keys for 3 seconds boots cleanly into the sibling app.",
          evidenceHref: "/projects/walkie#decision-timeline",
          boundary: "Requires using the repo's flash/boot scripts rather than raw PlatformIO erase commands.",
        },
      ],
      managerFollowUp: {
        id: "walkie-manager-follow-up",
        question: "Why build a hardware remote instead of a phone app?",
        answer:
          "Because pulling out a phone pulls you into notifications. The M5StickS3 already lived on my wrist for On The Beat, so putting Walkie in app1 turns a 2-second approval into one glance and one button press.",
        evidenceHref: "/projects/walkie#outcome-limits",
        boundary: "Personal workflow hypothesis; not validated with a wider cohort.",
      },
    },
  },
  zh: {
    walkie: {
      answers: [
        {
          id: "walkie-approval",
          question: "为什么工具审批必须按实体键，而不是直接语音回答？",
          answer: "语音识别可能把环境杂音误听成「好」。把 Claude Code 权限队列映射到 S3 前键同意、侧键拒绝（可补口述理由），能确保高风险动作严格绑定物理意图。",
          evidenceHref: "/projects/walkie#decision-timeline",
          boundary: "拒绝并口述理由的手感目前只经 Lewis 本人测试。",
        },
        {
          id: "walkie-relay",
          question: "拔掉 USB 线之后怎么保证安全？",
          answer: "配对后的每一帧都用 pair.key 派生的 HKDF 会话密钥做 AES-256-GCM 加密，S3 端锁定 ISRG Root X1/X2 根证书；Fly.io 中继只转发密文，不持有密钥也不落盘。",
          evidenceHref: "/projects/walkie#evidence-board",
          boundary: "经 gate-p5 与 gate-l 脚本验证；未经过外部安全审计。",
        },
        {
          id: "walkie-dualboot",
          question: "Walkie 和 On The Beat 怎么共存在一块 M5StickS3 上而不互相覆盖？",
          answer: "On The Beat 留在 app0，Walkie 住在 app1。firmware/guard.py 直接拦截 erase 与 uploadfs，tools/flash.mjs 只写 app1，双键长按 3 秒即可干净切换另一个应用。",
          evidenceHref: "/projects/walkie#decision-timeline",
          boundary: "必须通过仓库自带的 flash/boot 脚本操作，不可执行裸擦除命令。",
        },
      ],
      managerFollowUp: {
        id: "walkie-manager-follow-up",
        question: "为什么做手表硬件而不是手机 App？",
        answer: "掏手机很容易被各种通知打断。M5StickS3 本来就戴在手腕上跑 On The Beat，把 Walkie 放进 app1 后，一次 2 秒的审批变成抬手看一眼加按一下键。",
        evidenceHref: "/projects/walkie#outcome-limits",
        boundary: "基于个人工作流假设，尚未在更大群体中验证。",
      },
    },
  },
};
