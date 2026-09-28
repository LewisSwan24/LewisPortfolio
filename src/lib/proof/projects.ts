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
      "I am looking for interaction and product design internships and graduate roles on teams that want a designer who can build, not only specify.",
    status: "UQ Master of Interaction Design candidate, Brisbane. Graduating late 2026; open to internships and graduate roles.",
    stats: [
      {
        value: "5",
        label: "end-to-end cases",
        detail:
          "A student social platform, an accessibility browser extension, a physical interaction system, an AI-oversight interface study, and a generative production pipeline.",
      },
      {
        value: "4",
        label: "research methods used",
        detail: "Exploratory interviews, think-aloud usability testing, task-based usability testing, and observation during a public exhibition.",
      },
      {
        value: "1",
        label: "working hardware build",
        detail: "MazeRunners: Arduino firmware, sensors, haptics, and a Web Serial console that actually runs.",
      },
      {
        value: "2026",
        label: "career focus",
        detail: "Graduate and entry-level UX, product design, or design-technologist teams.",
      },
    ],
  },
  zh: {
    headline: "会把东西真的做出来的交互设计师，而不只是交一份稿。",
    summary:
      "我在找交互 / 产品设计的实习与毕业生岗位，尤其适合希望设计师能自己把想法推到能跑的团队。",
    status: "昆士兰大学交互设计硕士在读，布里斯班。2026 年底毕业，实习与全职都在看。",
    stats: [
      {
        value: "5",
        label: "端到端案例",
        detail:
          "一个学生社交平台、一个无障碍浏览器扩展、一个软硬件结合的互动系统、一项关于「人如何监督 AI」的界面研究，以及一条生成式内容生产管线。",
      },
      {
        value: "4",
        label: "使用过的研究方法",
        detail: "探索式访谈、出声思考可用性测试、任务式可用性测试，以及公开展出时的现场观察。",
      },
      {
        value: "1",
        label: "可运行的硬件作品",
        detail: "MazeRunners：Arduino 固件、传感器、触觉反馈，以及真正能跑起来的 Web Serial 控制台。",
      },
      {
        value: "2026",
        label: "求职方向",
        detail: "毕业生 / 入门级 UX、产品设计或 design technologist 团队。",
      },
    ],
  },
};

