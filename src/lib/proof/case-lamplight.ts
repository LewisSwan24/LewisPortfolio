/**
 * Lamplight Nook, added 2026-11-20.
 *
 * Sources: the public repositories `lamplight-nook` (README, CHANGELOG, commit
 * subjects to 32c5a61) and `lamplight-nook-site` (feature copy, screenshots),
 * plus two rounds of Lewis's answers on 2026-11-20. Those answers were picked
 * options, not his own sentences, so the copy states them as his decisions
 * without putting reasons in his mouth:
 * - why: both, to read the state of a long task and to make waiting on it
 *   feel better;
 * - his decisions: the café crew as the metaphor for the main agent and its
 *   subagents, decision cards for what needs him, and bought pixel art rather
 *   than generated images;
 * - code: mainly Claude Code;
 * - use: he runs it himself day to day. No one else is on record.
 *
 * Must not claim: user testing, downloads, a live Store listing, that he drew
 * the art or wrote the music, or a documented event-to-behaviour table.
 */
import type {
  CaseDepth,
  CaseInterviewPack,
  CaseInterviewPrompt,
  CaseInterviewScan,
  CaseSummary,
  ProofLocale,
} from "./types";

export const lamplightSummary: Record<ProofLocale, { lamplight: CaseSummary }> = {
  en: {
    lamplight: {
      challenge:
        "A long-running AI task shows up as a scrolling log. It is hard to tell who is working, how far the plan has got and whether the work is waiting for you, and watching a terminal for an hour is not restful.",
      role: "Solo: the café metaphor, the decision cards, the art direction and acceptance. Claude Code wrote the code",
      methods: ["metaphor-led interface design", "event-to-behaviour rules", "human-in-the-loop decision cards", "risk-gated confirmations", "versioned releases"],
      evidence: [
        "a Windows desktop app built on the Claude Agent SDK, from 0.1.0 on 22 October 2026 to 1.0.0 on 5 November, with 1.1 to 1.4 work since",
        "risky steps open a plain confirmation card that defaults to 'not now'; questions open a dialog",
        "Chinese and English throughout, following the system language",
      ],
      outcome:
        "A café crew that plays out a real Claude task: the plan on a blackboard, questions and risky steps as cards, and a small window that keeps watch when the shop is minimised. I use it day to day.",
      next: "Put it in front of other people running long agent tasks, and find out whether the café reads faster than a log or only feels nicer.",
    },
  },
  zh: {
    lamplight: {
      challenge: "一个跑很久的 AI 任务，呈现出来只是一屏不断滚动的日志。谁在做事、计划做到哪、是不是在等你，都很难看出来；盯着终端一小时也让人放松不下来。",
      role: "独立完成：咖啡馆的比喻、决定卡、美术方向与验收由我负责，代码由 Claude Code 编写",
      methods: ["以比喻带动的界面设计", "事件到角色行为的规则", "人在回路的决定卡", "按风险把关的确认", "按版本发布"],
      evidence: [
        "基于 Claude Agent SDK 的 Windows 桌面应用，2026 年 10 月 22 日 0.1.0，11 月 5 日 1.0.0，之后在做 1.1 到 1.4",
        "有风险的步骤弹出一张朴素的确认卡，默认选项是「先不要」；提问则打开对话框",
        "全程中英双语，跟随系统语言",
      ],
      outcome: "一组咖啡馆店员演出真实的 Claude 任务。计划写在黑板上，提问和风险步骤变成卡片，店面最小化后还有一个小窗守着。我自己日常在用。",
      next: "请其他跑长任务的人来用，弄清楚咖啡馆到底比日志读得更快，还是只是看着更舒服。",
    },
  },
};

