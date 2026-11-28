import {
  recentCaseDepth,
  recentCaseInterviewScans,
  recentCaseReaderPrompts,
  recentCaseSummaries,
} from "./recent-cases";
import { lamplightDepth, lamplightPrompts, lamplightScan, lamplightSummary } from "./case-lamplight";
import { autofillDepth, autofillPrompts, autofillScan, autofillSummary } from "./case-autofill";
import { walkieDepth, walkiePrompts, walkieScan, walkieSummary } from "./case-walkie";
import { fencepostDepth, fencepostPrompts, fencepostScan, fencepostSummary } from "./case-fencepost";
import type {
  CaseDepth,
  CaseInterviewPrompt,
  CaseInterviewScan,
  CaseReaderGuide,
  CaseReaderMode,
  CaseReaderSection,
  CaseSummary,
  ProjectEvidenceSlug,
  ProofLocale,
} from "./types";

/**
 * Read the note on `CaseDepth` in ./types before adding case copy here.
 *
 * Of everything in this file, only `caseSummaries` and `caseDepth[*].limits`
 * are rendered. The decisions, evidence, iterations and takeaways are kept as
 * interview preparation and are held to a standard by the tests, but no reader
 * ever sees them — the narrative they used to feed now lives under `cs.<slug>`
 * in src/messages/{en,zh}.json.
 */


const caseSummaries: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseSummary>> = {
  en: {
    connect: {
      challenge: "UQ runs no shortage of events for international students. They still end up in the same circle — a one-off mixer produces an introduction, not a relationship.",
      role: "One of five on a course team; I owned the front-end component system and ran 14 of the 71 sessions",
      methods: ["exploratory interviews", "falsifiable test cards", "think-aloud usability testing", "paper-to-interactive prototyping", "component system design"],
      evidence: [
        "71 research and test sessions across three rounds; my 14 sessions covered 9 participants, 4 of whom came back in a later round",
        "13 hypotheses, each carrying a numeric pass mark written before any data was collected",
        "14 learning cards — 12 answering a hypothesis, 2 the data raised on its own",
      ],
      outcome: "A 19-screen mobile MVP reached through three rounds of research and two prototype generations — 24 by the team's own MVP definition, which counts sub-views as pages. I carried it on alone in January and deployed it. Runs on mock data; the backend was written and never connected.",
      next: "I would connect the backend and re-run the task chain with completion times, so the third round produces a number instead of an impression.",
    },
    spectra: {
      challenge: "Font, spacing and contrast are set by whoever built the page, so a reader who needs something different has no way in.",
      role: "Solo design and build",
      methods: ["WCAG text-spacing criteria", "existing-extension teardown", "cross-site injection testing"],
      evidence: ["a working Chrome extension", "Jest coverage of the settings layer", "manual checks across documentation, news and single-page apps"],
      outcome: "An extension that rewrites type and spacing on any page from one popup, in English and Simplified Chinese, with one global set of settings. DEMO stage.",
      next: "I would put it in front of someone who actually reads this way and watch which controls they never touch.",
    },
    maze: {
      challenge:
        "A physical maze just sits there. Making it read as a responsive multiplayer system meant tying sensing, game state, and feedback together in real time.",
      role: "Design technologist and interaction prototyper",
      methods: ["firmware state machines", "sensor tuning", "haptic feedback design", "Web Serial console"],
      evidence: ["working Arduino build", "public exhibition group play", "firmware/web parity tests"],
      outcome:
        "A ball passing a sensor advances round state and drives score, timer, haptics, lights, audio, and the browser console together. Built and exhibited.",
      next: "I would instrument sessions to see which feedback channel players actually rely on, and cut the ones they ignore.",
    },
    hoop: {
      challenge:
        "A career-simulation RPG needs hundreds of art assets to read as one world. Generating them is now cheap; keeping them stylistically coherent is the actual problem.",
      role: "Designer, art director and technical director, working through an AI production pipeline",
      methods: [
        "art bible",
        "prompt templates with negative prompts",
        "manual side-by-side review",
        "narrative systems design",
        "regression testing at scale",
      ],
      evidence: [
        "299 asset specs and registry records across six batches, written against an art bible; the original image files are not yet verified",
        "an explicit rejected-style list, reviewed by eye rather than by a script",
        "1,975 tests over the career, contract, injury and save systems",
      ],
      outcome:
        "A playable ten-chapter career sim running publicly, with its style rules written down and its asset specs registered by batch. Style review was manual; the one automated check reads the manifest. Self-labelled DEMO v0.6; no player research yet.",
      next: "I would put it in front of players who do not already follow basketball, and watch where the systems stop explaining themselves.",
    },
      pricewise: {
        challenge: "When an AI writes the code, a green build stops being evidence. The interface renders, types check, tests pass — and none of that tells you whether the feature actually runs.",
        role: "Product direction, interaction design and technical direction; I wrote the specs, reviewed the code and verified the behaviour. Codex and Claude Code wrote the implementation",
        methods: ["spec-first delivery", "live endpoint probing", "direct database inspection", "regression test authoring"],
        evidence: [
          "109 API routes and 36 page routes in a deployed app, against 311 Vitest tests",
          "four classes of defect that passed build, type-check and test, plus a regression from my own fix that only the live endpoint showed",
          "a 96-commit history (to 13 August 2026): 5,884 lines in one commit on 1 March 2026, about a quarter of them social features, then five months with no commits",
        ],
        outcome: "A deployed comparison prototype on demo data, covering Coles, Woolworths and Aldi across 65 products, and a verification habit that separates 'looks finished' from 'actually runs' with scripts anyone can re-run.",
        next: "I would put it in front of five people using their own receipts, and turn the manual verification into a build gate.",
      },
      gapmapper: {
        challenge: "An interface that recommends a safer route claims an authority it has not earned. It cannot guarantee safety, and the better it looks, the more convincing that unearned promise becomes.",
        role: "Team of six on a studio course; I built the first working prototype, then argued for abandoning the direction it represented",
        methods: ["semi-structured interviews", "literature-checked assumptions", "critique-driven repositioning", "evidence-model design", "policy-constraint writing"],
        evidence: [
          "18 interviews run by a team of six; I ran and coded numbers 10, 11 and 12",
          "three interlocking deliverables — a report that sets the claim, a one-page brief that turns it into system requirements, and a prototype that walks those requirements through a planning flow",
          "six deliberately slow screens, each passed through four questions: what it makes visible, what it hides, who it expects to act, and how much certainty it implies",
        ],
        outcome: "A planning proposal that treats feeling unsafe as a public-space problem rather than a personal-navigation one. Perception signals and objective indicators sit side by side and are never merged into a safety score.",
        next: "A small pilot on two or three sites with a handful of rounded reports, then a review with campus safety staff to test whether Place Inspector explains its evidence.",
      },
      rules: {
        challenge: "'Make cycling safer' and 'warn people in time' are sentences everyone agrees with and nobody can build to. Neither can be argued against, which is exactly what makes them useless as requirements.",
        role: "Fietspad was a team project and I was Lead Developer: I built the back-end prototype with AI coding tools and generated the high-fidelity interface in Figma Make, which a teammate rebuilt in Figma Design; the Quest 3 guide was individual and entirely mine",
        methods: ["requirement-to-threshold translation", "design system specification", "AI usage auditing", "think-aloud walkthrough", "peer-reviewed source translation"],
        evidence: [
          "a route app whose proposal drafts, mostly written by AI, set routing weights, a 150–250 m warning lead and a 48 px minimum tap target",
          "an AI usage register naming what each of four tools got wrong and how it was corrected, including deleting every figure that had no source",
          "an eight-panel guide turning one 2025 peer-reviewed paper into three independent trigger conditions, each with its own copy template",
        ],
        outcome: "Two briefs, one move: force a soft requirement into a rule someone can build to and point at to say 'this one is wrong'. Being arguable is the precondition for being useful.",
        next: "Neither is validated outside coursework — the cycling app needs real riding conditions, and the guide's effect figures come from the cited paper rather than from me.",
      },
    ...recentCaseSummaries.en,
    ...lamplightSummary.en,
    ...autofillSummary.en,
    ...walkieSummary.en,
    ...fencepostSummary.en,
  },
  zh: {
    connect: {
      challenge: "UQ 给国际学生办的活动不少。他们还是留在同一个圈子里：一次性的迎新派对制造的是认识，不是关系。",
      role: "五人课程团队中的一员；我负责前端组件系统，并做了 71 场研究与测试里的 14 场。",
      methods: ["探索式访谈", "可证伪的假设卡", "出声思考可用性测试", "从纸面到可交互原型", "组件系统设计"],
      evidence: [
        "三轮共 71 份研究与测试记录；我那 14 场来自 9 位受访者，其中 4 位跨轮回访",
        "13 条假设，每条都带一个写在收数据之前的数字门槛",
        "14 张 learning card：12 条回答假设，2 条是数据自己冒出来的",
      ],
      outcome: "一个 19 屏的移动端 MVP，背后是三轮研究与两代原型。团队自己的 MVP 文档写的是 24 屏，那是把子视图也算成了页。课程结束后我一个人接着做，最后部署上线。跑在 mock 数据上，从未接上真实数据库。",
      next: "我会把后端接上，带着完成时间重跑一次任务链，让第三轮产出一个数字，而不是一个印象。",
    },
    spectra: {
      challenge: "字体、行距和对比度都由建站的人决定，需要不一样的读者没有任何入口。",
      role: "独立设计与开发",
      methods: ["WCAG 文本间距条款", "现有扩展拆解", "跨站点注入测试"],
      evidence: ["一个能跑的 Chrome 扩展", "Jest 覆盖设置层", "在文档站、新闻站与单页应用上的手动验证"],
      outcome: "一个扩展：从一个扩展弹窗就能改写任意页面的字体与间距，中英双语，一套设置对所有网站生效。DEMO 阶段。",
      next: "我会把这个扩展交给一个真的这样读东西的人，看他们从来不碰哪几个控件。",
    },
    maze: {
      challenge:
        "实体迷宫本身是静止的。要让迷宫读起来像一个会回应的多人系统，必须把感测、游戏状态和反馈实时绑在一起。",
      role: "Design Technologist / 交互原型开发",
      methods: ["固件状态机", "传感器调校", "触觉反馈设计", "Web Serial 控制台"],
      evidence: ["可运行的 Arduino 实体作品", "公开展览中的多人游玩", "固件与网页一致性测试"],
      outcome:
        "球经过传感器就推进回合状态，并同时驱动计分、计时、震动、灯光、音效与浏览器控制台。已完成搭建并展出。",
      next: "我会记录实际游玩数据，看玩家真正依赖哪一种反馈通道，然后砍掉他们忽略的那些。",
    },
    hoop: {
      challenge:
        "一个生涯模拟 RPG 需要几百张美术资产，才撑得起「这是同一个世界」。现在生成这些资产很便宜，难的是让这么多张保持同一种风格。",
      role: "设计、美术方向与技术方向都由我定，通过一套 AI 生产管线实现",
      methods: ["美术圣经", "带负面提示词的提示词模板", "人工并排审查", "叙事系统设计", "大规模回归测试"],
      evidence: [
        "六个批次共 299 条资产规格与登记记录，对照一份写下来的美术圣经；原始图像文件尚未全部核实",
        "一份明确的「拒绝风格」清单，靠人眼对照，没有脚本在查",
        "覆盖生涯、合同、伤病与存档系统的 1975 个测试",
      ],
      outcome:
        "一个公开可玩、十章生涯的模拟游戏。风格规则写成了文件，资产规格按批次登记；风格靠人工审查，唯一的自动检查读的是资产清单。游戏自标 DEMO v0.6，还没有做过玩家研究。",
      next: "我会把它交给本来不看篮球的人玩，看这些系统在哪一步开始讲不清自己。",
    },
      pricewise: {
        challenge: "代码交给 AI 写之后，构建通过就不再是证据了。界面渲染出来了、类型检查零错误、测试全绿：这三件事没有一件能证明功能真的在跑。",
        role: "产品方向、交互设计与技术方向；写规格、审代码、验行为。实现由 Codex 和 Claude Code 完成",
        methods: ["规格先行", "打真实接口验行为", "直接查数据库", "补写回归测试"],
        evidence: [
          "线上应用 109 条 API 路由、36 条页面路由，配 311 个 Vitest 测试",
          "四类同时通过构建、类型检查和测试的缺陷，外加一处我自己的修复带进的回归，打线上接口才看得出来",
          "96 个提交的完整记录（截至 2026 年 8 月 13 日）：3 月 1 日单次提交 5884 行，其中社交功能约占四分之一，之后五个月没有提交",
        ],
        outcome: "一个已部署的比价原型，跑在演示数据上，覆盖澳洲三大连锁超市 Coles、Woolworths、Aldi 共 65 件商品。另有一套把「看起来完成」和「真的能用」分开验的习惯，每个结论都留下可复现的脚本。",
        next: "找五个人用他们自己的小票真的跑一次，并把这些手动验证接进构建流程，变成一道关卡。",
      },
      gapmapper: {
        challenge: "一个建议「更安全路线」的界面，获得了一种自己没有挣来的权威。界面保证不了安全，而做得越像样，那个兑现不了的承诺就越有说服力。",
        role: "六人小组的课程项目；第一个可用原型由我建，后来主张放弃这个方向的也是我",
        methods: ["半结构式访谈", "拿文献检验假设", "评图驱动的方向转变", "证据模型设计", "把伦理立场写成系统要求"],
        evidence: [
          "团队 18 个访谈、6 人完成；第 10、11、12 个由我做并编码",
          "三件互相咬合的交付物：报告定主张、一页 brief 把主张变成系统要求、原型把这些要求走成一条能通的规划流程",
          "六屏刻意慢下来的界面，每一屏都过同样四个问题：让什么可见、把什么藏起来、期待谁去行动、暗示了多高的确定性",
        ],
        outcome: "一份把「感觉不安全」当作公共空间问题、而不是个人出行问题来处理的规划提案。感知信号和客观指标在屏幕上始终并排，从不合成一个安全分数。",
        next: "先挑两三个地点、用一小批取整过的上报跑个小试点，再找校园安全人员开一次评审，看 Place Inspector 有没有把证据讲清楚。",
      },
      rules: {
        challenge: "「让骑车更安全」「预警有效」这类话，写在文档里谁都同意，但没有一句拿得去施工，也没有一句能被反驳。这类话之所以作为要求毫无用处，原因正在这里。",
        role: "Fietspad 是团队项目，我是 Lead Developer：后端原型用 AI 编码工具搭，高保真界面由我用 Figma Make 生成、组员在 Figma Design 重建。Quest 3 指南是个人作业，全部内容由我完成",
        methods: ["把要求逼成阈值", "设计系统规格", "AI 使用标注册", "出声思考走查", "把同行评审论文翻译成规范"],
        evidence: [
          "一个路线 App，提案草稿把「安全」写成了路线权重、150–250 m 的提示提前量和 48px 的点击区下限，草稿多由 AI 起草",
          "一份 AI 使用标注册，逐个说明四个工具各自出了什么问题、怎么修的；其中一条是删掉所有没有出处的数字",
          "一份八格图文指南，把一篇 2025 年的同行评审论文变成三条独立触发条件，各配各的文案模板",
        ],
        outcome: "两份作业做的是同一个动作：把一句软要求逼成一条能照着施工、也能被人指着说「这条不对」的规则。能被反驳，是一条规则有用的前提。",
        next: "两份都还没在课程之外验证过：骑行 App 需要真实骑行环境，指南里的效果数字出自所引论文而不是我的实验。",
      },
    ...recentCaseSummaries.zh,
    ...lamplightSummary.zh,
    ...autofillSummary.zh,
    ...walkieSummary.zh,
    ...fencepostSummary.zh,
  },
};

