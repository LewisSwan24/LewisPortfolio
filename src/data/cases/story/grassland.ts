import type { CaseStory } from "./types";

/**
 * Sources: src/data/cases/grassland.ts (workSummary, media, interactiveDemo,
 * designDecisions, narrative), src/data/cases/modules/grassland-modules.ts
 * (stateMatrix, rejectionArchive), src/lib/proof/recent-cases.ts (summary,
 * evidence, limits; grassland's case-depth entries live there).
 */
export const grasslandStory: CaseStory = {
  en: {
    problem:
      "A real-time strategy game hands the player many units, many commands and a clock that keeps running. If each mission invents its own controls, or a failure leaves the screen and the mission state disagreeing, the command system stops being predictable.",
    roleLine:
      "Solo project: product direction, mission design, interaction rules, implementation acceptance and evidence, with AI tools assisting the code, the copy and the original assets.",
    result:
      "Chapter one, five missions, playable end to end in a desktop browser, with one command grammar across every mission and a checkpoint that restores the mission and its units from one save chain.",
    problemBody: [
      "Grassland Iron Tide puts five historical missions into one real-time strategy chapter that plays through in a desktop browser. It was built for desktop web players, who manage several squads under a ticking clock.",
      "Each mission wants something a little different, and the easy answer is a special rule for each one. Five missions later the player can no longer predict what a click will do, and escalating challenge turns into an interface that betrays them.",
      "Failure is the other trap. If the screen comes back after a defeat but the mission state does not, the player stops trusting anything the game shows.",
    ],
    decisions: [
      {
        id: "decision-command-grammar",
        title: "A click means the same thing in every mission",
        conflict:
          "Real-time strategy players manage multiple squads under a ticking clock. When later levels patch in custom buttons or override selection rules, escalating challenge turns into interface betrayal.",
        chosen:
          "Click, box-select, Shift to add or remove, Ctrl to group and the right-click command menu are locked into one immutable grammar. A mission may restrict which commands are available, never change what an action means.",
        gaveUp:
          "Per-mission custom shortcuts and buttons, which force players to unlearn muscle memory mid-chapter. Commercial-RTS command density, which overloads new browser players before tactical timing and terrain reading register. The cost: fewer tactical verbs than a full commercial RTS.",
        evidence:
          "Mission three's box-select, grouping and combat information use the same controls as every other mission, rather than a rule made for that mission.",
      },
      {
        id: "decision-camera-save-chain",
        title: "The map keeps the screen, and a defeat can be undone",
        conflict:
          "Crowded HUD chrome eats the playable map, while restarts that visually reset units without restoring the exact mission flags shatter trust after a hard defeat.",
        chosen:
          "A fixed camera zoom keeps the battlefield the largest area, with objectives, minimap and command grid on the edges. Pause, the reason for defeat, the checkpoint and unit restoration share one 20 Hz simulation save chain.",
        gaveUp:
          "Restarting the whole stretch or chapter on defeat, which punishes tactical experiments in longer missions like Mission 4 with repetitive early play. Free camera zoom with floating mission text, which blocks unit clicks under live pressure. The cost: no macro zoom-out across large maps.",
        evidence:
          "After a failure in mission four, a checkpoint restore spares the player the whole stretch again.",
      },
      {
        id: "decision-per-mission-loading",
        title: "Only the mission being played is loaded",
        conflict:
          "Desktop web players abandon a game if the first loading bar freezes on five chapters of spritesheets, yet later missions still need instant retries without fetching assets again.",
        chosen:
          "Missions 1–5 are typed manifest definitions read by one shared runtime scene loader. Only the active mission's assets mount into memory, and retries reset state from in-memory checkpoints.",
        gaveUp:
          "Preloading all five missions' spritesheets and maps at boot, which puts the bandwidth cost on first-time Mission 1 visitors. A separate Phaser scene class per mission, where any fix to box-select or checkpoints would have to be copied across five files. The cost: a brief asset fetch the first time a new mission opens.",
        evidence:
          "In the July 2026 release-candidate audit, upfront preloading of all five chapters' atlases delayed Mission 1 entry; the fix switched to loading assets per mission.",
      },
    ],
    watchFor:
      "Switch between Mission 1 and Mission 5 and issue the same directive, then trigger a checkpoint failure and watch the player avoid replaying the whole chapter.",
    built: {
      body: [
        "The missions are data, not separate programs. A chapter manifest sets the order and the unlocks; each mission definition holds its objectives, triggers and map. Underneath, one simulation runs at a fixed 20 Hz, and input, combat, movement, mission logic and vision all share its clock. The main menu shows only the chapter, the save state and the way in, with nothing from development left on screen.",
        "The asset pipeline is held to the same standard as the code: 6 manifests and 75 registered assets, with 49 alpha files and 154 provenance records that a script can re-check.",
      ],
      tested: [
        "Automated tests: 430 of 430 pass in the RC record, over mission logic, commands, movement, vision, checkpoints and the runtime asset contract.",
        "Asset gate (verify:rts-art) passes in the RC record. The web build passes, with a known warning that the Phaser bundle is large.",
        "Real browser, 1280×720 and 1920×1080: all five missions played through in sequence from the main menu, re-checking selection, grouping, commands, pause and the minimap, screen by screen for page scroll, clipping and covered buttons.",
      ],
      states: [
        {
          state: "Normal",
          what: "The battlefield fills the centre while unit status, minimap, objectives and the command grid update along the edges.",
          recovery: "Input, pathfinding, combat, vision and mission triggers stay deterministic on one shared simulation clock.",
        },
        {
          state: "Empty",
          what: "No local save yet: the strategic map highlights the Mission 1 entry and the real save state, with no debug menus.",
          recovery: "Completed badges unlock only from saved mission completion data, never static mock-ups.",
        },
        {
          state: "Offline",
          what: "The network drops mid-mission with assets cached: the mission, checkpoints and local saves carry on in the browser.",
          recovery: "If the next mission's assets cannot load offline, the between-mission fetch prompts a retry.",
        },
        {
          state: "Error",
          what: "A corrupted save, or a missing or mismatched entry in the runtime asset manifest.",
          recovery: "Asset regressions are caught before build; an invalid save fails safely to mission start.",
        },
        {
          state: "Refused",
          what: "A locked command in an early or stealth mission stays visibly disabled; a defeat screen explains the exact cause.",
          recovery: "Focus lands on Restore checkpoint or Return to strategic map, and units and mission flags are restored together.",
        },
      ],
    },
    outcome: {
      body: [
        "Chapter One, Embers of the Pale Wolf, plays end to end in a desktop browser. The completed map comes from the real results and save data. Evidence status: the five-mission acceptance comes from the local RC record, and the live link has not been through the same audit. These are system and browser checks, with no structured usability testing with outside players.",
        "What the record can show is that chapter one plays through in the local RC build, and that the interaction logic and asset contracts it covers did not regress. A rule like 'a mission may restrict commands but never change them' can be held by a test, so the fifth mission is checked against the same grammar as the first. What the record cannot show is whether a new player learns that grammar. Each rule is written so that a test or a browser run can check it.",
      ],
      limits: [
        {
          title: "No structured usability testing with outside players.",
          body: "Consistent controls are not the same as learnable controls, so the case cannot claim the game is easy to pick up.",
        },
        {
          title: "The five-mission acceptance comes from the local RC record, not from the live deployment.",
          body: "The live link opens, but it has not been through the same audit.",
        },
        {
          title: "The web build passes with a known warning that the Phaser bundle is large.",
          body: "A large bundle can slow the first load of a game opened from a link, and that has not been measured.",
        },
      ],
      next:
        "Run sessions with outside players and record where they get stuck in the first two missions, repeat the two-resolution playthrough on the deployed build, and measure the first load before splitting the bundle.",
    },
  },
  zh: {
    problem:
      "即时战略游戏同时交给玩家很多单位、很多命令，时钟还一直在走。如果每一关各造一套操作，或者失败后画面和任务状态对不上，命令系统就不再可预测。",
    roleLine:
      "独立项目：负责产品方向、任务设计、交互规则、实现验收与证据整理；代码、文案与原创资产由 AI 工具辅助生产。",
    result:
      "第一章五关可以在桌面浏览器里连续通关。五关共用一套命令语法，检查点从同一条存档链同时恢复任务和单位。",
    problemBody: [
      "《草原铁潮》把五段历史任务做成一章即时战略游戏，能在桌面浏览器里连续通关。玩家是桌面网页端的即时战略玩家，要在持续推进的倒计时下同时调度多支队伍。",
      "每一关想要的东西都有点不同，最省事的做法是给每关加一条特殊规则。可五关下来，玩家就再也猜不到点一下会发生什么，所谓的策略难度就偷换成了界面背叛。",
      "失败是另一个坑。战败后画面恢复了，任务状态却没恢复，玩家就不再相信游戏显示的任何东西。",
    ],
    decisions: [
      {
        id: "decision-command-grammar",
        title: "同一次点击在每一关意思都一样",
        conflict:
          "即时战略玩家在倒计时下同时调度多支队伍。如果关卡一复杂就临时改按键或加特例规则，难度就会变成界面背叛。",
        chosen:
          "点击、框选、Shift 增减、Ctrl 编队与右键菜单锁定为不可变语法。关卡可以限制开放哪些命令，绝不允许改写同一操作的含义。",
        gaveUp:
          "为每一关单独设计专属快捷按钮：玩家得在章节中途重学肌肉记忆。照搬商业 RTS 的高密度指令表：会在网页有限的认知带宽里过载操作记忆，掩盖真正的战术判断。代价是战术指令广度低于大型商业 RTS。",
        evidence: "第三关的框选、编队与战斗信息沿用同一套操作，没有为单关另造规则。",
      },
      {
        id: "decision-camera-save-chain",
        title: "战场占住画面，战败可以撤回",
        conflict:
          "堆满屏幕边缘的信息栏会挤压操作视野。战败重来时若画面回去了、底层任务状态却串台，玩家会瞬间对整套系统丧失信任。",
        chosen:
          "锁定镜头倍率，主战场始终占最大面积，目标、小地图与命令格停在边缘。暂停、失败归因、检查点与单位状态全部写入同一条 20 Hz 模拟存档链。",
        gaveUp:
          "任务失败后直接退回关卡起点或章节开头重打：在第四关这类长线任务里，等于用重复劳动惩罚战术试错。开放自由缩放并在战场中央浮动任务说明：浮动文本会遮挡实时点击区。代价是放弃了大地图的宏观缩放视角。",
        evidence: "第四关失败后有明确的检查点恢复，玩家不用重走整段流程。",
      },
      {
        id: "decision-per-mission-loading",
        title: "打到哪一关才载入哪一关",
        conflict:
          "桌面网页即时战略游戏最忌首屏加载卡死在五关的全部图集上。可一旦进到第四、五关这样的长线关卡，战败后重开检查点又必须秒回战场。",
        chosen:
          "第 1–5 关抽离为统一 Manifest 配置表，由单一运行时场景加载器读取。只有当前关卡的地图与图集进入内存，战败读档直接在同关内存态里复原。",
        gaveUp:
          "启动时一次性预下载五关地图与美术图集：把重资源的带宽成本压给第 1 关的初访玩家。为五关复制五个各自改写的 Phaser 场景类：任何框选或存档修复都得在五个文件间同步。代价是第一次切入新关卡时，仍有短促的资源加载。",
        evidence: "2026 年 7 月的发布候选审计中，首屏全量预加载五关图集拖慢了第 1 关的进入；修复改为按关加载。",
      },
    ],
    watchFor: "切换第 1 到第 5 关并执行同一条指令，再触发一次检查点失败，看玩家怎样避免重打整章。",
    built: {
      body: [
        "五关是数据，不是五个各自独立的程序。章节 manifest 定顺序与解锁，每关的任务定义写目标、触发和地图。底层是一个固定 20 Hz 的模拟，输入、战斗、移动、任务逻辑和视野共用这个时钟。主菜单只留章节、存档状态和开始入口，不把开发期的信息留在画面上。",
        "资产管线和代码用同一个标准：6 份 manifest、75 项登记资产，49 个 alpha 文件与 154 条来源记录都能由脚本重复核对。",
      ],
      tested: [
        "自动化测试：RC 记录中 430 / 430 通过，覆盖任务逻辑、命令、移动、视野、检查点和运行时资源契约。",
        "资产闸门（verify:rts-art）在 RC 记录中通过。网页构建通过，保留 Phaser 主包偏大的已知警告。",
        "真实浏览器，1280×720 与 1920×1080：从主菜单连续打完五关，复验选择、编队、命令、暂停与迷你地图。同时逐屏检查页面滚动、内容裁切和按钮遮挡。",
      ],
      states: [
        {
          state: "正常",
          what: "主战场占据最大视区，单位状态、小地图、目标与命令格在边缘实时刷新。",
          recovery: "输入、寻路、战斗、视野与关卡触发器共享同一逻辑钟，行为可预期。",
        },
        {
          state: "空状态",
          what: "还没有本地存档：战略地图干净展示第 1 关入口与真实存档状态，没有调试菜单。",
          recovery: "通关标识只来自真实结算存档，不用静态假状态。",
        },
        {
          state: "离线",
          what: "图集已载入后网络断开：当前关卡、检查点与本地存档在浏览器里照常运行。",
          recovery: "跨关切换需要新图集而网络不通时，明确提示重试，不会静默卡在黑屏。",
        },
        {
          state: "错误",
          what: "本地存档损坏，或运行时资产清单有缺失、不匹配的条目。",
          recovery: "构建前的门禁拦截资产缺漏；损坏存档安全退回关卡起点。",
        },
        {
          state: "拒绝",
          what: "限定关卡里未开放的命令明确置灰；战败界面写明原因。",
          recovery: "焦点落在「从检查点恢复」与「返回战略地图」上，兵力与任务状态一起还原。",
        },
      ],
    },
    outcome: {
      body: [
        "第一章《苍狼余火》能在桌面浏览器里连续通关。完成状态来自实际结算与存档数据。证据状态：五关验收来自本地 RC 记录，在线链接没有经过同样的审计。这些都是系统层面和浏览器层面的检查，没有外部玩家的结构化可用性测试。",
        "现有记录能证明的，是第一章在本地 RC 环境里能连续通关，已覆盖的交互逻辑和资产契约没有退化。「任务可以限制命令，但不能改变命令」这样的规则，测试守得住，第五关和第一关就按同一套语法核对。记录证明不了的，是新玩家能不能学会这套语法。每条规则都写成测试或浏览器能核对的样子。",
      ],
      limits: [
        {
          title: "没有外部玩家的结构化可用性测试。",
          body: "操作一致不等于操作好学，所以这个案例不能说游戏容易上手。",
        },
        {
          title: "五关验收来自本地 RC 记录，不是线上版本。",
          body: "在线链接能打开，但没有经过同样的审计。",
        },
        {
          title: "网页构建通过，但保留 Phaser 主包偏大的已知警告。",
          body: "主包偏大可能拖慢靠链接打开的首次加载，这一点还没量过。",
        },
      ],
      next: "找外部玩家做测试，记录他们在前两关卡在哪里。再在线上版本重做两种分辨率的通关，并先实测首次加载再拆包。",
    },
  },
};
