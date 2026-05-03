import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InterviewBoundaryNotes } from "@/components/hiring/InterviewBoundaryNotes";
import { InterviewDecisionBrief } from "@/components/hiring/InterviewDecisionBrief";
import { InterviewEvidenceBrief } from "@/components/hiring/InterviewEvidenceBrief";
import { InterviewQuestionBank } from "@/components/hiring/InterviewQuestionBank";
import type {
  InterviewBoundaryNote,
  InterviewDecisionBrief as InterviewDecisionBriefData,
  InterviewEvidenceBriefItem,
  InterviewQuestionBankItem,
} from "@/lib/portfolio-proof";

describe("interview decision components", () => {
  const brief: InterviewDecisionBriefData = {
    eyebrow: "Interview decision room",
    headline: "Interview Lewis when you need research to become product direction.",
    subhead: "A fast hiring dossier for role fit and proof.",
    status: "Open to 2026 internships and graduate UX roles.",
    signals: [
      {
        label: "Role fit",
        value: "UX/Product",
        detail: "Research-led product teams.",
      },
    ],
    primaryAction: { label: "Contact Lewis", href: "/contact" },
    secondaryAction: { label: "Open resume", href: "/resume" },
  };

  const evidence: InterviewEvidenceBriefItem[] = [
    {
      id: "ia-proof",
      capability: "Information architecture",
      caseSlug: "connect",
      proof: "UQ Connect reframed portal navigation around task success.",
      whyItMatters: "Shows research-to-structure judgment.",
      href: "/projects/connect#decision-timeline",
    },
  ];

  const questions: InterviewQuestionBankItem[] = [
    {
      id: "product-question",
      group: "product",
      question: "How did research change the IA direction?",
      proves: "Trade-off reasoning and product judgment.",
      caseSlug: "connect",
      href: "/projects/connect#evidence-board",
    },
  ];

  const boundaries: InterviewBoundaryNote[] = [
    {
      id: "academic-context",
      claim: "The cases prove design judgment.",
      boundary: "They are not proof of large-scale production ownership.",
      validation: "I would pair with engineering early.",
      href: "/projects/connect#outcome-limits",
    },
  ];

  it("renders the decision brief with actions and signals", () => {
    render(<InterviewDecisionBrief brief={brief} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Interview Lewis");
    expect(screen.getByRole("link", { name: "Contact Lewis" })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(screen.getByText("UX/Product")).toBeInTheDocument();
  });

  it("renders evidence brief links to case anchors", () => {
    render(<InterviewEvidenceBrief items={evidence} />);

    expect(screen.getByText("Evidence brief")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Information architecture/i })).toHaveAttribute(
      "href",
      "/projects/connect#decision-timeline"
    );
  });

  it("renders question bank evidence routes", () => {
    render(<InterviewQuestionBank items={questions} />);

    expect(screen.getByText("Interview questions")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Inspect evidence" })).toHaveAttribute(
      "href",
      "/projects/connect#evidence-board"
    );
  });

  it("renders boundary notes with related proof", () => {
    render(<InterviewBoundaryNotes notes={boundaries} />);

    expect(screen.getByText("What I would not overclaim.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "See related proof" })).toHaveAttribute(
      "href",
      "/projects/connect#outcome-limits"
    );
  });
});
