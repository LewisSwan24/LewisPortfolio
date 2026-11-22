import { autofillPack } from "./case-autofill";
import { lamplightPack } from "./case-lamplight";
import { walkiePack } from "./case-walkie";
import { fencepostPack } from "./case-fencepost";
import { recentCaseInterviewPacks } from "./recent-cases";
import type {
  CaseInterviewPack,
  EvidenceMatrixCapability,
  HiringRoleFit,
  ProjectEvidenceSlug,
  ProofLocale,
} from "./types";
import { isUnlistedProject, linksToUnlistedProject } from "../project-routes";

const sharedHiringRoleFits: HiringRoleFit[] = [
  {
    id: "ux-product",
    label: "UX/Product Design",
    fit:
      "Best fit when the team needs human tensions framed clearly, mental models structured, and tradeoffs built into working prototypes.",
    proofLinks: [
      { label: "Walkie: wrist key authority", href: "/projects/walkie#decision-timeline" },
      { label: "Lamplight Nook: café blackboard & 'Not now'", href: "/projects/lamplight#decision-timeline" },
      { label: "Resume Autofill: three-tier refusal", href: "/projects/autofill#decision-timeline" },
      { label: "MazeRunners: hardware & safety tradeoffs", href: "/projects/maze#decision-timeline" },
      { label: "Grassland Iron Tide: unified grammar", href: "/projects/grassland#decision-timeline" },
    ],
    bestCases: ["walkie", "lamplight", "autofill", "maze", "grassland"],
    risk:
      "I am strongest when product ambiguity needs structure; I would pair with engineering early for production constraints.",
    interviewAngle: "Ask how I turn human tension and safety constraints into explicit interaction rules.",
  },
  {
    id: "ux-research",
    label: "UX Research",
    fit:
      "Best fit when the team needs field observation, real-workflow friction logging, and honest boundaries on what evidence proves.",
    proofLinks: [
      { label: "MazeRunners: exhibition group observation", href: "/projects/maze#evidence-board" },
      { label: "Resume Autofill: synthetic vs real-site limits", href: "/projects/autofill#outcome-limits" },
      { label: "Lamplight Nook: personal log vs user study boundary", href: "/projects/lamplight#outcome-limits" },
      { label: "On The Beat: self-testing & unverified paths", href: "/projects/onthebeat#evidence-board" },
    ],
    bestCases: ["maze", "autofill", "lamplight", "onthebeat"],
    risk:
      "Most builds are solo or exhibition prototypes without formal user studies yet, so I separate personal/bench observations from validated cohort data.",
    interviewAngle: "Ask what my current builds prove today versus what still requires outside participant sessions.",
  },
  {
    id: "ai-ux",
    label: "AI UX",
    fit:
      "Best fit when a team needs someone to judge how far an AI feature should be trusted, design polite friction, and keep human authority intact.",
    proofLinks: [
      { label: "Walkie: physical approval gate over voice", href: "/projects/walkie#decision-timeline" },
      { label: "Lamplight Nook: default focus on 'Not now'", href: "/projects/lamplight#decision-timeline" },
      { label: "Resume Autofill: leave open prompts blank", href: "/projects/autofill#decision-timeline" },
      { label: "On The Beat: sending back deceptive AI polish", href: "/projects/onthebeat#decision-timeline" },
    ],
    bestCases: ["walkie", "lamplight", "autofill", "onthebeat"],
    risk:
      "The examples focus on interaction scoping, prototyping, and real behavior under human oversight across independent and course builds.",
    interviewAngle: "Ask why Lamplight locks focus to 'Not now' and why Walkie rejects voice-only tool approvals.",
  },
  {
    id: "accessibility",
    label: "Accessibility / Inclusive Design",
    fit:
      "Best fit when inclusive research has to become practical interaction decisions beyond compliance language.",
    proofLinks: [
      { label: "Spectra accessibility evidence", href: "/projects/spectra#evidence-board" },
      { label: "Spectra privacy decision", href: "/projects/spectra#decision-timeline" },
      { label: "Spectra limits", href: "/projects/spectra#outcome-limits" },
      { label: "A 48 px floor, and warnings you do not have to look at", href: "/projects/rules#decision-timeline" },
    ],
    bestCases: ["spectra", "rules"],
    risk:
      "I avoid claiming universal accessibility from a narrow sample and would broaden validation across contexts before launch.",
    interviewAngle: "Ask how inclusive design choices changed the core interaction model.",
  },
];

/**
 * Both locales previously pointed at the English array, so /zh/hire rendered
 * twelve blocks of untranslated English.
 */
const zhHiringRoleFits: HiringRoleFit[] = [
  {
    id: "ux-product",
    label: "UX / 产品设计",
    fit: "适合需要把人文矛盾拆解成产品结构、交互边界与可运行原型的团队。",
    proofLinks: [
      { label: "Walkie：手腕实体键唯一审批", href: "/projects/walkie#decision-timeline" },
      { label: "Lamplight Nook：咖啡馆黑板与「先不要」", href: "/projects/lamplight#decision-timeline" },
      { label: "Resume Autofill：三态分流与刻意留白", href: "/projects/autofill#decision-timeline" },
      { label: "MazeRunners：软硬件安全取舍", href: "/projects/maze#decision-timeline" },
      { label: "草原铁潮：跨五关统一语法", href: "/projects/grassland#decision-timeline" },
    ],
    bestCases: ["walkie", "lamplight", "autofill", "maze", "grassland"],
    risk: "我最强的地方是把模糊的人因与产品约束结构化；生产环境的工程约束我会尽早与研发协同确认。",
    interviewAngle: "可以问我怎么把用户摩擦与安全焦虑收敛成明确的交互规则。",
  },
  {
    id: "ux-research",
    label: "UX 研究",
    fit: "适合需要现场行为观察、真实使用卡点记录，并且严格区分「观察现象」与「量化验证」的团队。",
    proofLinks: [
      { label: "MazeRunners：展览多人试玩观察", href: "/projects/maze#evidence-board" },
      { label: "Resume Autofill：合成表单与真实网站边界", href: "/projects/autofill#outcome-limits" },
      { label: "Lamplight Nook：个人自用与外部对比边界", href: "/projects/lamplight#outcome-limits" },
      { label: "On The Beat：真机联调与未测路径清单", href: "/projects/onthebeat#evidence-board" },
    ],
    bestCases: ["maze", "autofill", "lamplight", "onthebeat"],
    risk: "当前 6 件作品多为独立原型或展览装置，尚未补齐大样本受试实验，我会明确划出待验证空白。",
    interviewAngle: "可以问我这些作品目前已经证明了什么、又故意没有宣称什么。",
  },
  {
    id: "ai-ux",
    label: "AI 交互设计",
    fit: "适合需要有人判断 AI 功能该给多少信任、设计礼貌阻力，并守住人类最终控制权的团队。",
    proofLinks: [
      { label: "Walkie：实体按键对抗语音误放行", href: "/projects/walkie#decision-timeline" },
      { label: "Lamplight Nook：风险卡默认锁死「先不要」", href: "/projects/lamplight#decision-timeline" },
      { label: "Resume Autofill：开放题留空不瞎猜", href: "/projects/autofill#decision-timeline" },
      { label: "On The Beat：打回「看起来像做完」的 AI 输出", href: "/projects/onthebeat#decision-timeline" },
    ],
    bestCases: ["walkie", "lamplight", "autofill", "onthebeat"],
    risk: "案例均来自独立或课程实作原型，重点展示了我如何把交互边界、默认拒绝与人工复核做进 AI 流程。",
    interviewAngle: "可以聊聊为什么 Lamplight 要反常规默认聚焦「先不要」，以及 Walkie 为何拒绝纯语音审批。",
  },
  {
    id: "accessibility",
    label: "无障碍 / 包容性设计",
    fit: "适合需要把包容性研究落成实际交互决策、而不只是合规话术的团队。",
    proofLinks: [
      { label: "Spectra 的无障碍证据", href: "/projects/spectra#evidence-board" },
      { label: "Spectra 的隐私决策", href: "/projects/spectra#decision-timeline" },
      { label: "Spectra 的限制", href: "/projects/spectra#outcome-limits" },
      { label: "48px 的下限，和不用看屏幕的提示", href: "/projects/rules#decision-timeline" },
    ],
    bestCases: ["spectra", "rules"],
    risk: "我不会用一个小样本去宣称通用无障碍；正式上线前需要把验证扩展到更多场景。",
    interviewAngle: "可以问我包容性设计的取舍怎么改变了核心交互模型。",
  },
];

