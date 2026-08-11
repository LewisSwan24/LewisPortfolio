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
      ...packetBase("en", "ux-product", ["connect", "spectra", "maze"]),
      label: "UX/Product Design",
      headline: "Interview Lewis for UX/Product roles that need research to shape product direction.",
      fitThesis:
        "Best fit when the team needs ambiguity framed, evidence turned into product trade-offs, and decisions explained clearly.",
      proofClaims: [
        {
          id: "ux-product-ia",
          claim: "Lewis lets research change the product, including when that means restarting.",
          evidence:
            "UQ Connect went back to paper mid-build after usability sessions exposed structural navigation defects, then rebuilt twenty-four screens off that sheet.",
          boundary:
            "This shows research-to-decision quality on a course project, not ownership of a shipped product.",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "Connect the backend and re-run the same task chain against live data, with timings and a pass mark set in advance.",
        },
        {
          id: "ux-product-inclusive-tradeoffs",
          claim: "Lewis can make interaction decisions from inclusive constraints instead of visual taste alone.",
          evidence:
            "Spectra Lens took WCAG text-spacing criteria and turned them into four controls a reader can actually reach.",
          boundary:
            "This is inclusive product direction evidence, not a full accessibility certification across devices.",
          strongestAnchor: "/projects/spectra#decision-timeline",
          nextValidation:
            "Put it in front of readers who rely on loose spacing and watch which controls they never touch.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["connect", 0],
        ["spectra", 1],
        ["maze", 0],
      ]),
    },
    {
      ...packetBase("en", "ux-research", ["connect", "spectra", "maze"]),
      label: "UX Research",
      headline: "Interview Lewis for research roles that need synthesis to become product direction.",
      fitThesis:
        "Best fit when the role values method choice, synthesis under uncertainty, and honest limits on what the evidence proves.",
      proofClaims: [
        {
          id: "ux-research-ia-validation",
          claim: "Lewis writes the pass mark before the fieldwork, so a study can come back negative.",
          evidence:
            "UQ Connect set a numeric threshold per hypothesis in advance; the learning cards then record which ones failed, including the assumption that language proficiency was the barrier.",
          boundary:
            "The thresholds were set but never formally scored against the transcripts, so the disconfirmation is qualitative.",
          strongestAnchor: "/projects/connect#outcome-limits",
          nextValidation:
            "Score the transcripts against the stated thresholds and report which hypotheses pass, fail, or remain undecided.",
        },
        {
          id: "ux-research-observation",
          claim: "Lewis can run observation when the setting will not allow clean instrumentation.",
          evidence:
            "MazeRunners was watched across 9 groups and 36 people at a public exhibition; the useful signal was who took the lead and where groups stalled.",
          boundary:
            "The handwritten leaderboard was never archived, so completion times and drop counts do not exist as data.",
          strongestAnchor: "/projects/maze#outcome-limits",
          nextValidation:
            "Log completion time, drops, trap triggers, and rule-learning time so the next run produces a dataset.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["spectra", 1],
        ["connect", 2],
        ["maze", 2],
      ]),
    },
    {
      ...packetBase("en", "ai-ux", ["vigil", "spectra", "connect"]),
      label: "AI UX / Human-AI Interaction",
      headline: "Interview Lewis for AI UX roles where trust, timing, and agency matter.",
      fitThesis:
        "Best fit when the product needs judgment about where AI should intervene, explain itself, or stay quiet.",
      proofClaims: [
        {
          id: "ai-ux-weak-evidence",
          claim: "Lewis can design so a person keeps judging instead of deferring to the model.",
          evidence:
            "Vigil shows the classifier's confidence as deliberately weak evidence, and the build fails if that number ever starts predicting the model's errors.",
          boundary:
            "The interface is built and the protocol is written, but no participants have run it yet.",
          strongestAnchor: "/projects/vigil#decision-timeline",
          nextValidation:
            "Run the five-person hallway test, then a counterbalanced study on whichever question survives it.",
        },
        {
          id: "ai-ux-falsifiable-questions",
          claim: "Lewis can turn a vague trust problem into questions that can be answered with evidence.",
          evidence:
            "Vigil splits over-trust into three questions - how confidence is shown, when the verdict appears, how evidence is presented - each with two working variants and a prediction written before testing.",
          boundary:
            "Predictions are recorded, not confirmed; the case proves the instrument, not the answers.",
          strongestAnchor: "/projects/vigil#evidence-board",
          nextValidation:
            "Compare the recorded predictions against what participants actually do, and report where they were wrong.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["vigil", 0],
        ["vigil", 1],
        ["spectra", 1],
      ]),
    },
    {
      ...packetBase("en", "accessibility", ["spectra", "connect", "maze"]),
      label: "Accessibility / Inclusive Design",
      headline: "Interview Lewis for inclusive design roles that turn constraints into product behavior.",
      fitThesis:
        "Best fit when the work needs accessibility guidance turned into shipped behaviour, with honest limits on what has been validated.",
      proofClaims: [
        {
          id: "accessibility-multimodal-feedback",
          claim: "Lewis can translate accessibility needs into interaction patterns, not just checklist language.",
          evidence:
            "Spectra Lens bundles its font locally so the tool works offline and leaks nothing about what the reader opens.",
          boundary:
            "The case is strong inclusive design evidence, not a universal audit across all impairment contexts.",
          strongestAnchor: "/projects/spectra#decision-timeline",
          nextValidation:
            "Broaden participant coverage and test assistive-tech compatibility before compliance claims.",
        },
        {
          id: "accessibility-plain-language",
          claim: "Lewis treats unclear labels and dead ends as defects, not polish.",
          evidence:
            "UQ Connect's September sessions logged 'Skill swap — not sure what that is' and 'Can I go to the previous page?' as blockers, and the October restructure answered both.",
          boundary:
            "This is language and navigation clarity for a general student audience; it is not an assistive-technology audit.",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "Run the same task chain with screen-reader and keyboard-only users, who were never part of any round.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["spectra", 0],
        ["connect", 0],
        ["vigil", 0],
      ]),
    },
  ],
  zh: [
    {
      ...packetBase("zh", "ux-product", ["connect", "spectra", "maze"]),
      label: "UX/Product Design",
      headline: "适合需要把研究转成产品方向的 UX/Product 岗位。",
      fitThesis:
        "当团队需要定义模糊问题、把证据转成取舍、并清楚解释产品判断时，这个方向最匹配。",
      proofClaims: [
        {
          id: "ux-product-ia",
          claim: "Lewis 会让研究真的改变产品，包括推翻重来。",
          evidence:
            "UQ Connect 在可用性测试暴露出结构性导航缺陷之后，开发中途回到纸上重画，再照着那张纸重建二十四个屏。",
          boundary:
            "这证明的是课程项目里「从研究到决策」的质量，不等于拥有一个已上线产品。",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "把后端接上，用同一条任务链对着真实数据重跑一次，并带上计时与事先写好的及格线。",
        },
        {
          id: "ux-product-inclusive-tradeoffs",
          claim: "Lewis 能从包容性约束出发做交互取舍，而不是只靠视觉偏好。",
          evidence:
            "Spectra Lens 把 WCAG 的文本间距条款，变成了读者真的够得到的四个控件。",
          boundary:
            "这是包容性产品方向证据，不是覆盖所有设备的完整无障碍认证。",
          strongestAnchor: "/projects/spectra#decision-timeline",
          nextValidation:
            "下一步需要在光线、距离、设备和不同色觉情况中做更广泛场景测试。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["connect", 0],
        ["spectra", 1],
        ["maze", 0],
      ]),
    },
    {
      ...packetBase("zh", "ux-research", ["connect", "spectra", "maze"]),
      label: "UX Research",
      headline: "适合需要把研究综合转成产品方向的 UX Research 岗位。",
      fitThesis:
        "当岗位重视方法选择、不确定性下的综合，以及清楚说明证据边界时，这个方向最匹配。",
      proofClaims: [
        {
          id: "ux-research-ia-validation",
          claim: "Lewis 把及格线写在进场之前，让一项研究有可能得出否定结果。",
          evidence:
            "UQ Connect 事先为每条假设定了数字门槛；learning cards 随后记下哪几条没过，包括「语言能力是障碍」这条。",
          boundary:
            "门槛定了，但从未真的拿逐字稿逐条打分，所以这个否定是定性的。",
          strongestAnchor: "/projects/connect#outcome-limits",
          nextValidation:
            "拿逐字稿对照当初写下的门槛逐条打分，报出哪些通过、哪些没过、哪些仍无法判定。",
        },
        {
          id: "ux-research-observation",
          claim: "Lewis 能在无法干净埋点的场合用观察法拿到有用信号。",
          evidence:
            "MazeRunners 在公开展出时被观察了 9 组共 36 人；真正有用的信号是谁自然成为领导者、以及小组在哪一步卡住。",
          boundary:
            "手写排行榜没有留档，所以完成时间和掉球次数根本不存在于数据里。",
          strongestAnchor: "/projects/maze#outcome-limits",
          nextValidation:
            "记录完成时间、掉球、陷阱触发与规则学习时长，让下一次跑完就有数据集。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["spectra", 1],
        ["connect", 2],
        ["maze", 2],
      ]),
    },
    {
      ...packetBase("zh", "ai-ux", ["vigil", "spectra", "connect"]),
      label: "AI UX / Human-AI Interaction",
      headline: "适合重视信任、反馈时机和用户主动权的 AI UX 岗位。",
      fitThesis:
        "当产品需要判断 AI 何时介入、何时解释、何时保持安静时，这个方向最匹配。",
      proofClaims: [
        {
          id: "ai-ux-weak-evidence",
          claim: "Lewis 能把界面设计成让人继续自己判断，而不是顺着模型点下去。",
          evidence:
            "Vigil 把分类器的信心分数刻意做成弱证据；一旦这个数字变得能预测模型哪里错，构建就直接失败。",
          boundary:
            "界面已经做出来、测试脚本也写好了，但还没有受试者跑过。",
          strongestAnchor: "/projects/vigil#decision-timeline",
          nextValidation:
            "先跑五人走廊测试，再针对活下来的那个问题做一次平衡顺序的对照研究。",
        },
        {
          id: "ai-ux-falsifiable-questions",
          claim: "Lewis 能把模糊的信任问题，拆成可以用证据回答的具体问题。",
          evidence:
            "Vigil 把「人会不会过度信任 AI」拆成三个问题：信心怎么显示、结论何时出现、证据怎么摆；每个问题都做了两个能跑的变体，预测在测试之前先写下来。",
          boundary:
            "预测只是记录下来了，还没有被验证；这个案例证明的是测量工具，不是答案。",
          strongestAnchor: "/projects/vigil#evidence-board",
          nextValidation:
            "把记录的预测和受试者的实际行为对照，并如实报告哪些预测错了。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["vigil", 0],
        ["vigil", 1],
        ["spectra", 1],
      ]),
    },
    {
      ...packetBase("zh", "accessibility", ["spectra", "connect", "maze"]),
      label: "Accessibility / Inclusive Design",
      headline: "适合把包容性约束转成产品行为的无障碍与包容性设计岗位。",
      fitThesis:
        "当工作需要目标用户研究、无障碍交互选择和清楚的验证边界时，这个方向最匹配。",
      proofClaims: [
        {
          id: "accessibility-multimodal-feedback",
          claim: "Lewis 能把无障碍需求转成具体交互模式，而不只是 checklist。",
          evidence:
            "Spectra Lens 把字体打包在本地，所以离线能用，也不会泄露读者打开了什么页面。",
          boundary:
            "这个案例是强包容性设计证据，不是所有障碍情境的通用审计。",
          strongestAnchor: "/projects/spectra#decision-timeline",
          nextValidation:
            "下一步需要扩大参与者覆盖，并测试辅助技术兼容性。",
        },
        {
          id: "accessibility-plain-language",
          claim: "Lewis 把「看不懂的标签」和「走不回去的死路」当缺陷处理，不当润色。",
          evidence:
            "UQ Connect 九月的测试把「Skill swap——不知道这是什么」和「我怎么回上一页？」记为阻塞项，十月的结构重画把两者都回答了。",
          boundary:
            "这是面向一般学生的语言与导航清晰度，不是一次辅助技术审计。",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "让屏幕阅读器用户和纯键盘用户跑同一条任务链——他们从来没有出现在任何一轮里。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["spectra", 0],
        ["connect", 0],
        ["vigil", 0],
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
