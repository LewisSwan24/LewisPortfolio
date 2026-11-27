import type {
  CapabilityPillar,
  CareerSnapshot,
  HiringConversion,
  HiringPath,
  ProjectEvidence,
  ProofLocale,
  RoleFit,
} from "./types";
import { isUnlistedProject, linksToUnlistedProject } from "../project-routes";


const careerSnapshots: Record<ProofLocale, CareerSnapshot> = {
  en: {
    headline: "Interaction designer who takes an idea all the way to something that runs.",
    summary:
      "I am looking for full-time graduate roles in interaction and product design, on teams that want a designer who can build, not only specify.",
    status: "UQ Master of Interaction Design candidate, Brisbane. Graduating November 2026; looking for full-time graduate roles.",
    stats: [
      {
        value: "5",
        label: "interaction tracks",
        detail:
          "Campus social IA, physical computing hardware, real-time command grammar, AI safety & verification, and generated visual systems.",
      },
      {
        value: "4",
        label: "research methods",
        detail: "Exploratory interviews, testable hypotheses, think-aloud usability, and public exhibition field observation.",
      },
      {
        value: "Live",
        label: "hardware & web prototypes",
        detail: "Interactive builds ranging from Web Serial firmware mazes and dual-boot wearables to deployed AI interfaces.",
      },
      {
        value: "2026",
        label: "career focus",
        detail: "Full-time graduate Interaction Design, UX/Product Design, and Design Technologist roles.",
      },
    ],
  },
  zh: {
    headline: "会把东西真的做出来的交互设计师，而不只是交一份稿。",
    summary:
      "我在找交互 / 产品设计的全职毕业生岗位，尤其适合希望设计师能自己把想法推到能跑的团队。",
    status: "昆士兰大学交互设计硕士在读，布里斯班。2026 年 11 月毕业，主要看全职毕业生岗位。",
    stats: [
      {
        value: "5",
        label: "交互研究与实作方向",
        detail:
          "校园社交信息架构、物理计算互动装置、高密度即时操作语法、AI 信任与安全边界、规模化视觉体系。",
      },
      {
        value: "4",
        label: "常用研究方法",
        detail: "探索式访谈、可证伪假设卡、出声思考可用性测试与公开展出实地观察。",
      },
      {
        value: "可运行",
        label: "软硬协同原型",
        detail: "从 Web Serial 硬件交互迷宫、双分区穿戴终端，到持续在线的 Web 交互系统。",
      },
      {
        value: "2026",
        label: "求职方向",
        detail: "全职毕业生交互设计、UX / 产品设计或设计技术交叉团队。",
      },
    ],
  },
};

const capabilityPillars: Record<ProofLocale, CapabilityPillar[]> = {
  en: [
    {
      id: "research-framing",
      title: "Human tension framing",
      summary: "I frame social friction, attention cost, and safety anxiety before writing interface rules.",
      proof: "On The Beat replaces profile-radar browsing with blind waves and mutual consent so neither stranger risks public rejection at a gig.",
      href: "/projects/onthebeat",
    },
    {
      id: "information-architecture",
      title: "Information architecture",
      summary: "I turn complex multi-state workflows into clear, glanceable mental models.",
      proof: "Lamplight Nook splits hundreds of scrolling agent stdout lines into a spatial café blackboard and a corner status monitor.",
      href: "/projects/lamplight",
    },
    {
      id: "accessibility",
      title: "Explicit refusal & legibility",
      summary: "I design non-color cues, polite friction, and clear human-control boundaries.",
      proof: "Resume Autofill separates deterministic fills, review items, and blank fields using stroke style, words, and icons—and stops before Submit.",
      href: "/projects/autofill",
    },
    {
      id: "ai-ux",
      title: "AI interaction & physical gates",
      summary: "I decide where automation stops and human physical authority takes over.",
      proof: "Walkie binds Claude Code tool approvals and pairing to physical M5StickS3 keys over AES-256-GCM transport rather than voice recognition.",
      href: "/projects/walkie",
    },
    {
      id: "prototyping-testing",
      title: "Rule grammar & verification",
      summary: "I build at the fidelity needed to test real constraints and state exact verification limits.",
      proof: "Grassland Iron Tide enforces one command grammar across five RTS missions with 430/430 tests and two-resolution browser playthroughs.",
      href: "/projects/grassland",
    },
  ],
  zh: [
    {
      id: "research-framing",
      title: "人文矛盾框定",
      summary: "在画界面之前，先把社交面子风险、注意力成本与安全焦虑拆解清楚。",
      proof: "On The Beat 放弃展示头像的附近人雷达，改用匿名挥手与双向点头机制，避免陌生人搭话时的当场拒斥尴尬。",
      href: "/projects/onthebeat",
    },
    {
      id: "information-architecture",
      title: "信息架构与空间秩序",
      summary: "把复杂异步状态整理成一眼可瞥视的心智模型。",
      proof: "Lamplight Nook 把几百行滚动 Agent 日志拆成黑板任务清单、店员分工与桌角安静状态小窗。",
      href: "/projects/lamplight",
    },
    {
      id: "accessibility",
      title: "非色彩区分与克制阻力",
      summary: "让状态区分不依赖单色，把拒绝边界与人类终审权摆在明处。",
      proof: "Resume Autofill 用实线/虚线/粗实线边框配文字标签区分三态置信度，并硬性把最终提交留给人手点击。",
      href: "/projects/autofill",
    },
    {
      id: "ai-ux",
      title: "AI 交互与实体门控",
      summary: "划清自动化停在哪里、人的物理确认从哪里接管。",
      proof: "Walkie 把 Claude Code 工具审批与配对锁死在 M5StickS3 实体按键上，拒绝嘈杂环境下的纯语音放行。",
      href: "/projects/walkie",
    },
    {
      id: "prototyping-testing",
      title: "规则语法与实作核验",
      summary: "用匹配真实约束的保真度做出可运行原型，并正面标出尚未验证的边界。",
      proof: "草原铁潮在五关 RTS 中坚持单一命令语法与存档恢复链，跑通 430/430 测试与双分辨率全流程通关。",
      href: "/projects/grassland",
    },
  ],
};