const capabilityPillars: Record<ProofLocale, CapabilityPillar[]> = {
  en: [
    {
      id: "research-framing",
      title: "Research framing",
      summary: "I turn broad questions into scoped studies, participant plans, and decision criteria.",
      proof: "UQ Connect gave every hypothesis a numeric pass mark in writing before the first interview, so the research was able to come back negative — and on several counts it did.",
      href: "/projects/connect",
    },
    {
      id: "information-architecture",
      title: "Information architecture",
      summary: "I give a sprawling product a structure people can navigate, then check whether they actually can.",
      proof: "UQ Connect went back to paper mid-build to redraw the app as five screens with every route off the home page drawn explicitly.",
      href: "/projects/connect",
    },
    {
      id: "accessibility",
      title: "Accessibility and inclusion",
      summary: "I turn accessibility guidance into controls people can actually reach, and keep them working in the wild.",
      proof: "Spectra Lens turns accessibility guidance into a working extension that rewrites type and spacing on any page.",
      href: "/projects/spectra",
    },
    {
      id: "ai-ux",
      title: "AI interaction design",
      summary: "I judge how sure an AI feature is allowed to sound, and check what it actually does.",
      proof: "PriceWise passed build, type-check and tests with four classes of defect still in the code; its semantic search had never used a vector.",
      href: "/projects/pricewise",
    },
    {
      id: "prototyping-testing",
      title: "Prototype, test, revise",
      summary: "I build at the fidelity needed to learn, then use tests to decide the next move.",
      proof: "UQ Connect ran three rounds at three fidelities: exploratory interviews, think-aloud on a working prototype, then a full task chain on the MVP.",
      href: "/projects/connect",
    },
  ],
  zh: [
    {
      id: "research-framing",
      title: "研究问题定义",
      summary: "我把宽泛问题拆成研究范围、招募计划与决策标准。",
      proof: "UQ Connect 在第一场访谈之前，就把每条假设的数字及格线写了下来，让研究有可能得出否定结果；最后确实否定了好几条。",
      href: "/projects/connect",
    },
    {
      id: "information-architecture",
      title: "信息架构",
      summary: "我给一个不断膨胀的产品一套能走得通的结构，然后去验证用户是不是真的走得通。",
      proof: "UQ Connect 在开发中途回到纸上，把整个应用重画成五个屏，并把从首页出发的每条路径都画了出来。",
      href: "/projects/connect",
    },
    {
      id: "accessibility",
      title: "无障碍与包容性",
      summary: "我把无障碍准则做成用户真的够得到的控件，并让这套控件在真实网站上持续可用。",
      proof: "Spectra Lens 把无障碍准则做成了一个能用的扩展：一个扩展弹窗就能改写任意页面的字体与间距。",
      href: "/projects/spectra",
    },
    {
      id: "ai-ux",
      title: "AI 交互设计",
      summary: "我判断一个 AI 功能该有多大把握，也去核实这个功能实际做了什么。",
      proof: "PriceWise 的构建、类型检查和测试全绿，代码里仍有四类缺陷；语义搜索其实从来没用过向量。",
      href: "/projects/pricewise",
    },
    {
      id: "prototyping-testing",
      title: "原型、测试、迭代",
      summary: "我按学习目标选择原型保真度，再用测试决定下一步。",
      proof: "UQ Connect 用三种保真度跑了三轮：探索式访谈、在可运行原型上的出声思考，最后是 MVP 上的完整任务链。",
      href: "/projects/connect",
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
      outcome: "A working extension that rewrites type and spacing on any page from a single popup, with settings that persist per site.",
      proves: "I can turn accessibility guidance into a shipped tool, and keep it working across sites I do not control.",
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
      slug: "vigil",
      href: "/projects/vigil",
      problemType: "Human oversight of AI, built through an AI-assisted workflow",
      challenge:
        "A phishing classifier that is right 88% of the time still needs a human on the other side. The interface decides whether that person genuinely checks the call or clicks through it.",
      methods: [
        "spec freeze",
        "synthetic stimulus design",
        "A/B variant prototyping",
        "measured contrast auditing",
        "usability test protocol design",
      ],
      sample:
        "In progress. A 140-message synthetic corpus with an authored 87.9%-accurate classifier and a validated error profile; six interface variants across three questions; a five-participant protocol written but not yet run.",
      outcome:
        "Six variants running behind a working React build, with the corpus gated so confidence cannot predict the classifier's mistakes. The three design questions are still open, and the predictions were recorded before any testing.",
      proves:
        "I can specify a system precisely enough for an AI coding workflow to build it fast, and still own the judgement that decides whether it measures anything.",
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
        "A working career sim whose style rules were written first: three art bibles, an explicit rejected list checked by eye, and a registry that logs every batch. The one automated check reads the manifest, not the style.",
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
        "Two coursework briefs: a cycling route app where I owned the interface, and an individual guide translating one 2025 peer-reviewed paper. Testing reached think-aloud walkthrough; the six-item self-check passed 6 of 6, which is a self-check rather than external validation.",
      outcome:
        "Safety became routing weights, a 150–250 m warning lead and a 48 px tap-target floor; the paper became three independent trigger conditions with their own copy templates and thresholds.",
      proves:
        "I can force a requirement everyone agrees with into a rule someone can build to and argue with, and state plainly where that rule stops holding.",
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
      outcome: "一个能用的扩展：从一个扩展弹窗就能改写任意页面的字体与间距，设置按站点分别保存。",
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
      slug: "vigil",
      href: "/projects/vigil",
      problemType: "人对 AI 的监督，用 AI 辅助流程做出来",
      challenge:
        "一个准确率 88% 的钓鱼邮件分类器，另一端仍然需要一个人。而界面决定了这个人是真的在复核，还是一路点过去。",
      methods: ["规格冻结", "合成测试素材设计", "A/B 变体原型", "对比度实测审计", "可用性测试脚本设计"],
      sample:
        "进行中。140 封合成邮件、一个准确率 87.9% 的自建分类器与经过验证的错误分布；三个设计问题、六个界面变体；五人测试脚本已写好，尚未执行。",
      outcome:
        "六个变体已经跑起来，背后是一版可运行的 React 实现；语料设有闸门，确保置信度无法预测分类器错在哪里。三个设计问题都还开着，而预测在测试之前就已写下。",
      proves:
        "证明我能把一套系统说清楚到 AI 可以快速实现，同时把「这套系统到底测不测得到东西」这个判断留在自己手里。",
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
        "一个真的能玩的生涯模拟，风格规则写在前面：三份美术圣经，加一张靠人眼对照的拒绝清单。资产按批次登记；唯一的自动检查读的是资产清单，不查风格。",
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
        "同一门课的两份作业：一个自行车路线 App（界面部分由我负责），一份把 2025 年某篇同行评审论文翻译成规范的个人作业。测试做到出声思考走查这一层；六条自查清单 6/6 通过，那是自查不是外部验证。",
      outcome:
        "安全变成了路线权重、150–250 m 的提示提前量和 48px 的点击区下限；论文变成了三条各配文案模板与阈值的独立触发条件。",
      proves:
        "我能把一句所有人都同意的要求，逼成一条能照着施工、也能让人指着说「这条不对」的规则，并且说得清这条规则在哪里失效。",
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
        "Graduating late 2026. Open to internships and graduate UX, product, and design-technologist roles.",
    },
    signals: [
      {
        value: "4",
        label: "cases with a live build you can open",
        detail:
          "UQ Connect, MazeRunners, Hoop Dream and PriceWise each open from their case page.",
      },
      {
        value: "6",
        label: "research methods used",
        detail: "Depth interviews, falsifiable test cards, think-aloud, task-based usability testing, competitor teardown, and field observation.",
      },
      {
        value: "1",
        label: "working hardware build",
        detail: "Arduino firmware, IR sensing, haptics, and a Web Serial console — built, wired, and exhibited.",
      },
      {
        value: "2026",
        label: "availability",
        detail: "Graduating late 2026. Open to graduate and entry-level UX, product design, and design-technologist roles.",
      },
    ],
    proofRoutes: [
      {
        audience: "Design technology / prototyping",
        title: "Hardware, firmware, and interaction in one loop",
        claim: "Best proof that I can build the thing, not only specify it.",
        evidence:
          "MazeRunners wires IR sensing, firmware state, haptics, audio, and a Web Serial console into one system — built and exhibited.",
        href: "/projects/maze#decision-timeline",
      },
      {
        audience: "Research rigor / product structure",
        title: "Research that can prove itself wrong",
        claim:
          "Best proof that I run studies capable of returning a negative, then act on the result.",
        evidence:
          "UQ Connect set a numeric pass mark per hypothesis before fieldwork; several failed, and the learning cards say so.",
        href: "/projects/connect#decision-timeline",
      },
      {
        audience: "Accessibility / inclusive design",
        title: "Accessibility and inclusive interaction design",
        claim:
          "Best proof that I can turn accessibility research into a practical product interaction model.",
        evidence:
          "Spectra Lens combines accessibility guidance, cross-site injection testing, and a shipped browser extension.",
        href: "/projects/spectra#evidence-board",
      },
      {
        audience: "AI UX / trust",
        title: "Checking what an AI feature really does",
        claim:
          "Best proof that I check AI-built features against the live system before I trust a green build.",
        evidence:
          "PriceWise: four classes of defect passed build, type-check and tests, and semantic search had never used a vector.",
        href: "/projects/pricewise#decision-timeline",
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
        "2026 年底毕业。实习与毕业生的交互、产品、design technologist 岗位都在看。",
    },
    signals: [
      {
        value: "4",
        label: "个案例有能直接打开的线上版本",
        detail:
          "UQ Connect、MazeRunners、Hoop Dream 和 PriceWise，都能从案例页直接打开。",
      },
      {
        value: "6",
        label: "使用过的研究方法",
        detail: "深度访谈、可证伪的假设卡、出声思考、任务式可用性测试、竞品拆解，以及真实场景观察。",
      },
      {
        value: "1",
        label: "可运行的硬件作品",
        detail: "Arduino 固件、红外感测、触觉反馈与 Web Serial 控制台，都真的做出来、接好线并展出过。",
      },
      {
        value: "2026",
        label: "可入职时间",
        detail: "2026 年底毕业。开放毕业生 / 入门级 UX、产品设计与 design technologist 岗位。",
      },
    ],
    proofRoutes: [
      {
        audience: "设计技术 / 原型开发",
        title: "硬件、固件与交互接成同一个闭环",
        claim: "证明我不只是写规格，而是真的做得出来。",
        evidence:
          "MazeRunners 把红外感测、固件状态、震动、音效与 Web Serial 控制台接成一套系统，已搭建并展出。",
        href: "/projects/maze#decision-timeline",
      },
      {
        audience: "研究严谨度 / 产品结构",
        title: "能证明自己错的研究",
        claim:
          "证明我做的研究有可能得出否定结果，并且我会按结果行动。",
        evidence:
          "UQ Connect 在进场之前就为每条假设定了数字及格线；有几条没过，learning cards 把这件事写了下来。",
        href: "/projects/connect#decision-timeline",
      },
      {
        audience: "无障碍 / 包容性设计",
        title: "无障碍与包容性交互设计",
        claim:
          "证明我能把无障碍研究转化为可实施的产品交互模型。",
        evidence:
          "Spectra Lens 把无障碍准则、跨站点注入测试和一个真的做出来的浏览器扩展接在一起。",
        href: "/projects/spectra#evidence-board",
      },
      {
        audience: "AI UX / 信任",
        title: "核实 AI 功能到底做了什么",
        claim:
          "证明我在相信构建全绿之前，会先对着线上系统核实 AI 写的功能。",
        evidence:
          "PriceWise：四类缺陷都过了构建、类型检查和测试，语义搜索其实从来没用过向量。",
        href: "/projects/pricewise#decision-timeline",
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
    availability: "Open to 2026 internships, graduate UX roles, and research-led product teams.",
    roles: ["UX Designer Intern", "Product Designer Intern", "UX Research Intern", "Graduate Interaction Designer"],
    bestFit: [
      "Teams with ambiguous problems and enough access to users to learn properly.",
      "Products where accessibility, education, AI trust, or physical interaction matters.",
      "Small or mid-sized teams where design participates in product decisions.",
    ],
    proofLinks: [
      { label: "Information architecture proof", href: "/projects/connect" },
      { label: "Accessibility proof", href: "/projects/spectra" },
      { label: "AI UX thread", href: "/hire#ai-trust-thread" },
      { label: "Resume", href: "/resume" },
    ],
  },
  zh: {
    availability: "开放 2026 实习、毕业生 UX 岗位与研究驱动型产品团队机会。",
    roles: ["用户体验设计实习生", "产品设计实习生", "用户研究实习生", "交互设计应届生"],
    bestFit: [
      "问题足够模糊、也有真实用户可接触的团队。",
      "重视无障碍、教育、AI 信任或实体交互的产品。",
      "设计能参与产品决策的小型或中型团队。",
    ],
    proofLinks: [
      { label: "信息架构证据", href: "/projects/connect" },
      { label: "无障碍证据", href: "/projects/spectra" },
      { label: "AI UX 这条线", href: "/hire#ai-trust-thread" },
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
      action: "Start with UQ Connect for research-to-metrics craft, then compare Spectra Lens for inclusive product decisions.",
      href: "/projects/connect",
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
      action: "打开证据地图，按团队需要进入 IA、无障碍、AI UX、硬件或生成式生产方向的案例。",
      href: "/projects",
    },
    {
      time: "10 分钟深读",
      title: "像设计经理一样阅读",
      action: "先读 UQ Connect 看研究如何转成指标，再对照 Spectra Lens 看包容性产品决策。",
      href: "/projects/connect",
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
