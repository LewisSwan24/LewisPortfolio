import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PresentationShell } from "@/components/presentation/PresentationShell";
import { buildCaseDeck, buildHiringDeck } from "@/lib/presentation/build-deck";
import { connectCase } from "@/data/cases/connect";
import { getListedCases } from "@/lib/cases/registry";
import {
  getCaseDepth,
  getCaseInterviewPack,
  getCaseSummary,
  getInterviewDecisionRoom,
} from "@/lib/portfolio-proof";

describe("PresentationShell & Deck Builders", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("assembles 6 standardized slides for a flagship case and supports keyboard pagination + local speaker notes", () => {
    const deck = buildCaseDeck({
      record: connectCase,
      summary: getCaseSummary("connect", "en"),
      depth: getCaseDepth("connect", "en"),
      interviewPack: getCaseInterviewPack("connect", "en"),
      locale: "en",
    });

    expect(deck.slides).toHaveLength(6);
    expect(deck.slides[3]?.scrubber).toBeDefined();
    expect(deck.slides[4]?.interactiveDemo?.id).toBe("connect-ia-reset");

    const onClose = vi.fn();
    render(<PresentationShell deck={deck} open onClose={onClose} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(/01 \/ 06/);

    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(dialog).toHaveTextContent(/02 \/ 06/);

    expect(screen.queryByRole("region", { name: /Local speaker notes/i })).not.toBeInTheDocument();

    fireEvent.keyDown(dialog, { key: "n" });
    expect(screen.getByRole("region", { name: /Local speaker notes/i })).toBeInTheDocument();
    expect(window.sessionStorage.getItem("lewis-pres-notes")).toBe("1");

    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("builds a bounded hiring overview deck for /hire", () => {
    const deck = buildHiringDeck({
      room: getInterviewDecisionRoom("zh"),
      cases: getListedCases(),
      locale: "zh",
      customIntro: "专为 Atlassian Design Engineer 岗位定制的 3 分钟简报。",
      deckTitle: "Atlassian · 定制简报",
    });

    expect(deck.slides.length).toBeGreaterThanOrEqual(4);
    expect(deck.slides[0]?.subtitle).toContain("Atlassian Design Engineer");
  });
});