const projectEvidence: Record<ProofLocale, ProjectEvidence[]> = {
  en: [
    {
      slug: "connect",
      href: "/projects/connect",
      problemType: "A social platform for international students, researched and built over one semester",
      challenge: "UQ runs plenty of events for international students, and they still end up in the same circle. A one-off mixer produces an introduction, not a relationship.",
      methods: ["exploratory interviews", "falsifiable test cards", "think-aloud usability testing", "task-based usability testing", "component system design"],
      sample: "Course project, five-person team. 71 research and test sessions across three rounds between August and November 2025; my 14 sessions covered 9 participants, 4 of whom returned in a later round. 13 hypotheses carried a numeric pass mark set in advance, but no round recorded completion times or a fixed success criterion.",
      outcome: "A 19-screen mobile MVP built on a shared component system, reached through three research rounds and a mid-build return to paper, then carried on alone in January and deployed. Runs on mock data; the backend was written but never connected.",
      proves: "I can run research set up to disconfirm itself, and carry what survives into a component system that keeps two dozen screens reading as one product.",
    },
    {
      slug: "spectra",
      href: "/projects/spectra",
      problemType: "Reading accessibility, built as a browser extension",
      challenge: "Reading long pages is hard when the typeface, spacing, and contrast are fixed by whoever built the site.",
      methods: ["accessibility heuristics", "typographic tuning", "cross-site regression testing", "bilingual UI"],
      sample: "Self-directed build. Chrome extension: content-script style injection, a popup control panel, OpenDyslexic bundled locally, English and Simplified Chinese locale files, Jest unit tests. No user research yet.",
      outcome: "A working extension that rewrites type and spacing on any page from a single popup, with one set of settings that applies on every site.",
      proves: "I can turn accessibility guidance into a working tool, and keep it working across sites I do not control.",
    },
    {
      slug: "maze",
      href: "/projects/maze",
      problemType: "Physical computing and hardware-web interaction",
      challenge:
        "A physical maze is a passive object. Making it behave like a responsive multiplayer system meant wiring sensing, feedback, and game state together so players could see, hear, and feel every event.",
      methods: [
        "firmware state machines",
        "sensor debounce and cooldown tuning",
        "haptic feedback design",
        "Web Serial console",
        "regression tests for firmware/web parity",
      ],
      sample:
        "Built and exhibited. Arduino Mega, ten FC-51 IR sensors, TM1637 score and timer displays, relay-driven vibration motors, an RGB strip, servos, and a browser console; validated through group play at a public exhibition.",
      outcome:
        "A working system rather than a mockup: a ball passes a sensor, round state advances, and score, timer, haptics, lights, audio, and the browser console update together. Vibration replaced an electric-shock concept on safety grounds.",
      proves:
        "I can carry an interaction idea down to firmware and back up to a browser UI, and make calibration and safety calls on real hardware.",
    },
    {
      slug: "hoop",
      href: "/projects/hoop",
      problemType: "Generative production at volume, and narrative systems design",
      challenge:
        "A career-simulation RPG needs hundreds of art assets to read as one world. Generating them is cheap now; keeping them stylistically coherent is the actual problem.",
      methods: [
        "art bible",
        "prompt templates with negative prompts",
        "manual side-by-side review",
        "narrative systems design",
        "regression testing at scale",
      ],
      sample:
        "Publicly playable, self-labelled DEMO v0.6. 299 asset specs registered across six batches (original images not yet verified), a ten-chapter career on 146 nodes, and 1,975 tests over the career, contract, injury and save systems. No player research.",
      outcome:
        "A working career sim whose style rules are written down: three art bibles (committed with the first 38 images), an explicit rejected list checked by eye, and a registry that logs every batch. The one automated check reads the manifest, not the style.",
      proves:
        "I can set up generative production with written rules and a plain line between what a script checks and what a person must, and keep a systems-heavy build correct while content keeps landing.",
    },
    {
      slug: "pricewise",
      href: "/projects/pricewise",
      problemType: "Product design under AI-written implementation, and behavioural verification",
      challenge:
        "When an AI writes the code, a green build stops being evidence. The interface renders, types check, tests pass — and none of that says whether the feature executes.",
      methods: [
        "spec-first delivery",
        "live endpoint probing",
        "direct database inspection",
        "regression test authoring",
      ],
      sample:
        "A deployed app with 109 API routes and 36 page routes, 311 Vitest tests, 65 products across Coles, Woolworths and Aldi. Zero registered users; all pricing is simulated.",
      outcome:
        "Four classes of defect that had passed build, type-check and the full suite, plus a 96-commit history (to 13 August 2026) that records how the scope grew, including 5,884 lines in one commit, and that it never came back down.",
      proves:
        "I can separate 'looks finished' from 'actually runs' on a codebase an AI wrote, and leave scripts behind that let someone else reach the same conclusions.",
    },
    {
      slug: "gapmapper",
      href: "/projects/gapmapper",
      problemType: "Public-space safety, and the boundary of what evidence may claim",
      challenge:
        "An interface that recommends a safer route claims an authority it has not earned. It cannot guarantee safety, and the better it looks, the more convincing that unearned promise becomes.",
      methods: [
        "semi-structured interviews",
        "literature-checked assumptions",
        "critique-driven repositioning",
        "evidence-model design",
        "policy-constraint writing",
      ],
      sample:
        "18 interviews run by a team of six; I ran and coded numbers 10, 11 and 12. Six prototype screens, each passed through four questions about visibility, concealment, expected actor and implied certainty. Never tested with planning staff.",
      outcome:
        "Three interlocking deliverables — a report that sets the claim, a one-page brief that turns it into system requirements, and a prototype that walks those requirements through a planning flow — with perception and objective indicators kept side by side and never merged into a score.",
      proves:
        "I will retire my own working prototype when it makes a promise the evidence cannot support, and turn the resulting position into system requirements rather than a paragraph.",
    },
    {
      slug: "rules",
      href: "/projects/rules",
      problemType: "Specification writing, and translating sources into buildable constraints",
      challenge:
        "'Make cycling safer' and 'warn people in time' are sentences everyone agrees with and nobody can build to. Neither can be argued against, which is what makes them useless as requirements.",
      methods: [
        "requirement-to-threshold translation",
        "design system specification",
        "AI usage auditing",
        "think-aloud walkthrough",
        "peer-reviewed source translation",
      ],
      sample:
        "Two coursework briefs: a cycling route app where I was Lead Developer, and an individual guide translating one 2025 peer-reviewed paper. Testing reached think-aloud walkthrough; the proposal drafts' self-check claims 6 of 6, which is a self-check rather than external validation.",
      outcome:
        "The proposal drafts, mostly written by AI, turned safety into routing weights, a 150–250 m warning lead and a 48 px tap-target floor; the paper became three independent trigger conditions with their own copy templates and thresholds.",
      proves:
        "I can force a requirement everyone agrees with into a rule someone can build to and argue with, and state plainly where that rule stops holding.",
    },
    {
      slug: "grassland",
      href: "/projects/grassland",
      problemType: "Complex interaction in a real-time system",
      challenge:
        "A real-time strategy game gives the player many units and commands on a running clock. If missions invent their own controls, or failure leaves the screen and the mission state disagreeing, nothing stays predictable.",
      methods: [
        "interaction grammar",
        "information hierarchy on a fixed camera",
        "checkpoint and save design",
        "two-resolution browser acceptance",
      ],
      sample:
        "Solo, with AI tools assisting the code, copy and assets. Five missions; 430/430 tests in the RC audit record; a full playthrough at 1280×720 and 1920×1080; an asset gate over 75 registered assets. No outside playtests.",
      outcome:
        "Chapter one plays end to end in a desktop browser, with one command grammar across all five missions and failure restored from one save chain.",
      proves:
        "I can design the rules of a real-time interaction system and write them so that tests and browser runs can check them.",
    },
    {
      slug: "onthebeat",
      href: "/projects/onthebeat",
      problemType: "Connected hardware built with AI tools",
      challenge:
        "At a gig, two strangers who want to talk have no low-stakes way to start, and an app that makes them stare at a phone works against the point.",
      methods: [
        "requirement setting",
        "AI output review",
        "pairing on real hardware",
        "two-sided consent flow",
      ],
      sample:
        "Individual version of coursework; the three cards come from a teammate's prototype and Claude Code wrote the code. Two real wristbands paired through a cloud relay on 25 September 2026. No participant testing.",
      outcome:
        "A phone app, two wristbands and an always-on relay that run without a laptop; names appear only after both people agree.",
      proves:
        "I can steer AI tools to a working connected system by setting the requirements and sending back output that only looks finished.",
    },
    {
      slug: "lamplight",
      href: "/projects/lamplight",
      problemType: "An interface for a long-running AI agent",
      challenge:
        "A long-running AI task shows up as a scrolling log: hard to tell who is working, how far the plan has got, or whether it is waiting for you.",
      methods: ["metaphor-led interface design", "event-to-behaviour rules", "human-in-the-loop decision cards"],
      sample:
        "Solo; Claude Code wrote the code. A Windows app on the Claude Agent SDK, 1.0 on 5 November 2026, used day to day by me. No user testing; installer unsigned.",
      outcome:
        "A café crew that plays out a real Claude task, with the plan on a blackboard and risky steps behind a card that defaults to 'not now'.",
      proves:
        "I can turn the state of a long AI task into something a person reads at a glance, and keep them in charge of what is risky.",
    },
    {
      slug: "autofill",
      href: "/projects/autofill",
      problemType: "Automation that acts in someone's name",
      challenge:
        "Applying for graduate jobs means typing one resume into system after system; a tool that fills forms in your name has to be trusted not to guess, submit or leak.",
      methods: ["rules for uncertainty", "human-in-the-loop submission", "local-first privacy design"],
      sample:
        "Solo; Claude Code wrote the code. A Chrome extension and an Android app, used on my own applications. Accuracy measured only on synthetic test forms; no other users on record.",
      outcome:
        "A local-first autofill that leaves unsure fields to you, stops before the final submit and keeps the resume on the device.",
      proves:
        "I can set the rules for a tool that acts on someone's behalf, and make each rule visible on screen.",
    },
    {
      slug: "walkie",
      href: "/projects/walkie",
      problemType: "Physical voice & approval remote for an AI coding agent",
      challenge:
        "Directing Claude Code from the wrist requires keeping tool approvals physical, cloud relays end-to-end encrypted, and dual-boot flashing safe.",
      methods: ["dual-boot M5StickS3 firmware", "AES-256-GCM sealed link", "hardware-in-the-loop gate scripts"],
      sample:
        "Solo; AI coding tools assisted implementation. Verified via g++ host tests plus three on-device/relay gates (gate-h, gate-p5, gate-l); no external users or wrist photos yet.",
      outcome:
        "A working wrist voice remote with USB priority, Fly.io sealed relay fallback, and physical tool-permission approvals.",
      proves:
        "I can compress autonomous AI agent workflows into tiny physical hardware with explicit security and confirmation boundaries.",
    },
    {
      slug: "fencepost",
      href: "/projects/fencepost",
      problemType: "Community wildlife AI storyboard with strict access invariants",
      challenge:
        "Co-creating neighbourhood possum storyboards requires revocable QR permissions, zero EXIF storage, and ensuring revoked grants immediately cut off AI context.",
      methods: ["three-role AI safety proxy", "431 offline access-invariant tests", "29 red-line safety checks"],
      sample:
        "Live course deployment (fencepost.lewisdong.com + Turso libSQL). 431 offline unit tests + 29 red-line prompt cases + live deploy route probe; open signup stays enabled for course evaluation.",
      outcome:
        "A deployed full-stack storyboard and Python AI proxy where soft-deletes and revoked grants remove entries on the very next model call.",
      proves:
        "I treat AI trust and privacy as verifiable data-layer invariants rather than prompt-only promises.",
    },
  ],
  zh: [
    {
      slug: "connect",
      href: "/projects/connect",
      problemType: "一个面向国际学生的社交平台，一学期内做完研究并做出来",
      challenge: "UQ 给国际学生办的活动不少，他们还是留在同一个圈子里。一次性的迎新派对制造的是认识，不是关系。",
      methods: ["探索式访谈", "可证伪的假设卡", "出声思考可用性测试", "任务式可用性测试", "组件系统设计"],
      sample: "课程项目，五人团队。2025 年 8 月至 11 月三轮共 71 份研究与测试记录；我那 14 场来自 9 位受访者，其中 4 位跨轮回访。13 条假设都带着事先定好的数字门槛，但没有任何一轮记录过完成时间或成功标准。",
      outcome: "一个 19 屏、建立在共享组件系统上的移动端 MVP，经过三轮研究和一次开发中途回到纸面的重画；课程结束后我一个人接着做，并部署上线。跑在 mock 数据上；后端写了，但从未接上。",
      proves: "证明我能把研究做成会否定自己的样子，再把活下来的结论落进一套组件系统，让二十多个屏读起来仍然是同一个产品。",
    },
    {
      slug: "spectra",
      href: "/projects/spectra",
      problemType: "阅读无障碍，做成浏览器扩展",
      challenge: "网页的字体、行距和对比度由建站的人决定，读起来吃力的人没有调整余地。",
      methods: ["无障碍准则应用", "字体与间距调校", "跨站点回归测试", "中英双语界面"],
      sample: "自主开发。Chrome 扩展：内容脚本注入样式、弹窗控制面板、本地打包 OpenDyslexic 字体、中英双语语系文件、Jest 单元测试。尚未做过用户研究。",
      outcome: "一个能用的扩展：从一个扩展弹窗就能改写任意页面的字体与间距，一套设置对所有网站生效。",
      proves: "证明我能把无障碍准则做成真正能用的工具，并让这个扩展在我控制不了的网站上持续可用。",
    },
    {
      slug: "maze",
      href: "/projects/maze",
      problemType: "物理计算与软硬件交互",
      challenge:
        "实体迷宫本身是被动的。要让这座迷宫像一个会回应的多人系统，必须把感测、反馈和游戏状态接在一起，让玩家看得见、听得见、也感觉得到每一个事件。",
      methods: ["固件状态机", "传感器防抖与冷却调校", "触觉反馈设计", "Web Serial 控制台", "固件与网页行为一致性的回归测试"],
      sample:
        "已完成搭建并展出。Arduino Mega、10 个 FC-51 红外传感器、TM1637 计分与计时显示、继电器驱动的震动马达、RGB 灯带、舵机，以及一个浏览器控制台；在公开展览的多人游玩中验证。",
      outcome:
        "这是一套真的能跑的系统，不是效果图：球经过传感器，回合状态推进，计分、计时、震动、灯光、音效与浏览器控制台同步更新。出于安全考虑，用震动取代了原本的电击方案。",
      proves:
        "证明我能把一个交互想法一路做到固件，再接回浏览器界面，并在真实硬件上做校准与安全取舍。",
    },
    {
      slug: "hoop",
      href: "/projects/hoop",
      problemType: "大体量生成式生产与叙事系统设计",
      challenge:
        "一个生涯模拟 RPG 需要几百张美术资产，才撑得起「这是同一个世界」。现在生成这些资产很便宜，难的是让这么多张保持同一种风格。",
      methods: ["美术圣经", "带负面提示词的提示词模板", "人工并排审查", "叙事系统设计", "大规模回归测试"],
      sample:
        "线上公开可玩，游戏自标 DEMO v0.6。六个批次登记了 299 条资产规格（原图尚未核实）、十章生涯跑在 146 个节点上、覆盖生涯与合同与伤病与存档系统的 1975 个测试。没有做过玩家研究。",
      outcome:
        "一个真的能玩的生涯模拟，风格规则写成了文档：三份美术圣经（和首批 38 张图一起提交），加一张靠人眼对照的拒绝清单。资产按批次登记；唯一的自动检查读的是资产清单，不查风格。",
      proves: "证明我能用成文规则搭生成式生产，分清脚本查得了什么、什么必须靠人看。内容持续落地时，实现也保持正确。",
    },
    {
      slug: "pricewise",
      href: "/projects/pricewise",
      problemType: "AI 实现下的产品设计与行为验证",
      challenge:
        "代码交给 AI 写之后，构建通过就不再是证据了。界面渲染出来了、类型检查零错误、测试全绿，这三件事都不能证明功能真的在执行。",
      methods: ["规格先行", "打真实接口验行为", "直接查数据库", "补写回归测试"],
      sample:
        "一个线上应用：109 条 API 路由、36 条页面路由，311 个 Vitest 测试，澳洲三大连锁超市 Coles / Woolworths / Aldi 共 65 件商品。注册用户是 0，价格全部为拟真数据。",
      outcome:
        "四类同时通过构建、类型检查与整套测试的缺陷。另有 96 个提交的完整记录（截至 2026 年 8 月 13 日）：范围怎么变大、单次提交 5884 行、之后没有缩回去，都查得到。",
      proves:
        "在一份 AI 写的代码上，我能把「看起来完成」和「真的能用」分开验，并且留下可复现的脚本，换一个人照着跑能得到同样的结论。",
    },
    {
      slug: "gapmapper",
      href: "/projects/gapmapper",
      problemType: "公共空间安全，以及证据能声称什么的边界",
      challenge:
        "一个建议「更安全路线」的界面，获得了一种自己没有挣来的权威。这样的界面保证不了安全，而做得越像样，那个兑现不了的承诺就越有说服力。",
      methods: ["半结构式访谈", "拿文献检验假设", "评图驱动的方向转变", "证据模型设计", "把伦理立场写成系统要求"],
      sample:
        "团队 18 个访谈、6 人完成，第 10、11、12 个由我做并编码。原型六屏，每屏都过同样四个问题：让什么可见、把什么藏起来、期待谁去行动、暗示了多高的确定性。未经真实规划人员测试。",
      outcome:
        "三件互相咬合的交付物：报告定主张、一页 brief 把主张变成系统要求、原型把这些要求走成一条能通的规划流程；感知与客观指标在屏幕上始终并排，从不合成一个分数。",
      proves:
        "自己做出来的原型一旦给出了证据撑不起的承诺，我会亲手停掉；并且能把由此产生的立场写成系统要求，而不是留成一段话。",
    },
    {
      slug: "rules",
      href: "/projects/rules",
      problemType: "写规格，以及把文献翻译成能施工的约束",
      challenge:
        "「让骑车更安全」「预警有效」这类话，写在文档里谁都同意，但没有一句拿得去施工，也没有谁能反驳，而正因为反驳不了，这些话当成要求毫无用处。",
      methods: ["把要求逼成阈值", "设计系统规格", "AI 使用标注册", "出声思考走查", "把同行评审论文翻译成规范"],
      sample:
        "同一门课的两份作业：一个自行车路线 App（我是 Lead Developer），一份把 2025 年某篇同行评审论文翻译成规范的个人作业。测试做到出声思考走查这一层；草稿的自查清单写着 6/6 通过，那是自查不是外部验证。",
      outcome:
        "提案草稿把安全写成了路线权重、150–250 m 的提示提前量和 48px 的点击区下限，草稿多由 AI 起草。论文变成了三条各配文案模板与阈值的独立触发条件。",
      proves:
        "我能把一句所有人都同意的要求，逼成一条能照着施工、也能让人指着说「这条不对」的规则，并且说得清这条规则在哪里失效。",
    },
    {
      slug: "grassland",
      href: "/projects/grassland",
      problemType: "即时系统里的复杂交互",
      challenge: "即时战略游戏在不停走的时钟上交给玩家很多单位和命令。每关各造一套操作，或者失败后画面和任务状态对不上，就什么都不可预测了。",
      methods: ["交互语法", "固定镜头下的信息层级", "检查点与存档设计", "双分辨率浏览器验收"],
      sample:
        "独立完成，代码、文案与资产由 AI 工具辅助生产。五关；RC 审计记录中 430 / 430 测试通过；1280×720 与 1920×1080 两种分辨率完整通关；资产闸门覆盖 75 项登记资产。没有外部试玩。",
      outcome: "第一章能在桌面浏览器里连续通关，五关共用一套命令语法，失败后从同一条存档链恢复。",
      proves: "我能为即时交互系统定规则，并把规则写成测试和浏览器都能核对的样子。",
    },
    {
      slug: "onthebeat",
      href: "/projects/onthebeat",
      problemType: "借助 AI 工具做出来的联网硬件",
      challenge: "演出现场，两个想说话的陌生人缺一个没有压力的开头；一个让人盯着手机的 App 反而违背初衷。",
      methods: ["需求设定", "AI 输出审查", "真机硬件配对", "双方同意的流程"],
      sample:
        "课程作业的个人版本；三张卡出自组员的原型，代码由 Claude Code 编写。2026 年 9 月 25 日两支真手环经云端 relay 配对成功。没有参与者测试。",
      outcome: "手机 App、两支手环和一台常开的 relay，不需要笔电就能运转；双方都同意后才显示名字。",
      proves: "我能靠定需求、把只是看起来做完的输出打回去，借 AI 工具做出一套能运行的联网系统。",
    },
    {
      slug: "lamplight",
      href: "/projects/lamplight",
      problemType: "给长时间运行的 AI 代理做的界面",
      challenge: "跑很久的 AI 任务只是一屏滚动的日志：谁在做事、计划做到哪、是不是在等你，都很难看出来。",
      methods: ["以比喻带动的界面设计", "事件到角色行为的规则", "人在回路的决定卡"],
      sample: "独立完成，代码由 Claude Code 编写。基于 Claude Agent SDK 的 Windows 应用，2026 年 11 月 5 日发布 1.0，我日常在用。没有用户测试，安装包未签名。",
      outcome: "一组咖啡馆店员演出真实的 Claude 任务，计划写在黑板上，风险步骤挡在默认「先不要」的卡片后面。",
      proves: "我能把 AI 长任务的状态做成一眼看得懂的东西，并让人掌握有风险的步骤。",
    },
    {
      slug: "autofill",
      href: "/projects/autofill",
      problemType: "以别人名义行事的自动化",
      challenge: "投应届岗位要把同一份简历在一个又一个系统里重填；以你的名义填表的工具，要让人放心它不猜、不提交、不外传。",
      methods: ["处理不确定的规则", "人在回路的提交", "本地优先的隐私设计"],
      sample: "独立完成，代码由 Claude Code 编写。Chrome 扩展加 Android App，我投递时用过。准确率只在合成测试表单上量过；没有其他使用者的记录。",
      outcome: "一个本地优先的自动填表工具：拿不准的留给你，在最终提交前停下，简历不离开设备。",
      proves: "我能为代替用户行事的工具定规则，并让每条规则显示在屏幕上。",
    },
    {
      slug: "walkie",
      href: "/projects/walkie",
      problemType: "面向编码 Agent 的手腕语音与实体审批终端",
      challenge: "在手腕上指挥 Claude Code，要让实体按键掌管高风险审批，云中继端到端加密，双启动刷机也不能误擦同机应用。",
      methods: ["M5StickS3 双启动固件", "AES-256-GCM 加密链路", "真机门禁测试脚本"],
      sample: "独立负责（AI 编码工具辅助实现）。通过宿主机 g++ 单测与三组真机/中继门禁（gate-h / gate-p5 / gate-l）；尚无外部用户与实拍照片。",
      outcome: "交付可运行的手腕语音遥控器，具备 USB 优先、Fly.io 加密中继兜底与实体工具审批。",
      proves: "证明我能把自主 AI Agent 工作流压缩进微型硬件，并落出清晰的安全与物理确认边界。",
    },
    {
      slug: "fencepost",
      href: "/projects/fencepost",
      problemType: "具备严格权限不变量的社区 AI 故事板",
      challenge: "居民共创负鼠故事板需要可吊销二维码权限、零 EXIF 入库，并确保权限吊销后 AI 上下文即刻截断。",
      methods: ["三角色 AI 安全代理", "431 项离线权限测试", "29 条红线安全评测"],
      sample: "线上课程部署（fencepost.lewisdong.com + Turso libSQL）。431 项离线单测 + 29 条红线用例 + 发布后路由探活；演示环境保持开放注册。",
      outcome: "上线全栈故事板与 Python AI 代理，任何软删或吊销均在下一次模型调用即刻生效。",
      proves: "证明我把 AI 信任与隐私做成可测试的数据层不变量，而非停留在提示词承诺。",
    },
  ],
};


