import type { CaseRecord } from "@/lib/cases/schema";

export const connectCase: CaseRecord = {
  "slug": "connect",
  "status": "unlisted",
  "roleTracks": [
    "product",
    "interaction"
  ],
  "workSummary": {
    "order": 2,
    "tags": ["flag", "research"],
    "year": "Coursework",
    "dur": "Coursework prototype",
    "durZh": "课程原型",
    "problem": {
      "en": "Disjointed structure and hard-to-find information",
      "zh": "结构割裂，关键信息难找"
    },
    "changed": {
      "en": "Clearer task flow and navigation structure",
      "zh": "更清楚的任务流和导航结构"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Verified session counts (71 total, 14 mine) and October paper reset evidence."
  },
  "cover": {
    "src": "/projects/connect/02-app-studybuddy.png",
    "width": 1170,
    "height": 2532,
    "alt": {
      "en": "A study-buddy match card showing 94% match beside the course, library, availability and small-group size",
      "zh": "学习伙伴匹配卡：94% 契合度旁边列着课程、图书馆、可用时间与小组规模"
    },
    "fit": "contain"
  },
  "links": [
    {
      "label": "Open the demo",
      "labelZh": "打开演示",
      "href": "https://uq-connect.vercel.app/",
      "external": true
    }
  ],
  "media": {
    "label": "The sheet, and what came off it",
    "labelZh": "那张纸，和从纸上做出来的界面",
    "blurb": "The October paper reset alongside screenshots from the deployed prototype. The app runs on mock data; the backend routes were written separately and never wired up.",
    "blurbZh": "十月那张手绘架构草图，以及线上可交互原型的实际界面截图。目前前端使用模拟数据运行，后端接口尚未接入。",
    "images": [
      {
        "src": "/projects/connect/04-paper-prototype.jpg",
        "width": 2220,
        "height": 2040,
        "alt": "The 3 October pencil sheet: five phone screens with arrows drawn from the home screen to each one",
        "altZh": "10 月 3 日的铅笔草图：五个手机屏，从首页各画一条箭头指向对应的页面",
        "caption": "3 October. September sessions uncovered missing return paths and contradictory cards—structural faults that needed a structural redraw.",
        "captionZh": "10 月 3 日。九月测试暴露了「找不到返回路径」和「按钮状态自相矛盾」的结构问题，于是重画全站信息架构。"
      },
      {
        "src": "/projects/connect/01-app-home.png",
        "width": 1170,
        "height": 2532,
        "alt": "UQ Connect home screen: a color-coded grid of feature cards above a five-tab bar",
        "altZh": "UQ Connect 首页：分色功能卡片网格，下方配五栏底部导航",
        "caption": "The November home screen. Participants read the color coding as an intuitive map of the app—the payoff of moving to a shared component system.",
        "captionZh": "十一月新版首页。受测者顺着颜色区分就看懂了应用分区——统一设计系统的直接回报。"
      },
      {
        "src": "/projects/connect/02-app-studybuddy.png",
        "width": 1170,
        "height": 2532,
        "alt": "A study-buddy match card showing 94% match beside the course, library, availability and small-group size",
        "altZh": "学习伙伴匹配卡：契合度旁边标明课程、图书馆、空闲时段与小组人数",
        "caption": "Each match states its reasoning—course, venue, availability, group size—because students distrusted bare scores yet acted once context was explicit.",
        "captionZh": "匹配卡直接写出依据——课程、地点、空闲时间与人数，因为孤零零的分数让人怀疑，写明理由才会促成联系。"
      },
      {
        "src": "/projects/connect/03-app-events.png",
        "width": 1170,
        "height": 2532,
        "alt": "Campus event cards showing price, location, attendance count, and separate Register and I'm Going states",
        "altZh": "校园活动卡片：展示价格、地点、人数，并拆清「报名」与「我要去」状态",
        "caption": "Cost sits upfront on every card, shaped directly by interviews where steep ticket fees quietly filtered students out.",
        "captionZh": "活动费用直接放在卡片显眼处，直接回应了访谈里「高价社交活动默默把大家挡在门外」的发现。"
      }
    ]
  },
  "interactiveDemo": {
    "id": "connect-ia-reset",
    "placement": "mid-narrative",
    "eyebrow": {
      "en": "Interactive prototype · Before & after IA reset",
      "zh": "可操作活原型 · 信息架构重画前后对比"
    },
    "title": {
      "en": "Walk the exact think-aloud flow before and after the October paper reset",
      "zh": "15 秒对比九月旧结构卡点与十月纸面重画后的任务流"
    },
    "prompt": {
      "en": "Switch between Iteration 2 (patched legacy) and Oct Reset (redrawn IA), then step through Browse → Register → Back to feel why the October reset resolved the navigation trap.",
      "zh": "在顶部切换「Iteration 2 · 补丁旧结构」与「Oct Reset · 纸面重画新结构」，依次点击浏览 → 报名 → 返回，亲手体验受测者卡点如何被解决。"
    },
    "takeaway": {
      "en": "When usability sessions reveal missing back routes and ambiguous button states, redrawing the 5-screen IA on paper beats layering more UI patches.",
      "zh": "当可用性测试暴露出缺少返回路径与按钮状态歧义时，回到纸面重画五屏信息架构比在旧结构上继续打补丁更有效。"
    }
  },
  "processArtifacts": {
    "scrubber": {
      "eyebrow": {
        "en": "Process scrubber · Paper IA vs StudyBuddy UI",
        "zh": "前后对比拉杆 · 纸面线框 ↔ 高保真界面"
      },
      "title": {
        "en": "Compare the October 3 paper redraw with the shipped StudyBuddy interface",
        "zh": "拖动对比十月纸面架构重画与十一月高保真学习伙伴界面"
      },
      "summary": {
        "en": "Drag the divider or press Left/Right arrows to inspect how explicit back routes and match reasoning replaced opaque scores.",
        "zh": "左右拖动或按方向键对比：如何用五屏显性返回路径与匹配理由卡片取代早期黑箱契合度分数。"
      },
      "beforeLabel": {
        "en": "Before · Oct 3 IA Wireframe",
        "zh": "改造前 · 十月纸面重画线框"
      },
      "afterLabel": {
        "en": "After · StudyBuddy Screen",
        "zh": "改造后 · StudyBuddy 高保真界面"
      },
      "wireframeId": "connect-ia",
      "afterImage": {
        "src": "/projects/connect/02-app-studybuddy.png",
        "alt": {
          "en": "Final UQ Connect StudyBuddy match card listing 94% match alongside course, library, and group size",
          "zh": "UQ Connect 最终 StudyBuddy 匹配卡：94% 契合度旁写明课程、图书馆与小组规模"
        },
        "width": 1170,
        "height": 2532
      }
    },
    "quotes": {
      "eyebrow": {
        "en": "Research attribution · 71 sessions across 3 rounds",
        "zh": "调研原声与洞察归因卡 · 三轮 71 份记录"
      },
      "title": {
        "en": "Participant friction that directly triggered IA and UI changes",
        "zh": "直接触发信息架构与界面改动的受访者原话"
      },
      "items": [
        {
          "id": "connect-back",
          "category": "structure",
          "quote": {
            "en": "\"Can I go to the previous page? How can I do that?\"",
            "zh": "「我能回上一页吗？要怎么回？」"
          },
          "context": {
            "en": "Iteration 2 think-aloud session (17 Sep 2025)",
            "zh": "第二轮出声思考可用性测试（2025-09-17）"
          },
          "friction": {
            "en": "Patched sub-views lacked a consistent back bar inside nested tabs.",
            "zh": "打补丁叠出来的子页面被多层 Tab 包裹，缺少明确返回入口。"
          },
          "decision": {
            "en": "Stopped patching and redrew all 5 screens from Home on paper (Oct 3 reset).",
            "zh": "停止打补丁，10 月 3 日在一张纸上从首页重画全部 5 个主路径。"
          }
        },
        {
          "id": "connect-reason",
          "category": "trust",
          "quote": {
            "en": "Design premise: a bare match percentage does not say whether two students study at the same library or pace.",
            "zh": "设计前提：只给一个匹配百分比，看不出两人是不是去同一座图书馆、学习节奏合不合。"
          },
          "context": {
            "en": "Match-card design rationale; a premise, not a recorded quote",
            "zh": "匹配卡的设计理由，属于设计前提，并非录下的原话"
          },
          "friction": {
            "en": "A bare compatibility number gives no reason to message a stranger.",
            "zh": "只有一个匹配分数，给不出联系陌生人的理由。"
          },
          "decision": {
            "en": "Placed course, venue, availability, and small-group size directly on each card.",
            "zh": "直接在匹配卡列出课程、图书馆、空闲时段与小组人数作为行动依据。"
          }
        }
      ]
    }
  },
  "card": {
    "en": {
      "kicker": "Team project · Research and IA reset",
      "title": "UQ Connect",
      "sub": "A campus social platform redesigned mid-build from usability feedback to restore clear navigation and transparent peer matching.",
      "role": "Front-end system & research",
      "date": "Aug–Nov 2025 · coursework",
      "m1": "5-screen paper IA reset",
      "m2": "3 research & usability rounds",
      "m3": "Shared React design system"
    },
    "zh": {
      "kicker": "团队项目 · 研究与信息架构重构",
      "title": "UQ Connect",
      "sub": "面向国际学生的校园社交平台：围绕多轮研究反馈推倒重画全站信息架构，理顺导航与可解释的同伴匹配。",
      "role": "前端组件系统与研究",
      "date": "2025 年 8–11 月 · 课程项目",
      "m1": "五屏纸面架构重整",
      "m2": "三轮调研与可用性测试",
      "m3": "统一 React 组件系统"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "UQ Connect",
        "sub": "A social platform for international students, researched and built over one semester."
      },
      "roleVal": "Front-end component system, shared state, 14 of 71 sessions",
      "timeVal": "August–November 2025, university coursework",
      "teamVal": "Five-person course team",
      "toolsVal": "React · TypeScript · Tailwind · Figma Make · Paper",
      "ch": {
        "label": "The problem",
        "title": "The events already exist. The relationships do not.",
        "p": "UQ runs no shortage of events for international students, and students still end up in the same circle. A first-round participant named the ceiling exactly: it is hard to find common ground beyond being international. Large mixers were too loud to hold a conversation in, and event descriptions did not say what would actually happen or what the room would feel like — so a one-off produced an introduction and nothing after it."
      },
      "re": {
        "label": "Research",
        "title": "Three rounds, three fidelities, 71 research and testing records.",
        "m1": {
          "t": "Exploratory interviews",
          "b": "33 records in August, 7 of them mine, on why the events that already exist fail to connect people. My seven spanned six countries, seven degrees and three campuses, first year to Master's."
        },
        "m2": {
          "t": "Think-aloud usability testing",
          "b": "28 records in September, 5 mine, on a prototype that already ran — watching where people stalled."
        },
        "m3": {
          "t": "Task-based usability testing",
          "b": "10 records in November, 2 mine, on the built MVP: one chain, start to finish, unaided. My 14 sessions across the three rounds came from 9 people — 4 sat with me more than once, one all three times."
        },
        "quote": "Can I go to the previous page? How can I do that?",
        "quoteWho": "Iteration 2 participant, 17 September 2025"
      },
      "sy": {
        "label": "Synthesis",
        "title": "The barrier was pace and group size, not language.",
        "p": "Every hypothesis carried a numeric pass mark written before fieldwork began, though we never scored the records against them. Two assumptions did not survive the interviews, on qualitative evidence. Language proficiency was not the barrier — the same students, at the same level of English, went quiet in fast, crowded rooms and spoke freely in small, slow ones. And the gap was not exposure but follow-through: people found the events and still did not go. What did hold was repetition around a shared task — the students who stayed connected had met three or four times over something they were making together, a documentary shoot, a quartet. The cultural society cuts both ways for the same reason: it is the first place a student belongs, and then it is the reason they never leave it."
      },
      "id": {
        "label": "Design decisions",
        "p": "A recommended person shows the reason for the match — shared study habits, compatible schedules — rather than a compatibility score alone. Students were openly skeptical of black-box matching and acted on the same suggestion once it named a concrete reason. The cost is vertical space: fewer matches fit on a screen, and the list takes longer to scan. Discovery moved onto a campus map for a related reason — choosing from a map costs less than choosing from a list — but a map has to say who is already there and whether the walk is safe, or it relocates the hesitation instead of removing it. The competitor teardown pointed the same way: Griffith Mates launches at Orientation, runs a buddy program for four weeks, then keeps people in a Teams channel. The channel is the part doing the work, and a one-off event has no equivalent."
      },
      "pr": {
        "label": "Prototype",
        "p": "On 3 October, after the September sessions, we stopped patching and redrew the whole application on one sheet of paper: five screens, an arrow for every route off the home page, and one person's name against each feature area. The November build started from that sheet, as a shared component system with React context for cross-screen state rather than nineteen independently styled screens."
      },
      "te": {
        "label": "Usability test",
        "p": "In November a participant completed the full chain unaided — create a circle, set who can see it, open the chat, post, return to the list — and read the color-coded home screen as a map of the app. The entry point to Circles was still not obvious: he found it in the sidebar rather than on sight."
      },
      "ou": {
        "label": "What it produced",
        "m1": {
          "label": "Build",
          "v": "19 screens, one system"
        },
        "m2": {
          "label": "Research",
          "v": "71 sessions, 3 rounds"
        },
        "m3": {
          "label": "My share",
          "v": "14 interviews, front-end system"
        },
        "p": "A 19-screen mobile MVP on a shared component system, reached through three research rounds and a mid-build return to paper — 24 by the team's own MVP definition, which counts sub-views as pages. Evidence status — course project, five-person team. I owned the front-end component system and the shared state layer, wrote some of the backend routes and controllers, and ran 14 of the 71 sessions; the map, the wellness hub and the matching logic were other people's work. In January, after the semester was over, I took the codebase into my own repository and spent five days cutting it back to one design system — plus dark mode, an OAuth callback, and a deploy — across eight commits that added 1,068 lines and removed 2,348. That part is unambiguously mine: nine commits, all under my name, and it is the reason there is a build you can open at all. The MVP runs on mock data: the backend was written and never connected, so matching, messaging and scheduling have never met a real record, a concurrent user, or an empty state. No round recorded completion times or a fixed success criterion, so I can say the September navigation defect did not recur in November, and I cannot say by how much anything improved."
      },
      "rf": {
        "label": "Reflection",
        "p": "We wrote pass marks and never formally scored them. The thresholds still did real work — they disciplined what we asked, and stopped us reframing misses as findings — but the disconfirmation ended up qualitative, which is the exact failure mode writing them down is meant to prevent. Next time I score the transcripts against the thresholds and publish the table, pass or fail."
      }
    },
    "zh": {
      "hero": {
        "title": "UQ Connect",
        "sub": "一个面向国际学生的社交平台，一学期内做完研究并做出来。"
      },
      "roleVal": "前端组件系统、共享状态层，71 场研究与测试里的 14 场",
      "timeVal": "2025 年 8–11 月，课程项目",
      "teamVal": "五人课程团队",
      "toolsVal": "React · TypeScript · Tailwind · Figma Make · 纸",
      "ch": {
        "label": "问题",
        "title": "活动本来就有。关系没有。",
        "p": "UQ 给国际学生办的活动不少，学生还是留在同一个圈子里。第一轮的一位受访者把天花板说得很准：除了「大家都是国际学生」，很难再找到共同点。大型迎新活动吵到没法讲话，活动介绍又不说到底会发生什么、现场是什么气氛。于是一次性的活动制造了认识，后面就没有了。"
      },
      "re": {
        "label": "研究",
        "title": "三轮，三种保真度，71 份研究与测试记录。",
        "m1": {
          "t": "探索式访谈",
          "b": "八月 33 份记录，其中 7 场是我做的，问的是：已经存在的活动为什么没能把人连起来。我那七位来自六个国家和地区、七个专业、三个校区，从大一到硕士都有。"
        },
        "m2": {
          "t": "出声思考可用性测试",
          "b": "九月 28 份记录，其中 5 场是我做的，在一个已经能跑的原型上，看人在哪里卡住。"
        },
        "m3": {
          "t": "任务式可用性测试",
          "b": "十一月 10 份记录，其中 2 场是我做的，在做出来的 MVP 上：一条链路，从头走到尾，没人帮忙。我在三轮里做的 14 场，其实只来自 9 个人：有 4 位不止一次坐下来跟我聊，一位三轮都在。"
        },
        "quote": "我能回上一页吗？要怎么回？",
        "quoteWho": "第二轮受测者，2025 年 9 月 17 日"
      },
      "sy": {
        "label": "综合",
        "title": "障碍是节奏和人数规模，不是语言。",
        "p": "每条假设都带着一个进场前就写下来的数字及格线，只是我们没有拿记录逐条打分。有两条假设没经住访谈，这是定性判断。语言能力不是障碍：同一批学生、同样的英文水平，在快节奏、人多的场合会闭嘴，在小而慢的场合却讲得很自然。而缺口也不在曝光，在跟进：大家都找得到活动，还是没去。真正留得下来的，是围绕一件共同要做的事反复见面，那些关系维持住的学生，都是为了同一个东西见过三四次：一次纪录片拍摄、一个四重奏。文化社团正反两面也出自同一个道理：它是一个学生最先归属的地方，然后也成了他再没走出去的原因。"
      },
      "id": {
        "label": "设计决策",
        "p": "推荐一个人的时候，一并给出匹配理由（学习习惯相近、时间表兼容），而不是只给一个契合度分数。学生对黑箱匹配明确表示怀疑，但同一条推荐一旦说出具体理由，他们就愿意行动。代价是竖向空间：一屏能放的匹配更少，列表也更长。把「发现」挪到校园地图上也是相近的理由（从地图上挑，比从列表里挑省力），但地图必须说清楚现在那儿有谁、走过去安不安全，否则它只是把犹豫换了个地方，而不是消掉。竞品拆解指向同一件事：Griffith Mates 在迎新周启动，前四周跑一轮伙伴配对，之后靠一个 Teams 频道把人留住。真正起作用的是那个频道，而一场一次性的活动拿不出对应的东西。"
      },
      "pr": {
        "label": "原型",
        "p": "10 月 3 日，在九月那几场之后，我们不再打补丁，把整个应用重画在一张纸上：五个屏、每条从首页出发的路径都画上箭头、每块功能挂一个人名。十一月的开发就是从那张纸开始的：做成一套共享组件系统，用 React context 承载跨屏状态，而不是十九个各写各样式的屏。"
      },
      "te": {
        "label": "可用性测试",
        "p": "十一月，一位受测者独自走完了整条链路：创建圈子、设可见范围、进聊天室、发消息、回到列表，并且把配色化的首页读成了整个应用的地图。Circles 的入口仍然不够显眼：他是在侧栏里找到的，不是一眼看到的。"
      },
      "ou": {
        "label": "产出",
        "m1": {
          "label": "开发",
          "v": "19 屏，一套系统"
        },
        "m2": {
          "label": "研究",
          "v": "71 份记录，3 轮"
        },
        "m3": {
          "label": "我的部分",
          "v": "14 场访谈，前端系统"
        },
        "p": "一个建立在共享组件系统上的 19 屏移动端 MVP，经过三轮研究和一次开发中途回到纸面的重画，团队自己的 MVP 文档写的是 24 屏，那是把子视图也算成了页。证据状态：课程项目，五人团队。我负责前端组件系统和共享状态层，写了一部分后端路由与控制器，做了 71 场研究与测试里的 14 场；地图、wellness hub 和匹配逻辑是别人的工作。一月份，学期早就结束了，我把这套代码导进自己的仓库，花五天把它往回收成一套设计系统，另外加上暗色模式、一个 OAuth 回调和部署上线：八笔提交，加了 1,068 行，删掉 2,348 行。这一段归属毫无争议属于我：九笔提交全在我名下，也正因为有它，才有一个能直接点开的版本。MVP 跑在 mock 数据上：后端写了但从未接上，所以匹配、消息和日程从来没有面对过真实记录、并发用户或空状态。没有任何一轮记录过完成时间或事先定好的成功标准，所以我能说九月那个导航缺陷在十一月没有再出现，但说不出任何东西改善了多少。"
      },
      "rf": {
        "label": "反思",
        "p": "我们写了及格线，却从来没有真的去打分。那些阈值仍然起了作用（它们约束了我们问什么，也让我们没能把没测到的东西悄悄重新表述成发现），但最后那个「否定」是定性的，而这恰恰就是把阈值写下来本来要防的失败。下次我会拿逐字稿对照阈值逐条打分，然后把那张表放出来，不管过没过。"
      }
    }
  }
};
