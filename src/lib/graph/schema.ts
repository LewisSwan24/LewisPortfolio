import type { CaseVerifiedStatus } from "@/lib/cases/modules-schema";

export type LineageLayer = "vault" | "flagship" | "pattern" | "cluster";

export interface LocalizedPair {
  en: string;
  zh: string;
}

export interface LineageNode {
  id: string;
  slug: string;
  layer: LineageLayer;
  layerIndex: 0 | 1 | 2 | 3;
  title: LocalizedPair;
  summary: LocalizedPair;
  verifiedStatus: CaseVerifiedStatus;
  honestGap: LocalizedPair;
  isArchivedUnlisted: boolean;
  href: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LineageEdge {
  id: string;
  from: string;
  to: string;
  pathD: string;
  mechanism: LocalizedPair;
}

export interface CausalLineageGraph {
  viewBox: { width: number; height: number };
  nodes: readonly LineageNode[];
  edges: readonly LineageEdge[];
}

export interface CausalTraceResult {
  focusNodeId: string;
  upstreamNodeIds: Set<string>;
  downstreamNodeIds: Set<string>;
  nodeIds: Set<string>;
  edgeIds: Set<string>;
}

/**
 * Pure deterministic BFS upstream + downstream causal path tracer (client-safe).
 */
export function traceCausalPath(
  graph: CausalLineageGraph,
  focusNodeId: string
): CausalTraceResult {
  const upstreamNodeIds = new Set<string>();
  const downstreamNodeIds = new Set<string>();
  const edgeIds = new Set<string>();

  const forward = new Map<string, LineageEdge[]>();
  const backward = new Map<string, LineageEdge[]>();

  for (const edge of graph.edges) {
    if (!forward.has(edge.from)) forward.set(edge.from, []);
    forward.get(edge.from)!.push(edge);
    if (!backward.has(edge.to)) backward.set(edge.to, []);
    backward.get(edge.to)!.push(edge);
  }

  // BFS backward (upstream causes)
  const upQueue = [focusNodeId];
  const visitedUp = new Set<string>([focusNodeId]);
  while (upQueue.length > 0) {
    const cur = upQueue.shift()!;
    for (const edge of backward.get(cur) ?? []) {
      edgeIds.add(edge.id);
      if (!visitedUp.has(edge.from)) {
        visitedUp.add(edge.from);
        upstreamNodeIds.add(edge.from);
        upQueue.push(edge.from);
      }
    }
  }

  // BFS forward (downstream mechanisms & writings)
  const downQueue = [focusNodeId];
  const visitedDown = new Set<string>([focusNodeId]);
  while (downQueue.length > 0) {
    const cur = downQueue.shift()!;
    for (const edge of forward.get(cur) ?? []) {
      edgeIds.add(edge.id);
      if (!visitedDown.has(edge.to)) {
        visitedDown.add(edge.to);
        downstreamNodeIds.add(edge.to);
        downQueue.push(edge.to);
      }
    }
  }

  const nodeIds = new Set<string>([
    focusNodeId,
    ...upstreamNodeIds,
    ...downstreamNodeIds,
  ]);

  return {
    focusNodeId,
    upstreamNodeIds,
    downstreamNodeIds,
    nodeIds,
    edgeIds,
  };
}
