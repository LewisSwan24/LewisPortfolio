import type { InterviewDecisionRoom, ProofLocale } from "./types";
import { isUnlistedProject } from "../project-routes";

const sharedInterviewDecisionRoom: InterviewDecisionRoom = {
  brief: {
    eyebrow: "Hiring overview",
    headline: "How I work across research and interaction.",
    subhead:
      "A quick guide to role fit, core interaction cases, interview prompts, and project scope.",
    status:
      "UQ Master of Interaction Design candidate in Brisbane, graduating November 2026. Open to full-time graduate UX, Product, and Interaction Design roles.",
    signals: [
      {
        label: "Role fit",
        value: "Interaction, UX & Product teams",
        detail:
          "Strongest where ambiguous problem spaces need information architecture, rapid prototyping, and research synthesis.",
      },
      {
        label: "Case depth",
        value: "Live interactive builds",
        detail:
          "UQ Connect, MazeRunners, Hoop Dream, PriceWise, Walkie, Fencepost, and Grassland open straight into interactive demos and research records.",
      },
      {
        label: "Decision trail",
        value: "Documented trade-offs",
        detail:
          "Every case connects design claims directly to usability findings, revised architecture, and realistic next steps.",
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
        "UQ Connect stopped mid-build and redrew the whole app as five screens on paper, with every route off the home page.",
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
        "Hoop Dream established visual standards before generation began—using art bibles, rejected-style criteria, and manual side-by-side audits across six asset batches.",
      whyItMatters:
        "Shows clear visual direction and knowing where script checks stop and human taste takes over.",
      href: "/projects/hoop#decision-timeline",
    },
    {
      id: "realtime-interaction-proof",
      capability: "Complex, real-time interaction",
      caseSlug: "grassland",
      proof:
        "Grassland Iron Tide preserves a single intuitive command grammar across five real-time missions and restores checkpoints from one state chain.",
      whyItMatters:
        "Shows interaction models designed to stay learnable under time pressure, verified through full desktop playthroughs.",
      href: "/projects/grassland#decision-timeline",
    },
    {
      id: "ai-output-review-proof",
      capability: "Reviewing what AI tools build",
      caseSlug: "onthebeat",
      proof:
        "On The Beat's code was written by Claude Code. I caught mock data posing as a real match, a link that needed my laptop and a canvas that counted wrong, then checked the fixes on two real wristbands.",
      whyItMatters:
        "Shows the part of AI-assisted work that stays with the designer: deciding what done means.",
      href: "/projects/onthebeat#decision-timeline",
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
      question: "How do you keep a large batch of generated art feeling like one cohesive world?",
      proves: "Art direction, written criteria, and human visual review.",
      caseSlug: "hoop",
      href: "/projects/hoop#decision-timeline",
    },
    {
      id: "command-grammar-grassland",
      group: "product",
      question: "How do you keep a command system predictable across five missions?",
      proves: "Interaction rules, consistency across missions, and knowing what a test can hold.",
      caseSlug: "grassland",
      href: "/projects/grassland#decision-timeline",
    },
    {
      id: "ai-review-onthebeat",
      group: "limits",
      question: "The code was written by Claude Code. What was your part?",
      proves: "Requirement setting, AI output review, and an honest authorship line.",
      caseSlug: "onthebeat",
      href: "/projects/onthebeat#outcome-limits",
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
      // Pointed at Spectra Lens until it was unlisted (2026-11-20).
      href: "/projects/pricewise#outcome-limits",
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
    eyebrow: "招聘速览",
    headline: "我如何把研究推进到真实交互。",
    subhead:
      "把岗位契合度、关键交互决策、可追问的设计问题和项目真实边界收在一页，方便面试前快速浏览。",
    status:
      "昆士兰大学交互设计硕士在读（2026 年 11 月毕业），常驻布里斯班。正在寻找全职交互设计、UX / 产品设计毕业生岗位。",
    signals: [
      {
        label: "岗位契合",
        value: "交互 / 产品设计 & 研究驱动团队",
        detail:
          "尤其擅长在定义模糊的早期阶段，理清信息架构、做低成本高信噪比原型并用调研推动取舍。",
      },
      {
        label: "作品落点",
        value: "可交互的真实原型",
        detail:
          "UQ Connect、MazeRunners、Walkie、Fencepost 与草原铁潮均提供可上手体验的版本，记录了设计动机与演进取舍。",
      },
      {
        label: "推理链条",
        value: "决策有迹可循",
        detail:
          "每项能力结论都对应具体案例片段，看得到方案为什么改、改了哪里，以及当前未覆盖的验证范围。",
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
        "UQ Connect 在开发中途停下来，把整个应用在纸上重画成五个屏，并画出从首页出发的每条路径。",
      whyItMatters:
        "证明我遇到结构层面的缺陷，会用结构去回答，而不是打补丁。",
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
        "Vigil 把分类器的置信度刻意做成弱证据，而且一旦这一点失效，Vigil 自己的 build 就会挂掉。",
      whyItMatters:
        "证明我做得了 AI UX 里更难的那一半：让人继续复核，而不是顺着模型点下去。",
      href: "/projects/vigil#decision-timeline",
    },
    {
      id: "generative-pipeline-proof",
      capability: "视觉与系统一致性",
      caseSlug: "hoop",
      proof:
        "Hoop Dream 在批量生成素材之前先制定视觉圣经与禁用清单，并逐批做对照走查，避免风格越做越散。",
      whyItMatters:
        "体现设计规范如何在大量生成素材中守住叙事氛围，也区分了脚本校验与审美把关各自的分工。",
      href: "/projects/hoop#decision-timeline",
    },
    {
      id: "realtime-interaction-proof",
      capability: "高密度即时交互",
      caseSlug: "grassland",
      proof:
        "草原铁潮五道关卡共用同一套选中与指令语法，失败时沿着统一状态链回滚到检查点。",
      whyItMatters:
        "在多单位并行与倒计时压力下，玩家学会的操作语法跨关卡保持一致，不需要重复摸索。",
      href: "/projects/grassland#decision-timeline",
    },
    {
      id: "ai-output-review-proof",
      capability: "审查 AI 工具做出来的东西",
      caseSlug: "onthebeat",
      proof: "On The Beat 的代码由 Claude Code 编写。我抓出了冒充真配对的模拟数据、离不开我笔电的链路和数错的画布，再在两支真手环上核对修复。",
      whyItMatters: "说明 AI 辅助开发里留给设计者的那部分：决定什么才算做完。",
      href: "/projects/onthebeat#decision-timeline",
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
      question: "怎么让注入的样式赢过网站，又不把原本的布局撑坏？",
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
      question: "大批量生成的素材，怎么保持看起来来自同一个世界？",
      proves: "视觉规范定义、成文标准与人工审美走查。",
      caseSlug: "hoop",
      href: "/projects/hoop#decision-timeline",
    },
    {
      id: "command-grammar-grassland",
      group: "product",
      question: "五关下来，怎么让命令系统保持可预测？",
      proves: "交互规则、跨关卡的一致性，以及分清测试守得住什么。",
      caseSlug: "grassland",
      href: "/projects/grassland#decision-timeline",
    },
    {
      id: "ai-review-onthebeat",
      group: "limits",
      question: "代码是 Claude Code 写的，你做了什么？",
      proves: "定需求、审查 AI 输出，以及讲清分工。",
      caseSlug: "onthebeat",
      href: "/projects/onthebeat#outcome-limits",
    },
  ],
  boundaries: [
    {
      id: "academic-context",
      claim: "这些案例证明的是设计判断和证据处理能力。",
      boundary:
        "别把这些案例当成大规模生产系统 ownership 的证明。",
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
      href: "/projects/pricewise#outcome-limits",
    },
    {
      id: "scope-of-build",
      claim: "MazeRunners 证明我能把一套系统真的做出来并跑起来。",
      boundary:
        "这是一台手工接线的展览单机，说明不了能不能量产，也说明不了能用多久。",
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


// Entries pointing at an unlisted case stay in the tables above but are not
// shown: /hire is one of the pages that no longer links to it.
export function getInterviewDecisionRoom(locale: ProofLocale): InterviewDecisionRoom {
  const room = interviewDecisionRooms[locale];
  return {
    ...room,
    evidenceBrief: room.evidenceBrief.filter((item) => !isUnlistedProject(item.caseSlug)),
    questionBank: room.questionBank.filter((item) => !isUnlistedProject(item.caseSlug)),
  };
}