export const lamplightDepth: Record<ProofLocale, { lamplight: CaseDepth }> = {
  en: {
    lamplight: {
      decisions: [
        {
          label: "A café crew, not a dashboard",
          choice: "The main agent and its subagents are played by a small café crew: Wick plans the job, Clem looks things up, Iris settles colours and layout, Flint checks the work.",
          evidence: "Lewis picked this metaphor as his own decision. Characters walk, work, get stuck, ask for help and wrap up from real Claude Agent SDK events.",
          tradeoff: "A metaphor has to be mapped event by event, and anything it cannot show still needs plain words.",
          impact: "Who is busy and who is stuck can be seen at a glance instead of read from a log.",
        },
        {
          label: "What needs you becomes a card",
          choice: "Questions open a dialog; risky steps open a plain confirmation card that defaults to 'not now'.",
          evidence: "Lewis picked the decision cards as his own decision. The README describes the dialog and the default.",
          tradeoff: "A default of 'not now' can stall a task until someone answers.",
          impact: "Nothing risky goes ahead by accident, and a waiting question is hard to miss.",
        },
        {
          label: "Bought art, not generated",
          choice: "The pixel art comes from purchased LimeZu packs, recolored and assembled by scripts in the repository.",
          evidence: "Lewis picked this as his own decision. The README and docs/art.md record the packs and their license; the site credits LimeZu.",
          tradeoff: "A pack's license limits what can be redistributed, and it does not draw anything the pack lacks.",
          impact: "The café looks consistent, and its sources and credits can be stated.",
        },
      ],
      evidence: [
        {
          method: "Release history",
          sample: "25 commits on the public repository, one squashed commit per version, 22 October to 20 November 2026",
          question: "How far has it gone, and in what order?",
          finding: "0.1.0 on 22 October, 0.6.0 on 30 October, 'Safety before 1.0' and 1.0.0 on 4 and 5 November, then 1.1 to 1.4 work.",
          implication: "The order is visible; the fine-grained process inside each version is not.",
        },
        {
          method: "Replay without the API",
          sample: "A bundled real recording and the debug panel",
          question: "Can the scene be checked without spending on a live task?",
          finding: "The debug panel replays the recording, previews decision cards and walks characters between anchors.",
          implication: "Behaviour can be re-run the same way each time; it is my check, not a user study.",
        },
        {
          method: "Daily use",
          sample: "Lewis, running his own Claude tasks",
          question: "Does it hold up on real work?",
          finding: "He uses it day to day. No one else's use is on record.",
          implication: "Evidence that it runs on real tasks, not that it helps other people read them.",
        },
      ],
      iterations: [
        {
          version: "0.1.0 → 0.6.0",
          change: "From the first café to a crew with a designer, Iris, and a back garden.",
          reason: "The site update for 0.6.0 names Iris the designer and a garden section; the reasons are not recorded.",
          improvement: "Released as 0.6.0 on 30 October 2026, with fresh screenshots on the site.",
        },
        {
          version: "1.0.0",
          change: "A pass titled 'Safety before 1.0', then polish to the slip, font, rug, titles, blackboard and bubbles.",
          reason: "The commit before 1.0.0 is titled 'Safety before 1.0'.",
          improvement: "1.0.0 on 5 November 2026.",
        },
        {
          version: "1.1 → 1.4",
          change: "Working in place only inside a folder chosen to lend, and Word, Excel, PowerPoint and PDF results with previews on the result card.",
          reason: "From the commit subjects; the reasons are not recorded.",
          improvement: "In the repository since 16 and 19 November 2026; not yet released.",
        },
      ],
      limits: [
        {
          constraint: "No one but Lewis has used it on record, and there has been no user testing.",
          whyItMatters: "Whether the café reads faster than a log for other people is the open question.",
          nextValidation: "Watch a few people run the same task with the café and with a plain log.",
        },
        {
          constraint: "The Windows installer is not code-signed, and the Microsoft Store listing is not live.",
          whyItMatters: "Anyone else installing it meets a warning first.",
          nextValidation: "Sign the installer, or ship through the Store, before asking anyone to try it.",
        },
        {
          constraint: "The code was written by Claude Code; the art is purchased LimeZu packs recolored by script; the music is Alex Morgan's, under CC BY 4.0.",
          whyItMatters: "The case is about interaction design and direction, not hand-written code or original art.",
          nextValidation: "Keep the credits and the authorship line wherever the app is shown.",
        },
      ],
      takeaway:
        "A metaphor earns its place when it carries state: who is working, what is done and what is waiting for you. The café is my answer to that; whether it reads faster than a log for anyone else is still untested.",
    },
  },
  zh: {
    lamplight: {
      decisions: [
        {
          label: "用咖啡馆店员，不用仪表板",
          choice: "主代理和子代理由一组咖啡馆店员来演：Wick 规划，Clem 跑出去查资料，Iris 定配色和版面，Flint 检查成品。",
          evidence: "这个比喻是 Lewis 自己选定的决定。角色会根据 Claude Agent SDK 的真实事件走动、干活、卡住、求助和收尾。",
          tradeoff: "比喻要逐个事件对上，比喻表达不了的部分仍然得用文字说明。",
          impact: "谁在忙、谁卡住了，扫一眼就看得出来，不用读日志。",
        },
        {
          label: "需要你的事做成卡片",
          choice: "提问打开对话框；有风险的步骤弹出一张朴素的确认卡，默认选项是「先不要」。",
          evidence: "决定卡是 Lewis 自己选定的决定。README 写明了对话框和默认选项。",
          tradeoff: "默认「先不要」可能让任务停住，直到有人回答。",
          impact: "有风险的步骤不会误放行，等着回答的问题也很难漏看。",
        },
        {
          label: "用买来的素材，不用生成图",
          choice: "像素美术来自付费的 LimeZu 素材包，由仓库里的脚本重新上色和拼装。",
          evidence: "这是 Lewis 自己选定的决定。README 和 docs/art.md 记录了素材包与授权，网站标注了 LimeZu。",
          tradeoff: "素材包的授权限制了能公开分发的内容，素材包里没有的东西也画不出来。",
          impact: "咖啡馆的画风一致，来源和署名都说得清楚。",
        },
      ],
      evidence: [
        {
          method: "版本记录",
          sample: "公开仓库 25 次提交，每个版本压成一次，2026 年 10 月 22 日到 11 月 20 日",
          question: "做到哪了，按什么顺序做的？",
          finding: "10 月 22 日 0.1.0，10 月 30 日 0.6.0，11 月 4 日「Safety before 1.0」，5 日 1.0.0，之后做 1.1 到 1.4。",
          implication: "顺序看得到；每个版本内部的细节过程看不到。",
        },
        {
          method: "不调用 API 的回放",
          sample: "随附的一份真实录制和调试面板",
          question: "不花钱跑真任务，能不能检查画面？",
          finding: "调试面板能回放录制、预览决定卡，让角色在锚点之间走动。",
          implication: "行为每次都能同样重跑；这是我自己的检查，不是用户研究。",
        },
        {
          method: "日常使用",
          sample: "Lewis 自己跑的 Claude 任务",
          question: "放在真实工作上撑得住吗？",
          finding: "他日常在用。没有其他人使用的记录。",
          implication: "能证明在真任务上跑得起来，证明不了能帮别人读懂任务。",
        },
      ],
      iterations: [
        {
          version: "0.1.0 → 0.6.0",
          change: "从第一版咖啡馆，到加入设计师 Iris 和后院的店员阵容。",
          reason: "0.6.0 的网站更新写到设计师 Iris 和后院；原因没有记录。",
          improvement: "2026 年 10 月 30 日发布 0.6.0，网站换上新截图。",
        },
        {
          version: "1.0.0",
          change: "先做一轮「Safety before 1.0」，再打磨委托单、字体、地毯、标题、黑板和气泡。",
          reason: "1.0.0 之前的那次提交标题是「Safety before 1.0」。",
          improvement: "2026 年 11 月 5 日发布 1.0.0。",
        },
        {
          version: "1.1 → 1.4",
          change: "只在借出的文件夹里就地工作；结果卡支持 Word、Excel、PowerPoint 和 PDF 预览。",
          reason: "出自提交标题；原因没有记录。",
          improvement: "11 月 16 日和 19 日进了仓库，尚未发布。",
        },
      ],
      limits: [
        {
          constraint: "有记录的使用者只有 Lewis 本人，也没有做过用户测试。",
          whyItMatters: "咖啡馆对别人来说是不是比日志读得更快，正是还没回答的问题。",
          nextValidation: "请几个人分别用咖啡馆和纯日志跑同一个任务，观察差别。",
        },
        {
          constraint: "Windows 安装包没有代码签名，Microsoft Store 也还没上架。",
          whyItMatters: "别人安装时会先看到警告。",
          nextValidation: "请别人试用前，先给安装包签名或走 Store 发布。",
        },
        {
          constraint: "代码由 Claude Code 编写；美术是付费的 LimeZu 素材包经脚本重新上色；音乐来自 Alex Morgan，CC BY 4.0 授权。",
          whyItMatters: "这个案例讲的是交互设计和方向，不是手写代码或原创美术。",
          nextValidation: "在任何展示这个应用的地方都保留署名和分工说明。",
        },
      ],
      takeaway: "比喻要能承载状态才算有用：谁在干活、做完了什么、什么在等你。咖啡馆是我的回答；对别人来说是否比日志读得更快，还没测过。",
    },
  },
};