const hiringRoleFits: Record<ProofLocale, HiringRoleFit[]> = {
  en: sharedHiringRoleFits,
  zh: zhHiringRoleFits,
};

const sharedEvidenceMatrix: EvidenceMatrixCapability[] = [
  {
    id: "research-framing",
    label: "Human tension framing",
    summary: "Frames social friction, attention cost, and safety anxiety before writing interface rules.",
    cases: {
      maze: {
        strength: "primary",
        proof: "Exhibition play across 9 groups (36 people) showed players felt sleeve buzz and looked up rather than reading score displays.",
        href: "/projects/maze#evidence-board",
      },
      onthebeat: {
        strength: "supporting",
        proof: "Replaces profile radar with blind waves and mutual consent so strangers never risk public face-loss at a gig.",
        href: "/projects/onthebeat#decision-timeline",
      },
      walkie: {
        strength: "supporting",
        proof: "Bound approvals to physical watch keys after away-from-desk probing showed voice-only triggers fail in noisy rooms.",
        href: "/projects/walkie#evidence-board",
      },
    },
  },
  {
    id: "information-architecture",
    label: "Information architecture",
    summary: "Turns multi-state systems into structures people can read at a glance.",
    cases: {
      lamplight: {
        strength: "primary",
        proof: "Splits 300-line scrolling agent logs into a spatial café blackboard, crew roles, and a corner monitor.",
        href: "/projects/lamplight#decision-timeline",
      },
      grassland: {
        strength: "primary",
        proof: "Locks camera zoom so objectives, minimap, and command grid sit at edges while the battlefield keeps center stage.",
        href: "/projects/grassland#decision-timeline",
      },
      walkie: {
        strength: "supporting",
        proof: "Separates OFFLINE states explicitly into no-Wi-Fi, relay-unreachable, and PC-offline on a thumb-sized screen.",
        href: "/projects/walkie#decision-timeline",
      },
    },
  },
  {
    id: "accessibility",
    label: "Explicit refusal & legibility",
    summary: "Uses non-color cues, polite friction, and reversible pauses to protect human control.",
    cases: {
      autofill: {
        strength: "primary",
        proof: "Every fill tier pairs stroke style (solid/dashed/double), word badge, and icon—never relying on color alone.",
        href: "/projects/autofill#decision-timeline",
      },
      lamplight: {
        strength: "supporting",
        proof: "Locks risky-card initial focus onto 'Not now' so habitual Enter presses pause safely instead of overwriting.",
        href: "/projects/lamplight#decision-timeline",
      },
    },
  },
  {
    id: "ai-trust",
    label: "AI UX and trust",
    summary: "Keeps a system's authority, privacy, and certainty in line with human oversight.",
    // Supporting only: no listed case claims clinical or wide-cohort external validation yet.
    cases: {
      walkie: {
        strength: "supporting",
        proof: "Physical Front/Side buttons own pairing and tool permissions over AES-256-GCM zero-knowledge relay.",
        href: "/projects/walkie#decision-timeline",
      },
      lamplight: {
        strength: "supporting",
        proof: "Staff operate strictly on file copies with spending caps and default-safe 'Not now' interruption cards.",
        href: "/projects/lamplight#decision-timeline",
      },
      autofill: {
        strength: "supporting",
        proof: "Leaves open questions blank, blocks network calls, and locks final Submit strictly to human hands.",
        href: "/projects/autofill#decision-timeline",
      },
      onthebeat: {
        strength: "supporting",
        proof: "Caught mocked MEET data and '1 of 4' canvas errors in AI-generated builds before real wristband pairing.",
        href: "/projects/onthebeat#decision-timeline",
      },
    },
  },
  {
    id: "product-judgment",
    label: "Product judgment",
    summary: "Makes explicit trade-offs between human friction, constraints, and product direction.",
    cases: {
      walkie: {
        strength: "primary",
        proof: "Chose spoken summaries + two-key wrist gates over streaming full terminal logs or voice-only approval.",
        href: "/projects/walkie#decision-timeline",
      },
      autofill: {
        strength: "primary",
        proof: "Sacrificed '100% filled' theater by leaving unsure ATS fields blank and keeping resumes off external servers.",
        href: "/projects/autofill#decision-timeline",
      },
      grassland: {
        strength: "primary",
        proof: "Cut command count below commercial RTS norms so one grammar stays predictable across all five missions.",
        href: "/projects/grassland#decision-timeline",
      },
      maze: {
        strength: "primary",
        proof: "Replaced electric shock with sleeve vibration for unsupervised exhibition safety, trading intensity for consent.",
        href: "/projects/maze#decision-timeline",
      },
    },
  },
  {
    id: "measurement-validation",
    label: "Measurement and validation",
    summary: "Uses reproducible checks and explicit limits to separate what holds from what is untested.",
    cases: {
      walkie: {
        strength: "primary",
        proof: "Backed by host C++ tests plus gate-h, gate-p5, and gate-l hardware/crypto scripts, while noting no external users.",
        href: "/projects/walkie#outcome-limits",
      },
      grassland: {
        strength: "primary",
        proof: "430/430 tests, asset gate, and 1280×720 / 1920×1080 playthroughs—explicitly claiming consistency, not learnability.",
        href: "/projects/grassland#outcome-limits",
      },
      autofill: {
        strength: "supporting",
        proof: "6/6 visual checks on synthetic forms plus network-import unit test; real-site accuracy explicitly marked unmeasured.",
        href: "/projects/autofill#outcome-limits",
      },
      onthebeat: {
        strength: "supporting",
        proof: "Verified dual wristbands via Fly.io in 65 min while flagging untested battery, Plus front button, and gig participants.",
        href: "/projects/onthebeat#outcome-limits",
      },
    },
  },
  {
    id: "communication",
    label: "Communication and systems",
    summary: "Turns rules into shared state machines, clear copy, and inspectable artifacts.",
    cases: {
      maze: {
        strength: "supporting",
        proof: "Single round state machine syncs score, timer, sleeve buzz, LEDs, audio, and Web Serial demo parity tests.",
        href: "/projects/maze#iteration-gallery",
      },
      lamplight: {
        strength: "supporting",
        proof: "Commission slips, blackboard steps, and bilingual cards keep waiting tasks legible without terminal jargon.",
        href: "/projects/lamplight#interview-takeaway",
      },
      onthebeat: {
        strength: "supporting",
        proof: "Sent generated canvases back 5+ times until card counts and post-selection transitions matched the spec.",
        href: "/projects/onthebeat#evidence-board",
      },
    },
  },
];

/**
 * Both locales previously pointed at the English array, so every /zh case page
 * rendered the capability matrix untranslated.
 */