const hiringConversions: Record<ProofLocale, HiringConversion> = {
  en: {
    hero: {
      headline: "An interaction and product designer who builds the thing, not just the deck.",
      subhead:
        "I take ambiguous product problems through research, information architecture, and inclusive interaction decisions — then use Claude Code and Codex to get them running, so what you review is a working prototype rather than a description of one.",
      status:
        "Graduating November 2026. Looking for full-time graduate UX, product, and design-technologist roles.",
    },
    signals: [
      {
        value: "6",
        label: "curated cases with structured tradeoffs",
        detail:
          "Walkie, Lamplight Nook, Resume Autofill, MazeRunners, On The Beat, and Grassland Iron Tide each document rejected alternatives and limits.",
      },
      {
        value: "4",
        label: "interactive simulators & demos",
        detail: "Hands-on wrist approval, default-safe risk triage, zero-guess autofill, and co-touch maze prototypes plus live web builds.",
      },
      {
        value: "3",
        label: "working hardware systems",
        detail: "MazeRunners exhibition unit, Walkie dual-boot wrist remote, and On The Beat paired gig wristbands.",
      },
      {
        value: "2026",
        label: "availability",
        detail: "Graduating November 2026. Open to graduate UX, Product Design, Interaction Design, and Design Engineering roles.",
      },
    ],
    proofRoutes: [
      {
        audience: "Design engineering / hardware UX",
        title: "Physical authority & tactile feedback loops",
        claim: "Best proof that hardware constraints shape my interaction rules, not just wiring.",
        evidence:
          "MazeRunners and Walkie tie IR sensing, dual-boot wrist buttons, and AES-256-GCM relays to explicit human commitment.",
        href: "/projects/walkie#decision-timeline",
      },
      {
        audience: "AI cognitive safety / product design",
        title: "Polite friction against Enter-key fatigue",
        claim:
          "Best proof that I design calm AI interfaces protecting user agency.",
        evidence:
          "Lamplight Nook turns agent logs into a café blackboard and locks risky card focus onto 'Not now' on file copies.",
        href: "/projects/lamplight#decision-timeline",
      },
      {
        audience: "AI trust & privacy autonomy",
        title: "Automation that refuses to guess or submit",
        claim:
          "Best proof that trust comes from stating what a tool refuses to do.",
        evidence:
          "Resume Autofill leaves ambiguous fields blank, keeps resumes local, and locks final Submit to the applicant.",
        href: "/projects/autofill#decision-timeline",
      },
      {
        audience: "Complex / real-time interaction",
        title: "One set of rules across a whole system",
        claim:
          "Best proof that I design interaction grammar that stays predictable under clock pressure.",
        evidence:
          "Grassland Iron Tide: one command grammar across five RTS missions, unified checkpoint chain, 430/430 tests.",
        href: "/projects/grassland#decision-timeline",
      },
      {
        audience: "Social hardware / AI output review",
        title: "Sending back deceptive AI polish",
        claim:
          "Best proof that I inspect generated prototypes against real-world social and device constraints.",
        evidence:
          "On The Beat caught mocked MEET data and laptop dependency, then paired two real wristbands via Fly.io.",
        href: "/projects/onthebeat#decision-timeline",
      },
    ],
    closingPrompt: {
      title: "Use this portfolio as a fast hiring screen.",
      body:
        "Start with the proof route that matches your opening, then use the resume and contact page to decide whether to start a conversation.",
      primaryAction: { label: "Contact Lewis", href: "/contact" },
      secondaryAction: { label: "Read the resume", href: "/resume" },
    },
  },
  zh: {
    hero: {
      headline: "会把东西真的做出来的交互设计师，而不只是交一份稿。",
      subhead:
        "我把模糊的产品问题走完研究、信息架构与包容性交互决策，再用 Claude Code 和 Codex 推到能跑，所以你看到的是一个能用的原型，而不是对原型的描述。",
      status:
        "2026 年 11 月毕业。主要看全职毕业生的交互、产品、design technologist 岗位。",
    },
    signals: [
      {
        value: "6",
        label: "件精选案例含完整取舍论证",
        detail:
          "Walkie、Lamplight Nook、Resume Autofill、MazeRunners、On The Beat 与草原铁潮均明确列出否决方案与诚实边界。",
      },
      {
        value: "4",
        label: "个可操作交互原型与演示",
        detail: "涵盖手腕实体审批、默认暂缓风险分流、零猜测填表与双人触控协同迷宫，以及线上可玩构建。",
      },
      {
        value: "3",
        label: "套实作硬件与穿戴系统",
        detail: "MazeRunners 展厅互动装置、Walkie 双系统手表遥控，以及 On The Beat 双手环配对链路。",
      },
      {
        value: "2026",
        label: "可入职时间",
        detail: "2026 年 11 月毕业。开放全职毕业生 UX、产品设计、交互设计与 Design Engineer 岗位。",
      },
    ],
    proofRoutes: [
      {
        audience: "设计工程 / 硬件交互",
        title: "实体确认权与触觉闭环",
        claim: "证明硬件约束如何直接塑形交互规则，而不只是写固件。",
        evidence:
          "Walkie 与 MazeRunners 将红外传感、手腕实体双键与 AES-256-GCM 中继落成明确的人机边界。",
        href: "/projects/walkie#decision-timeline",
      },
      {
        audience: "AI 认知安全 / 产品设计",
        title: "用「先不要」对抗习惯性回车疲劳",
        claim:
          "证明我能设计克制拟人、保护用户后悔权的 AI 界面。",
        evidence:
          "Lamplight Nook 把滚屏日志变成咖啡馆黑板，并把风险确认卡默认焦点锁在「先不要」。",
        href: "/projects/lamplight#decision-timeline",
      },
      {
        audience: "AI 信任与隐私自主权",
        title: "宁可留白、绝不越权代点提交",
        claim:
          "证明系统信任来自明确划清「系统不做什么」。",
        evidence:
          "Resume Autofill 对开放题刻意留空、本地存储简历，并将最终提交严格留给人手。",
        href: "/projects/autofill#decision-timeline",
      },
      {
        audience: "复杂 / 即时交互",
        title: "一整个系统共用一套规则",
        claim: "证明我能为复杂系统设计一套前后一致、而且能被核对的交互规则。",
        evidence:
          "草原铁潮：五关 RTS 共用一套命令语法，失败后从同一条存档链恢复，430 / 430 测试通过。",
        href: "/projects/grassland#decision-timeline",
      },
      {
        audience: "社交穿戴 / AI 输出核验",
        title: "拒收假装完成的 AI 产物",
        claim:
          "证明我能站在现场社交与真机约束下核验并打回 AI 生成原型。",
        evidence:
          "On The Beat 抓出假匹配数据与笔电依赖，并迁入 Fly.io 完成两支真手环配对。",
        href: "/projects/onthebeat#decision-timeline",
      },
    ],
    closingPrompt: {
      title: "把这份作品集当作快速招聘判断工具。",
      body:
        "从最符合岗位的证据路径开始，再通过简历和联系页决定是否开启对话。",
      primaryAction: { label: "联系 Lewis", href: "/contact" },
      secondaryAction: { label: "查看简历", href: "/resume" },
    },
  },
};


