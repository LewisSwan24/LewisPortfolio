import type { InterviewDecisionRoom, ProofLocale } from "./types";


const sharedInterviewDecisionRoom: InterviewDecisionRoom = {
  brief: {
    eyebrow: "Interview decision room",
    headline: "Why I'll help your team.",
    subhead:
      "A decision page for role fit, strongest proof, interview questions, and honest boundaries.",
    status:
      "UQ Master of Interaction Design candidate in Brisbane. Open to 2026 internships and graduate UX/Product roles.",
    signals: [
      {
        label: "Role fit",
        value: "UX/Product + research-led teams",
        detail:
          "Strongest where ambiguity needs structure, evidence, and product judgment.",
      },
      {
        label: "Proof depth",
        value: "6 end-to-end cases",
        detail:
          "IA, accessibility, AI coaching, social wellbeing, a hardware build, and an AI-oversight study — methods and limits shown.",
      },
      {
        label: "Interview readiness",
        value: "Question routes prepared",
        detail:
          "Each major claim links to a case anchor and a defensible answer route.",
      },
    ],
    primaryAction: { label: "Contact Lewis", href: "/contact" },
    secondaryAction: { label: "Open resume", href: "/resume" },
  },
  evidenceBrief: [
    {
      id: "ia-proof",
      capability: "Information architecture",
      caseSlug: "connect",
      proof:
        "UQ Connect reframed a student portal around task success rather than department ownership.",
      whyItMatters:
        "Shows research-to-structure product judgment for complex service information.",
      href: "/projects/connect#decision-timeline",
    },
    {
      id: "accessibility-proof",
      capability: "Accessibility and inclusive design",
      caseSlug: "spectra",
      proof:
        "Spectra Lens translated colourblind-user research into multi-modal AR feedback.",
      whyItMatters:
        "Shows inclusive constraints becoming interaction behavior instead of a checklist.",
      href: "/projects/spectra#evidence-board",
    },
    {
      id: "ai-trust-proof",
      capability: "AI UX and trust",
      caseSlug: "ai",
      proof:
        "The AI coach moved feedback after the interview to protect agency, timing, and stress.",
      whyItMatters:
        "Shows judgment about where AI should intervene and where it should stay quiet.",
      href: "/projects/ai#decision-timeline",
    },
    {
      id: "social-research-proof",
      capability: "Research framing",
      caseSlug: "circles",
      proof:
        "Connect Circles used interviews, diary study, and theory synthesis to reframe belonging.",
      whyItMatters:
        "Shows ambiguity reduced into a product direction without flattening human context.",
      href: "/projects/circles#evidence-board",
    },
    {
      id: "hardware-proof",
      capability: "Physical computing and build",
      caseSlug: "maze",
      proof:
        "MazeRunners runs on hardware I wired and programmed: sensing, firmware state, haptics, and a browser console in one loop.",
      whyItMatters:
        "Shows the work survives contact with reality, not only with a prototyping tool.",
      href: "/projects/maze#outcome-limits",
    },
    {
      id: "ai-oversight-proof",
      capability: "Human oversight of AI",
      caseSlug: "vigil",
      proof:
        "Vigil makes the classifier's confidence deliberately weak evidence, and fails its own build if that stops being true.",
      whyItMatters:
        "Shows the harder half of AI UX: designing so a person keeps checking rather than deferring.",
      href: "/projects/vigil#decision-timeline",
    },
  ],
  questionBank: [
    {
      id: "product-tradeoff-connect",
      group: "product",
      question: "How did research change the final IA direction?",
      proves: "Research synthesis, trade-off reasoning, and product direction.",
      caseSlug: "connect",
      href: "/projects/connect#evidence-board",
    },
    {
      id: "research-method-circles",
      group: "research",
      question: "How did you choose methods when belonging was still ambiguous?",
      proves: "Method selection, sampling logic, and synthesis under uncertainty.",
      caseSlug: "circles",
      href: "/projects/circles#evidence-board",
    },
    {
      id: "accessibility-feedback-spectra",
      group: "accessibility",
      question: "Why was multi-modal feedback necessary instead of colour labels alone?",
      proves: "Inclusive design judgment and constraint-driven interaction design.",
      caseSlug: "spectra",
      href: "/projects/spectra#decision-timeline",
    },
    {
      id: "ai-intervention-timing",
      group: "ai",
      question: "Where should AI intervene in a stressful interview workflow?",
      proves: "AI trust, agency, timing, and emotional safety reasoning.",
      caseSlug: "ai",
      href: "/projects/ai#decision-timeline",
    },
    {
      id: "validation-limits-connect",
      group: "limits",
      question: "What would you validate before launching the portal IA at scale?",
      proves: "Boundary setting, measurement maturity, and next-step planning.",
      caseSlug: "connect",
      href: "/projects/connect#outcome-limits",
    },
    {
      id: "hardware-constraint-maze",
      group: "product",
      question: "Where did hardware constraints change the interaction, not just the build?",
      proves: "Systems thinking across sensing, firmware, feedback, and safety.",
      caseSlug: "maze",
      href: "/projects/maze#decision-timeline",
    },
  ],
  boundaries: [
    {
      id: "academic-context",
      claim: "The cases prove design judgment and evidence handling.",
      boundary:
        "They should not be treated as proof of large-scale production ownership.",
      validation:
        "I would pair with engineering early to validate delivery constraints.",
      href: "/projects/connect#outcome-limits",
    },
    {
      id: "prototype-metrics",
      claim: "The cases describe methods and decisions, not measured business impact.",
      boundary:
        "Sample sizes were not formally recorded, so I quote what I observed rather than effect sizes.",
      validation:
        "I would define production telemetry before claiming durable product impact.",
      href: "/projects/spectra#outcome-limits",
    },
    {
      id: "scope-of-build",
      claim: "MazeRunners proves I can build and ship a working system.",
      boundary:
        "It is one hand-wired exhibition unit, so it says nothing about manufacturability or long-term durability.",
      validation:
        "I would rebuild on a fabricated harness and measure setup time and sensor drift across venues.",
      href: "/projects/maze#outcome-limits",
    },
  ],
};

