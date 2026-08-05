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
      { label: "Connect Circles product framing", href: "/projects/circles#evidence-board" },
      { label: "Resume proof path", href: "/projects/connect#interview-takeaway" },
    ],
    bestCases: ["connect", "circles"],
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
      { label: "AI feedback timing", href: "/projects/ai#decision-timeline" },
      { label: "AI trust evidence", href: "/projects/ai#evidence-board" },
      { label: "AI limits", href: "/projects/ai#outcome-limits" },
    ],
    bestCases: ["ai"],
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

const hiringRoleFits: Record<ProofLocale, HiringRoleFit[]> = {
  en: sharedHiringRoleFits,
  zh: sharedHiringRoleFits,
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