const zhEvidenceMatrix: EvidenceMatrixCapability[] = [
  {
    id: "research-framing",
    label: "人文矛盾框定",
    summary: "在落笔规则前，先厘清社交面子风险、注意力碎片与安全焦虑。",
    cases: {
      maze: {
        strength: "primary",
        proof: "9 组 36 人现场观察发现玩家先感受到指套震动才抬头看屏幕，确立触觉第一信号原则。",
        href: "/projects/maze#evidence-board",
      },
      onthebeat: {
        strength: "supporting",
        proof: "用匿名挥手脉冲与双向确认取代附近人雷达，保护暗光演出现场的社交安全距离。",
        href: "/projects/onthebeat#decision-timeline",
      },
      walkie: {
        strength: "supporting",
        proof: "离桌场景探测表明嘈杂环境纯语音易误放行，因此将审批锁回实体双键。",
        href: "/projects/walkie#evidence-board",
      },
    },
  },
  {
    id: "information-architecture",
    label: "信息架构",
    summary: "把多状态系统梳理成一眼可读的心智秩序。",
    cases: {
      lamplight: {
        strength: "primary",
        proof: "把 300 行滚动终端日志拆成咖啡馆黑板计划、店员分工与桌角状态小窗。",
        href: "/projects/lamplight#decision-timeline",
      },
      grassland: {
        strength: "primary",
        proof: "固定镜头倍率，目标、小地图与命令格靠边排布，主战场始终占最大面积。",
        href: "/projects/grassland#decision-timeline",
      },
      walkie: {
        strength: "supporting",
        proof: "拇指微屏将离线态拆分为「无 Wi-Fi / 中继不可达 / 电脑离线」，杜绝盲猜。",
        href: "/projects/walkie#decision-timeline",
      },
    },
  },
  {
    id: "accessibility",
    label: "可辨识性与克制阻力",
    summary: "不靠单色区分状态，用温和阻力与无损暂停护住人类控制权。",
    cases: {
      autofill: {
        strength: "primary",
        proof: "三档分流同时采用实线/虚线/双线边框、文字标签与图标，不依赖单一颜色。",
        href: "/projects/autofill#decision-timeline",
      },
      lamplight: {
        strength: "supporting",
        proof: "高风险确认卡默认焦点落在「先不要」，防止习惯性敲回车误覆写。",
        href: "/projects/lamplight#decision-timeline",
      },
    },
  },
  {
    id: "ai-trust",
    label: "AI 交互与信任",
    summary: "让系统的权限、隐私与把握程度始终与人类监督相称。",
    cases: {
      walkie: {
        strength: "supporting",
        proof: "M5StickS3 实体前/侧键掌管配对与工具放行，AES-256-GCM 中继只转密文。",
        href: "/projects/walkie#decision-timeline",
      },
      lamplight: {
        strength: "supporting",
        proof: "仅操作文件副本、标明开销上限，并以默认「先不要」卡挡住风险写入。",
        href: "/projects/lamplight#decision-timeline",
      },
      autofill: {
        strength: "supporting",
        proof: "开放题刻意留空不编造，测试锁定零外网请求，最终提交严格由人手完成。",
        href: "/projects/autofill#decision-timeline",
      },
      onthebeat: {
        strength: "supporting",
        proof: "在真手环配对前拦截 AI 初稿里的假 MEET 数据与「1 of 4」画布错误。",
        href: "/projects/onthebeat#decision-timeline",
      },
    },
  },
  {
    id: "product-judgment",
    label: "产品判断",
    summary: "在人因摩擦、真实约束与产品方向之间做出讲得通的取舍。",
    cases: {
      walkie: {
        strength: "primary",
        proof: "舍弃手表读长日志或纯语音确认，选择一句话简报 + 双键物理确权。",
        href: "/projects/walkie#decision-timeline",
      },
      autofill: {
        strength: "primary",
        proof: "宁可牺牲「100% 填满」观感，也要留空不确定的框并守住本地隐私。",
        href: "/projects/autofill#decision-timeline",
      },
      grassland: {
        strength: "primary",
        proof: "主动压缩命令数量，换取跨五关零特例、完全可预测的指令语法。",
        href: "/projects/grassland#decision-timeline",
      },
      maze: {
        strength: "primary",
        proof: "因展览无法逐人校准电击而改用指套震动，用刺激强度换公共安全边界。",
        href: "/projects/maze#decision-timeline",
      },
    },
  },
  {
    id: "measurement-validation",
    label: "测量与验证",
    summary: "用可复现检查与坦诚边界，区分已验证事实与未测范围。",
    cases: {
      walkie: {
        strength: "primary",
        proof: "宿主机 C++ 单测加 gate-h / gate-p5 / gate-l 真机门禁，同时写明无外部用户测试。",
        href: "/projects/walkie#outcome-limits",
      },
      grassland: {
        strength: "primary",
        proof: "430/430 测试、资产闸门与双分辨率通关，明确只主张一致性而不宣称易学性。",
        href: "/projects/grassland#outcome-limits",
      },
      autofill: {
        strength: "supporting",
        proof: "合成表单 6/6 截图验收加断网单测；真实求职网站准确率明确标为未量测。",
        href: "/projects/autofill#outcome-limits",
      },
      onthebeat: {
        strength: "supporting",
        proof: "65 分钟迁入 Fly.io 完成双真手环联调，同时坦诚标注续航、Plus 前键与现场试戴未测。",
        href: "/projects/onthebeat#outcome-limits",
      },
    },
  },
  {
    id: "communication",
    label: "表达与系统化",
    summary: "把规则落成共享状态机、清晰文案与可复查制品。",
    cases: {
      maze: {
        strength: "supporting",
        proof: "单一回合状态机同步计分、指套震动、灯带与 Web Serial 一致性回归测试。",
        href: "/projects/maze#iteration-gallery",
      },
      lamplight: {
        strength: "supporting",
        proof: "委托单、黑板进度与双语决策卡让长任务进度无需终端术语即可读懂。",
        href: "/projects/lamplight#interview-takeaway",
      },
      onthebeat: {
        strength: "supporting",
        proof: "逐屏审查并打回 AI 画布 5 轮以上，直至页码与选歌后状态完全自洽。",
        href: "/projects/onthebeat#evidence-board",
      },
    },
  },
];

const evidenceMatrix: Record<ProofLocale, EvidenceMatrixCapability[]> = {
  en: sharedEvidenceMatrix,
  zh: zhEvidenceMatrix,
};