const zhInterviewDecisionRoom: InterviewDecisionRoom = {
  brief: {
    eyebrow: "面试决策页",
    headline: "我能怎样帮助你的团队。",
    subhead:
      "用一页看清岗位匹配、最强证据、可追问问题和需要诚实说明的边界。",
    status:
      "昆士兰大学交互设计硕士在读，常驻布里斯班。开放 2026 实习与毕业生 UX / Product 岗位。",
    signals: [
      {
        label: "岗位匹配",
        value: "UX/Product + 研究驱动团队",
        detail:
          "最适合需要结构化模糊问题、证据判断和产品判断的团队。",
      },
      {
        label: "证据深度",
        value: "6 个端到端案例",
        detail:
          "覆盖 IA、无障碍、AI 辅导、社交健康、一台硬件作品，以及一项 AI 监督研究，并展示方法与限制。",
      },
      {
        label: "面试准备度",
        value: "已准备问题路径",
        detail:
          "主要 claim 都能链接到案例锚点和可辩护的回答路径。",
      },
    ],
    primaryAction: { label: "联系 Lewis", href: "/contact" },
    secondaryAction: { label: "查看简历", href: "/resume" },
  },
  evidenceBrief: [
    {
      id: "ia-proof",
      capability: "信息架构",
      caseSlug: "connect",
      proof:
        "UQ Connect 把学生门户从部门归属重构为围绕任务成功的结构。",
      whyItMatters:
        "证明我能把复杂服务信息转成研究驱动的产品结构判断。",
      href: "/projects/connect#decision-timeline",
    },
    {
      id: "accessibility-proof",
      capability: "无障碍与包容性设计",
      caseSlug: "spectra",
      proof:
        "Spectra Lens 把色觉障碍用户研究转化成多模态 AR 反馈。",
      whyItMatters:
        "证明无障碍约束能变成实际交互行为，而不只是 checklist。",
      href: "/projects/spectra#evidence-board",
    },
    {
      id: "ai-trust-proof",
      capability: "AI UX 与信任",
      caseSlug: "ai",
      proof:
        "AI coach 把反馈移到面试之后，以保护用户主动权、节奏和压力边界。",
      whyItMatters:
        "证明我能判断 AI 应该在哪里介入，以及在哪里保持安静。",
      href: "/projects/ai#decision-timeline",
    },
    {
      id: "social-research-proof",
      capability: "研究问题定义",
      caseSlug: "circles",
      proof:
        "Connect Circles 用访谈、日记研究和理论综合重构归属感问题。",
      whyItMatters:
        "证明我能把模糊问题收敛成产品方向，同时不压扁人的语境。",
      href: "/projects/circles#evidence-board",
    },
    {
      id: "hardware-proof",
      capability: "物理计算与实作",
      caseSlug: "maze",
      proof:
        "MazeRunners 跑在我自己接线与编程的硬件上：感测、固件状态、震动反馈与浏览器控制台接在同一个闭环里。",
      whyItMatters:
        "证明这些工作经得起真实世界的碰撞，而不只是经得起原型工具。",
      href: "/projects/maze#outcome-limits",
    },
    {
      id: "ai-oversight-proof",
      capability: "人对 AI 的监督",
      caseSlug: "vigil",
      proof:
        "Vigil 把分类器的信度刻意做成弱证据，而且一旦这个性质失效，它自己的 build 就会挂掉。",
      whyItMatters:
        "证明我做得了 AI UX 里更难的那一半：让人继续复核，而不是顺着它点下去。",
      href: "/projects/vigil#decision-timeline",
    },
  ],
  questionBank: [
    {
      id: "product-tradeoff-connect",
      group: "product",
      question: "研究如何改变最终 IA 方向？",
      proves: "研究综合、取舍推理和产品方向判断。",
      caseSlug: "connect",
      href: "/projects/connect#evidence-board",
    },
    {
      id: "research-method-circles",
      group: "research",
      question: "当归属感问题还很模糊时，你如何选择研究方法？",
      proves: "方法选择、样本逻辑和不确定性下的综合能力。",
      caseSlug: "circles",
      href: "/projects/circles#evidence-board",
    },
    {
      id: "accessibility-feedback-spectra",
      group: "accessibility",
      question: "为什么需要多模态反馈，而不只是颜色标签？",
      proves: "包容性设计判断和约束驱动的交互设计。",
      caseSlug: "spectra",
      href: "/projects/spectra#decision-timeline",
    },
    {
      id: "ai-intervention-timing",
      group: "ai",
      question: "AI 应该在高压力面试流程的哪里介入？",
      proves: "AI 信任、主动权、节奏和情绪安全推理。",
      caseSlug: "ai",
      href: "/projects/ai#decision-timeline",
    },
    {
      id: "validation-limits-connect",
      group: "limits",
      question: "门户 IA 大规模上线前还需要验证什么？",
      proves: "边界意识、测量成熟度和下一步规划。",
      caseSlug: "connect",
      href: "/projects/connect#outcome-limits",
    },
    {
      id: "hardware-constraint-maze",
      group: "product",
      question: "硬件约束在哪些地方改变了交互本身，而不只是改变了实现方式？",
      proves: "跨感测、固件、反馈与安全的系统思考。",
      caseSlug: "maze",
      href: "/projects/maze#decision-timeline",
    },
  ],
  boundaries: [
    {
      id: "academic-context",
      claim: "这些案例证明的是设计判断和证据处理能力。",
      boundary:
        "它们不应被当成大规模生产系统 ownership 的证明。",
      validation:
        "我会尽早和工程配合，验证交付约束。",
      href: "/projects/connect#outcome-limits",
    },
    {
      id: "prototype-metrics",
      claim: "这些案例讲的是方法与决策，不是可量化的业务影响。",
      boundary:
        "样本量没有正式记录，所以我只讲我观察到的现象，不报效应量。",
      validation:
        "在声称长期产品影响前，我会先定义生产 telemetry。",
      href: "/projects/spectra#outcome-limits",
    },
    {
      id: "scope-of-build",
      claim: "MazeRunners 证明我能把一套系统真的做出来并让它运行。",
      boundary:
        "它是一台手工接线的展览单机，不能用来说明可量产性或长期耐久度。",
      validation:
        "我会改用制作好的线束重做一台，并在多个场地测量布置时间与传感器漂移。",
      href: "/projects/maze#outcome-limits",
    },
  ],
};

const interviewDecisionRooms: Record<ProofLocale, InterviewDecisionRoom> = {
  en: sharedInterviewDecisionRoom,
  zh: zhInterviewDecisionRoom,
};


export function getInterviewDecisionRoom(locale: ProofLocale): InterviewDecisionRoom {
  return interviewDecisionRooms[locale];
}
