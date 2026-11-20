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
            "UQ Connect went back to paper mid-build after usability sessions exposed structural navigation defects, then rebuilt the app off that sheet.",
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
      ...packetBase("en", "ai-ux", ["pricewise", "onthebeat", "connect"]),
      label: "AI UX / Human-AI Interaction",
      headline: "Interview Lewis for AI UX roles that need someone to check how far an AI feature can be trusted.",
      fitThesis:
        "Best fit when a team needs someone to judge how far an AI feature should be trusted, and to check what it actually does.",
      // Rebuilt on 2026-09-28 from the /hire thread (ai-trust-thread.ts) after
      // Vigil, the only AI-native case, was abandoned. Both claims name who
      // did the work and where the evidence stops.
      thread: { label: "Read the AI and trust thread", href: "/hire#ai-trust-thread" },
      proofClaims: [
        {
          id: "ai-ux-verify-ai-output",
          claim: "Lewis checks what AI-built features actually do before trusting a green build.",
          evidence:
            "Codex and Claude Code wrote the implementation; Lewis wrote the specs, reviewed the code and verified the behaviour. Build, type-check and the full test suite all passed, and four classes of defect were still in the code.",
          boundary:
            "PriceWise runs on demo data with zero registered users, and the unmatched fallback is a decision, not a shipped feature.",
          strongestAnchor: "/projects/pricewise#decision-timeline",
          nextValidation:
            "I would put it in front of five people using their own receipts, and turn the manual verification into a build gate.",
        },
        // Took Perception Gap Mapper's place when it was unlisted (2026-11-20).
        {
          id: "ai-ux-review-ai-output",
          claim: "Lewis sends back AI output that only looks finished, and checks it on real devices.",
          evidence:
            "Claude Code wrote and flashed On The Beat's firmware and app. Lewis set the requirements and caught what the generated version had not done: MEET was mock data, nothing ran without his laptop, and the design canvas showed all four cards as '1 of 4'.",
          boundary:
            "No participant has tested the app; the checks were Lewis's own, on two real wristbands and two local test windows.",
          strongestAnchor: "/projects/onthebeat#decision-timeline",
          nextValidation:
            "Participant sessions at a real or staged gig, and wearing the bands to measure the timing values that are still estimates.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["pricewise", 0],
        ["pricewise", 1],
        ["onthebeat", 0],
      ]),
    },
    {
      ...packetBase("en", "accessibility", ["spectra", "connect", "maze"]),
      label: "Accessibility / Inclusive Design",
      headline: "Interview Lewis for inclusive design roles that turn constraints into product behavior.",
      fitThesis:
        "Best fit when the work needs accessibility guidance turned into working behaviour, with honest limits on what has been validated.",
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
            "UQ Connect 在可用性测试暴露出导航结构上的缺陷之后，开发中途回到纸上重画，再照着那张纸把整个应用重建了一遍。",
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
      ...packetBase("zh", "ai-ux", ["pricewise", "onthebeat", "connect"]),
      label: "AI UX / Human-AI Interaction",
      headline: "适合需要有人判断 AI 功能能信到什么程度的 AI UX 岗位。",
      fitThesis:
        "适合这样的团队：需要有人判断一个 AI 功能值得多少信任，也需要有人去核实这个功能实际做了什么。",
      thread: { label: "看 AI 与信任这条线", href: "/hire#ai-trust-thread" },
      proofClaims: [
        {
          id: "ai-ux-verify-ai-output",
          claim: "Lewis 会先核实 AI 写的功能实际做了什么，再去相信构建全绿。",
          evidence:
            "实现由 Codex 和 Claude Code 完成，规格、审查和验收由 Lewis 负责。构建、类型检查和整套测试都通过了，代码里照样藏着四类缺陷。",
          boundary:
            "PriceWise 用的是演示数据，注册用户为 0；「未匹配」退路只是一条判断，还没做进产品。",
          strongestAnchor: "/projects/pricewise#decision-timeline",
          nextValidation:
            "找五个人用他们自己的小票真的跑一次，并把这些手动验证接进构建流程，变成一道关卡。",
        },
        {
          id: "ai-ux-review-ai-output",
          claim: "只是看起来做完的 AI 输出，Lewis 会打回去，并在真设备上核对。",
          evidence:
            "On The Beat 的固件和 App 由 Claude Code 编写并烧录。需求由 Lewis 设定，生成版本没做到的地方也是他抓出来的：MEET 是模拟数据，离开他的笔电就跑不起来，设计画布四张卡都显示 1 of 4。",
          boundary: "没有参与者测试过这个 App；检查都是 Lewis 自己做的，用两支真手环和本机两个测试视窗。",
          strongestAnchor: "/projects/onthebeat#decision-timeline",
          nextValidation: "在真实或模拟的演出现场做参与者测试，并佩戴手环实测那些仍是估计值的时间参数。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["pricewise", 0],
        ["pricewise", 1],
        ["onthebeat", 0],
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
            "UQ Connect 九月的测试把「Skill swap，不知道这是什么」和「我怎么回上一页？」记为阻塞项，十月的结构重画把两者都回答了。",
          boundary:
            "这是面向一般学生的语言与导航清晰度，不是一次辅助技术审计。",
          strongestAnchor: "/projects/connect#evidence-board",
          nextValidation:
            "让屏幕阅读器用户和纯键盘用户跑同一条任务链，他们从来没有出现在任何一轮里。",
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