const roleFits: Record<ProofLocale, RoleFit> = {
  en: {
    availability: "Graduating November 2026; looking for full-time graduate UX and product design roles, and research-led product teams.",
    roles: ["Graduate Interaction Designer", "Graduate Product Designer", "Graduate UX Designer", "Graduate UX Researcher"],
    bestFit: [
      "Teams with ambiguous problems and enough access to users to learn properly.",
      "Products where accessibility, education, AI trust, or physical interaction matters.",
      "Small or mid-sized teams where design participates in product decisions.",
    ],
    proofLinks: [
      { label: "Physical AI control proof", href: "/projects/walkie" },
      { label: "Cognitive safety proof", href: "/projects/lamplight" },
      { label: "AI UX thread", href: "/interview#ai-trust-thread" },
      { label: "Resume", href: "/resume" },
    ],
  },
  zh: {
    availability: "2026 年 11 月毕业，主要看全职毕业生 UX 与产品设计岗位，以及研究驱动型产品团队。",
    roles: ["交互设计应届生", "产品设计应届生", "用户体验设计应届生", "用户研究应届生"],
    bestFit: [
      "问题足够模糊、也有真实用户可接触的团队。",
      "重视无障碍、教育、AI 信任或实体交互的产品。",
      "设计能参与产品决策的小型或中型团队。",
    ],
    proofLinks: [
      { label: "穿戴端 AI 控制证据", href: "/projects/walkie" },
      { label: "AI 认知安全证据", href: "/projects/lamplight" },
      { label: "AI UX 这条线", href: "/interview#ai-trust-thread" },
      { label: "简历", href: "/resume" },
    ],
  },
};

