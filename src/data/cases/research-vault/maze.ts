import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";

export const mazeResearchVault: RawResearchVaultRecord = {
  slug: "maze",
  studyStatus: "observed",
  honestScopeNote: {
    en: "Observed across 9 exhibition groups (36 players, ~3 completions) on the physical wooden maze, plus bench verification of 10-zone FC-51 IR debounce and Web Serial parity. Handwritten leaderboard scores were not archived.",
    zh: "公开展览现场实测 9 组共 36 名试玩者（约 3 组通关），并完成 10 路 FC-51 红外防抖与 Web Serial 串口一致性台架验收；现场手写榜单未归档，故不宣称量化通关时长。",
  },
  moderatorGuide: {
    protocolTitle: {
      en: "Exhibition 4-Player Shared-Wristband Facilitation & Observation Guide",
      zh: "展场四人共用腕带引导与行为观察规程",
    },
    cohortAndSetting: {
      en: "9 drop-in exhibition groups (4 strangers or peers per round, 36 players total) standing around the wooden maze table in a public gallery space.",
      zh: "公共展场走近即玩的 9 组观众（每局 4 人围绕木质迷宫桌，共计 36 人），包含陌生观众临时组队与朋友结伴。",
    },
    openingBrief: {
      en: "Put on the finger sleeve and take one wristband. Notice the color pairings—no single person can tilt an axis alone, so talk across the table to guide the steel ball home.",
      zh: "「请戴好震动指套并握住对应颜色腕带。注意同色成对：单个人按不住任何一条倾斜轴，只能靠四人跨桌口头协调把钢球滚进终点。」",
    },
    taskProbes: [
      {
        id: "maze-probe-sleeve",
        prompt: {
          en: "Ask players to fit the wearable vibration finger sleeves before starting Round 1.",
          zh: "开局前观察玩家自主佩戴震动手指套的过程，必要时由主持人出手协助。",
        },
        whatWeWatchFor: {
          en: "Physical dexterity hurdles, strap confusion, and whether sleeve fitting becomes a natural social icebreaker.",
          zh: "记录手指套佩戴卡点，以及协助佩戴是否反而促成了四人开局前的破冰沟通。",
        },
        failureSignal: {
          en: "Loose finger sleeves sliding off mid-tilt, causing players to miss trap feedback entirely.",
          zh: "指套过松在晃动中脱落，导致撞陷阱时触觉反馈直接失灵。",
        },
        verifiedStatus: "observed",
      },
      {
        id: "maze-probe-cotouch",
        prompt: {
          en: "Watch the first 20 seconds when one player taps a wristband without their color partner.",
          zh: "观察开局前 20 秒内有玩家单独试按腕带、而同色搭档尚未发力时的反应。",
        },
        whatWeWatchFor: {
          en: "How quickly players infer the shared-axis rule from immediate lock feedback without reading printed instructions.",
          zh: "检验玩家能否不看说明书，仅凭「单按锁死提示」在十秒内悟出必须双人同步。",
        },
        failureSignal: {
          en: "Players repeatedly slamming the single contact assuming the wiring is broken.",
          zh: "若玩家反复猛拍单个触点却以为电路接触不良，则说明锁定提示不够直观。",
        },
        verifiedStatus: "observed",
      },
      {
        id: "maze-probe-attention",
        prompt: {
          en: "Track where players look when the ball drops into an IR trap zone.",
          zh: "追踪钢球遮断红外陷阱区的一瞬间，四名玩家的视线焦点落点。",
        },
        whatWeWatchFor: {
          en: "Whether players glance at the vertical scoring screen first or react immediately to wrist/finger vibration and board buzzer.",
          zh: "核对玩家是先看旁边的计分大屏，还是先因手指震动与板载蜂鸣产生体感惊呼。",
        },
        failureSignal: {
          en: "Scoreboard updates while physical feedback lags or misfires twice.",
          zh: "计分屏已扣分但指套未震，或一次经过误触连震两下，破坏体感因果直觉。",
        },
        verifiedStatus: "observed",
      },
    ],
    debriefQuestion: {
      en: "Did the shared wristband force you to coordinate differently with the person opposite you compared to normal party games?",
      zh: "「这种同色共用一条轴的设定，有没有逼着你们说出平时玩合作游戏很少喊出来的节奏口令？」",
    },
  },
  observationLogs: [
    {
      id: "maze-obs-1",
      sessionRef: { en: "Exhibition · Groups 1–9 (n=36)", zh: "展场实测 · 9 组 36 人现场观察" },
      context: {
        en: "Unscripted public gallery onboarding across all 9 four-player rounds.",
        zh: "公共展场全部 9 轮四人开局引导现场。",
      },
      observation: {
        en: "Visitors consistently fumbled fitting the finger sleeves on their own, and during play almost nobody watched the score screen—eyes stayed glued to the ball until the finger buzz fired.",
        zh: "观众几乎都戴不好指套，需要主持人搭把手；开局后大家的眼睛死死盯着滚动钢球，根本不看旁边屏幕，全靠手指突如其来的震动感知扣分。",
      },
      designResponse: {
        en: "Reframed host sleeve-fitting as an intentional opening ritual and anchored all critical trap feedback in immediate tactile haptics + audio rather than visual HUD banners.",
        zh: "干脆把协助佩戴纳入正式开局仪式，并将一切关键惩罚/命中信息押注在零延迟指套震动与蜂鸣上，屏幕只作旁观汇总。",
      },
      verifiedStatus: "observed",
    },
    {
      id: "maze-obs-2",
      sessionRef: { en: "Hardware Bench · FC-51 Bounce", zh: "硬件台架 · FC-51 红外毛刺排查" },
      context: {
        en: "Rolling steel ball through 10 infrared beam gates at varied speeds.",
        zh: "不同滚速下钢球穿越 10 路红外光束门。",
      },
      observation: {
        en: "Unfiltered digital reads bounced 2–3 times per crossing (18 ms noise spikes), deducting multiple penalties for one roll.",
        zh: "未加过滤的原始数字口会在单次过球时抖出 2–3 次毛刺（约 18 ms），导致撞一次洞连扣三回分。",
      },
      designResponse: {
        en: "Implemented per-channel debounce (45 ms stable window) + 1200 ms cooldown lockout, compressing every physical pass into 1 atomic serial event.",
        zh: "为十路红外各自引入 45 ms 稳态消抖 + 1200 ms 冷却锁定，严格保证一过一事件。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "maze-obs-3",
      sessionRef: { en: "Safety Pivot · Shock Removal", zh: "安全重构 · 废除微电击方案" },
      context: {
        en: "Transitioning from early classroom brief to an unattended public exhibition floor.",
        zh: "从早期课堂概念走向无专人全程盯守的公共展台。",
      },
      observation: {
        en: "Mild electric shock modules pose medical/pacemaker unpredictability and visitor consent liability in public spaces.",
        zh: "哪怕极微弱的电击模块，在公共展场也存在起搏器隐患与参观者知情同意风险。",
      },
      designResponse: {
        en: "Replaced shock circuitry completely with SafeTouchServo isolation and wearable haptic sleeves.",
        zh: "果断砍掉电击硬件，改以隔离舵机控制器加可穿戴震动指套承担全部惩罚体感。",
      },
      verifiedStatus: "observed",
    },
  ],
  ergonomicsOrStageSpec: {
    title: {
      en: "Physical Table & 10-Zone IR Timing Spec",
      zh: "实体木质迷宫与十路红外防抖时序规格",
    },
    subtitle: {
      en: "Electrical isolation, debounce thresholds, and five-channel round synchronization.",
      zh: "展场高强度连续试玩下守住安全与一致性的物理层参数。",
    },
    rows: [
      {
        dimension: { en: "IR Debounce & Cooldown", zh: "红外消抖与冷却窗口" },
        constraint: { en: "45 ms stable break + 1200 ms per-zone lockout", zh: "45 ms 稳态确认 + 1200 ms 单通道冷却锁" },
        rationale: {
          en: "Eliminates double/triple penalty firing when the steel ball wobbles over an FC-51 sensor rim.",
          zh: "消除钢球擦边震荡导致的连环误扣分，确保计分屏与指套震动 1:1 对齐。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Servo Controller Isolation", zh: "舵机双板物理隔离" },
        constraint: { en: "Dedicated SafeTouchServoController offloads PWM", zh: "独立 SafeTouchServoController 接管倾斜舵机" },
        rationale: {
          en: "Prevents high-current servo stalls from brownout-resetting the Arduino Mega score and IR loop.",
          zh: "防止舵机堵转拉低供电或抢占中断，拖垮主控板红外采样与当前局分数。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Solo-Tap Gate", zh: "单人触发锁" },
        constraint: { en: "Requires simultaneous pair conductivity per axis", zh: "单轴向必须两名搭档同时接通方可执行倾斜" },
        rationale: {
          en: "Transforms silent parallel play into vocal coordination across the wooden table.",
          zh: "通过物理电路强制把各玩各的变成四人口头协作。",
        },
        verifiedStatus: "observed",
      },
      {
        dimension: { en: "Dual-Mode Console Parity", zh: "双模控制台一致性" },
        constraint: { en: "Live Web Serial + browser Demo share identical reducer", zh: "真实串口模式与离线网页演示共享同一状态归约器" },
        rationale: {
          en: "Guarantees portfolio reviewers inspect the exact same round FSM rules seen at the gallery.",
          zh: "确保网页脱离硬件演示时跑的回合规则与展场真机一模一样。",
        },
        verifiedStatus: "bench-tested",
      },
    ],
  },
  triRoleTension: [
    {
      role: "pm-product",
      roleLabel: { en: "Exhibition Experience Lead", zh: "展场体验设计负责人" },
      priority: {
        en: "Get four strangers collaborating loudly within 30 seconds of walking up to the table.",
        zh: "让四个互不相识的参观者在站到桌旁 30 秒内就开口协同指挥。",
      },
      tension: {
        en: "Complex multi-page rule placards go unread in loud gallery spaces.",
        zh: "嘈杂展区里没人愿意低头读长篇规则说明书。",
      },
      resolution: {
        en: "Use physical color-paired wristbands + host-assisted sleeve ritual so rules are discovered through the first two touches.",
        zh: "靠同色腕带配对与主持人协助戴指套开局，前两次试按锁死即让规则不言自明。",
      },
    },
    {
      role: "engineering-hardware",
      roleLabel: { en: "Arduino & Wiring Builder", zh: "嵌入式与布线工程师" },
      priority: {
        en: "Keep 10 IR gates, servos, LEDs, buzzer, and Web Serial running continuously without brownouts or double triggers.",
        zh: "让 10 路红外、舵机、灯带、蜂鸣器与串口网页连续运转不复位、不连环误报。",
      },
      tension: {
        en: "Single-MCU servo PWM + tight IR polling starved interrupts and caused erratic buzzer glitches.",
        zh: "初期全塞在一块板上既拖慢轮询又引起供电跌落重连。",
      },
      resolution: {
        en: "Split actuation onto SafeTouchServoController and add 45 ms / 1200 ms firmware debounce gates.",
        zh: "拆出独立舵机板并用 45 ms / 1200 ms 软硬防抖锁死单一事件源。",
      },
    },
    {
      role: "end-user",
      roleLabel: { en: "Exhibition Visitor (Player)", zh: "展场试玩观众" },
      priority: {
        en: "Safe tactile thrill, fair penalty feedback, and zero awkwardness putting gear on.",
        zh: "安全有感官刺激的惩罚反馈、扣分不冤枉，且佩戴装备不手忙脚乱。",
      },
      tension: {
        en: "Electric shock felt unsafe in public; tiny finger sleeves were awkward to slip on alone.",
        zh: "电击惩罚在公共场所让人心存顾虑，细小指套单手很难顺畅戴稳。",
      },
      resolution: {
        en: "Replace shock with safe finger vibration sleeves and build fitting directly into facilitator onboarding.",
        zh: "全面切换震动指套并由主持人顺手帮戴，兼顾安全感与仪式感。",
      },
    },
  ],
  rebuildToday: [
    {
      id: "maze-q1",
      question: {
        en: "What would I add first if running another exhibition?",
        zh: "若再办一次公开试玩展，最先补齐什么？",
      },
      answer: {
        en: "Persist timestamped round telemetry (completion rate, trap counts, group times) automatically in Web Serial CSV logs instead of relying on an unarchived whiteboard.",
        zh: "直接让 Web Serial 控制台把每局用时、踩坑次数与通关标记自动存成 CSV，不再依赖未留底的手写白板。",
      },
      verifiedStatus: "observed",
    },
    {
      id: "maze-q2",
      question: {
        en: "How would I fix the wearable sleeve friction?",
        zh: "如何根治指套佩戴别扭的人因痛点？",
      },
      answer: {
        en: "Move haptic actuators straight into the shared palm/wristband cuff itself so players never have to thread tiny finger sleeves.",
        zh: "把震动马达直接缝进腕带掌托里，握住腕带就自带触觉反馈，省去逐个戴指套的麻烦。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "maze-q3",
      question: {
        en: "What hardware boundary proved its worth on day one?",
        zh: "哪项硬件架构决策在展场第一天就证明了价值？",
      },
      answer: {
        en: "Isolating the servo board from the PlanB Mega. Even when players jammed the tilt limits physically, the round clock and score kept counting cleanly.",
        zh: "把倾斜舵机拆出独立控制板。哪怕现场玩家用力顶住木板导致舵机限位，主控板计分与计时丝毫不受牵连。",
      },
      verifiedStatus: "observed",
    },
    {
      id: "maze-q4",
      question: {
        en: "Why keep the browser demo mode synchronized with hardware firmware?",
        zh: "为什么坚持让网页 Demo 和真机跑完全相同的状态机？",
      },
      answer: {
        en: "Portfolio visitors cannot touch the wooden table; running the exact cooldown and pair-lock rules in the browser lets them inspect the design logic first-hand.",
        zh: "作品集读者摸不到实体木桌，让网页端跑完全一致的冷却锁与双人协同规则，才能让人直观体验真正的交互逻辑。",
      },
      verifiedStatus: "bench-tested",
    },
  ],
};
