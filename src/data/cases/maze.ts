import type { CaseRecord } from "@/lib/cases/schema";

export const mazeCase: CaseRecord = {
  "slug": "maze",
  "status": "listed",
  "featuredOrder": 1,
  "roleTracks": [
    "interaction",
    "design-eng"
  ],
  "workSummary": {
    "order": 1,
    "tags": ["flag", "hardware"],
    "year": "2026",
    "dur": "Built",
    "problem": {
      "en": "A physical maze that gave players no real-time feedback",
      "zh": "一座毫无反馈的木质实体迷宫"
    },
    "changed": {
      "en": "Sensor events driving synchronized score, haptics, light, audio, and a web console",
      "zh": "一次传感器触发同时联动计分、触觉、灯光、音效与网页控制台"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Verified exhibition build scope, Arduino firmware role, and media assets for V3.1 baseline."
  },
  "cover": {
    "src": "/projects/maze/06-final-contact.jpg",
    "width": 1800,
    "height": 1200,
    "alt": {
      "en": "Two players' hands over the lit maze at the exhibition, each finger in a wired sleeve",
      "zh": "展览现场，两位玩家的手悬在亮着灯的迷宫上方，手指都套着接了线的指套"
    },
    "fit": "cover"
  },
  "links": [],
  "media": {
    "label": "Build evidence",
    "labelZh": "展览实物",
    "blurb": "Exhibition photographs of the physical build alongside a video clip of the working feedback circuit.",
    "blurbZh": "展览现场实拍照片，搭配反馈电路实际运转的实录视频。",
    "images": [
      {
        "src": "/projects/maze/01-exhibition-setup.png",
        "width": 900,
        "height": 520,
        "alt": "The MazeRunners table set up at the exhibition with players around it",
        "altZh": "MazeRunners 在展览现场的桌面布置，玩家围在四周",
        "caption": "Exhibition setup, mid-round.",
        "captionZh": "展览现场，回合进行中。"
      },
      {
        "src": "/projects/maze/02-bracelet-finger-sleeve.png",
        "width": 900,
        "height": 520,
        "alt": "Close-up of the wearable finger sleeve that delivers vibration feedback",
        "altZh": "提供震动反馈的可穿戴手指套特写",
        "caption": "The finger sleeve — where the trap actually lands.",
        "captionZh": "手指套：陷阱真正落在这里。"
      },
      {
        "src": "/projects/maze/03-wiring-layer.png",
        "width": 900,
        "height": 520,
        "alt": "The wiring layer underneath the maze board",
        "altZh": "迷宫板下方的接线层",
        "caption": "Wiring layer under the board.",
        "captionZh": "板子底下的接线层。"
      },
      {
        "src": "/projects/maze/04-engineering-overview.png",
        "width": 1536,
        "height": 1024,
        "alt": "Annotated engineering overview of sensors, controllers, and feedback hardware",
        "altZh": "带标注的工程总览：传感器、控制器与反馈硬件",
        "caption": "Annotated overview: sensors, controllers, feedback.",
        "captionZh": "带标注的总览：传感器、控制器、反馈。"
      }
    ],
    "video": {
      "src": "/projects/maze/05-planb-circuit.mp4",
      "poster": "/projects/maze/05-planb-circuit-thumbnail.jpg",
      "caption": "The PlanB feedback circuit running.",
      "captionZh": "PlanB 反馈电路运行录像。"
    }
  },
  "demo": {
    "src": "https://maze-runners.vercel.app",
    "poster": "/projects/maze/01-exhibition-setup.png",
    "title": "MazeRunners interactive demo",
    "titleZh": "MazeRunners 互动 demo",
    "posterAlt": "MazeRunners at the exhibition; click to start the interactive demo",
    "posterAltZh": "MazeRunners 展览现场，点击开始互动 demo",
    "label": "Play it yourself",
    "labelZh": "自己玩玩看",
    "blurb": "This is the same console that drives the physical maze, running in demo mode with no hardware attached. Hit Start, then Trap Test, and watch the score, the haptic channels, and the event log all answer the same event.",
    "blurbZh": "这是驱动实体迷宫的同一套控制台，跑在 demo 模式下，不用接硬件。按 Start 开一局，再按 Trap Test，看计分、震动通道和事件日志同时反应。",
    "action": "Load the interactive demo",
    "actionZh": "载入互动 demo"
  },
  "interactiveDemo": {
    "id": "maze-contact",
    "placement": "after-summary",
    "eyebrow": {
      "en": "Interactive prototype · 4-player co-touch gate",
      "zh": "可操作活原型 · 四人触控协同迷宫"
    },
    "title": {
      "en": "Test why one player alone cannot move the maze",
      "zh": "亲手试一下为什么单人点按无法驱动迷宫"
    },
    "prompt": {
      "en": "Tap a wristband in Single-player mode to feel the lock, then switch to Two-player co-touch (or press Arrow keys on the grid) to steer the orb to GOAL.",
      "zh": "先在「单人试按」模式下点击任意腕带感受方向锁定，再切换为「双人同时触碰」（或聚焦棋盘按方向键）协同把球送到终点。"
    },
    "takeaway": {
      "en": "Collaborative hardware turns physical co-presence into an explicit state gate: one person alone gets immediate lock feedback, while paired touch drives all five synchronized channels.",
      "zh": "协作型物理交互把「双人在场」编码为明确的状态门控：单人触碰即时给出锁定提示，双人配对则同步驱动计分、震动、灯带与串口。"
    }
  },
  "card": {
    "en": {
      "kicker": "Flagship · Physical computing",
      "title": "MazeRunners",
      "sub": "A maze that hits back — sensors, haptics, and a browser console in one loop.",
      "role": "Design Technologist",
      "date": "2026 · built & exhibited",
      "m1": "Arduino Mega · 10 IR sensors",
      "m2": "Vibration replaced electric shock",
      "m3": "Web Serial live + demo console"
    },
    "zh": {
      "kicker": "旗舰 · 物理计算",
      "title": "MazeRunners",
      "sub": "一台会回手的迷宫：传感器、震动与浏览器控制台接成同一个闭环。",
      "role": "Design Technologist",
      "date": "2026 · 已搭建并展出",
      "m1": "Arduino Mega · 10 个红外传感器",
      "m2": "用震动取代电击",
      "m3": "Web Serial 实时 + demo 控制台"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "MazeRunners",
        "sub": "A physical maze wired so that a ball, a score, a buzz on your finger, and a browser console all describe the same moment."
      },
      "roleVal": "Design technologist & interaction prototyper",
      "timeVal": "2026 · built and exhibited",
      "teamVal": "Team project; I owned firmware, sensing, feedback, and the web console",
      "toolsVal": "Arduino Mega · Arduino C/C++ · FC-51 IR · TM1637 · Web Serial · JS Canvas",
      "ch": {
        "label": "The problem",
        "title": "A maze is furniture until it answers you.",
        "p": "The brief was a physical maze game for a public exhibition. The failure mode showed up in the first build: a nice object that people pushed a ball around while nothing happened. Scoring lived in someone's head, traps were painted lines, and the only feedback was other players laughing. The design problem was not the maze — it was making the system notice events and answer them fast enough that a stranger learns the rules without being told."
      },
      "re": {
        "label": "Groundwork",
        "title": "Working out what the system must sense, and what it must never do.",
        "m1": {
          "t": "Sensor mapping",
          "b": "IR sensors assigned across trap, diagnostic, spare, and finish zones, each calibrated with its own trigger behavior."
        },
        "m2": {
          "t": "Safety review",
          "b": "The original trap concept was a mild electric shock. Unsupervised exhibition play made per-person consent and calibration impossible."
        },
        "m3": {
          "t": "Feedback inventory",
          "b": "Score, timer, vibration, lights, audio, and a browser console — each a channel that could carry or muddy the same event."
        },
        "quote": "People don't read the score display. They feel the buzz and look up.",
        "quoteWho": "Observation from exhibition play"
      },
      "sy": {
        "label": "System concept",
        "title": "One event, many channels, one round state machine.",
        "p": "Everything hangs off a single round state machine. A ball breaks an IR beam, round state advances, and that one event fans out: score and timer displays update, a vibration pulse fires in the player's finger sleeve, the LED strip and speaker respond, and the browser console logs it. Subsystems reacting independently is exactly what made the first build feel like unrelated gadgets screwed to plywood."
      },
      "id": {
        "label": "Technical decisions",
        "p": "Vibration replaced the electric shock: relay-driven motors in wearable finger sleeves keep the sensation on the body without a risk that needs supervision. Each IR sensor got debounce and a cooldown window, because raw reads double- and triple-fired on a single pass and broke agreement between score, timer, and haptics. Platform tilt moved to its own SafeTouchServoController with hold-to-move behavior, so servo motion stopped competing with time-sensitive sensor polling and a servo fault could not take down the round."
      },
      "pr": {
        "label": "The web console",
        "p": "A browser-based system console connects over Web Serial and mirrors the maze live: score and timer HUD, hardware bay, event log, and feedback simulation on a canvas. It also runs standalone in demo mode, because the hardware is not in the room during development — or in a portfolio, or an interview. Regression tests cover serial sync, feedback sync, servo response, and audio parity so the demo cannot quietly drift away from what the firmware does."
      },
      "te": {
        "label": "Testing and iteration",
        "p": "Bench testing tuned debounce and cooldown until one ball pass produced exactly one game event. Parity tests caught drift whenever the firmware or the console was edited alone. Group play at the exhibition then surfaced what the bench could not: players reacted to vibration and audio faster than to the score display, and the finger sleeves had to be fitted for people rather than self-fitted — the setup ritual turned out to be part of the interaction."
      },
      "ou": {
        "label": "What it produced",
        "m1": {
          "label": "State",
          "v": "One round state machine"
        },
        "m2": {
          "label": "Feedback",
          "v": "5 synchronized channels"
        },
        "m3": {
          "label": "Control",
          "v": "Live + demo console"
        },
        "p": "A working, exhibited system: firmware modules for game state, IR sensing, player chain input, vibration and audio; a two-controller hardware split; and a browser console with parity tests. Evidence status — this is a university project built for one exhibition. Play was observed, not instrumented, so I can describe what players reacted to but cannot quantify which channel carried the most information."
      },
      "rf": {
        "label": "Reflection",
        "p": "The strongest lesson was that on hardware, timing is design. Debounce sounds like an electronics detail until a double-fire makes the score disagree with the buzz on your finger, and the player stops trusting the system. The weakest part is that I proved the loop works without measuring which parts of it mattered — rebuilding it, I would log every sensor event and feedback fire from day one, then start switching channels off to find out which ones players were actually using."
      }
    },
    "zh": {
      "hero": {
        "title": "MazeRunners",
        "sub": "一台接好线的实体迷宫：球、分数、手指上的一下震动、浏览器控制台，说的都是同一个瞬间。"
      },
      "roleVal": "Design Technologist / 交互原型开发",
      "timeVal": "2026 · 已搭建并展出",
      "teamVal": "团队项目；我负责固件、感测、反馈与网页控制台",
      "toolsVal": "Arduino Mega · Arduino C/C++ · FC-51 红外 · TM1637 · Web Serial · JS Canvas",
      "ch": {
        "label": "问题",
        "title": "迷宫在会回应你之前，只是一件家具。",
        "p": "题目是给公开展览做一台实体迷宫游戏。第一版就暴露了失败模式：一个还算好看的物件，人们推着球转，但什么都没发生。计分靠人记，陷阱是画上去的线，唯一的反馈是旁边的人在笑。真正的设计问题不是迷宫本身，而是让系统察觉到事件，并且回应得够快，让一个陌生人不用被讲解就学会规则。"
      },
      "re": {
        "label": "前期工作",
        "title": "先弄清系统必须感知什么，以及绝对不能做什么。",
        "m1": {
          "t": "传感器规划",
          "b": "10 个 FC-51 红外传感器分布在陷阱区、诊断区、备用区与终点区，每一个都需要自己的触发行为。"
        },
        "m2": {
          "t": "安全评估",
          "b": "最初的陷阱概念是轻微电击。无人看管的展览场景让逐人取得同意与校准变得不可能。"
        },
        "m3": {
          "t": "反馈盘点",
          "b": "计分、计时、震动、灯光、音效与浏览器控制台：每一个都是可能承载、也可能搅浑同一事件的通道。"
        },
        "quote": "大家不看计分屏。他们先感觉到那一下震动，然后才抬头。",
        "quoteWho": "展览现场的观察"
      },
      "sy": {
        "label": "系统概念",
        "title": "一个事件，多个通道，一个回合状态机。",
        "p": "所有东西都挂在同一个回合状态机上。球打断红外光束，回合状态推进，这一个事件随即分头触发：计分与计时更新、玩家手指套里的震动脉冲触发、灯带与扬声器回应、浏览器控制台记录。各子系统各自反应，正是第一版让整台迷宫像是一堆拧在木板上的无关小装置的原因。"
      },
      "id": {
        "label": "技术决策",
        "p": "用震动取代电击：继电器驱动的马达装在可穿戴手指套里，把感受留在身体上，同时去掉需要专人看管的风险。每个红外传感器都加了防抖与冷却窗口，因为原始读数会在一次经过里重复触发两三次，让计分、计时与震动对不上。平台倾斜移交给独立的 SafeTouchServoController，采用「按住才动」，让舵机运动不再和对时间敏感的传感器轮询抢资源，一次舵机故障也不会拖垮整轮。"
      },
      "pr": {
        "label": "网页控制台",
        "p": "一个浏览器端的系统控制台通过 Web Serial 连上迷宫并实时镜像：计分计时 HUD、硬件面板、事件日志，以及画布上的反馈模拟。它也能以 demo 模式独立运行：因为开发时硬件不一定在手边，放进作品集或面试场合更不会在。回归测试覆盖串口同步、反馈同步、舵机响应与音频一致性，让 demo 不会悄悄偏离固件真正的行为。"
      },
      "te": {
        "label": "测试与迭代",
        "p": "台架测试反复调校防抖与冷却，直到一次球的经过刚好产生一个游戏事件。一致性测试则在只改动固件或只改动控制台时抓出漂移。之后展览上的多人游玩暴露了台架测不出来的东西：玩家对震动和音效的反应比对计分屏更快，而手指套需要别人帮忙戴，这个佩戴过程本身就是交互的一部分。"
      },
      "ou": {
        "label": "产出与边界",
        "m1": {
          "label": "状态",
          "v": "单一回合状态机"
        },
        "m2": {
          "label": "反馈",
          "v": "5 条同步通道"
        },
        "m3": {
          "label": "控制",
          "v": "实时 + demo 控制台"
        },
        "p": "一套真的在运行、也真的展出过的系统：涵盖游戏状态、红外感测、玩家链路输入、震动与音频的固件模块；双控制器的硬件拆分；以及带一致性测试的浏览器控制台。证据状态：这是为一次展览搭建的课程项目。现场游玩是观察记录，不是数据埋点，所以我能描述玩家对什么有反应，但无法量化哪条通道承载了最多信息。"
      },
      "rf": {
        "label": "反思",
        "p": "最重要的一课是：在硬件上，时序就是设计。防抖听起来像电子细节，直到一次重复触发让分数和你手指上的震动对不上，玩家就不再信任这套系统。最弱的一环是我证明了闭环能跑，却没有测量其中哪些部分真正起作用，如果重做，我会从第一天就记录每一次传感器事件和反馈触发，然后开始逐个关掉通道，看玩家实际在用哪几条。"
      }
    }
  }
};
