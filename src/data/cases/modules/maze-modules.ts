import type { CaseModulesRecord } from "@/lib/cases/modules-schema";

export const mazeModules: CaseModulesRecord = {
  slug: "maze",
  journey: [
    {
      id: "maze-sleeve-ritual",
      step: 1,
      title: {
        en: "Facilitated sleeve fitting & shared wristband coupling",
        zh: "协助佩戴手指套与跨玩家腕带耦合",
      },
      shortTitle: {
        en: "Sleeve fitting",
        zh: "佩戴指套",
      },
      trigger: {
        en: "Four strangers gather around the wooden maze table at the public exhibition",
        zh: "四位陌生观众在公开展览桌面四周就位准备开始一局",
      },
      userMentalModel: {
        en: "If each person gets a solo button, we'll play silently in parallel; shared wires make us figure out who needs to move together.",
        zh: "如果每人一把独立手柄就会各玩各的；共用连线与指套一开始就暗示必须彼此沟通配合。",
      },
      systemAction: {
        en: "A team member explains the rules and players put on the vibration finger sleeves; adjacent color wristbands (A/B, B/C) gate tilt axes so solo taps lock cleanly.",
        zh: "组员先讲解规则，玩家戴上震动手指套；相邻同色腕带电路耦合控制轴向，单人试按仅触发锁定提示，无法推动迷宫。",
      },
      cognitiveFriction: {
        en: "At the exhibition, gearing up took each group about a minute, and many players still struggled with the rules after the explanation.",
        zh: "展出时每组戴装备大约要一分钟，讲解之后仍有不少玩家没弄懂规则。",
      },
      edgeRecovery: {
        en: "If a single wristband taps alone, console & board immediately signal lock feedback so players discover co-touch rules without reading manuals.",
        zh: "若单人孤立触发，板面与控制台立刻给出清晰锁定提示，让陌生人不用看说明书就悟出协同规则。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "observed",
    },
    {
      id: "maze-safe-tilt",
      step: 2,
      title: {
        en: "Hold-to-move isolated servo actuation",
        zh: "「按住才动」的隔离舵机倾斜控制",
      },
      shortTitle: {
        en: "Hold-to-move",
        zh: "按住才动",
      },
      trigger: {
        en: "Coupled players bridge matching wristbands simultaneously",
        zh: "配对玩家同时触碰同色腕带形成通路",
      },
      userMentalModel: {
        en: "When we let go, the board should stop immediately instead of violently slamming or freezing the round.",
        zh: "一松手木板就该立刻停住，不能因为舵机乱甩伤人或卡死整轮计分。",
      },
      systemAction: {
        en: "SafeTouchServoController isolates tilt motors from the PlanB Mega feedback board and enforces hold-to-move bounds.",
        zh: "由独立的 SafeTouchServoController 接管舵机倾斜（按住才动并限位），彻底与 PlanB 主感测电路硬件隔离。",
      },
      cognitiveFriction: {
        en: "Running servo PWM on the same microcontroller as tight IR polling caused timing jitter and risked crashing the entire round.",
        zh: "早期将舵机与高灵敏红外轮询挤在同一块控制板上，造成时序竞争甚至一次舵机异常拖垮整局。",
      },
      edgeRecovery: {
        en: "Servo isolation allows mechanical fault resets without losing score, timer, or round state on the primary controller.",
        zh: "双控制器拆离后，舵机即便限位停机也不会弄丢主控板上的当前回合分数与计时。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "maze-ir-debounce",
      step: 3,
      title: {
        en: "Debounced 10-zone FC-51 IR ball detection",
        zh: "十路 FC-51 红外光束防抖与冷却判定",
      },
      shortTitle: {
        en: "IR debounce",
        zh: "红外防抖",
      },
      trigger: {
        en: "Rolling ball breaks an FC-51 infrared beam in trap, diagnostic, spare, or goal zone",
        zh: "滚动小球遮断陷阱区、诊断区、备用区或终点区的 FC-51 红外光束",
      },
      userMentalModel: {
        en: "Hitting one trap should subtract once and buzz once—never trigger three penalties for one roll.",
        zh: "撞到一次陷阱就该只扣一次分、只震一下手，绝不能经过一次光束连震三下。",
      },
      systemAction: {
        en: "Per-channel firmware debounce + cooldown gate compresses noisy IR bounce into exactly one atomic round event.",
        zh: "固件为十路红外各自设定防抖与冷却窗口，将原始电平抖动收敛为唯一一次原子回合事件。",
      },
      cognitiveFriction: {
        en: "Raw sensor reads double- and triple-fired on a single ball pass, causing score and finger buzz to disagree and breaking player trust.",
        zh: "未防抖前单次球经过触发两三次，导致计分牌与手指震动对不上，玩家立刻怀疑装置坏了。",
      },
      edgeRecovery: {
        en: "Bench tuning locked 1 ball pass = 1 event; cooldown duration trades a brief re-trigger blind window for absolute channel agreement.",
        zh: "台架调校锁定「一过一事件」；虽牺牲极短冷却窗内的二次连触，但保住了全系统状态绝对一致。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "bench-tested",
    },
    {
      id: "maze-five-way-sync",
      step: 4,
      title: {
        en: "Single round state machine fanning out to 5 channels",
        zh: "单一回合状态机同步驱动五路输出",
      },
      shortTitle: {
        en: "5-channel sync",
        zh: "五路同步",
      },
      trigger: {
        en: "Validated IR event advances the Mega round state machine",
        zh: "经过防抖确认的事件推进 Arduino Mega 回合状态机",
      },
      userMentalModel: {
        en: "The buzz on my finger, the sound, the lights, and the screen should feel like one unified physical consequence.",
        zh: "手指上的震动、音响提示、灯带变色与计分数字应当在同一瞬间齐发，像同一个物理世界在回应。",
      },
      systemAction: {
        en: "One state transition simultaneously fires relay sleeve vibration, buzzer audio, LED strip shift, TM1637 display, and Web Serial log.",
        zh: "单一事件扇出驱动：继电器指套震动、蜂鸣音效、LED 灯带、TM1637 数码管与 Web Serial 串口日志。",
      },
      cognitiveFriction: {
        en: "Exhibition play was observed across groups without per-channel telemetry logging, so exact channel contribution weights remain unmeasured.",
        zh: "现场多人游玩仅靠肉眼观察，未对各路反馈通道埋点统计，哪一路承载最多信息量尚未量化。",
      },
      edgeRecovery: {
        en: "Because every channel subscribes to one round state machine, subsystems can never contradict each other mid-game.",
        zh: "所有输出统一订阅同一个状态机，从结构上杜绝了「灯亮了但分没扣」的子系统撕裂。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      id: "maze-web-serial-parity",
      step: 5,
      title: {
        en: "Live Web Serial console & parity-tested Demo Mode",
        zh: "Web Serial 实机调试与一致性测试 Demo 模式",
      },
      shortTitle: {
        en: "Web Serial console",
        zh: "Web Serial 调试",
      },
      trigger: {
        en: "Operator connects Mega over USB Web Serial or portfolio reviewer opens browser Demo Mode",
        zh: "展场开发者通过 USB Web Serial 连接真机，或面试官在无硬件时打开浏览器 Demo 模式",
      },
      userMentalModel: {
        en: "Without the wooden board on my desk, the browser console should honestly demonstrate the exact firmware rules—not a fake movie.",
        zh: "手边没有实体木板时，网页控制台也应该忠实演练和真机一模一样的规则，而不是播假动画。",
      },
      systemAction: {
        en: "JS Canvas console mirrors live Mega serial frames when attached and runs deterministic trap/sync simulation offline, guarded by parity tests.",
        zh: "JS Canvas 控制台接硬件时实时镜像串口状态，离线时以同一套事件分发器运行 Demo，由回归测试锁死双向一致性。",
      },
      cognitiveFriction: {
        en: "Live Web Serial mode requires a desktop Chromium browser with USB permission, limiting mobile reviewers to Demo Mode.",
        zh: "Live 实机连接依赖桌面端 Chromium 浏览器的 USB 串口授权，移动端访客只能使用纯前端 Demo 模式。",
      },
      edgeRecovery: {
        en: "Automated regression suite checks serial sync, feedback sync, servo response, and audio parity on every change.",
        zh: "回归测试覆盖串口同步、反馈同步、舵机响应与音频一致性，防止代码演化导致 Demo 与固件漂移。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "synthetic-gate",
    },
  ],
  stateMatrix: [
    {
      state: "normal",
      label: { en: "Normal · Live / Demo Loop Active", zh: "正常态 · 实机或 Demo 运行中" },
      entryCondition: {
        en: "Round started; players co-touch matching bands or trigger simulated trap/goal steps in browser console.",
        zh: "回合启动；玩家完成腕带双人耦合，或在控制台触发正常推演与陷阱测试。",
      },
      uiFeedback: {
        en: "TM1637 score/timer, LED strip, sleeve haptics, audio cue, and Canvas event log respond together on every validated event.",
        zh: "TM1637 计分计时、灯带、指套震动、音效与网页日志在每次事件发生时严格同步刷新。",
      },
      keyboardFocus: {
        en: "Browser console supports accessible button/Arrow key triggers (Start, Trap Test, Reset) with visible focus rings.",
        zh: "浏览器控制台与互动棋盘支持键盘 Start、Trap Test、方向键与复位操作，焦点轮廓清晰。",
      },
      fallbackGuarantee: {
        en: "IR debounce + cooldown enforces 1:1 physical-to-digital round counting; servo holds only while contacts close.",
        zh: "防抖冷却保证一次过球记一次账；舵机严格遵守「按住才动」安全边界。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "empty",
      label: { en: "Empty · Pre-Round / Solo Lock", zh: "空状态 · 待开局或单人锁定" },
      entryCondition: {
        en: "Maze waiting for Start command, or only one player touches a wristband without a partner.",
        zh: "尚未按下 Start 开局，或仅有一名玩家单手触碰腕带而无同伴配合。",
      },
      uiFeedback: {
        en: "Displays idle readiness or immediate 'Co-touch required' lock indicator rather than ignoring the tap silently.",
        zh: "显式展示待机准备状态或即时弹出「需双人耦合」锁定提示，不让单人试按石沉大海。",
      },
      keyboardFocus: {
        en: "Focus rests cleanly on Start / Mode switch controls.",
        zh: "焦点停留在 Start 与模式切换控件，路径明确。",
      },
      fallbackGuarantee: {
        en: "Zero tilt actuation occurs on solo contact—preserving collaborative physical dependency.",
        zh: "单人触碰下舵机零动作，守住多人协同交互的物理门槛。",
      },
      focusTags: ["ux-research", "systems-hardware"],
      verifiedStatus: "observed",
    },
    {
      state: "offline",
      label: { en: "Offline · No USB Hardware Attached", zh: "离线态 · 未接入实体迷宫硬件" },
      entryCondition: {
        en: "Browser opens console without Arduino Mega connected over USB Web Serial (standard portfolio/interview context).",
        zh: "浏览器未通过 USB Web Serial 连接 Arduino Mega（日常远程审阅与面试常见场景）。",
      },
      uiFeedback: {
        en: "Automatically surfaces Demo Mode banner explaining no hardware is attached while keeping all 5 channels inspectable.",
        zh: "明确标注当前处于无硬件 Demo 模式，同时完整保留 5 路同步通道的实时可视化推演。",
      },
      keyboardFocus: {
        en: "All Demo Mode controls remain fully keyboard-operable without triggering browser serial permission modals unexpectedly.",
        zh: "Demo 模式所有按钮均支持纯键盘操作，不会强弹浏览器串口授权窗阻断浏览。",
      },
      fallbackGuarantee: {
        en: "Parity regression tests verify Demo Mode matches real firmware event sequencing and cooldown logic.",
        zh: "一致性回归测试担保 Demo 模式事件顺序与冷却规则与真实 Mega 固件同源。",
      },
      focusTags: ["systems-hardware", "ux-research"],
      verifiedStatus: "synthetic-gate",
    },
    {
      state: "error",
      label: { en: "Error · Sensor Jitter / Serial Drop / Servo Fault", zh: "错误态 · 串口断开或通道异常" },
      entryCondition: {
        en: "USB cable unplugs mid-session, Web Serial API unsupported (e.g., mobile Safari), or servo controller faults.",
        zh: "对局中拔掉 USB 线、浏览器不支持 Web Serial，或独立舵机控制器触发限位保护。",
      },
      uiFeedback: {
        en: "Console logs exact serial disconnect / unsupported browser reason and offers instant fallback to Demo Mode.",
        zh: "日志精确记录串口断开或环境不支持原因，并提供一键降级为 Demo 模式。",
      },
      keyboardFocus: {
        en: "Focus recovers cleanly to Reset / Demo Mode controls without trapping the browser tab.",
        zh: "异常发生后焦点可顺畅移回复位或 Demo 模式切换键，绝不卡死页面。",
      },
      fallbackGuarantee: {
        en: "Dedicated diagnostic IR zone aids bench pin checks; servos run on a separate Uno that shares the Mega's ground.",
        zh: "板载专用诊断红外区辅助现场排查走线；舵机跑在单独一块 Uno 上，和 Mega 共地。",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
    {
      state: "refused",
      label: { en: "Refused · Unsafe Shock & Unbuffered Input", zh: "拒绝态 · 安全边界硬拦截" },
      entryCondition: {
        en: "Concept attempts hazardous electrical feedback, or rapid sensor bounce hits inside an active cooldown window.",
        zh: "早期方案涉及不可校准的人体电击惩罚，或球体在同一冷却窗内触发硬件抖动连击。",
      },
      uiFeedback: {
        en: "Hardware routes feedback to relay-driven sleeve vibration motors; a three-sample debounce and a 400 ms cooldown suppress duplicate triggers.",
        zh: "反馈只走继电器驱动的指套震动马达；三次取样去抖加 400 ms 冷却，拦下重复触发，保持单事件计数。",
      },
      keyboardFocus: {
        en: "Hold-to-move stops tilt immediately upon key/contact release.",
        zh: "一旦松开按键或断开腕带接触，舵机输出即刻归零停转。",
      },
      fallbackGuarantee: {
        en: "There is no shock hardware in the build, and one ball pass cannot charge two penalties.",
        zh: "成品里没有电击硬件，一次过球也不会被扣两次分。",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "observed",
    },
  ],
  rejectionArchive: [
    {
      id: "maze-reject-electric-shock",
      round: { en: "Mid-Fi Decision", zh: "Mid-Fi 阶段决定" },
      date: "2026-04",
      artifactBefore: {
        en: "Mild electric shock trap concept delivered on wall contact",
        zh: "初版构想：撞击迷宫陷阱时施加轻微电流电击惩罚",
      },
      failureExposed: {
        en: "Complexity and safety could not both be met (decision record, 25 Apr 2026).",
        zh: "复杂度与安全性均无法达标（2026 年 4 月 25 日的决定记录）。",
      },
      fixApplied: {
        en: "Replaced shock hardware entirely with relay-driven vibration motors inside wearable finger sleeves.",
        zh: "彻底废除电击电路，改用继电器驱动的可穿戴手指套震动马达把触觉安全留在身体上。",
      },
      sourceReceipt: {
        en: "02-bracelet-finger-sleeve.png + PlanB firmware haptic module",
        zh: "02-bracelet-finger-sleeve.png 实物构建与 PlanB 震动固件模块",
      },
      focusTags: ["ai-trust", "ux-research"],
      verifiedStatus: "observed",
    },
    {
      id: "maze-reject-raw-ir-polling",
      round: { en: "Bench Calibration & Console Sync", zh: "台架传感器与控制台联调" },
      date: "2026-05",
      artifactBefore: {
        en: "Uncalibrated raw FC-51 IR polling mixed on one microcontroller with servo PWM",
        zh: "将未防抖的 FC-51 红外原始电平读取与舵机驱动混跑在单块板子上",
      },
      failureExposed: {
        en: "One ball pass could fire more than once, putting score and buzz out of sync.",
        zh: "小球滚过一次可能触发不止一次，分数和手指震动就对不上。",
      },
      fixApplied: {
        en: "Gave each sensor a three-sample debounce and a 400 ms cooldown feeding one Mega round state machine, put tilt on its own Uno (SafeTouchServoController), and wrote serial/feedback/servo/audio parity tests.",
        zh: "十路红外各加三次取样去抖与 400 ms 冷却，收拢进 Mega 上的单一状态机；倾斜放到单独一块 Uno（SafeTouchServoController），并补齐四类一致性回归测试。",
      },
      sourceReceipt: {
        en: "04-engineering-overview.png + firmware/web parity regression suite",
        zh: "04-engineering-overview.png 工程架构与串口/反馈一致性测试集",
      },
      focusTags: ["systems-hardware", "ai-trust"],
      verifiedStatus: "bench-tested",
    },
  ],
};
