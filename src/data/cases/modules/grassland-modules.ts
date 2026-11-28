import type { CaseModulesRecord } from "@/lib/cases/modules-schema";

export const grasslandModules: CaseModulesRecord = {
  slug: "grassland",
  journey: [
    {
      id: "grassland-strategic-entry",
      step: 1,
      title: {
        en: "Clean chapter manifest menu & five-mission strategic map",
        zh: "零开发残留主菜单与五关战略地图入口",
      },
      shortTitle: {
        en: "Mission map",
        zh: "五关战略地图",
      },
      trigger: {
        en: "Player opens Chapter One (Embers of the Pale Wolf) in a desktop browser",
        zh: "玩家在桌面浏览器打开第一章《苍狼余火》",
      },
      userMentalModel: {
        en: "Show me only where the chapter stands, my saved progress, and how to enter or replay a mission—no debug toggles or wall-of-text tutorials.",
        zh: "只需让我看清五关进度、存档状态与重玩入口，不要在首屏塞满开发期测试开关或冗长说明。",
      },
      systemAction: {
        en: "Main menu renders chapter state from real save data; strategic map routes into Missions 1–5 and lazily fetches only the chosen mission's assets.",
        zh: "主菜单直接读取真实存档态；战略地图按关懒加载对应地图与图集，避免首屏预下载五关全部重资源。",
      },
      cognitiveFriction: {
        en: "Preloading all 5 chapters' spritesheets upfront creates a long initial stall before Mission 1 even starts.",
        zh: "如果启动时一次性全量预加载五关美术图集，首关玩家还没开打就会因加载过慢流失。",
      },
      edgeRecovery: {
        en: "Between-mission lazy fetch keeps Mission 1 entry fast while in-memory checkpoints enable instant intra-mission retries.",
        zh: "按关懒加载缩短首屏等待，同时关内战败通过内存检查点快照实现秒级重开。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "grassland-unified-grammar",
      step: 2,
      title: {
        en: "Immutable click, box-select & command grammar across all 5 missions",
        zh: "跨五关完全一致的框选与指令语法",
      },
      shortTitle: {
        en: "Shared grammar",
        zh: "统一指令语法",
      },
      trigger: {
        en: "Player selects squads via click, drag-box, Shift toggle, or Ctrl groups and issues right-click commands",
        zh: "玩家使用点击、拖拽框选、Shift 增减、Ctrl 编队及右键命令调度兵团",
      },
      userMentalModel: {
        en: "Even when Mission 3 or Mission 5 introduces night fog or stealth goals, a box-select and right-click must mean the exact same thing as Mission 1.",
        zh: "哪怕到了第 3 或第 5 关出现夜渡或隐蔽机制，框选和右键的意义也必须和第 1 关完全相同。",
      },
      systemAction: {
        en: "Shared command validator checks mission capability flags: a mission may restrict which verbs exist, never alter what an input gesture does.",
        zh: "全局指令校验层只允许关卡「裁剪可用动词」，严禁篡改既有点击或快捷键的行为语义。",
      },
      cognitiveFriction: {
        en: "Whether brand-new outside RTS players learn this pared-back grammar smoothly remains untested without structured player sessions.",
        zh: "这套精简 RTS 语法对外部零基础新玩家是否容易上手，因尚无结构化试玩测试，目前仍无定论。",
      },
      edgeRecovery: {
        en: "Automated tests lock Mission 1 through Mission 5 against the identical command contract on every build.",
        zh: "自动化测试从第 1 关到第 5 关强制校验同一份操作契约，防止单关后期悄然破坏手感。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "grassland-edge-hud",
      step: 3,
      title: {
        en: "Fixed battlefield camera & edge-docked tactical HUD",
        zh: "固定镜头倍率与贴边克制战术 HUD",
      },
      shortTitle: {
        en: "Edge-docked HUD",
        zh: "贴边战术 HUD",
      },
      trigger: {
        en: "Real-time 20 Hz simulation runs combat, EasyStar.js pathfinding, vision, and mission triggers simultaneously",
        zh: "20 Hz 固定主循环同步推演战斗、寻路、视野与关卡触发器",
      },
      userMentalModel: {
        en: "Keep the battlefield claiming the vast majority of pixels; dock objectives, minimap, and command grid cleanly along the edges.",
        zh: "战场必须占满核心操作区；目标、小地图与命令格老实待在屏幕边缘，绝不挡住点选单位。",
      },
      systemAction: {
        en: "Locks camera zoom and anchors HUD strips at screen borders, verified at both 1280×720 and 1920×1080 for zero clipped/covered buttons.",
        zh: "锁定镜头倍率并将状态条锚定在边缘，在 1280×720 与 1920×1080 双分辨率下逐屏实测无遮挡与裁切。",
      },
      cognitiveFriction: {
        en: "Fixed zoom sacrifices broad macro overview across larger maps in exchange for predictable click hitboxes and zero text occlusion.",
        zh: "固定倍率牺牲了大地图全景缩览能力，以换取实时高压下绝对稳定的点选与可读性。",
      },
      edgeRecovery: {
        en: "Minimap stays synced to the shared 20 Hz simulation tick so off-screen squad movement remains readable at the edge.",
        zh: "小地图紧贴同一 20 Hz 模拟钟刷新，确保视野外单位动向仍可在边缘一眼掌握。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "grassland-checkpoint-chain",
      step: 4,
      title: {
        en: "Causal defeat explanation & single-chain checkpoint restore",
        zh: "因果明确的战败说明与单一检查点快照恢复",
      },
      shortTitle: {
        en: "Checkpoint restore",
        zh: "检查点恢复",
      },
      trigger: {
        en: "Player suffers defeat during a long stretch such as Mission 4 or Mission 5 (Night Ford)",
        zh: "玩家在第四关或第五关（夜渡）等长线任务中触发失败条件",
      },
      userMentalModel: {
        en: "Tell me clearly why I lost, and let me resume from a verified checkpoint where both units and mission flags match—not restart the whole chapter.",
        zh: "明说为什么败了，再让我从单位和任务标志完全吻合的检查点继续，不用白打前面半小时。",
      },
      systemAction: {
        en: "Pause, failure cause, checkpoint snapshot, and unit array restoration serialize through one unified save chain on the 20 Hz clock.",
        zh: "暂停、战败原因、检查点快照与单位阵列全部通过同一条 20 Hz 存档链序列化与还原。",
      },
      cognitiveFriction: {
        en: "Decoupled UI objectives and entity arrays easily desync on retry, making restored troops stand in obsolete objective states.",
        zh: "若 UI 目标计数与战场单位各自存档，读档后常出现「兵回来了但任务判定还停在战败前」的错乱。",
      },
      edgeRecovery: {
        en: "Mission 4 checkpoint restore and Mission 5 multi-stage chain (stealth -> camp search -> packs -> way home) are verified end-to-end.",
        zh: "第四关检查点恢复与第五关多段任务状态链（隐蔽→搜营→行囊→返家）均在 RC 构建中连贯跑通。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "grassland-rc-audit",
      step: 5,
      title: {
        en: "Four-pillar RC verification & asset provenance gate",
        zh: "四维 RC 验收与 75 项资产溯源审计",
      },
      shortTitle: {
        en: "RC audit",
        zh: "RC 验收",
      },
      trigger: {
        en: "Release candidate build runs automated tests, asset contract gate, web bundle build, and dual-res playthrough",
        zh: "发布候选版依次执行单测、资产闸门、网页构建与双分辨率全章实机通关",
      },
      userMentalModel: {
        en: "Don't trust a green compiler alone—prove all 5 missions play end-to-end cleanly and disclose any live-URL or bundle-size gaps.",
        zh: "不能只看编译通过，必须证明五关真能在浏览器从头打到尾，并如实交代线上复验与包体警告现状。",
      },
      systemAction: {
        en: "430/430 Vitest tests pass, 6 manifests / 75 assets / 49 alpha / 154 provenance records pass gate, and 1280×720 + 1920×1080 playthroughs clear.",
        zh: "430/430 自动化测试通过，6 份 manifest / 75 项资产 / 154 条溯源记录过闸，双分辨率五关连贯通关。",
      },
      cognitiveFriction: {
        en: "Phaser 4 web build carries a known bundle-size warning, and the live Vercel URL has not yet repeated the identical local RC audit.",
        zh: "Phaser 4 打包仍触发大体积构建警告，且已部署线上 URL 尚未跑完与本地 RC 完全同规格的逐屏审计。",
      },
      edgeRecovery: {
        en: "All claims in the portfolio explicitly scope verification to the local RC record rather than overstating live or player-tested proof.",
        zh: "作品集页面明确将验收范围限定为本地 RC 实录与系统级测试，绝不虚标外部玩家可用性。",
      },
      focusTags: ["ai-trust", "systems-hardware"],
      verifiedStatus: "synthetic-gate",
    },
  ],
  stateMatrix: [
    {
      state: "normal",
      label: { en: "Normal · 20 Hz Active Battlefield", zh: "正常态 · 20 Hz 战场实时推演" },
      entryCondition: {
        en: "Active mission manifest & atlases loaded; 20 Hz clock ticking with player controlling squads.",
        zh: "当前关卡 Manifest 与图集加载完成，20 Hz 主时钟稳定推进实时操作。",
      },
      uiFeedback: {
        en: "Battlefield occupies center viewport; unit status, minimap, objectives, and command grid update along outer edges.",
        zh: "主战场占据最大视区，单位状态、小地图、目标与指令格在边缘区实时反馈且零遮挡。",
      },
      keyboardFocus: {
        en: "Ctrl grouping, Shift multi-select, Pause toggle, and command hotkeys respond predictably with zero stuck modifiers.",
        zh: "Ctrl 编队、Shift 增减、暂停键与命令热键按统一语法响应，无修饰键卡死。",
      },
      fallbackGuarantee: {
        en: "Input, pathfinding, combat, vision, and mission triggers stay deterministic on one shared simulation clock.",
        zh: "输入、寻路、战斗、视野与关卡触发器共享同一逻辑钟，行为完全可预期。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "empty",
      label: { en: "Empty · Fresh Campaign / Unstarted Save", zh: "空状态 · 新章节或待开局状态" },
      entryCondition: {
        en: "Player opens the app with no prior local save or views strategic map before completing Mission 1.",
        zh: "首次打开游戏尚无本地存档，或尚未通关第 1 关时查看战略地图。",
      },
      uiFeedback: {
        en: "Strategic map cleanly highlights Mission 1 entry and real save state without placeholder debug menus.",
        zh: "战略地图干净展示第 1 关入口与真实存档态，剥离一切开发调试残留。",
      },
      keyboardFocus: {
        en: "Primary entry control receives clean initial focus from main menu.",
        zh: "主菜单焦点清晰落位在开始/继续章节入口。",
      },
      fallbackGuarantee: {
        en: "Completed strategic map badges only unlock from actual saved mission completion data, never static mockups.",
        zh: "战略地图通关标识严格源自真实结算存档，绝非静态假状态。",
      },
      focusTags: ["ux-research", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "offline",
      label: { en: "Offline · Local Client Simulation", zh: "离线态 · 纯前端本地沙盒运行" },
      entryCondition: {
        en: "Mission assets already cached in browser when network drops mid-mission.",
        zh: "当前关卡图集已加载至本地内存后遭遇网络断开。",
      },
      uiFeedback: {
        en: "Active mission, checkpoints, and local saves continue uninterrupted on client simulation clock.",
        zh: "当前关卡战斗、暂停与本地检查点读写全程在浏览器本地独立运转，完全不中断。",
      },
      keyboardFocus: {
        en: "All pause, retry, and command bindings remain identical offline.",
        zh: "暂停、重开与编队操作在断网期间与在线完全一致。",
      },
      fallbackGuarantee: {
        en: "Between-mission lazy fetch gracefully prompts retry if next-chapter assets cannot load offline.",
        zh: "仅当跨关切换需要拉取新图集却处于断网时，明确提示重试，不会静默卡死黑屏。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      state: "error",
      label: { en: "Error · Asset Manifest / Save Guard", zh: "错误态 · 资产契约与状态保护" },
      entryCondition: {
        en: "Corrupted save payload or missing/mismatched runtime asset manifest entry.",
        zh: "本地存档损坏，或运行时加载器发现缺失/不匹配的资产清单条目。",
      },
      uiFeedback: {
        en: "Runtime asset contract & 154 provenance checks catch asset regressions pre-build; invalid saves fail safely to mission start.",
        zh: "构建前 75 项资产与 154 条溯源门禁自动拦截缺漏；损坏存档安全降级至可重玩关卡起点。",
      },
      keyboardFocus: {
        en: "Error / retry fallback presents keyboard-reachable Restart / Back to Map actions.",
        zh: "异常兜底界面保证「重试 / 返回战略地图」按钮键盘可达。",
      },
      fallbackGuarantee: {
        en: "430/430 unit tests cover mission logic, pathing, vision, checkpoints, and runtime asset contracts.",
        zh: "430/430 自动化测试覆盖逻辑、寻路、视野、检查点与运行时资产契约。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "synthetic-gate",
    },
    {
      state: "refused",
      label: { en: "Refused · Disallowed Verb / Mission Defeat", zh: "拒绝态 · 受限指令与战败阻断" },
      entryCondition: {
        en: "Player attempts a locked command verb in an early/stealth mission, or mission reaches defeat state.",
        zh: "玩家在限定关卡尝试未开放指令，或触发任务战败条件。",
      },
      uiFeedback: {
        en: "Unavailable verbs stay visibly disabled without mutating other keys; defeat modal explains exact cause + checkpoint restore.",
        zh: "禁用命令明确置灰而不篡改既有键位语义；战败界面明示原因并提供检查点恢复入口。",
      },
      keyboardFocus: {
        en: "Defeat card puts clear focus on 'Restore checkpoint' vs 'Return to strategic map'.",
        zh: "战败面板将焦点明确落在「从检查点恢复」与「返回战略地图」选项上。",
      },
      fallbackGuarantee: {
        en: "Single save chain restores units and mission flags atomically so defeat recovery can never corrupt chapter progression.",
        zh: "单一存档链原子级还原兵力与任务状态，确保失败重来绝不污染章节记录。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "bench-tested",
    },
  ],
  rejectionArchive: [
    {
      id: "grassland-reject-per-level-controls",
      round: { en: "Grammar & Mission Audit", zh: "五关交互语法统一审查" },
      date: "2026-07",
      artifactBefore: {
        en: "Per-mission custom buttons, ad-hoc macro shortcuts, and separate Phaser scene overrides per level",
        zh: "为第 1–5 关各写一份 Phaser 场景类，并随关卡机制增加专属特例快捷键与自动外挂宏",
      },
      failureExposed: {
        en: "Players had to unlearn selection and command expectations mid-chapter; bugfixes in box-select or checkpoints drifted across five copied scenes.",
        zh: "玩家打到后几关完全猜不准点击会发生什么。此外，任何框选或存档修复都要在五个场景间重复同步，容易产生漏洞。",
      },
      fixApplied: {
        en: "Consolidated all five missions into typed manifests consumed by one runtime loader and locked one immutable command grammar tested by 430/430 assertions.",
        zh: "将五关抽离为统一 Manifest 配置表，由单一场景加载器读取。同时锁死跨关不可变命令语法，并由 430/430 测试守住。",
      },
      sourceReceipt: {
        en: "430/430 automated RC test baseline + 04-mission-03.jpg unified HUD layout",
        zh: "430/430 自动化 RC 基线测试与 04-mission-03.jpg 统一 HUD 实机截图",
      },
      focusTags: ["ai-trust", "systems-hardware"],
      verifiedStatus: "synthetic-gate",
    },
    {
      id: "grassland-reject-desynced-retry",
      round: { en: "Release-Candidate Audit · Missions 4–5", zh: "发布候选审计 · 第四至五关双分辨率通关" },
      date: "2026-07",
      artifactBefore: {
        en: "Separate UI objective tracking vs troop reset on failure, plus upfront preloading of all 5 chapters' heavy atlases",
        zh: "战败重开时 UI 任务状态与单位数组分离存储，且启动首屏一次性预加载五关全部图集",
      },
      failureExposed: {
        en: "Resets risked leaving troops respawned inside stale mission flags while heavy upfront loading delayed Mission 1 entry.",
        zh: "读档重置极易造成画面人物与背后任务标志串台，同时全量预加载拖慢首屏进入速度。",
      },
      fixApplied: {
        en: "Unified pause, defeat causality, checkpoint snapshot, and unit restoration onto one 20 Hz save chain; switched to per-mission lazy asset loading; verified 1280×720 & 1920×1080 full playthroughs.",
        zh: "将暂停、战败归因、检查点与单位还原收进同一 20 Hz 存档链，改用按关懒加载图集，并在 1280×720 与 1920×1080 连续通关五关。",
      },
      sourceReceipt: {
        en: "05-checkpoint.jpg + 06-night-ford.jpg + dual-resolution RC walkthrough",
        zh: "05-checkpoint.jpg / 06-night-ford.jpg 与双分辨率 RC 逐屏复验记录",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "bench-tested",
    },
  ],
};
