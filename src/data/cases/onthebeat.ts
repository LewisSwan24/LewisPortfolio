import type { CaseRecord } from "@/lib/cases/schema";

export const onthebeatCase: CaseRecord = {
  "slug": "onthebeat",
  "status": "listed",
  "featuredOrder": 5,
  "roleTracks": [
    "interaction",
    "design-eng"
  ],
  "workSummary": {
    "order": 6,
    "tags": ["hardware", "ai"],
    "year": "2026",
    "dur": "Paired on real bands",
    "durZh": "已在真实手环上配对",
    "problem": {
      "en": "Two strangers at a gig with no easy way to say hello",
      "zh": "演出现场两个陌生人，缺一个容易开口的方式"
    },
    "changed": {
      "en": "A phone, two wristbands and a cloud relay that run without a laptop",
      "zh": "手机、两支手环加云端中继，不需要笔记本就能运转"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Verified dual-wristband pairing proof and unstudied participant limit."
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
      "labelZh": "打开在线原型",
      "href": "https://onthebeat.lewisdong.com",
      "external": true
    },
    {
      "label": "Source on GitHub",
      "labelZh": "GitHub 源码",
      "href": "https://github.com/LewisSwan24/on-the-beat",
      "external": true
    }
  ],
  "media": {
    "label": "One wave, two test windows",
    "labelZh": "一次挥手，两个测试窗口",
    "blurb": "Two local test windows, Ava and Leo, walking the flow on the 29 September 2026 build. There are no photographs of the wristbands in this case.",
    "blurbZh": "本机两个测试窗口 Ava 与 Leo 走一遍流程，截自 2026 年 9 月 29 日的构建。这个案例没有手环实拍照片。",
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
  "interactiveDemo": {
    "id": "onthebeat-handshake",
    "placement": "after-summary",
    "eyebrow": {
      "en": "Interactive prototype · Mutual consent & device withdrawal",
      "zh": "可运行原型 · 匿名破冰与开口后设备退场"
    },
    "title": {
      "en": "Test the blind wave → mutual nod → pocket-exit rhythm",
      "zh": "亲手走一遍匿名脉冲、双向点头与硬件静默退场节奏"
    },
    "prompt": {
      "en": "Send an anonymous wave card, trigger mutual wrist confirmation, and step the phone out of view once two people meet in person.",
      "zh": "选择一张匿名脉冲卡，完成双向手环点头后再将手机退场，观察姓名如何仅在双向同意后才暴露。"
    },
    "takeaway": {
      "en": "Lowering initiation friction only earns trust when devices fade quietly the moment real conversation starts.",
      "zh": "社交硬件的价值只在帮陌生人迈过开头那半秒。两人真正开口后，软件就该礼貌退居二线。"
    }
  },
  "processArtifacts": {
    "scrubber": {
      "eyebrow": {
        "en": "Process scrubber · Proximity radar vs zero-identity nod",
        "zh": "前后对比拉杆 · 身份暴露雷达 ↔ 匿名脉冲与退场式配对"
      },
      "title": {
        "en": "Replace invasive nearby-people radars with blind waves that withdraw once paired",
        "zh": "把窥探感强的人群雷达改造成「匿名挥手 → 双向确认解锁 → 手机退回口袋」"
      },
      "summary": {
        "en": "Scrub between traditional gig-radar surveillance risks and On The Beat's bidirectional Fly.io wristband flow.",
        "zh": "拖动对比强暴露定位雷达与现行匿名挥手、悉尼常驻中继与硬件双向确认逻辑。"
      },
      "beforeLabel": {
        "en": "Before · Nearby-People Radar",
        "zh": "改造前 · 暴露头像的距离雷达"
      },
      "afterLabel": {
        "en": "After · Blind Mutual Nod",
        "zh": "改造后 · 匿名双向互认"
      },
      "wireframeId": "onthebeat-radar",
      "afterImage": {
        "src": "/projects/onthebeat/after-architecture.svg",
        "alt": {
          "en": "On The Beat post-redesign architecture showing blind wave presence, always-on Sydney Fly.io relay, dual-wristband mutual MEET confirmation, and device withdrawal",
          "zh": "On The Beat 架构图：匿名脉冲预探、Fly.io 常驻悉尼中继、双腕表同步 MEET 互认及界面主动退场"
        },
        "width": 800,
        "height": 500
      }
    },
    "quotes": {
      "eyebrow": {
        "en": "Hardware & generated-canvas audit",
        "zh": "真机调试与产出审查记录"
      },
      "title": {
        "en": "Failures caught on StickS3 & StickC Plus before hardware sign-off",
        "zh": "两支实体手环与设计画布审查暴露的三类关键断点"
      },
      "items": [
        {
          "id": "onthebeat-no-laptop",
          "category": "physical",
          "quote": {
            "en": "\"Without a computer sitting beside them, neither the phone nor these two wristbands can even connect.\"",
            "zh": "「离开桌边这台电脑，手机和这两只手环一个都跑不起来。」"
          },
          "context": {
            "en": "25 September hardware pairing failure audit",
            "zh": "9 月 25 日两支真机离桌连测排查"
          },
          "friction": {
            "en": "Early generated relay code defaulted to a localhost port, breaking portability inside any real venue.",
            "zh": "早期生成代码默认把中继绑在本地开发机端口上，根本无法带离桌面进入演出现场。"
          },
          "decision": {
            "en": "Deployed the Node relay onto an always-on Sydney Fly.io instance; both bands hit real MEET 65 minutes later.",
            "zh": "将 Node 中继迁往悉尼常驻 Fly.io 节点；65 分钟后两支实体手环在无电脑条件下同步显示 MEET。"
          }
        },
        {
          "id": "onthebeat-ai-lie",
          "category": "trust",
          "quote": {
            "en": "In a generated canvas, MEET was mocked static JSON rather than a real exchange between two bands.",
            "zh": "生成的画布里，MEET 是写死的模拟数据，两支手环之间并没有真正交换过。"
          },
          "context": {
            "en": "15–21 September Claude Design canvas review loops",
            "zh": "9 月 15–21 日 AI 设计产出多轮人工走查"
          },
          "friction": {
            "en": "Polished visual frames masked mocked states, one-way mirroring, and non-mutual state transitions.",
            "zh": "精致排版掩盖了写死的状态、手环仅能被动镜像以及伪造双方同意的结构性缺陷。"
          },
          "decision": {
            "en": "Sent canvases back across 5+ rework rounds (12+ on the earlier flow) and wired physical side-button selection.",
            "zh": "连续打回 5 轮以上（早期版本 12 轮以上）返工，并以手环侧键逆向同步验证真双向状态机。"
          }
        }
      ]
    },
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
  "designDecisions": [
    {
      "id": "blind-wave-mutual-consent",
      "decisionTitle": {
        "en": "Use blind waves and mutual consent before revealing names, then let devices withdraw",
        "zh": "匿名预探 + 双向确认后才显名，碰面后设备让到一边"
      },
      "humanTension": {
        "en": "At a dark, loud live gig, wanting to say hello to someone nearby carries real social face-loss anxiety if you misread the room—yet pulling up a bright social-feed screen breaks eye contact and kills the music moment.",
        "zh": "在灯光昏暗、人声嘈杂的演出现场，想向身边人搭话，又怕误判意愿而当场尴尬。但如果低头刷通用社交软件加好友，又会直接打断现场的音乐沉浸感。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Nearby-people radar showing faces, profiles, and bios",
            "zh": "LBS 附近人雷达列表直接展示头像与个人资料"
          },
          "flaw": {
            "en": "Turns an intimate gig into swipe-style appearance ranking and creates surveillance discomfort when neither person asked to be browsed.",
            "zh": "把演出现场变成刷脸选秀与偷窥压力，在对方未表态前过早暴露身份。"
          }
        },
        {
          "option": {
            "en": "Unconditional proximity alert or auto-revealed identity on one wave",
            "zh": "单方挥手即强制推送对方名字与位置"
          },
          "flaw": {
            "en": "Creates unwanted interruption and unilateral exposure without symmetric consent.",
            "zh": "单方面突破社交安全距离，极易构成现场骚扰与尴尬拒斥。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "An initial wave transmits only anonymous presence ('someone nearby waved') across three low-stakes Figma prompt cards (SAY HI, FIRST SONG?, LET'S DANCE! from a teammate's concept); names and a shared meeting landmark unlock only after both nod, so both phones can go right back into pockets.",
        "zh": "首次挥手只传递「附近有人在场」的匿名信号，配合组员原型里的三张低压力语义卡（SAY HI / FIRST SONG? / LET'S DANCE!）。双方都点头确认后，才解锁名字与碰面地标，随后手机就能收回口袋，让设备退居二线。"
      },
      "residualCostOrRisk": {
        "en": "No participant or live-gig wear testing has been run yet; wristband sleep/long-press timings (6s awake, 1.5s hold) remain unmeasured estimates, and the three-card concept came from a teammate.",
        "zh": "尚未在真实或模拟演出现场做过参与者与佩戴实测，唤醒 6 秒、长按 1.5 秒仍为估计值。此外，三张卡的初始概念源自同组同学的 Figma 原型。"
      }
    },
    {
      "id": "standalone-relay-and-ai-review",
      "decisionTitle": {
        "en": "Remove the laptop with an always-on relay and reject deceptive AI UI drafts",
        "zh": "用常驻云端中继让手环脱离电脑独立运转，并拒收「假装完成」的 AI 产出"
      },
      "humanTension": {
        "en": "AI-generated prototypes often look finished on a laptop desk—mocked matches and laptop-tethered relays—that would collapse immediately in a real venue.",
        "zh": "AI 生成的原型在笔记本桌面上经常「看起来什么都能跑」。实际却暗藏写死的假匹配和离不开电脑本地服务的链路，带到现场会瞬间穿帮。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Keep a laptop relay running at the table for demo convenience",
            "zh": "保留本地电脑充当中继，省去云端部署"
          },
          "flaw": {
            "en": "Neither phone nor wristbands can operate away from the desk, violating the portable gig setting.",
            "zh": "没有电脑两台设备都无法配对，根本带不进真实演出场地。"
          }
        },
        {
          "option": {
            "en": "Accept one-way phone-to-band mirroring and first-pass generated canvas",
            "zh": "默认接受手机单向驱动手环与首轮生成的画布结果"
          },
          "flaw": {
            "en": "Forces users back onto the phone screen and ships mocked states into the demo.",
            "zh": "强迫用户盯住手机，且把写死的模拟状态直接带进演示。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Enforced bidirectional state through an always-on Fly.io Sydney relay, verified real MEET agreement across StickS3 and StickC Plus wristbands, and sent generated design canvases back across 5+ rework rounds (12+ on the earlier canvas) until every state transition held.",
        "zh": "明确要求手环侧键可独立选卡、MEET 必须是真实双端协商，并将中继迁入悉尼常驻 Fly.io。同时对 AI 生成画布逐屏走查，打回至少 5 轮返工（早期画布至少 12 轮），直到状态一致。"
      },
      "residualCostOrRisk": {
        "en": "Depends on cloud connectivity in crowded venues; full-night battery life, StickC Plus front button, band-initiated wave-back, and the post-fix iPhone clip remain unverified, and firmware/app code was written and flashed by Claude Code.",
        "zh": "现场仍依赖云端连接；整晚续航、Plus 正面键、手环端按实体键回挥，以及 iPhone 片段修复后的复测均未验证。固件与 App 代码由 Claude Code 编写并烧录。"
      }
    },
    {
      "id": "wrist-side-button-agency-over-mirroring",
      "decisionTitle": {
        "en": "Let the ESP32 wristband side button drive state transitions back to the phone",
        "zh": "让 ESP32 手环侧键反向驱动状态，不让硬件沦为手机的纯被动副屏"
      },
      "humanTension": {
        "en": "If the wristband merely mirrors whatever is tapped on React, attendees in a packed crowd are forced back onto unlocking a bright phone screen just to browse or switch icebreaker cards.",
        "zh": "如果手环只能单向映射手机点按结果，人在拥挤的演出现场还是得掏出亮屏手机切换破冰卡片。这样手环就彻底成了多此一举的挂件。"
      },
      "rejectedAlternatives": [
        {
          "option": {
            "en": "Phone-master display-only wristband",
            "zh": "手机端绝对主控，手环只负责接收推送亮屏"
          },
          "flaw": {
            "en": "Forces eyes back down to handheld glass at the exact second an icebreaker should keep people looking around.",
            "zh": "把本来要抬眼找人的时刻重新拽回手机屏幕，彻底丧失穿戴设备免掏手机的意义。"
          }
        },
        {
          "option": {
            "en": "Hardware-only blind Morse patterns with no mobile landmark fallback",
            "zh": "彻底砍掉手机端界面，全靠小屏盲敲确认碰撞"
          },
          "flaw": {
            "en": "Once two strangers agree to meet in a dark room, a tiny 1.14-inch screen lacks clear shared landmark clarity.",
            "zh": "在昏暗噪声场地真正要找彼此站位时，手表小屏承载不了清晰碰面地标，需手机收尾后再收进口袋。"
          }
        }
      ],
      "chosenTradeoff": {
        "en": "Wire StickS3 and StickC Plus side buttons as first-class state emitters across the Fly.io relay so band cycling updates React in real time, then leave the phones to show first names and where to meet once both say yes.",
        "zh": "将 StickS3 与 StickC Plus 侧键接为通过 Fly.io 中继双向同步的一等事件源。逛卡片靠手环盲按切换，双方都同意后，手机才显示对方名字和碰面地点。"
      },
      "residualCostOrRisk": {
        "en": "StickC Plus front-button gesture and direct band-initiated wave-back remain unverified edge cases; the three icebreaker phrases came from a teammate's coursework Figma concept rather than Lewis.",
        "zh": "StickC Plus 正面短按与手环直接反向回挥尚未完成实机收口。同时，三句破冰词条均源自课程同组队友的 Figma 概念原型（非本人原创）。"
      }
    }
  ],
  "card": {
    "en": {
      "kicker": "Social Wearables · Ambient Consent",
      "title": "On The Beat",
      "sub": "Breaks the ice between two gig-goers without phone staring—revealing names and meet spots only after mutual wrist confirmation.",
      "role": "Individual build of DECO3500 team coursework · Interaction rules, AI output review & wristband pairing",
      "date": "2026 · coursework build",
      "m1": "Mutual-nod identity reveal",
      "m2": "ESP-NOW Wristband · Mobile Web · Fly.io",
      "m3": "Verified live on 2 paired wristbands"
    },
    "zh": {
      "kicker": "社交穿戴 · 现场防尴尬破冰",
      "title": "On The Beat",
      "sub": "在演出人群里帮两个陌生人自然开口，不必盯着手机。只有双方手环都点头确认，彼此界面才出现姓名和碰面点。",
      "role": "DECO3500 团队课程作业的个人版本 · 交互规则、AI 产出审查与真手环配对",
      "date": "2026 · 课程原型个人实现版",
      "m1": "双向同意后才揭示身份",
      "m2": "ESP-NOW 手环 · 移动 Web · Fly.io 中继",
      "m3": "双真机腕带离桌独立联调通过"
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
        "label": "System & Truth Audit",
        "title": "Three places where generated polish hid a broken loop.",
        "m1": {
          "t": "Bidirectional band control",
          "b": "The first generated build let only the phone drive the wristband, forcing attention back to glass. Requiring side-button card selection turned the band into a real second entry point."
        },
        "m2": {
          "t": "Live mutual MEET agreement",
          "b": "Early output simulated MEET with static mock data. Replacing it with real wave-and-nod coordination ensured both StickS3 and StickC Plus only unlock names when both agree."
        },
        "m3": {
          "t": "No-laptop cloud relay",
          "b": "A local laptop relay made gig portability impossible. Moving the relay to an always-on Fly.io instance in Sydney took the computer out of the loop—bands matched through the cloud 65 minutes later."
        },
        "quote": "Without a computer, neither of these two things can run.",
        "quoteWho": "Requirement sent during 25 September hardware debugging"
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
        "p": "Everything was built with AI tools. The firmware and the app code were written and flashed by Claude Code. I did the wiring, turned on the hotspot, pressed the buttons, watched the screens and reported back. In September I was new to hardware and needed each step explained before I did it. The design canvas was generated in Claude Design, and I imported each version into Claude Code for review: on 25 September I caught that the MEET it showed was simulated."
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
        "p": "In this record my part sits at two ends: saying what the system must do, and sending back output that only looked finished. Mock data that showed MEET and a link that only worked with my laptop each looked fine on screen until it was tried. What the case cannot say is whether the cards help two strangers meet. That needs people at a real or staged gig, and it has not happened yet."
      }
    },
    "zh": {
      "hero": {
        "title": "On The Beat",
        "sub": "给现场演出用的手机 App、两支手环和一台云端中继：帮两个陌生人开口，然后让设备退到一边。"
      },
      "roleVal": "定需求、审查 AI 输出、排查错误，并在真手环上配对实测。代码由 AI 工具编写",
      "timeVal": "2026 年 9 至 10 月 · 课程作业 DECO3500 的个人版本",
      "teamVal": "个人完成。最初的三张卡 Figma 原型出自组员",
      "toolsVal": "React · Fly.io 上的 Node 中继 · C++ 固件（PlatformIO、M5Unified）· Claude Design · Claude Code",
      "ch": {
        "label": "问题",
        "title": "让人开口，然后退到一边。",
        "p": "现场演出里，两个想说话的人缺一个没有压力的开头。一个让人盯着手机的 App，只会把那一刻打断。9 月 29 日的构建里，手机有三张卡，出自组员的 Figma 原型：SAY HI、FIRST SONG?、LET'S DANCE!。挥手时，对方只知道附近有人。双方都点头之后，才会互相看到名字和碰面的地方。手环是另一个入口：侧键选卡，手机跟着变。"
      },
      "re": {
        "label": "系统与真实核验",
        "title": "第一版「看起来能跑」背后露馅的三处断点。",
        "m1": {
          "t": "手环脱离手机独立切卡",
          "b": "首版生成代码只允许手机单向遥控手环，迫使人继续盯屏幕。明确要求双向同步后，侧键选卡可反推手机状态切换。"
        },
        "m2": {
          "t": "真实双端协商的 MEET",
          "b": "早期 MEET 只是前端写死的假数据；打回重做后，StickS3 与 StickC Plus 通过真实挥手与回挥在双方点头后同步进入碰面态。"
        },
        "m3": {
          "t": "脱离电脑的常驻云中继",
          "b": "依赖桌面电脑的中继带不进演出现场。将中继迁至悉尼常驻 Fly.io 后 65 分钟，两支真手环脱离笔记本独立配对成功。"
        },
        "quote": "没有电脑的话这俩东西都无法运转了",
        "quoteWho": "9 月 25 日真机联调中发出的硬性约束"
      },
      "sy": {
        "label": "系统概念",
        "title": "手机、中继、两支手环。",
        "p": "三个部分通过一台云端中继对话。手机 App 用 React。中继服务用 Node 编写，跑在 Fly.io 悉尼的一台常开机器上。两支手环是 StickS3 和 StickC Plus，属于 ESP32 系列的两种板子，跑 C++ 固件。两边都能改状态，所以都经过中继保持一致；双方都同意之前，谁也看不到对方的名字。"
      },
      "id": {
        "label": "设计决策",
        "p": "概念不是我的，三张卡出自组员的 Figma 原型。我的决定都关于能运行的系统必须做到什么。每一条都始于我发给 Claude Code 的一条消息，消息里指出生成版本没做到的地方。具体是三件事：手环只能跟着手机变，MEET 是模拟数据，没有电脑两样东西都跑不起来。之后每一条都在两支真手环上核对，不只看屏幕。"
      },
      "pr": {
        "label": "怎么做出来的",
        "p": "全部用 AI 工具完成。固件和 App 代码由 Claude Code 编写并烧录；我负责接线、开热点、按键、看屏幕并反馈。9 月时我是硬件新手，每一步都要 Claude 先解释。设计画布由 Claude Design 生成，每一版我都导入 Claude Code 审查：9 月 25 日我发现画面上的 MEET 是模拟出来的。"
      },
      "te": {
        "label": "测试与迭代",
        "p": "两类检查，都是我自己做的。真机上，9 月 25 日两支手环经云端中继同时显示 MEET，链路里没有笔记本。软件上，用本机两个测试窗口 Ava 与 Leo 在 9 月 29 日的构建上走一遍：点亮 SAY HI，收到不带名字的挥手，双方点头后才显示名字。当晚设计画布至少返工 5 次，此前的 Say Hello 画布至少 12 轮。这些都不是参与者测试。"
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
        "p": "手机 App、两支手环和一台常开的中继，不需要笔记本就能运转，代码在公开仓库里。证据状态：没有任何参与者测试这个 App 的记录。手环的时间参数，例如保持唤醒六秒、长按 1.5 秒，都是估计值，还要戴在手上实测。一晚的电池、Plus 的正面键、在手环上按实体键回挥，都没验证。员工页推送在 9 月 30 日送达过我的 Android 手机，当时开着 VPN。10 月 6 日 iPhone 片段消失的问题修好了，但没有复测。"
      },
      "rf": {
        "label": "反思",
        "p": "从记录看，我的部分在两头：说清系统必须做到什么，把只是看起来做完的输出打回去。显示 MEET 的模拟数据、只在我笔记本上能跑的链路，在屏幕上看都没问题，一试才露馅。这个案例说不了的，是这些卡片能不能帮两个陌生人碰面。这需要在真实或模拟的演出现场找人来试，目前还没做。"
      }
    }
  }
};
