import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { BeforeAfterScrubber } from "@/components/case/BeforeAfterScrubber";
import { ResearchQuoteDeck } from "@/components/case/ResearchQuoteDeck";
import { OntheBeatHandshakeSim } from "@/components/case/simulators/OntheBeatHandshakeSim";
import { CaseInterviewPack } from "@/components/hiring/CaseInterviewPack";
import { RedTeamCritiquePanel } from "@/components/ai/RedTeamCritiquePanel";
import { PresentationTrigger } from "@/components/presentation/PresentationTrigger";
import { getCaseRedTeamDeck } from "@/data/critique/red-team";
import { getCaseInterviewPack } from "@/lib/portfolio-proof";
import { mazeCase } from "@/data/cases/maze";
import type { CaseScrubber } from "@/lib/cases/schema";
import type { PresentationDeckData } from "@/lib/presentation/build-deck";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

vi.mock("@/components/LocalizedLink", () => ({
  LocalizedLink: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const WALKIE_LABELS = {
  "design-decisions": "Design Decisions",
  "state-matrix": "5-State matrix",
  "research-vault": "Research vault",
  "rejection-archive": "Rejection archive",
  "decision-timeline": "Technical decisions",
  "evidence-board": "Groundwork",
  "outcome-limits": "Outcome limits",
  "interview-takeaway": "Reflection",
};

describe("v6.5 case review: components", () => {
  it("07: a text before/after renders two whole cards and no slider", () => {
    const scrubber = mazeCase.processArtifacts!.scrubber!;
    const { container } = render(<BeforeAfterScrubber data={scrubber} locale="en" />);
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
    const figures = container.querySelectorAll(".proc-compare > figure");
    expect(figures).toHaveLength(2);
    expect(figures[0]).toHaveTextContent(scrubber.beforeLabel.en);
    expect(figures[1]).toHaveTextContent(scrubber.afterLabel.en);
  });

  it("07: a photo-on-photo comparison keeps the slider", () => {
    const scrubber = mazeCase.processArtifacts!.scrubber!;
    const photos: CaseScrubber = {
      ...scrubber,
      beforeImage: { ...scrubber.afterImage, src: "/projects/maze/01-exhibition-setup.png" },
      afterImage: { ...scrubber.afterImage, src: "/projects/maze/06-final-contact.jpg" },
    };
    render(<BeforeAfterScrubber data={photos} locale="en" />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "50");
  });

  it("15: research quote cards render without a filter", () => {
    render(<ResearchQuoteDeck data={mazeCase.processArtifacts!.quotes!} locale="en" />);
    expect(screen.queryByRole("group", { name: /Filter research quotes/i })).not.toBeInTheDocument();
  });

  it("18: On The Beat options all start neutral", () => {
    const { container } = render(<OntheBeatHandshakeSim locale="en" />);
    expect(container.querySelectorAll(".btn-primary")).toHaveLength(0);
    expect(container.querySelectorAll("[aria-pressed='true'], .active")).toHaveLength(0);
  });

  it("20: interview-pack links jump in-page and name the section", () => {
    const pack = getCaseInterviewPack("walkie", "en");
    render(
      <CaseInterviewPack pack={pack} locale="en" currentSlug="walkie" sectionLabels={WALKIE_LABELS} />
    );
    const region = document.getElementById("interview-pack")!;
    const links = within(region).getAllByRole("link", { hidden: true });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = link.getAttribute("href")!;
      expect(href.startsWith("#")).toBe(true);
      expect(link.textContent).toContain(WALKIE_LABELS[href.slice(1) as keyof typeof WALKIE_LABELS]);
      expect(link.textContent).not.toMatch(/Inspect the evidence/);
    }
  });

  it("19 + 20: red-team panel speaks Chinese only in zh and links in-page on its own case", () => {
    const deck = getCaseRedTeamDeck("walkie")!;
    render(
      <RedTeamCritiquePanel
        decks={[deck]}
        locale="zh"
        currentSlug="walkie"
        sectionLabels={{ "design-decisions": "设计决策论证" }}
        allowSseProbe={false}
      />
    );
    const panel = screen.getByTestId("red-team-panel");
    expect(panel).not.toHaveTextContent(/Red-Team Defense/i);
    const link = within(panel).getByRole("link");
    expect(link).toHaveAttribute("href", "#design-decisions");
    expect(link).toHaveTextContent("设计决策论证");
  });

  it("17: the red-team probe button is secondary on case pages", () => {
    const deck = getCaseRedTeamDeck("walkie")!;
    render(<RedTeamCritiquePanel decks={[deck]} locale="en" probeVariant="ghost" />);
    expect(screen.getByTestId("redteam-sse-trigger")).toHaveClass("btn-ghost");
    expect(screen.getByTestId("redteam-sse-trigger")).not.toHaveClass("btn-primary");
  });

  it("17: the Shift+P hint sits in its own element so touch devices can hide it", () => {
    const deck = { slides: [] } as unknown as PresentationDeckData;
    render(<PresentationTrigger deck={deck} locale="en" />);
    const hint = screen.getByText("(Shift+P)");
    expect(hint).toHaveClass("presentation-shortcut");
  });
});