const caseDepth: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseDepth>> = {
  en: {
    connect: {
      decisions: [
        {
          label: "Write the pass mark before collecting the data",
          choice:
            "All thirteen hypotheses got a numeric threshold in writing before the work that would test them — eight about the problem space before the first interview, five about MVP features before we prototyped them. Participation tracks weekly energy for at least 70% of students; loneliness correlates with wellbeing at r ≤ −0.4 on UCLA-3 and WHO-5; and so on.",
          evidence:
            "Without a threshold agreed in advance, whatever the interviews return can be read as support. The thresholds were the only thing standing between us and that.",
          tradeoff:
            "Several hypotheses then failed their own test, and we had to write down that we had been wrong.",
          impact:
            "Fourteen learning cards came back against thirteen hypotheses. Twelve answer a hypothesis, including the two that broke: language proficiency was not the barrier, and exposure was not the gap. Two answer nothing we had asked — cost, and the fact that clubs go quiet after recruiting. A threshold can only test a question you already thought to ask, and those two moved the product more than anything we predicted.",
        },
        {
          label: "Make the match explain itself",
          choice:
            "A recommended person shows the reason for the match — shared study habits, compatible schedules — not just a compatibility score.",
          evidence:
            "Students were openly sceptical of black-box matching, but acted on the same suggestion once it named a concrete reason.",
          tradeoff:
            "Each match costs more vertical space, so fewer fit on screen and the list takes longer to scan.",
          impact:
            "The score stops being a number taken on faith and becomes something a student can agree or disagree with.",
        },
        {
          label: "Go back to paper after the September sessions",
          choice:
            "Instead of patching the clickable prototype, we redrew the whole app on one sheet on 3 October: five screens, explicit routes off the home page, one name against each feature area.",
          evidence:
            "The September defects were structural — no visible way back, a card whose state contradicted its own button. Those are not fixed one component at a time.",
          tradeoff:
            "It cost build time in the middle of semester, and the paper structure dropped features that were already coded.",
          impact:
            "The November build started from a fixed skeleton with an owner per area, rather than from an accumulating prototype.",
        },
        {
          label: "Carry it on after the grade was in — by deleting",
          choice:
            "In January I imported the codebase into my own repository and spent five days on it: one design system in place of five people's screen-level styling, dark mode, an OAuth callback screen, and a deploy. The diff across those eight commits is +1,068 and −2,348.",
          evidence:
            "Five people styling twenty-one screens in parallel leaves something that reads as five products. That is invisible in a code review and obvious the moment you click through it.",
          tradeoff:
            "Removing more than I added meant deleting teammates' work, and importing the codebase as a single commit threw away the history that showed who wrote what.",
          impact:
            "It is the only part of UQ Connect that is unambiguously mine — nine commits, all under my name. It is also why there is anything to click: the screen whose absence stopped the course repository from building is present in mine.",
        },
      ],
      evidence: [
        {
          method: "Exploratory interviews",
          sample: "33 records in the first round, 15–30 August 2025; 7 of them mine",
          question: "UQ already runs events for international students. Why do they not turn into relationships?",
          finding:
            "Size and pace shut people out, not vocabulary. One participant put the ceiling plainly: it is hard to find common ground beyond being international.",
          implication:
            "The problem was not a shortage of events. It was that nothing carried a person from one event to the next.",
        },
        {
          method: "Think-aloud usability testing",
          sample: "28 records in the second round, 17–24 September 2025; 5 of them mine",
          question: "Can a student operate the features without me sitting next to them?",
          finding:
            "An event card said the student was attending while still offering an attend button; a secondary button had no discoverable purpose; there was no way back to the previous page; 'Skill swap' did not explain itself.",
          implication:
            "State feedback and navigation were the blockers, well before anything about matching quality.",
        },
        {
          method: "Task-based usability testing",
          sample: "10 records in the third round, 8–12 November 2025; 2 of them mine",
          question: "Can a student complete a whole chain — create a circle, set who can see it, open the chat, post, come back — unaided?",
          finding:
            "The chain completed. The participant read the colour-coded home screen as a map of the app. But the Circles entry point was found in the sidebar rather than on sight.",
          implication:
            "The flow holds once you are in it; getting into it still depends on hunting for the entry point.",
        },
      ],
      iterations: [
        {
          version: "Clickable prototype, September",
          change: "Tested the feature set as it had actually been built, with participants thinking out loud.",
          reason: "The open risk was whether a student could operate it unaided, not whether the idea appealed to them.",
          improvement:
            "Surfaced navigation and state defects that a demo walkthrough would have talked straight past.",
        },
        {
          version: "Paper, 3 October",
          change:
            "Redrew the app as five screens — home, study buddy, nearby circles on a campus map, wellness, resource hub — with arrows for every route off the home page.",
          reason: "Structural defects need a structural answer, and paper is the cheapest place to give one.",
          improvement: "Produced a skeleton the build could follow, with each feature area assigned to a named person.",
        },
        {
          version: "The November MVP",
          change:
            "Built the screens as a shared component system with React context for cross-screen state, rather than styling each screen on its own.",
          reason: "Nineteen screens hand-styled by five people do not stay one product for long.",
          improvement:
            "The November sessions ran on a single visual system, and the participant used its colour coding to predict where things were.",
        },
        {
          version: "Solo, January",
          change:
            "Took the codebase into my own repository and cut it back: one design system replacing per-screen styling, dark mode, an OAuth callback, then a deploy.",
          reason: "The semester ended with something that worked and did not yet look like one product.",
          improvement:
            "Twenty-two screens on one system, and a build anyone can open rather than a repository they would have to be given access to.",
        },
      ],
      limits: [
        {
          constraint: "The MVP runs on mock data. The backend exists but was never connected to it.",
          whyItMatters:
            "Matching, messaging and scheduling were never exercised against real records, concurrency or empty states. The sessions tested an interface, not a working product.",
          nextValidation:
            "Connect the API layer and re-run the same task chain against live data, watching specifically for what breaks when a list is empty or a message is slow.",
        },
        {
          constraint: "Nothing was measured before and after.",
          whyItMatters:
            "I can say the September navigation defect did not recur in November. I cannot say how much better it got, because no round recorded completion times or a fixed success criterion.",
          nextValidation:
            "Re-run the November chain with timings and a pass mark defined in advance, so the round produces a number rather than an impression.",
        },
        {
          constraint: "This was a five-person team and I did not build all of it.",
          whyItMatters:
            "Anything in the product outside the component system, the shared state layer and my own interview rounds was somebody else's work.",
          nextValidation:
            "Ask me about the parts I owned and the commit history will match what I say.",
        },
      ],
      takeaway:
        "This case proves I can run research that is capable of proving itself wrong, carry what survives into a shared component system, and keep working on the result after the grade that required it was already in.",
    },
    spectra: {
      decisions: [
        {
          label: "Bundle the font instead of loading it from a CDN",
          choice:
            "OpenDyslexic ships inside the extension package rather than being fetched at runtime.",
          evidence:
            "A remote font request tells a third party which pages are being read, and it fails whenever the host changes or the reader is offline.",
          tradeoff:
            "The package is heavier, and the font can only be updated by shipping a new version.",
          impact:
            "The extension works offline and leaks nothing about the reader's browsing.",
        },
        {
          label: "Keep one global set of settings",
          choice:
            "All settings live in chrome.storage.local under global keys and apply on every site. The dyslexia mode is one toggle that sets OpenDyslexic with a fixed line height (1.5) and letter spacing (0.05em).",
          evidence:
            "The repo records no reason for choosing global storage over per-site storage.",
          tradeoff:
            "A reader who wants looser spacing on one site gets it on every site, and the spacing values cannot be tuned.",
          impact:
            "One switch turns the mode on or off everywhere, with no per-site state to manage.",
        },
        {
          label: "Put the controls in a popup, not a context menu",
          choice:
            "All controls live in one popup panel opened from the toolbar.",
          evidence:
            "A context menu hides the range of what is adjustable behind a right-click and shows one item at a time.",
          tradeoff:
            "Two clicks to reach a control instead of one, and toolbar space is spent.",
          impact:
            "The whole set of adjustments is visible at once, so nothing has to be discovered.",
        },
      ],
      evidence: [
        {
          method: "Guideline review",
          sample: "WCAG text-spacing criteria",
          question: "Which typographic properties does the tool have to expose to be useful at all?",
          finding: "Line height, letter spacing, word spacing and paragraph spacing are the ones with published thresholds.",
          implication: "The dyslexia mode raises line height and letter spacing to fixed values. Word and paragraph spacing are not adjusted, and there are no spacing sliders.",
        },
        {
          method: "Cross-site injection testing",
          sample: "Documentation, news, and single-page-app sites, by hand",
          question: "Where do injected styles lose to the page's own CSS?",
          finding: "Inline styles and high-specificity selectors can override an injected layer.",
          implication: "Injected rules use !important under a class set on <html>. The content script does not watch single-page-app route changes.",
        },
        {
          method: "Unit tests",
          sample: "Jest over the settings and utility layer",
          question: "Do the storage keys, defaults and settings validation behave?",
          finding: "Jest covers the utility layer: storage keys, defaults, settings validation and colour helpers.",
          implication: "Regressions in settings behaviour surface before they reach a page.",
        },
      ],
      iterations: [
        {
          version: "Style injection",
          change: "Started with a content script writing a stylesheet into the page.",
          reason: "It was the smallest thing that could show whether the idea worked at all.",
          improvement: "Worked on simple pages and failed on anything with strong specificity.",
        },
        {
          version: "Popup controls",
          change: "Added a popup panel with toggles and sliders: colour filter, dyslexia mode, focus ruler, high contrast, font scale and others.",
          reason: "Editing values by hand is not a tool anyone would use twice.",
          improvement: "The adjustable range became visible instead of implied.",
        },
        {
          version: "Saved settings and bilingual UI",
          change: "Saved settings to chrome.storage.local under global keys, and added English and Simplified Chinese locale files.",
          reason: "Settings that reset every visit are worse than no settings.",
          improvement: "Settings now survive a reload and apply on every site.",
        },
      ],
      limits: [
        {
          constraint: "Nobody who needs this has used it.",
          whyItMatters: "Every control here is reasoned from guidelines, not from watching a reader struggle.",
          nextValidation: "Sit with readers who rely on loose spacing or dyslexia-friendly typefaces and watch which controls they ignore.",
        },
        {
          constraint: "It is a DEMO, not a published extension.",
          whyItMatters: "It has never faced Chrome Web Store review, auto-update, or a site changing underneath it.",
          nextValidation: "Publish it, then watch which sites break and how quickly.",
        },
      ],
      takeaway:
        "This case proves I can turn accessibility guidance into a working tool and keep it working on pages I do not control. It does not prove the tool has helped anyone yet.",
    },
    maze: {
      decisions: [
        {
          label: "Replace the electric-shock concept with vibration",
          choice:
            "The original trap feedback was a mild electric shock. I built it with relay-driven vibration motors in finger sleeves instead.",
          evidence:
            "The maze was destined for a public exhibition with unsupervised players of unknown age and health, where consent and calibration could not be guaranteed per person.",
          tradeoff:
            "Vibration is a weaker sensation than shock, so the trap lost some shock value — the point players remember it by.",
          impact:
            "The system stayed exhibitable without a supervisor gating every round, and the feedback still landed because it arrived on the finger, not on a screen.",
        },
        {
          label: "Debounce the IR sensors instead of trusting raw reads",
          choice:
            "I added debounce and a cooldown window to each of the ten FC-51 IR sensors.",
          evidence:
            "A single ball pass produced multiple raw trigger events, so score and trap effects fired several times for one physical event.",
          tradeoff:
            "The cooldown adds a blind window where a genuinely fast second pass would be missed.",
          impact:
            "One physical event became one game event, which is the precondition for score, timer, and haptics agreeing with each other.",
        },
        {
          label: "Split the tilt controller off the main feedback controller",
          choice:
            "Platform tilt moved to its own SafeTouchServoController with hold-to-move behaviour, separate from the main PlanB feedback firmware.",
          evidence:
            "Servo motion and time-sensitive sensor polling on one board made feedback timing unreliable, and a servo fault could take the whole round down.",
          tradeoff:
            "Two controllers mean more wiring and another failure point at setup time.",
          impact:
            "Feedback timing stopped competing with actuator motion, and hold-to-move made the tilt safe to hand to a stranger.",
        },
        {
          label: "Build a browser console with demo and live modes",
          choice:
            "I built a Web Serial console that mirrors the maze and also runs standalone in demo mode.",
          evidence:
            "The hardware is not always available — during development, and certainly not inside a portfolio or an interview.",
          tradeoff:
            "Two modes mean two code paths that can drift apart.",
          impact:
            "The system is inspectable without the physical build, and regression tests keep the demo honest about firmware rules.",
        },
      ],
      evidence: [
        {
          method: "Sensor bench testing",
          sample: "Ten FC-51 IR sensors mapped across trap, diagnostic, spare, and finish zones",
          question: "Does one ball pass produce exactly one game event?",
          finding: "Raw reads double- and triple-fired; debounce plus a cooldown window reduced a pass to a single event.",
          implication: "Sensor timing is an interaction design problem, not just an electronics detail.",
        },
        {
          method: "Firmware/web parity tests",
          sample: "Regression tests over serial sync, feedback sync, servo response, and audio parity",
          question: "Does the browser console still behave like the firmware after either side changes?",
          finding: "Drift showed up in feedback timing and serial event shape whenever one side was edited alone.",
          implication: "The demo can be trusted as a description of the real system rather than a separate story.",
        },
        {
          method: "Public exhibition play",
          sample: "Group play at a university exhibition; sessions not formally logged",
          question: "Do players understand what the system is telling them without instruction?",
          finding:
            "Attention went to the maze, the score and time display, the LEDs and the sounds; some players were surprised by the vibration the first time. Gearing up took each group about a minute, and many players still struggled with the rules after the explanation.",
          implication: "Wearable fit and setup ritual are part of the interaction, not preconditions to it.",
        },
      ],
      iterations: [
        {
          version: "Shock trap",
          change: "Started from a trap concept built around a mild electric shock.",
          reason: "It was the most visceral version of 'you hit a trap'.",
          improvement: "Made the safety and consent problem concrete enough to force a redesign.",
        },
        {
          version: "Vibration sleeves",
          change: "Moved trap feedback to relay-driven vibration motors in wearable finger sleeves.",
          reason: "Feedback had to reach the player's body without a risk that needed supervision.",
          improvement: "Kept the physical sensation while making the maze safe to run for a queue of strangers.",
        },
        {
          version: "Synchronised loop",
          change: "Tied sensor events to score, timer, lights, audio, and the browser console through one round state machine.",
          reason: "Separate subsystems reacting on their own made the maze feel like unrelated gadgets.",
          improvement: "One event now produces one coherent multi-channel response the player can read.",
        },
      ],
      limits: [
        {
          constraint: "Exhibition play was observed, not instrumented.",
          whyItMatters:
            "I can describe what players reacted to, but I cannot quantify which feedback channel carried the most information.",
          nextValidation:
            "Log sensor events, feedback fires, and completion times per session, then compare rounds with channels selectively disabled.",
        },
        {
          constraint: "The build is a single exhibition unit, not a manufacturable product.",
          whyItMatters:
            "Wiring is hand-run and calibration is per-venue, so nothing here proves durability, yield, or repeatable assembly.",
          nextValidation:
            "Rebuild on a fabricated harness and measure setup time and sensor drift across several venues.",
        },
      ],
      takeaway:
        "This case proves I can take an interaction concept through firmware, sensing, and physical feedback into a browser control surface, and make safety and calibration calls on hardware that strangers will actually touch.",
    },
    hoop: {
      decisions: [
        {
          label: "Write the art bibles, split by canvas size",
          choice:
            "Three reference documents — pixel players, organic scenes, flat logos — were committed together with the first 38 images (commit 9582f30), before the 299-entry registry. Only the avatar prompt template says outright that it cites its bible.",
          evidence:
            "A 256×256 logo, a 32×32 sprite and a 1280×720 scene cannot share one style language. Canvas size decides how much an image can hold, so each bible starts from its canvas.",
          tradeoff:
            "Writing the rules before seeing output means committing to a look you have not yet proven works.",
          impact:
            "The rules existed before the volume did: the art bible was committed six days before the 299-spec registry.",
        },
        {
          label: "Name what is rejected, and check the set by eye",
          choice:
            "An explicit rejected list — photoreal, 3D, anime, neon, random text, real trademarks — and a manual review with the assets laid side by side against the art bible. No script checks style.",
          evidence:
            "Every logo passed the per-image rules; only laid side by side did they turn out to be variants of one template. A check that looks at one image at a time cannot see that.",
          tradeoff:
            "A manual review reaches only as far as my attention, and it leaves no record: the production log's review line is written by the generator script itself.",
          impact:
            "The convergence became two set-level rules in the logo bible and its template's negative prompt. Saying what the world is not turned out to be more actionable than describing what it is.",
        },
        {
          label: "Compress a lifetime into 146 nodes rather than a calendar",
          choice:
            "A career from age twelve to retirement runs across 146 nodes in eight kinds — training, match, story, relationship, risk, reward, rest, legacy — instead of simulating days.",
          evidence:
            "Calendar-based career sims spend most of their runtime on repetition, and the interesting decisions get buried in maintenance clicking.",
          tradeoff:
            "Discrete nodes lose the texture of a season grinding on; the player never feels time passing the slow way.",
          impact:
            "Every node has to earn its place, and action combinations carry consequences — repeated training raises readiness while raising body risk and pressure and lowering team trust.",
        },
        {
          label: "Derive the visual language from a product, and say so",
          choice:
            "The palette and typographic system are reverse-engineered from Anthropic's product design — warm parchment, terracotta accent, exclusively warm-toned neutrals — and documented as such.",
          evidence:
            "A game about one person's whole life needed a surface that reads as unhurried and literary rather than as a sports UI full of cold blues and energy gradients.",
          tradeoff:
            "It is a borrowed language, not an invented one, and a reader who recognises the source will notice.",
          impact:
            "Stating the derivation in the design document is what makes it a transfer exercise instead of an uncredited copy.",
        },
      ],
      evidence: [
        {
          method: "Asset registry and production log",
          sample: "Six batches: 64 portraits, 40 scenes, 73 CGs, 72 UI icons, 18 court/tactics, 32 static VFX",
          question: "What does the pipeline actually record about each batch?",
          finding: "The registry holds 299 asset specs in six batches, and the log records counts per batch, not just a total. The original image files behind the 299 have not been verified.",
          implication:
            "The registry can be audited: which batch an entry belongs to, and which folder it is registered under. It cannot show how any image looks; the one automated check reads names, keys, folders and PNG sizes, not style.",
        },
        {
          method: "Automated regression suite",
          sample: "355 test files, 1,975 tests, run against the career, contract, injury, season and save systems",
          question: "Does a systems-heavy career sim stay correct while content keeps landing?",
          finding: "All 1,975 pass; save data carries a schema version so old saves are migrated rather than silently broken.",
          implication:
            "Scale here is a design constraint, not a bragging point — without it, adding a chapter quietly breaks a contract rule three chapters earlier.",
        },
        {
          method: "Playable build check",
          sample: "The public deployment, played from the main menu through character creation into the first career node",
          question: "Does the loop actually run for someone arriving cold?",
          finding:
            "Character creation gates on a required name, archetype choice propagates into the six attributes, and the first node opens with status, relationships and actions all populated.",
          implication: "The systems are wired end to end, not mocked at the seams.",
        },
      ],
      iterations: [
        {
          version: "Concept",
          change: "Framed as a pixel-art career sim, referencing NBA 2K MyCareer, Punch Club, New Star Soccer and Stardew Valley.",
          reason: "Each reference solves one piece: career arc, attribute decay, off-court life, daily-loop satisfaction.",
          improvement: "Named what to borrow from each, which kept the scope from becoming 'a basketball game'.",
        },
        {
          version: "Systems build",
          change: "Draft, contracts, seasons, off-season, retirement, New Game+ and tactical matches all landed as systems.",
          reason: "A career sim is only as interesting as the consequences it can carry across a decade of in-game time.",
          improvement: "A career can now run from youth to retirement and be sealed into a Legacy that affects the next run.",
        },
        {
          version: "Art pipeline",
          change: "Laid the logos side by side, found they had converged on one template, and added two set-level rules to the logo bible and its template.",
          reason: "Each logo passed every per-image rule; the problem existed only at the level of the set.",
          improvement: "The set-level rules now travel with every prompt built from the template, instead of living in a review checklist someone has to remember.",
        },
      ],
      limits: [
        {
          constraint: "No player research. The game self-labels DEMO v0.6.",
          whyItMatters:
            "Everything here is systems design and production discipline. Whether the pacing works for someone who is not me is untested.",
          nextValidation:
            "Sit five people who do not follow basketball in front of chapter one and watch where the systems stop explaining themselves.",
        },
        {
          constraint: "The first load is large and mobile QA is thin.",
          whyItMatters:
            "A 3.8 MB JavaScript bundle is a real barrier on a phone, which is where a Chinese audience would meet it.",
          nextValidation: "Code-split the bundle and run device QA before calling it a public beta.",
        },
        {
          constraint: "The visual language is derived, not invented.",
          whyItMatters:
            "It is a transfer exercise from an existing product's design system, and presenting it as original would be dishonest.",
          nextValidation:
            "Push the system somewhere the source could not go — the basketball-specific screens are where it would have to stop being borrowed.",
        },
      ],
      takeaway:
        "This case shows how I set up generative production: rules written first, what gets rejected named, and a plain line between what a script checks and what still needs a person — while keeping a systems-heavy build correct under 1,975 tests.",
    },
      pricewise: {
        decisions: [
          {
            label: "Treat a green build as a claim, not as evidence",
            choice:
              "Every feature was re-verified by calling the deployed endpoint, reading the actual response body, and querying the database directly — not by reading the code that was supposed to implement it. The one exception is the cron-auth gap, which I came across reading code during a migration.",
            evidence:
              "Four classes of defect passed build, type-check and the full test suite. Semantic search never used a vector; template lists were created empty; cron auth did not fail closed when its secret was missing; six declared tables were never created in the database.",
            tradeoff:
              "It is slow, manual, and it finds nothing most of the time — the cost is paid on every feature, and the payoff is concentrated in a few.",
            impact:
              "All four shared one property: they did not throw. What was broken was whether the feature executed at all, and no automatic gate was watching for that.",
          },
          {
            label: "Let the vector defect stand as my own mistake",
            choice:
              "One more was introduced by me while fixing search: adding the missing field serialized a 1,536-dimension vector into the API response, pushing three search results to 89 KB.",
            evidence:
              "It was found by calling the real endpoint and reading what came back, not by reviewing the diff.",
            tradeoff:
              "Naming it as mine makes the case less flattering, and it is the one defect I could have quietly folded into the others.",
            impact:
              "It is the strongest evidence for the method, because it shows the check catching its own author rather than only catching the AI.",
          },
          {
            label: "Let a feature plan set the scope",
            choice:
              "Looking back, I judge that the feature list was AI-generated planning, derived from what a complete product ought to have rather than from what anyone asked for; the repo does not record this. The build followed the list. Phases 2 through 6 all landed within two days, 9–10 January 2026.",
            evidence:
              "On 1 March 2026 a single commit added 5,884 lines: a v1 API, AI function calling, bilingual text, price prediction and a social layer, which made up about a quarter of it. The last commits were on 2 March, and the next came five months later.",
            tradeoff:
              "Looking back, a comparison app on simulated data with no registered users should not have kept growing.",
            impact:
              "The scope never came back down. In August the v1 routes were moved to unversioned paths rather than removed, and the app now has 109 API routes, up from 91 on 2 March.",
          },
          {
            label: "Leave one known mismatch unfixed, and lock it into a test",
            choice:
              "Receipt matching went from 15 of 20 constructed inputs to 19, but 'MLK FC 2L' moved from no-match to matching Oat Milk. That is worse, and it was left as-is.",
            evidence:
              "A no-match lands in the unmatched list where the user can see it. A wrong match sends a wrong price silently into the comparison result, and the user never finds out.",
            tradeoff:
              "The fix would be an abbreviation dictionary — an endless maintenance list — or admitting two-letter tokens, which reinstates the mis-matches just suppressed.",
            impact:
              "The correct handling is to return it to no-match, which is a confidence-threshold problem rather than an abbreviation problem. The known mismatch is locked into a test so that a change to it cannot go unnoticed.",
          },
        ],
        evidence: [
          {
            method: "Live endpoint probing against the deployed app",
            sample: "109 API routes and 36 page routes; features probed end to end, one at a time",
            question: "Does the feature execute, or does it only render?",
            finding:
              "Semantic search silently fell back to keyword matching on every query — the product object dropped its vector field at the data-mapping layer. Keyword matching also returns results, so nothing looked wrong.",
            implication:
              "'Renders correctly' and 'executes correctly' are different claims, and only one of them has automatic gates behind it.",
          },
          {
            method: "Regression testing the module the product depends on",
            sample: "The receipt-name matcher: 175 lines written in the second commit and never modified since, with 13 tests using 'milk', 'eggs', 'sourdough bread'",
            question: "Was the core module tested against inputs that look like the real thing?",
            finding:
              "Not one of the 13 test inputs resembled printed receipt text. 'W/MEAL BREAD' matched white bread because normalisation turned the truncation slash into a space; 'MLK FC 2L' and 'CHK BRST FIL' matched nothing, because vowel-stripped abbreviations are subsequences of their targets.",
            implication:
              "The fix only adds points and never subtracts: the four existing scoring rules were left untouched, so previously-correct inputs cannot regress. Confirmed — all 15 originally-correct inputs held.",
          },
          {
            method: "Direct database inspection",
            sample: "The full schema against the live Postgres instance",
            question: "Do the declared tables exist?",
            finding: "Six did not. Nothing read or wrote them, so the 'relation does not exist' error had never been triggered.",
            implication:
              "A schema is a declaration of intent. Whether it matches the database is a separate question, and no part of the build was asking it.",
          },
        ],
        iterations: [
          {
            version: "Scaffold to feature-complete",
            change: "Phases 2 through 6 — budgets, deals, recipes, store location, collaboration, sharing, price alerts, bilingual UI, spending trends, AI suggestions, list templates, command palette, help centre — all pushed across 9–10 January 2026.",
            reason: "The plan came from an AI-generated definition of a complete product rather than from a user need.",
            improvement: "It produced a large, coherent-looking surface, and that appearance is what the rest of the case is about.",
          },
          {
            version: "Pause",
            change: "Stopped on 2 March 2026 and left it untouched for five months. The first commit on returning committed the Next 16 upgrade and half-finished features as a restore point before optimising.",
            reason: "No reason for the stop is recorded in the repository.",
            improvement: "The scope never came back down: in August the v1 routes moved to unversioned paths rather than being removed, and the social routes are still there. Looking back, an app on simulated data with no registered users should not have kept growing.",
          },
          {
            version: "Verification pass",
            change: "Went feature by feature calling live endpoints, reading responses and querying the database; wrote regression tests for the matcher.",
            reason: "Nothing in the build was checking whether features executed, only whether they compiled and rendered.",
            improvement: "Four classes of defect, and one regression of my own, found and fixed in source. In the receipt matcher, one known mismatch was deliberately left, documented and pinned by a test. 311 tests green.",
          },
        ],
        limits: [
          {
            constraint: "Zero registered users. Every verification ran on data I created.",
            whyItMatters:
              "The case proves a verification method, not that the product is useful. What a crumpled receipt does to recognition accuracy is unknown to me.",
            nextValidation: "Five people, their own receipts, and a record of how recognition fails rather than how often.",
          },
          {
            constraint: "The verification is manual and lives in my hands.",
            whyItMatters:
              "A check that depends on someone remembering to run it is not a gate. These defects existed precisely because no automatic check was asking whether features executed.",
            nextValidation: "Wire the endpoint probes into the build pipeline so that 'does it actually run' fails CI rather than waiting for a person.",
          },
          {
            constraint: "The catalogue is 65 products across three chains, priced from simulated data.",
            whyItMatters: "Prices shown in the case are demo data, not anyone's real bill, and the comparison logic has never met real pricing volatility.",
            nextValidation: "A live pricing source for a small product set, and a check on how stale a price can get before the comparison misleads.",
          },
        ],
        takeaway:
          "This case proves I can separate 'looks finished' from 'actually runs' on a codebase an AI wrote, and leave behind scripts that let someone else reach the same conclusions. The judgement I contributed was not what to build — it was how to confirm it is real.",
      },
      gapmapper: {
        decisions: [
          {
            label: "Build the route prototype, then argue against shipping the idea",
            choice:
              "The team had nothing demonstrable and I was the one who could turn discussion into code, so I built the first route-support prototype — then argued the direction should be abandoned.",
            evidence:
              "Once it was on screen the problem was on screen with it: a system that recommends a safer route without being able to guarantee safety has acquired an authority it never earned.",
            tradeoff:
              "It meant giving up the more obvious, better-demoing product concept in favour of something quieter with clearer boundaries.",
            impact:
              "The early prototype stays in the portfolio precisely because it is unfinished and unlovely. Without it the final direction looks like it appeared from nowhere; next to it, the learning is visible.",
          },
          {
            label: "Change the reader before changing the interface",
            choice:
              "After critique the first thing I changed was not a screen. The audience moved from a pedestrian who is nervous right now to councils, city planners and campus safety teams.",
            evidence:
              "Critique named two design problems, not feature gaps: painting safety as binary makes 'here is safe, there is not' something the interface says out loud, and a women's-safety project risks once again asking women to modify their behaviour instead of questioning the environment.",
            tradeoff:
              "The new audience is institutional and slow, and the product loses the immediacy that made it demo well.",
            impact:
              "Output changed with it: no longer telling anyone which way to walk, but showing where perception and objective indicators fail to agree — and promising that nowhere is safe.",
          },
          {
            label: "Keep the two kinds of evidence side by side, never merged",
            choice:
              "Objective indicators — lighting, transit access, incident context, sightlines, open businesses, street condition — sit next to perception signals, and the gap between them is displayed as a reason to look, not as proof of danger.",
            evidence:
              "Literature disagreed with my starting assumption that streetlights are a usable safety variable. Visibility, enclosure, nearby activity, social cues and time all change how the same light is read; a lit street that is empty and hard to leave still feels wrong.",
            tradeoff: "Keeping them apart makes the result less dramatic and harder to summarise.",
            impact:
              "Merging them into one score would delete the uncertainty and make the screen look more confident than it has any right to be. Separate, someone can ask why a place was flagged instead of being told it is unsafe.",
          },
          {
            label: "Write the ethics into the brief as system requirements",
            choice:
              "The one-page brief states them as constraints: reports are anonymous, location is rounded to a street segment, confidence level and bias notes must be displayed, and no public safety score is produced.",
            evidence:
              "An interviewee was wary of routing by crime history because bias can already be inside the crime data before an algorithm touches it. I had initially mis-read her point and went back to the notes after a teammate challenged my reading.",
            tradeoff:
              "The brief was the hardest of the three deliverables to write, because it stops an ethical position from being a sentence in a report.",
            impact:
              "Once 'no safety score' is a system requirement it is no longer an attitude, it is a constraint — and someone building the thing has to satisfy it.",
          },
        ],
        evidence: [
          {
            method: "Semi-structured interviews, coded",
            sample: "18 across a team of six; I ran numbers 10, 11 and 12",
            question: "What cues do people actually use to judge whether a place is safe to walk?",
            finding:
              "In the team's coding chart, people presence came up in 16 of the 18 interviews and lighting in 14: counts of mentions, not a rate. All three of mine mentioned lighting, but naming the same cue is not reading it the same way. What separated my three was whether they would let a system judge for them. One accepted that with reservations, two refused outright, and more than one explicitly distrusted crime history as an input.",
            implication:
              "The split was over who gets to judge. After the mid-project critique, I pushed the project from recommending a route to showing where perception and indicators disagree.",
          },
          {
            method: "Assumption tested against literature",
            sample: "The streetlight assumption: more light means safer",
            question: "Is lighting usable as a direct safety variable?",
            finding: "No. Visibility, enclosure, surrounding activity, social cues and time of day all change how one light is interpreted.",
            implication:
              "This decided every structure downstream, and it moved the interviews from survey results to perception cues — a sample this size cannot support any score.",
          },
          {
            method: "Screen-level ethics review",
            sample: "Six screens: Place Inspector, Field Reports, Data Sources, Intervention Planner, Ethics Boundary, Export Brief",
            question: "What does each screen make visible, hide, expect someone to act on, and imply about certainty?",
            finding:
              "Place Inspector was the load-bearing one. A red or orange marker on a real street starts to read as a verdict even when the evidence behind it is thin, so it shows confidence level, source status, report context, and what the data still cannot prove.",
            implication: "The map is only the entry point. The screens that carry the argument are the slow ones.",
          },
        ],
        iterations: [
          {
            version: "Route-support prototype",
            change: "The same trip scored and ranked by different cues, with risk density, lighting, surveillance and open-business layers.",
            reason: "The team needed something demonstrable and I could build it.",
            improvement: "It looked extremely usable, which is exactly what made it dangerous — it made an unsolved problem look solved.",
          },
          {
            version: "Repositioning after critique",
            change: "New reader, new output, new claim: support the discussion of what to investigate next, promise no location is safe.",
            reason: "Critique identified binary safety and misplaced responsibility as design problems, not feature gaps.",
            improvement: "The claim moved from 'help one person walk home safely' to 'help an institution see where its own evidence is incomplete'.",
          },
          {
            version: "Three interlocking deliverables",
            change: "A final report that sets the claim, a one-page brief that turns it into system requirements, and a prototype that walks those requirements through a planning flow.",
            reason: "A prototype alone leaves the claim floating; a report alone leaves it unimplemented.",
            improvement: "Report to brief to prototype means the ethical position ends up as something a builder must satisfy.",
          },
        ],
        limits: [
          {
            constraint: "Never tested with real planning staff, and parts of the data layer are an intended integration rather than a live pipeline.",
            whyItMatters:
              "The case claims a design direction that can be challenged, not a working public system. Formal data-sharing agreements, minimum reporting thresholds, stronger bias detection and stakeholder onboarding are all missing.",
            nextValidation:
              "A pilot on two or three sites in Brisbane with a small batch of rounded reports, then a review with campus safety staff or council-facing reviewers.",
          },
          {
            constraint: "18 interviews can count who mentioned a cue; they cannot support a rate, a ranking, or a score.",
            whyItMatters: "This is why the interviews are used as perception cues rather than as survey results anywhere in the work.",
            nextValidation: "Test the reporting question wording only after the gap categories survive messier evidence — the order matters.",
          },
          {
            constraint: "The final proposal does not fully answer the critique it responded to.",
            whyItMatters:
              "Reframing what a system claims is not the same as solving the underlying problem of who is being asked to change their behaviour.",
            nextValidation: "Put the proposal in front of the same reviewer and ask whether the shift in claim is enough, or only more careful.",
          },
        ],
        takeaway:
          "This case proves I will kill my own working prototype when it makes a promise the evidence cannot support, and that I can turn the resulting ethical position into system requirements rather than leaving it as a paragraph. Sometimes the better design decision is to stop yourself from claiming so much.",
      },
      rules: {
        decisions: [
          {
            label: "Force 'safer' into numbers in the proposal drafts",
            choice:
              "The proposal drafts turned safety into routing weights that favour separated segments and quiet streets and down-weight paint-only lanes, a 150–250 m warning lead, and a 48 px minimum tap target. AI wrote most of those drafts.",
            evidence:
              "Bike lanes end abruptly and dump riders into traffic. The drafts named the phenomenon, the '25-metre bike lane'. The final proposal kept pre-alerts before roundabouts and left hooks and made 'Calmest' the default route.",
            tradeoff: "Committing to thresholds early means committing before there is evidence that these are the right numbers.",
            impact: "A rule with a number in it can be executed and can be argued with. 'Make cycling safer' can be neither.",
          },
          {
            label: "Write warnings as behaviour, not as direction",
            choice:
              "The left-hook warning tells the rider to take the lane and make eye contact with turning drivers, or take the alternate street — because that is the actual response, not 'turn left'.",
            evidence:
              "Hazard categories are cycling-specific: left hook, dooring zone, shared lane. Distances are given as distance, not as junction counts, because there is no stable 'next intersection' reference while riding.",
            tradeoff: "Behavioural copy is longer than directional copy, and it has to be read or heard at speed.",
            impact:
              "The hazard list carries an audio toggle, because a rider cannot look at a screen. That is the same requirement — 150–250 m of lead time, delivered without taking the eyes.",
          },
          {
            label: "Make the safe option carry its own cost, and refuse the superlative",
            choice:
              "The detour button states the extra minutes on the button itself, and 'keep current route' is an equal-weight primary action. The entry button reads 'See safer routes' — comparative, never superlative.",
            evidence: "No data available supports the word 'safest'.",
            tradeoff: "A comparative claim is weaker marketing and a less satisfying button.",
            impact:
              "The interface does not assume the safer route is the right route for this rider on this trip, and it does not claim a ranking it cannot defend.",
          },
          {
            label: "Turn one paper into three triggers rather than one warning",
            choice:
              "The Quest 3 guide splits hand-tracking failure into three independent trigger conditions — low light, out of view, mutual occlusion — each with its own copy template, rather than merging them into a generic warning.",
            evidence:
              "A 2025 peer-reviewed paper showed that warning before tracking breaks is effective. Low light warns roughly three seconds ahead; out-of-view and occlusion trigger on risk thresholds, ignoring micro-jitter and applying a cooldown.",
            tradeoff: "Three templates are more to maintain than one, and the causes can co-occur.",
            impact:
              "Copy is uniformly 'symptom then one action' — your hand is out of view, move it back — verb first, one thing to do. That format is what makes it buildable tomorrow.",
          },
        ],
        evidence: [
          {
            method: "AI usage register, as required by the course",
            sample: "Four tools with distinct roles: Otter for transcription, ChatGPT for grouping and drafts, Miro for concept maps and initial clustering, Figma Make for rapid prototypes",
            question: "Where did AI help, where did it fail, and what was done about it?",
            finding:
              "Transcription dropped names and streets and merged speakers; generative drafts were confident and unsourced; Figma Make's layout fidelity drifted badly on small prompt changes; AI flattened contradictory tensions into single themes.",
            implication:
              "The corrections were concrete actions, not attitudes: a short style guide for names and suburbs, verification against official sources with every unsourced figure deleted, rebuilding every screen in Figma Design, and a separate table for edge cases — night-riding confidence, wet-weather risk, large e-bikes that do not fit narrow racks — which each became a specific feature.",
          },
          {
            method: "Source-to-specification translation",
            sample: "One 2025 peer-reviewed paper on pre-failure warnings for camera-based hand tracking",
            question: "What in this paper can a designer act on tomorrow?",
            finding:
              "Three failure causes became three triggers with independent copy; the detection lead time became a per-cause threshold; the copy convention became 'symptom then one action'.",
            implication:
              "An eight-panel guide covering symptom, impact, do and do-not, thresholds, copy templates, before-and-after, a self-check list and closing actions.",
          },
          {
            method: "Think-aloud walkthrough and a self-check list",
            sample: "The proposal drafts' checklist, including the 48 px tap-target floor; the flow walked with think-aloud",
            question: "Does the specification hold when someone walks the flow?",
            finding: "It held at walkthrough level. The drafts' '6/6 pass' is a self-check, not external validation.",
            implication:
              "This is the ceiling of what the evidence supports — a walkthrough is not a riding trial, and the case says so rather than letting 6/6 imply more.",
          },
        ],
        iterations: [
          {
            version: "Soft requirement",
            change: "'Make cycling safer' and 'warn people in time' as starting briefs.",
            reason: "That is how the requirement arrives, and it is the form in which everyone agrees with it.",
            improvement: "Neither could be built to, and neither could be argued against — which is the same problem stated twice.",
          },
          {
            version: "Forced into thresholds",
            change: "Metres of warning lead, which lane types get down-weighted, minimum tap size, and when not to warn at all.",
            reason: "The real design work is the step that turns the sentence into a number.",
            improvement: "The rules became executable and, more importantly, refutable — someone can point at one and say it is wrong.",
          },
          {
            version: "Second brief, same move",
            change: "A peer-reviewed paper turned into trigger conditions, copy templates and a self-check list.",
            reason: "To test whether the move generalises beyond one project.",
            improvement:
              "It does. Both briefs prove the same capability: turn a soft requirement into a rule that can be argued with, and be explicit about where it stops holding.",
          },
        ],
        limits: [
          {
            constraint: "The guide's effect figures are the cited paper's results, not mine.",
            whyItMatters:
              "Roughly 83% for out-of-view and 62% for mutual occlusion are experimental results I did not produce, and a reader could easily take them as evidence of my design working.",
            nextValidation:
              "A separate section already lists what the source study cannot support: three causes only, Quest 3 only, mostly right-handed young participants, short lab tasks.",
          },
          {
            constraint: "Fietspad never shipped, and the route proportions in the proposal are demonstration figures.",
            whyItMatters: "Routing weights that have never met a real street network are a design intention, not a measured result.",
            nextValidation: "Ride the routes. The claims that survive real conditions are the ones worth keeping.",
          },
          {
            constraint: "User testing reached think-aloud walkthrough and no further.",
            whyItMatters: "A walkthrough catches comprehension problems; it does not catch what happens when someone is riding, tired, wet, or in traffic.",
            nextValidation: "The audio warning in particular needs to be tested at speed, since it exists specifically because a rider cannot look at a screen.",
          },
        ],
        takeaway:
          "This case proves I can take a requirement everyone agrees with and force it into a rule someone can build to and argue with — and that I will state where the rule stops holding rather than letting a self-check imply external validation.",
      },
    ...recentCaseDepth.en,
    ...lamplightDepth.en,
    ...autofillDepth.en,
    ...walkieDepth.en,
    ...fencepostDepth.en,
  },
  zh: {
    connect: {
      decisions: [
        {
          label: "把及格线写在收数据之前",
          choice:
            "13 条假设，每一条都在动手检验之前就写好了数字门槛：8 条关于问题空间，写在第一场访谈之前；5 条关于 MVP 功能，写在做原型之前。「至少 70% 的学生，参与度随每周精力变化」「UCLA-3 与 WHO-5 上，孤独与幸福感相关系数 r ≤ −0.4」，诸如此类。",
          evidence:
            "没有事先约定的门槛，访谈回来的任何结果都可以读成支持。这些门槛是唯一挡在我们和自我印证之间的东西。",
          tradeoff: "结果有几条假设没过自己定的线，我们得把「我们错了」写下来。",
          impact:
            "13 条假设进去，14 张 learning card 回来。12 条对得上假设，包括垮掉的那两条：语言能力不是障碍，缺口也不在曝光。另外 2 条不回答我们问过的任何问题：费用，以及社团招到人之后就没了下文。门槛只能检验你已经想到要问的问题，而这两条比我们预测过的任何一条都更改变了产品的方向。",
        },
        {
          label: "让匹配自己解释自己",
          choice: "推荐一个人的时候，不只给一个契合度分数，还一并说明匹配理由：学习习惯相近、时间表兼容。",
          evidence: "学生对黑箱匹配明确表示怀疑，但同一条推荐一旦说出具体理由，他们就愿意行动。",
          tradeoff: "每条匹配占的竖向空间变大，一屏能放的更少，列表也更长。",
          impact: "那个分数不再是一个只能选择相信的数字，而变成学生可以同意或反对的东西。",
        },
        {
          label: "九月测完之后，回到纸上",
          choice:
            "没有去补那个可点击原型，而是在 10 月 3 日把整个应用重画在一张纸上：五个屏、每条从首页出发的路径都画了箭头、每块功能挂一个人名。",
          evidence:
            "九月抓到的缺陷是结构性的：没有可见的返回路径、卡片状态和自己的按钮互相矛盾。这类问题不是一个组件一个组件能补掉的。",
          tradeoff: "在学期中间付出了开发时间，而且纸面结构砍掉了一些已经写好的功能。",
          impact: "十一月的开发是从一套固定骨架和明确分工开始的，而不是从一个不断堆积的原型开始。",
        },
        {
          label: "分数出了之后接着做，方式是删",
          choice:
            "一月份我把代码库导进自己的仓库，花了五天：用一套设计系统替掉五个人各写各的屏级样式，加上暗色模式和一个 OAuth 回调屏，然后部署上线。那八笔提交的差异是 +1,068 与 −2,348。",
          evidence:
            "五个人并行给二十一个屏写样式，做出来的东西读起来像五个产品。这件事在代码评审里看不出来，一点开就全是。",
          tradeoff:
            "删得比加得多，意味着在删同组同学写的东西；而把整个代码库当成一笔提交导进来，也丢掉了「谁写了哪部分」的历史。",
          impact:
            "这是 UQ Connect 里毫无争议属于我的部分，九笔提交，全在我名下。也正因为如此才有东西可以点开：那个让课程仓库编译不过的缺失文件，在我的仓库里是有的。",
        },
      ],
      evidence: [
        {
          method: "探索式访谈",
          sample: "第一轮 33 份记录，2025 年 8 月 15–30 日；其中 7 场是我做的",
          question: "UQ 给国际学生办的活动本来就不少。为什么它们没有变成关系？",
          finding:
            "把人挡在外面的是场合的规模与节奏，不是词汇量。一位受访者把天花板说得很直白：除了「大家都是国际学生」，很难再找到共同点。",
          implication: "问题不是活动不够多，而是没有任何东西把一个人从这场活动带到下一场。",
        },
        {
          method: "出声思考可用性测试",
          sample: "第二轮 28 份记录，2025 年 9 月 17–24 日；其中 5 场是我做的",
          question: "没有我坐在旁边，学生能不能自己把这些功能用起来？",
          finding:
            "活动卡片一边显示「已报名」，一边还留着报名按钮；一个次级按钮没人看得出是干什么的；没有回上一页的入口；「Skill swap」这个标签本身讲不清自己。",
          implication: "状态反馈和导航才是当下的阻塞点，比匹配质量早得多。",
        },
        {
          method: "任务式可用性测试",
          sample: "第三轮 10 份记录，2025 年 11 月 8–12 日；其中 2 场是我做的",
          question: "学生能不能独自走完一整条链路：创建圈子、设可见范围、进聊天室、发言、再回到列表？",
          finding:
            "链路走通了。受测者把配色化的首页读成了整个应用的地图。但 Circles 的入口不是一眼看到的，他是在侧栏里找到的。",
          implication: "进到流程里之后是站得住的；进得去与否，仍然取决于能不能找到那个入口。",
        },
      ],
      iterations: [
        {
          version: "可点击原型，九月",
          change: "直接拿已经做出来的功能集去测，让受测者出声思考。",
          reason: "当时敞着的风险是「学生能不能自己用」，不是「他们喜不喜欢这个点子」。",
          improvement: "抓出了导航与状态缺陷：这些东西在一场演示式走查里会被直接讲过去。",
        },
        {
          version: "纸面，10 月 3 日",
          change:
            "把应用重画成五个屏：首页、学习伙伴、校园地图上的附近圈子、wellness、资源中心，并为每条从首页出发的路径画上箭头。",
          reason: "结构性的缺陷需要结构性的回答，而纸是给出这个回答最便宜的地方。",
          improvement: "产出了一套开发可以照着走的骨架，每块功能都落到了具体的人身上。",
        },
        {
          version: "十一月的 MVP",
          change: "把这些屏做成共享的组件系统，用 React context 承载跨屏状态，而不是每个屏各写各的样式。",
          reason: "十九个屏、五个人各自手写样式，撑不了多久就不像同一个产品了。",
          improvement: "十一月的测试跑在同一套视觉系统上，受测者靠它的配色去预测东西在哪里。",
        },
        {
          version: "个人续作，一月",
          change:
            "把代码库拿进自己的仓库往回收：用一套设计系统替掉屏级样式，加暗色模式和 OAuth 回调，然后部署。",
          reason: "学期结束时东西是能跑的，但还不像同一个产品。",
          improvement:
            "二十二个屏跑在同一套系统上，而且变成一个谁都能打开的线上版本，不再是一个需要被授权才能看到的仓库。",
        },
      ],
      limits: [
        {
          constraint: "MVP 跑在 mock 数据上。后端写了，但从来没接上去。",
          whyItMatters:
            "匹配、消息和日程从未面对过真实记录、并发或空状态。这几轮测的是一个界面，不是一个能用的产品。",
          nextValidation: "把 API 层接上，用同一条任务链重跑一次，专门盯列表为空、消息变慢的时候会怎么塌。",
        },
        {
          constraint: "没有做前后测量。",
          whyItMatters:
            "我能说九月那个导航缺陷在十一月没有再出现。我说不出改善了多少，因为没有任何一轮记录过完成时间或事先定好的成功标准。",
          nextValidation: "带着计时和事先写好的及格线重跑十一月那条链路，让这一轮产出一个数字，而不是一个印象。",
        },
        {
          constraint: "这是五个人的团队，不是我一个人做的。",
          whyItMatters: "组件系统、共享状态层和我自己那几轮访谈之外的部分，都是别人的工作。",
          nextValidation: "可以直接问我负责哪几块，提交记录会和我说的对得上。",
        },
      ],
      takeaway:
        "这个案例证明我能把研究做成「有可能证明自己错」的样子，把活下来的结论落进一套共享的组件系统，并且在那门课的分数早就出来之后，还继续把它往下做。",
    },
    spectra: {
      decisions: [
        {
          label: "字体打包进扩展，不走 CDN",
          choice:
            "OpenDyslexic 直接打包在扩展里，不在运行时去远端取。",
          evidence:
            "远端字体请求会把「谁在读哪一页」告诉第三方，而且主机一变或者断网就失效。",
          tradeoff:
            "安装包更大，字体也只能靠发新版本更新。",
          impact:
            "离线能用，也不会泄露读者的浏览行为。",
        },
        {
          label: "只保存一套全局设置",
          choice:
            "所有设置用全局键存在 chrome.storage.local 里，对每个网站都生效。阅读障碍模式是一个开关，打开后换成 OpenDyslexic，行高固定 1.5，字距固定 0.05em。",
          evidence:
            "仓库里没有记录为什么选全局保存，而没有分站点存。",
          tradeoff:
            "读者想在某一个站放宽间距，就会在所有站都放宽，间距数值也调不了。",
          impact:
            "一个开关在所有网站上统一开关，不用管理按站点的状态。",
        },
        {
          label: "控件放弹窗，不放右键菜单",
          choice:
            "所有控件集中在工具栏打开的一个弹窗面板里。",
          evidence:
            "右键菜单把「能调什么」藏在一次右键后面，而且一次只显示一项。",
          tradeoff:
            "够到控件要点两次而不是一次，也占用了工具栏位置。",
          impact:
            "能调的东西一眼看全，不需要靠摸索发现。",
        },
      ],
      evidence: [
        {
          method: "Guideline review",
          sample: "WCAG 文本间距条款",
          question: "这个工具至少要开放哪些排版属性，才算有用？",
          finding: "行高、字距、词距、段距，这四项有明确阈值可依。",
          implication: "阅读障碍模式把行高和字距提到固定值；词距和段距没有调整，也没有间距滑杆。",
        },
        {
          method: "Cross-site injection testing",
          sample: "手动跑文档站、新闻站与单页应用",
          question: "注入的样式在什么地方会输给网页自己的 CSS？",
          finding: "内联样式和高优先级选择器可能盖掉注入层。",
          implication: "注入的规则挂在 <html> 的类名下，并加 !important。内容脚本不监听单页应用的路由变化。",
        },
        {
          method: "Unit tests",
          sample: "Jest 覆盖设置与工具层",
          question: "存储键、默认值和设置校验都正常吗？",
          finding: "Jest 覆盖了工具层：存储键、默认值、设置校验和颜色工具函数。",
          implication: "设置出问题会在到达页面之前就被测出来。",
        },
      ],
      iterations: [
        {
          version: "样式注入",
          change: "先做一个内容脚本，往页面里写一段样式表。",
          reason: "这是能看出「这个想法成不成立」的最小实现。",
          improvement: "简单页面能用，遇到优先级强的网站就失效。",
        },
        {
          version: "弹窗控件",
          change: "加了弹窗面板，放开关和滑杆：色觉滤镜、阅读障碍模式、聚焦尺、高对比度、字号缩放等。",
          reason: "要手改数值的东西，没人会用第二次。",
          improvement: "「能调到什么程度」从暗示变成了看得见。",
        },
        {
          version: "保存设置 + 双语界面",
          change: "用全局键把设置存进 chrome.storage.local，并加上中英两套语系文件。",
          reason: "每次访问都重置的设置比没有设置更糟。",
          improvement: "设置在重新加载后还在，并对所有网站生效。",
        },
      ],
      limits: [
        {
          constraint: "真正需要它的人，一个都还没用过。",
          whyItMatters: "这里每一个控件都是从准则推出来的，不是看着谁读得吃力才做的。",
          nextValidation: "找那些真的依赖宽间距或阅读障碍字体的人坐下来看，他们从来不碰哪几个控件。",
        },
        {
          constraint: "它是 DEMO，不是已发布的扩展。",
          whyItMatters: "它没经历过 Chrome 应用商店审核、自动更新，也没遇到过网站在它脚下改版。",
          nextValidation: "先发出去，然后看哪些网站先坏、坏得多快。",
        },
      ],
      takeaway:
        "这个案例证明我能把无障碍准则做成一个真能用的工具，并让它在我控制不了的页面上继续可用。它还不能证明这个工具帮到了谁。",
    },
    maze: {
      decisions: [
        {
          label: "用震动取代电击方案",
          choice: "最初的陷阱反馈是轻微电击。我改成用继电器驱动的震动马达，装在手指套里。",
          evidence: "这台迷宫要放在公开展览上，玩家年龄与身体状况未知且无人全程看管，无法逐人取得同意与校准。",
          tradeoff: "震动的刺激强度不如电击，陷阱少了那种「让人记住」的冲击感。",
          impact: "系统不需要有人守着每一轮也能展出，而反馈依然有效，因为它落在手指上，不是落在屏幕上。",
        },
        {
          label: "给红外传感器加防抖，而不是直接信任原始读数",
          choice: "我为 10 个 FC-51 红外传感器各自加上防抖与冷却窗口。",
          evidence: "球经过一次会产生多个原始触发事件，导致同一个物理事件重复计分、重复触发陷阱。",
          tradeoff: "冷却窗口会带来一段盲区，真的很快的第二次经过会被漏掉。",
          impact: "一个物理事件变成一个游戏事件，这是计分、计时与震动能彼此对上的前提。",
        },
        {
          label: "把倾斜控制器从主反馈控制器上拆出来",
          choice: "平台倾斜改由独立的 SafeTouchServoController 负责，采用「按住才动」的行为，与主 PlanB 反馈固件分开。",
          evidence: "舵机运动和对时间敏感的传感器轮询挤在同一块板上，会让反馈时机不稳定，而且一次舵机故障可能拖垮整轮。",
          tradeoff: "两个控制器意味着更多接线，布展时也多了一个故障点。",
          impact: "反馈时机不再和执行机构抢资源，「按住才动」也让倾斜功能可以安全地交给陌生人操作。",
        },
        {
          label: "做一个同时支持 demo 与 live 模式的浏览器控制台",
          choice: "我做了一个 Web Serial 控制台，既能镜像实体迷宫，也能独立以 demo 模式运行。",
          evidence: "硬件并不是随时都在手边：开发期间如此，放进作品集或面试场合更是如此。",
          tradeoff: "两种模式意味着两条代码路径，可能各自漂移。",
          impact: "没有实体也能查看这套系统，而回归测试保证 demo 不会偏离固件的真实规则。",
        },
      ],
      evidence: [
        {
          method: "传感器台架测试",
          sample: "10 个 FC-51 红外传感器，分布在陷阱区、诊断区、备用区与终点区",
          question: "球经过一次，是否刚好产生一个游戏事件？",
          finding: "原始读数会重复触发两到三次；加上防抖与冷却窗口后，一次经过收敛成单一事件。",
          implication: "传感器时序是交互设计问题，不只是电子细节。",
        },
        {
          method: "固件与网页一致性回归测试",
          sample: "覆盖串口同步、反馈同步、舵机响应与音频一致性的回归测试",
          question: "任一侧改动之后，浏览器控制台是否仍然与固件行为一致？",
          finding: "只要单独改一侧，反馈时机与串口事件结构就会出现漂移。",
          implication: "这个 demo 可以被当成对真实系统的描述，而不是另一套说法。",
        },
        {
          method: "公开展览游玩观察",
          sample: "大学展览中的多人游玩；未做正式场次记录",
          question: "玩家不经讲解，能否理解系统在告诉他们什么？",
          finding: "玩的时候，注意力在迷宫、分数与时间显示、灯光和声音上，有些玩家第一次被震动吓了一跳。每组戴装备大约一分钟，讲解之后仍有不少人没弄懂规则。",
          implication: "可穿戴的佩戴方式与布置流程本身就是交互的一部分，不是交互开始前的杂事。",
        },
      ],
      iterations: [
        {
          version: "电击陷阱",
          change: "从以轻微电击为核心的陷阱概念开始。",
          reason: "那是「你踩到陷阱了」最直接的版本。",
          improvement: "把安全与知情同意的问题摆到台面上，逼出了重新设计。",
        },
        {
          version: "震动手指套",
          change: "陷阱反馈改为继电器驱动的震动马达，装进可穿戴手指套。",
          reason: "反馈必须传到玩家身上，同时不能带来需要专人看管的风险。",
          improvement: "保住了身体层面的感受，同时让迷宫可以安全地面对排队的陌生人。",
        },
        {
          version: "同步反馈闭环",
          change: "把传感器事件、计分、计时、灯光、音效与浏览器控制台接到同一个回合状态机上。",
          reason: "各子系统各自反应时，整台迷宫像是一堆互不相干的小装置。",
          improvement: "现在一个事件会产生一组连贯的多通道反馈，玩家读得懂。",
        },
      ],
      limits: [
        {
          constraint: "展览游玩是观察记录，没有做数据埋点。",
          whyItMatters: "我能描述玩家对什么有反应，但无法量化哪一种反馈通道承载了最多信息。",
          nextValidation: "记录每场的传感器事件、反馈触发与完成时间，再对比选择性关闭某些通道的回合。",
        },
        {
          constraint: "这是一台展览用的单机，不是可量产的产品。",
          whyItMatters: "接线是手工走的，校准要按场地来，所以它无法证明耐久性、良率或可重复的组装流程。",
          nextValidation: "改用制作好的线束重做一台，并在多个场地测量布置时间与传感器漂移。",
        },
      ],
      takeaway:
        "这个案例证明我能把一个交互概念一路做穿固件、感测与实体反馈，再接回浏览器控制界面，并在陌生人真的会上手的硬件上做安全与校准判断。",
    },
    hoop: {
      decisions: [
        {
          label: "写美术圣经，按画布尺寸分三份",
          choice: "三份参考文档：像素球员、有机场景、扁平队徽。它们和首批 38 张图在同一个提交里（9582f30），早于 299 条登记表。明确写着引用美术圣经的，只有头像那份提示词模板。",
          evidence:
            "256×256 的队徽、32×32 的像素人物、1280×720 的场景，共用不了一套风格语言。画布尺寸决定一张图装得下多少信息，所以每份规范都从画布出发。",
          tradeoff: "在看到产出之前就把规则定死，等于对一个还没被验证过的风格先下注。",
          impact: "规则比产量先存在：美术圣经比那份 299 条的登记表早六天提交。",
        },
        {
          label: "写清楚拒绝什么，整组靠人眼并排看",
          choice:
            "一张明确的拒绝清单：写实照片、3D、动漫、霓虹、随机文字、真实商标。审查靠人工，把资产并排摆开，对照美术圣经看；没有脚本查风格。",
          evidence: "每个队徽单看都过了逐张规则，并排摆开才看出是同一个模板的变体。一次只看一张的检查，看不出这种问题。",
          tradeoff: "人工审查只顾得上我看得过来的量，而且不留记录。生产日志里那行审查结论，是生成脚本自己写进去的。",
          impact: "这次趋同变成了队徽规范和模板负面提示词里的两条整组规则。说清楚这个世界「不是什么」，比描述「是什么」更能落地。",
        },
        {
          label: "用 146 个节点压缩一生，而不是模拟日历",
          choice:
            "从 12 岁到退役的生涯，跑在 146 个节点上，分八种类型：训练、比赛、剧情、关系、风险、奖励、休息、传承，而不是一天一天地模拟。",
          evidence: "以日历为单位的生涯模拟，大部分运行时间都花在重复上，真正有意思的决定被埋在维护性点击里。",
          tradeoff: "离散节点会丢掉「一个赛季慢慢磨过去」的质感，玩家感受不到时间用慢的方式流逝。",
          impact:
            "每个节点都得挣得自己的位置，而行动的组合会留下后果：反复训练会抬高竞技状态，同时抬高身体风险和压力、拉低队友信任。",
        },
        {
          label: "视觉语言是从一个产品反推的，而且明说",
          choice:
            "配色与字体系统是从 Anthropic 的产品设计反推出来的：羊皮纸底色、赤陶强调色、全部暖调中性色，并且在设计文档里写明来源。",
          evidence: "一个讲「一个人的一生」的游戏，需要的表层是从容的、带文学感的，而不是一套塞满冷蓝和能量渐变的体育 UI。",
          tradeoff: "这是借来的语言，不是发明出来的；认得出来源的人一眼就会认出来。",
          impact: "把来源写进设计文档，才让它成为一次迁移练习，而不是一次没署名的挪用。",
        },
      ],
      evidence: [
        {
          method: "资产登记表与生产日志",
          sample: "六个批次：头像 64、场景 40、CG 73、UI 图标 72、球场战术 18、静态特效 32",
          question: "这条管线对每一批到底记下了什么？",
          finding: "登记表里有 299 条资产规格，分六批；记录写的是每一批的数量，不只是一个总数。这 299 条背后的原始图像文件还没核实。",
          implication: "登记表可以审计：一条记录属于哪一批、登记在哪个目录，都查得到。图本身长什么样，登记表说明不了；唯一的自动检查只管命名、编号、目录和 PNG 尺寸，不管风格。",
        },
        {
          method: "自动化回归测试",
          sample: "355 个测试文件、1975 个测试，覆盖生涯、合同、伤病、赛季与存档系统",
          question: "一个系统很重的生涯模拟，在内容持续落地的同时还能保持正确吗？",
          finding: "1975 个全过；存档数据带 schema 版本号，旧存档会被迁移，而不是悄悄坏掉。",
          implication: "这里的规模是一个设计约束，不是拿来炫的：没有它，加一章会安静地弄坏三章之前的一条合同规则。",
        },
        {
          method: "可玩性实测",
          sample: "线上公开版本，从主菜单一路走过角色创建，进到第一个生涯节点",
          question: "对一个刚进来、什么都不知道的人，这个循环真的跑得起来吗？",
          finding:
            "角色创建卡在「姓名必填」上，打法风格的选择会传导进六维属性，第一个节点打开时状态、关系网和可选行动全部就位。",
          implication: "这些系统是端到端接通的，接缝处没有拿假数据糊过去。",
        },
      ],
      iterations: [
        {
          version: "概念",
          change: "定位成像素风生涯模拟，参考 NBA 2K MyCareer、Punch Club、New Star Soccer 与 Stardew Valley。",
          reason: "每个参考各解决一块：生涯弧、属性衰减、场外生活、日常循环的满足感。",
          improvement: "先说清楚各自要借什么，scope 才没有膨胀成「做一个篮球游戏」。",
        },
        {
          version: "系统搭建",
          change: "选秀、合同、赛季、休赛期、退役、New Game+ 与战术比赛全部作为系统落地。",
          reason: "一个生涯模拟有多好玩，取决于它能把后果扛过多长的游戏时间。",
          improvement: "现在一段生涯可以从少年走到退役，并被封存成 Legacy，影响下一周目。",
        },
        {
          version: "美术管线",
          change: "把队徽并排摆开，发现都收敛成同一个模板，于是在队徽规范和对应模板里补了两条整组规则。",
          reason: "每个队徽都过了逐张规则，问题只出在整组层面。",
          improvement: "整组规则跟着模板走，每次用模板写提示词都会带上，不用靠谁记得去翻审核清单。",
        },
      ],
      limits: [
        {
          constraint: "没有做过玩家研究。游戏自己标的是 DEMO v0.6。",
          whyItMatters: "这里的一切都是系统设计和生产纪律。这套节奏对一个不是我的人管不管用，还没测过。",
          nextValidation: "找五个平时不看篮球的人玩第一章，看这些系统在哪一步开始讲不清自己。",
        },
        {
          constraint: "首包偏大，移动端真机 QA 不足。",
          whyItMatters: "3.8 MB 的 JS 首包在手机上是实打实的门槛，而华语玩家恰恰主要在手机上遇到它。",
          nextValidation: "先做代码分包，再补真机 QA，然后才谈公开测试。",
        },
        {
          constraint: "视觉语言是反推来的，不是原创的。",
          whyItMatters: "它是从一个既有产品的设计系统迁移过来的；把它说成原创就是不诚实。",
          nextValidation: "把这套系统推到来源到不了的地方：篮球特有的那些界面，就是它必须停止「借」的位置。",
        },
      ],
      takeaway:
        "这个案例说明我怎么搭生成式生产。规则先写，拒绝什么写清楚，脚本查得了什么、什么还得靠人，也分得清。同时，一个系统很重的实现在 1975 个测试下保持正确。",
    },
      pricewise: {
        decisions: [
          {
            label: "把构建通过当成一句待验证的话，不当成证据",
            choice:
              "每个功能都重新验一遍：打线上接口、读真实返回、直接查数据库。不看那段本该实现它的代码；唯一的例外是定时任务鉴权，那是迁移途中读代码撞见的。",
            evidence:
              "四类缺陷同时通过了构建、类型检查和整套测试。语意搜索从来没用过向量，用模板建的清单永远是空的。定时任务鉴权缺了密钥也不拒绝。数据模型里声明的六张表，数据库里一张都没建。",
            tradeoff: "慢、全靠手动，而且大部分时候什么也查不出来，成本每个功能都要付，收益集中在少数几个上。",
            impact:
              "四类的共同点是都不报错。坏掉的是「功能有没有真的执行」，而这件事没有任何一道自动关卡在看。",
          },
          {
            label: "把向量那处算成我自己的错，写进案例",
            choice:
              "另有一处是我修语义搜索时引入的。补上漏传的字段后，1536 维的向量就跟着商品对象序列化进了接口返回，三条搜索结果把响应撑到 89 KB。",
            evidence: "它是打真实接口、读返回内容查出来的，不是靠审 diff。",
            tradeoff: "写明它是我的，案例就没那么好看，而且这是唯一一处可以悄悄并进其他几条的。",
            impact: "但它恰恰是这套方法最强的证据：这道检查连它自己的作者一起抓，而不只抓 AI。",
          },
          {
            label: "让一份功能规划定下范围",
            choice:
              "事后回看，我判断功能清单是 AI 生成的规划，从「一个完整的产品该有什么」推出来，没有从任何人的需求出发；仓库里没有这条记录。开发一路照着这份清单做，Phase 2 到 Phase 6 全部落在 2026 年 1 月 9 到 10 日这两天。",
            evidence:
              "2026 年 3 月 1 日，单次提交 5884 行：v1 接口、AI 函数调用、中英双语文案、价格预测，还有一层社交功能，约占四分之一。最后几次提交在 3 月 2 日，下一次要到五个月后。",
            tradeoff: "回头看，一个建在拟真数据上、注册用户为 0 的比价应用，不该继续长下去。",
            impact:
              "范围一直没有缩回去。8 月 v1 路由只是搬到了不带版本号的路径，没有删；API 路由从 3 月 2 日的 91 条变成现在的 109 条。",
          },
          {
            label: "留一处已知的错配不修，并把它锁进测试",
            choice:
              "小票匹配从 20 条构造输入里对 15 条提到对 19 条，但「MLK FC 2L」从「匹配不到」变成了「配到 Oat Milk」。这是变糟，所以维持原样不动。",
            evidence:
              "匹配不到会进 unmatched 清单，用户看得见；配到错的商品，错价格会直接进比价结果，用户不会知道。",
            tradeoff:
              "要修就得加缩写词典：那会变成没完没了的维护清单；或者放开两字母 token：那会把刚压下去的误配放回来。",
            impact:
              "正确的处理是让它回到「匹配不到」，那是信心阈值的问题，不是缩写的问题。这个已知错配已经锁进测试，它变了要有人知道。",
          },
        ],
        evidence: [
          {
            method: "对着线上应用打真实接口",
            sample: "109 条 API 路由、36 条页面路由；逐个功能端到端打一遍",
            question: "这个功能是真的在执行，还是只是渲染出来了？",
            finding:
              "语意搜索每一次查询都静默退回关键字匹配：商品对象在数据映射那层就把向量字段丢了。关键字匹配也能搜到东西，所以看不出任何异常。",
            implication: "「渲染正确」和「执行正确」是两句不同的话，而只有其中一句背后有自动关卡。",
          },
          {
            method: "给产品最依赖的那个模块补回归测试",
            sample: "小票商品名匹配：第二个提交里一次写成 175 行、此后从未修改，配的 13 个测试输入是 milk、eggs、sourdough bread",
            question: "这个核心模块，测过真实小票印出来的样子吗？",
            finding:
              "13 个输入没有一条像真实小票。「W/MEAL BREAD」配到了白吐司，因为标准化把截断标记的斜杠换成了空格；「MLK FC 2L」和「CHK BRST FIL」匹配不到，因为去掉元音的骨架缩写是目标词的子序列。",
            implication:
              "改法只加分不改分：既有四条计分规则一行没动，所以原本能配对的输入不可能倒退。实测确认，原本对的 15 条零退化。",
          },
          {
            method: "直接查数据库",
            sample: "拿整份 schema 对线上 Postgres 实例逐张核",
            question: "声明过的表，数据库里真的有吗？",
            finding: "六张没有。因为没有功能真的读写它们，「关系不存在」这个错从来没被触发过。",
            implication: "schema 是一份意图声明。它和数据库对不对得上是另一个问题，而构建流程里没有任何一环在问它。",
          },
        ],
        iterations: [
          {
            version: "从脚手架到功能齐全",
            change:
              "Phase 2 到 Phase 6：预算、优惠、食谱、门店定位、协作、社交分享、价格提醒、双语、消费趋势、AI 建议、清单模板、命令面板、帮助中心，全部推完，用了 2026 年 1 月 9 到 10 日两天。",
            reason: "规划来自 AI 对「一个完整产品」的定义，不来自任何一个用户的需求。",
            improvement: "它做出了一个很大、看起来也很自洽的表层，而这个「看起来」正是这个案例后面要讲的事。",
          },
          {
            version: "搁置",
            change: "2026 年 3 月 2 日停下，五个月没有碰。回来后第一句提交信息写的是「提交 Next 16 升级与半成品功能，作为优化前的还原点」。",
            reason: "仓库里没有记录为什么停下。",
            improvement:
              "范围一直没有缩回去。8 月 v1 路由只是搬到不带版本号的路径，社交路由至今都在。回头看，一个建在拟真数据上、注册用户为 0 的比价应用，不该继续长下去。",
          },
          {
            version: "验证轮",
            change: "逐个功能打线上接口、读返回、查数据库；给匹配器补写回归测试。",
            reason: "构建流程里没有任何一环在问「功能有没有真的执行」，它只问了「能不能编译、渲不渲染得出来」。",
            improvement: "查出四类缺陷和一处我自己带进的回归，源码里都已修好。小票匹配器里留了一处已知错配，写明它怎么失效，拿测试钉住。测试共 311 个，全绿。",
          },
        ],
        limits: [
          {
            constraint: "注册用户是 0。所有验证跑的都是我自己造的数据。",
            whyItMatters: "这个案例证明的是一套验证方法，不是这个产品有用。普通人拍一张皱掉的小票，识别成功率是多少，我不知道。",
            nextValidation: "找五个人，用他们自己的小票，记录识别是怎么失败的：不是失败率，是失败的样子。",
          },
          {
            constraint: "这些验证是手动的，长在我手上。",
            whyItMatters: "一道要靠人记得去跑的检查不算关卡。这些缺陷之所以存在，正因为没有任何自动检查在问功能有没有执行。",
            nextValidation: "把接口探测接进构建流程，让「有没有真的跑起来」直接把 CI 挂掉，而不是等一个人想起来。",
          },
          {
            constraint: "商品库是三家超市 65 件商品，价格来自拟真数据。",
            whyItMatters: "案例里出现的金额是演示数据，不是任何人的真实账单；比价逻辑也从没遇到过真实的价格波动。",
            nextValidation: "接一个小范围的真实价格源，再查一件事：一个价格放多久之后，比价结果就开始误导人。",
          },
        ],
        takeaway:
          "这个案例证明：在一份 AI 写的代码上，我能把「看起来完成」和「真的能用」分开验，并且留下可复现的脚本，换一个人照着跑能得到同样的结论。我贡献的判断不是「写什么」，是「怎么确认它是真的」。",
      },
      gapmapper: {
        decisions: [
          {
            label: "先把原型做出来，再主张放弃它代表的方向",
            choice:
              "团队当时没有能演示的东西，而我是能把讨论变成代码的那个，所以第一版路线支持原型由我建，然后由我主张这个方向该放弃。",
            evidence:
              "屏幕一亮起来，问题也跟着亮了：一个建议「更安全路线」却保证不了安全的系统，获得了一种自己没有挣来的权威。",
            tradeoff: "这意味着放弃一个更明显、更好讲、演示效果更好的产品概念，换一个更安静但边界更清楚的方案。",
            impact:
              "那版早期原型留在作品集里，恰恰因为它没做完、也不好看。没有它，最终方向看起来像凭空出现；有它在旁边，那段学习才看得见。",
          },
          {
            label: "先换读者，再改界面",
            choice: "评图之后我改的第一件事不是界面，是读者：从街上那个此刻正紧张的行人，换成市政机构、城市规划者、校园安全团队。",
            evidence:
              "评图指出的是两个设计问题，不是功能缺口：把安全画成二元，会让「这里安全、那里不安全」变成界面亲口说出的判断；而一个女性安全项目，可能又一次在要求女性调整自己的行为，而不是去质问造成不安全的环境、系统和人。",
            tradeoff: "新读者是机构，节奏慢，产品也失去了那种让它演示好看的即时感。",
            impact:
              "输出跟着变：不再告诉人走哪条，而是显示感知和客观指标对不上的地方，并且不承诺任何一处是安全的。",
          },
          {
            label: "两类证据并排放，不合并",
            choice:
              "客观指标（照明、公交可达、事件背景、视野、还开着的店、街道状况）和感知信号并排，两者的落差被当成「需要去查一查的理由」显示，而不是「危险的证明」。",
            evidence:
              "我最初把路灯当成可以直接使用的安全变量：灯多则安全。文献不同意。能见度、围合感、周围有没有活动、社会线索、时间，都会改变一个人怎么解读同一盏灯；一条有灯的街，如果空、封闭、不好离开，照样让人不舒服。",
            tradeoff: "分开放让结果不那么戏剧化，也更难一句话概括。",
            impact:
              "一旦揉成一个分数，不确定性就消失了，屏幕会显得比它应有的样子更自信。分开放，人可以追问「为什么这里被标出来」，而不是被告知「这里就是不安全」。",
          },
          {
            label: "把伦理立场写成系统要求，放进 brief",
            choice: "一页 brief 把它们写成约束：上报匿名、位置取整到街段、必须显示信心水平与偏差标注、不出公开的安全分数。",
            evidence:
              "一位受访者警惕按犯罪历史算路线，因为偏见可能在进入算法之前，就已经在犯罪数据里了。我一开始把她的意思读错了，是队友在群里质疑之后，我回去重看笔记才确认的。",
            tradeoff: "这一页是三件交付物里最难写的，因为它让伦理立场没法停留在报告里的一句话。",
            impact: "「不出安全分数」写进系统要求之后，它就不再是态度，是约束：做这个东西的人必须满足它。",
          },
        ],
        evidence: [
          {
            method: "半结构式访谈并编码",
            sample: "团队共 18 个、6 人完成；第 10、11、12 个由我做",
            question: "人在判断一个地方能不能走的时候，实际依赖的是什么线索？",
            finding:
              "团队的编码表里，18 个访谈有 16 个提到路上有没有人，14 个提到路灯；这是提及次数，不是比例。我做的三个都提到了路灯，但提到同一条线索，不等于读法一样。把这三个人分开的，是愿不愿意让一个系统替自己判断。一个有保留地接受，两个明确不要，还有不止一个人明确不信犯罪率历史。",
            implication: "分歧落在谁有资格下结论上。中期评图之后，我推动项目从推荐路线转向显示感知和指标对不上的地方。",
          },
          {
            method: "拿文献检验假设",
            sample: "路灯假设：灯多则安全",
            question: "照明能不能直接当作安全变量用？",
            finding: "不能。能见度、围合感、周围有没有活动、社会线索、时间，都会改变同一盏灯被怎么解读。",
            implication: "这条决定了后面所有结构，也让访谈从「调查结果」变成「感知线索」：这个样本量撑不起任何一个分数。",
          },
          {
            method: "逐屏做伦理审视",
            sample: "六屏：Place Inspector、Field Reports、Data Sources、Intervention Planner、Ethics Boundary、Export Brief",
            question: "这一屏让什么可见、把什么藏起来、期待谁去行动、暗示了多高的确定性？",
            finding:
              "Place Inspector 是承重的那一屏。一个红色或橙色的标记落在真实街道上，会开始像一个判决，哪怕背后的证据其实很薄，所以它显示信心水平、来源状态、上报背景，以及这些数据还证明不了什么。",
            implication: "地图只是入口。真正承担论证的是那几屏慢的。",
          },
        ],
        iterations: [
          {
            version: "路线支持原型",
            change: "同一趟行程按不同线索评分排序，叠加风险密度、路灯、监控与营业店铺图层。",
            reason: "团队需要能演示的东西，而我能建。",
            improvement: "看起来非常实用，危险恰恰在这里：让一个没解决的问题看上去像已经解决了。",
          },
          {
            version: "评图之后转向",
            change: "换读者、换输出、换主张：支持「接下来该查什么」的讨论，不承诺任何地方是安全的。",
            reason: "评图指出的是把安全画成二元和责任错位，这是设计问题不是功能问题。",
            improvement: "主张从「帮一个人安全地走夜路」，变成「让机构看见自己的证据在哪里不完整」。",
          },
          {
            version: "三件互相咬合的交付物",
            change: "最终报告定主张，一页 brief 把主张变成系统要求，原型把这些要求走成一条能通的规划流程。",
            reason: "光有原型，主张会飘；光有报告，主张不落地。",
            improvement: "报告到 brief 到原型这条链，让伦理立场最后变成了一个施工的人必须满足的东西。",
          },
        ],
        limits: [
          {
            constraint: "没有经过真实规划人员测试，部分数据层是设想中的接入而非实时管线。",
            whyItMatters:
              "它能声称的是一个可以被挑战的设计方向，不是一个完成的公共系统。正式的数据共享协议、最小上报阈值、更强的偏差检测、相关方的上手流程，都还缺。",
            nextValidation: "挑两三个昆士兰大学或布里斯班市中心的地点做小试点，用一小批取整过的上报跑一遍，再找校园安全人员或面向市政机构的评审开一次评审会。",
          },
          {
            constraint: "18 个访谈只能数出谁提到了某条线索，撑不起任何比例、排名或分数。",
            whyItMatters: "这就是为什么整份工作里访谈只被当成感知线索用，从来没被当成调查结果。",
            nextValidation: "先看落差分类在更乱的证据里还成不成立，再回头测上报的提问方式：顺序不能反。",
          },
          {
            constraint: "最终提案没有完全回答它所回应的那条批评。",
            whyItMatters: "改变一个系统声称什么，不等于解决了「究竟在要求谁改变行为」这个底层问题。",
            nextValidation: "把提案交回同一位评审，问这次主张的转变够不够，还是只是更小心了。",
          },
        ],
        takeaway:
          "这个案例证明：当我自己做出来的原型给出了证据撑不起的承诺时，我会杀掉它；并且能把由此产生的伦理立场写成系统要求，而不是留成报告里的一段话。有时候更好的设计选择，是拦住自己别说那么多。",
      },
      rules: {
        decisions: [
          {
            label: "提案草稿先把「更安全」逼成数字",
            choice: "提案草稿把安全写成了三样东西。一是路线权重：优先分隔路段与安静街道，给只有一层油漆的车道降权。二是 150–250 m 的提示提前量，三是 48px 的点击区下限。草稿多由 AI 起草。",
            evidence: "自行车道会突然断掉，把人甩到主干道上。草稿给这个现象起了名字（「25 米自行车道」）。最终提案保留了环岛与左勾弯前的预警，并把「最平稳」设为默认路线。",
            tradeoff: "这么早定阈值，等于在还没有证据说明这些数字对不对的时候就先认了。",
            impact: "一条带数字的规则能被执行，也能被反驳。「让骑车更安全」两样都做不到。",
          },
          {
            label: "提示写行为，不写方向",
            choice: "左勾弯的提示写的是「占道，并与转弯车辆做眼神确认，或走 Fish Lane 绕行」：因为真实应对方式是占位加眼神，不是「左转」。",
            evidence: "危险分类是自行车专用的：左勾弯、开门区、共享道。距离按距离给（200m / 450m / 1.2km），不按路口给，因为骑行中没有「下一个路口」这种稳定参照。",
            tradeoff: "行为型文案比方向型长，而且得在速度中被读到或听到。",
            impact: "所以危险清单带音频开关：人在骑车时看不了屏。这是同一条要求：150–250 m 的提前量，用不占视线的方式给出去。",
          },
          {
            label: "让安全的那个选项自带代价，并且拒绝最高级",
            choice:
              "绕路按钮把多花的分钟数直接写在按钮上；「保持原路线」是平等的一级按钮。入口按钮写的是「See safer routes」：比较级，不是最高级。",
            evidence: "没有任何数据能支撑「最安全」这三个字。",
            tradeoff: "比较级作为宣传更弱，做成按钮也更不痛快。",
            impact: "界面不假设更安全的那条就是这个人这趟该走的那条，也不声称一个它辩护不了的排名。",
          },
          {
            label: "把一篇论文拆成三条触发条件，而不是一句通用警告",
            choice: "Quest 3 指南把手部追踪失效拆成三条独立触发条件：低光、出视野、互遮，各配各的文案模板，不合并。",
            evidence:
              "一篇 2025 年的同行评审论文证明了「断之前给预警」有效。低光约提前 3 秒；出视野与互遮按风险阈值触发，忽略微抖动并加冷却。",
            tradeoff: "三套模板比一套难维护，而且这几种成因可能同时发生。",
            impact:
              "文案统一写成「现象 → 一个动作」：手看不见了 → 把手移回视野。动词开头，只给一件事做。正是这个格式让它明天就能照着施工。",
          },
        ],
        evidence: [
          {
            method: "课程要求的 AI 使用标注册",
            sample: "四个工具各有分工：Otter 做转录、ChatGPT 归类与初稿、Miro 出概念图与初步聚类、Figma Make 出快速原型",
            question: "AI 在哪里帮上了忙、在哪里出了问题、然后怎么修的？",
            finding:
              "转录漏人名街名、合并发言人；生成工具给出听起来笃定、实则无据的说法；Figma Make 的版面保真度不稳，小改提示词导致大幅偏移；AI 会把互相矛盾的张力并成一个主题。",
            implication:
              "修法是具体动作不是态度：建一份人名与郊区的简短风格指南；对照官方来源逐条核实，删掉所有没有出处的数字；每一屏在 Figma Design 重建；边缘案例单独列一张表：夜骑信心、雨天风险、大型电辅车停不进窄车架，它们后来各自变成了具体功能。",
          },
          {
            method: "把文献翻译成规范",
            sample: "一篇 2025 年关于摄像头手部追踪断线前预警的同行评审论文",
            question: "这篇论文里有什么，是设计师明天就能照着做的？",
            finding: "三种失效成因变成三条独立触发条件；检测的提前量变成各自的阈值；文案约定变成「现象 → 一个动作」。",
            implication: "产出是一份八格图文指南：失效现象、影响、该做与不该做、触发阈值、文案模板、效果对比、自查清单、收尾行动。",
          },
          {
            method: "出声思考走查加自查清单",
            sample: "提案草稿的自查清单，含 48px 点击区下限；流程用出声思考走了一遍",
            question: "这份规格，在有人真的走一遍流程时立不立得住？",
            finding: "走查这一层立得住。草稿里的「6/6 通过」是自查清单，不是外部验证。",
            implication: "这就是证据能撑到的上限：走查不是骑行实测，案例直接这么写，而不是让 6/6 去暗示更多。",
          },
        ],
        iterations: [
          {
            version: "软要求",
            change: "「让骑车更安全」「预警有效」，作业最初就是这两句话。",
            reason: "要求本来就是以这个形态出现的，也正是这个形态让所有人都同意它。",
            improvement: "两句都拿不去施工，也都没法被反驳，这其实是同一个问题说了两遍。",
          },
          {
            version: "逼成阈值",
            change: "多少米之前提示、哪一类车道要降权、点击区不小于多少、什么情况下不该提示。",
            reason: "真正的设计工作发生在把句子变成数字的这一步。",
            improvement: "规则变得既能执行，更要紧的是能被反驳：有人可以指着其中一条说「这条不对」。",
          },
          {
            version: "第二份作业，同一个动作",
            change: "把一篇同行评审论文变成触发条件、文案模板和自查清单。",
            reason: "想验证这个动作能不能脱离单个项目。",
            improvement:
              "能。两份作业证明的是同一件事：把软要求逼成一条能被反驳的规则，并且说得清它在哪里失效。",
          },
        ],
        limits: [
          {
            constraint: "指南里的效果数字是所引论文的实验结果，不是我的。",
            whyItMatters: "出视野约 83%、互遮约 62%，这两个数不是我做出来的，读者很容易把它们当成我的设计有效的证据。",
            nextValidation: "已另写一节列出原研究撑不起的部分：只覆盖三种成因、只在 Quest 3 上做、受试者以右利手年轻人为主、实验室短时任务。",
          },
          {
            constraint: "Fietspad 没有上线，提案里的路线比例是演示数字。",
            whyItMatters: "一套从未遇到真实路网的路线权重，是设计意图，不是测量结果。",
            nextValidation: "去骑。能在真实条件下活下来的主张，才是值得留的那些。",
          },
          {
            constraint: "用户测试只做到出声思考走查这一层。",
            whyItMatters: "走查能抓到理解上的问题，抓不到一个人在骑行中、累了、下雨、车流里会发生什么。",
            nextValidation: "音频提示尤其要在速度中测：它存在的理由本来就是「人在骑车时看不了屏」。",
          },
        ],
        takeaway:
          "这个案例证明：我能把一句所有人都同意的要求，逼成一条能照着施工、也能被指着说「这条不对」的规则；并且会写明它在哪里失效，而不是让一份自查清单去暗示外部验证。",
      },
    ...recentCaseDepth.zh,
    ...lamplightDepth.zh,
    ...autofillDepth.zh,
    ...walkieDepth.zh,
    ...fencepostDepth.zh,
  },
};