const sharedCaseInterviewPacks: Record<ProjectEvidenceSlug, CaseInterviewPack> = {
  connect: {
    answers: [
      {
        id: "connect-paper-reset",
        question: "You had a working prototype in September. Why go back to paper in October?",
        answer:
          "Because the defects were structural, not cosmetic. A student could not find a way back to the previous page, and an event card claimed she was attending while still offering her an attend button. You do not fix that one component at a time, so we redrew the whole app on one sheet — five screens, every route off the home page, a name against each area — and built from that.",
        evidenceHref: "/projects/connect#decision-timeline",
        boundary:
          "I can show the sequence, not the causation. The paper sheet records the new structure; it does not record why each change was made.",
      },
      {
        id: "connect-failed-hypothesis",
        question: "Which of your assumptions did the research kill?",
        answer:
          "That language proficiency was the barrier. It was not. Students held back in fast, loud, crowded settings and contributed freely in small paced ones, at the same level of English — the barrier is pace and group size. We had also assumed the gap was exposure, and it was follow-through: people found events fine and still did not go.",
        evidenceHref: "/projects/connect#evidence-board",
        boundary:
          "These came from interview patterns, not from an instrumented study. The thresholds we set in advance were never formally scored against the transcripts.",
      },
      {
        id: "connect-mock-data-limit",
        question: "The MVP runs on mock data. What does that mean you have not proven?",
        answer:
          "Almost everything about the product, as opposed to the interface. Matching, messaging and scheduling were never exercised against real records, concurrency, or an empty state. The November sessions show a person can operate the screens; they say nothing about whether the thing underneath works.",
        evidenceHref: "/projects/connect#outcome-limits",
        boundary:
          "No round recorded completion times or a fixed success criterion, so I cannot put a number on any of it either.",
      },
    ],
    managerFollowUp: {
      id: "connect-manager-follow-up",
      question: "You were one of five. How do I know which parts are yours?",
      answer:
        "Ask, and the commit history will match what I say. I owned the front-end component system and the shared state layer, wrote some of the backend routes and controllers, ran 14 of the 71 sessions, and co-wrote the test and learning cards. The map feature, the wellness hub and the study-buddy matching logic were other people's.",
      evidenceHref: "/projects/connect#interview-takeaway",
      boundary:
        "It was a course team under a deadline, so ownership blurred at the edges — I reviewed and touched code I did not design.",
    },
  },
  spectra: {
    answers: [
      {
        id: "spectra-colour-feedback",
        question: "Why four spacing controls and not a general CSS editor?",
        answer:
          "WCAG's text-spacing criteria set explicit thresholds for line height, letter spacing, word spacing and paragraph spacing, so those four became the control list.",
        evidenceHref: "/projects/spectra#decision-timeline",
        boundary:
          "It is a DEMO with no user research behind it, so I cannot say these four are the controls readers need.",
      },
      {
        id: "spectra-privacy",
        question: "Why is the font bundled instead of fetched at runtime?",
        answer:
          "A remote font request tells a third party who is reading which page, and it fails offline or when the host changes. Bundling costs a larger package and means the font only updates with a new release.",
        evidenceHref: "/projects/spectra#evidence-board",
        boundary:
          "This is a design argument about privacy, not a privacy review or an accessibility audit.",
      },
      {
        id: "spectra-field-testing",
        question: "What would testing need to prove before this ships?",
        answer:
          "That real readers can reach the controls and that per-site saving fits how they read. So far I have only hand-tested a docs site, a news site and a single-page app, plus Jest on the settings layer.",
        evidenceHref: "/projects/spectra#outcome-limits",
        boundary:
          "Those checks show the injection works. They do not show that readers benefit from it.",
      },
    ],
    managerFollowUp: {
      id: "spectra-manager-follow-up",
      question: "How would you decide whether this belongs in an extension or in the browser itself?",
      answer:
        "I would weigh what an extension can do that the browser does not, such as per-site settings, against asking readers to install it and the pages where injected styles lose to the page's own CSS.",
      evidenceHref: "/projects/spectra#interview-takeaway",
      boundary:
        "I would drop the extension entirely if the browser shipped the same controls natively.",
    },
  },
  maze: {
    answers: [
      {
        id: "maze-safety-tradeoff",
        question: "Why did the trap become vibration instead of an electric shock?",
        answer:
          "I would explain that a public exhibition means unsupervised players of unknown age and health, so per-person consent and calibration were impossible; relay-driven vibration in finger sleeves kept the sensation on the body without the risk.",
        evidenceHref: "/projects/maze#decision-timeline",
        boundary:
          "I would admit vibration is the weaker sensation, and that I traded some memorability for being able to run the maze unattended.",
      },
      {
        id: "maze-sensor-timing",
        question: "How did you make one ball pass produce one game event?",
        answer:
          "I would walk through debounce plus a cooldown window on each of the ten IR sensors, and why raw reads double-firing stopped score, timer, and haptics from agreeing with each other.",
        evidenceHref: "/projects/maze#evidence-board",
        boundary:
          "The cooldown creates a blind window, so a genuinely fast second pass is missed — a deliberate trade, not an oversight.",
      },
      {
        id: "maze-web-bridge",
        question: "Why build a browser console for a physical build?",
        answer:
          "I would show the Web Serial console mirroring the maze live, plus a demo mode that runs without hardware, with regression tests keeping the two honest about firmware rules.",
        evidenceHref: "/projects/maze#iteration-gallery",
        boundary:
          "Two modes can drift; the parity tests exist precisely because I could not trust them to stay aligned by hand.",
      },
    ],
    managerFollowUp: {
      id: "maze-manager-follow-up",
      question: "What does this prove that a screen-only case study does not?",
      answer:
        "I would say it proves I can carry an idea across the whole stack — sensing, firmware state machines, physical feedback, and a browser control surface — and make calibration and safety calls on hardware strangers will actually touch.",
      evidenceHref: "/projects/maze#interview-takeaway",
      boundary:
        "It is one exhibition unit with hand-run wiring, so it proves build capability and system thinking, not manufacturability.",
    },
  },
  vigil: {
    answers: [
      {
        id: "vigil-weak-confidence",
        question: "Why make the classifier's confidence a deliberately weak signal?",
        answer:
          "I would show that in the first build confidence separated perfectly — every correct call at 0.84 and above, every error at 0.82 and below — so a reviewer could have caught all 17 errors by reading a number instead of an email, and the interface comparison would have measured nothing. Stratified resampling brought error-ranking AUC to 0.72, and the build script now fails if it drifts back above 0.75.",
        evidenceHref: "/projects/vigil#decision-timeline",
        boundary:
          "That is a property of an authored corpus, not a claim about how real classifiers behave.",
      },
      {
        id: "vigil-predictions-first",
        question: "You wrote down which variants you expected to win. Why?",
        answer:
          "I would point at the prediction table dated before the first variant was flipped, and to the shape of it: two bets on adding friction, one on removing search cost. Predictions written afterwards always agree with the result, which makes them useless as evidence that any reasoning happened.",
        evidenceHref: "/projects/vigil#evidence-board",
        boundary:
          "The predictions are on record; the outcomes are not, because no one has run the test yet.",
      },
      {
        id: "vigil-ai-workflow",
        question: "An AI wrote all the code. What was actually your work?",
        answer:
          "I would separate the two: Claude Code and Codex wrote the corpus pipeline, the prototype, and the React build, and they were fast. What did not delegate was deciding that confidence had to be uninformative, that a rationale describing cues the email does not contain is a study-ending defect, and that this interface is an instrument rather than an inbox.",
        evidenceHref: "/projects/vigil#iteration-gallery",
        boundary:
          "The first visual pass the workflow produced was competent and generic — that is the failure mode this way of working has, and the second pass is mine.",
      },
    ],
    managerFollowUp: {
      id: "vigil-manager-follow-up",
      question: "Nobody has tested it. Why is it in the portfolio?",
      answer:
        "I would say it shows the part of the work that usually stays invisible: the material, the variants, the protocol, and the validation gates that decide whether a study can answer anything at all. The three design questions are marked open, and the predictions are on record so the eventual answer is checkable against them.",
      evidenceHref: "/projects/vigil#outcome-limits",
      boundary:
        "Until participants run it, every variant argument here is reasoning rather than evidence, and the case says so.",
    },
  },
  hoop: {
    answers: [
      {
        id: "hoop-style-coherence",
        question: "How do you keep a 299-spec asset registry looking like one world?",
        answer:
          "I would show the order, and what each step does not prove. Three art bibles, split by canvas size, came before the batches; their forbidden lists went into the prompt templates as negative prompts; style was reviewed by eye, with the assets side by side; and a registry logs 299 asset specs across six batches. The only automated check reads that registry, not the style. The original image files are not yet verified, so what I can show is the process, not a finished set.",
        evidenceHref: "/projects/hoop#decision-timeline",
        boundary:
          "It shows a process, not a consistent finished set: the log itself calls this batch provisional, pending hand-polish.",
      },
      {
        id: "hoop-rejected-list",
        question: "What did the rejected list actually do?",
        answer:
          "More than the positive description did. Naming photoreal, 3D, anime, neon, random text and real trademarks as out of bounds gave a reviewer a test, where 'warm and simplified' only gave an opinion. The reviewer was me, by eye: no script in the pipeline looks at style. A generator will produce any of those on a slightly different prompt, and each looks defensible until it sits next to the rest.",
        evidenceHref: "/projects/hoop#evidence-board",
        boundary:
          "A rejected list only covers failure modes already seen. It would need extending the first time a batch failed in a new direction.",
      },
      {
        id: "hoop-derived-language",
        question: "The visual language comes from another product's design system. How do you think about that?",
        answer:
          "I would say it plainly, because the design document does: the palette and type system are reverse-engineered from Anthropic's product design, and the reason is that a game about one person's whole life needed something unhurried and literary rather than a sports UI of cold blues. Presenting a transfer exercise as original invention is the part that would be dishonest.",
        evidenceHref: "/projects/hoop#iteration-gallery",
        boundary:
          "It is borrowed, and it stops being defensible at the basketball-specific screens, where the source has nothing to say.",
      },
    ],
    managerFollowUp: {
      id: "hoop-manager-follow-up",
      question: "It is large and polished but has no players. Why is it in the portfolio?",
      answer:
        "Because the interesting problem is production discipline at volume, and that is visible without players: rules written before the batches, a rejected list checked by eye, a registry that logs every batch, and 1,975 tests keeping a systems-heavy build correct while content lands. The game self-labels DEMO v0.6 and the case claims no more than that.",
      evidenceHref: "/projects/hoop#outcome-limits",
      boundary:
        "Volume proves process, not that the pacing works for anyone but me — that needs playtests I have not run.",
    },
  },
    pricewise: {
      answers: [
        {
          id: "pricewise-green-build",
          question: "An AI wrote the code and everything passes. What is left for you to check?",
          answer:
            "Whether the feature executes at all. I go feature by feature calling the deployed endpoint, reading the response body and querying the database directly, and I read the code during a migration. Four classes of defect had passed build, type-check and the full suite: semantic search that never used a vector, template lists created empty, cron auth that did not fail closed without its secret, and six declared tables that were never created.",
          evidenceHref: "/projects/pricewise#decision-timeline",
          boundary:
            "It is manual and slow, and it finds nothing most of the time. Turning it into a build gate is the obvious next step and it has not happened yet.",
        },
        {
          id: "pricewise-own-defect",
          question: "Were any of those your own?",
          answer:
            "One, a regression from my own fix to search. Passing the missing field through serialized a 1,536-dimension vector into the API response and pushed three search results to 89 KB. I found it by calling the real endpoint and reading what came back, not by reviewing my own diff. I keep it in the case because a check that only catches the AI is not really a check.",
          evidenceHref: "/projects/pricewise#evidence-board",
          boundary: "It also shows the method is reactive: nothing prevented the defect, something caught it afterwards.",
        },
        {
          id: "pricewise-scope",
          question: "The scope grew from an AI-generated plan and never came back down. What would you check before accepting a plan like that again?",
          answer:
            "What the plan was derived from. This one came from what a complete product should have, not from anyone's need, and the build followed it. On 1 March 2026 a single commit added 5,884 lines, about a quarter of them social features. Commits stopped the next day for five months, and the scope never came back down: the v1 routes were later moved to unversioned paths, not removed. Looking back, a comparison app on simulated data with no registered users should not have kept growing.",
          evidenceHref: "/projects/pricewise#iteration-gallery",
          boundary: "This is a judgement made afterwards. It does not show that I would catch the next plan early.",
        },
      ],
      managerFollowUp: {
        id: "pricewise-manager-follow-up",
        question: "It is live but has zero users. Why does it belong in a portfolio?",
        answer:
          "Because the transferable part is the verification habit, and that is visible without users: reproducible scripts, defects documented with how they were found, and one known mismatch deliberately left unfixed because a wrong match is worse for the user than no match. The case says plainly that whether the product is useful to anyone is untested.",
        evidenceHref: "/projects/pricewise#outcome-limits",
        boundary: "Zero registered users means recognition accuracy on a real crumpled receipt is unknown to me.",
      },
    },
    gapmapper: {
      answers: [
        {
          id: "gapmapper-kill-own-prototype",
          question: "You built the working prototype and then argued against the direction. Walk me through it.",
          answer:
            "The team had nothing demonstrable and I could turn discussion into code, so I built the route-support prototype. Once it was on screen the problem was too: recommending a safer route without being able to guarantee safety gives a system an authority it has not earned. The better it looked, the more convincing that unearned promise became.",
          evidenceHref: "/projects/gapmapper#decision-timeline",
          boundary: "It cost the team a concept that demoed well, and the replacement is slower and harder to show.",
        },
        {
          id: "gapmapper-evidence-model",
          question: "Why do perception and objective indicators never merge into a score?",
          answer:
            "Because merging deletes the uncertainty and makes the screen look more confident than it should. Literature also disagreed with my starting assumption that lighting is a usable safety variable — visibility, enclosure, nearby activity, social cues and time all change how one light is read. If no single indicator explains a place, indicators and perception cannot be blended. Kept apart, someone can ask why a place was flagged instead of being told it is unsafe.",
          evidenceHref: "/projects/gapmapper#evidence-board",
          boundary: "18 interviews give counts of mentions, not a rate or a ranking, which is why they are used as cues throughout.",
        },
        {
          id: "gapmapper-ethics-as-requirements",
          question: "How do you stop an ethical position from being just a paragraph?",
          answer:
            "You write it as system requirements. The one-page brief states them as constraints: reports anonymous, location rounded to a street segment, confidence level and bias notes displayed, no public safety score. That page was the hardest of the three deliverables, because once 'no safety score' is a requirement it stops being an attitude and someone building the thing has to satisfy it.",
          evidenceHref: "/projects/gapmapper#iteration-gallery",
          boundary: "The requirements have never been handed to an actual implementation team.",
        },
      ],
      managerFollowUp: {
        id: "gapmapper-manager-follow-up",
        question: "The final proposal is quieter and less impressive. Was that the right trade?",
        answer:
          "For this problem, yes. The claim moved from 'help one person walk home safely' to 'help an institution see where its own evidence is incomplete' — a claim the work can actually support. I keep the abandoned route prototype in the portfolio precisely because without it the final direction looks like it appeared from nowhere.",
        evidenceHref: "/projects/gapmapper#outcome-limits",
        boundary:
          "I do not think the proposal fully answers the critique it responded to. It changed what I am willing to claim, not who is being asked to change their behaviour.",
      },
    },
    rules: {
      answers: [
        {
          id: "rules-soft-to-threshold",
          question: "How do you turn 'make cycling safer' into something a team can build?",
          answer:
            "You force it into numbers. In Fietspad the proposal drafts did that: routing weights favouring separated segments and quiet streets while down-weighting paint-only lanes, a 150–250 m warning lead, and a 48 px tap-target floor. AI wrote most of those drafts, and the final proposal kept only pre-alerts before roundabouts and left hooks, with 'Calmest' as the default route. A rule with a number in it can be executed and argued with; the original sentence can be neither.",
          evidenceHref: "/projects/rules#decision-timeline",
          boundary: "Committing to thresholds early means committing before there is evidence that these are the right numbers.",
        },
        {
          id: "rules-copy-as-claim",
          question: "Why does the button say 'See safer routes' instead of 'safest'?",
          answer:
            "Because no data available supports the superlative. The same discipline runs through the warnings: they state behaviour rather than direction — take the lane and make eye contact with turning drivers — because that is the actual response to a left hook. Distances are given as distance, not junction counts, since there is no stable 'next intersection' while riding, and the detour button states its own cost in minutes with 'keep current route' as an equal-weight action.",
          evidenceHref: "/projects/rules#iteration-gallery",
          boundary: "A comparative claim is weaker marketing, and none of it has been tested in real riding conditions.",
        },
        {
          id: "rules-ai-register",
          question: "You submitted an AI usage register. What did it actually say?",
          answer:
            "That AI is a strong accelerator for breadth and that depth needs a person. Concretely: transcription dropped names and merged speakers, so we wrote a short style guide for names and suburbs; generative drafts were confident and unsourced, so we verified against official sources and deleted every figure without one; Figma Make's layout drifted on small prompt changes, so every screen was rebuilt in Figma Design; and AI flattened contradictory tensions into single themes, so edge cases went into their own table and each became a feature.",
          evidenceHref: "/projects/rules#evidence-board",
          boundary: "Quality control there was five specific actions rather than a policy, and it depended on someone remembering to run them.",
        },
      ],
      managerFollowUp: {
        id: "rules-manager-follow-up",
        question: "This is coursework and neither piece shipped. What survives outside a course?",
        answer:
          "The move, which is why the two briefs are presented as one case: take a requirement everyone agrees with and force it into a rule that can be built to and argued against. The second brief exists to show it generalises — one 2025 peer-reviewed paper became three independent trigger conditions with their own copy templates and thresholds.",
        evidenceHref: "/projects/rules#outcome-limits",
        boundary:
          "The guide's effect figures are the cited paper's results, not mine, and I wrote a separate section listing what that study cannot support. Fietspad's '6/6 pass' is a self-check, not external validation.",
      },
    },
  ...recentCaseInterviewPacks.en,
  ...lamplightPack.en,
  ...autofillPack.en,
  ...walkiePack.en,
  ...fencepostPack.en,
};

