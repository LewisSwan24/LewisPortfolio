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
        value: "4 end-to-end cases",
        detail:
          "IA, accessibility, AI coaching, and social wellbeing with methods and limits shown.",
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
      id: "measurement-proof",
      capability: "Measurement and validation",
      caseSlug: "connect",
      proof:
        "Findability and task success constrained the IA claim before the interface was polished.",
      whyItMatters:
        "Shows evidence discipline: the claim is tied to measured behavior and stated limits.",
      href: "/projects/connect#outcome-limits",
    },
    {
      id: "communication-proof",
      capability: "Communication and facilitation",
      caseSlug: "circles",
      proof:
        "Co-design workshops and decision framing turned social research into inspectable product choices.",
      whyItMatters:
        "Shows how Lewis can make ambiguous qualitative evidence usable for a team.",
      href: "/projects/circles#interview-takeaway",
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
      id: "manager-followup-spectra",
      group: "product",
      question: "How did privacy and public context change the AR product direction?",
      proves: "Product judgment beyond visual craft.",
      caseSlug: "spectra",
      href: "/projects/spectra#interview-takeaway",
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
      claim: "Measured outcomes show direction and learning quality.",
      boundary:
        "Some metrics are study or prototype metrics, not post-launch business metrics.",
      validation:
        "I would define production telemetry before claiming durable product impact.",
      href: "/projects/spectra#outcome-limits",
    },
    {
      id: "ai-long-term-confidence",
      claim: "The AI work shows trust-aware interaction decisions.",
      boundary:
        "First-use confidence is not the same as long-term coaching efficacy.",
      validation:
        "I would run longitudinal validation before claiming durable behavior change.",
      href: "/projects/ai#outcome-limits",
    },
    {
      id: "accessibility-audit-scope",
      claim: "The accessibility case shows inclusive design direction.",
      boundary:
        "It is not a universal audit across every impairment, environment, or device.",
      validation:
        "I would broaden participant coverage and assistive-tech review before final compliance claims.",
      href: "/projects/spectra#evidence-board",
    },
    {
      id: "social-product-scale",
      claim: "Connect Circles shows depth-first product framing.",
      boundary:
        "It does not yet prove network effects, retention, or scaled community health.",
      validation:
        "I would validate repeated cohort use before optimizing growth mechanics.",
      href: "/projects/circles#outcome-limits",
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
        value: "4 个端到端案例",
        detail:
          "覆盖 IA、无障碍、AI 辅导和社交健康，并展示方法与限制。",
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
      id: "measurement-proof",
      capability: "测量与验证",
      caseSlug: "connect",
      proof:
        "可发现性和任务成功率在视觉 polish 前约束了 IA claim。",
      whyItMatters:
        "证明 claim 绑定到行为证据和明确限制，而不是只靠叙事。",
      href: "/projects/connect#outcome-limits",
    },
    {
      id: "communication-proof",
      capability: "沟通与引导",
      caseSlug: "circles",
      proof:
        "共创工作坊和决策框架把社交研究转成可检查的产品选择。",
      whyItMatters:
        "证明我能让模糊的定性证据变成团队可使用的判断材料。",
      href: "/projects/circles#interview-takeaway",
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
      id: "manager-followup-spectra",
      group: "product",
      question: "隐私和公共场景如何改变 AR 产品方向？",
      proves: "超越视觉 craft 的产品判断。",
      caseSlug: "spectra",
      href: "/projects/spectra#interview-takeaway",
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
      claim: "量化结果证明方向和学习质量。",
      boundary:
        "部分指标来自研究或原型测试，不是上线后的业务指标。",
      validation:
        "在声称长期产品影响前，我会先定义生产 telemetry。",
      href: "/projects/spectra#outcome-limits",
    },
    {
      id: "ai-long-term-confidence",
      claim: "AI 案例证明的是信任敏感的交互判断。",
      boundary:
        "首次使用的信心提升不等于长期 coaching 效果。",
      validation:
        "在声称长期行为改变前，需要做纵向验证。",
      href: "/projects/ai#outcome-limits",
    },
    {
      id: "accessibility-audit-scope",
      claim: "无障碍案例证明的是包容性设计方向。",
      boundary:
        "它不是覆盖所有障碍类型、环境或设备的通用审计。",
      validation:
        "最终合规 claim 前，需要扩大参与者覆盖并做辅助技术 review。",
      href: "/projects/spectra#evidence-board",
    },
    {
      id: "social-product-scale",
      claim: "Connect Circles 证明的是深度优先的产品框架。",
      boundary:
        "它还没有证明网络效应、留存或规模化社区健康。",
      validation:
        "优化增长机制前，需要验证重复 cohort 使用。",
      href: "/projects/circles#outcome-limits",
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
