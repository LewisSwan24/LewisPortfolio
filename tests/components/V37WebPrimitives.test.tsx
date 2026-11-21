import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AnchorNote } from "@/components/ui/AnchorNote";
import { CaseTerminologyNotes } from "@/components/case/CaseTerminologyNotes";
import {
  clearActiveViewTransitions,
  navigateWithViewTransition,
} from "@/lib/motion/view-transitions";
import { LabPrimitivesGallery } from "@/components/lab/primitives/LabPrimitivesGallery";
import { PrimitiveConfidence } from "@/components/lab/primitives/PrimitiveConfidence";
import { PrimitiveRiskCard } from "@/components/lab/primitives/PrimitiveRiskCard";

describe("V3.7 Web Platform Primitives & /lab Exhibition", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("navigateWithViewTransition marks only the clicked pair, cleans up on finish, and routes focus to main h1", async () => {
    document.body.innerHTML = `
      <a id="card-1" href="/en/projects/walkie">
        <div id="m1" data-vt-media></div>
        <h3 id="t1" data-vt-title>Walkie</h3>
      </a>
      <a id="card-2" href="/en/projects/maze">
        <div id="m2" data-vt-media></div>
        <h3 id="t2" data-vt-title>Maze</h3>
      </a>
      <main><h1 id="target-h1" tabindex="-1">Walkie</h1></main>
    `;

    let resolveFinished!: () => void;
    const finished = new Promise<void>((resolve) => {
      resolveFinished = resolve;
    });
    const startViewTransition = vi.fn((cb: () => void) => {
      cb();
      return { finished };
    });
    Object.defineProperty(document, "startViewTransition", {
      value: startViewTransition,
      configurable: true,
    });
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 1;
    });

    const navigate = vi.fn();
    const card1 = document.getElementById("card-1")!;
    navigateWithViewTransition({ href: "/en/projects/walkie", triggerEl: card1, navigate });

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/en/projects/walkie");
    expect(document.getElementById("m1")).toHaveClass("vt-active-media");
    expect(document.getElementById("t1")).toHaveClass("vt-active-title");
    expect(document.getElementById("m2")).not.toHaveClass("vt-active-media");

    resolveFinished();
    await waitFor(() => {
      expect(document.getElementById("m1")).not.toHaveClass("vt-active-media");
      expect(document.activeElement).toBe(document.getElementById("target-h1"));
    });

    clearActiveViewTransitions();
    delete (document as unknown as Record<string, unknown>).startViewTransition;
  });

  it("AnchorNote binds unique popoverTarget/id and supports fallback open & Escape focus return", () => {
    render(
      <div>
        <AnchorNote term="zero-knowledge relay" label="Protocol" note="AES-256-GCM ciphertext only." />
        <AnchorNote term="default-safe triage" label="UX" note="Not now receives initial focus." />
      </div>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const id1 = buttons[0].getAttribute("popovertarget");
    const id2 = buttons[1].getAttribute("popovertarget");
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);

    const noteEl = document.getElementById(id1!)!;
    expect(noteEl).toHaveAttribute("popover", "auto");
    expect(noteEl).toHaveAttribute("role", "note");

    // Fallback toggle in jsdom (no native popover IDL) + Esc focus return
    fireEvent.click(buttons[0]);
    expect(noteEl).toHaveAttribute("data-fallback-open", "true");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(noteEl).not.toHaveAttribute("data-fallback-open");
    expect(document.activeElement).toBe(buttons[0]);
  });

  it("CaseTerminologyNotes renders bilingual footnotes across the 6 flagship cases", () => {
    const slugs = ["walkie", "lamplight", "autofill", "fencepost", "maze", "connect"] as const;
    for (const slug of slugs) {
      const { unmount } = render(<CaseTerminologyNotes slug={slug} locale="zh" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
      unmount();
    }
  });

  it("LabPrimitivesGallery renders all 6 primitive tabs and respects ?demo=walkie query param", async () => {
    window.history.replaceState({}, "", "/en/lab?demo=walkie");
    render(<LabPrimitivesGallery locale="en" />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(6);
    await waitFor(() => {
      expect(tabs[2]).toHaveAttribute("aria-selected", "true");
    });
    window.history.replaceState({}, "", "/");
  });

  it("PrimitiveConfidence routes fields dynamically as confidence threshold slider changes", () => {
    render(<PrimitiveConfidence locale="en" />);
    const slider = screen.getByLabelText(/Auto-fill confidence threshold/i);
    expect(screen.getAllByText(/Solid · Auto-fill/i)).toHaveLength(2);

    fireEvent.change(slider, { target: { value: "0.6" } });
    expect(screen.getAllByText(/Solid · Auto-fill/i)).toHaveLength(3);
  });

  it("PrimitiveRiskCard contrasts Enter behavior between anti-pattern and calm pattern", () => {
    render(<PrimitiveRiskCard locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: /Not now \(Default focus\)/i }));
    expect(screen.getByRole("status")).toHaveTextContent(/Paused safely/i);
  });
});
