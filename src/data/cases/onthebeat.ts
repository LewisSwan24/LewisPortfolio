import type { CaseRecord } from "@/lib/cases/schema";

export const onthebeatCase: CaseRecord = {
  "slug": "onthebeat",
  "status": "listed",
  "roleTracks": [
    "interaction",
    "design-eng"
  ],
  "workSummary": {
    "order": 6,
    "tags": ["hardware", "ai"],
    "year": "2026",
    "dur": "Paired on real bands",
    "problem": {
      "en": "Two strangers at a gig with no easy way to say hello",
      "zh": "演出现场两个陌生人，缺一个容易开口的方式"
    },
    "changed": {
      "en": "A phone, two wristbands and a cloud relay that run without a laptop",
      "zh": "手机、两支手环加云端 relay，不需要笔电就能运转"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Verified dual-wristband pairing proof and unstudied participant limit for V3.1 baseline."
  },
  "cover": {
    "src": "/projects/onthebeat/03-match.jpg",
    "width": 786,
    "height": 1704,
    "alt": {
      "en": "Phone screen after both people agreed, showing names and the meeting place",
      "zh": "双方都同意后的手机画面，显示名字和碰面地点"
    },
    "fit": "contain"
  },
  "links": [
    {
      "label": "Open live web prototype",
      "href": "https://on-the-beat.fly.dev",
      "external": true
    },
    {
      "label": "Source on GitHub",
      "href": "https://github.com/LewisSwan24/on-the-beat",
      "external": true
    }
  ],
  "media": {
    "label": "One wave, two test windows",
    "labelZh": "一次挥手，两个测试视窗",
    "blurb": "Two local test windows, Ava and Leo, walking the flow on the 29 September 2026 build. There are no photographs of the wristbands in this case.",
    "blurbZh": "本机两个测试视窗 Ava 与 Leo 走一遍流程，截自 2026 年 9 月 29 日的构建。这个案例没有手环实拍照片。",
    "images": [
      {
        "src": "/projects/onthebeat/01-armed.jpg",
        "width": 786,
        "height": 1704,
        "alt": "Phone screen with the SAY HI card lit",
        "altZh": "手机画面，SAY HI 卡已点亮",
        "caption": "SAY HI is lit.",
        "captionZh": "点亮 SAY HI。"
      },
      {
        "src": "/projects/onthebeat/02-waved.jpg",
        "width": 786,
        "height": 1704,
        "alt": "Phone screen showing that someone nearby has waved, with no name",
        "altZh": "手机画面，显示附近有人挥手，没有名字",
        "caption": "A wave arrives. It says only that someone nearby is there, with no name.",
        "captionZh": "收到挥手，只显示附近有人，没有名字。"
      },
      {
        "src": "/projects/onthebeat/03-match.jpg",
        "width": 786,
        "height": 1704,
        "alt": "Phone screen after both people agreed, showing names and the meeting place",
        "altZh": "双方都同意后的手机画面，显示名字和碰面地点",
        "caption": "Only after both nod do they see each other's names and where to meet.",
        "captionZh": "双方都点头之后，才互相看到名字和碰面的地方。"
      }
    ]
  },
  "processArtifacts": {
    "microLoop": {
      "eyebrow": {
        "en": "Vector micro-loop · Zero-identity icebreaker",
        "zh": "矢量交互微循环 · 零身份破冰节奏"
      },
      "title": {
        "en": "Wave pulse → Anonymous relay → Mutual nod → Phones back in pockets",
        "zh": "手环挥手脉冲 → 匿名中继转发 → 双向点头解锁 → 手机收回口袋"
      },
      "summary": {
        "en": "Four-step interaction cycle designed so strangers never expose profiles before mutual consent.",
        "zh": "用轻量矢量序列演示如何在「双方明确点头」之前做到零个人资料暴露。"
      },
      "loopId": "onthebeat-wave",
      "steps": [
        {
          "label": { "en": "Wave Pulse", "zh": "手环挥手" },
          "detail": {
            "en": "ESP32 wristband detects an intentional SAY HI wave without broadcasting your profile.",
            "zh": "ESP32 手环识别挥手意图并亮起 SAY HI，不广播任何个人资料。"
          }
        },
        {
          "label": { "en": "Blind Relay", "zh": "匿名中继" },
          "detail": {
            "en": "Fly.io relay notifies nearby phones only that someone waved — zero name, zero photo.",
            "zh": "Fly.io 中继仅告知附近「有人挥手」，绝不泄名字与头像。"
          }
        },
        {
          "label": { "en": "Mutual Nod", "zh": "双向点头" },
          "detail": {
            "en": "Only after both confirm on the wrist do names and a shared gig landmark unlock.",
            "zh": "双方均在手腕确认后，屏幕才揭示彼此名字与唯一碰面地标。"
          }
        },
        {
          "label": { "en": "Pocket Exit", "zh": "收起手机" },
          "detail": {
            "en": "The interface steps out of the way so the real conversation happens in person.",
            "zh": "界面完成使命主动退场，把注意力还给演出现场的真实对话。"
          }
        }
      ]
    }
  },
  "card": {
    "en": {
      "kicker": "Social Wearables · Ambient Interaction",
      "title": "On The Beat",
      "sub": "At a live gig, help two strangers break the ice without staring at a phone—names only appear once both nod on the wrist.",
      "role": "Requirements, review & hardware pairing",
      "date": "2026 · coursework prototype",
      "m1": "Two real wristbands paired live",
      "m2": "Standalone cloud relay, no laptop",
      "m3": "Mutual-consent name reveal"
    },
    "zh": {
      "kicker": "社交穿戴体验 · 现场轻交互",
      "title": "On The Beat",
      "sub": "在演出人群里帮两个想搭话的人破冰，不必低头盯手机：双方都在手腕端同意后，才互相显示名字与碰面地点。",
      "role": "交互规则、输出审查与真机配对",
      "date": "2026 · 课程原型个人实现版",
      "m1": "两支实体手环双向配对",
      "m2": "脱离电脑独立运转云端中继",
      "m3": "双向同意后才揭示身份"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "On The Beat",
        "sub": "A phone app, two wristbands and a cloud relay for live gigs: help two strangers say hello, then let the devices get out of the way."
      },
      "roleVal": "Requirements, AI output review, error hunting and pairing on real wristbands. The code was written by AI tools",
      "timeVal": "September–October 2026 · individual version of DECO3500 coursework",
      "teamVal": "Individual. The original three-card Figma prototype is a teammate's",
      "toolsVal": "React · Node relay on Fly.io · C++ firmware (PlatformIO, M5Unified) · Claude Design · Claude Code",
      "ch": {
        "label": "The problem",
        "title": "Start a conversation, then get out of the way.",
        "p": "At a live gig, two people who would like to talk have no low-stakes way to begin. An app that makes them stare at a phone works against the moment. In the 29 September build the phone holds three cards from a teammate's Figma prototype: SAY HI, FIRST SONG? and LET'S DANCE!. A wave tells the other person only that someone nearby is there. Names and a meeting place appear only after both have nodded. The wristband is a second way in: its side button chooses a card and the phone follows."
      },
      "re": {
        "label": "Groundwork",
        "title": "Three things the first version only pretended to do.",
        "m1": {
          "t": "The band on its own",
          "b": "On 24 September I asked for the link to work both ways. At noon on 25 September only the phone could still drive the band; that afternoon the side button chose a card and the phone followed."
        },
        "m2": {
          "t": "MEET for real",
          "b": "On 25 September I pointed out that MEET was only mock data. That night two devices with two bands waved and waved back, and both bands showed MEET at the same time."
        },
        "m3": {
          "t": "No laptop",
          "b": "The same evening I said neither device could run without a computer. The relay moved to one always-on machine on Fly.io in Sydney, and the bands matched through the cloud 65 minutes after my message."
        },
        "quote": "Without a computer, neither of these two things can run.",
        "quoteWho": "My message to Claude Code, 25 September 2026, translated from Chinese"
      },
      "sy": {
        "label": "System concept",
        "title": "Phone, relay, two wristbands.",
        "p": "Three parts talk through one relay. The phone app is React. The relay is Node on one always-on machine on Fly.io in Sydney. The two wristbands are a StickS3 and a StickC Plus, two different ESP32-family boards, running C++ firmware. Either side can change state, so both go through the relay to stay in agreement, and neither side sees a name until both have agreed."
      },
      "id": {
        "label": "Design decisions",
        "p": "The concept was not mine: the three cards come from a teammate's Figma prototype. My decisions were about what the working system had to do. Each began as a message to Claude Code naming something the generated version had not done: the band could only follow the phone, MEET was mock data, and without a computer neither device could run. Each was then checked on the two real wristbands, not only on screen."
      },
      "pr": {
        "label": "How it got built",
        "p": "Everything was built with AI tools. The firmware and the app code were written and flashed by Claude Code. I did the wiring, turned on the hotspot, pressed the buttons, watched the screens and reported back. In September I was new to hardware and needed each step explained before I did it. The design canvas was generated in Claude Design, and I imported each version into Claude Code for review: I caught all four cards reading '1 of 4' on 15 September, and on 21 September what looked like a black screen after picking a song."
      },
      "te": {
        "label": "Testing and iteration",
        "p": "Two kinds of check, both mine. On real hardware, on 25 September, both wristbands showed MEET at the same time through the cloud relay, with no laptop involved. In software, two local test windows, Ava and Leo, walk the flow on the 29 September build: SAY HI lit, a wave that shows no name, and names only after both nod. The design canvas went back for rework at least 5 times that night, after at least 12 rounds on the earlier Say Hello canvas. None of this is participant testing."
      },
      "ou": {
        "label": "What it produced",
        "m1": {
          "label": "Real wristbands paired through the cloud",
          "v": "2"
        },
        "m2": {
          "label": "From my message to the bands matching",
          "v": "65 min"
        },
        "m3": {
          "label": "Participant sessions",
          "v": "None yet"
        },
        "p": "A phone app, two wristbands and an always-on relay that run without a laptop, in a public repository. Evidence status: there is no record of any participant testing the app. The bands' timing values, such as staying awake for six seconds or a 1.5-second long press, are estimates still to be measured on a wrist. A night on battery, the Plus's front button and a wave-back pressed on the band itself are unverified. Staff-page push notifications arrived on my Android phone on 30 September, with a VPN on. An iPhone clip that disappeared on 6 October was fixed but not retested."
      },
      "rf": {
        "label": "Reflection",
        "p": "In this record my part sits at two ends: saying what the system must do, and sending back output that only looked finished. Mock data that showed MEET, a link that only worked with my laptop, and a canvas that counted wrong each looked fine on screen until it was tried. What the case cannot say is whether the cards help two strangers meet. That needs people at a real or staged gig, and it has not happened yet."
      }
    },
    "zh": {
      "hero": {
        "title": "On The Beat",
        "sub": "给现场演出用的手机 App、两支手环和一台云端 relay：帮两个陌生人开口，然后让设备退到一边。"
      },
      "roleVal": "定需求、审查 AI 输出、排查错误，并在真手环上配对实测。代码由 AI 工具编写",
      "timeVal": "2026 年 9 至 10 月 · 课程作业 DECO3500 的个人版本",
      "teamVal": "个人完成。最初的三张卡 Figma 原型出自组员",
      "toolsVal": "React · Fly.io 上的 Node relay · C++ 固件（PlatformIO、M5Unified）· Claude Design · Claude Code",
      "ch": {
        "label": "问题",
        "title": "让人开口，然后退到一边。",
        "p": "现场演出里，两个想说话的人缺一个没有压力的开头。一个让人盯着手机的 App，只会把那一刻打断。9 月 29 日的构建里，手机有三张卡，出自组员的 Figma 原型：SAY HI、FIRST SONG?、LET'S DANCE!。挥手时，对方只知道附近有人。双方都点头之后，才会互相看到名字和碰面的地方。手环是另一个入口：侧键选卡，手机跟着变。"
      },
      "re": {
        "label": "前期工作",
        "title": "第一版只是假装做到的三件事。",
        "m1": {
          "t": "手环单独换状态",
          "b": "9 月 24 日我提出链路要双向。25 日中午复测，仍然只有手机能控制手环；下午再测，侧键选卡，手机随之变化。"
        },
        "m2": {
          "t": "真的 MEET",
          "b": "9 月 25 日我指出 MEET 只是模拟数据。当晚两部设备配两支手环，一边挥手、一边回挥，两支手环同时显示 MEET。"
        },
        "m3": {
          "t": "不要笔电",
          "b": "同一晚我说没有电脑两样东西都跑不起来。relay 迁到 Fly.io 悉尼的一台常开机器，我说完 65 分钟后，两支手环经云端对上。"
        },
        "quote": "没有电脑的话这俩东西都无法运转了",
        "quoteWho": "我在 2026 年 9 月 25 日发给 Claude Code 的消息"
      },
      "sy": {
        "label": "系统概念",
        "title": "手机、relay、两支手环。",
        "p": "三个部分通过一台 relay 对话。手机 App 用 React。relay 是 Node，跑在 Fly.io 悉尼的一台常开机器上。两支手环是 StickS3 和 StickC Plus，属于 ESP32 系列的两种板子，跑 C++ 固件。两边都能改状态，所以都经过 relay 保持一致；双方都同意之前，谁也看不到对方的名字。"
      },
      "id": {
        "label": "设计决策",
        "p": "概念不是我的，三张卡出自组员的 Figma 原型。我的决定都关于能运行的系统必须做到什么。每一条都始于我发给 Claude Code 的一条消息，消息里指出生成版本没做到的地方。具体是三件事：手环只能跟着手机变，MEET 是模拟数据，没有电脑两样东西都跑不起来。之后每一条都在两支真手环上核对，不只看屏幕。"
      },
      "pr": {
        "label": "怎么做出来的",
        "p": "全部用 AI 工具完成。固件和 App 代码由 Claude Code 编写并烧录；我负责接线、开热点、按键、看屏幕并反馈。9 月时我是硬件新手，每一步都要 Claude 先解释。设计画布由 Claude Design 生成，每一版我都导入 Claude Code 审查：9 月 15 日我发现四张卡都显示 1 of 4，21 日发现点选音乐后疑似黑屏。"
      },
      "te": {
        "label": "测试与迭代",
        "p": "两类检查，都是我自己做的。真机上，9 月 25 日两支手环经云端 relay 同时显示 MEET，链路里没有笔电。软件上，用本机两个测试视窗 Ava 与 Leo 在 9 月 29 日的构建上走一遍：点亮 SAY HI，收到不带名字的挥手，双方点头后才显示名字。当晚设计画布至少返工 5 次，此前的 Say Hello 画布至少 12 轮。这些都不是参与者测试。"
      },
      "ou": {
        "label": "产出与边界",
        "m1": {
          "label": "经云端配对的真手环",
          "v": "2"
        },
        "m2": {
          "label": "从我提出到手环对上",
          "v": "65 分钟"
        },
        "m3": {
          "label": "参与者测试",
          "v": "尚无"
        },
        "p": "手机 App、两支手环和一台常开的 relay，不需要笔电就能运转，代码在公开仓库里。证据状态：没有任何参与者测试这个 App 的记录。手环的时间参数，例如保持唤醒六秒、长按 1.5 秒，都是估计值，还要戴在手上实测。一晚的电池、Plus 的正面键、在手环上按实体键回挥，都没验证。员工页推播在 9 月 30 日送达过我的 Android 手机，当时开着 VPN。10 月 6 日 iPhone 片段消失的问题修好了，但没有复测。"
      },
      "rf": {
        "label": "反思",
        "p": "从记录看，我的部分在两头：说清系统必须做到什么，把只是看起来做完的输出打回去。显示 MEET 的模拟数据、只在我笔电上能跑的链路、数错的画布，在屏幕上看都没问题，一试才露馅。这个案例说不了的，是这些卡片能不能帮两个陌生人碰面。这需要在真实或模拟的演出现场找人来试，目前还没做。"
      }
    }
  }
};
