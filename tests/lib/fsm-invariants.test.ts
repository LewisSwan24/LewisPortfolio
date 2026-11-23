import { describe, expect, it } from "vitest";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { analyzeFsmGraph, computeFsmTelemetry } from "@/lib/fsm/schema";
import { CASE_FSM_SPECS } from "@/data/fsm/case-fsms";
import { CASE_HEURISTIC_AUDITS } from "@/data/heuristics/case-heuristics";

describe("v4.9 FSM Graph & Heuristic Audit Invariants", () => {
  it("provides a valid FSM for all 6 listed cases and zero unlisted slugs", () => {
    const slugs = CASE_FSM_SPECS.map((s) => s.slug);
    for (const listed of LISTED_PROJECT_SLUGS) {
      expect(slugs).toContain(listed);
    }
    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(slugs).not.toContain(unlisted);
    }
  });

  it("satisfies BFS reachability, goal reachability, error recovery, and zero deadlock invariants across all 6 FSMs", () => {
    for (const spec of CASE_FSM_SPECS) {
      const report = analyzeFsmGraph(spec);
      expect(report.unreachableStates, `${spec.slug} unreachable states`).toEqual([]);
      expect(report.unrecoveredErrorStates, `${spec.slug} unrecovered errors`).toEqual([]);
      expect(report.deadlockStates, `${spec.slug} deadlock sinks`).toEqual([]);
      expect(report.reachableGoals.length, `${spec.slug} goals`).toBeGreaterThanOrEqual(1);
    }
  });

  it("computes monotonic perceived delay and accidental-trigger mitigation margin from timing bounds", () => {
    const walkie = CASE_FSM_SPECS.find((s) => s.slug === "walkie")!;
    const base = computeFsmTelemetry(walkie.timing.defaults, walkie);
    const higherHold = computeFsmTelemetry(
      {
        ...walkie.timing.defaults,
        holdThresholdMs: walkie.timing.defaults.holdThresholdMs + 300,
        debounceMs: walkie.timing.defaults.debounceMs + 40,
      },
      walkie
    );

    expect(higherHold.perceivedDelayMs).toBeGreaterThan(base.perceivedDelayMs);
    expect(higherHold.mitigationMarginPct).toBeGreaterThan(base.mitigationMarginPct);
    expect(base.deadlockCount).toBe(0);
  });

  it("covers all 6 listed cases with Nielsen H1-H10 & WCAG 2.1 audit entries cleanly", () => {
    const auditedSlugs = new Set(CASE_HEURISTIC_AUDITS.map((a) => a.slug));
    for (const listed of LISTED_PROJECT_SLUGS) {
      expect(auditedSlugs.has(listed)).toBe(true);
      const entries = CASE_HEURISTIC_AUDITS.filter((a) => a.slug === listed);
      expect(entries.length).toBeGreaterThanOrEqual(4);
      expect(entries.some((e) => e.severity === "structural-guard")).toBe(true);
      expect(entries.some((e) => e.severity === "open-risk")).toBe(true);
    }
    for (const unlisted of UNLISTED_PROJECT_SLUGS) {
      expect(auditedSlugs.has(unlisted as never)).toBe(false);
    }
  });
});