/**
 * Both locales previously pointed at the English packs, so a Chinese reader met
 * full English paragraphs on every case page.
 */
const zhCaseInterviewPacks: Record<ProjectEvidenceSlug, CaseInterviewPack> = {
  connect: {
    answers: [
      {
        id: "connect-paper-reset",
        question: "九月你们已经有能跑的原型了，十月为什么还要回到纸上？",
        answer:
          "因为抓到的缺陷出在结构上，不在表面。受测者找不到回上一页的路；活动卡片一边显示她已报名，一边还给她一个报名按钮。这种问题不是一个组件一个组件补得掉的，所以我们把整个应用重画在一张纸上：五个屏、每条从首页出发的路径、每块功能挂一个人名，然后照着这张纸重做。",
        evidenceHref: "/projects/connect#decision-timeline",
        boundary:
          "我能给出顺序，给不出因果。那张纸记录了新结构，但没有记录每处改动的理由。",
      },
      {
        id: "connect-failed-hypothesis",
        question: "研究杀掉了你哪一条假设？",
        answer:
          "「语言能力是障碍」这条。不是。同样的英文水平，学生在快节奏、嘈杂、人多的场合会闭嘴，在小而慢的场合却讲得很自然：真正的障碍是节奏和人数规模。我们另一条假设也塌了：以为缺口在曝光，其实在跟进。大家都看得到活动，还是没去。",
        evidenceHref: "/projects/connect#evidence-board",
        boundary:
          "这些来自访谈里的模式，不是埋点测出来的。我们事先定的那些阈值，从来没有真的拿逐字稿去逐条打分。",
      },
      {
        id: "connect-mock-data-limit",
        question: "MVP 跑在 mock 数据上。这意味着你没有证明什么？",
        answer:
          "除了界面之外，关于这个产品的几乎所有事。匹配、消息和日程从来没有面对过真实记录、并发或空状态。十一月那几场证明的是一个人能操作这些屏；至于底下那套东西能不能跑，那几场什么都没说。",
        evidenceHref: "/projects/connect#outcome-limits",
        boundary:
          "而且没有任何一轮记录过完成时间或事先定好的成功标准，所以我也给不出任何数字。",
      },
    ],
    managerFollowUp: {
      id: "connect-manager-follow-up",
      question: "你们是五个人。我怎么知道哪些部分是你的？",
      answer:
        "直接问，提交记录会和我说的对得上。我负责前端组件系统和共享状态层，写了一部分后端路由与控制器，做了 71 场研究与测试里的 14 场，并参与撰写 test cards 与 learning cards。地图、wellness hub 和学习伙伴匹配逻辑是别人的。",
      evidenceHref: "/projects/connect#interview-takeaway",
      boundary:
        "这是一个赶期限的课程团队，边界处会糊：我也 review 过、动过一些不是我设计的代码。",
    },
  },
  spectra: {
    answers: [
      {
        id: "spectra-colour-feedback",
        question: "为什么只开放四个间距控件，而不是做成通用的 CSS 编辑器？",
        answer:
          "WCAG 的文本间距条款对行高、字距、词距、段距都给了明确阈值，所以控件清单就定在这四项上。",
        evidenceHref: "/projects/spectra#decision-timeline",
        boundary:
          "这是 DEMO，背后没有用户研究，我没法说这四项就是读者需要的控件。",
      },
      {
        id: "spectra-privacy",
        question: "字体为什么打包进扩展，而不是运行时去取？",
        answer:
          "远端字体请求会让第三方知道谁在读哪一页，断网或者主机变了也会失效。打包的代价是安装包更大，字体只能随新版本更新。",
        evidenceHref: "/projects/spectra#evidence-board",
        boundary:
          "这是围绕隐私的设计取舍，不是做完的隐私审查，也不是无障碍认证。",
      },
      {
        id: "spectra-field-testing",
        question: "上线之前，测试还需要证明什么？",
        answer:
          "要证明真实读者够得到这些控件，也要证明按站点保存符合他们的阅读习惯。目前我只手动跑过文档站、新闻站和单页应用，再加上设置层的 Jest 测试。",
        evidenceHref: "/projects/spectra#outcome-limits",
        boundary:
          "这些检查只能说明注入是成立的，说明不了读者能从中得到什么好处。",
      },
    ],
    managerFollowUp: {
      id: "spectra-manager-follow-up",
      question: "你怎么判断这件事该做成扩展，还是该由浏览器自己来做？",
      answer:
        "我会比两样东西。一边是扩展能做、浏览器没做的事，比如按站点保存设置。另一边是让读者自己安装的门槛，以及注入的样式输给网页自己 CSS 的那些页面。",
      evidenceHref: "/projects/spectra#interview-takeaway",
      boundary:
        "如果浏览器自己内建了同样的控件，我愿意直接放弃这个扩展。",
    },
  },
  maze: {
    answers: [
      {
        id: "maze-safety-tradeoff",
        question: "为什么陷阱最后做成振动，而不是电击？",
        answer:
          "公开展览意味着玩的人无人看管，年龄和身体状况都不知道，逐人做同意和强度校准根本不可能。所以我改成继电器驱动的振动马达，装进指套，感觉仍然落在身体上，但那份风险没了。",
        evidenceHref: "/projects/maze#decision-timeline",
        boundary:
          "我会承认振动确实更弱，我拿一部分「记得住」，换了这台机器可以没人守着一直跑。",
      },
      {
        id: "maze-sensor-timing",
        question: "你怎么做到一次球通过只产生一个游戏事件？",
        answer:
          "十个红外传感器每个都加了消抖和一段冷却窗口。原始读数会重复触发，一次通过打出好几个事件，分数、计时和振动就各说各话了。",
        evidenceHref: "/projects/maze#evidence-board",
        boundary:
          "冷却窗口带来一段盲区，真的很快的第二次通过会被漏掉，这是有意的取舍，不是没想到。",
      },
      {
        id: "maze-web-bridge",
        question: "一个实体装置，为什么还要做一个浏览器控制台？",
        answer:
          "Web Serial 控制台一边实时映射迷宫的状态，一边留了一个不接硬件也能跑的演示模式；两边靠回归测试互相咬住，保证演示模式说的仍然是固件的规则。",
        evidenceHref: "/projects/maze#iteration-gallery",
        boundary:
          "两套模式会漂移，一致性测试的存在，正是因为我不信自己能靠手工让它们一直对齐。",
      },
    ],
    managerFollowUp: {
      id: "maze-manager-follow-up",
      question: "这个案例能证明什么，是纯屏幕的案例证明不了的？",
      answer:
        "它证明我能把一个想法贯穿整条链路：传感、固件状态机、实体反馈，再到浏览器上的控制界面；也证明我能在陌生人真的会上手的硬件上，做出校准和安全的判断。",
      evidenceHref: "/projects/maze#interview-takeaway",
      boundary:
        "它只是一台展览用的机器，线是手工走的，证明的是搭建能力和系统思维，不是可量产。",
    },
  },
  vigil: {
    answers: [
      {
        id: "vigil-weak-confidence",
        question: "为什么要故意把分类器的置信度做成弱信号？",
        answer:
          "第一版里置信度分得干干净净：判断对的全在 0.84 以上，判断错的全在 0.82 以下。参与者不用读任何一封邮件，光看这个数字就能把 17 个错误全挑出来，那样界面之间的对比就什么都测不到。分层重采样之后，错误排序的 AUC 降到 0.72；现在只要它漂回 0.75 以上，构建脚本就直接失败。",
        evidenceHref: "/projects/vigil#decision-timeline",
        boundary:
          "这是人工撰写语料的性质，不是在说真实的分类器就长这样。",
      },
      {
        id: "vigil-predictions-first",
        question: "你在测试之前就写下了预期哪个变体会赢。为什么？",
        answer:
          "我会把那张预测表拿出来：日期在第一个变体被打开之前。它的形状也值得看：两注押在「加摩擦」，一注押在「减少搜索成本」。事后补写的预测永远和结果一致，所以它证明不了任何推理真的发生过。",
        evidenceHref: "/projects/vigil#evidence-board",
        boundary:
          "预测在案，结果不在，因为还没有人跑过这个测试。",
      },
      {
        id: "vigil-ai-workflow",
        question: "代码都是 AI 写的。那你的工作到底是什么？",
        answer:
          "这两件事要分开说。Claude Code 和 Codex 写了语料管线、原型和 React 版本，而且很快。交不出去的是这几个判断：置信度必须做到不提供信息；一条描述了邮件里根本不存在的线索的解释，是会毁掉整个研究的缺陷；以及这个界面应该是一台仪器，而不是一个收件箱。",
        evidenceHref: "/projects/vigil#iteration-gallery",
        boundary:
          "这套工作流产出的第一版视觉合格但没有主张：那就是它的失败模式，第二版才是我的。",
      },
    ],
    managerFollowUp: {
      id: "vigil-manager-follow-up",
      question: "都还没人测过，为什么放进作品集？",
      answer:
        "因为它展示的正是平时看不见的那部分：材料、变体、协议，以及那些决定「这个研究到底能不能回答问题」的验证闸门。三个设计问题都标着未解，预测都在案，所以将来真跑出结果，是可以拿回来对的。",
      evidenceHref: "/projects/vigil#outcome-limits",
      boundary:
        "在有人真的跑之前，这里每一个关于变体的论证都是推理而不是证据，案例本身就是这么写的。",
    },
  },
  hoop: {
    answers: [
      {
        id: "hoop-style-coherence",
        question: "299 条资产规格的登记表，你怎么让它们看起来像同一个世界？",
        answer:
          "我会按顺序讲，也讲清每一步证明不了什么。三份美术圣经按画布尺寸分开，写在批次之前；里面的禁止项写进提示词模板，成了负面提示词。风格靠人工审查，把资产并排摆开看。登记表记下六个批次、299 条资产规格，唯一的自动检查读的是这份登记表，不查风格。原始图像文件还没核实，所以我能拿出来的是这套流程，不是一整套成品。",
        evidenceHref: "/projects/hoop#decision-timeline",
        boundary:
          "这只证明流程在，成品是否统一还说不上：日志自己就把这一批标成临时产能，留待以后手工打磨。",
      },
      {
        id: "hoop-rejected-list",
        question: "拒绝清单实际起了什么作用？",
        answer:
          "这张「不要什么」的清单，比正面描述有用得多。把写实、3D、日系动画、霓虹、随机文字和真实商标点名列为出界，审查的人就有了可复核的判据。「温暖、简化」只给得出一个观点。审查的人就是我，靠眼睛看，管线里没有任何脚本查风格。生成器换个提示词就能产出上面任何一种，而且单看每一张都说得通，直到和其他素材摆在一起。",
        evidenceHref: "/projects/hoop#evidence-board",
        boundary:
          "这张清单只覆盖已经见过的失败方式。第一次出现新方向的翻车，它就得再加一条。",
      },
      {
        id: "hoop-derived-language",
        question: "视觉语言来自另一个产品的设计系统，你怎么看这件事？",
        answer:
          "我会直说，因为设计文档里就是这么写的：配色和字体系统是从 Anthropic 的产品设计反推出来的。原因是，一个讲一个人一生的游戏，需要的是从容、带文学感的表面，而不是一整套冷蓝配能量渐变的体育界面。把一次迁移练习说成原创发明，那才是不诚实的地方。",
        evidenceHref: "/projects/hoop#iteration-gallery",
        boundary:
          "它是借来的，而且到了篮球本身那几屏就撑不住了。在那里，源头没有话可说。",
      },
    ],
    managerFollowUp: {
      id: "hoop-manager-follow-up",
      question: "体量大、也够完整，但没有玩家。为什么放进作品集？",
      answer:
        "因为这里有意思的问题是「上了量之后怎么守住生产纪律」，这件事不需要玩家就看得见。规则写在批次之前，拒绝清单靠人眼对照，登记表记下每一批。再加上 1,975 个测试，在内容不断落地的同时守住一个系统很重的构建。游戏自己标着 DEMO v0.6，案例也没有多说一个字。",
      evidenceHref: "/projects/hoop#outcome-limits",
      boundary:
        "体量证明的是流程，不是这个节奏对除我之外的人也成立，那需要我还没跑过的玩家测试。",
    },
  },
    pricewise: {
      answers: [
        {
          id: "pricewise-green-build",
          question: "代码是 AI 写的，而且全都通过了。那你还要查什么？",
          answer:
            "查功能有没有真的执行。我逐个功能打线上接口、读真实返回、直接查数据库，迁移时再读代码。通过了构建、类型检查和整套测试的缺陷有四类：语意搜索从来没用过向量、用模板建的清单永远是空的、定时任务鉴权在密钥缺失时没有默认拒绝、声明过的六张表数据库里根本没建。",
          evidenceHref: "/projects/pricewise#decision-timeline",
          boundary: "它慢、全靠手动，而且大部分时候什么也查不出来。把它接进构建流程变成关卡是显而易见的下一步，但还没做。",
        },
        {
          id: "pricewise-own-defect",
          question: "这些缺陷里有你自己的吗？",
          answer:
            "有一处，是我修语义搜索时带进去的回归。补上漏传的字段之后，一个 1536 维的向量跟着序列化进了接口返回，三条搜索结果把响应撑到 89 KB。它是打真实接口、读返回查出来的，不是靠审我自己的 diff。我把它写进案例，因为一道只抓 AI 的检查算不上检查。",
          evidenceHref: "/projects/pricewise#evidence-board",
          boundary: "它也说明这套方法是事后的：没有任何东西阻止了这个缺陷，只是有东西在事后抓到了它。",
        },
        {
          id: "pricewise-scope",
          question: "范围跟着 AI 生成的规划长大，后来一直没有缩回去。再接一份这样的规划，你会先查什么？",
          answer:
            "先查这份规划从哪里来。PriceWise 那份是从「一个完整的产品该有什么」推出来的，不是从任何人的需求推出来的，开发一路照着做。2026 年 3 月 1 日单次提交 5884 行，社交功能约占四分之一。第二天之后，五个月没有提交。范围也一直没有缩回去，v1 路由后来只是换了路径，没有删。回头看，一个建在拟真数据上、注册用户为 0 的比价应用，不该继续长下去。",
          evidenceHref: "/projects/pricewise#iteration-gallery",
          boundary: "这是事后的判断，证明不了下一份规划我能早点看出来。",
        },
      ],
      managerFollowUp: {
        id: "pricewise-manager-follow-up",
        question: "它是线上的，但注册用户是 0。这样的东西凭什么放进作品集？",
        answer:
          "因为能迁移的那部分是验证习惯，而这件事不需要用户也看得见：可复现的脚本、写明「怎么查出来的」的缺陷记录，还有一处刻意不修的已知错配：因为对用户来说，配到错的商品比匹配不到更糟。案例直说了：这个产品对真实用户有没有用，没有验证过。",
        evidenceHref: "/projects/pricewise#outcome-limits",
        boundary: "注册用户是 0，所以普通人拍一张皱掉的小票识别成功率是多少，我不知道。",
      },
    },
    gapmapper: {
      answers: [
        {
          id: "gapmapper-kill-own-prototype",
          question: "你把能跑的原型做出来了，然后主张放弃这个方向。说说这个过程。",
          answer:
            "团队当时没有能演示的东西，而我是能把讨论变成代码的那个，所以路线支持原型由我建。屏幕一亮起来，问题也跟着亮了：一个建议「更安全路线」却保证不了安全的系统，获得了一种自己没有挣来的权威。它做得越像样，那个兑现不了的承诺就越有说服力。",
          evidenceHref: "/projects/gapmapper#decision-timeline",
          boundary: "代价是团队失去了一个演示效果很好的概念，换来的方案更慢、也更难展示。",
        },
        {
          id: "gapmapper-evidence-model",
          question: "为什么感知和客观指标从不合成一个分数？",
          answer:
            "因为一合并，不确定性就消失了，屏幕会显得比它应有的样子更自信。文献也不同意我最初的假设「灯多则安全」：能见度、围合感、周围有没有活动、社会线索、时间，都会改变同一盏灯被怎么解读。既然单个指标都解释不了一个地方，指标和感知就不能揉在一起。分开放，人可以追问「为什么这里被标出来」，而不是被告知「这里就是不安全」。",
          evidenceHref: "/projects/gapmapper#evidence-board",
          boundary: "18 个访谈只能数出提及次数，撑不起任何比例或排名，所以整份工作里只当感知线索用。",
        },
        {
          id: "gapmapper-ethics-as-requirements",
          question: "怎么让一个伦理立场不停留在一段话上？",
          answer:
            "把它写成系统要求。一页 brief 把它们写成约束：上报匿名、位置取整到街段、必须显示信心水平与偏差标注、不出公开的安全分数。这一页是三件交付物里最难写的：因为「不出安全分数」一旦成为系统要求，就不再是态度，做这个东西的人必须满足它。",
          evidenceHref: "/projects/gapmapper#iteration-gallery",
          boundary: "这些要求从来没有真的交给一个实现团队。",
        },
      ],
      managerFollowUp: {
        id: "gapmapper-manager-follow-up",
        question: "最终提案更安静、也更不惊艳。这个交换划算吗？",
        answer:
          "对这个问题来说，划算。主张从「帮一个人安全地走夜路」变成了「让机构看见自己的证据在哪里不完整」：后者是这份工作真的撑得起的。那版被放弃的路线原型我留在作品集里，正因为没有它，最终方向看起来会像凭空出现。",
        evidenceHref: "/projects/gapmapper#outcome-limits",
        boundary: "我也不认为最终提案完全回答了那条批评。它改变的是我愿意声称什么，不是「究竟在要求谁改变行为」。",
      },
    },
    rules: {
      answers: [
        {
          id: "rules-soft-to-threshold",
          question: "「让骑车更安全」这句话，你怎么把它变成团队能施工的东西？",
          answer:
            "把它逼成数字。Fietspad 的提案草稿就是这么做的。草稿里的路线权重优先分隔路段与安静街道，给只有一层油漆的车道降权；提示提前量是 150–250 m，点击区下限是 48px。这些草稿多由 AI 起草，最终提案只保留了环岛与左勾弯前的预警，并把「最平稳」设为默认路线。一条带数字的规则能被执行、也能被反驳；原来那句话两样都做不到。",
          evidenceHref: "/projects/rules#decision-timeline",
          boundary: "这么早定阈值，等于在还没有证据说明这些数字对不对的时候就先认了。",
        },
        {
          id: "rules-copy-as-claim",
          question: "按钮为什么写「See safer routes」而不是「最安全」？",
          answer:
            "因为没有任何数据能支撑那个最高级。同一条纪律贯穿整个提示系统：提示写行为不写方向（占道，并与转弯车辆做眼神确认），因为那才是左勾弯的真实应对。距离按距离给不按路口给，因为骑行中没有「下一个路口」这种稳定参照；绕路按钮把多花的分钟数写在自己身上，而「保持原路线」是平等的一级按钮。",
          evidenceHref: "/projects/rules#iteration-gallery",
          boundary: "比较级作为宣传更弱，而且这一整套都没有在真实骑行环境里测过。",
        },
        {
          id: "rules-ai-register",
          question: "你交过一份 AI 使用标注册。它到底写了什么？",
          answer:
            "写的是：AI 在广度上是强力加速器，深度得人来检查。具体说：转录漏人名、合并发言人，所以我们建了一份人名与郊区的简短风格指南；生成的初稿听起来笃定实则无据，所以对照官方来源逐条核实、删掉所有没有出处的数字；Figma Make 小改提示词就大幅偏移，所以每一屏在 Figma Design 重建；AI 还会把互相矛盾的张力并成一个主题，所以边缘案例单独列表，后来各自变成了具体功能。",
          evidenceHref: "/projects/rules#evidence-board",
          boundary: "那里的质量控制是五条具体动作，不是一套制度，而且要靠人记得去执行。",
        },
      ],
      managerFollowUp: {
        id: "rules-manager-follow-up",
        question: "这是课程作业，两份都没上线。离开课程之后还剩下什么？",
        answer:
          "剩下那个动作，这也是两份作业合成一个案例的原因：把一句所有人都同意的要求，逼成一条能施工、也能被反驳的规则。第二份作业存在的意义就是证明它能脱离单个项目：一篇 2025 年的同行评审论文，变成了三条各带文案模板和阈值的独立触发条件。",
        evidenceHref: "/projects/rules#outcome-limits",
        boundary:
          "指南里的效果数字是所引论文的结果，不是我的，我另写了一节列出那份研究撑不起的部分。Fietspad 的「6/6 通过」是自查清单，不是外部验证。",
      },
    },
  ...recentCaseInterviewPacks.zh,
  ...lamplightPack.zh,
  ...autofillPack.zh,
  ...walkiePack.zh,
  ...fencepostPack.zh,
};

