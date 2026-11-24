import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";

export const lamplightResearchVault: RawResearchVaultRecord = {
  slug: "lamplight",
  studyStatus: "observed",
  honestScopeNote: {
    en: "Live Electron + Claude Agent SDK runs, deterministic replay, and focus-default audits were verified in self-use builds. A planned external user study has not been run.",
    zh: "Electron 主进程接入真实 Claude Agent SDK、零 API 回放调试与默认聚焦边界已在自用版本跑通；计划中的外部用户测试尚未开展。",
  },
  moderatorGuide: {
    protocolTitle: {
      en: "Enter-Fatigue Resistance & Calm Corner-Window Protocol (planned, not run)",
      zh: "防回车惯性误触与桌角安静监控测试规程（计划中，未执行）",
    },
    cohortAndSetting: {
      en: "Planned, not run: 6 developers or knowledge workers running a 10–15 minute coding/writing delegation alongside their main IDE or browser.",
      zh: "计划中，未执行：6 名同时开着编辑器或文档的开发者/知识工作者，观察 10–15 分钟长任务委派时的打断感与审批安全感。",
    },
    openingBrief: {
      en: "Hand the café crew a real folder copy with a $0.50 cap, minimize the window into the corner while you read an article, and respond only when the crew calls you back.",
      zh: "「请把一个带 $0.50 预算上限的副本文件夹交给店员，然后把窗口缩到桌角继续看你的资料，只在它主动喊你拍板时再处理。」",
    },
    taskProbes: [
      {
        id: "lamplight-probe-not-now",
        prompt: {
          en: "When a high-risk overwrite card pops up while you are typing in another app, press Enter once without reading.",
          zh: "当你在别的窗口打字时突然弹出高风险改写确认卡，观察惯性连按一次回车键会发生什么。",
        },
        whatWeWatchFor: {
          en: "Focus stays anchored on 'Not now' so habitual Enter dismisses or defers the risky write rather than authorizing it.",
          zh: "验证焦点是否死死锁在「先不要（Not now）」，让下意识回车触发安全暂缓，而非盲目放行破坏性写入。",
        },
        failureSignal: {
          en: "Any focus jump onto the 'Approve' button or keyboard shortcut that confirms on Enter.",
          zh: "只要有任何状态把初始焦点落到「批准」按钮，或允许回车直接确认，即视为防呆失败。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "lamplight-probe-blackboard",
        prompt: {
          en: "Glance at Wick's blackboard in the main café view and describe what step is currently active without opening the raw log drawer.",
          zh: "不点开原始日志抽屉，仅凭主画面 Wick 的黑板列表判断当前执行到第几步、哪步在卡住。",
        },
        whatWeWatchFor: {
          en: "Whether metaphor-to-SDK mapping preserves step numbers and blockers rather than turning into cute decorative noise.",
          zh: "检验「咖啡馆角色隐喻」是否真的降低了进度理解成本，而不是靠可爱像素小人掩盖卡死状态。",
        },
        failureSignal: {
          en: "Participant has to open stdout raw logs just to learn whether the agent is thinking, blocked, or finished.",
          zh: "如果受测者必须翻开底层终端日志才能搞清代理是在思考、卡住还是已结束，则说明视觉隐喻失职。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "lamplight-probe-corner",
        prompt: {
          en: "Minimize to the corner status monitor for 4 minutes while editing text nearby.",
          zh: "最小化为桌角守望小窗并排工作 4 分钟，评估余光视觉压迫感。",
        },
        whatWeWatchFor: {
          en: "Notice whether dropping full-scene character loops to a single compact card genuinely lowers peripheral fatigue.",
          zh: "观察撤掉全场景走动动画后，单行进度微窗是否能保持「知道它在干活但不心烦」的尺度。",
        },
        failureSignal: {
          en: "User hides or closes the monitor completely because blinking/text motion still pulls their eyes off work.",
          zh: "若用户因余光仍受干扰而直接关闭或彻底藏起小窗，说明安静尺度仍未调妥。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
    ],
    debriefQuestion: {
      en: "Where did the café metaphor clarify what the AI was doing, and where did you wish it just dropped the story and showed plain facts?",
      zh: "「哪些瞬间咖啡馆隐喻让你立刻看懂了进度？又有哪一刻你希望它干脆收起故事感、直接给你看冰冷原话？」",
    },
  },
  observationLogs: [
    {
      id: "lamplight-obs-1",
      sessionRef: { en: "Self-Use Build · SDK Event Normalization", zh: "自用实测 · SDK 事件标准化" },
      context: {
        en: "Running live Claude Agent SDK multi-step tasks in Electron main process.",
        zh: "Electron 主进程挂载真实 Claude Agent SDK 多步任务流。",
      },
      observation: {
        en: "Unfiltered tool events burst in rapid clusters, making sprite motion erratic unless normalized through YAML pacing rules.",
        zh: "原始 SDK 工具事件常成簇涌入，若不做 YAML 节拍规整，角色会在画面里抽搐乱跑。",
      },
      designResponse: {
        en: "Added YAML-driven director state queue that maps verified subtasks onto Wick's blackboard while isolating raw technical errors into plain text cards.",
        zh: "引入 YAML 导演状态队列平滑映射黑板子任务，并将不适合萌化的报错直接落回素净文本卡片。",
      },
      verifiedStatus: "observed",
    },
    {
      id: "lamplight-obs-2",
      sessionRef: { en: "Deterministic Replay · Zero-API Audit", zh: "确定性回放 · 零 API 调试" },
      context: {
        en: "Auditing rare error and refusal states without burning live Claude API tokens.",
        zh: "在不消耗真实接口额度的前提下排查罕见报错与拒答卡片样式。",
      },
      observation: {
        en: "Live-only debugging made edge-case timing almost impossible to reproduce consistently across UI edits.",
        zh: "只靠真实模型现跑现调，几乎无法稳定复现某一步的超时或预算熔断画面。",
      },
      designResponse: {
        en: "Built recorded event-stream replay inside the desktop shell so every transition (Normal, Question, Budget Cap, Refusal) can be scrubbed deterministically.",
        zh: "在桌面壳内实现录制事件流回放器，让所有边界态无需联网即可秒级复现走查。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "lamplight-obs-3",
      sessionRef: { en: "Safety Audit · Copy-Only Sandbox", zh: "安全审计 · 副本沙盒隔离" },
      context: {
        en: "Testing multi-file edits when a task triggers an ambiguous prompt.",
        zh: "检验任务含糊时代理改写工作文件的影响范围。",
      },
      observation: {
        en: "Operating directly inside the user's original directory creates anxiety even with an undo button.",
        zh: "即便有撤销按钮，直接动用户原目录仍会制造心理负担，让人不敢放手委派真实文件。",
      },
      designResponse: {
        en: "Scoped lent files to explicit working copies plus per-job spending cap before launch, keeping originals untouched until manual review.",
        zh: "立下委托单时强制将借入文件拷贝至工作副本并锁定预算上限，原件在人工拍板前纹丝不动。",
      },
      verifiedStatus: "observed",
    },
  ],
  ergonomicsOrStageSpec: {
    title: {
      en: "Calm Desktop Agency & Refusal Threshold Spec",
      zh: "桌面端安静守护与防误触规格",
    },
    subtitle: {
      en: "Focus defaults, corner-monitor footprint, and cost-guard invariants enforced in Electron + Phaser.",
      zh: "围绕低打扰陪伴与高危防呆锁定的桌面端交互硬约束。",
    },
    rows: [
      {
        dimension: { en: "Risk Card Initial Focus", zh: "高危确认卡初始焦点" },
        constraint: { en: "Default focus = 'Not now' (never 'Approve')", zh: "默认聚焦「先不要」，严禁默认聚焦「同意」" },
        rationale: {
          en: "Defeats habitual Enter-key clearing when the confirmation dialog steals focus while typing elsewhere.",
          zh: "防住用户在打字时弹窗抢焦点导致的下意识回车放行。",
        },
        verifiedStatus: "observed",
      },
      {
        dimension: { en: "Corner Monitor Footprint", zh: "桌角监控窗形态" },
        constraint: { en: "Single-card summary (step fraction + active actor)", zh: "单卡精简摘要（步数分母 + 当前角色）" },
        rationale: {
          en: "Eliminates continuous sprite walking from peripheral vision so primary IDE/reading focus stays intact.",
          zh: "收起全画幅像素走动，保住余光静谧感，仅在真正需人工决策时抬升提示。",
        },
        verifiedStatus: "observed",
      },
      {
        dimension: { en: "File & Spend Boundary", zh: "文件与费用双重隔离" },
        constraint: { en: "Working copy + explicit $ cap before start", zh: "启动前锁定副本隔离与单次消费上限" },
        rationale: {
          en: "Bounds worst-case agent failure before a single token is spent.",
          zh: "在代理发出第一条请求前就把最坏代价关进笼子。",
        },
        verifiedStatus: "observed",
      },
      {
        dimension: { en: "Metaphor Honesty Rule", zh: "隐喻诚实边界" },
        constraint: { en: "Never disguise stack traces or denials as cute banter", zh: "严禁把系统报错或拒答包装成卖萌对白" },
        rationale: {
          en: "Cozy art must drop immediately when precision or refusal transparency is required.",
          zh: "温馨美术只负责降压，一旦涉及报错或风险，必须切回直白事实卡片。",
        },
        verifiedStatus: "observed",
      },
    ],
  },
  triRoleTension: [
    {
      role: "pm-product",
      roleLabel: { en: "Product / Experience Lead", zh: "产品 / 体验负责人" },
      priority: {
        en: "Make 15-minute AI delegation feel calm and readable without babysitting a scrolling terminal.",
        zh: "让十余分钟的 AI 委派变得清晰可感，不必死盯着滚屏终端日志。",
      },
      tension: {
        en: "Rich animated pixel scenes delight on first open, yet turn distracting 3 minutes into deep work.",
        zh: "精致像素动画初见很讨喜，但真到专心写代码或看文档时，持续动效反而成干扰。",
      },
      resolution: {
        en: "Pair full-scene café view for commission setup with an austere one-line corner monitor during execution.",
        zh: "开单与复盘展示完整咖啡馆，跑任务期间一键折叠为极简桌角进度卡。",
      },
    },
    {
      role: "engineering-hardware",
      roleLabel: { en: "Desktop & SDK Engineer", zh: "桌面端与 SDK 工程师" },
      priority: {
        en: "Keep Electron IPC responsive, isolate real working files, and reproduce edge bugs without live API spend.",
        zh: "保证 Electron 主进程事件流稳定、文件不损坏，且边界错误无需花真钱即可复现。",
      },
      tension: {
        en: "Claude Agent SDK emits dense asynchronous events that do not map 1:1 onto friendly narrative beats.",
        zh: "SDK 吐出的异步工具调用过于细碎，和人类理解的任务步骤并非一一对应。",
      },
      resolution: {
        en: "Insert YAML normalization layer + deterministic replay debugger between raw SDK events and Phaser UI.",
        zh: "在 SDK 与画布之间架设 YAML 状态归一化层与本地回放调试器。",
      },
    },
    {
      role: "end-user",
      roleLabel: { en: "Operator Running Concurrent Work", zh: "并行工作的真实用户" },
      priority: {
        en: "Never lose original files, never blow past API budget, and never accidentally confirm a risky prompt via Enter.",
        zh: "绝不改坏原件、绝不烧穿预算、绝不在手滑回车时批准高危修改。",
      },
      tension: {
        en: "Wanting fewer interruptions while still needing an unambiguous veto before irreversible writes.",
        zh: "既希望少被打断，又怕一旦不管就出不可逆误改。",
      },
      resolution: {
        en: "Default-focus 'Not now', offer 'Leave it to staff' on low-stakes style questions, and hold risky diffs in copy space.",
        zh: "高危卡默认停在「先不要」，低风险细节允许交给店员自决，所有写入先落副本区。",
      },
    },
  ],
  rebuildToday: [
    {
      id: "lamplight-q1",
      question: {
        en: "What would I keep unchanged in a rebuild?",
        zh: "如果今天重做，哪套机制坚决保留？",
      },
      answer: {
        en: "The three-part safety floor: working-copy file isolation, pre-run spending cap, and 'Not now' default keyboard focus on every risk gate.",
        zh: "副本隔离、任务前预算锁死、以及所有风险弹窗默认焦点落在「先不要」，这三道安全底座绝不让步。",
      },
      verifiedStatus: "observed",
    },
    {
      id: "lamplight-q2",
      question: {
        en: "What limitation sits largest in the current build?",
        zh: "当前版本最大的真实短板在哪里？",
      },
      answer: {
        en: "Zero external participant observation so far. Whether 'Leave it to staff' feels genuinely empowering or too vague is still my own hypothesis.",
        zh: "尚未经过任何外部真人受试。像「交给店员决定」这类委派选项到底省心还是让人心里没底，目前只是自测判断。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "lamplight-q3",
      question: {
        en: "How would I improve the corner monitor next?",
        zh: "桌角守望小窗下一步最值得改什么？",
      },
      answer: {
        en: "Add an unobtrusive token/spend burn gauge right beside the step count so cost awareness never requires reopening the full window.",
        zh: "在步数旁边增加一条低调的预算消耗占比条，不必展开主窗就能一眼盯住花费。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "lamplight-q4",
      question: {
        en: "What did deterministic replay unlock beyond debugging?",
        zh: "确定性事件回放除了修 Bug 之外还带来了什么价值？",
      },
      answer: {
        en: "It turns rare safety-gate failures into repeatable design critique sessions—reviewers can scrub straight to a stall or refusal state in seconds.",
        zh: "它把可遇不可求的边界故障变成了可随时拉取复核的「活标本」，设计评审时几秒就能切到拒答或超预算现场。",
      },
      verifiedStatus: "bench-tested",
    },
  ],
};
