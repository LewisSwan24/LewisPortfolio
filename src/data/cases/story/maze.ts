import type { CaseStory } from "./types";

/**
 * Sources: src/data/cases/maze.ts (summary, narrative, designDecisions,
 * interactiveDemo, media), src/data/cases/modules/maze-modules.ts
 * (stateMatrix, rejectionArchive), src/lib/proof/case-depth.ts (limits).
 */
export const mazeStory: CaseStory = {
  en: {
    problem:
      "A physical maze just sits there. Making it read as a responsive multiplayer system meant tying sensing, game state, and feedback together in real time.",
    roleLine:
      "Design technologist in a team project: I wrote the IR and vibration code, drafted the servo code that an AI tool rewrote, did the wiring and testing, and built the web console.",
    result:
      "A ball passing a sensor advances round state and drives score, timer, haptics, lights, audio, and the browser console together. Built and exhibited.",
    problemBody: [
      "The brief was a physical maze game for a public exhibition. The failure mode showed up in the first build: a nice object that people pushed a ball around while nothing happened. Scoring lived in someone's head, traps were painted lines, and the only feedback was other players laughing.",
      "The design problem was not the maze. It was making the system notice events and answer them fast enough that players can follow what just happened. Score, timer, vibration, lights, audio, and a browser console were each a channel that could carry or muddy the same event.",
      "The players were exhibition visitors, observed across 9 groups (36 people). A team member explained the rules before each round.",
    ],
    decisions: [
      {
        id: "decision-shared-wristbands",
        title: "Nobody steers alone",
        conflict:
          "With one control per person, each visitor can play alone and nothing makes the group act together.",
        chosen:
          "Shared color wristbands are paired across players (A/B, B/C coupling), so no single person can drive any direction alone. One person alone gets immediate lock feedback, while paired touch drives all five synchronized channels.",
        gaveUp:
          "Buttons and a joystick, the first concept, were rejected as too much like an arcade game. Weight sensing or a five-finger pressure pad was considered but never tested.",
        evidence:
          "Putting on wristbands and finger sleeves took each group about a minute, and many players struggled with the rules even after a team member explained them.",
      },
      {
        id: "decision-vibration-debounce",
        title: "A buzz on the finger instead of a shock, and one ball pass is one event",
        conflict:
          "The electric-shock idea could not meet both complexity and safety, and a raw IR double-fire makes the score and the buzz on your finger disagree.",
        chosen:
          "Relay-driven vibration motors in finger sleeves keep feedback on the body. Each IR sensor needs three consecutive samples and then cools down for 400 ms, so one ball pass is one round event.",
        gaveUp:
          "The mild electric shock trap from the initial concept, dropped at the Mid-Fi stage (25 Apr 2026). Vibration is a gentler sensation, and the cooldown introduces a brief blind window for rapid re-triggers.",
        evidence:
          "Raw IR reads could fire more than once on one ball pass, so score and buzz disagreed. Bench testing tuned debounce and cooldown until one ball pass produced exactly one game event.",
      },
      {
        id: "decision-one-console",
        title: "The portfolio demo runs the exhibition's own rules",
        conflict:
          "Exhibition wiring degrades without fast bench diagnostics, yet people reading a web portfolio never own an Arduino Mega harness.",
        chosen:
          "The JS Canvas console shares one event dispatcher. When USB Serial connects to the Arduino Mega it logs live traps and relays; without hardware attached it replays the same trap, score, and haptic state transitions in the browser.",
        gaveUp:
          "Text-only serial logs plus a scripted video, which hide which of the 10 IR zones jittered and cannot prove trap timing. Two separate consoles for the exhibition laptop and the portfolio, which would drift apart. Live mode still needs desktop Chromium with USB permission.",
        evidence:
          "Parity tests caught drift whenever the firmware or the console was edited alone.",
      },
    ],
    watchFor:
      "Watch for the lock: tap one wristband alone and the maze refuses to move; switch to two-player co-touch and steer the orb to GOAL.",
    tryLinks: [
      { href: "https://maze.lewisdong.com", label: "Open the exhibition console in demo mode ↗" },
      { href: "/studio/replay?track=maze", label: "Inspect millisecond protocol frames in Replay Studio →" },
    ],
    built: {
      body: [
        "Everything hangs off a single round state machine. A ball breaks an IR beam, round state advances, and that one event fans out: score and timer displays update, a vibration pulse fires in the player's finger sleeve, the LED strip and speaker respond, and the browser console logs it.",
        "Platform tilt runs on its own Uno (SafeTouchServoController) with hold-to-move behavior, the ball launcher's stepper on a second Uno, and the Mega handles sensing; all boards share one ground.",
      ],
      tested: [
        "Bench: debounce and cooldown tuned on the FC-51 IR array until one ball pass produced exactly one game event.",
        "Regression tests: serial sync, feedback sync, servo response, and audio parity, so the demo cannot quietly drift away from the firmware.",
        "Exhibition, June 2026: 9 groups (36 people) played. Some players were surprised by the vibration the first time. Play was observed, not instrumented.",
      ],
      states: [
        {
          state: "Normal",
          what: "Score, timer, LED strip, sleeve haptics, audio cue, and the event log respond together on every validated event.",
          recovery: "Debounce and cooldown keep one ball pass to one count; the servo holds only while contacts close.",
        },
        {
          state: "Empty",
          what: "Before Start, or one player touching a wristband alone: an idle or 'Co-touch required' cue instead of a silent tap.",
          recovery: "Zero tilt on solo contact.",
        },
        {
          state: "Offline",
          what: "No Arduino Mega over USB: a Demo Mode banner, with all 5 channels still inspectable.",
          recovery: "Parity tests keep Demo Mode on the firmware's event order and cooldown.",
        },
        {
          state: "Error",
          what: "USB unplugged, Web Serial unsupported, or a servo fault: the console logs the reason.",
          recovery: "One step back to Demo Mode; a diagnostic IR zone helps bench pin checks.",
        },
        {
          state: "Refused",
          what: "Shock feedback, or a sensor bounce inside an active cooldown.",
          recovery: "There is no shock hardware in the build, and one ball pass cannot charge two penalties.",
        },
      ],
    },
    outcome: {
      body: [
        "A working, exhibited system: firmware modules for game state, IR sensing, player chain input, vibration and audio; a Mega plus two Uno boards on a shared ground; and a browser console with parity tests.",
        "The strongest lesson was that on hardware, timing is design. Debounce sounds like an electronics detail until a double-fire makes the score disagree with the buzz on your finger, and the player stops trusting the system. The weakest part is that I proved the loop works without measuring which parts of it mattered.",
      ],
      limits: [
        {
          title: "Exhibition play was observed, not instrumented.",
          body: "I can describe what players reacted to, but I cannot quantify which feedback channel carried the most information.",
        },
        {
          title: "The build is a single exhibition unit, not a manufacturable product.",
          body: "Wiring is hand-run and calibration is per-venue, so nothing here proves durability, yield, or repeatable assembly.",
        },
      ],
      next:
        "Log sensor events, feedback fires, and completion times per session, then compare rounds with channels selectively disabled, and cut the channels players ignore.",
    },
  },
  zh: {
    problem:
      "实体迷宫本身是静止的。要让迷宫像一个会回应的多人系统，必须把感测、游戏状态和反馈实时绑在一起。",
    roleLine:
      "团队项目，我做交互原型。红外与震动程序由我编写，舵机程序由 AI 工具在我的草稿上改写，接线、测试与网页控制台由我负责。",
    result:
      "球经过传感器就推进回合状态，并同时驱动计分、计时、震动、灯光、音效与浏览器控制台。已完成搭建并展出。",
    problemBody: [
      "题目是给公开展览做一台实体迷宫游戏。第一版就暴露了失败模式：一个还算好看的物件，人们推着球转，但什么都没发生。计分靠人记，陷阱是画上去的线，唯一的反馈是旁边的人在笑。",
      "真正的设计问题不是迷宫本身。系统要察觉到事件，并且回应得够快，让玩家看得出刚才发生了什么。计分、计时、震动、灯光、音效与浏览器控制台，每一个都可能承载、也可能搅浑同一个事件。",
      "玩家是展览观众，现场观察了 9 组共 36 人。每轮开始前由组员讲解规则。",
    ],
    decisions: [
      {
        id: "decision-shared-wristbands",
        title: "谁都不能一个人操控",
        conflict: "如果一人一套操控，每个人都能各玩各的，没有什么逼大家一起行动。",
        chosen:
          "相邻玩家共用同色腕带（A/B、B/C 耦合），任何人都无法单独驱动一个方向。单人触碰会立刻得到锁定提示，两人配对才同步驱动计分、震动、灯带与串口。",
        gaveUp:
          "最初构想的按钮加摇杆，因为太像街机游戏而放弃。体重感应或五指压力板只停在构思阶段，没有测试过。",
        evidence: "每组戴腕带和指套大约要一分钟；组员讲解之后，仍有不少玩家没弄懂规则。",
      },
      {
        id: "decision-vibration-debounce",
        title: "用指尖震动代替电击，一次过球只算一次",
        conflict: "电击设想的复杂度与安全性无法同时达标；原始红外一旦重复触发，计分与手指上的震动就对不上。",
        chosen:
          "继电器驱动的指套震动马达把触觉留在身体上。每个红外传感器要连续三次取样才触发，之后冷却 400 ms，一次过球就是一个回合事件。",
        gaveUp:
          "最初构想的轻微电击陷阱，在 Mid-Fi 阶段（2026 年 4 月 25 日）放弃。震动的冲击感比电击弱，冷却窗口也会留下短暂盲区，很快的第二次触发会漏掉。",
        evidence:
          "原始红外读数在一次经过里可能触发不止一次，计分与震动就对不上。台架测试反复调校防抖与冷却，直到一次过球刚好产生一个游戏事件。",
      },
      {
        id: "decision-one-console",
        title: "作品集里的 demo 跑的就是展场的规则",
        conflict: "没有直观的串口监控，现场接线故障很难排查；可是看网页作品集的人手边不会有 Arduino Mega 迷宫。",
        chosen:
          "JS Canvas 控制台只有一个事件分发器。接上 USB Serial 时，直接读取 Mega 的 10 路实时状态。没有硬件时，在浏览器里回放同样的陷阱、计分与震动状态变化。",
        gaveUp:
          "只看串口文本日志、作品集放一段录屏：看不出 10 路传感器哪一路在抖，也证明不了陷阱时序。展场电脑和作品集各做一套控制台：两边很快会分叉。Live 模式仍然需要桌面 Chromium 和 USB 授权。",
        evidence: "只改固件或只改控制台时，一致性测试都抓出了漂移。",
      },
    ],
    watchFor: "注意看锁定：一个人点腕带，迷宫不动；切到双人同时触碰，才能把球送到终点。",
    tryLinks: [
      { href: "https://maze.lewisdong.com", label: "以 demo 模式打开展场控制台 ↗" },
      { href: "/studio/replay?track=maze", label: "进入硬件协议帧步进重放工作台 →" },
    ],
    built: {
      body: [
        "所有东西都挂在同一个回合状态机上。球打断红外光束，回合状态推进。这一个事件随即分头触发：计分计时更新，指套里的震动脉冲触发，灯带与扬声器回应，浏览器控制台记录。",
        "平台倾斜放在单独一块 Uno 上（SafeTouchServoController），采用「按住才动」。发球机的步进电机在另一块 Uno 上，Mega 负责感测，所有板子共地。",
      ],
      tested: [
        "台架：在 FC-51 红外阵列上调校防抖与冷却，直到一次过球刚好产生一个游戏事件。",
        "回归测试：串口同步、反馈同步、舵机响应与音频一致性，让 demo 不会悄悄偏离固件。",
        "展览，2026 年 6 月：9 组共 36 人试玩。有些玩家第一次被震动吓了一跳。现场是观察记录，没有做数据埋点。",
      ],
      states: [
        {
          state: "正常",
          what: "每次确认过的事件，计分计时、灯带、指套震动、音效与网页日志同时刷新。",
          recovery: "防抖冷却保证一次过球记一次账；舵机只在接触时才动。",
        },
        {
          state: "空状态",
          what: "还没开局，或只有一人触碰腕带：显示待机或「需双人耦合」提示，单人试按不会石沉大海。",
          recovery: "单人触碰时舵机零动作。",
        },
        {
          state: "离线",
          what: "没有通过 USB 连接 Mega：标出 Demo 模式，5 路通道仍然可以逐一查看。",
          recovery: "一致性测试让 Demo 模式沿用固件的事件顺序与冷却规则。",
        },
        {
          state: "错误",
          what: "拔掉 USB、浏览器不支持 Web Serial，或舵机故障：日志写明原因。",
          recovery: "一键退回 Demo 模式；专用诊断红外区帮助现场排查走线。",
        },
        {
          state: "拒绝",
          what: "电击反馈，或冷却窗内的传感器抖动连击。",
          recovery: "成品里没有电击硬件，一次过球也不会被扣两次分。",
        },
      ],
    },
    outcome: {
      body: [
        "这套系统实际运行并展出过。固件模块涵盖游戏状态、红外感测、玩家链路输入、震动与音频。硬件由一块 Mega 加两块 Uno 共地分工，并配有带一致性测试的浏览器控制台。",
        "最重要的一课是：在硬件上，时序就是设计。防抖听起来像电子细节，直到一次重复触发让分数和手指上的震动对不上，玩家就不再信任这套系统。最弱的一环是我证明了整条物理回路能跑通，却没有测量其中哪些部分真正起作用。",
      ],
      limits: [
        {
          title: "展览游玩是观察记录，没有做数据埋点。",
          body: "我能描述玩家对什么有反应，但无法量化哪一种反馈通道承载了最多信息。",
        },
        {
          title: "这是一台展览用的单机，不是可量产的产品。",
          body: "接线是手工走的，校准要按场地来，所以无法证明耐久性、良率或可重复的组装流程。",
        },
      ],
      next: "记录每场的传感器事件、反馈触发与完成时间，再对比选择性关闭某些通道的回合，砍掉玩家忽略的通道。",
    },
  },
};
