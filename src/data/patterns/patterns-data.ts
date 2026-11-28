import type { InteractionPattern } from "@/lib/patterns/schema";

export const INTERACTION_PATTERNS: readonly InteractionPattern[] = [
  {
    slug: "physical-key-commitment-gate",
    order: 1,
    category: "physical-hardware",
    roleTracks: ["interaction", "design-eng", "ai-ux"],
    sourceCaseSlug: "walkie",
    liveWidgetId: "walkie-wrist",
    title: {
      en: "Physical Key Commitment Gate",
      zh: "实体按键确权门控",
    },
    tagline: {
      en: "Decouple low-friction voice capture from irreversible approvals by binding execution strictly to deliberate physical hardware presses.",
      zh: "把低摩擦语音采集与不可逆权限审批解耦。语音只负责传达意图，高危放行必须等拇指按下物理按键。",
    },
    humanTension: {
      en: "Approving shell or write calls purely by spoken 'yes' fails as soon as background conversation or media audio triggers a false match.",
      zh: "若只靠语音喊一句「同意」就放行命令行，室内背景对话或视频外放随时可能引发误批准。",
    },
    commonAntiPattern: {
      en: "Hands-free voice confirmation ('Yes, run it') or auto-accepting after a 5-second countdown with zero tactile boundary.",
      zh: "纯语音口令自动放行，或在没有任何触觉隔离的前提下倒计时 5 秒静默默认同意。",
    },
    chosenRule: {
      en: "Asymmetric dual-button grammar on M5StickS3: hold Front Key for 16 kHz press-to-talk, press Front Key to approve queued tools, press Side Key to deny (+ optional spoken reason), and require a 30-second physical Front Key confirmation before writing pair.key.",
      zh: "在 M5StickS3 建立非对称物理按键语法。按住前键录音，按前键放行队列权限，按侧键驳回（可紧接语音补充原因）。新电脑配对必须在 30 秒内物理按下前键，才会写入 pair.key。",
    },
    a11yGuarantees: [
      {
        en: "Tactile differentiation between approve (Front) and deny (Side) prevents spatial confusion without staring at the 1.14-inch screen.",
        zh: "前键批准与侧键拒绝在实体位置上物理隔离，不盯 1.14 寸小屏也能靠手感盲操防误触。",
      },
      {
        en: "Web simulator exposes equivalent keyboard bindings (Enter to approve, Backspace to deny) with visible focus rings and status output.",
        zh: "网页端交互模拟器同步映射 Enter 批准与 Backspace 拒绝快捷键，并配备清晰焦点环与状态区播报。",
      },
    ],
    metricsCeiling: {
      verifiedStatus: "bench-tested",
      summary: {
        en: "Verified across 11 S3 hardware test scenes (gate-h), AES-GCM/pairing refusal checks (gate-p5), and 75s Fly.io keep-alive (gate-l); external multi-wearer ergonomics remain untested.",
        zh: "已在 S3 真机跑通 11 项场景（gate-h）、配对拒签向量（gate-p5）与 75 秒中继保活（gate-l）；外部多人佩戴手感尚待实测。",
      },
    },
    codeSnippet: {
      filename: "lib/ui/approval-gate.ts",
      language: "ts",
      caption: {
        en: "Asymmetric approval state machine enforcing hardware button commitment and spoken denial capture.",
        zh: "非对称物理确认状态机：严格禁止语音自动放行，将批准与带理由拒绝落到独立实体键。",
      },
      code: `export type HardwareKey = "front_press" | "side_press" | "voice_only";
export type GateState = "listening" | "awaiting_key" | "approved" | "denied";

export function reduceApprovalGate(
  state: GateState,
  event: HardwareKey,
  pendingToolId: string | null
): GateState {
  if (state !== "awaiting_key" || !pendingToolId) return state;
  // Voice transcripts can never authorize a pending tool call.
  if (event === "voice_only") return "awaiting_key";
  if (event === "front_press") return "approved";
  if (event === "side_press") return "denied";
  return state;
}`,
    },
  },
  {
    slug: "three-tier-confidence-split",
    order: 2,
    category: "ai-boundaries",
    roleTracks: ["ai-ux", "product", "design-eng"],
    sourceCaseSlug: "autofill",
    liveWidgetId: "autofill-confidence",
    title: {
      en: "Three-Tier Confidence Split & Blank-on-Doubt",
      zh: "三档置信度分流与存疑留白",
    },
    tagline: {
      en: "Separate deterministic 1:1 matches from ambiguous dropdowns and open prompts using stroke, icon, word badge, and a hard human Submit lock.",
      zh: "把确定性 1:1 映射、歧义下拉框与开放问答题拆成实线/虚线/粗实线三档可见状态，并在最终提交前硬性停手。",
    },
    humanTension: {
      en: "Typing one resume across dozens of ATS portals is exhausting, yet AI autofillers that guess visa status, salary, or essays to boast '100% completion' push catastrophic rejection risk onto the applicant.",
      zh: "重复填写几十份网申极其耗时。但若自动填表工具为炫技强行猜测签证类别、薪资或开放问答，填错的致命淘汰后果全由求职者承担。",
    },
    commonAntiPattern: {
      en: "Calling a cloud LLM to hallucinate values for every empty input and auto-advancing straight through the final Submit button.",
      zh: "用云端大模型硬填所有空白字段，并在多页流程末页顺手代点不可撤回的最终提交。",
    },
    chosenRule: {
      en: "Fill deterministic 1:1 profile matches immediately (solid border), pause ambiguous selects for review (dashed), keep open prompts empty by rule (3px solid), tally counts with per-field reasons in the side panel, and stop dead before Submit.",
      zh: "仅确定的 1:1 字段直接填入（实线），歧义下拉框暂停并标虚线待核，开放题一律用粗实线刻意留空。侧栏逐项写明填写依据，且绝不触发任何 Submit 选择器。",
    },
    a11yGuarantees: [
      {
        en: "Tri-coding (border stroke pattern + icon + explicit text word) guarantees WCAG 1.4.1 non-color-only state perception.",
        zh: "边框线型（实/虚/双）+ 图标 + 文字标签三重编码，确保色觉障碍用户也能零歧义分辨每格状态。",
      },
      {
        en: "Side-panel field reasons remain keyboard-navigable to jump focus directly to flagged DOM controls.",
        zh: "侧栏逐项原因列表支持键盘直接跳转，聚焦到对应待确认表单控件。",
      },
    ],
    metricsCeiling: {
      verifiedStatus: "synthetic-gate",
      summary: {
        en: "6/6 light and dark screenshot suites pass on synthetic test forms (2026-11-20) with zero-network Android Keystore IME unit guard; real-site accuracy across outside users remains unmeasured.",
        zh: "合成测试表单明暗 6/6 截图门禁通过（2026-11-20），Android 键盘零网络引用单测通过；外部真实招聘站点跨人群准确率尚未量化。",
      },
    },
    codeSnippet: {
      filename: "lib/autofill/confidence-lanes.ts",
      language: "ts",
      caption: {
        en: "Confidence bucket classifier that forbids open-ended generation and enforces Submit lock.",
        zh: "置信度分桶器：从类型层封死开放题猜测与提交按钮自动点击。",
      },
      code: `export type CertaintyTier = "filled" | "needs-review" | "kept-blank";

export function classifyField(
  confidence: number,
  isOpenPrompt: boolean,
  isSubmitControl: boolean
): { tier: CertaintyTier; stroke: "solid" | "dashed" | "thick"; allowClick: boolean } {
  if (isSubmitControl) {
    return { tier: "kept-blank", stroke: "thick", allowClick: false };
  }
  if (isOpenPrompt || confidence < 0.7) {
    return { tier: "kept-blank", stroke: "thick", allowClick: false };
  }
  if (confidence < 0.98) {
    return { tier: "needs-review", stroke: "dashed", allowClick: false };
  }
  return { tier: "filled", stroke: "solid", allowClick: false };
}`,
    },
  },
  {
    slug: "default-safe-focus-lock",
    order: 3,
    category: "ai-boundaries",
    roleTracks: ["ai-ux", "interaction", "product"],
    sourceCaseSlug: "lamplight",
    liveWidgetId: "lamplight-triage",
    title: {
      en: "Default-Safe Focus Lock ('Not Now' Primary)",
      zh: "高风险弹窗默认安全聚焦（「先不要」为主位）",
    },
    tagline: {
      en: "Defeat habitual Enter-key fatigue in agent supervision by placing initial keyboard focus and visual weight on 'Not now' while isolating edits to copies.",
      zh: "在长任务监控中，把高风险确认卡的初始键盘焦点与主按钮重心锁死在「先不要」。同时强制任务只操作文件副本。",
    },
    humanTension: {
      en: "During multi-minute background agent runs, users develop muscle-memory 'Enter-key fatigue'—reflexively dismissing dialogs and authorizing destructive file overwrites.",
      zh: "当后台 Agent 跑了十几分钟突然弹出确认框，人很容易因为切窗口时的肌肉记忆顺手敲下 Enter，把原文件直接覆盖。",
    },
    commonAntiPattern: {
      en: "Standard OS modal defaults focusing 'Continue / Overwrite' as the primary button while editing user originals in place.",
      zh: "沿用常规系统弹窗默认聚焦高亮「继续 / 覆盖」，且后台任务直接就地修改原始文件。",
    },
    chosenRule: {
      en: "Risky step cards lock initial focus and primary contrast onto 'Not now', treating dismissal or Esc as a reversible pause that preserves all completed blackboard steps, paired with pre-flight spending caps and copy-only files.",
      zh: "危险步骤弹窗将初始焦点与高对比按钮给到「先不要」，把拒绝或 Esc 设为无损挂起，保留已完成的黑板进度。同时配合委托前开销封顶与副本隔离。",
    },
    a11yGuarantees: [
      {
        en: "Initial modal focus lands deterministically on the non-destructive 'Not now' button inside a proper dialog landmark.",
        zh: "弹窗打开后，初始焦点固定落在无损的「先不要」按钮上，且 Escape 键与关闭按钮行为一致。",
      },
      {
        en: "Minimized corner monitor never steals OS focus during background progress updates.",
        zh: "最小化桌角监控小窗在后台推进时不抢占用户当前编辑器窗口焦点。",
      },
    ],
    metricsCeiling: {
      verifiedStatus: "observed",
      summary: {
        en: "Running daily in Lewis's own Windows v1.0 workflow (released 2026-11-05) with ~100 Vitest files and deterministic replay debugger; comparative log-vs-café comprehension testing with outside users is pending.",
        zh: "已在作者个人 Windows v1.0 日常流中持续运行（2026-11-05 发布），配套百余 Vitest 文件与离线回放面板；他人对比测试待开展。",
      },
    },
    codeSnippet: {
      filename: "components/RiskDecisionCard.tsx",
      language: "tsx",
      caption: {
        en: "Default-safe confirmation pattern pinning autoFocus and Enter activation to the reversible pause action.",
        zh: "默认安全确认模式：将初始焦点与回车触发锁在无损暂停按钮，继续操作需刻意切焦点。",
      },
      code: `export function RiskDecisionCard({
  summary,
  onPauseSafe,
  onProceedExplicit,
}: {
  summary: string;
  onPauseSafe: () => void;
  onProceedExplicit: () => void;
}) {
  return (
    <dialog open aria-labelledby="risk-title">
      <h3 id="risk-title">Confirm file overwrite</h3>
      <p>{summary}</p>
      <div className="actions">
        <button type="button" autoFocus className="btn-primary" onClick={onPauseSafe}>
          Not now (pause safely)
        </button>
        <button type="button" className="btn-ghost" onClick={onProceedExplicit}>
          Proceed on copy
        </button>
      </div>
    </dialog>
  );
}`,
    },
  },
  {
    slug: "symmetric-mutual-consent-reveal",
    order: 4,
    category: "social-consent",
    roleTracks: ["interaction", "design-eng"],
    sourceCaseSlug: "onthebeat",
    liveWidgetId: "onthebeat-handshake",
    title: {
      en: "Symmetric Mutual-Consent Progressive Reveal",
      zh: "对称双向同意后的渐进显名与退场",
    },
    tagline: {
      en: "Eliminate unilateral social exposure in physical venues by keeping waves anonymous until both people confirm, then ending each meeting kindly with LET'S FINISH.",
      zh: "先传递无身份压力的匿名挥手信号，双方都同意后才揭示名字和碰面地点。聊完用 LET'S FINISH 好好收尾，那张卡随之关闭。",
    },
    humanTension: {
      en: "Wanting to say hello at a dark, loud gig carries real social rejection anxiety, yet opening a proximity profile radar creates surveillance pressure and ruins presence in the music.",
      zh: "在嘈杂昏暗的演出现场，想搭话又怕误判尴尬。但打开展示头像与资料的「附近人雷达」，又会制造偷窥压力，打断沉浸感。",
    },
    commonAntiPattern: {
      en: "LBS nearby-people grids broadcasting faces/bios unilaterally, or infinite in-app chat feeds designed to keep eyes glued to glass.",
      zh: "单向广播头像与资料的定位列表，或用无限聊天框把刚认识的人继续锁在手机屏幕里。",
    },
    chosenRule: {
      en: "Wrist side button or phone sends a blind wave ('someone nearby waved' with zero name/photo); an always-on Fly.io Sydney relay unlocks names and one shared venue landmark only after mutual wrist/phone MEET agreement.",
      zh: "用手环侧键或手机发送零姓名/头像的匿名挥手。常驻悉尼的 Fly.io 中继仅在双端真实达成 MEET 互认后，才同步解锁姓名与唯一地标。",
    },
    a11yGuarantees: [
      {
        en: "Both wrist side-button hardware and web card controls expose identical mutual-state transitions without one-way phone lock-in.",
        zh: "手环实体侧键与网页端卡片操作拥有对等状态控制力，避免单向锁死在玻璃屏幕上。",
      },
      {
        en: "Unanswered waves expire silently without harsh rejection modals or focus disruption.",
        zh: "未获回应的试探信号静默消退，不产生刺激性拒绝对话框或焦点突变。",
      },
    ],
    metricsCeiling: {
      verifiedStatus: "bench-tested",
      summary: {
        en: "Verified live across StickS3 & StickC Plus via Sydney Fly.io relay (65 min after removing localhost blocker on Sep 25) and Ava/Leo twin windows (Sep 29); no live-gig participant study has run yet.",
        zh: "已于 9 月 25 日完成脱电脑双真机配对与 9 月 29 日双窗口全流转；尚无真实或模拟演出人群参与者测试。",
      },
    },
    codeSnippet: {
      filename: "relay/mutual-reveal.ts",
      language: "ts",
      caption: {
        en: "Server relay state guard ensuring profile names stay redacted until both peer nods arrive.",
        zh: "中继端状态守卫：双端都确认前，严格剥离名字与地标字段。",
      },
      code: `export function projectPeerPayload(
  waveA: boolean,
  waveB: boolean,
  peerName: string,
  landmark: string
) {
  if (waveA && waveB) {
    return { status: "MEET" as const, peerName, landmark };
  }
  return {
    status: waveA || waveB ? ("WAVED" as const) : ("ARMED" as const),
    peerName: null,
    landmark: null,
  };
}`,
    },
  },
  {
    slug: "zero-dead-end-flat-routing",
    order: 5,
    category: "physical-hardware",
    roleTracks: ["design-eng", "interaction"],
    sourceCaseSlug: "maze",
    liveWidgetId: "maze-contact",
    title: {
      en: "Single-State Fan-Out & Debounced Co-Touch Gate",
      zh: "防抖互锁门控与单一状态机五路扇出",
    },
    tagline: {
      en: "Synchronize noisy physical sensors, wearable haptics, audio, and a browser Web Serial console from one debounced round state machine.",
      zh: "以防抖冷却窗口收敛硬件毛刺，再用单一回合状态机同步驱动计分、指套震动、灯带、音效与 Web Serial 控制台。",
    },
    humanTension: {
      en: "When hardware subsystems read raw sensors independently, one ball pass fires score and finger vibration out of sync—and exhibition visitors stop trusting the rules immediately.",
      zh: "各硬件模块如果各自读取原始传感器电平，一次小球经过就会触发多次计分与震动打架。展场玩家会立刻怀疑装置失灵。",
    },
    commonAntiPattern: {
      en: "Coupling raw unbuffered IR interrupts with servo PWM on one controller, or maintaining a fake animated portfolio mock separate from real firmware.",
      zh: "把未防抖红外信号与舵机 PWM 混在单板执行，或在作品集里单独拼凑一套脱离固件逻辑的假动画。",
    },
    chosenRule: {
      en: "Pair adjacent player wristbands (A/B co-touch) so no single player dominates tilt, isolate tilt on SafeTouchServoController, debounce all 10 FC-51 IR channels into one Mega round state, and run live Web Serial + Demo Mode off one parity-tested dispatcher.",
      zh: "相邻玩家腕带物理互锁，禁止单人独控；舵机拆至 SafeTouchServoController。十路 FC-51 红外防抖收进单一 Mega 状态机，Web Serial 实机与 Demo 模式共用同源分发器。",
    },
    a11yGuarantees: [
      {
        en: "Browser co-touch simulator supports keyboard Arrow steering and explicit lock announcements when single-player mode is active.",
        zh: "网页端协同迷宫支持方向键操作，并在单人锁定态通过状态文本明确告知需要双人配合。",
      },
      {
        en: "Offline/unsupported browsers gracefully fall back to deterministic Demo Mode without throwing serial errors.",
        zh: "无串口硬件或不支持 Web Serial 的环境平顺退化至一致性测试过的 Demo 模式。",
      },
    ],
    metricsCeiling: {
      verifiedStatus: "bench-tested",
      summary: {
        en: "Bench-tuned 10 IR zones and regression-tested serial/feedback/servo/audio parity; observed across 9 exhibition groups (36 visitors) without per-channel telemetry logging.",
        zh: "十路红外与四维一致性回归均在台架与测试通过；展场观察 9 组 36 人游玩，未按通道埋点量化权重。",
      },
    },
    codeSnippet: {
      filename: "firmware/debounce-fanout.ts",
      language: "ts",
      caption: {
        en: "Cooldown-gated sensor reducer ensuring one physical pass fans out identically to score, haptics, and serial.",
        zh: "防抖冷却门控：保证单次物理触发只向前推进一次五端同步事件。",
      },
      code: `export function handleIrEdge(
  nowMs: number,
  lastAcceptedMs: number,
  cooldownMs: number
): { accepted: boolean; nextTimestamp: number } {
  if (nowMs - lastAcceptedMs < cooldownMs) {
    return { accepted: false, nextTimestamp: lastAcceptedMs };
  }
  return { accepted: true, nextTimestamp: nowMs };
}`,
    },
  },
  {
    slug: "immutable-cross-stage-grammar",
    order: 6,
    category: "state-architecture",
    roleTracks: ["interaction", "design-eng", "product"],
    sourceCaseSlug: "grassland",
    liveWidgetId: "grassland-rules",
    title: {
      en: "Immutable Cross-Stage Command Grammar",
      zh: "跨阶段不可变命令语法与单一快照链",
    },
    tagline: {
      en: "Escalate tactical complexity through mission manifests and verb subsets—never by mutating core selection gestures or splitting save state.",
      zh: "随关卡推进，只按配置清单裁剪开放动词，绝不篡改点击/框选的基本含义。同时把失败原因与兵力还原锁进同一条 20 Hz 存档链。",
    },
    humanTension: {
      en: "Under a ticking clock, patching custom shortcuts or overriding selection rules for later missions turns strategic challenge into interface betrayal.",
      zh: "在实时倒计时压力下，一旦为后期关卡临时改写按键含义或新造特例按钮，玩家分不清失败是因为战术失误，还是界面背叛。",
    },
    commonAntiPattern: {
      en: "Duplicating separate scene classes per mission with level-specific macro buttons and decoupled UI/entity retry state.",
      zh: "为每一关复制独立场景代码、塞入关卡专属外挂按钮，并把 UI 目标与单位复活分开存档。",
    },
    chosenRule: {
      en: "Lock click, box-select, Shift add/remove, Ctrl groups, and right-click commands into one immutable contract across all 5 mission manifests; serialize pause, defeat reason, checkpoint snapshot, and units atomically on one 20 Hz simulation tick.",
      zh: "五关锁定同一套操作语法（可限制开放命令，禁止篡改行为语义）。暂停、战败原因、检查点与单位阵列全部绑定同一条 20 Hz 模拟存档链。",
    },
    a11yGuarantees: [
      {
        en: "Edge-docked tactical HUD maintains zero overlap or clipping across 1280×720 and 1920×1080 playthroughs.",
        zh: "贴边战术 HUD 在 1280×720 与 1920×1080 双分辨率全程实机验证无按钮遮挡与裁切。",
      },
      {
        en: "Failure screen announces causal reason and offers deterministic checkpoint recovery without restarting the entire chapter.",
        zh: "战败面板明确说明失利因果并提供键盘可达的检查点恢复入口，免去整章重打。",
      },
    ],
    metricsCeiling: {
      verifiedStatus: "synthetic-gate",
      summary: {
        en: "430/430 Vitest suite, 75-asset provenance gate, and dual-resolution local RC playthrough pass; external new-player learnability remains untested.",
        zh: "430/430 自动化测试、75 项资产溯源门禁与双分辨率本地 RC 通关均已通过；外部玩家初见学习成本尚未实测。",
      },
    },
    codeSnippet: {
      filename: "engine/command-contract.ts",
      language: "ts",
      caption: {
        en: "Manifest capability gate restricting mission verbs while keeping core gesture semantics immutable.",
        zh: "关卡能力门禁：允许按关开放或禁用命令动词，绝不改写输入手势映射。",
      },
      code: `export type CoreVerb = "move" | "scout" | "guard" | "stealth";

export function dispatchCommand(
  verb: CoreVerb,
  allowedVerbs: ReadonlySet<CoreVerb>
): { ok: true; verb: CoreVerb } | { ok: false; reason: "locked-in-mission" } {
  if (!allowedVerbs.has(verb)) {
    return { ok: false, reason: "locked-in-mission" };
  }
  return { ok: true, verb };
}`,
    },
  },
];

export function getAllInteractionPatterns(): readonly InteractionPattern[] {
  return INTERACTION_PATTERNS;
}
