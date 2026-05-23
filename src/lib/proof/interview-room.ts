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
        value: "4 end-to-end cases",
        detail:
          "IA, accessibility, AI coaching, and social wellbeing with methods and limits shown.",
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
        "UQ Connect reframed a student portal around task success rather than department ownership.",
      whyItMatters:
        "Shows research-to-structure product judgment for complex service information.",
      href: "/projects/connect#decision-timeline",
    },
    {
      id: "accessibility-proof",
      capability: "Accessibility and inclusive design",
      caseSlug: "spectra",
      proof:
        "Spectra Lens translated colourblind-user research into multi-modal AR feedback.",
      whyItMatters:
        "Shows inclusive constraints becoming interaction behavior instead of a checklist.",
      href: "/projects/spectra#evidence-board",
    },
    {
      id: "ai-trust-proof",
      capability: "AI UX and trust",
      caseSlug: "ai",
      proof:
        "The AI coach moved feedback after the interview to protect agency, timing, and stress.",
      whyItMatters:
        "Shows judgment about where AI should intervene and where it should stay quiet.",
      href: "/projects/ai#decision-timeline",
    },
    {
      id: "social-research-proof",
      capability: "Research framing",
      caseSlug: "circles",
      proof:
        "Connect Circles used interviews, diary study, and theory synthesis to reframe belonging.",
      whyItMatters:
        "Shows ambiguity reduced into a product direction without flattening human context.",
      href: "/projects/circles#evidence-board",
    },
    {
      id: "measurement-proof",
      capability: "Measurement and validation",
      caseSlug: "connect",
      proof:
        "Findability and task success constrained the IA claim before the interface was polished.",
      whyItMatters:
        "Shows evidence discipline: the claim is tied to measured behavior and stated limits.",
      href: "/projects/connect#outcome-limits",
    },
    {
      id: "communication-proof",
      capability: "Communication and facilitation",
      caseSlug: "circles",
      proof:
        "Co-design workshops and decision framing turned social research into inspectable product choices.",
      whyItMatters:
        "Shows how Lewis can make ambiguous qualitative evidence usable for a team.",
      href: "/projects/circles#interview-takeaway",
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
      id: "research-method-circles",
      group: "research",
      question: "How did you choose methods when belonging was still ambiguous?",
      proves: "Method selection, sampling logic, and synthesis under uncertainty.",
      caseSlug: "circles",
      href: "/projects/circles#evidence-board",
    },
    {
      id: "accessibility-feedback-spectra",
      group: "accessibility",
      question: "Why was multi-modal feedback necessary instead of colour labels alone?",
      proves: "Inclusive design judgment and constraint-driven interaction design.",
      caseSlug: "spectra",
      href: "/projects/spectra#decision-timeline",
    },
    {
      id: "ai-intervention-timing",
      group: "ai",
      question: "Where should AI intervene in a stressful interview workflow?",
      proves: "AI trust, agency, timing, and emotional safety reasoning.",
      caseSlug: "ai",
      href: "/projects/ai#decision-timeline",
    },
    {
      id: "validation-limits-connect",
      group: "limits",
      question: "What would you validate before launching the portal IA at scale?",
      proves: "Boundary setting, measurement maturity, and next-step planning.",
      caseSlug: "connect",
      href: "/projects/connect#outcome-limits",
    },
    {
      id: "manager-followup-spectra",
      group: "product",
      question: "How did privacy and public context change the AR product direction?",
      proves: "Product judgment beyond visual craft.",
      caseSlug: "spectra",
      href: "/projects/spectra#interview-takeaway",
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
      claim: "Measured outcomes show direction and learning quality.",
      boundary:
        "Some metrics are study or prototype metrics, not post-launch business metrics.",
      validation:
        "I would define production telemetry before claiming durable product impact.",
      href: "/projects/spectra#outcome-limits",
    },
    {
      id: "ai-long-term-confidence",
      claim: "The AI work shows trust-aware interaction decisions.",
      boundary:
        "First-use confidence is not the same as long-term coaching efficacy.",
      validation:
        "I would run longitudinal validation before claiming durable behavior change.",
      href: "/projects/ai#outcome-limits",
    },
    {
      id: "accessibility-audit-scope",
      claim: "The accessibility case shows inclusive design direction.",
      boundary:
        "It is not a universal audit across every impairment, environment, or device.",
      validation:
        "I would broaden participant coverage and assistive-tech review before final compliance claims.",
      href: "/projects/spectra#evidence-board",
    },
    {
      id: "social-product-scale",
      claim: "Connect Circles shows depth-first product framing.",
      boundary:
        "It does not yet prove network effects, retention, or scaled community health.",
      validation:
        "I would validate repeated cohort use before optimizing growth mechanics.",
      href: "/projects/circles#outcome-limits",
    },
  ],
};

const interviewDecisionRooms: Record<ProofLocale, InterviewDecisionRoom> = {
  en: sharedInterviewDecisionRoom,
  zh: sharedInterviewDecisionRoom,
};


export function getInterviewDecisionRoom(locale: ProofLocale): InterviewDecisionRoom {
  return interviewDecisionRooms[locale];
}
