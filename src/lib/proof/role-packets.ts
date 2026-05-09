import { getCaseInterviewPack } from "./matrix";
import type {
  CaseInterviewAnswer,
  HiringRoleId,
  ProjectEvidenceSlug,
  ProofLocale,
  RolePacket,
} from "./types";

const actions = {
  en: {
    contact: { label: "Contact Lewis", href: "/contact" },
    resume: { label: "Open resume", href: "/resume" },
  },
  zh: {
    contact: { label: "联系 Lewis", href: "/contact" },
    resume: { label: "查看简历", href: "/resume" },
  },
} as const;

function pickInterviewQuestions(
  locale: ProofLocale,
  picks: Array<[ProjectEvidenceSlug, number]>
): CaseInterviewAnswer[] {
  return picks.map(([slug, index]) => getCaseInterviewPack(slug, locale).answers[index]);
}

function packetBase(
  locale: ProofLocale,
  id: HiringRoleId,
  strongestCases: ProjectEvidenceSlug[]
) {
  return {
    id,
    route: `/hire/${id}`,
    strongestCases,
    primaryAction: actions[locale].contact,
    secondaryAction: actions[locale].resume,
  } as const;
}

const rolePackets: Record<ProofLocale, RolePacket[]> = {
  en: [
    {
      ...packetBase("en", "ux-product", ["connect", "spectra", "circles"]),
      label: "UX/Product Design",
      headline: "Interview Lewis for UX/Product roles that need research to shape product direction.",
      fitThesis:
        "Best fit when the team needs ambiguity framed, evidence turned into product trade-offs, and decisions explained clearly.",
      proofClaims: [
        {
          id: "ux-product-ia",
          claim: "Lewis can turn messy service information into measurable product structure.",
          evidence:
            "UQ Connect reframed a student portal around task success, findability, and student-language labels.",
          boundary:
            "This proves prototype and research-direction quality, not ownership of a university-wide production rollout.",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "Validate at scale with production search logs, support-ticket patterns, and a larger tree test.",
        },
        {
          id: "ux-product-inclusive-tradeoffs",
          claim: "Lewis can make interaction decisions from inclusive constraints instead of visual taste alone.",
          evidence:
            "Spectra Lens used colourblind-user research to choose multi-modal feedback and user-controlled public use.",
          boundary:
            "This is inclusive product direction evidence, not a full accessibility certification across devices.",
          strongestAnchor: "/projects/spectra#decision-timeline",
          nextValidation:
            "Run broader field testing across lighting, distance, device, and colour-vision profiles.",
        },
        {
          id: "ux-product-social-depth",
          claim: "Lewis can resist shallow engagement metrics when the product goal is social wellbeing.",
          evidence:
            "Connect Circles shifted from more matches to small groups, slow matching, and relationship depth.",
          boundary:
            "This proves research framing and product direction, not scaled retention or network effects.",
          strongestAnchor: "/projects/circles#interview-takeaway",
          nextValidation:
            "Test repeated cohort use and measure perceived safety, relationship quality, and belonging over time.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["connect", 0],
        ["spectra", 1],
        ["circles", 0],
      ]),
    },
    {
      ...packetBase("en", "ux-research", ["circles", "connect", "ai"]),
      label: "UX Research",
      headline: "Interview Lewis for research roles that need synthesis to become product direction.",
      fitThesis:
        "Best fit when the role values method choice, synthesis under uncertainty, and honest limits on what the evidence proves.",
      proofClaims: [
        {
          id: "ux-research-ambiguous-social",
          claim: "Lewis can choose methods for ambiguous human problems before the product shape is obvious.",
          evidence:
            "Connect Circles combines interviews, diary study, co-design, and theory synthesis around belonging.",
          boundary:
            "The work defines a defensible product direction, not a validated scaled social network.",
          strongestAnchor: "/projects/circles#evidence-board",
          nextValidation:
            "Run a longitudinal cohort study across arrival stages and cultural cohorts before scale claims.",
        },
        {
          id: "ux-research-ia-validation",
          claim: "Lewis can connect research methods to measurable decision criteria.",
          evidence:
            "UQ Connect uses card sort, tree test, and task analysis to constrain IA decisions with findability evidence.",
          boundary:
            "The metrics show direction and prototype improvement, not live operational impact.",
          strongestAnchor: "/projects/connect#outcome-limits",
          nextValidation:
            "Compare pre/post launch search behavior, task completion, and support demand.",
        },
        {
          id: "ux-research-ai-emotion",
          claim: "Lewis can research emotionally sensitive AI experiences without reducing them to satisfaction scores.",
          evidence:
            "AI Interview Assistant separates confidence, anxiety, feedback timing, and user control.",
          boundary:
            "Short-term confidence is not the same as durable interview performance.",
          strongestAnchor: "/projects/ai#evidence-board",
          nextValidation:
            "Measure repeated-session answer quality, perceived control, and real interview readiness over time.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["circles", 1],
        ["connect", 2],
        ["ai", 2],
      ]),
    },
    {
      ...packetBase("en", "ai-ux", ["ai", "spectra", "connect"]),
      label: "AI UX / Human-AI Interaction",
      headline: "Interview Lewis for AI UX roles where trust, timing, and agency matter.",
      fitThesis:
        "Best fit when the product needs judgment about where AI should intervene, explain itself, or stay quiet.",
      proofClaims: [
        {
          id: "ai-ux-feedback-timing",
          claim: "Lewis can reason about AI intervention timing in stressful workflows.",
          evidence:
            "AI Interview Assistant moved feedback after the session to protect flow, agency, and emotional safety.",
          boundary:
            "The case frames AI interaction quality; it does not prove model accuracy or long-term coaching efficacy.",
          strongestAnchor: "/projects/ai#decision-timeline",
          nextValidation:
            "Test longitudinal practice sessions and compare answer quality, control, and stress across user groups.",
        },
        {
          id: "ai-ux-control-privacy",
          claim: "Lewis can design intelligent assistance around user control and public context.",
          evidence:
            "Spectra Lens prioritized glanceable, user-controlled feedback because public assistive use can feel exposing.",
          boundary:
            "The privacy model is a product direction, not a completed legal or clinical accessibility audit.",
          strongestAnchor: "/projects/spectra#interview-takeaway",
          nextValidation:
            "Field test real public contexts and compare whether assistance reduces or increases user burden.",
        },
        {
          id: "ai-ux-evidence-discipline",
          claim: "Lewis can keep AI claims tied to evidence and visible limits.",
          evidence:
            "The proof system separates claims, anchors, and boundaries instead of presenting AI outcomes as magic.",
          boundary:
            "The portfolio shows interaction judgment, not machine-learning engineering ownership.",
          strongestAnchor: "/projects/ai#outcome-limits",
          nextValidation:
            "Add repeated-session and calibration metrics before making durable performance claims.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["ai", 0],
        ["ai", 1],
        ["spectra", 1],
      ]),
    },
    {
      ...packetBase("en", "accessibility", ["spectra", "connect", "ai"]),
      label: "Accessibility / Inclusive Design",
      headline: "Interview Lewis for inclusive design roles that turn constraints into product behavior.",
      fitThesis:
        "Best fit when the work needs target-user research, accessible interaction choices, and clear validation boundaries.",
      proofClaims: [
        {
          id: "accessibility-multimodal-feedback",
          claim: "Lewis can translate accessibility needs into interaction patterns, not just checklist language.",
          evidence:
            "Spectra Lens uses redundant labels, contrast, and multi-modal cues for colourblind users.",
          boundary:
            "The case is strong inclusive design evidence, not a universal audit across all impairment contexts.",
          strongestAnchor: "/projects/spectra#decision-timeline",
          nextValidation:
            "Broaden participant coverage and test assistive-tech compatibility before compliance claims.",
        },
        {
          id: "accessibility-plain-language",
          claim: "Lewis can improve access through language and information architecture.",
          evidence:
            "UQ Connect replaced staff-facing categories with student-language labels and task-oriented structure.",
          boundary:
            "The IA evidence needs production validation before claiming full service accessibility impact.",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "Test with students using assistive technology and compare support-seeking behavior after launch.",
        },
        {
          id: "accessibility-ai-control",
          claim: "Lewis can protect agency in AI experiences where users may feel judged or exposed.",
          evidence:
            "AI Interview Assistant separates practice, feedback timing, and tone control to reduce pressure.",
          boundary:
            "The design addresses emotional accessibility, not a clinical anxiety intervention.",
          strongestAnchor: "/projects/ai#interview-takeaway",
          nextValidation:
            "Validate with anxious and confident users separately before generalizing the interaction model.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["spectra", 0],
        ["connect", 0],
        ["ai", 0],
      ]),
    },
  ],
  zh: [
    {
      ...packetBase("zh", "ux-product", ["connect", "spectra", "circles"]),
      label: "UX/Product Design",
      headline: "适合需要把研究转成产品方向的 UX/Product 岗位。",
      fitThesis:
        "当团队需要定义模糊问题、把证据转成取舍、并清楚解释产品判断时，这个方向最匹配。",
      proofClaims: [
        {
          id: "ux-product-ia",
          claim: "Lewis 能把混乱的服务信息转成可衡量的产品结构。",
          evidence:
            "UQ Connect 围绕任务成功率、可发现性和学生语言重新组织学生门户。",
          boundary:
            "这证明的是原型和研究方向质量，不等于已经拥有全校级生产上线结果。",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "下一步需要用生产搜索日志、支持请求和更大规模树测试验证。",
        },
        {
          id: "ux-product-inclusive-tradeoffs",
          claim: "Lewis 能从包容性约束出发做交互取舍，而不是只靠视觉偏好。",
          evidence:
            "Spectra Lens 基于色盲用户研究选择多模态反馈和用户可控的公共场景使用方式。",
          boundary:
            "这是包容性产品方向证据，不是覆盖所有设备的完整无障碍认证。",
          strongestAnchor: "/projects/spectra#decision-timeline",
          nextValidation:
            "下一步需要在光线、距离、设备和不同色觉情况中做更广泛场景测试。",
        },
        {
          id: "ux-product-social-depth",
          claim: "当产品目标是社交健康时，Lewis 能抵抗浅层参与指标。",
          evidence:
            "Connect Circles 从更多匹配转向小组、慢匹配和关系深度。",
          boundary:
            "这证明研究定义和产品方向，不证明规模化留存或网络效应。",
          strongestAnchor: "/projects/circles#interview-takeaway",
          nextValidation:
            "下一步需要测试重复 cohort 使用，并衡量安全感、关系质量和归属感。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["connect", 0],
        ["spectra", 1],
        ["circles", 0],
      ]),
    },
    {
      ...packetBase("zh", "ux-research", ["circles", "connect", "ai"]),
      label: "UX Research",
      headline: "适合需要把研究综合转成产品方向的 UX Research 岗位。",
      fitThesis:
        "当岗位重视方法选择、不确定性下的综合，以及清楚说明证据边界时，这个方向最匹配。",
      proofClaims: [
        {
          id: "ux-research-ambiguous-social",
          claim: "Lewis 能在产品形态还不明确时，为复杂人的问题选择研究方法。",
          evidence:
            "Connect Circles 围绕归属感结合访谈、日记研究、共创和理论综合。",
          boundary:
            "这个项目定义了可信的产品方向，不等于验证了规模化社交网络。",
          strongestAnchor: "/projects/circles#evidence-board",
          nextValidation:
            "下一步需要跨到达阶段和文化群体做长期 cohort 研究。",
        },
        {
          id: "ux-research-ia-validation",
          claim: "Lewis 能把研究方法和可衡量的决策标准连接起来。",
          evidence:
            "UQ Connect 用卡片分类、树测试和任务分析约束信息架构决策。",
          boundary:
            "这些指标证明方向和原型改进，不等于已经证明线上运营影响。",
          strongestAnchor: "/projects/connect#outcome-limits",
          nextValidation:
            "下一步需要比较上线前后的搜索行为、任务完成和支持需求。",
        },
        {
          id: "ux-research-ai-emotion",
          claim: "Lewis 能研究情绪敏感的 AI 体验，而不是只看满意度。",
          evidence:
            "AI Interview Assistant 拆分了信心、焦虑、反馈时机和控制感。",
          boundary:
            "短期信心提升不等于长期面试表现提升。",
          strongestAnchor: "/projects/ai#evidence-board",
          nextValidation:
            "下一步需要长期衡量回答质量、控制感和真实面试准备度。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["circles", 1],
        ["connect", 2],
        ["ai", 2],
      ]),
    },
    {
      ...packetBase("zh", "ai-ux", ["ai", "spectra", "connect"]),
      label: "AI UX / Human-AI Interaction",
      headline: "适合重视信任、反馈时机和用户主动权的 AI UX 岗位。",
      fitThesis:
        "当产品需要判断 AI 何时介入、何时解释、何时保持安静时，这个方向最匹配。",
      proofClaims: [
        {
          id: "ai-ux-feedback-timing",
          claim: "Lewis 能判断压力型流程中 AI 介入的时机。",
          evidence:
            "AI Interview Assistant 把反馈移到面试后，以保护流程、主动权和情绪安全。",
          boundary:
            "这个案例证明 AI 交互判断，不证明模型准确率或长期辅导效果。",
          strongestAnchor: "/projects/ai#decision-timeline",
          nextValidation:
            "下一步需要长期练习测试，并比较回答质量、控制感和压力变化。",
        },
        {
          id: "ai-ux-control-privacy",
          claim: "Lewis 能围绕用户控制感和公共场景设计智能辅助。",
          evidence:
            "Spectra Lens 重视 glanceable、用户可控的反馈，因为公共辅助使用可能让人暴露。",
          boundary:
            "隐私模型是产品方向，不是法律或临床无障碍审计。",
          strongestAnchor: "/projects/spectra#interview-takeaway",
          nextValidation:
            "下一步需要在真实公共场景中测试辅助到底降低还是增加用户负担。",
        },
        {
          id: "ai-ux-evidence-discipline",
          claim: "Lewis 能让 AI 体验主张保持证据和边界清晰。",
          evidence:
            "作品集把 claim、anchor 和 boundary 分开，而不是把 AI 结果包装成魔法。",
          boundary:
            "作品集证明交互判断，不证明机器学习工程 ownership。",
          strongestAnchor: "/projects/ai#outcome-limits",
          nextValidation:
            "下一步需要补充重复使用和校准指标，再声称长期表现提升。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["ai", 0],
        ["ai", 1],
        ["spectra", 1],
      ]),
    },
    {
      ...packetBase("zh", "accessibility", ["spectra", "connect", "ai"]),
      label: "Accessibility / Inclusive Design",
      headline: "适合把包容性约束转成产品行为的无障碍与包容性设计岗位。",
      fitThesis:
        "当工作需要目标用户研究、无障碍交互选择和清楚的验证边界时，这个方向最匹配。",
      proofClaims: [
        {
          id: "accessibility-multimodal-feedback",
          claim: "Lewis 能把无障碍需求转成具体交互模式，而不只是 checklist。",
          evidence:
            "Spectra Lens 为色盲用户使用冗余标签、对比和多模态提示。",
          boundary:
            "这个案例是强包容性设计证据，不是所有障碍情境的通用审计。",
          strongestAnchor: "/projects/spectra#decision-timeline",
          nextValidation:
            "下一步需要扩大参与者覆盖，并测试辅助技术兼容性。",
        },
        {
          id: "accessibility-plain-language",
          claim: "Lewis 能通过语言和信息架构提升可访问性。",
          evidence:
            "UQ Connect 用学生语言和任务导向结构替代 staff-facing 分类。",
          boundary:
            "信息架构证据还需要生产验证，才能声称完整服务可访问性影响。",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "下一步需要和使用辅助技术的学生测试，并比较上线后的支持行为。",
        },
        {
          id: "accessibility-ai-control",
          claim: "Lewis 能在可能让用户感到被评价的 AI 体验中保护主动权。",
          evidence:
            "AI Interview Assistant 拆分练习、反馈时机和语气控制来降低压力。",
          boundary:
            "这个设计处理情绪可访问性，不是临床焦虑干预。",
          strongestAnchor: "/projects/ai#interview-takeaway",
          nextValidation:
            "下一步需要分别验证焦虑用户和自信用户，再推广交互模型。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["spectra", 0],
        ["connect", 0],
        ["ai", 0],
      ]),
    },
  ],
};

export function getRolePackets(locale: ProofLocale): RolePacket[] {
  return rolePackets[locale];
}

export function getRolePacket(
  role: HiringRoleId,
  locale: ProofLocale
): RolePacket | undefined {
  return rolePackets[locale].find((packet) => packet.id === role);
}