export const lamplightScan: Record<ProofLocale, { lamplight: CaseInterviewScan }> = {
  en: {
    lamplight: {
      proves: "This case shows I can turn the state of a long AI task into an interface a person can read at a glance, and keep the person in charge of what is risky.",
      inspect: [
        "How the café crew maps the main agent and its subagents.",
        "Why a risky step defaults to 'not now'.",
        "What the case says no one but me has tried.",
      ],
      questions: ["Why a café instead of a progress dashboard?", "What does the confirmation card protect against?"],
      bestFit: ["Teams designing interfaces for AI agents and long-running tasks.", "Products where a person has to stay in charge of what an automated system does."],
    },
  },
  zh: {
    lamplight: {
      proves: "这个案例说明我能把 AI 长任务的状态做成一眼看得懂的界面，并让人始终掌握有风险的步骤。",
      inspect: ["咖啡馆店员怎么对应主代理和子代理。", "为什么风险步骤默认「先不要」。", "案例写明了哪些只有我自己试过。"],
      questions: ["为什么用咖啡馆，而不是进度仪表板？", "确认卡防的是什么？"],
      bestFit: ["为 AI 代理和长任务设计界面的团队。", "需要人始终掌控自动化系统行为的产品。"],
    },
  },
};

export const lamplightPrompts: { lamplight: CaseInterviewPrompt[] } = {
  lamplight: [
    {
      question: "Which events make a character get stuck or ask for help?",
      reason: "Tests whether the metaphor carries real state or only decoration.",
      anchorId: "decision-timeline",
    },
    {
      question: "How can the scene be checked without running a live task?",
      reason: "Separates repeatable checks from impressions.",
      anchorId: "evidence-board",
    },
    {
      question: "Only you have used it. What does the case claim?",
      reason: "Keeps daily personal use apart from evidence that it helps others.",
      anchorId: "outcome-limits",
    },
  ],
};

