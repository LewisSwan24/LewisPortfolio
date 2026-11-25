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
    route: `/hire?role=${id}`,
    strongestCases,
    primaryAction: actions[locale].contact,
    secondaryAction: actions[locale].resume,
  } as const;
}

const rolePackets: Record<ProofLocale, RolePacket[]> = {
  en: [
    {
      ...packetBase("en", "ux-product", ["walkie", "lamplight", "maze"]),
      label: "UX/Product Design",
      headline: "Interview Lewis for UX/Product roles that need human tensions turned into clear interaction rules.",
      fitThesis:
        "Best fit when the team needs ambiguity framed, human tradeoffs made explicit, and working prototypes built to test constraints.",
      proofClaims: [
        {
          id: "ux-product-ia",
          claim: "Lewis turns opaque AI execution into glanceable spatial structure with explicit user control.",
          evidence:
            "Lamplight Nook replaces scrolling terminal stdout with a café blackboard plan, crew roles, and default 'Not now' risky action cards.",
          boundary:
            "This shows interaction direction and daily solo use on a desktop app, not cohort usability testing.",
          strongestAnchor: "/projects/lamplight#decision-timeline",
          nextValidation:
            "Watch outside users run the same long agent task on Lamplight versus a plain log and measure comprehension speed.",
        },
        {
          id: "ux-product-inclusive-tradeoffs",
          claim: "Lewis makes interaction boundaries from physical safety and human attention constraints.",
          evidence:
            "Walkie moves high-risk Claude Code approvals off voice recognition onto physical M5StickS3 buttons over AES-256-GCM transport.",
          boundary:
            "Verified across host tests and three hardware/relay gates by Lewis; multi-user desk ergonomics are not yet tested.",
          strongestAnchor: "/projects/walkie#decision-timeline",
          nextValidation:
            "Run away-from-desk sessions with 2–3 Claude Code developers and capture real wrist-use photographs.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["walkie", 0],
        ["lamplight", 0],
        ["maze", 0],
      ]),
    },
    {
      ...packetBase("en", "ux-research", ["maze", "autofill", "onthebeat"]),
      label: "UX Research",
      headline: "Interview Lewis for research roles that separate observation from unverified claims.",
      fitThesis:
        "Best fit when the role values field observation, boundary setting under uncertainty, and honest limits on what evidence proves.",
      proofClaims: [
        {
          id: "ux-research-ia-validation",
          claim: "Lewis keeps synthetic benchmark checks separate from real-world accuracy claims.",
          evidence:
            "Resume Autofill achieved 6/6 visual checks and full synthetic form fills while explicitly marking real ATS site accuracy as unmeasured.",
          boundary:
            "Used on Lewis's own real applications; no outside applicant has tested the review outlines yet.",
          strongestAnchor: "/projects/autofill#outcome-limits",
          nextValidation:
            "Log fill results across a fixed set of real application portals and watch 3–4 graduates review uncertain fields.",
        },
        {
          id: "ux-research-observation",
          claim: "Lewis can run structured observation when the setting will not allow clean instrumentation.",
          evidence:
            "MazeRunners was watched across 9 groups and 36 people at a public exhibition; many players still struggled with the rules after the explanation, and about 3 groups finished.",
          boundary:
            "The handwritten leaderboard was never archived, so completion times and drop counts do not exist as data.",
          strongestAnchor: "/projects/maze#outcome-limits",
          nextValidation:
            "Log completion time, drops, trap triggers, and rule-learning time so the next exhibition produces a dataset.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["maze", 0],
        ["autofill", 0],
        ["onthebeat", 2],
      ]),
    },
    {
      ...packetBase("en", "ai-ux", ["walkie", "lamplight", "autofill"]),
      label: "AI UX / Human-AI Interaction",
      headline: "Interview Lewis for AI UX roles that need explicit human authority and refusal boundaries.",
      fitThesis:
        "Best fit when a team needs someone to decide how far an AI feature should be trusted, where polite friction belongs, and what stays human-locked.",
      thread: { label: "Read the AI and trust thread", href: "/interview#ai-trust-thread" },
      proofClaims: [
        {
          id: "ai-ux-verify-ai-output",
          claim: "Lewis enforces physical authority and default refusal before autonomous actions execute.",
          evidence:
            "Walkie binds Claude Code tool approvals to physical watch buttons; Lamplight Nook locks risky card focus onto 'Not now' and operates strictly on file copies.",
          boundary:
            "Both builds are verified through deterministic tests and daily personal runs, not external user cohorts.",
          strongestAnchor: "/projects/walkie#decision-timeline",
          nextValidation:
            "Compare approval error rates and interruption trust with outside developers using Walkie and Lamplight.",
        },
        {
          id: "ai-ux-review-ai-output",
          claim: "Lewis sends back AI output that only looks finished and blocks silent AI guesswork.",
          evidence:
            "On The Beat rejected mocked MEET data and laptop dependency; Resume Autofill leaves open ATS answers blank and locks final Submit to humans.",
          boundary:
            "On The Beat has no participant gig tests yet; Resume Autofill accuracy on real portals is unmeasured beyond solo use.",
          strongestAnchor: "/projects/autofill#decision-timeline",
          nextValidation:
            "Run staged gig sessions for On The Beat and multi-applicant portal logs for Resume Autofill.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["walkie", 0],
        ["lamplight", 1],
        ["autofill", 0],
      ]),
    },
    {
      ...packetBase("en", "accessibility", ["autofill", "lamplight", "walkie"]),
      label: "Accessibility / Inclusive Design",
      headline: "Interview Lewis for inclusive design roles that bake non-color legibility and safe defaults into core UI.",
      fitThesis:
        "Best fit when the work needs accessible state clarity, cognitive safety against accidental confirmation, and honest validation limits.",
      proofClaims: [
        {
          id: "accessibility-multimodal-feedback",
          claim: "Lewis encodes every system state with structure, words, and icons rather than color alone.",
          evidence:
            "Resume Autofill distinguishes filled (solid), needs review (dashed), and not filled (3px solid) with distinct stroke patterns, text labels, and side-panel reasons.",
          boundary:
            "Checked in light and dark visual tests on synthetic forms; not yet evaluated with assistive-technology users.",
          strongestAnchor: "/projects/autofill#decision-timeline",
          nextValidation:
            "Test screen-reader and keyboard-only navigation across the extension side panel and summary cards.",
        },
        {
          id: "accessibility-plain-language",
          claim: "Lewis protects users from muscle-memory confirmation traps via safe default keyboard focus.",
          evidence:
            "Lamplight Nook places initial keyboard focus and visual weight on 'Not now' for risky steps, while Walkie prints explicit offline causes on a tiny watch screen.",
          boundary:
            "These are interaction-safety patterns grounded in Lewis's own use rather than formal accessibility certification.",
          strongestAnchor: "/projects/lamplight#decision-timeline",
          nextValidation:
            "Evaluate interruption clarity and keyboard focus flow with diverse users running multi-step tasks.",
        },
      ],
      interviewQuestions: pickInterviewQuestions("en", [
        ["autofill", 0],
        ["lamplight", 1],
        ["walkie", 0],
      ]),
    },
  ],
  zh: [
    {
      ...packetBase("zh", "ux-product", ["walkie", "lamplight", "maze"]),
      label: "UX/Product Design",
      headline: "适合需要把人文矛盾拆解成清晰交互规则的 UX/Product 岗位。",
      fitThesis:
        "当团队需要梳理模糊问题、明确权衡取舍，并用可运行原型验证约束时，这个方向最匹配。",
      proofClaims: [
        {
          id: "ux-product-ia",
          claim: "Lewis 能把晦涩的 AI 后台执行变成一眼可读的空间结构与可控卡片。",
          evidence:
            "Lamplight Nook 用咖啡馆黑板计划、店员分工与默认「先不要」的风险卡取代滚动终端日志。",
          boundary:
            "这证明的是交互方向与本人日常桌面实测，尚未进行外部人群对比测试。",
          strongestAnchor: "/projects/lamplight#decision-timeline",
          nextValidation:
            "请其他长任务用户并排试用咖啡馆视图与纯文本日志，观察状态读懂速度。",
        },
        {
          id: "ux-product-inclusive-tradeoffs",
          claim: "Lewis 从物理安全与人类注意力边界出发制定交互规则。",
          evidence:
            "Walkie 把 Claude Code 高风险审批从语音识别移回 M5StickS3 实体双键，并经 AES-256-GCM 传输。",
          boundary:
            "已通过宿主机单测与三组硬件/中继门禁；多用户离桌手感尚未测试。",
          strongestAnchor: "/projects/walkie#decision-timeline",
          nextValidation:
            "邀请 2–3 位 Claude Code 开发者做离桌审批测试并补拍真实手腕画面。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["walkie", 0],
        ["lamplight", 0],
        ["maze", 0],
      ]),
    },
    {
      ...packetBase("zh", "ux-research", ["maze", "autofill", "onthebeat"]),
      label: "UX Research",
      headline: "适合需要严格区分「现场观察信号」与「未验证结论」的 UX Research 岗位。",
      fitThesis:
        "当岗位重视实地观察、不确定性下的边界意识，以及对证据范围的诚实披露时，这个方向最匹配。",
      proofClaims: [
        {
          id: "ux-research-ia-validation",
          claim: "Lewis 严格区隔「合成夹具通过率」与「真实场景准确率」。",
          evidence:
            "Resume Autofill 在合成表单截图验收中 6/6 全通过，同时在案例中明文标出真实招聘网站准确率尚未量测。",
          boundary:
            "目前仅由 Lewis 本人在真实求职中使用，尚无外部应届生核对标记的记录。",
          strongestAnchor: "/projects/autofill#outcome-limits",
          nextValidation:
            "在固定一组真实网申网站上记录填写结果，并观察 3–4 位应届生使用。",
        },
        {
          id: "ux-research-observation",
          claim: "Lewis 能在无法干净埋点的场合用观察法拿到有用信号。",
          evidence:
            "MazeRunners 在公开展出时观察了 9 组共 36 人；讲解之后仍有不少玩家没弄懂规则，大约三组通关。",
          boundary:
            "手写排行榜没有留档，所以完成时间和掉球次数没有量化数据集。",
          strongestAnchor: "/projects/maze#outcome-limits",
          nextValidation:
            "记录完成时间、掉球、陷阱触发与规则学习时长，让下一次展出产出完整数据。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["maze", 0],
        ["autofill", 0],
        ["onthebeat", 2],
      ]),
    },
    {
      ...packetBase("zh", "ai-ux", ["walkie", "lamplight", "autofill"]),
      label: "AI UX / Human-AI Interaction",
      headline: "适合需要明确人类控制权与系统拒绝边界的 AI UX 岗位。",
      fitThesis:
        "适合这样的团队：需要有人判断 AI 功能该给多少信任、哪里需要礼貌阻力，以及哪些操作必须锁死给人。",
      thread: { label: "看 AI 与信任这条线", href: "/interview#ai-trust-thread" },
      proofClaims: [
        {
          id: "ai-ux-verify-ai-output",
          claim: "Lewis 在高风险自主动作执行前设定物理确权与默认拒绝机制。",
          evidence:
            "Walkie 把工具放行锁在手表实体按键；Lamplight Nook 把风险卡默认焦点锁在「先不要」并仅处理副本。",
          boundary:
            "两者均通过确定性门禁与作者日常实测验证，尚未经过外部用户队列对比。",
          strongestAnchor: "/projects/walkie#decision-timeline",
          nextValidation:
            "邀请外部开发者对照测试误批准率与中断打扰感受。",
        },
        {
          id: "ai-ux-review-ai-output",
          claim: "只是看起来做完的 AI 输出，Lewis 会打回去，并禁止工具替用户瞎猜。",
          evidence:
            "On The Beat 拒收了假 MEET 数据与笔电依赖；Resume Autofill 对开放题留空并锁定人工提交。",
          boundary:
            "On The Beat 尚无现场参与者试戴；Resume Autofill 仅有作者本人真实投递记录。",
          strongestAnchor: "/projects/autofill#decision-timeline",
          nextValidation:
            "为 On The Beat 补做模拟演出现场测试，为 Autofill 补充多申请人真实门户日志。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["walkie", 0],
        ["lamplight", 1],
        ["autofill", 0],
      ]),
    },
    {
      ...packetBase("zh", "accessibility", ["autofill", "lamplight", "walkie"]),
      label: "Accessibility / Inclusive Design",
      headline: "适合把非色彩辨识与安全默认焦点落进核心交互的包容性设计岗位。",
      fitThesis:
        "当工作需要无障碍状态清晰度、对抗误触的认知安全设计，以及诚实的验证边界时，这个方向最匹配。",
      proofClaims: [
        {
          id: "accessibility-multimodal-feedback",
          claim: "Lewis 为系统状态同时配备线型、文字标签与图标，不依赖单一颜色。",
          evidence:
            "Resume Autofill 用实线（已填）、虚线（待确认）、粗实线（未填）配合文字与侧栏原因区分三态。",
          boundary:
            "已在亮暗色截图测试中验证，尚未经过屏幕阅读器或真实辅助技术用户测试。",
          strongestAnchor: "/projects/autofill#decision-timeline",
          nextValidation:
            "补充纯键盘与屏幕阅读器对扩展侧栏与摘要卡的可达性走查。",
        },
        {
          id: "accessibility-plain-language",
          claim: "Lewis 通过安全默认焦点与明确故障归因避免操作迷失。",
          evidence:
            "Lamplight Nook 把高风险确认卡焦点锁在「先不要」防误敲回车，Walkie 在微屏明确区分三种离线原因。",
          boundary:
            "目前属于交互安全设计实践，不能替代覆盖多障碍群体的正式无障碍审计。",
          strongestAnchor: "/projects/lamplight#decision-timeline",
          nextValidation:
            "在不同任务复杂度下测试多群体用户的焦点流与打断恢复体验。",
        },
      ],
      interviewQuestions: pickInterviewQuestions("zh", [
        ["autofill", 0],
        ["lamplight", 1],
        ["walkie", 0],
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