const caseInterviewScans: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseInterviewScan>> = {
  en: {
    connect: {
      proves:
        "This case proves I can run research capable of proving itself wrong, carry what survives into a shared component system, and keep working on the result after the grade was already in.",
      inspect: [
        "The hypotheses that failed their own pre-written threshold, and what replaced them.",
        "Why the team went back to paper in October instead of patching the prototype.",
        "What the November task chain established, and what it could not.",
      ],
      questions: [
        "Which of your assumptions did the research kill, and how did you find out?",
        "You were one of five. Which parts of this are yours?",
      ],
      bestFit: [
        "Product teams where a designer is expected to build as well as research.",
        "Roles where research has to survive contact with a delivery deadline.",
      ],
    },
    spectra: {
      proves:
        "This case proves I can turn accessibility guidance into a working tool, and keep it working on pages I do not control.",
      inspect: [
        "Why the font is bundled in the extension instead of fetched from a CDN.",
        "Why settings are one global set, and what that costs a reader.",
        "Where injected styles lose to a page's own CSS, and what that forced.",
      ],
      questions: [
        "How do you make injected styles win without breaking the layout?",
        "What would you watch first if you put this in front of a real reader?",
      ],
      bestFit: [
        "Accessibility teams that want a designer who can also ship the tool.",
        "Product teams where design work reaches the browser, not just the mockup.",
      ],
    },
    maze: {
      proves:
        "This case proves I can build the thing, not just specify it: sensing, firmware, physical feedback, and a browser control surface wired into one loop.",
      inspect: [
        "Why the electric-shock trap became vibration in wearable finger sleeves.",
        "How sensor debounce turned one ball pass into exactly one game event.",
        "How the Web Serial console keeps demo mode honest about firmware rules.",
      ],
      questions: [
        "Where did hardware constraints change the interaction rather than just the build?",
        "What would you instrument to learn which feedback channel players actually use?",
      ],
      bestFit: [
        "Design technologist, creative technologist, or prototyping roles.",
        "Teams building physical products, installations, or hardware-software interfaces.",
      ],
    },
    hoop: {
      proves:
        "This case shows I can set up generative production with written rules and a plain line between what a script checks and what a person must, and keep a systems-heavy build correct while content keeps landing.",
      inspect: [
        "Why the art bible is split into three by canvas size.",
        "Why the logos had to be laid side by side before their convergence showed.",
        "Why a career runs on 146 discrete nodes instead of a simulated calendar.",
      ],
      questions: [
        "How do you keep a 299-spec asset registry looking like one world?",
        "The visual language is derived from another product's design system — how do you think about that?",
      ],
      bestFit: [
        "Teams shipping generative content pipelines who need coherence, not just throughput.",
        "Games, narrative systems, or any product where content volume is the design problem.",
      ],
    },
      pricewise: {
        proves:
          "This case proves I can separate 'looks finished' from 'actually runs' on a codebase an AI wrote, and leave scripts behind that let someone else reach the same conclusions.",
        inspect: [
          "Why a green build, a clean type-check and a passing suite were treated as claims rather than as evidence.",
          "Which defect I introduced myself, and how it was found.",
          "Why one known mismatch was deliberately left unfixed and pinned by a test.",
        ],
        questions: [
          "The AI wrote the code. What was left for you to do?",
          "The scope grew from a feature plan you now judge to be AI-generated, and never came back down. What would you check before accepting a plan like that again?",
        ],
        bestFit: [
          "Teams shipping AI-written code who need someone asking whether it actually runs.",
          "Teams that want verification written as scripts someone else can re-run.",
        ],
      },
      gapmapper: {
        proves:
          "This case proves I will kill my own working prototype when it makes a promise the evidence cannot support, and turn the resulting position into system requirements rather than a paragraph.",
        inspect: [
          "Why the route prototype stays in the portfolio even though the direction was abandoned.",
          "Why the reader changed before any screen did.",
          "Why perception signals and objective indicators are never merged into one score.",
        ],
        questions: [
          "You built it and then argued against it. Walk me through that call.",
          "What did critique tell you that your own prototype could not?",
        ],
        bestFit: [
          "Teams working on civic, safety or trust-and-safety products.",
          "Roles where knowing what a system may not claim matters as much as what it does.",
        ],
      },
      rules: {
        proves:
          "This case proves I can force a requirement everyone agrees with into a rule someone can build to and argue with, and state where that rule stops holding.",
        inspect: [
          "How 'safer' became routing weights, a 150–250 m warning lead and a 48 px tap-target floor.",
          "Why warnings are written as behaviour rather than as direction.",
          "Which figures come from the cited paper rather than from me, and where that is said.",
        ],
        questions: [
          "How do you turn a soft requirement into something a team can build?",
          "Where does your own specification stop being supported by evidence?",
        ],
        bestFit: [
          "Teams that need specs precise enough to hand to engineering without a second conversation.",
          "Design systems and standards work, where a rule has to survive being applied by other people.",
        ],
      },
    ...recentCaseInterviewScans.en,
    ...lamplightScan.en,
    ...autofillScan.en,
    ...walkieScan.en,
    ...fencepostScan.en,
  },
  zh: {
    connect: {
      proves:
        "这个案例证明我能把研究做成「有可能证明自己错」的样子，再把活下来的结论落进一套 24 个屏共用的组件系统里。",
      inspect: [
        "哪几条假设没过自己事先写好的门槛，以及后来换成了什么。",
        "十月为什么选择回到纸上重画，而不是去补那个原型。",
        "十一月那条任务链证明了什么，又有什么是它证明不了的。",
      ],
      questions: [
        "研究杀掉了你哪些假设？你是怎么发现的？",
        "你们是五个人。这里面哪些部分是你的？",
      ],
      bestFit: [
        "期待设计师既做研究也能动手写的产品团队。",
        "研究必须在真实交付期限下活下来的岗位。",
      ],
    },
    spectra: {
      proves:
        "这个案例证明我能把无障碍准则做成一个真能用的工具，并让它在我控制不了的页面上继续可用。",
      inspect: [
        "为什么字体打包进扩展，而不是从 CDN 取。",
        "为什么设置只有全局一套，这让读者付出了什么。",
        "注入的样式在哪里会输给网页自己的 CSS，以及这件事逼出了什么改动。",
      ],
      questions: [
        "怎么让注入的样式赢过网站，又不把布局撑坏？",
        "如果把它交到一个真实读者手上，你会先看什么？",
      ],
      bestFit: [
        "希望设计师能顺手把工具做出来的无障碍团队。",
        "设计工作要一路做到浏览器里、而不是停在稿子上的产品团队。",
      ],
    },
    maze: {
      proves:
        "这个案例证明我不只是写规格，而是真的做得出来：感测、固件、实体反馈与浏览器控制界面被接成同一个闭环。",
      inspect: [
        "为什么电击陷阱最后变成了可穿戴手指套里的震动。",
        "传感器防抖如何把一次球的经过收敛成刚好一个游戏事件。",
        "Web Serial 控制台如何让 demo 模式忠于固件规则。",
      ],
      questions: [
        "硬件约束在哪些地方改变了交互本身，而不只是改变了实现方式？",
        "你会记录什么数据，才能知道玩家真正依赖哪一种反馈通道？",
      ],
      bestFit: [
        "Design technologist、creative technologist 或原型开发岗位。",
        "做实体产品、装置或软硬件接口的团队。",
      ],
    },
    hoop: {
      proves:
        "这个案例说明我能用成文规则搭生成式生产，并分清脚本查得了什么、什么必须靠人看。内容持续落地的同时，一个系统很重的实现也保持正确。",
      inspect: [
        "为什么美术圣经按画布尺寸分成三份。",
        "为什么队徽要并排摆开，才看得出趋同。",
        "为什么一段生涯跑在 146 个离散节点上，而不是模拟日历。",
      ],
      questions: [
        "299 条资产规格的登记表，你怎么让它们看起来还是同一个世界？",
        "这套视觉语言是从别人的产品设计系统反推来的：你怎么看这件事？",
      ],
      bestFit: [
        "在做生成式内容管线、要的是一致性而不只是产能的团队。",
        "游戏、叙事系统，或任何「内容体量本身就是设计问题」的产品。",
      ],
    },
      pricewise: {
        proves:
          "这个案例证明：在一份 AI 写的代码上，我能把「看起来完成」和「真的能用」分开验，并且留下可复现的脚本，换一个人照着跑能得到同样的结论。",
        inspect: [
          "为什么构建通过、类型检查零错误、测试全绿被当成待验证的话，而不是证据。",
          "哪一处缺陷是我自己引入的，以及它是怎么被查出来的。",
          "为什么有一处已知错配是刻意不修、并用测试钉住的。",
        ],
        questions: [
          "代码是 AI 写的，那你做了什么？",
          "范围跟着一份功能规划长大，你事后判断那份规划是 AI 生成的，范围后来也一直没有缩回去。再接一份这样的规划，你会先查什么？",
        ],
        bestFit: [
          "在用 AI 写代码、需要有人追问「它是不是真的在跑」的团队。",
          "希望验证写成脚本、换个人也能重跑的团队。",
        ],
      },
      gapmapper: {
        proves:
          "这个案例证明：当我自己做出来的原型给出了证据撑不起的承诺时，我会杀掉它；并且能把由此产生的立场写成系统要求，而不是留成报告里的一段话。",
        inspect: [
          "方向已经放弃了，为什么那版路线原型还留在作品集里。",
          "为什么改的第一件事是读者，不是界面。",
          "为什么感知信号和客观指标从不合成一个分数。",
        ],
        questions: [
          "你把它做出来，又主张放弃它。说说这个决定。",
          "评图告诉了你什么，是你自己的原型说不出来的？",
        ],
        bestFit: [
          "做公共服务、安全类或信任与安全方向产品的团队。",
          "「一个系统不能声称什么」和「它能做什么」同样要紧的岗位。",
        ],
      },
      rules: {
        proves:
          "这个案例证明：我能把一句所有人都同意的要求，逼成一条能照着施工、也能被反驳的规则，并且说得清它在哪里失效。",
        inspect: [
          "「更安全」是怎么变成路线权重、150–250 m 提前量和 48px 点击区下限的。",
          "为什么提示写的是行为，不是方向。",
          "哪些数字出自所引论文而不是我的实验，以及这句话写在哪里。",
        ],
        questions: [
          "一句软要求，你怎么把它变成团队能施工的东西？",
          "你自己写的这份规格，在哪里就没有证据支撑了？",
        ],
        bestFit: [
          "需要规格精确到可以直接交给工程、不用再谈一轮的团队。",
          "设计系统与规范类工作：规则得经得起别人拿去用。",
        ],
      },
    ...recentCaseInterviewScans.zh,
    ...lamplightScan.zh,
    ...autofillScan.zh,
    ...walkieScan.zh,
    ...fencepostScan.zh,
  },
};

