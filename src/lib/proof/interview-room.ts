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
        value: "5 end-to-end cases",
        detail:
          "IA, an accessibility extension, a hardware build, an AI-oversight study, and a generative production pipeline — methods and limits shown.",
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
        "UQ Connect stopped mid-build and redrew twenty-four screens as five on paper, with every route off the home page.",
      whyItMatters:
        "Shows a designer willing to answer a structural defect with structure, not with patches.",
      href: "/projects/connect#decision-timeline",
    },
    {
      id: "accessibility-proof",
      capability: "Accessibility and inclusive design",
      caseSlug: "spectra",
      proof:
        "Spectra Lens turns WCAG text-spacing guidance into a browser extension that works on pages I do not control.",
      whyItMatters:
        "Shows inclusive constraints becoming interaction behavior instead of a checklist.",
      href: "/projects/spectra#evidence-board",
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
    {
      id: "generative-pipeline-proof",
      capability: "Design systems at generated scale",
      caseSlug: "hoop",
      proof:
        "Hoop Dream held 299 generated assets to one written art bible through a style gate with an explicit rejected-style list.",
      whyItMatters:
        "Shows consistency enforced by a process rather than by taste applied one asset at a time.",
      href: "/projects/hoop#decision-timeline",
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
      id: "accessibility-feedback-spectra",
      group: "accessibility",
      question: "How do you make injected styles win without breaking someone else's layout?",
      proves: "Inclusive design judgment and constraint-driven interaction design.",
      caseSlug: "spectra",
      href: "/projects/spectra#decision-timeline",
    },
    {
      id: "validation-limits-connect",
      group: "limits",
      question: "The MVP runs on mock data. What does that mean you have not proven?",
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
    {
      id: "pipeline-consistency-hoop",
      group: "product",
      question: "How do you keep hundreds of generated assets looking like one world?",
      proves: "Process design, written standards, and reviewing at scale.",
      caseSlug: "hoop",
      href: "/projects/hoop#decision-timeline",
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
        "The before-and-after outcomes were never formally measured, so I quote methods and observations rather than effect sizes.",
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
        value: "5 个端到端案例",
        detail:
          "覆盖 IA、一个无障碍扩展、一台硬件作品、一项 AI 监督研究，以及一条生成式生产管线，并展示方法与限制。",
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
        "UQ Connect 在开发中途停下来，在纸上把二十四个屏重画成五个，并画出从首页出发的每条路径。",
      whyItMatters:
        "证明我面对结构性缺陷会用结构去回答，而不是打补丁。",
      href: "/projects/connect#decision-timeline",
    },
    {
      id: "accessibility-proof",
      capability: "无障碍与包容性设计",
      caseSlug: "spectra",
      proof:
        "Spectra Lens 把 WCAG 的文本间距准则做成了一个扩展，跑在我控制不了的页面上。",
      whyItMatters:
        "证明无障碍约束能变成实际交互行为，而不只是 checklist。",
      href: "/projects/spectra#evidence-board",
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
        "Vigil 把分类器的置信度刻意做成弱证据，而且一旦这个性质失效，它自己的 build 就会挂掉。",
      whyItMatters:
        "证明我做得了 AI UX 里更难的那一半：让人继续复核，而不是顺着它点下去。",
      href: "/projects/vigil#decision-timeline",
    },
    {
      id: "generative-pipeline-proof",
      capability: "规模化生产中的一致性",
      caseSlug: "hoop",
      proof:
        "Hoop Dream 靠一份成文美术规范和一道带「拒绝清单」的风格闸门，把 299 张生成资产收在同一种风格里。",
      whyItMatters:
        "证明一致性可以由流程守住，而不是靠一张一张凭手感盯。",
      href: "/projects/hoop#decision-timeline",
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
      id: "accessibility-feedback-spectra",
      group: "accessibility",
      question: "怎么让注入的样式赢过网站，又不把它的布局撑坏？",
      proves: "包容性设计判断和约束驱动的交互设计。",
      caseSlug: "spectra",
      href: "/projects/spectra#decision-timeline",
    },
    {
      id: "validation-limits-connect",
      group: "limits",
      question: "MVP 跑在 mock 数据上。这意味着你没有证明什么？",
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
    {
      id: "pipeline-consistency-hoop",
      group: "product",
      question: "几百张生成的资产，怎么让它们看起来像同一个世界？",
      proves: "流程设计、成文标准，以及大规模审查。",
      caseSlug: "hoop",
      href: "/projects/hoop#decision-timeline",
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
        "前后对比的结果从来没有正式测量过，所以我只讲方法和观察到的现象，不报效应量。",
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