const caseInterviewPacks: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseInterviewPack>> = {
  en: sharedCaseInterviewPacks,
  zh: zhCaseInterviewPacks,
};


// Links into an unlisted case are dropped. A role left with no proof link, or
// a capability left with no evidence in any listed case, is dropped with them
// rather than shown as a claim with nothing behind it. When Vigil was unlisted
// that took out the AI UX role and the AI UX and trust row: Vigil was the only
// evidence either had. Both came back on 2026-09-28 as a thread through
// PriceWise, Perception Gap Mapper, UQ Connect and Hoop Dream, every cell
// supporting rather than primary (see ai-trust-thread.ts).
export function getHiringRoleFits(locale: ProofLocale): HiringRoleFit[] {
  return hiringRoleFits[locale]
    .map((role) => ({
      ...role,
      proofLinks: role.proofLinks.filter((link) => !linksToUnlistedProject(link.href)),
      bestCases: role.bestCases.filter((slug) => !isUnlistedProject(slug)),
    }))
    .filter((role) => role.proofLinks.length > 0);
}

export function getEvidenceMatrix(locale: ProofLocale): EvidenceMatrixCapability[] {
  return evidenceMatrix[locale]
    .map((capability) => ({
      ...capability,
      cases: Object.fromEntries(
        Object.entries(capability.cases).filter(([slug]) => !isUnlistedProject(slug)),
      ) as EvidenceMatrixCapability["cases"],
    }))
    .filter((capability) =>
      Object.values(capability.cases).some((cell) => cell !== undefined && cell.strength !== "none"),
    );
}

export function getCaseInterviewPack(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseInterviewPack {
  return caseInterviewPacks[locale][slug];
}
