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
    "durZh": "已建成",
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
    "auditNote": "Verified exhibition build scope, Arduino firmware role, and media assets."
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
  "processArtifacts": {
    "scrubber": {
      "eyebrow": {
        "en": "Process scrubber · Isolated hardware vs unified state loop",
        "zh": "前后对比拉杆 · 离散硬件误触发 ↔ 五通道单一状态机"
      },
      "title": {
        "en": "Consolidate unbuffered IR sensors & solo triggers into one debounced co-touch loop",
        "zh": "从各自为战的红外毛刺与单人按键收拢为防抖互锁与全同步控制台"
      },
      "summary": {
        "en": "Compare early failure modes against MazeRunners' SafeTouchServoController, sleeve haptics, and Web Serial state chain.",
        "zh": "拉动对比初始版本的传感器连击/电击隐患与终版指套震动、舵机分板和浏览器实时回放体系。"
      },
      "beforeLabel": {
        "en": "Before · Unbuffered & Solo",
        "zh": "改造前 · 未防抖与孤立控制"
      },
      "afterLabel": {
        "en": "After · Synced Co-Touch State",
        "zh": "改造后 · 五通道单一状态机"
      },
      "wireframeId": "maze-solo",
      "afterImage": {
        "src": "/projects/maze/after-architecture.svg",
        "alt": {
          "en": "MazeRunners unified Mega state machine syncing co-touch bracelets, IR debounce, finger-sleeve vibration, SafeTouchServoController, TM1637 display, and Web Serial console",
          "zh": "MazeRunners 统一架构图：协同手环互锁、红外防抖、指套震动、SafeTouchServoController 倾斜控制与 Web Serial 五通道同步"
        },
        "width": 800,
        "height": 500
      }
    },
    "quotes": {
      "eyebrow": {
        "en": "Exhibition observation · Bench & public play",
        "zh": "展览与台架观察归因卡"
      },
      "title": {
        "en": "Physical feedback insights observed during exhibition rounds",
        "zh": "公开展览与台架调试中暴露的物理交互规律"
      },
      "items": [
        {
          "id": "maze-look-up",
          "category": "physical",
          "quote": {
            "en": "\"Some players were surprised by the vibration the first time.\"",
            "zh": "「有些玩家第一次被震动吓了一跳。」"
          },
          "context": {
            "en": "Course paper, from the June 2026 exhibition",
            "zh": "课程论文，记 2026 年 6 月的展出"
          },
          "friction": {
            "en": "Attention was spread across the maze, the score and time display, the LEDs and the sounds.",
            "zh": "玩家的注意力分散在迷宫、分数与时间显示、灯光和声音上。"
          },
          "decision": {
            "en": "Fired finger-sleeve vibration together with audio, LED strips and the score display from one round event.",
            "zh": "由同一个回合事件同时触发指套震动、音效、灯带和分数显示。"
          }
        },
        {
          "id": "maze-debounce",
          "category": "structure",
          "quote": {
            "en": "\"Raw IR sensor reads could fire more than once on one ball pass, so score and buzz disagreed.\"",
            "zh": "「原始红外读数在一次经过里可能触发不止一次，计分与震动就对不上了。」"
          },
          "context": {
            "en": "Bench calibration on FC-51 IR array",
            "zh": "FC-51 红外传感器台架校准调试"
          },
          "friction": {
            "en": "Unsubscribed hardware jitter caused subsystems to disagree on round state.",
            "zh": "硬件毛刺导致计分屏、计时器与触觉各自触发不同次数。"
          },
          "decision": {
            "en": "Added per-sensor debounce + cooldown windows feeding one round state machine.",
            "zh": "为每个传感器增加防抖与冷却窗口，全部收拢进单一回合状态机。"
          }
        }
      ]
    },
    "microLoop": {
      "eyebrow": {
        "en": "Vector micro-loop · Co-touch to 5-channel hardware feedback",
        "zh": "矢量交互微循环 · 双人耦合到五路物理同步输出"
      },
      "title": {
        "en": "Wrist Co-Touch → Safe Servo → IR Debounce → 5-Channel Sync",
        "zh": "腕带双人耦合 → 安全舵机倾斜 → 红外防抖判定 → 声光震屏五路同步"
      },
      "summary": {
        "en": "Step through the physical closed loop aligning players' fingertips, the wooden board, and the Web Serial browser console.",
        "zh": "按帧查看物理迷宫如何在不破坏玩家直觉的前提下保证计分、灯效与指尖震动绝对同拍。"
      },
      "loopId": "maze-state",
      "steps": [
        {
          "label": { "en": "Wrist Co-Touch", "zh": "双人互锁触发" },
          "detail": {
            "en": "Adjacent players must bridge matching color wristbands simultaneously before any axis tilts.",
            "zh": "同色腕带相邻两人必须同时触碰通电，彻底禁止单人孤立独占方向。"
          }
        },
        {
          "label": { "en": "Safe Servo", "zh": "独立舵机板" },
          "detail": {
            "en": "SafeTouchServoController runs tilt on its own Uno, moving only while players hold the contacts.",
            "zh": "SafeTouchServoController 跑在单独一块 Uno 上执行倾斜，玩家按住时才动。"
          }
        },
        {
          "label": { "en": "IR Debounce", "zh": "十路红外防抖" },
          "detail": {
            "en": "FC-51 sensors pass per-channel debounce + cooldown windows so one ball pass fires exactly once.",
            "zh": "十路 FC-51 传感器经由防抖与冷却门控，确保小球单次通过严格仅记录一次事件。"
          }
        },
        {
          "label": { "en": "5-Way Output", "zh": "五端毫秒同步" },
          "detail": {
            "en": "One Mega round state triggers finger haptics, buzzer audio, LED strips, TM1637 counter, and Web Serial together.",
            "zh": "同一状态机同时下发指套震动、蜂鸣音效、灯带、TM1637 计分牌与 Web Serial 回放日志。"
          }
        }
      ]
    }
  },
  "designDecisions": [
    {
      "id": "co-touch-coordination",
      "decisionTitle": {
        "en": "Couple direction controls across players instead of issuing solo controllers",
        "zh": "用跨手腕互锁协同控制替代「一人一个独立手柄」"
      },
      "humanTension": {
        "en": "With one control per person, each visitor can play alone and nothing makes the group act together.",
        "zh": "如果一人一套操控，每个人都能各玩各的，没有什么逼大家一起行动。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Buttons and a joystick (the first concept)",
            "zh": "按钮加摇杆（最初的构想）"
          },
          "flaw": {
            "en": "Rejected as too much like an arcade game.",
            "zh": "太像街机游戏，被否决。"
          }
        },
        {
          "option": {
            "en": "Weight sensing or a five-finger pressure pad",
            "zh": "体重感应或五指压力板"
          },
          "flaw": {
            "en": "Considered but never tested; the team went with shared conductive wristbands.",
            "zh": "只停在构思阶段，没有测试过。团队最后选了共用的导电腕带。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Pair shared color wristbands across players (A/B, B/C coupling) so no single person can drive any direction alone, while wiring instant visual, audio, and haptic cues into one round state machine.",
        "zh": "让相邻玩家共用同色腕带触发链路（A/B、B/C 耦合），任何人都无法单人完成单一方向驱动，并用单一回合状态机即时联动声、光、触觉反馈，有意制造「温和的协同阻力」。"
      },
      "residualCostOrRisk": {
        "en": "Putting on wristbands and finger sleeves took each group about a minute, and many players struggled with the rules even after a team member explained them. Play was observed across 9 groups (36 people) rather than logged by channel.",
        "zh": "每组戴腕带和指套大约要一分钟；组员讲解之后，仍有不少玩家没弄懂规则。现场观察了 9 组共 36 人，但没有按通道记录各路反馈的作用。"
      }
    },
    {
      "id": "haptics-and-debounce-trust",
      "decisionTitle": {
        "en": "Replace electric shock with sleeve haptics and debounce every IR trigger",
        "zh": "以指套震动取代微弱电击，并为十路红外传感器强制防抖"
      },
      "humanTension": {
        "en": "The electric-shock idea could not meet both complexity and safety, and a raw IR double-fire makes the score and the buzz on your finger disagree.",
        "zh": "电击设想的复杂度与安全性均无法达标；而原始红外一旦重复触发，计分与手指上的震动就对不上。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Mild electric shock trap from the initial concept",
            "zh": "沿用最初构想的轻微电击惩罚机制"
          },
          "flaw": {
            "en": "Complexity and safety could not both be met; dropped at the Mid-Fi stage (25 Apr 2026).",
            "zh": "复杂度与安全性均无法达标，在 Mid-Fi 阶段（2026 年 4 月 25 日）放弃。"
          }
        },
        {
          "option": {
            "en": "Let subsystems read raw FC-51 IR pins independently",
            "zh": "各子系统直接读取未去抖的 FC-51 红外原始电平"
          },
          "flaw": {
            "en": "Causes score, timer, LEDs, and console logs to drift out of sync on a single ball pass.",
            "zh": "单次球经过就会引起计分、计时、灯带与网页日志计数撕裂。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Relay-driven vibration motors in finger sleeves keep feedback on the body, each IR sensor needs three consecutive samples and then cools down for 400 ms so one ball pass is one round event, and servo tilt runs on its own Uno (SafeTouchServoController).",
        "zh": "改用继电器驱动的指套震动马达把触觉留在身体上；每个红外传感器要连续三次取样才触发，之后冷却 400 ms，锁定「一过一事件」；平台倾斜放在单独一块 Uno 上的 SafeTouchServoController。"
      },
      "residualCostOrRisk": {
        "en": "Vibration is a gentler sensation than shock and the cooldown introduces a brief blind window for rapid re-triggers; built as one hand-wired exhibition unit rather than a manufacturable harness.",
        "zh": "震动冲击感弱于电击，且冷却窗口会制造短暂盲区；目前仅验证了手工走线的单台展览机，不代表可量产耐久性。"
      }
    },
    {
      "id": "dual-mode-web-serial-and-fallback-demo",
      "decisionTitle": {
        "en": "Drive both real Mega hardware and browser Demo Mode from one Web Serial protocol contract",
        "zh": "Web Serial 实机调试台与无硬件 Demo 模式共用同一套状态机与渲染管线"
      },
      "humanTension": {
        "en": "Exhibition wiring degrades without fast bench diagnostics, yet external reviewers reading a web portfolio never own an Arduino Mega harness—without parity, either hardware debugging stalls or remote evaluators inspect a dead mock.",
        "zh": "缺乏直观串口监控时，现场接线故障极难排查；但线上的简历审阅者手头不可能插着 Arduino Mega 实体迷宫，若把演示版单独重画成假动画，既难维护又会失真。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Serial monitor text-only logs plus a separate scripted video on the portfolio",
            "zh": "串口端仅看文本日志，作品集只放一段预设播放动画"
          },
          "flaw": {
            "en": "Text logs hide which of the 10 IR zones jittered during setup, while passive videos cannot prove trap timing or recovery.",
            "zh": "纯文本难以及时定位 10 路传感器的抖动区段，录屏也无法让访问者直接点击验证状态联动。"
          }
        },
        {
          "option": {
            "en": "Build two divergent front-end UIs for exhibition laptop vs online portfolio",
            "zh": "为展场电脑和作品集网页各自维护两套完全独立的控制台"
          },
          "flaw": {
            "en": "Visual polish and timing logic drift between exhibition truth and portfolio artifact.",
            "zh": "两份代码很快就会出现状态分叉，导致作品集展示的逻辑脱离真实硬件。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "The JS Canvas console shares one event dispatcher: when USB Serial connects to Arduino Mega it logs live traps and relays; without hardware attached it replays the exact same trap, score, and haptic state transitions deterministically in the browser.",
        "zh": "JS Canvas 控制台基于单一状态分发器：接上 USB Serial 时直接读取 Mega 的 10 路实时状态与错误恢复测试；脱离硬件时无缝退化为完全一致的浏览器本地状态回放引擎。"
      },
      "residualCostOrRisk": {
        "en": "Chrome Web Serial requires a desktop Chromium browser with USB permission for live mode; remote viewers remain limited to deterministic simulation rather than physical wrist torque.",
        "zh": "Live 模式依赖桌面端 Chromium 浏览器的 Web Serial 授权；纯网页访客能验证完整规则逻辑，但仍无法替代现场手腕拉扯的实体阻力。"
      }
    }
  ],
  "card": {
    "en": {
      "kicker": "Physical Computing · Co-Play System",
      "title": "MazeRunners",
      "sub": "Two players share one wristband control—forcing physical coordination across sensors, finger-sleeve haptics, and a live web scoreboard.",
      "role": "Lead Interaction & Hardware/Web Dev",
      "date": "2026 · exhibited live",
      "m1": "Wrist co-touch & haptic traps",
      "m2": "Arduino Mega · 10 IR · Web Serial",
      "m3": "Publicly exhibited · 9 groups (36 players)"
    },
    "zh": {
      "kicker": "物理计算 · 多人协作装置",
      "title": "MazeRunners",
      "sub": "双人共用同一腕带才能触发方向，用十路红外防抖、指套震动与浏览器实时控制台把实体木迷宫变成必须开口配合的四人协同游戏。",
      "role": "交互规则、全套接线、Arduino 固件与网页控制台",
      "date": "2026 · 已公开展出",
      "m1": "跨玩家共触互锁 + 震动反馈",
      "m2": "Arduino Mega · 10 路红外 · Web Serial",
      "m3": "公开展出实测 · 9 组 36 人试玩"
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
      "teamVal": "Team project; I wrote the IR and vibration code, drafted the servo code that an AI tool rewrote, did the wiring and testing, and built the web console",
      "toolsVal": "Arduino Mega · Arduino C/C++ · FC-51 IR · TM1637 · Web Serial · JS Canvas",
      "ch": {
        "label": "The problem",
        "title": "A maze is furniture until it answers you.",
        "p": "The brief was a physical maze game for a public exhibition. The failure mode showed up in the first build: a nice object that people pushed a ball around while nothing happened. Scoring lived in someone's head, traps were painted lines, and the only feedback was other players laughing. The design problem was not the maze — it was making the system notice events and answer them fast enough that players can follow what just happened. Even so, a team member had to explain the rules before each round."
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
          "b": "The original trap concept was a mild electric shock. It was dropped at the Mid-Fi stage because complexity and safety could not both be met."
        },
        "m3": {
          "t": "Feedback inventory",
          "b": "Score, timer, vibration, lights, audio, and a browser console — each a channel that could carry or muddy the same event."
        },
        "quote": "Some players were surprised by the vibration the first time.",
        "quoteWho": "Course paper, June 2026 exhibition"
      },
      "sy": {
        "label": "System concept",
        "title": "One event, many channels, one round state machine.",
        "p": "Everything hangs off a single round state machine. A ball breaks an IR beam, round state advances, and that one event fans out: score and timer displays update, a vibration pulse fires in the player's finger sleeve, the LED strip and speaker respond, and the browser console logs it. Subsystems reacting independently is exactly what made the first build feel like unrelated gadgets screwed to plywood."
      },
      "id": {
        "label": "Technical decisions",
        "p": "Vibration replaced the electric shock at the Mid-Fi stage, because the shock could not meet both complexity and safety: relay-driven motors in wearable finger sleeves keep the sensation on the body. Each IR sensor needs three consecutive samples before it triggers and then cools down for 400 ms, because raw reads could fire more than once on a single pass and broke agreement between score, timer, and haptics. Platform tilt runs on its own Uno (SafeTouchServoController) with hold-to-move behavior, the ball launcher's stepper on a second Uno, and the Mega handles sensing; all boards share one ground."
      },
      "pr": {
        "label": "The web console",
        "p": "A browser-based system console connects over Web Serial and mirrors the maze live: score and timer HUD, hardware bay, event log, and feedback simulation on a canvas. It also runs standalone in demo mode, because the hardware is not in the room during development — or in a portfolio, or an interview. Regression tests cover serial sync, feedback sync, servo response, and audio parity so the demo cannot quietly drift away from what the firmware does."
      },
      "te": {
        "label": "Testing and iteration",
        "p": "Bench testing tuned debounce and cooldown until one ball pass produced exactly one game event. Parity tests caught drift whenever the firmware or the console was edited alone. Group play at the exhibition then surfaced what the bench could not: each group took about a minute to put on wristbands and finger sleeves, some players were surprised by the vibration the first time, and many struggled with the rules even after a team member explained them."
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
        "p": "A working, exhibited system: firmware modules for game state, IR sensing, player chain input, vibration and audio; a Mega plus two Uno boards on a shared ground; and a browser console with parity tests. Evidence status — this is a university project built for one exhibition. Play was observed, not instrumented, so I can describe what players reacted to but cannot quantify which channel carried the most information."
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
      "teamVal": "团队项目；红外与震动程序由我编写，舵机程序由 AI 工具在我的草稿上改写，接线与测试由我负责，网页控制台也由我搭建",
      "toolsVal": "Arduino Mega · Arduino C/C++ · FC-51 红外 · TM1637 · Web Serial · JS Canvas",
      "ch": {
        "label": "问题",
        "title": "迷宫在会回应你之前，只是一件家具。",
        "p": "题目是给公开展览做一台实体迷宫游戏。第一版就暴露了失败模式：一个还算好看的物件，人们推着球转，但什么都没发生。计分靠人记，陷阱是画上去的线，唯一的反馈是旁边的人在笑。真正的设计问题不是迷宫本身，而是让系统察觉到事件，并且回应得够快，让玩家看得出刚才发生了什么。即便如此，每轮开始前仍要由组员讲解规则。"
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
          "b": "最初的陷阱概念是轻微电击。复杂度与安全性均无法达标，在 Mid-Fi 阶段放弃。"
        },
        "m3": {
          "t": "反馈盘点",
          "b": "计分、计时、震动、灯光、音效与浏览器控制台：每一个都是可能承载、也可能搅浑同一事件的通道。"
        },
        "quote": "有些玩家第一次被震动吓了一跳。",
        "quoteWho": "课程论文，记 2026 年 6 月的展出"
      },
      "sy": {
        "label": "系统概念",
        "title": "一个事件，多个通道，一个回合状态机。",
        "p": "所有东西都挂在同一个回合状态机上。球打断红外光束，回合状态推进，这一个事件随即分头触发：计分与计时更新、玩家手指套里的震动脉冲触发、灯带与扬声器回应、浏览器控制台记录。各子系统各自反应，正是第一版让整台迷宫像是一堆拧在木板上的无关小装置的原因。"
      },
      "id": {
        "label": "技术决策",
        "p": "Mid-Fi 阶段用震动取代了电击，因为电击的复杂度与安全性均无法达标。继电器驱动的马达装在可穿戴手指套里，把感受留在身体上。每个红外传感器要连续三次取样才触发，之后冷却 400 ms，因为原始读数在一次经过里可能重复触发，让计分、计时与震动对不上。平台倾斜放在单独一块 Uno 上的 SafeTouchServoController，采用「按住才动」；发球机的步进电机在另一块 Uno 上，Mega 负责感测，所有板子共地。"
      },
      "pr": {
        "label": "网页控制台",
        "p": "一个浏览器端的系统控制台通过 Web Serial 连上迷宫并实时镜像：计分计时 HUD、硬件面板、事件日志，以及画布上的反馈模拟。它也能以 demo 模式独立运行：因为开发时硬件不一定在手边，放进作品集或面试场合更不会在。回归测试覆盖串口同步、反馈同步、舵机响应与音频一致性，让 demo 不会悄悄偏离固件真正的行为。"
      },
      "te": {
        "label": "测试与迭代",
        "p": "台架测试反复调校防抖与冷却，直到一次球的经过刚好产生一个游戏事件。一致性测试则在只改动固件或只改动控制台时抓出漂移。之后展览上的多人游玩暴露了台架测不出来的东西：每组戴腕带和指套大约要一分钟，有些玩家第一次被震动吓了一跳，组员讲解之后仍有不少人没弄懂规则。"
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
        "p": "一套真的在运行、也真的展出过的系统：涵盖游戏状态、红外感测、玩家链路输入、震动与音频的固件模块；一块 Mega 加两块 Uno、全部共地的硬件分工；以及带一致性测试的浏览器控制台。证据状态：这是为一次展览搭建的课程项目。现场游玩是观察记录，不是数据埋点，所以我能描述玩家对什么有反应，但无法量化哪条通道承载了最多信息。"
      },
      "rf": {
        "label": "反思",
        "p": "最重要的一课是：在硬件上，时序就是设计。防抖听起来像电子细节，直到一次重复触发让分数和你手指上的震动对不上，玩家就不再信任这套系统。最弱的一环是我证明了整条物理回路能跑通，却没有测量其中哪些部分真正起作用，如果重做，我会从第一天就记录每一次传感器事件和反馈触发，然后开始逐个关掉通道，看玩家实际在用哪几条。"
      }
    }
  }
};
