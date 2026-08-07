import type {
  CapabilityPillar,
  CareerSnapshot,
  HiringConversion,
  HiringPath,
  ProjectEvidence,
  ProofLocale,
  RoleFit,
} from "./types";


const careerSnapshots: Record<ProofLocale, CareerSnapshot> = {
  en: {
    headline: "Interaction designer who takes an idea all the way to something that runs.",
    summary:
      "I am looking for interaction and product design internships and graduate roles on teams that want a designer who can build, not only specify.",
    status: "UQ Master of Interaction Design candidate, Brisbane. Graduating late 2026; open to internships and graduate roles.",
    stats: [
      {
        value: "7",
        label: "end-to-end cases",
        detail:
          "Information architecture, accessibility, AI coaching, social wellbeing, a physical interaction system, an AI-oversight interface study, and a generative production pipeline.",
      },
      {
        value: "6",
        label: "research methods used",
        detail: "Card sorting, tree testing, think-aloud, interviews, diary study, and co-design workshops.",
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
        value: "7",
        label: "端到端案例",
        detail:
          "信息架构、无障碍、AI 面试辅导、国际学生社交健康、一个软硬件结合的互动系统、一项关于「人如何监督 AI」的界面研究，以及一条生成式内容生产管线。",
      },
      {
        value: "6",
        label: "使用过的研究方法",
        detail: "卡片分类、树测试、出声思考、深度访谈、日记研究与共创工作坊。",
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
      proof: "Connect Circles combines interviews, diary study, and co-design into a product direction.",
      href: "/projects/circles",
    },
    {
      id: "information-architecture",
      title: "Information architecture",
      summary: "I restructure messy systems around user mental models, then test the structure before defending it.",
      proof: "UQ Connect collapsed twelve staff-owned categories into six task-led ones, tree-tested against the original.",
      href: "/projects/connect",
    },
    {
      id: "accessibility",
      title: "Accessibility and inclusion",
      summary: "I design with the target group, not merely for them, and test in realistic contexts.",
      proof: "Spectra Lens was designed and tested with colourblind users in cafeterias, crossings, and wardrobes.",
      href: "/projects/spectra",
    },
    {
      id: "ai-ux",
      title: "AI interaction design",
      summary: "I design AI as a relationship: expectation-setting, control, feedback timing, and trust.",
      proof: "AI Interview Assistant moved feedback after the session, because mid-answer coaching read as interruption.",
      href: "/projects/ai",
    },
    {
      id: "prototyping-testing",
      title: "Prototype, test, revise",
      summary: "I build at the fidelity needed to learn, then use tests to decide the next move.",
      proof: "Spectra Lens and UQ Connect both changed direction after moderated usability sessions.",
      href: "/projects/spectra",
    },
  ],
  zh: [
    {
      id: "research-framing",
      title: "研究问题定义",
      summary: "我把宽泛问题拆成研究范围、招募计划与决策标准。",
      proof: "Connect Circles 通过访谈、日记研究与共创，把孤独感问题转成产品方向。",
      href: "/projects/circles",
    },
    {
      id: "information-architecture",
      title: "信息架构",
      summary: "我围绕用户心智模型重组复杂系统，并在为它辩护之前先做测试。",
      proof: "UQ Connect 把十二个按部门划分的入口收敛成六个按任务划分的入口，并与原结构做树测试对比。",
      href: "/projects/connect",
    },
    {
      id: "accessibility",
      title: "无障碍与包容性",
      summary: "我和目标用户一起设计，并在真实场景中测试。",
      proof: "Spectra Lens 与色盲用户共创，并在食堂、人行横道和他们自己的衣柜前做真实场景测试。",
      href: "/projects/spectra",
    },
    {
      id: "ai-ux",
      title: "AI 交互设计",
      summary: "我把 AI 体验看成关系设计：预期、控制、反馈时机与信任。",
      proof: "AI Interview Assistant 把反馈放到练习结束之后，因为答题过程中的提示会被当成打断。",
      href: "/projects/ai",
    },
    {
      id: "prototyping-testing",
      title: "原型、测试、迭代",
      summary: "我按学习目标选择原型保真度，再用测试决定下一步。",
      proof: "Spectra Lens 与 UQ Connect 都在可用性测试后调整了关键方向。",
      href: "/projects/spectra",
    },
  ],
};

const projectEvidence: Record<ProofLocale, ProjectEvidence[]> = {
  en: [
    {
      slug: "connect",
      href: "/projects/connect",
      problemType: "Information architecture for a high-traffic student portal",
      challenge: "Students could not find critical university tasks because the portal reflected staff ownership, not student mental models.",
      methods: ["open card sort", "tree testing", "task analysis", "plain-language review"],
      sample: "University project. Student participants across card sort, tree test, and task-analysis sessions; sample sizes not formally recorded.",
      outcome: "Twelve staff-owned categories collapsed to six task-led ones, with 'I'm new' promoted to the front door and an A-Z index kept as a fallback. Not deployed to the live portal.",
      proves: "I can diagnose IA breakdowns, restructure around user mental models, and test the structure before defending it.",
    },
    {
      slug: "spectra",
      href: "/projects/spectra",
      problemType: "Accessibility and AR decision support",
      challenge: "Colourblind users needed fast, private interpretation of colour-dependent information in public environments.",
      methods: ["semi-structured interviews", "heuristic review", "co-design", "field usability testing"],
      sample: "University project. Colourblind participants across interviews, co-design, and in-context usability sessions; small self-recruited sample, sizes not formally recorded.",
      outcome: "A one-tap AR overlay that answers the decision rather than naming the hue, silent by default with audio opt-in. Prototype only, not shipped.",
      proves: "I can design inclusive interaction patterns with target users and change the model when context testing contradicts me.",
    },
    {
      slug: "ai",
      href: "/projects/ai",
      problemType: "AI coaching and emotionally sensitive product design",
      challenge: "Job seekers needed realistic interview practice without the social pressure that makes practice feel unsafe.",
      methods: ["survey", "depth interviews", "competitive teardown", "prototype test", "A/B feedback timing"],
      sample: "University project. Survey, depth interviews, competitive teardown, and moderated prototype sessions; sample sizes not formally recorded.",
      outcome: "An interaction model for AI coaching: feedback after the session rather than mid-answer, a persona warmer than a recruiter, and body-language analysis deliberately rejected. Prototype only.",
      proves: "I can design AI interactions around trust, control, expectation setting, and emotional pacing.",
    },
    {
      slug: "circles",
      href: "/projects/circles",
      problemType: "Social wellbeing and research-through-design",
      challenge: "International students wanted deeper friendship, while most social apps optimize for more matches and more messages.",
      methods: ["depth interviews", "diary study", "co-design workshops", "concept synthesis"],
      sample: "Ongoing university project. Interviews across cultural cohorts, a two-week diary study, and co-design workshops; sample sizes not formally recorded.",
      outcome: "Research complete; prototype direction defined around slow matching, small groups, and shared vulnerability. Nothing built or user-tested yet.",
      proves: "I can handle ambiguous social problems, synthesize academic theory, and resist shallow growth metrics.",
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
        "A career-simulation RPG needs hundreds of art assets to read as one world. Generating them is cheap now; keeping 299 of them stylistically coherent is the actual problem.",
      methods: [
        "art bible",
        "prompt-per-batch production",
        "style gate review",
        "narrative systems design",
        "regression testing at scale",
      ],
      sample:
        "Publicly playable, self-labelled DEMO v0.6. 299 assets across six batches, a ten-chapter career on 146 nodes, and 1,975 tests over the career, contract, injury and save systems. No player research.",
      outcome:
        "A working career sim where coherence is a property of the pipeline rather than of individual assets: rules written first, a style gate with an explicit rejected list, and a production log that makes every batch auditable.",
      proves:
        "I can run generative production at a volume that would otherwise go incoherent, and keep a systems-heavy build correct while content keeps landing.",
    },
  ],
  zh: [
    {
      slug: "connect",
      href: "/projects/connect",
      problemType: "高频学生门户的信息架构重组",
      challenge: "学生找不到关键任务，因为门户按照部门归属组织，而不是按照学生心智模型组织。",
      methods: ["开放式卡片分类", "树测试", "任务分析", "普通语言审查"],
      sample: "课程项目。参与者为学生，覆盖卡片分类、树测试与任务分析；样本量未正式记录。",
      outcome: "把十二个按部门划分的入口收敛成六个按任务划分的入口，把「我是新生」提到首屏，并保留 A-Z 索引作为兜底。未上线到真实门户。",
      proves: "证明我能诊断 IA 断点、围绕用户心智模型重组结构，并在为方案辩护之前先做测试。",
    },
    {
      slug: "spectra",
      href: "/projects/spectra",
      problemType: "无障碍与 AR 决策辅助",
      challenge: "色盲用户需要在公共环境中快速、私密地理解依赖颜色的信息。",
      methods: ["半结构访谈", "竞品启发式评估", "共创", "真实场景可用性测试"],
      sample: "课程项目。参与者为色盲用户，覆盖访谈、共创与真实场景可用性测试；样本自行招募且规模较小，未正式记录。",
      outcome: "一个单击即用的 AR 叠加层：直接回答「该怎么办」而不是报出色名，默认静音、语音改为可选。仅为原型，未上线。",
      proves: "证明我能和目标用户一起设计包容性互动，并在真实场景测试推翻我的假设时改掉模型。",
    },
    {
      slug: "ai",
      href: "/projects/ai",
      problemType: "AI 辅导与情绪敏感型产品设计",
      challenge: "求职者需要真实面试练习，但又不想承受被观看与被评价的社交压力。",
      methods: ["问卷", "深度访谈", "竞品拆解", "原型测试", "反馈时机 A/B 测试"],
      sample: "课程项目。问卷、深度访谈、竞品拆解与主持式原型测试；样本量未正式记录。",
      outcome: "一套 AI 辅导的交互模型：反馈放在练习结束之后而非答题过程中，人设比真实面试官更温和，并主动放弃了肢体语言分析。仅为原型。",
      proves: "证明我能围绕信任、控制感、预期与情绪节奏设计 AI 体验。",
    },
    {
      slug: "circles",
      href: "/projects/circles",
      problemType: "社交健康与研究型产品探索",
      challenge: "国际学生想要更深的友谊，而大多数社交产品优化的是更多匹配和更多消息。",
      methods: ["深度访谈", "日记研究", "共创工作坊", "概念综合"],
      sample: "进行中的课程项目。跨文化群体访谈、两周日记研究与共创工作坊；样本量未正式记录。",
      outcome: "研究完成；原型方向围绕慢匹配、小组关系与共享脆弱性展开。目前尚未开发，也未做用户测试。",
      proves: "证明我能处理模糊的社会问题，综合学术理论，并抵抗浅层增长指标。",
    },
    {
      slug: "maze",
      href: "/projects/maze",
      problemType: "物理计算与软硬件交互",
      challenge:
        "实体迷宫本身是被动的。要让它像一个会回应的多人系统，必须把感测、反馈和游戏状态接在一起，让玩家看得见、听得见、也感觉得到每一个事件。",
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
        "证明我能把一套系统说清楚到 AI 可以快速实现，同时把「它到底测不测得到东西」这个判断留在自己手里。",
    },
    {
      slug: "hoop",
      href: "/projects/hoop",
      problemType: "大体量生成式生产与叙事系统设计",
      challenge:
        "一个生涯模拟 RPG 需要几百张美术资产，才撑得起「这是同一个世界」。现在生成它们很便宜，难的是让 299 张保持在同一种风格里。",
      methods: ["美术圣经", "按批次写 prompt 生产", "风格闸门审查", "叙事系统设计", "大规模回归测试"],
      sample:
        "线上公开可玩，游戏自标 DEMO v0.6。六个批次共 299 张资产、十章生涯跑在 146 个节点上、覆盖生涯与合同与伤病与存档系统的 1975 个测试。没有做过玩家研究。",
      outcome:
        "一个真的能玩的生涯模拟，而它的一致性来自管线而不是单张资产：规则先写、风格闸门附明确的拒绝清单、生产记录让每一批都可审计。",
      proves: "证明我能在一个本来一定会失控的量级上跑生成式生产，并在内容持续落地的同时让实现保持正确。",
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
        value: "7",
        label: "end-to-end cases",
        detail:
          "Information architecture, accessibility, AI feedback, social wellbeing, a physical interaction system, an AI-oversight interface study, and a generative production pipeline.",
      },
      {
        value: "6",
        label: "research methods used",
        detail: "Card sorting, tree testing, think-aloud, depth interviews, diary study, and co-design workshops.",
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
        audience: "IA / service complexity",
        title: "Information architecture and research rigor",
        claim:
          "Best proof that I can restructure a complex student service around user mental models.",
        evidence:
          "UQ Connect links task analysis, card sorting, and tree testing to a task-led structure.",
        href: "/projects/connect#decision-timeline",
      },
      {
        audience: "Accessibility / inclusive design",
        title: "Accessibility and inclusive interaction design",
        claim:
          "Best proof that I can turn accessibility research into a practical product interaction model.",
        evidence:
          "Spectra Lens combines colourblind-user interviews, multi-modal feedback, privacy decisions, and field testing.",
        href: "/projects/spectra#evidence-board",
      },
      {
        audience: "AI UX / trust",
        title: "Designing against over-trust in an AI",
        claim:
          "Best proof that I can design the conditions under which a person genuinely checks an AI rather than deferring to it.",
        evidence:
          "Vigil builds the classifier's confidence as deliberately weak evidence, and the build fails if that stops being true.",
        href: "/projects/vigil#decision-timeline",
      },
      {
        audience: "Social wellbeing / ambiguous problems",
        title: "Social wellbeing product framing",
        claim:
          "Best proof that I can frame a soft social problem without collapsing it into generic engagement metrics.",
        evidence:
          "Connect Circles uses interviews, diary study, and theory synthesis to define slow matching and relationship depth.",
        href: "/projects/circles#evidence-board",
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
        "我把模糊的产品问题走完研究、信息架构与包容性交互决策，再用 Claude Code 和 Codex 把它推到能跑——所以你看到的是一个能用的原型，而不是对原型的描述。",
      status:
        "2026 年底毕业。实习与毕业生的交互、产品、design technologist 岗位都在看。",
    },
    signals: [
      {
        value: "7",
        label: "端到端案例",
        detail:
          "涵盖信息架构、无障碍、AI 反馈、社交健康、一个软硬件结合的互动系统、一项关于「人如何监督 AI」的界面研究，以及一条生成式内容生产管线。",
      },
      {
        value: "6",
        label: "使用过的研究方法",
        detail: "卡片分类、树测试、出声思考、深度访谈、日记研究与共创工作坊。",
      },
      {
        value: "1",
        label: "可运行的硬件作品",
        detail: "Arduino 固件、红外感测、触觉反馈与 Web Serial 控制台 —— 真的做出来、接好线并展出过。",
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
          "MazeRunners 把红外感测、固件状态、震动、音效与 Web Serial 控制台接成一套系统 —— 已搭建并展出。",
        href: "/projects/maze#decision-timeline",
      },
      {
        audience: "信息架构 / 复杂服务",
        title: "信息架构与研究严谨度",
        claim:
          "证明我能围绕用户心智模型，重构复杂的学生服务。",
        evidence:
          "UQ Connect 串联任务分析、卡片分类与树测试，产出以任务为主的结构。",
        href: "/projects/connect#decision-timeline",
      },
      {
        audience: "无障碍 / 包容性设计",
        title: "无障碍与包容性交互设计",
        claim:
          "证明我能把无障碍研究转化为可实施的产品交互模型。",
        evidence:
          "Spectra Lens 结合色觉障碍用户访谈、多模态反馈、隐私决策与实地测试。",
        href: "/projects/spectra#evidence-board",
      },
      {
        audience: "AI UX / 信任",
        title: "设计出「不轻易相信 AI」这件事",
        claim:
          "证明我能设计出让人真的去复核 AI、而不是顺着它点下去的条件。",
        evidence:
          "Vigil 把分类器的置信度刻意做成弱证据，而且一旦这个性质失效，build 直接挂掉。",
        href: "/projects/vigil#decision-timeline",
      },
      {
        audience: "社交健康 / 模糊问题",
        title: "社交健康产品框架",
        claim:
          "证明我能定义柔性的社会问题，而不把它简化成通用互动指标。",
        evidence:
          "Connect Circles 用访谈、日记研究与理论综合，定义慢匹配和关系深度。",
        href: "/projects/circles#evidence-board",
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
      "Products where accessibility, education, social wellbeing, or AI trust matters.",
      "Small or mid-sized teams where design participates in product decisions.",
    ],
    proofLinks: [
      { label: "Information architecture proof", href: "/projects/connect" },
      { label: "Accessibility proof", href: "/projects/spectra" },
      { label: "AI UX proof", href: "/projects/ai" },
      { label: "Resume", href: "/resume" },
    ],
  },
  zh: {
    availability: "开放 2026 实习、毕业生 UX 岗位与研究驱动型产品团队机会。",
    roles: ["UX Designer Intern", "Product Designer Intern", "UX Research Intern", "Graduate Interaction Designer"],
    bestFit: [
      "问题足够模糊、也有真实用户可接触的团队。",
      "重视无障碍、教育、社交健康或 AI 信任的产品。",
      "设计能参与产品决策的小型或中型团队。",
    ],
    proofLinks: [
      { label: "信息架构证据", href: "/projects/connect" },
      { label: "无障碍证据", href: "/projects/spectra" },
      { label: "AI UX 证据", href: "/projects/ai" },
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
      action: "Open the evidence map and jump into the case that best matches your team: IA, accessibility, AI UX, or social wellbeing.",
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
      action: "打开证据地图，按团队需要进入 IA、无障碍、AI UX 或社交健康方向的案例。",
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

export function getProjectEvidence(locale: ProofLocale): ProjectEvidence[] {
  return projectEvidence[locale];
}

export function getHiringConversion(locale: ProofLocale): HiringConversion {
  return hiringConversions[locale];
}

export function getRoleFit(locale: ProofLocale): RoleFit {
  return roleFits[locale];
}

export function getHiringPaths(locale: ProofLocale): HiringPath[] {
  return hiringPaths[locale];
}
