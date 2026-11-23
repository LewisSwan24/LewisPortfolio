import type { CaseVerifiedStatus } from "@/lib/cases/modules-schema";
import { LISTED_PROJECT_SLUGS } from "@/lib/project-routes";

export type FsmProjectSlug = (typeof LISTED_PROJECT_SLUGS)[number];

export type FsmLocaleText = {
  en: string;
  zh: string;
};

export type FsmStateKind = "initial" | "normal" | "goal" | "error" | "recovery";

export interface FsmStateNode {
  id: string;
  label: FsmLocaleText;
  kind: FsmStateKind;
  x: number;
  y: number;
  guarantees: FsmLocaleText;
}

export type FsmEdgeKind = "advance" | "guard" | "error" | "recover";

export interface FsmTransitionEdge {
  id: string;
  from: string;
  to: string;
  trigger: FsmLocaleText;
  condition: FsmLocaleText;
  kind: FsmEdgeKind;
  latencyImpactMs?: number;
}

export interface FsmTimingBounds {
  debounceMs: number;
  cooldownMs: number;
  holdThresholdMs: number;
  relayTimeoutMs: number;
  confidenceThreshold: number;
}

export interface CaseFsmSpec {
  slug: FsmProjectSlug;
  caseName: FsmLocaleText;
  summary: FsmLocaleText;
  initialStateId: string;
  goalStateIds: readonly string[];
  verifiedStatus: CaseVerifiedStatus;
  timing: {
    defaults: FsmTimingBounds;
    activeTuningFocus: keyof FsmTimingBounds;
    rationale: FsmLocaleText;
  };
  states: readonly FsmStateNode[];
  transitions: readonly FsmTransitionEdge[];
}

export interface FsmGraphAnalysis {
  reachableStates: string[];
  unreachableStates: string[];
  reachableGoals: string[];
  unrecoveredErrorStates: string[];
  deadlockStates: string[];
}

export interface FsmTelemetrySummary {
  perceivedDelayMs: number;
  mitigationMarginPct: number;
  deadlockCount: number;
  unreachableCount: number;
  safetyGrade: "locked" | "balanced" | "hair-trigger";
}

export function analyzeFsmGraph(spec: CaseFsmSpec): FsmGraphAnalysis {
  const adj = new Map<string, FsmTransitionEdge[]>();
  for (const node of spec.states) {
    adj.set(node.id, []);
  }
  for (const edge of spec.transitions) {
    const list = adj.get(edge.from);
    if (list) list.push(edge);
  }

  const visited = new Set<string>();
  const queue: string[] = [];
  if (adj.has(spec.initialStateId)) {
    visited.add(spec.initialStateId);
    queue.push(spec.initialStateId);
  }

  while (queue.length > 0) {
    const cur = queue.shift()!;
    for (const edge of adj.get(cur) ?? []) {
      if (!visited.has(edge.to) && adj.has(edge.to)) {
        visited.add(edge.to);
        queue.push(edge.to);
      }
    }
  }

  const reachableStates = Array.from(visited);
  const unreachableStates = spec.states
    .map((s) => s.id)
    .filter((id) => !visited.has(id));

  const reachableGoals = spec.goalStateIds.filter((id) => visited.has(id));
  const goalSet = new Set(spec.goalStateIds);

  const unrecoveredErrorStates = spec.states
    .filter((s) => s.kind === "error")
    .filter((s) => {
      const out = adj.get(s.id) ?? [];
      return !out.some(
        (e) => e.kind === "recover" || e.to === spec.initialStateId || !goalSet.has(e.from)
      );
    })
    .map((s) => s.id);

  const deadlockStates = spec.states
    .filter((s) => !goalSet.has(s.id) && (adj.get(s.id)?.length ?? 0) === 0)
    .map((s) => s.id);

  return {
    reachableStates,
    unreachableStates,
    reachableGoals,
    unrecoveredErrorStates,
    deadlockStates,
  };
}

export function computeFsmTelemetry(
  timing: FsmTimingBounds,
  spec: CaseFsmSpec
): FsmTelemetrySummary {
  const analysis = analyzeFsmGraph(spec);
  const perceivedDelayMs = Math.round(
    timing.debounceMs +
      timing.holdThresholdMs * 0.65 +
      timing.cooldownMs * 0.25 +
      timing.relayTimeoutMs * 0.08
  );

  // Combines intentional dwell threshold, sensor debounce, cooldown lockout, and confidence floor.
  const rawMargin =
    (timing.holdThresholdMs / 25) +
    (timing.debounceMs / 8) +
    (timing.cooldownMs / 45) +
    (timing.confidenceThreshold * 0.35);

  const mitigationMarginPct = Math.max(12, Math.min(99, Math.round(rawMargin)));
  const safetyGrade: FsmTelemetrySummary["safetyGrade"] =
    mitigationMarginPct >= 75
      ? "locked"
      : mitigationMarginPct >= 48
        ? "balanced"
        : "hair-trigger";

  return {
    perceivedDelayMs,
    mitigationMarginPct,
    deadlockCount: analysis.deadlockStates.length,
    unreachableCount: analysis.unreachableStates.length,
    safetyGrade,
  };
}
