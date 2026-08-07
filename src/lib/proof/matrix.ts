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
      { label: "UQ Connect IA decision", href: "/projects/connect#decision-timeline" },
      { label: "MazeRunners hardware trade-offs", href: "/projects/maze#decision-timeline" },
      { label: "Connect Circles product framing", href: "/projects/circles#evidence-board" },
    ],
    bestCases: ["connect", "maze", "circles"],
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
      { label: "Circles diary study", href: "/projects/circles#evidence-board" },
      { label: "Research limits", href: "/projects/circles#outcome-limits" },
    ],
    bestCases: ["connect", "circles"],
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
      { label: "AI feedback timing", href: "/projects/ai#decision-timeline" },
      { label: "AI limits", href: "/projects/ai#outcome-limits" },
    ],
    bestCases: ["vigil", "ai"],
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
      { label: "UQ Connect 的 IA 决策", href: "/projects/connect#decision-timeline" },
      { label: "MazeRunners 的软硬件取舍", href: "/projects/maze#decision-timeline" },
      { label: "Connect Circles 的产品框架", href: "/projects/circles#evidence-board" },
    ],
    bestCases: ["connect", "maze", "circles"],
    risk: "我最强的地方是把模糊的产品问题结构化；生产环境的约束我会尽早找工程一起看。",
    interviewAngle: "可以问我怎么把研究信号收敛成有范围的产品决策。",
  },
  {
    id: "ux-research",
    label: "UX 研究",
    fit: "适合需要混合方法、谨慎取样，并且要让研究真的改变产品决策的团队。",
    proofLinks: [
      { label: "Connect 的研究证据", href: "/projects/connect#evidence-board" },
      { label: "Circles 的日记研究", href: "/projects/circles#evidence-board" },
      { label: "研究的限制", href: "/projects/circles#outcome-limits" },
    ],
    bestCases: ["connect", "circles"],
    risk: "多数项目是课程或自发项目，所以我会讲清楚哪些有证据、哪些还需要实地验证。",
    interviewAngle: "可以问我在问题还很模糊时怎么选方法。",
  },
  {
    id: "ai-ux",
    label: "AI 交互设计",
    fit: "适合需要围绕时机、控制感、信任与情绪安全来设计 AI 辅助的团队。",
    proofLinks: [
      { label: "Vigil：如何设计出「不轻易信」", href: "/projects/vigil#decision-timeline" },
      { label: "AI 反馈时机", href: "/projects/ai#decision-timeline" },
      { label: "AI 的限制", href: "/projects/ai#outcome-limits" },
    ],
    bestCases: ["vigil", "ai"],
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
        proof: "Task analysis, card sorting, and tree testing framed the portal IA.",
        href: "/projects/connect#evidence-board",
      },
      circles: {
        strength: "primary",
        proof: "Interviews, diary study, and theory synthesis reframed belonging.",
        href: "/projects/circles#evidence-board",
      },
      spectra: {
        strength: "supporting",
        proof: "Colourblind-user interviews shaped interaction requirements.",
        href: "/projects/spectra#evidence-board",
      },
      ai: {
        strength: "supporting",
        proof: "Interview anxiety and feedback needs shaped the AI coaching scope.",
        href: "/projects/ai#evidence-board",
      },
    },
  },
  {
    id: "information-architecture",
    label: "Information architecture",
    summary: "Structures complex information around user mental models and findability.",
    cases: {
      connect: {
        strength: "primary",
        proof: "Moved the portal from department ownership to task-oriented IA.",
        href: "/projects/connect#decision-timeline",
      },
      circles: {
        strength: "supporting",
        proof: "Structured social onboarding around slow circles and prompts.",
        href: "/projects/circles#iteration-gallery",
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
        proof: "Multi-modal feedback avoided colour-only interaction patterns.",
        href: "/projects/spectra#decision-timeline",
      },
      ai: {
        strength: "supporting",
        proof: "Tone and feedback timing protected anxious interview practice.",
        href: "/projects/ai#evidence-board",
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
      ai: {
        strength: "primary",
        proof: "Post-session coaching balanced usefulness, control, and stress.",
        href: "/projects/ai#decision-timeline",
      },
      circles: {
        strength: "supporting",
        proof: "Product success avoided shallow engagement optimization.",
        href: "/projects/circles#interview-takeaway",
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
        proof: "Balanced AR usefulness with privacy in public contexts.",
        href: "/projects/spectra#decision-timeline",
      },
      ai: {
        strength: "supporting",
        proof: "Moved intervention timing away from live interruption.",
        href: "/projects/ai#decision-timeline",
      },
      circles: {
        strength: "supporting",
        proof: "Chose depth-first matching over open social discovery.",
        href: "/projects/circles#decision-timeline",
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
        proof: "Findability and task success constrained the IA claims.",
        href: "/projects/connect#outcome-limits",
      },
      spectra: {
        strength: "primary",
        proof: "Field testing exposed lighting, motion, and privacy constraints.",
        href: "/projects/spectra#outcome-limits",
      },
      ai: {
        strength: "supporting",
        proof: "Confidence gains need durability validation beyond first use.",
        href: "/projects/ai#outcome-limits",
      },
      circles: {
        strength: "supporting",
        proof: "Relationship depth needs cohort and arrival-stage validation.",
        href: "/projects/circles#outcome-limits",
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
      circles: {
        strength: "primary",
        proof: "Co-design workshops turned vulnerable social needs into safer concepts.",
        href: "/projects/circles#evidence-board",
      },
    },
  },
];

const evidenceMatrix: Record<ProofLocale, EvidenceMatrixCapability[]> = {
  en: sharedEvidenceMatrix,
  zh: sharedEvidenceMatrix,
};

const sharedCaseInterviewPacks: Record<ProjectEvidenceSlug, CaseInterviewPack> = {
  connect: {
    answers: [
      {
        id: "connect-ia-shift",
        question: "Why did you move from department labels to task-oriented IA?",
        answer:
          "I would explain how task walk-throughs and tree testing showed students searched by life task, not by staff ownership.",
        evidenceHref: "/projects/connect#decision-timeline",
        boundary:
          "I would not claim the final IA fits every university service without another production tree test.",
      },
      {
        id: "connect-research-signal",
        question: "Which research signal most changed the final structure?",
        answer:
          "I would point to card-sort groupings and task success signals that made plain student language more defensible than org-chart labels.",
        evidenceHref: "/projects/connect#evidence-board",
        boundary:
          "I would separate evidence-backed labels from labels that still need real search log validation.",
      },
      {
        id: "connect-validation",
        question: "What would you validate next before launch?",
        answer:
          "I would run a larger tree test and production-search review to confirm critical student tasks stay findable at scale.",
        evidenceHref: "/projects/connect#outcome-limits",
        boundary:
          "The case proves direction and measured prototype gains, not a finished university-wide rollout.",
      },
    ],
    managerFollowUp: {
      id: "connect-manager-follow-up",
      question: "How would you defend the IA trade-off to stakeholders?",
      answer:
        "I would show that administrative precision lost value when students could not find critical services, then frame the IA as a measurable service decision.",
      evidenceHref: "/projects/connect#interview-takeaway",
      boundary:
        "I would still keep stakeholder language available in search and support tooling where it helps staff operations.",
    },
  },
  spectra: {
    answers: [
      {
        id: "spectra-colour-feedback",
        question: "Why avoid colour-only feedback as the primary interaction?",
        answer:
          "I would explain how colourblind-user interviews required redundant feedback through labels, contrast, and multi-modal cues.",
        evidenceHref: "/projects/spectra#decision-timeline",
        boundary:
          "I would not claim one feedback model covers every colour vision profile without broader field validation.",
      },
      {
        id: "spectra-privacy",
        question: "How did privacy change the AR product direction?",
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
      question: "How would you decide whether this belongs in AR or a simpler tool?",
      answer:
        "I would compare the value of in-context feedback against privacy cost, device friction, and recognition reliability in field tasks.",
      evidenceHref: "/projects/spectra#interview-takeaway",
      boundary:
        "I would be willing to simplify the medium if AR created more burden than benefit.",
    },
  },
  ai: {
    answers: [
      {
        id: "ai-feedback-timing",
        question: "Why move AI feedback after the session instead of live?",
        answer:
          "I would explain that live correction risked increasing anxiety, while post-session coaching preserved flow and reflection.",
        evidenceHref: "/projects/ai#decision-timeline",
        boundary:
          "I would not assume every learner prefers post-session feedback without testing user control settings.",
      },
      {
        id: "ai-trust-language",
        question: "How did you shape trust in the feedback language?",
        answer:
          "I would discuss confidence language, tone control, and feedback specificity as interaction choices, not just prompt wording.",
        evidenceHref: "/projects/ai#evidence-board",
        boundary:
          "The case does not prove model accuracy; it frames how feedback should be experienced and verified.",
      },
      {
        id: "ai-confidence-metric",
        question: "What would prove the AI actually improves interview readiness?",
        answer:
          "I would compare repeated-session confidence, perceived control, and answer quality rather than relying on one positive reaction.",
        evidenceHref: "/projects/ai#outcome-limits",
        boundary:
          "Short-term reassurance is not the same as durable preparation or better interview performance.",
      },
    ],
    managerFollowUp: {
      id: "ai-manager-follow-up",
      question: "Where should AI stay quiet in this product?",
      answer:
        "I would keep AI out of live moments where intervention harms agency, then give users explicit control over review depth after the session.",
      evidenceHref: "/projects/ai#interview-takeaway",
      boundary:
        "I would validate this with anxious and confident users separately before generalizing.",
    },
  },
  circles: {
    answers: [
      {
        id: "circles-slow-matching",
        question: "Why slow matching instead of maximizing more matches?",
        answer:
          "I would explain how interviews and diary study pointed to relational confidence and safety, not match volume, as the meaningful outcome.",
        evidenceHref: "/projects/circles#decision-timeline",
        boundary:
          "I would not claim slow matching is always better; it fits the wellbeing goal and needs cohort testing.",
      },
      {
        id: "circles-depth-metric",
        question: "Why use relationship depth as a success signal?",
        answer:
          "I would connect the evidence to a product metric that resists shallow engagement and better reflects belonging.",
        evidenceHref: "/projects/circles#evidence-board",
        boundary:
          "Relationship depth is harder to measure than activity, so it needs careful longitudinal validation.",
      },
      {
        id: "circles-scaling",
        question: "What would you validate before scaling?",
        answer:
          "I would test small-circle onboarding across cultural cohorts and arrival stages before scaling the matching model.",
        evidenceHref: "/projects/circles#outcome-limits",
        boundary:
          "The project frames the product direction; it does not prove broad adoption yet.",
      },
    ],
    managerFollowUp: {
      id: "circles-manager-follow-up",
      question: "How would you prevent the product from becoming another shallow social feed?",
      answer:
        "I would define success around perceived safety, repeat conversation quality, and belonging rather than daily activity alone.",
      evidenceHref: "/projects/circles#interview-takeaway",
      boundary:
        "I would still watch retention, but not let engagement volume override the wellbeing purpose.",
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

const caseInterviewPacks: Record<ProofLocale, Record<ProjectEvidenceSlug, CaseInterviewPack>> = {
  en: sharedCaseInterviewPacks,
  zh: sharedCaseInterviewPacks,
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
