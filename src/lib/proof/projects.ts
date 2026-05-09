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
        value: "240+",
        label: "research participants",
        detail: "Surveys, interviews, tree tests, diary studies, usability sessions, and workshops.",
      },
      {
        value: "4",
        label: "end-to-end case studies",
        detail: "Information architecture, accessibility, AI coaching, and social wellbeing.",
      },
      {
        value: "3",
        label: "measured outcome stories",
        detail: "Findability, task success, confidence, anxiety, and satisfaction metrics.",
      },
      {
        value: "2026",
        label: "career focus",
        detail: "Internship, graduate UX, product design, or research-led product teams.",
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
        value: "240+",
        label: "研究参与者",
        detail: "覆盖问卷、访谈、树测试、日记研究、可用性测试与共创工作坊。",
      },
      {
        value: "4",
        label: "端到端案例",
        detail: "信息架构、无障碍、AI 面试辅导与国际学生社交健康。",
      },
      {
        value: "3",
        label: "量化结果案例",
        detail: "包含可发现性、任务成功率、信心、焦虑与满意度指标。",
      },
      {
        value: "2026",
        label: "求职方向",
        detail: "实习、毕业生 UX、产品设计或研究驱动型产品团队。",
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
      summary: "I restructure messy systems around user mental models and measurable findability.",
      proof: "UQ Connect improved findability from 58% to 84% through tree testing and plain-language IA.",
      href: "/projects/connect",
    },
    {
      id: "accessibility",
      title: "Accessibility and inclusion",
      summary: "I design with the target group, not merely for them, and test in realistic contexts.",
      proof: "Spectra Lens raised task success from 75% to 92% with colourblind users.",
      href: "/projects/spectra",
    },
    {
      id: "ai-ux",
      title: "AI interaction design",
      summary: "I design AI as a relationship: expectation-setting, control, feedback timing, and trust.",
      proof: "AI Interview Assistant increased confidence by 84% while reducing reported anxiety.",
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
      summary: "我围绕用户心智模型重组复杂系统，并用可发现性指标验证。",
      proof: "UQ Connect 通过树测试与普通语言命名，把可发现性从 58% 提升到 84%。",
      href: "/projects/connect",
    },
    {
      id: "accessibility",
      title: "无障碍与包容性",
      summary: "我和目标用户一起设计，并在真实场景中测试。",
      proof: "Spectra Lens 与色盲用户共创，将任务成功率从 75% 提升到 92%。",
      href: "/projects/spectra",
    },
    {
      id: "ai-ux",
      title: "AI 交互设计",
      summary: "我把 AI 体验看成关系设计：预期、控制、反馈时机与信任。",
      proof: "AI Interview Assistant 让用户信心提升 84%，同时降低自报焦虑。",
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
      sample: "24 card-sort participants, 50 tree-test participants, 10 task-analysis sessions",
      outcome: "Findability 58% to 84%, task success 72% to 94%, SUS 61 to 78.",
      proves: "I can diagnose IA breakdowns and turn research into measurable navigation improvements.",
    },
    {
      slug: "spectra",
      href: "/projects/spectra",
      problemType: "Accessibility and AR decision support",
      challenge: "Colourblind users needed fast, private interpretation of colour-dependent information in public environments.",
      methods: ["semi-structured interviews", "heuristic review", "co-design", "field usability testing"],
      sample: "12 interviewees, 5 competitor tools, 2 workshops, 8 usability-test participants",
      outcome: "Task success 75% to 92%, 3.1 second average recognition, 4.2/5 satisfaction.",
      proves: "I can design inclusive interaction patterns with target users and validate them in context.",
    },
    {
      slug: "ai",
      href: "/projects/ai",
      problemType: "AI coaching and emotionally sensitive product design",
      challenge: "Job seekers needed realistic interview practice without the social pressure that makes practice feel unsafe.",
      methods: ["survey", "depth interviews", "competitive teardown", "prototype test", "A/B feedback timing"],
      sample: "85 survey responses, 15 interviews, 6 competitor reviews, 12 usability sessions, 50 beta users",
      outcome: "84% confidence gain, 28% anxiety reduction, 4.5/5 satisfaction.",
      proves: "I can design AI interactions around trust, control, expectation setting, and emotional pacing.",
    },
    {
      slug: "circles",
      href: "/projects/circles",
      problemType: "Social wellbeing and research-through-design",
      challenge: "International students wanted deeper friendship, while most social apps optimize for more matches and more messages.",
      methods: ["depth interviews", "diary study", "co-design workshops", "concept synthesis"],
      sample: "15 interviews across cultural cohorts, 8 diary-study participants, 3 co-design workshops",
      outcome: "Research complete; prototype direction defined around slow matching, small groups, and shared vulnerability.",
      proves: "I can handle ambiguous social problems, synthesize academic theory, and resist shallow growth metrics.",
    },
  ],
  zh: [
    {
      slug: "connect",
      href: "/projects/connect",
      problemType: "高频学生门户的信息架构重组",
      challenge: "学生找不到关键任务，因为门户按照部门归属组织，而不是按照学生心智模型组织。",
      methods: ["开放式卡片分类", "树测试", "任务分析", "普通语言审查"],
      sample: "24 名卡片分类参与者、50 名树测试参与者、10 场任务分析",
      outcome: "可发现性 58% 到 84%，任务成功率 72% 到 94%，SUS 61 到 78。",
      proves: "证明我能诊断 IA 断点，并把研究转化成可衡量的导航改进。",
    },
    {
      slug: "spectra",
      href: "/projects/spectra",
      problemType: "无障碍与 AR 决策辅助",
      challenge: "色盲用户需要在公共环境中快速、私密地理解依赖颜色的信息。",
      methods: ["半结构访谈", "竞品启发式评估", "共创", "真实场景可用性测试"],
      sample: "12 名受访者、5 个竞品工具、2 场工作坊、8 名可用性测试参与者",
      outcome: "任务成功率 75% 到 92%，平均识别 3.1 秒，满意度 4.2/5。",
      proves: "证明我能和目标用户一起设计包容性互动，并在真实场景中验证。",
    },
    {
      slug: "ai",
      href: "/projects/ai",
      problemType: "AI 辅导与情绪敏感型产品设计",
      challenge: "求职者需要真实面试练习，但又不想承受被观看与被评价的社交压力。",
      methods: ["问卷", "深度访谈", "竞品拆解", "原型测试", "反馈时机 A/B 测试"],
      sample: "85 份问卷、15 场访谈、6 个竞品、12 场可用性测试、50 名 beta 用户",
      outcome: "信心提升 84%，焦虑降低 28%，满意度 4.5/5。",
      proves: "证明我能围绕信任、控制感、预期与情绪节奏设计 AI 体验。",
    },
    {
      slug: "circles",
      href: "/projects/circles",
      problemType: "社交健康与研究型产品探索",
      challenge: "国际学生想要更深的友谊，而大多数社交产品优化的是更多匹配和更多消息。",
      methods: ["深度访谈", "日记研究", "共创工作坊", "概念综合"],
      sample: "跨文化群体 15 场访谈、8 名日记研究参与者、3 场共创工作坊",
      outcome: "研究完成；原型方向围绕慢匹配、小组关系与共享脆弱性展开。",
      proves: "证明我能处理模糊的社会问题，综合学术理论，并抵抗浅层增长指标。",
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
        value: "240+",
        label: "research participants",
        detail: "Across surveys, interviews, card sorts, tree testing, diary studies, and usability sessions.",
      },
      {
        value: "4",
        label: "end-to-end cases",
        detail: "Information architecture, accessibility, AI feedback, and social wellbeing product directions.",
      },
      {
        value: "3",
        label: "measured outcome stories",
        detail: "Findability, task success, recognition confidence, anxiety, and satisfaction signals.",
      },
      {
        value: "2026",
        label: "availability",
        detail: "Open to internships, graduate roles, and research-led UX/Product Design teams.",
      },
    ],
    proofRoutes: [
      {
        audience: "IA / service complexity",
        title: "Information architecture and research rigor",
        claim:
          "Best proof that I can restructure a complex student service around user mental models.",
        evidence:
          "UQ Connect links task analysis, card sorting, tree testing, and findability outcomes.",
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
      headline: "Research-led UX/Product Designer for teams that need evidence before polish.",
      subhead:
        "I turn ambiguous product problems into tested information architecture, inclusive interactions, AI feedback flows, and social wellbeing concepts.",
      status:
        "Open to 2026 internships and graduate UX/Product Design roles in research-led product teams.",
    },
    signals: [
      {
        value: "240+",
        label: "research participants",
        detail: "Across surveys, interviews, card sorts, tree testing, diary studies, and usability sessions.",
      },
      {
        value: "4",
        label: "end-to-end cases",
        detail: "Information architecture, accessibility, AI feedback, and social wellbeing product directions.",
      },
      {
        value: "3",
        label: "measured outcome stories",
        detail: "Findability, task success, recognition confidence, anxiety, and satisfaction signals.",
      },
      {
        value: "2026",
        label: "availability",
        detail: "Open to internships, graduate roles, and research-led UX/Product Design teams.",
      },
    ],
    proofRoutes: [
      {
        audience: "IA / service complexity",
        title: "Information architecture and research rigor",
        claim:
          "Best proof that I can restructure a complex student service around user mental models.",
        evidence:
          "UQ Connect links task analysis, card sorting, tree testing, and findability outcomes.",
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
