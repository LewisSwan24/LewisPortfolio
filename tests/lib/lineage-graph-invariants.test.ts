import { describe, expect, it } from "vitest";
import {
  buildCausalLineageGraph,
  traceCausalPath,
} from "@/lib/graph/lineage-graph";
import { auditTranslationese } from "@/lib/i18n/editorial-voice";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { BLOG_CLUSTERS } from "@/lib/blog-clusters";

describe("v5.7 Causal Lineage Knowledge Graph Invariants", () => {
  it("constructs a deterministic 4-layer acyclic graph with 8 Vault, 6 Flagship, 6 Pattern, and 4 Cluster nodes", async () => {
    const graph = await buildCausalLineageGraph();

    const byLayer = {
      vault: graph.nodes.filter((n) => n.layer === "vault"),
      flagship: graph.nodes.filter((n) => n.layer === "flagship"),
      pattern: graph.nodes.filter((n) => n.layer === "pattern"),
      cluster: graph.nodes.filter((n) => n.layer === "cluster"),
    };

    expect(byLayer.vault).toHaveLength(8);
    expect(byLayer.flagship).toHaveLength(6);
    expect(byLayer.pattern).toHaveLength(6);
    expect(byLayer.cluster).toHaveLength(BLOG_CLUSTERS.length);

    expect(new Set(byLayer.vault.map((n) => n.slug))).toEqual(new Set(UNLISTED_PROJECT_SLUGS));
    expect(new Set(byLayer.flagship.map((n) => n.slug))).toEqual(new Set(LISTED_PROJECT_SLUGS));

    const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));
    for (const edge of graph.edges) {
      const fromNode = nodeMap.get(edge.from);
      const toNode = nodeMap.get(edge.to);
      expect(fromNode).toBeDefined();
      expect(toNode).toBeDefined();
      // Strict topological DAG ordering prevents cycles
      expect(fromNode!.layerIndex).toBeLessThan(toNode!.layerIndex);
      expect(auditTranslationese(edge.mechanism.en, "en")).toEqual([]);
      expect(auditTranslationese(edge.mechanism.zh, "zh")).toEqual([]);
    }

    // Zero direct /projects/<unlisted> href leaks inside public graph nodes
    for (const vNode of byLayer.vault) {
      expect(vNode.isArchivedUnlisted).toBe(true);
      expect(vNode.href.startsWith("/vault")).toBe(true);
      expect(vNode.href).not.toMatch(/^\/projects\//);
    }

    for (const node of graph.nodes) {
      expect(auditTranslationese(`${node.title.en} ${node.summary.en} ${node.honestGap.en}`, "en")).toEqual([]);
      expect(auditTranslationese(`${node.title.zh} ${node.summary.zh} ${node.honestGap.zh}`, "zh")).toEqual([]);
    }
  });

  it("traces complete upstream/downstream causal BFS paths and surfaces honest-gap verifiedStatus", async () => {
    const graph = await buildCausalLineageGraph();

    const vigilTrace = traceCausalPath(graph, "vault:vigil");
    expect(vigilTrace.nodeIds.has("vault:vigil")).toBe(true);
    expect(vigilTrace.nodeIds.has("flagship:autofill")).toBe(true);
    expect(vigilTrace.nodeIds.has("pattern:three-tier-confidence-split")).toBe(true);
    expect(vigilTrace.edgeIds.size).toBeGreaterThanOrEqual(2);

    const walkieTrace = traceCausalPath(graph, "flagship:walkie");
    expect(walkieTrace.upstreamNodeIds.size).toBeGreaterThanOrEqual(1);
    expect(walkieTrace.downstreamNodeIds.has("pattern:physical-key-commitment-gate")).toBe(true);

    // Every flagship must map at least one verifiedStatus bucket
    const statuses = new Set(graph.nodes.map((n) => n.verifiedStatus));
    expect(statuses.has("bench-tested")).toBe(true);
    expect(statuses.has("unverified-hypothesis")).toBe(true);
  });
});
