import type { RawResearchVaultRecord } from "@/lib/cases/research-vault-schema";

export const grasslandResearchVault: RawResearchVaultRecord = {
  slug: "grassland",
  studyStatus: "bench-tested",
  honestScopeNote: {
    en: "430/430 RC automated unit/integration tests, fixed-resolution HUD sweeps (1280×720 & 1920×1080), and 75-asset provenance verification passed. Structured playtesting with external RTS novices remains unexecuted.",
    zh: "430/430 发布候选自动化测试、1280×720 与 1920×1080 双分辨率 HUD 零遮挡验收及 75 项美术资产溯源均已通过；尚未面向外部非核心玩家开展结构化上手测试。",
  },
  moderatorGuide: {
    protocolTitle: {
      en: "5-Mission Command Grammar Consistency & Defeat-Recovery Protocol",
      zh: "五关跨章指令一致性与战败恢复可玩性测试规程",
    },
    cohortAndSetting: {
      en: "Planned, not run: 6 strategy/tactics players testing Missions 1–3 back-to-back on desktop Chromium (1280×720 and 1920×1080).",
      zh: "计划中，未执行：6 名策略游戏玩家在桌面浏览器（1280×720 与 1920×1080）连续打第 1–3 关。",
    },
    openingBrief: {
      en: "Enter Chapter One from the main menu, command your vanguard using click, box-select, and right-click, and try recovering from an intentional tactical defeat in Mission 2.",
      zh: "「请从主菜单进入第一章《苍狼余火》，仅用左键框选与右键调度推进前两关，并在第二关故意失利一次，试着用检查点重整战线。」",
    },
    taskProbes: [
      {
        id: "grassland-probe-grammar",
        prompt: {
          en: "Transition from Mission 1 open skirmish into Mission 3 night-stealth rules without re-reading a tutorial.",
          zh: "不翻新教学弹窗，直接从第 1 关正面遭遇战切入第 3 关夜间隐蔽机制。",
        },
        whatWeWatchFor: {
          en: "Whether immutable box-select, Shift-toggle, Ctrl-group, and right-click verbs hold identical muscle memory across mission rule shifts.",
          zh: "观察框选、Shift 增减、Ctrl 编队与右键下令在关卡规则剧变时是否依然保持零学习成本。",
        },
        failureSignal: {
          en: "A mission-specific special mechanic overriding standard right-click move or attack expectations.",
          zh: "一旦某关特例偷偷改写了右键移动或攻击的常规手感，即判定语法污染。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "grassland-probe-defeat",
        prompt: {
          en: "Trigger a mission loss (e.g., vanguard wiped or camp breached) and inspect the defeat overlay.",
          zh: "故意触发一次任务失败（先锋全灭或营地失守），观察结算弹层与重开路径。",
        },
        whatWeWatchFor: {
          en: "Player immediately identifies WHICH causal condition failed and restores cleanly from the single checkpoint without stale buffs/debuffs.",
          zh: "检验玩家能否一眼看懂到底输在哪条因果条件，并在检查点重开后遇到干净无残留的战场状态。",
        },
        failureSignal: {
          en: "Generic 'Defeat' banner or ghost enemy timers leaking from the failed attempt into the restored checkpoint.",
          zh: "若只弹出冷冰冰的「战败」，或读档后上一局残余火势/冷却计时串进新局，即判状态链失守。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
      {
        id: "grassland-probe-hud",
        prompt: {
          en: "Issue rapid flanks while tracking objective progress and minimap alerts at 1280×720.",
          zh: "在 1280×720 较窄笔记本屏下高频拉扯阵型，同时余光盯住任务栏与小地图。",
        },
        whatWeWatchFor: {
          en: "Zero HUD clipping, zero hidden command buttons, and clear edge separation from the active battlefield.",
          zh: "确认边缘 HUD 无文字截断、无按钮重叠，且不遮挡战场核心点选视野。",
        },
        failureSignal: {
          en: "Minimap or objective drawer overlapping playable flank paths.",
          zh: "小地图或任务栏哪怕遮住半个可点击单位边缘，即视为布局越界。",
        },
        verifiedStatus: "unverified-hypothesis",
      },
    ],
    debriefQuestion: {
      en: "With camera zoom fixed and zero auto-play shortcuts, did tactical clarity feel empowering or claustrophobic on larger skirmishes?",
      zh: "「锁定镜头倍率且刻意不提供全自动代打托管，在大型混战里是让你觉得指哪打哪更清晰，还是觉得视野太局促？」",
    },
  },
  observationLogs: [
    {
      id: "grassland-obs-1",
      sessionRef: { en: "RC Build Gate · 430/430 Tests", zh: "RC 发布门禁 · 430/430 全量通过" },
      context: {
        en: "Verifying deterministic 20 Hz simulation loop, EasyStar.js pathfinding, and single checkpoint state chain across Missions 1–5.",
        zh: "跨 1–5 关校验 20 Hz 固定逻辑钟、EasyStar 寻路与单一检查点快照恢复链。",
      },
      observation: {
        en: "Early checkpoint restores left orphaned unit timers and stale fog-of-war flags when missions mutated shared runtime globals.",
        zh: "早期关卡各自写入全局临时变量时，战败读档常把上一局残余视野迷雾或计时器带进新重开局。",
      },
      designResponse: {
        en: "Unified save state into one pure mission snapshot chain verified by regression tests across all 5 missions.",
        zh: "将存档收束为唯一纯函数快照链，并在自动化测试中逐关拦截读档状态污染。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "grassland-obs-2",
      sessionRef: { en: "Screen Sweep · 720p & 1080p", zh: "双分辨率走查 · 720p / 1080p" },
      context: {
        en: "Auditing tactical HUD strips, minimap, and command card alignment in Playwright & manual desktop sweeps.",
        zh: "在 1280×720 与 1920×1080 双规格下逐屏检查主菜单、战略地图与战场边缘 HUD。",
      },
      observation: {
        en: "Early development menus exposed internal mission-jump debug toggles and variable font-scale banners that squeezed the 720p combat canvas.",
        zh: "早期主菜单残留了开发期跳关开关，且变长提示条在 720p 窗口下挤压了战场可视区域。",
      },
      designResponse: {
        en: "Stripped debug clutter from player-facing menus and locked edge-docked HUD geometry under fixed camera framing.",
        zh: "彻底清理玩家向界面的开发调试杂讯，把状态条贴边锚定并锁死固定镜头比例。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "grassland-obs-3",
      sessionRef: { en: "Asset Pipeline · 75 Provenance Specs", zh: "资产管线 · 75 项素材溯源" },
      context: {
        en: "Integrating generated portraits, terrain tiles, and unit spritesheets under a single historical steppe palette.",
        zh: "将 75 项角色头像、地形图块与兵种精灵表统一进同一套草原历史色调。",
      },
      observation: {
        en: "Eagerly preloading all 5 chapters' spritesheets stalled Mission 1 boot time noticeably.",
        zh: "开屏预载五关全部高清图集导致进第一关前出现明显黑屏等待。",
      },
      designResponse: {
        en: "Switched to per-mission lazy atlas loading triggered from the Chapter 1 strategic map while logging every asset in a 75-item provenance manifest.",
        zh: "改为由战略地图按关懒加载对应图集，并为全部 75 项资产建立可追溯清单。",
      },
      verifiedStatus: "bench-tested",
    },
  ],
  ergonomicsOrStageSpec: {
    title: {
      en: "Across-Stage RTS Command Grammar & Clock Spec",
      zh: "跨五关统一 RTS 操作语法与时钟规格",
    },
    subtitle: {
      en: "Shared interaction contract enforced identically across Missions 1 through 5.",
      zh: "从第一关到第五关一以贯之的核心操作契约与性能约束。",
    },
    rows: [
      {
        dimension: { en: "Selection & Grouping", zh: "框选与编队语法" },
        constraint: { en: "Click / Box-drag / Shift-toggle / Ctrl+1..4", zh: "点选 / 拖拽框选 / Shift 增减 / Ctrl 编队" },
        rationale: {
          en: "Missions may narrow active unit types via capability flags, never redefine what selection gestures do.",
          zh: "关卡只能通过能力表裁剪可用兵种，绝不允许篡改基础点选与编队手感。",
        },
        verifiedStatus: "synthetic-gate",
      },
      {
        dimension: { en: "Simulation Clock", zh: "确定性逻辑时钟" },
        constraint: { en: "Fixed 20 Hz tick decoupled from display FPS", zh: "固定 20 Hz 推演时钟与屏幕刷新率解耦" },
        rationale: {
          en: "Keeps combat pacing, EasyStar pathfinding, and defeat trigger windows reproducible across 60 Hz and 144 Hz monitors.",
          zh: "确保 60 Hz 笔记本与 144 Hz 高刷屏下的战斗节奏与计时判定完全一致。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Camera & HUD Budget", zh: "固定镜头与边缘 HUD" },
        constraint: { en: "Locked zoom · Edge-docked strips tested at 720p/1080p", zh: "锁定镜头倍率 · 贴边 HUD 经 720p/1080p 验证" },
        rationale: {
          en: "Trades free zoom-out macro views for predictable hitbox precision under real-time pressure.",
          zh: "牺牲大地图无级缩放，换取实时拉扯兵线时稳定可靠的点击命中区。",
        },
        verifiedStatus: "bench-tested",
      },
      {
        dimension: { en: "Causal Defeat & Retry", zh: "因果战败与读档链" },
        constraint: { en: "Explicit failure cause + zero-leak checkpoint restore", zh: "写明具体败因 + 零残留检查点快照重开" },
        rationale: {
          en: "Players learn tactical counters directly from the failure screen instead of guessing why a mission ended.",
          zh: "让玩家从战败弹层一眼看懂为何溃败，而不是面对模糊「失败」两字盲目重开。",
        },
        verifiedStatus: "bench-tested",
      },
    ],
  },
  triRoleTension: [
    {
      role: "pm-product",
      roleLabel: { en: "Game & UX Director", zh: "游戏体验与系统策划" },
      priority: {
        en: "Ship a complete five-mission historical chapter that feels legible without burying novices in micromanagement macros.",
        zh: "完整交付五关历史战役，让玩家不必背诵复杂微操宏指令也能看懂战局。",
      },
      tension: {
        en: "Temptation to add auto-battle / AI commander toggles that play the skirmish for the user.",
        zh: "很容易想塞进「全自动代打 / AI 副官托管」降低门槛，结果反而剥夺了策略决策感。",
      },
      resolution: {
        en: "Refuse automation shortcuts; keep tactical clarity high via fixed zoom, edge HUD, and clean causal defeat explanations.",
        zh: "拒绝自动化代操作，靠固定镜头、克制边缘 HUD 与明确战败归因保住纯正战术掌控感。",
      },
    },
    {
      role: "engineering-hardware",
      roleLabel: { en: "Simulation & Pipeline Engineer", zh: "引擎模拟与资产管线工程师" },
      priority: {
        en: "Keep 20 Hz simulation deterministic, checkpoints bug-free, and bundle boot fast across 75 assets.",
        zh: "确保 20 Hz 主循环稳定、读档绝不串台，且 75 项美术资源不拖慢首屏加载。",
      },
      tension: {
        en: "Each mission's custom triggers risked leaking mutable globals across retries and bloating initial load.",
        zh: "每关独立触发器极易在重试时残留状态污染，且全量打包图集会拖垮首屏。",
      },
      resolution: {
        en: "Enforce data-driven mission manifests, lazy per-mission atlas fetching, and a 430-test RC gate.",
        zh: "落地数据驱动关卡 Manifest、按关懒加载图集与 430 项 RC 自动化测试门禁。",
      },
    },
    {
      role: "end-user",
      roleLabel: { en: "Browser Strategy Player", zh: "桌面浏览器策略玩家" },
      priority: {
        en: "Consistent controls from Mission 1 to 5, instant retries after losing, and uncluttered battlefield visibility.",
        zh: "五关操作手感始终如一、打输了秒级读档重来、战场不被菜单遮挡。",
      },
      tension: {
        en: "Unexplained defeats or inconsistent right-click behavior across special missions feel unfair.",
        zh: "最烦遇到莫名其妙突然判负，或者上一关好使的快捷键下一关突然失灵。",
      },
      resolution: {
        en: "Lock shared command grammar across all 5 missions and explain exact failure causes on every defeat modal.",
        zh: "全章节死锁同一套键鼠语法，并在每次战败界面明确指出触发失利的战术条件。",
      },
    },
  ],
  rebuildToday: [
    {
      id: "grassland-q1",
      question: {
        en: "What invariant made the five-mission scale sustainable?",
        zh: "哪条工程约束撑住了五关体量的持续迭代？",
      },
      answer: {
        en: "Treating missions as data manifests validated against one shared command contract and one single-chain checkpoint snapshot.",
        zh: "把关卡彻底数据化（Manifest），并让全部五关接受同一份指令契约与单一快照还原链的自动化约束。",
      },
      verifiedStatus: "bench-tested",
    },
    {
      id: "grassland-q2",
      question: {
        en: "What major evidence gap remains open?",
        zh: "当前最需要补齐的真实空白是什么？",
      },
      answer: {
        en: "Observing 6–8 outside players who have never seen the codebase play Missions 1–3 unassisted, to see where the pared-back controls still confuse newcomers.",
        zh: "找 6–8 名完全没看过源码的外部玩家独立试玩第 1–3 关，验证这套精简键鼠语法对零基础玩家到底够不够友好。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "grassland-q3",
      question: {
        en: "What UI feature would I unlock in Chapter Two?",
        zh: "若开做第二章，第一个想解锁的界面能力是什么？",
      },
      answer: {
        en: "A bounded two-step tactical zoom toggle (combat close vs strategic overview) while keeping HUD strips strictly pinned to screen edges.",
        zh: "在维持边缘 HUD 绝对稳固的前提下，增加两档可控视野切换（近距交战 / 战略俯瞰），缓解大地图局促感。",
      },
      verifiedStatus: "unverified-hypothesis",
    },
    {
      id: "grassland-q4",
      question: {
        en: "Why keep an explicit 75-asset provenance list?",
        zh: "为什么花精力维护完整的 75 项美术资产溯源表？",
      },
      answer: {
        en: "To prevent style drift across multi-week production and prove every portrait and tile set stays cohesive under one art spec.",
        zh: "跨周生产极易画风飘移，资产溯源表是把生成与手绘素材长期拴在同一套美术基准上的唯一硬约束。",
      },
      verifiedStatus: "bench-tested",
    },
  ],
};
