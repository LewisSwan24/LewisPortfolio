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
      en: "Put on the finger sleeve and take one wristband. Notice the color pairings—no single person can tilt an axis alone, so talk across the table to guide the ball home.",
      zh: "「请戴好震动指套并握住对应颜色腕带。注意同色成对：单个人按不住任何一条倾斜轴，只能靠四人跨桌口头协调把小球滚进终点。」",
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
        verifiedStatus: "unverified-hypothesis",
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
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "maze-probe-attention",
        prompt: {
          en: "Track where players look when the ball drops into an IR trap zone.",
          zh: "追踪小球遮断红外陷阱区的一瞬间，四名玩家的视线焦点落点。",
        },
        whatWeWatchFor: {
          en: "Whether players glance at the vertical scoring screen first or react immediately to wrist/finger vibration and board buzzer.",
          zh: "核对玩家是先看旁边的计分大屏，还是先因手指震动与板载蜂鸣产生体感惊呼。",
        },
        failureSignal: {
          en: "Scoreboard updates while physical feedback lags or misfires twice.",
          zh: "计分屏已扣分但指套未震，或一次经过误触连震两下，破坏体感因果直觉。",
        },
        verifiedStatus: "unverified-hypothesis",
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
        en: "Public exhibition in June 2026, nine rounds of four. A team member explained the rules before each round.",
        zh: "2026 年 6 月公开展出，共九轮，每轮四人。每轮开始前由组员讲解规则。",
      },
      observation: {
        en: "Each group took about a minute to put on the wristbands and finger sleeves. Attention went to the maze, the score and time display, the LEDs and the sounds. Some players were surprised by the finger-sleeve vibration the first time. Many still struggled with the rules even after the explanation; about 3 of 9 groups finished.",
        zh: "每组戴腕带和指套大约要一分钟。玩的时候，注意力在迷宫、分数与时间显示、灯光和声音上。有些玩家第一次被指套震动吓了一跳。讲解之后仍有不少人没弄懂规则，九组里大约三组通关。",
      },
      designResponse: {
        en: "No change was made during the exhibition. The rule explanation before each round stayed part of the setup, and the struggle with the rules is recorded as a limit.",
        zh: "展出期间没有改动。每轮开始前的规则讲解保留为固定环节，玩家搞不懂规则这一点记作局限。",
      },
      verifiedStatus: "observed",
    },
    {
      id: "maze-obs-2",
      sessionRef: { en: "Hardware Bench · FC-51 Bounce", zh: "硬件台架 · FC-51 红外毛刺排查" },
      context: {
        en: "Rolling the ball past 10 infrared beam gates at varied speeds.",
        zh: "不同滚速下小球穿越 10 路红外光束门。",
      },
      observation: {
        en: "On raw reads, a single ball pass could fire more than once and charge more than one penalty.",
        zh: "直接读原始电平时，一次过球可能触发不止一次，扣不止一次分。",
      },
      designResponse: {
        en: "Each sensor now needs three consecutive samples to trigger, followed by a 400 ms cooldown, so one physical pass is one serial event.",
        zh: "每个传感器要连续三次取样才算触发，之后冷却 400 ms，一次过球只产生一个串口事件。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "maze-obs-3",
      sessionRef: { en: "Mid-Fi Decision · 25 Apr 2026", zh: "Mid-Fi 决定 · 2026 年 4 月 25 日" },
      context: {
        en: "Moving from the concept to the Mid-Fi build.",
        zh: "从概念走到 Mid-Fi 版本。",
      },
      observation: {
        en: "The electric-shock idea could not meet both complexity and safety.",
        zh: "电击设想的复杂度与安全性均无法达标。",
      },
      designResponse: {
        en: "Replaced it with vibration motors in wearable finger sleeves at the Mid-Fi stage.",
        zh: "在 Mid-Fi 阶段改用可穿戴指套里的震动马达。",
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
      en: "Board split, debounce thresholds, and five-channel round synchronization.",
      zh: "展场高强度连续试玩下守住安全与一致性的物理层参数。",
    },
    rows: [
      {
        dimension: { en: "IR Debounce & Cooldown", zh: "红外消抖与冷却窗口" },
        constraint: { en: "3 consecutive samples + 400 ms cooldown", zh: "连续三次取样 + 400 ms 冷却" },
        rationale: {
          en: "Eliminates double/triple penalty firing when the ball wobbles over an FC-51 sensor rim.",
          zh: "消除小球擦边震荡导致的连环误扣分，确保计分屏与指套震动 1:1 对齐。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Board Split", zh: "多板分工" },
        constraint: { en: "One Mega + two Uno (wristbands & servos; ball-launcher stepper), shared ground", zh: "一块 Mega 加两块 Uno（一块管腕带与舵机，一块管发球机步进电机），全部共地" },
        rationale: {
          en: "Keeps servo and stepper code in their own sketches, apart from the Mega's sensing and scoring.",
          zh: "舵机和步进电机的程序各自独立，不和 Mega 上的感测与计分写在一起。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Solo-Tap Gate", zh: "单人触发锁" },
        constraint: { en: "Requires simultaneous pair conductivity per axis", zh: "单轴向必须两名搭档同时接通方可执行倾斜" },
        rationale: {
          en: "No one can tilt an axis alone, so partners have to act together.",
          zh: "谁都无法单独倾斜一条轴，搭档必须一起动手。",
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
        en: "Get four visitors playing together soon after they walk up to the table.",
        zh: "让四位参观者走到桌旁后能尽快一起玩起来。",
      },
      tension: {
        en: "Complex multi-page rule placards go unread in loud gallery spaces.",
        zh: "嘈杂展区里没人愿意低头读长篇规则说明书。",
      },
      resolution: {
        en: "A team member explained the rules before each round. Many players still struggled with them, which stays an open problem.",
        zh: "每轮开始前由组员讲解规则。讲完之后仍有不少玩家没弄懂，这一点还没解决。",
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
        en: "Sensing, wristbands, servos and the ball launcher are too much to keep in one sketch.",
        zh: "感测、腕带、舵机和发球机全塞在一份程序里太多了。",
      },
      resolution: {
        en: "Use one Mega plus two Uno boards on a shared ground, and give each IR sensor a three-sample debounce and a 400 ms cooldown.",
        zh: "用一块 Mega 加两块 Uno，全部共地；每个红外传感器做三次取样去抖，加 400 ms 冷却。",
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
        en: "The shock idea could not meet both complexity and safety; putting on wristbands and sleeves took each group about a minute.",
        zh: "电击设想的复杂度与安全性均无法达标；每组戴腕带和指套大约要一分钟。",
      },
      resolution: {
        en: "Replace the shock with finger-sleeve vibration, and fit the gear as part of the round setup.",
        zh: "用指套震动取代电击，佩戴装备放进每轮开局的准备环节。",
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
        en: "Which hardware decision would I keep?",
        zh: "哪项硬件决定我会保留？",
      },
      answer: {
        en: "Splitting the work across a Mega and two Uno boards on a shared ground, so the servo and stepper code stay out of the scoring sketch.",
        zh: "把工作分到一块 Mega 和两块 Uno 上、全部共地，舵机和步进电机的程序不混进计分程序。",
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
