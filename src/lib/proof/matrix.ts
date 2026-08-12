import type {
  CaseInterviewPack,
  EvidenceMatrixCapability,
  HiringRoleFit,
  ProjectEvidenceSlug,
  ProofLocale,
} from "./types";


const sharedHiringRoleFits: HiringRoleFit[] = [
  {
    id: "ux-product",
    label: "UX/Product Design",
    fit:
      "Best fit when the team needs research to become product direction, IA, flows, and measurable iteration.",
    proofLinks: [
      { label: "UQ Connect: back to paper", href: "/projects/connect#decision-timeline" },
      { label: "MazeRunners hardware trade-offs", href: "/projects/maze#decision-timeline" },
      { label: "Hoop Dream production pipeline", href: "/projects/hoop#decision-timeline" },
    ],
    bestCases: ["connect", "maze", "hoop"],
    risk:
      "I am strongest when product ambiguity needs structure; I would pair with engineering early for production constraints.",
    interviewAngle: "Ask how I turn research signals into scoped product decisions.",
  },
  {
    id: "ux-research",
    label: "UX Research",
    fit:
      "Best fit when the team needs mixed methods, careful sampling, and research outputs that change product decisions.",
    proofLinks: [
      { label: "Connect research evidence", href: "/projects/connect#evidence-board" },
      { label: "Spectra field evidence", href: "/projects/spectra#evidence-board" },
      { label: "Research limits", href: "/projects/connect#outcome-limits" },
    ],
    bestCases: ["connect", "spectra"],
    risk:
      "Most projects are academic or self-initiated, so I am explicit about what evidence is measured and what still needs field validation.",
    interviewAngle: "Ask how I choose methods when the problem is still ambiguous.",
  },
  {
    id: "ai-ux",
    label: "AI UX",
    fit:
      "Best fit when the team needs AI assistance designed around timing, agency, trust, and emotional safety.",
    proofLinks: [
      { label: "Vigil: designing against over-trust", href: "/projects/vigil#decision-timeline" },
      { label: "Vigil: what it does not prove yet", href: "/projects/vigil#outcome-limits" },
    ],
    bestCases: ["vigil", "connect"],
    risk:
      "I treat AI as a product interaction problem first and would validate model behavior with real users before scaling claims.",
    interviewAngle: "Ask where AI should intervene and where it should stay quiet.",
  },
  {
    id: "accessibility",
    label: "Accessibility / Inclusive Design",
    fit:
      "Best fit when inclusive research has to become practical interaction decisions beyond compliance language.",
    proofLinks: [
      { label: "Spectra accessibility evidence", href: "/projects/spectra#evidence-board" },
      { label: "Spectra privacy decision", href: "/projects/spectra#decision-timeline" },
      { label: "Spectra field limits", href: "/projects/spectra#outcome-limits" },
    ],
    bestCases: ["spectra"],
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
    fit: "适合需要把研究变成产品方向、信息架构、流程与可迭代决策的团队。",
    proofLinks: [
      { label: "UQ Connect：回到纸上", href: "/projects/connect#decision-timeline" },
      { label: "MazeRunners 的软硬件取舍", href: "/projects/maze#decision-timeline" },
      { label: "Hoop Dream 的生产管线", href: "/projects/hoop#decision-timeline" },
    ],
    bestCases: ["connect", "maze", "hoop"],
    risk: "我最强的地方是把模糊的产品问题结构化；生产环境的约束我会尽早找工程一起看。",
    interviewAngle: "可以问我怎么把研究信号收敛成有范围的产品决策。",
  },
  {
    id: "ux-research",
    label: "UX 研究",
    fit: "适合需要混合方法、谨慎取样，并且要让研究真的改变产品决策的团队。",
    proofLinks: [
      { label: "Connect 的研究证据", href: "/projects/connect#evidence-board" },
      { label: "Spectra 的实地证据", href: "/projects/spectra#evidence-board" },
      { label: "研究的限制", href: "/projects/connect#outcome-limits" },
    ],
    bestCases: ["connect", "spectra"],
    risk: "多数项目是课程或自发项目，所以我会讲清楚哪些有证据、哪些还需要实地验证。",
    interviewAngle: "可以问我在问题还很模糊时怎么选方法。",
  },
  {
    id: "ai-ux",
    label: "AI 交互设计",
    fit: "适合需要围绕时机、控制感、信任与情绪安全来设计 AI 辅助的团队。",
    proofLinks: [
      { label: "Vigil：如何设计出「不轻易信」", href: "/projects/vigil#decision-timeline" },
      { label: "Vigil：它还证明不了什么", href: "/projects/vigil#outcome-limits" },
    ],
    bestCases: ["vigil", "connect"],
    risk: "我先把 AI 当成产品交互问题；在放大任何结论之前，我会拿真实用户验证模型行为。",
    interviewAngle: "可以问我 AI 应该在哪里介入、又该在哪里闭嘴。",
  },
  {
    id: "accessibility",
    label: "无障碍 / 包容性设计",
    fit: "适合需要把包容性研究落成实际交互决策、而不只是合规话术的团队。",
    proofLinks: [
      { label: "Spectra 的无障碍证据", href: "/projects/spectra#evidence-board" },
      { label: "Spectra 的隐私决策", href: "/projects/spectra#decision-timeline" },
      { label: "Spectra 的实地限制", href: "/projects/spectra#outcome-limits" },
    ],
    bestCases: ["spectra"],
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
    label: "Research framing",
    summary: "Turns broad ambiguity into scoped questions, samples, and product decisions.",
    cases: {
      connect: {
        strength: "primary",
        proof: "Every hypothesis carried a numeric pass mark written before fieldwork; several failed it.",
        href: "/projects/connect#evidence-board",
      },
      spectra: {
        strength: "supporting",
        proof: "WCAG text-spacing criteria decided which controls the extension exposes.",
        href: "/projects/spectra#evidence-board",
      },
    },
  },
  {
    id: "information-architecture",
    label: "Information architecture",
    summary: "Gives a sprawling product a structure people can navigate, then checks whether they can.",
    cases: {
      connect: {
        strength: "primary",
        proof: "Redrew the whole app as five screens on paper, mid-build, with every route off the home page.",
        href: "/projects/connect#decision-timeline",
      },
    },
  },
  {
    id: "accessibility",
    label: "Accessibility",
    summary: "Converts inclusive research into product behavior and constraints.",
    cases: {
      spectra: {
        strength: "primary",
        proof: "Settings save per site, so a reader sets a page once and it stays.",
        href: "/projects/spectra#decision-timeline",
      },
      connect: {
        strength: "supporting",
        proof: "Plain-language labels reduced navigation friction.",
        href: "/projects/connect#decision-timeline",
      },
    },
  },
  {
    id: "ai-trust",
    label: "AI UX and trust",
    summary: "Designs AI assistance around agency, timing, confidence, and boundaries.",
    cases: {
      vigil: {
        strength: "primary",
        proof: "Built confidence as weak evidence so reviewers had to read the message.",
        href: "/projects/vigil#decision-timeline",
      },
    },
  },
  {
    id: "product-judgment",
    label: "Product judgment",
    summary: "Makes explicit trade-offs between evidence, constraints, and product direction.",
    cases: {
      connect: {
        strength: "primary",
        proof: "Protected measurable IA before polishing interface fidelity.",
        href: "/projects/connect#decision-timeline",
      },
      spectra: {
        strength: "primary",
        proof: "Bundled the font locally so the tool works offline and leaks no browsing data.",
        href: "/projects/spectra#decision-timeline",
      },
      vigil: {
        strength: "supporting",
        proof: "Refused search, batch actions, and severity tiers to protect the measure.",
        href: "/projects/vigil#decision-timeline",
      },
    },
  },
  {
    id: "measurement-validation",
    label: "Measurement and validation",
    summary: "Uses measured outcomes and limits to keep proof honest.",
    cases: {
      connect: {
        strength: "primary",
        proof: "The MVP ran on mock data and no round was timed, so the case claims a direction, not a measured gain.",
        href: "/projects/connect#outcome-limits",
      },
      spectra: {
        strength: "primary",
        proof: "Field testing exposed lighting, motion, and privacy constraints.",
        href: "/projects/spectra#outcome-limits",
      },
      vigil: {
        strength: "supporting",
        proof: "The build fails if confidence starts predicting the classifier's errors.",
        href: "/projects/vigil#outcome-limits",
      },
    },
  },
  {
    id: "communication",
    label: "Communication and facilitation",
    summary: "Explains decisions, invites critique, and turns evidence into shared direction.",
    cases: {
      connect: {
        strength: "supporting",
        proof: "Decision log makes IA trade-offs inspectable.",
        href: "/projects/connect#interview-takeaway",
      },
      spectra: {
        strength: "supporting",
        proof: "Inclusive rationale is framed for critique and next validation.",
        href: "/projects/spectra#interview-takeaway",
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
    label: "研究框定",
    summary: "把宽泛的模糊问题收敛成答得了的问题、取得到的样本、落得了地的产品决策。",
    cases: {
      connect: {
        strength: "primary",
        proof: "每条假设都带着进场前写好的数字及格线；有几条没过。",
        href: "/projects/connect#evidence-board",
      },
      spectra: {
        strength: "supporting",
        proof: "WCAG 的文本间距条款决定了这个扩展开放哪几个控件。",
        href: "/projects/spectra#evidence-board",
      },
    },
  },
  {
    id: "information-architecture",
    label: "信息架构",
    summary: "给一个不断膨胀的产品一套能走得通的结构，再去验证用户是不是真的走得通。",
    cases: {
      connect: {
        strength: "primary",
        proof: "开发中途把整个应用在纸上重画成五个屏，并画出从首页出发的每条路径。",
        href: "/projects/connect#decision-timeline",
      },
    },
  },
  {
    id: "accessibility",
    label: "无障碍",
    summary: "把包容性研究变成产品行为和写得明白的约束。",
    cases: {
      spectra: {
        strength: "primary",
        proof: "设置按站点保存，读者对一个页面设一次就一直有效。",
        href: "/projects/spectra#decision-timeline",
      },
      connect: {
        strength: "supporting",
        proof: "用大白话写的标签，降低了导航时的理解成本。",
        href: "/projects/connect#decision-timeline",
      },
    },
  },
  {
    id: "ai-trust",
    label: "AI 交互与信任",
    summary: "围绕控制感、时机、信心与边界来设计 AI 辅助。",
    cases: {
      vigil: {
        strength: "primary",
        proof: "刻意把置信度做成弱证据，逼审阅者去读邮件本身。",
        href: "/projects/vigil#decision-timeline",
      },
    },
  },
  {
    id: "product-judgment",
    label: "产品判断",
    summary: "在证据、约束和产品方向之间，做出摊得开来讲的取舍。",
    cases: {
      connect: {
        strength: "primary",
        proof: "先把信息架构做到可验证，再去打磨界面保真度。",
        href: "/projects/connect#decision-timeline",
      },
      spectra: {
        strength: "primary",
        proof: "字体打包在本地，所以离线能用，也不会泄露读者在看什么。",
        href: "/projects/spectra#decision-timeline",
      },
      vigil: {
        strength: "supporting",
        proof: "为了守住测量，主动砍掉搜索、批量操作和风险分级。",
        href: "/projects/vigil#decision-timeline",
      },
    },
  },
  {
    id: "measurement-validation",
    label: "测量与验证",
    summary: "用测到的结果和讲清楚的限制，让证据保持诚实。",
    cases: {
      connect: {
        strength: "primary",
        proof: "MVP 跑在 mock 数据上，也没有任何一轮计时，所以这个案例说的是方向，不是测出来的提升。",
        href: "/projects/connect#outcome-limits",
      },
      spectra: {
        strength: "primary",
        proof: "真实场景测试暴露出光照、移动和隐私上的约束。",
        href: "/projects/spectra#outcome-limits",
      },
      vigil: {
        strength: "supporting",
        proof: "一旦置信度开始能预测分类器的错误，构建就直接失败。",
        href: "/projects/vigil#outcome-limits",
      },
    },
  },
  {
    id: "communication",
    label: "表达与协作",
    summary: "把决策讲清楚、主动请人挑刺，并把证据变成团队的共同方向。",
    cases: {
      connect: {
        strength: "supporting",
        proof: "决策记录让信息架构的取舍可以被逐条检查。",
        href: "/projects/connect#interview-takeaway",
      },
      spectra: {
        strength: "supporting",
        proof: "包容性设计的理由是摊开来给人挑刺的，并写明了下一步要验证什么。",
        href: "/projects/spectra#interview-takeaway",
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
        "Ask, and the commit history will match what I say. I owned the front-end component system and the shared state layer, wrote some of the backend routes and controllers, ran 14 of the 71 interviews, and co-wrote the test and learning cards. The map feature, the wellness hub and the study-buddy matching logic were other people's.",
      evidenceHref: "/projects/connect#interview-takeaway",
      boundary:
        "It was a course team under a deadline, so ownership blurred at the edges — I reviewed and touched code I did not design.",
    },
  },
  spectra: {
    answers: [
      {
        id: "spectra-colour-feedback",
        question: "Why avoid colour-only feedback as the primary interaction?",
        answer:
          "I would explain how the WCAG text-spacing criteria set the control list, and why the font is bundled rather than fetched from a CDN.",
        evidenceHref: "/projects/spectra#decision-timeline",
        boundary:
          "I would not claim one feedback model covers every colour vision profile without broader field validation.",
      },
      {
        id: "spectra-privacy",
        question: "Why is the font bundled instead of fetched at runtime?",
        answer:
          "I would show how public-use anxiety made glanceable, user-controlled feedback more important than persistent visible assistance.",
        evidenceHref: "/projects/spectra#evidence-board",
        boundary:
          "The privacy model is a product direction, not a completed legal or clinical accessibility audit.",
      },
      {
        id: "spectra-field-testing",
        question: "What would field testing need to prove?",
        answer:
          "I would test lighting, motion, object distance, and real task contexts before claiming the interaction is reliable outdoors.",
        evidenceHref: "/projects/spectra#outcome-limits",
        boundary:
          "Prototype recognition confidence is useful evidence, but not enough to ship as assistive infrastructure.",
      },
    ],
    managerFollowUp: {
      id: "spectra-manager-follow-up",
      question: "How would you decide whether this belongs in an extension or in the browser itself?",
      answer:
        "I would compare the value of in-context feedback against privacy cost, device friction, and recognition reliability in field tasks.",
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
        question: "How do you keep hundreds of generated assets looking like one world?",
        answer:
          "I would show the order: art bible first, then batch prompts that cite it, then a style gate reviewed against existing runtime anchors, then a production log recording counts per batch. 299 assets across six batches went through that, and coherence became a property of the process rather than an argument re-run per asset.",
        evidenceHref: "/projects/hoop#decision-timeline",
        boundary:
          "It buys stylistic consistency, not artistry — this is a provisional production batch, and the log labels it that way.",
      },
      {
        id: "hoop-rejected-list",
        question: "What actually made the style gate work?",
        answer:
          "The rejected list, more than the positive description. Naming photoreal, 3D, anime, neon, random text and real trademarks as out of bounds gave a reviewable test, where 'warm and simplified' only gave an opinion. A generator will produce any of those on a slightly different prompt, and each looks defensible until it sits next to the rest.",
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
        "Because the interesting problem is production discipline at volume, and that is visible without players: rules written before output, a gate that rejects, a log that makes every batch auditable, and 1,975 tests keeping a systems-heavy build correct while content lands. The game self-labels DEMO v0.6 and the case claims no more than that.",
      evidenceHref: "/projects/hoop#outcome-limits",
      boundary:
        "Volume proves process, not that the pacing works for anyone but me — that needs playtests I have not run.",
    },
  },
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
          "因为抓到的缺陷是结构性的，不是表面的。受测者找不到回上一页的路；活动卡片一边显示她已报名，一边还给她一个报名按钮。这种问题不是一个组件一个组件补得掉的，所以我们把整个应用重画在一张纸上——五个屏、每条从首页出发的路径、每块功能挂一个人名——然后照着这张纸重做。",
        evidenceHref: "/projects/connect#decision-timeline",
        boundary:
          "我能给出的是顺序，不是因果。那张纸记录了新结构，但没有记录每处改动的理由。",
      },
      {
        id: "connect-failed-hypothesis",
        question: "研究杀掉了你哪一条假设？",
        answer:
          "「语言能力是障碍」这条。不是。同样的英文水平，学生在快节奏、嘈杂、人多的场合会闭嘴，在小而慢的场合却讲得很自然——真正的障碍是节奏和人数规模。我们另一条假设也塌了：以为缺口在曝光，其实在跟进——大家都看得到活动，还是没去。",
        evidenceHref: "/projects/connect#evidence-board",
        boundary:
          "这些来自访谈里的模式，不是被埋点测量出来的。我们事先定的那些阈值，从来没有真的拿逐字稿去逐条打分。",
      },
      {
        id: "connect-mock-data-limit",
        question: "MVP 跑在 mock 数据上。这意味着你没有证明什么？",
        answer:
          "除了界面之外，关于这个产品的几乎所有事。匹配、消息和日程从来没有面对过真实记录、并发或空状态。十一月那几场证明的是一个人能操作这些屏；至于底下那套东西能不能跑，它一句话都没说。",
        evidenceHref: "/projects/connect#outcome-limits",
        boundary:
          "而且没有任何一轮记录过完成时间或事先定好的成功标准，所以我也给不出任何数字。",
      },
    ],
    managerFollowUp: {
      id: "connect-manager-follow-up",
      question: "你们是五个人。我怎么知道哪些部分是你的？",
      answer:
        "直接问，提交记录会和我说的对得上。我负责前端组件系统和共享状态层，写了一部分后端路由与控制器，做了 71 场访谈里的 14 场，并参与撰写 test cards 与 learning cards。地图、wellness hub 和学习伙伴匹配逻辑是别人的。",
      evidenceHref: "/projects/connect#interview-takeaway",
      boundary:
        "这是一个赶期限的课程团队，边界处会糊——我也 review 过、动过一些不是我设计的代码。",
    },
  },
  spectra: {
    answers: [
      {
        id: "spectra-colour-feedback",
        question: "为什么不把「只靠颜色」当成主要的反馈方式？",
        answer:
          "我会讲 WCAG 的文本间距条款怎么定下了控件清单，以及字体为什么打包进扩展而不是从 CDN 取。",
        evidenceHref: "/projects/spectra#decision-timeline",
        boundary:
          "我不会说一套反馈模型能覆盖所有色觉类型，那需要更大范围的实地验证。",
      },
      {
        id: "spectra-privacy",
        question: "字体为什么打包进扩展，而不是运行时去取？",
        answer:
          "我会讲在公共场合被看见这件事本身带来的压力：它让「一眼扫完、自己决定什么时候用」比「一直挂在眼前的辅助」重要得多。",
        evidenceHref: "/projects/spectra#evidence-board",
        boundary:
          "这套隐私处理是产品方向，不是做完的法务审查，也不是临床级的无障碍认证。",
      },
      {
        id: "spectra-field-testing",
        question: "真实场景测试需要证明什么？",
        answer:
          "光照、移动、物体距离，以及真实的任务场景 —— 这几样都过了，才敢说这个交互在户外靠得住。",
        evidenceHref: "/projects/spectra#outcome-limits",
        boundary:
          "原型阶段的识别信心是有用的证据，但离能当成辅助设施交付还差得远。",
      },
    ],
    managerFollowUp: {
      id: "spectra-manager-follow-up",
      question: "你怎么判断这件事该做成 AR，还是做成更简单的工具？",
      answer:
        "我会把「在情境里当场给出判断」的价值，和隐私成本、戴设备的麻烦、以及真实任务里的识别可靠性放在一起比。",
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
          "公开展览意味着玩的人无人看管，年龄和身体状况都不知道，逐人做同意和强度校准根本不可能。所以我改成继电器驱动的振动马达，装进指套 —— 感觉仍然落在身体上，但那份风险没了。",
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
          "冷却窗口带来一段盲区，真的很快的第二次通过会被漏掉 —— 这是有意的取舍，不是没想到。",
      },
      {
        id: "maze-web-bridge",
        question: "一个实体装置，为什么还要做一个浏览器控制台？",
        answer:
          "Web Serial 控制台一边实时映射迷宫的状态，一边留了一个不接硬件也能跑的演示模式；两边靠回归测试互相咬住，保证演示模式说的仍然是固件的规则。",
        evidenceHref: "/projects/maze#iteration-gallery",
        boundary:
          "两套模式会漂移 —— 一致性测试的存在，正是因为我不信自己能靠手工让它们一直对齐。",
      },
    ],
    managerFollowUp: {
      id: "maze-manager-follow-up",
      question: "这个案例能证明什么，是纯屏幕的案例证明不了的？",
      answer:
        "它证明我能把一个想法贯穿整条链路：传感、固件状态机、实体反馈，再到浏览器上的控制界面；也证明我能在陌生人真的会上手的硬件上，做出校准和安全的判断。",
      evidenceHref: "/projects/maze#interview-takeaway",
      boundary:
        "它只是一台展览用的机器，线是手工走的 —— 它证明的是搭建能力和系统思维，不是可量产。",
    },
  },
  vigil: {
    answers: [
      {
        id: "vigil-weak-confidence",
        question: "为什么要故意把分类器的置信度做成弱信号？",
        answer:
          "第一版里置信度分得干干净净：判断对的全在 0.84 以上，判断错的全在 0.82 以下。参与者不用读任何一封邮件，光看这个数字就能把 17 个错误全挑出来 —— 那样界面之间的对比就什么都测不到。分层重采样之后，错误排序的 AUC 降到 0.72；现在只要它漂回 0.75 以上，构建脚本就直接失败。",
        evidenceHref: "/projects/vigil#decision-timeline",
        boundary:
          "这是人工撰写语料的性质，不是在说真实的分类器就长这样。",
      },
      {
        id: "vigil-predictions-first",
        question: "你在测试之前就写下了预期哪个变体会赢。为什么？",
        answer:
          "我会把那张预测表拿出来 —— 日期在第一个变体被打开之前。它的形状也值得看：两注押在「加摩擦」，一注押在「减少搜索成本」。事后补写的预测永远和结果一致，所以它证明不了任何推理真的发生过。",
        evidenceHref: "/projects/vigil#evidence-board",
        boundary:
          "预测在案，结果不在 —— 因为还没有人跑过这个测试。",
      },
      {
        id: "vigil-ai-workflow",
        question: "代码都是 AI 写的。那你的工作到底是什么？",
        answer:
          "这两件事要分开说。Claude Code 和 Codex 写了语料管线、原型和 React 版本，而且很快。交不出去的是这几个判断：置信度必须做到不提供信息；一条描述了邮件里根本不存在的线索的解释，是会毁掉整个研究的缺陷；以及这个界面应该是一台仪器，而不是一个收件箱。",
        evidenceHref: "/projects/vigil#iteration-gallery",
        boundary:
          "这套工作流产出的第一版视觉合格但没有主张 —— 那就是它的失败模式，第二版才是我的。",
      },
    ],
    managerFollowUp: {
      id: "vigil-manager-follow-up",
      question: "都还没人测过，为什么放进作品集？",
      answer:
        "因为它展示的正是平时看不见的那部分：材料、变体、协议，以及那些决定「这个研究到底能不能回答问题」的验证闸门。三个设计问题都标着未解，预测都在案，所以将来真跑出结果，是可以拿回来对的。",
      evidenceHref: "/projects/vigil#outcome-limits",
      boundary:
        "在有人真的跑之前，这里每一个关于变体的论证都是推理而不是证据 —— 案例本身就是这么写的。",
    },
  },
  hoop: {
    answers: [
      {
        id: "hoop-style-coherence",
        question: "几百张生成的素材，你怎么让它们看起来像同一个世界？",
        answer:
          "顺序是关键：先写美术圣经，再让每批提示词引用它，然后拿运行中已有的锚点素材过一道风格闸门，最后用生产日志逐批记录数量。六个批次、299 个素材都走了这条路，一致性因此变成流程的属性，而不是每张图都要重新吵一次的事。",
        evidenceHref: "/projects/hoop#decision-timeline",
        boundary:
          "它买到的是风格统一，不是艺术性 —— 这是一批临时产能，日志里也是这么标的。",
      },
      {
        id: "hoop-rejected-list",
        question: "风格闸门真正起作用的是什么？",
        answer:
          "是那张「不要什么」的清单，比正面描述有用得多。把写实、3D、日系动画、霓虹、随机文字和真实商标点名列为出界，闸门就有了可复核的判据；而「温暖、简化」只给得出一个观点。生成器换个提示词就能产出上面任何一种，而且单看每一张都说得通 —— 直到它和其他素材摆在一起。",
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
          "它是借来的，而且到了篮球本身那几屏就撑不住了 —— 在那里，源头没有话可说。",
      },
    ],
    managerFollowUp: {
      id: "hoop-manager-follow-up",
      question: "体量大、也够完整，但没有玩家。为什么放进作品集？",
      answer:
        "因为这里有意思的问题是「上了量之后怎么守住生产纪律」，而这件事不需要玩家就看得见：规则写在产出之前、闸门真的会拒稿、日志让每一批都可追溯，再加上 1,975 个测试，在内容不断落地的同时守住一个系统很重的构建。游戏自己标着 DEMO v0.6，案例也没有多说一个字。",
      evidenceHref: "/projects/hoop#outcome-limits",
      boundary:
        "体量证明的是流程，不是这个节奏对除我之外的人也成立 —— 那需要我还没跑过的玩家测试。",
    },
  },
};

const caseInterviewPacks: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseInterviewPack>> = {
  en: sharedCaseInterviewPacks,
  zh: zhCaseInterviewPacks,
};


export function getHiringRoleFits(locale: ProofLocale): HiringRoleFit[] {
  return hiringRoleFits[locale];
}

export function getEvidenceMatrix(locale: ProofLocale): EvidenceMatrixCapability[] {
  return evidenceMatrix[locale];
}

export function getCaseInterviewPack(
  slug: ProjectEvidenceSlug,
  locale: ProofLocale
): CaseInterviewPack {
  return caseInterviewPacks[locale][slug];
}