const sharedCaseReaderSections: CaseReaderSection[] = [
  {
    id: "snapshot",
    label: "Snapshot",
    description: "Problem, role, evidence, outcome.",
  },
  {
    id: "interviewer-scan",
    label: "2-minute scan",
    description: "The fastest proof route for interviewers.",
  },
  {
    id: "artifact",
    label: "Artifact",
    description: "The visual case artifact.",
  },
  {
    id: "decision-timeline",
    label: "Decisions",
    description: "Choices, evidence, trade-offs, and impact.",
  },
  {
    id: "evidence-board",
    label: "Evidence",
    description: "Methods, samples, findings, and implications.",
  },
  {
    id: "iteration-gallery",
    label: "Iterations",
    description: "How the design changed after testing.",
  },
  {
    id: "outcome-limits",
    label: "Limits",
    description: "Measured results and what still needs validation.",
  },
  {
    id: "interview-takeaway",
    label: "Takeaway",
    description: "The hiring signal this case supports.",
  },
  {
    id: "long-form",
    label: "Deep read",
    description: "The complete case narrative.",
  },
  {
    id: "related-projects",
    label: "Continue",
    description: "Adjacent cases to inspect next.",
  },
];

const sharedCaseReaderModes: CaseReaderMode[] = [
  {
    id: "scan",
    label: "2-minute scan",
    description: "Check relevance quickly.",
    anchorIds: ["snapshot", "interviewer-scan", "artifact", "interview-takeaway"],
  },
  {
    id: "manager",
    label: "Design manager review",
    description: "Inspect decisions, iteration, and limits.",
    anchorIds: [
      "snapshot",
      "decision-timeline",
      "iteration-gallery",
      "outcome-limits",
      "interview-takeaway",
    ],
  },
  {
    id: "research",
    label: "Research evidence review",
    description: "Trace method to product direction.",
    anchorIds: ["snapshot", "evidence-board", "outcome-limits", "long-form"],
  },
  {
    id: "interview",
    label: "Interview prep",
    description: "Find questions and the evidence behind them.",
    anchorIds: ["interviewer-scan", "decision-timeline", "evidence-board", "interview-takeaway"],
  },
];

