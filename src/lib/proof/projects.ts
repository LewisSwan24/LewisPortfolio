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
    headline: "Research-led UX designer turning ambiguity into tested product direction.",
    summary:
      "I am looking for UX/Product Design internships and graduate roles where research changes the product, not just the slide deck.",
    status: "UQ Master of Interaction Design candidate, Brisbane. Open to 2026 internships and graduate UX roles.",
    stats: [
      {
        value: "5",
        label: "end-to-end cases",
        detail:
          "Information architecture, accessibility, AI coaching, social wellbeing, and a physical interaction system.",
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
    headline: "研究驱动的 UX 设计师，把模糊问题变成可测试、可交付的产品方向。",
    summary:
      "我正在寻找 UX / Product Design 实习与毕业生岗位，尤其适合研究真的会影响产品决策的团队。",
    status: "昆士兰大学交互设计硕士在读，布里斯班。开放 2026 实习与毕业生 UX 岗位。",
    stats: [
      {
        value: "5",
        label: "端到端案例",
        detail: "信息架构、无障碍、AI 面试辅导、国际学生社交健康，以及一个软硬件结合的互动系统。",
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
      methods: ["固件状态机", "传感器去抖与冷却调校", "触觉反馈设计", "Web Serial 控制台", "固件与网页行为一致性的回归测试"],
      sample:
        "已完成搭建并展出。Arduino Mega、10 个 FC-51 红外传感器、TM1637 计分与计时显示、继电器驱动的震动马达、RGB 灯带、舵机，以及一个浏览器控制台；在公开展览的多人游玩中验证。",
      outcome:
        "这是一套真的能跑的系统，不是效果图：球经过传感器，回合状态推进，计分、计时、震动、灯光、音效与浏览器控制台同步更新。出于安全考虑，用震动取代了原本的电击方案。",
      proves:
        "证明我能把一个交互想法一路做到固件，再接回浏览器界面，并在真实硬件上做校准与安全取舍。",
    },
  ],
};


const hiringConversions: Record<ProofLocale, HiringConversion> = {
  en: {
    hero: {
      headline: "Research-led UX/Product Designer for teams that need evidence before polish.",
      subhead:
        "I turn ambiguous product problems into tested information architecture, inclusive interactions, AI feedback flows, and social wellbeing concepts.",
      status:
        "Open to 2026 internships and graduate UX/Product Design roles in research-led product teams.",
    },
    signals: [
      {
        value: "5",
        label: "end-to-end cases",
        detail:
          "Information architecture, accessibility, AI feedback, social wellbeing, and a physical interaction system.",
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
        title: "AI UX and feedback timing",
        claim:
          "Best proof that I can design AI assistance with user control, emotional safety, and useful feedback timing.",
        evidence:
          "AI Interview Assistant focuses on post-session feedback, tone control, anxiety reduction, and trust boundaries.",
        href: "/projects/ai#interviewer-scan",
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
      headline: "先找证据，再做精细化：研究驱动的 UX / 产品设计师。",
      subhead:
        "我把模糊的产品问题，转化为经过验证的信息架构、包容性交互、AI 反馈流程与社交健康产品方向。",
      status:
        "开放 2026 实习与毕业生 UX / 产品设计岗位，期待研究驱动的产品团队。",
    },
    signals: [
      {
        value: "5",
        label: "端到端案例",
        detail: "涵盖信息架构、无障碍、AI 反馈、社交健康，以及一个软硬件结合的互动系统。",
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
        title: "AI UX 与反馈时机",
        claim:
          "证明我能兼顾用户控制、情绪安全与有效反馈时机来设计 AI 辅助体验。",
        evidence:
          "AI 面试助手聚焦会后反馈、语气控制、焦虑缓解与信任边界。",
        href: "/projects/ai#interviewer-scan",
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