export const lamplightPack: Record<ProofLocale, { lamplight: CaseInterviewPack }> = {
  en: {
    lamplight: {
      answers: [
        {
          id: "lamplight-metaphor",
          question: "Why a café instead of a progress dashboard?",
          answer:
            "I wanted two things from it: to read the state of a long task, and to make waiting on it feel better. In the café the main agent and its subagents are a crew. Wick plans and chalks the real to-do list on a blackboard, Clem looks things up, Iris settles colors and layout, Flint checks the work. Who is busy, stuck or waiting shows as what a character is doing.",
          evidenceHref: "/projects/lamplight#decision-timeline",
          boundary: "Whether the café reads faster than a log for anyone else is untested.",
        },
        {
          id: "lamplight-decision-cards",
          question: "What does the confirmation card protect against?",
          answer:
            "A risky step going ahead because nobody was watching. Questions open a dialog, and a risky step opens a plain card whose default is 'not now'. When the shop is minimized, a small window shows who is working and calls you when a question is waiting.",
          evidenceHref: "/projects/lamplight#decision-timeline",
          boundary: "The trade-off is that a task can stall until someone answers.",
        },
        {
          id: "lamplight-authorship",
          question: "What did you do, and what did the tools do?",
          answer:
            "Claude Code wrote the code. My decisions were the café crew as the metaphor, the decision cards, and using bought pixel art rather than generated images. The art is LimeZu's, recolored by scripts; the music is Alex Morgan's under CC BY 4.0.",
          evidenceHref: "/projects/lamplight#outcome-limits",
          boundary: "I did not write the code, draw the art or make the music.",
        },
      ],
      managerFollowUp: {
        id: "lamplight-manager-follow-up",
        question: "Only you use it. Why is it in the portfolio?",
        answer:
          "Because it is the interaction problem AI tools are creating: a person waiting on an agent needs to know what it is doing and step in at the right moment. The case shows one answer, built to 1.0 and used on real tasks.",
        evidenceHref: "/projects/lamplight#outcome-limits",
        boundary: "It needs other people running long tasks before it is evidence of more than my own use.",
      },
    },
  },
  zh: {
    lamplight: {
      answers: [
        {
          id: "lamplight-metaphor",
          question: "为什么用咖啡馆，而不是进度仪表板？",
          answer:
            "我想要两样东西：看得懂长任务的状态，也让等待的感觉好一点。在咖啡馆里，主代理和子代理是一组店员。Wick 负责规划，把真实的待办清单写在黑板上；Clem 跑出去查资料，Iris 定配色和版面，Flint 检查成品。谁在忙、谁卡住、谁在等，都体现在角色正在做的事上。",
          evidenceHref: "/projects/lamplight#decision-timeline",
          boundary: "咖啡馆对别人是否比日志读得更快，还没测过。",
        },
        {
          id: "lamplight-decision-cards",
          question: "确认卡防的是什么？",
          answer: "防的是没人看着时，有风险的步骤自己往下走。提问打开对话框，风险步骤弹出一张默认「先不要」的朴素卡片。店面最小化后，小窗显示谁在干活，有问题等着时会叫你。",
          evidenceHref: "/projects/lamplight#decision-timeline",
          boundary: "代价是任务可能停住，直到有人回答。",
        },
        {
          id: "lamplight-authorship",
          question: "你做了什么，工具做了什么？",
          answer: "代码由 Claude Code 编写。我的决定是用咖啡馆店员做比喻、做决定卡，以及用买来的像素素材而不用生成图。美术是 LimeZu 的，经脚本重新上色；音乐来自 Alex Morgan，CC BY 4.0 授权。",
          evidenceHref: "/projects/lamplight#outcome-limits",
          boundary: "代码、美术和音乐都不是我做的。",
        },
      ],
      managerFollowUp: {
        id: "lamplight-manager-follow-up",
        question: "只有你自己在用，为什么放进作品集？",
        answer: "因为这正是 AI 工具带来的交互问题：等着代理干活的人，需要知道代理在做什么，并在对的时候插手。这个案例给出一种回答，做到了 1.0，也用在真实任务上。",
        evidenceHref: "/projects/lamplight#outcome-limits",
        boundary: "要有其他跑长任务的人用过，这个案例才不只是我个人使用的证据。",
      },
    },
  },
};