const caseReaderSections: Record<ProofLocale, CaseReaderSection[]> = {
  en: sharedCaseReaderSections,
  zh: sharedCaseReaderSections,
};

const caseReaderModes: Record<ProofLocale, CaseReaderMode[]> = {
  en: sharedCaseReaderModes,
  zh: sharedCaseReaderModes,
};

const sharedCaseReaderPrompts: Record<ProjectEvidenceSlug, CaseInterviewPrompt[]> = {
  connect: [
    {
      question: "Why write a pass mark for each hypothesis before running any interviews?",
      reason: "Tests whether the research was set up to be able to fail, or only to confirm.",
      anchorId: "decision-timeline",
    },
    {
      question: "Which assumption did the interviews kill, and what did you do about it?",
      reason: "Separates research that changed the product from research that decorated it.",
      anchorId: "evidence-board",
    },
    {
      question: "The MVP runs on mock data. What does that mean you have not proven?",
      reason: "Checks whether the limits of a course project are stated or glossed over.",
      anchorId: "outcome-limits",
    },
  ],
  spectra: [
    {
      question: "Why a fixed-value dyslexia mode and not adjustable spacing controls?",
      reason: "Shows whether an accessibility decision starts from a stated guideline and a scope, not from a feature list.",
      anchorId: "decision-timeline",
    },
    {
      question: "Why bundle the font instead of loading it from a CDN?",
      reason: "Tests whether a privacy gain was weighed against its package-size and update cost.",
      anchorId: "evidence-board",
    },
    {
      question: "What would testing need to prove before this ships?",
      reason: "Separates what manual cross-site checks show from what only readers can tell you.",
      anchorId: "outcome-limits",
    },
  ],
  maze: [
    {
      question: "Why did the trap become vibration instead of the original electric shock?",
      reason: "Tests whether safety and consent were treated as design constraints, not afterthoughts.",
      anchorId: "decision-timeline",
    },
    {
      question: "How did you make one ball pass produce exactly one game event?",
      reason: "Checks whether sensor timing is understood as an interaction problem, not just wiring.",
      anchorId: "evidence-board",
    },
    {
      question: "What would you instrument before calling this more than an exhibition unit?",
      reason: "Keeps a working build honest about what was observed versus measured.",
      anchorId: "outcome-limits",
    },
  ],
  hoop: [
    {
      question: "Why write art bibles at all, when they landed in the same commit as the first images?",
      reason: "Tests whether coherence was designed into the process or patched in afterwards.",
      anchorId: "decision-timeline",
    },
    {
      question: "What did the rejected-style list catch that a positive description would not?",
      reason: "Checks whether the rejected list is a real constraint or a restatement of taste.",
      anchorId: "evidence-board",
    },
    {
      question: "It says DEMO v0.6 and has no player research. What is it evidence of?",
      reason: "Keeps a large, polished build honest about what volume alone proves.",
      anchorId: "outcome-limits",
    },
  ],
  pricewise: [
    {
      question: "The build was green. What made you go looking anyway?",
      reason: "Tests whether 'it compiles and renders' is treated as evidence or as a claim.",
      anchorId: "decision-timeline",
    },
    {
      question: "Which defect was yours, and how did you find it?",
      reason: "Checks whether the verification method catches its own author, not only the AI.",
      anchorId: "evidence-board",
    },
    {
      question: "You left one known mismatch unfixed. Defend that.",
      reason: "Separates 'fixed the number' from 'understood which failure is worse for the user'.",
      anchorId: "outcome-limits",
    },
  ],
  gapmapper: [
    {
      question: "You built the prototype and then argued for dropping it. Why?",
      reason: "Tests whether the candidate can retire their own work when the claim outruns the evidence.",
      anchorId: "decision-timeline",
    },
    {
      question: "Why are perception signals and objective indicators never merged?",
      reason: "Gets at whether the evidence model was a design decision or a default.",
      anchorId: "evidence-board",
    },
    {
      question: "What does the final proposal still fail to answer?",
      reason: "Checks whether the reframing is understood as a limit rather than as a solution.",
      anchorId: "outcome-limits",
    },
  ],
  rules: [
    {
      question: "How did 'make cycling safer' become something a team could build?",
      reason: "Tests the core move: turning a soft requirement into a threshold that can be argued with.",
      anchorId: "decision-timeline",
    },
    {
      question: "Why is the button 'See safer routes' rather than 'safest'?",
      reason: "Checks whether copy is treated as a claim about evidence.",
      anchorId: "iteration-gallery",
    },
    {
      question: "Which numbers in the guide are yours, and which are not?",
      reason: "Separates translating a source faithfully from borrowing its authority.",
      anchorId: "outcome-limits",
    },
  ],
  ...recentCaseReaderPrompts,
  ...lamplightPrompts,
  ...autofillPrompts,
  ...walkiePrompts,
  ...fencepostPrompts,
};

const caseReaderPrompts: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseInterviewPrompt[]>> = {
  en: sharedCaseReaderPrompts,
  zh: sharedCaseReaderPrompts,
};


export function getCaseSummary(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseSummary {
  return caseSummaries[locale][slug];
}

export function getCaseDepth(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseDepth {
  return caseDepth[locale][slug];
}

export function getCaseInterviewScan(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseInterviewScan {
  return caseInterviewScans[locale][slug];
}

export function getCaseReaderGuide(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseReaderGuide {
  return {
    sections: caseReaderSections[locale],
    modes: caseReaderModes[locale],
    prompts: caseReaderPrompts[locale][slug],
  };
}