const hiringPaths: Record<ProofLocale, HiringPath[]> = {
  en: [
    {
      time: "15-second scan",
      title: "Check the signal",
      action: "Use the evidence stats and role-fit summary to decide whether this portfolio matches your UX opening.",
      href: "/resume",
    },
    {
      time: "2-minute case check",
      title: "Inspect the strongest proof",
      action: "Open the evidence map and jump into the case that best matches your team: IA, accessibility, AI UX, hardware, or generative production.",
      href: "/projects",
    },
    {
      time: "10-minute deep read",
      title: "Read like a design manager",
      action: "Start with Walkie for physical-AI boundaries, then inspect Lamplight Nook for cognitive safety and default refusal.",
      href: "/projects/walkie",
    },
  ],
  zh: [
    {
      time: "15 秒快速扫读",
      title: "先看信号",
      action: "用证据数据和岗位匹配摘要，快速判断这个作品集是否适合你的 UX 岗位。",
      href: "/resume",
    },
    {
      time: "2 分钟案例判断",
      title: "查看最相关证明",
      action: "打开证据地图，按团队需要进入人机边界、认知安全、隐私克制、硬件或规则语法方向的案例。",
      href: "/projects",
    },
    {
      time: "10 分钟深读",
      title: "像设计经理一样阅读",
      action: "先读 Walkie 看实体确认边界，再对照 Lamplight Nook 看 AI 长任务的默认拒绝与认知安全设计。",
      href: "/projects/walkie",
    },
  ],
};


export function getCareerSnapshot(locale: ProofLocale): CareerSnapshot {
  return careerSnapshots[locale];
}

export function getCapabilityPillars(locale: ProofLocale): CapabilityPillar[] {
  return capabilityPillars[locale];
}

// The next three feed lists a visitor sees (work index, feed, proof routes,
// contact and resume links), so an unlisted case is filtered out here. Its
// entries stay in the tables above; only the lists stop showing them.
export function getProjectEvidence(locale: ProofLocale): ProjectEvidence[] {
  return projectEvidence[locale].filter((project) => !isUnlistedProject(project.slug));
}

export function getHiringConversion(locale: ProofLocale): HiringConversion {
  const conversion = hiringConversions[locale];
  return {
    ...conversion,
    proofRoutes: conversion.proofRoutes.filter((route) => !linksToUnlistedProject(route.href)),
  };
}

export function getRoleFit(locale: ProofLocale): RoleFit {
  const fit = roleFits[locale];
  return {
    ...fit,
    proofLinks: fit.proofLinks.filter((link) => !linksToUnlistedProject(link.href)),
  };
}

export function getHiringPaths(locale: ProofLocale): HiringPath[] {
  return hiringPaths[locale];
}
