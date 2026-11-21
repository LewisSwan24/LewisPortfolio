import type { CaseRecord } from "@/lib/cases/schema";

export const rulesCase: CaseRecord = {
  "slug": "rules",
  "status": "unlisted",
  "roleTracks": [
    "product",
    "interaction"
  ],
  "workSummary": {
    "tags": ["research"],
    "year": "2025",
    "dur": "Coursework (unlisted)",
    "problem": {
      "en": "High-level UX guidelines stay too vague for engineers to implement or refute",
      "zh": "抽象的 UX 设计准则过软，工程师既难以施工也难以反驳校验"
    },
    "changed": {
      "en": "Compiled soft briefs into falsifiable numeric thresholds (48 px tap floor, 150–250 m lead)",
      "zh": "把抽象准则压缩成可被反驳与验证的数字规则（48 px 触控下限、150–250 m 提前量）"
    }
  },
  "reviewMeta": {
    "reviewedAt": "2026-11-21",
    "nextReviewAt": "2027-02-21",
    "auditNote": "Confirmed unlisted archive status and DECO7250 coursework boundary for V3.1 baseline."
  },
  "links": [],
  "media": {
    "label": "Both briefs, side by side",
    "labelZh": "两份作业并排",
    "blurb": "One turns 'safety' into routing weights, warning distances and tap sizes. The other turns a peer-reviewed paper into trigger conditions, copy templates and a checklist. Same move, twice.",
    "blurbZh": "一份把「安全」变成路线权重、提示距离和点击区尺寸；另一份把一篇同行评审论文变成触发条件、文案模板和自查清单。同一个动作，做了两遍。",
    "images": [
      {
        "src": "/projects/rules/01-fietspad-ui.png",
        "width": 2093,
        "height": 1361,
        "alt": "Three dark-theme phone screens: a home screen with mode selection and recent routes, a planning screen with a rider profile, and a riding screen with a left-hook warning and hazard list",
        "altZh": "三张深色主题的手机界面：模式选择与最近路线的首页、含骑行档案的规划页、以及骑行中的左勾弯风险提示与危险清单",
        "caption": "Fietspad is Dutch for bike path, and the hazard categories are cycling-specific too: left hook, dooring zone, shared lane. The hazard list carries an audio toggle, because a rider cannot look at a screen.",
        "captionZh": "产品名 Fietspad 是荷兰语的「自行车道」。危险分类也是自行车专用的：左勾弯、开门区、共享道。清单上带音频开关，因为人在骑车时看不了屏。"
      },
      {
        "src": "/projects/rules/02-guide-frames.jpg",
        "width": 8297,
        "height": 2306,
        "alt": "Eight phone-shaped guide panels in a row: failure symptoms, impact, do and do-not, trigger thresholds, copy templates, before and after, a self-check list, and closing actions",
        "altZh": "八格手机样式的图文指南横排：从失效现象、影响、该做与不该做、触发阈值、文案模板、效果对比、自查清单到收尾行动",
        "caption": "Three failure causes became three independent triggers rather than one generic warning, each with its own copy in a fixed format: symptom, then one action, verb first.",
        "captionZh": "三种失效成因变成三条独立触发条件，而不是一句通用警告；各配各的文案，格式固定为「现象 → 一个动作」，动词开头。"
      }
    ]
  },
  "card": {
    "en": {
      "kicker": "Specification · Design systems",
      "title": "Requirements into Rules",
      "sub": "Two coursework briefs doing the same thing: forcing a soft requirement into a rule someone can build to, and argue with.",
      "role": "Lead Developer on one, sole author on the other",
      "date": "2025 · DECO7250, submitted and marked",
      "m1": "150–250 m warning lead (draft)",
      "m2": "48 px tap-target floor (draft)",
      "m3": "1 paper → 3 trigger conditions"
    },
    "zh": {
      "kicker": "规格 · 设计系统",
      "title": "把要求变成规则",
      "sub": "同一门课的两份作业，做的是同一个动作：把一个说起来很软的要求，变成一条能照着施工、也能照着检查的规则。",
      "role": "一份任 Lead Developer，一份全部由我完成",
      "date": "2025 · DECO7250，已提交并评分",
      "m1": "150–250 m 提示提前量（草稿）",
      "m2": "48px 点击区下限（草稿）",
      "m3": "1 篇论文 → 3 条触发条件"
    }
  },
  "narrative": {
    "en": {
      "hero": {
        "title": "Requirements into Rules",
        "sub": "Two briefs from one course, doing the same thing: taking a requirement everyone agrees with and forcing it into a rule that can be built to — and argued against."
      },
      "roleVal": "Fietspad was a team project and I was Lead Developer: I built the back-end prototype with AI coding tools and generated the high-fidelity interface in Figma Make, which a teammate rebuilt in Figma Design; the Quest 3 guide was individual and entirely mine",
      "timeVal": "2025 · DECO7250 Human-Computer Interaction, submitted and marked",
      "teamVal": "One team, one solo",
      "toolsVal": "Figma · Figma Make · Miro · Otter · ChatGPT · literature translation",
      "ch": {
        "label": "The problem",
        "title": "'Make cycling safer' is a sentence nobody can build to and nobody can argue with.",
        "p": "Neither can 'warn people in time'. Everyone agrees with them in a document, and neither survives contact with an engineer. The real design work happens in the step that forces them into numbers: how many metres before the hazard, which lane types get down-weighted, how small a tap target may be, and when not to warn at all. Once that is done the rule can be executed — and, more importantly, someone can point at it and say this one is wrong. Being refutable is the precondition for being useful."
      },
      "re": {
        "label": "Working with AI",
        "title": "AI is an accelerator for breadth. Depth is still a person's job.",
        "m1": {
          "t": "Confident and unsourced",
          "b": "Generative drafts produced claims that sounded settled and had nothing behind them. Every figure without a source was deleted, claims were verified against official sources, and known local examples went in instead."
        },
        "m2": {
          "t": "Fidelity drift",
          "b": "Figma Make's layout fidelity was unstable — a small prompt change caused a large deviation. It was demoted to a reference export, and every screen was rebuilt in Figma Design."
        },
        "m3": {
          "t": "Flattened tensions",
          "b": "AI merges contradictory findings into a single theme. Edge cases went into a separate table — night-riding confidence, wet-weather risk, large e-bikes that do not fit narrow racks — and each later became a specific feature."
        },
        "quote": "Verify transcripts against audio · check claims against official sources · rewrite AI copy · walk the flow with think-aloud · delete features that only add complexity",
        "quoteWho": "Quality control, as five actions rather than an attitude"
      },
      "sy": {
        "label": "The system idea",
        "title": "The proposal drafts turned safety into metres, pixels and routing weights.",
        "p": "Bike lanes end abruptly and dump riders into traffic. The proposal drafts named the phenomenon, the '25-metre bike lane', and proposed down-weighting lanes that are only a layer of paint; AI wrote most of those drafts. The back-end prototype I built with AI coding tools filters segments by level of traffic stress, and the final proposal made 'Calmest' the default route. Hazard categories are cycling-specific rather than generic: left hook, dooring zone, shared lane. The drafts set warnings 150–250 m ahead, delivered by audio and haptics so they do not take the eyes, and a 48 px tap-target floor is one item on the drafts' self-check list. The final proposal kept pre-alerts before roundabouts and left hooks."
      },
      "id": {
        "label": "Interface decisions",
        "p": "Warnings state behavior, not direction: take the lane and make eye contact with turning drivers, or take the alternate street — because that is the real response to a left hook, not 'turn left'. The detour button carries its own cost, stating the extra minutes on the button itself, while 'keep current route' remains an equal-weight primary action; the interface does not assume the safer route is the right route. Distances are given as distance — 200 m, 450 m, 1.2 km — not as junction counts, because there is no stable 'next intersection' while riding. And the entry button reads 'See safer routes', comparative rather than superlative, because no available data supports the word 'safest'."
      },
      "pr": {
        "label": "The second brief",
        "p": "A VR headset watches your hands with cameras. In low light, when the hands overlap, or when a hand leaves the field of view, tracking breaks and the virtual hand vanishes. A 2025 peer-reviewed paper showed that warning before the break is effective. The brief was to turn that into something a designer can act on tomorrow: three failure causes became three independent trigger conditions with their own copy, rather than one generic warning; the detection lead time became a per-cause threshold — roughly three seconds ahead in low light, risk-threshold triggers for out-of-view and occlusion, ignoring micro-jitter and applying a cooldown; and the copy convention became uniform, symptom then one action, verb first."
      },
      "te": {
        "label": "How far the testing went",
        "p": "Think-aloud walkthrough, and no further. The proposal drafts' self-check list claims 6 of 6 — which is a self-check, not external validation, and the case says so rather than letting the number imply more. A walkthrough catches comprehension problems. It does not catch what happens when someone is riding, tired, wet or in traffic, and the audio warning in particular exists precisely because a rider cannot look at a screen."
      },
      "ou": {
        "label": "What this case produced",
        "m1": {
          "label": "warning lead in the proposal drafts",
          "v": "150–250 m"
        },
        "m2": {
          "label": "tap-target floor, one item on the drafts' checklist",
          "v": "48 px"
        },
        "m3": {
          "label": "paper turned into independent triggers",
          "v": "1 → 3"
        },
        "p": "A route app's interface and design system, an AI usage register, an eight-panel guide and its analysis. Evidence status: both were submitted and marked, neither shipped. The guide's effect figures — roughly 83% for out-of-view and 62% for mutual occlusion — are the cited paper's experimental results, not mine, and a separate section lists what that study cannot support: three causes only, Quest 3 only, mostly right-handed young participants, short lab tasks. Fietspad's route proportions are demonstration figures."
      },
      "rf": {
        "label": "Reflection",
        "p": "Putting the two briefs together is the point. In Fietspad, the proposal drafts turned 'safety' into routing weights, warning distances and tap sizes, and AI wrote most of those drafts. The other brief is where I turned a paper into trigger conditions, copy templates and a checklist myself. What survives outside a course is the move itself — and the discipline of saying where the rule stops holding, rather than letting a self-check stand in for evidence someone else produced."
      }
    },
    "zh": {
      "hero": {
        "title": "把要求变成规则",
        "sub": "同一门课的两份作业，做的是同一个动作：把一句所有人都同意的要求，逼成一条能照着施工、也能被反驳的规则。"
      },
      "roleVal": "Fietspad 是团队项目，我是 Lead Developer：后端原型用 AI 编码工具搭，高保真界面由我用 Figma Make 生成、组员在 Figma Design 重建。Quest 3 指南是个人作业，全部内容由我完成",
      "timeVal": "2025 · DECO7250 人机交互，已提交并评分",
      "teamVal": "一份团队，一份个人",
      "toolsVal": "Figma · Figma Make · Miro · Otter · ChatGPT · 文献翻译",
      "ch": {
        "label": "问题",
        "title": "「让骑车更安全」，是一句没人能施工、也没人能反驳的话。",
        "p": "「预警有效」也一样。写在文档里谁都同意，但没有一句撑得过跟工程师的第一次对话。真正的设计工作发生在把它们逼成数字的那一步：多少米之前提示、哪一类车道要降权、点击区不小于多少、什么情况下不该提示。这一步做完，规则才既能执行、也能被人指着说「这条不对」。能被反驳，是它有用的前提。"
      },
      "re": {
        "label": "和 AI 一起做",
        "title": "AI 是广度的加速器，深度得人自己补。",
        "m1": {
          "t": "自信但空洞",
          "b": "生成工具给出听起来笃定、实则无据的说法。做法是对照官方来源逐条核实，删掉所有没有出处的数字，补进确知的本地例子。"
        },
        "m2": {
          "t": "保真度漂移",
          "b": "Figma Make 的版面保真度不稳，小改提示词导致大幅偏移。最后只把它当参考导出，每一屏在 Figma Design 重建。"
        },
        "m3": {
          "t": "细节被抹平",
          "b": "AI 会把互相矛盾的张力并成一个主题。把边缘案例单独列一张表：夜骑信心、雨天风险、大型电辅车停不进窄车架，它们后来各自变成了具体功能。"
        },
        "quote": "核对转录与音频 · 对照官方来源核实说法 · 重写 AI 文案 · 用出声思考测流程 · 删掉那些只增加复杂度的功能",
        "quoteWho": "质量控制：五条具体动作，不是态度"
      },
      "sy": {
        "label": "系统概念",
        "title": "提案草稿把安全写成了米数、像素和路线权重。",
        "p": "自行车道会突然断掉，把人甩到主干道上。提案草稿给这个现象起了名字（「25 米自行车道」），并提出给只有一层油漆的车道降权，草稿多由 AI 起草。我用 AI 编码工具搭的后端原型按交通压力等级筛路段，最终提案把「最平稳」设为默认路线。危险分类是自行车专用的，不是泛泛的「注意安全」：左勾弯、开门区、共享道。草稿写的是提前 150–250 m 提示，走音频与触觉，不占视线；点击区下限 48px 是草稿自查清单里的一条。最终提案保留了环岛与左勾弯前的预警。"
      },
      "id": {
        "label": "界面决策",
        "p": "提示给的是行为，不是方向：「占道，并与转弯车辆做眼神确认，或走 Fish Lane 绕行」，因为左勾弯的真实应对方式是占位加眼神，不是「左转」。绕路按钮自带代价，把多花的分钟数写在按钮上；而「保持原路线」是平等的一级按钮，界面不假设安全的那条就是对的那条。距离按距离给（200m、450m、1.2km），不按路口给，因为骑行中没有「下一个路口」这种稳定参照。入口按钮写的是「See safer routes」，比较级不是最高级，因为没有任何数据能支撑「最安全」这三个字。"
      },
      "pr": {
        "label": "另一份作业",
        "p": "VR 头显靠摄像头看手。光线不够、两手叠住、手移出视野，追踪就断，虚拟的手会突然消失。有一篇 2025 年的同行评审论文证明了「断之前给预警」有效。这份作业是把它变成设计师明天就能照着做的东西：三种失效成因变成三条独立触发条件、各配各的文案，不合并成一句通用警告；检测的提前量变成各自的阈值：低光约提前 3 秒，出视野与互遮按风险阈值触发，忽略微抖动并加冷却；文案统一写成「现象 → 一个动作」，动词开头，只给一件事做。"
      },
      "te": {
        "label": "测试做到哪一层",
        "p": "出声思考走查，到此为止。草稿的自查清单写着 6/6 通过：那是自查清单，不是外部验证，案例直接这么写，而不是让这个数字去暗示更多。走查能抓到理解上的问题，抓不到一个人在骑行中、累了、下雨、车流里会发生什么。音频提示尤其如此：它存在的理由本来就是「人在骑车时看不了屏」。"
      },
      "ou": {
        "label": "这个案例产出了什么",
        "m1": {
          "label": "提案草稿里的提示提前量",
          "v": "150–250 m"
        },
        "m2": {
          "label": "点击区下限，草稿自查清单里的一条",
          "v": "48px"
        },
        "m3": {
          "label": "篇论文变成独立触发条件",
          "v": "1 → 3"
        },
        "p": "一个自行车路线 App 的界面稿与设计系统、一份 AI 使用标注册、一份八格图文指南与分析正文。证据状态：两份均已提交并评分，都没有上线。指南里的效果数字（出视野约 83%、互遮约 62%）是所引论文的实验结果，不是我的；我另写了一节列出原研究撑不起的部分：只覆盖三种成因、只在 Quest 3 上做、受试者以右利手年轻人为主、实验室短时任务。Fietspad 提案里的路线比例是演示数字。"
      },
      "rf": {
        "label": "反思",
        "p": "把两份放在一起才是重点。Fietspad 的提案草稿把「安全」写成了路线权重、提示距离和点击区尺寸，草稿多由 AI 起草。另一份是我自己把一篇论文变成触发条件、文案模板和自查清单。离开课程之后能留下的是那个动作本身，以及一条纪律：说清楚这条规则在哪里失效，而不是让一份自查清单，去顶替别人做出来的证据。"
      }
    }
  }
};
