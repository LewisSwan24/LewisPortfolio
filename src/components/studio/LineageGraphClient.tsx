"use client";

import { useMemo, useRef, useState } from "react";
import { LocalizedLink as Link } from "@/components/LocalizedLink";
import { VerifiedStatusBadge, VERIFIED_LABELS } from "@/components/case/deep/VerifiedStatusBadge";
import type { CaseVerifiedStatus } from "@/lib/cases/modules-schema";
import {
  traceCausalPath,
  type CausalLineageGraph,
  type LineageLayer,
  type LineageNode,
} from "@/lib/graph/schema";
import styles from "./lineage-graph.module.css";

const COLUMN_HEADERS: ReadonlyArray<{
  layer: LineageLayer;
  x: number;
  en: string;
  zh: string;
}> = [
  // v6.9 (review R02): the counts come from the graph's nodes, not the label.
  // They were typed in, and the vault one said 8 after the vault went to 7.
  { layer: "vault", x: 24, en: "01 · Archive Vault", zh: "01 · 演进档案馆" },
  { layer: "flagship", x: 304, en: "02 · Flagship Builds", zh: "02 · 公开旗舰" },
  { layer: "pattern", x: 584, en: "03 · Patterns", zh: "03 · 模式图谱" },
  { layer: "cluster", x: 864, en: "04 · Monograph Clusters", zh: "04 · 专文聚类" },
];

const LAYER_ZH: Record<string, string> = {
  vault: "档案馆",
  flagship: "旗舰",
  pattern: "模式",
  cluster: "专文聚类",
};

const STATUS_FILTERS: ReadonlyArray<{
  id: "all" | CaseVerifiedStatus;
  en: string;
  zh: string;
}> = [
  { id: "all", en: "All Nodes", zh: "全部节点" },
  { id: "observed", en: "Observed", zh: "现场/实测观察" },
  { id: "bench-tested", en: "Bench-Tested", zh: "真机/台架验证" },
  { id: "synthetic-gate", en: "Synthetic Gate", zh: "合成自动化门禁" },
  { id: "unverified-hypothesis", en: "Unverified Gaps Only", zh: "仅高亮未测空白" },
];

export function LineageGraphClient({
  graph,
  locale,
}: {
  graph: CausalLineageGraph;
  locale: "en" | "zh";
}) {
  const isZh = locale === "zh";
  // v6.9 (R12): node tags were raw ids ("flagship", "bench-tested") on zh pages.
  const layerText = (layer: string) => (isZh ? LAYER_ZH[layer] ?? layer : layer);
  const statusText = (s: CaseVerifiedStatus) => (isZh ? VERIFIED_LABELS[s].zh : s);
  const [selectedId, setSelectedId] = useState<string>(graph.nodes[0]?.id ?? "");
  const [statusFilter, setStatusFilter] = useState<"all" | CaseVerifiedStatus>("all");
  const [viewMode, setViewMode] = useState<"split" | "table">("split");
  const nodeButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const nodeMap = useMemo(
    () => new Map(graph.nodes.map((n) => [n.id, n])),
    [graph.nodes]
  );

  const activeTrace = useMemo(
    () => traceCausalPath(graph, selectedId),
    [graph, selectedId]
  );

  const selectedNode = nodeMap.get(selectedId) ?? graph.nodes[0]!;

  const incomingEdges = useMemo(
    () => graph.edges.filter((e) => e.to === selectedNode.id),
    [graph.edges, selectedNode.id]
  );

  const outgoingEdges = useMemo(
    () => graph.edges.filter((e) => e.from === selectedNode.id),
    [graph.edges, selectedNode.id]
  );

  const visibleTableNodes = useMemo(() => {
    if (statusFilter === "all") return graph.nodes;
    return graph.nodes.filter((n) => n.verifiedStatus === statusFilter);
  }, [graph.nodes, statusFilter]);

  const handleNodeKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, node: LineageNode) => {
    const colNodes = graph.nodes.filter((n) => n.layerIndex === node.layerIndex);
    const idxInCol = colNodes.findIndex((n) => n.id === node.id);

    let targetNode: LineageNode | undefined;
    if (e.key === "ArrowDown") {
      targetNode = colNodes[(idxInCol + 1) % colNodes.length];
    } else if (e.key === "ArrowUp") {
      targetNode = colNodes[(idxInCol - 1 + colNodes.length) % colNodes.length];
    } else if (e.key === "ArrowRight") {
      const nextCol = graph.nodes.filter((n) => n.layerIndex === ((node.layerIndex + 1) % 4));
      targetNode = nextCol[Math.min(idxInCol, nextCol.length - 1)];
    } else if (e.key === "ArrowLeft") {
      const prevCol = graph.nodes.filter((n) => n.layerIndex === ((node.layerIndex + 3) % 4));
      targetNode = prevCol[Math.min(idxInCol, prevCol.length - 1)];
    }

    if (targetNode) {
      e.preventDefault();
      setSelectedId(targetNode.id);
      nodeButtonRefs.current[targetNode.id]?.focus();
    }
  };

  return (
    <div className={styles.shell}>
      <div className={styles.controlsBar}>
        <div
          className={styles.pillGroup}
          role="group"
          aria-label={isZh ? "按验证状态筛选" : "Evidence status overlay filter"}
        >
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              data-testid={`graph-filter-${f.id}`}
              className={styles.pillBtn}
              aria-pressed={statusFilter === f.id}
              onClick={() => setStatusFilter(f.id)}
            >
              {f[locale]}
            </button>
          ))}
        </div>

        <div
          className={styles.pillGroup}
          role="group"
          aria-label={isZh ? "视图模式切换" : "View mode toggle"}
        >
          <button
            type="button"
            data-testid="graph-view-split"
            className={styles.pillBtn}
            aria-pressed={viewMode === "split"}
            onClick={() => setViewMode("split")}
          >
            {isZh ? "关联图谱 + 同步表" : "Lineage Graph + Table"}
          </button>
          <button
            type="button"
            data-testid="graph-view-table"
            className={styles.pillBtn}
            aria-pressed={viewMode === "table"}
            onClick={() => setViewMode("table")}
          >
            {isZh ? "仅无障碍邻接矩阵表" : "WCAG Adjacency Matrix"}
          </button>
        </div>
      </div>

      <div className={styles.splitLayout}>
        {viewMode === "split" ? (
          <div
            className={styles.canvasScroller}
            role="region"
            aria-label={isZh ? "四层设计关联图" : "Four-layer design lineage graph"}
          >
            <div className={styles.canvasStage}>
              <div className={styles.colHeaderRow} aria-hidden="true">
                {COLUMN_HEADERS.map((col) => (
                  <span key={col.layer} className={styles.colHeader} style={{ left: col.x }}>
                    {col[locale]} ({graph.nodes.filter((n) => n.layer === col.layer).length})
                  </span>
                ))}
              </div>

              <svg
                className={styles.edgeSvg}
                viewBox={`0 0 ${graph.viewBox.width} ${graph.viewBox.height}`}
                aria-hidden="true"
              >
                {graph.edges.map((edge) => {
                  const inTrace = activeTrace.edgeIds.has(edge.id);
                  const fromNode = nodeMap.get(edge.from);
                  const toNode = nodeMap.get(edge.to);
                  const matchesStatus =
                    statusFilter === "all" ||
                    fromNode?.verifiedStatus === statusFilter ||
                    toNode?.verifiedStatus === statusFilter;
                  const cls = inTrace
                    ? `${styles.edgePath} ${styles.edgePathActive}`
                    : !matchesStatus
                      ? `${styles.edgePath} ${styles.edgePathDimmed}`
                      : styles.edgePath;
                  return <path key={edge.id} d={edge.pathD} className={cls} />;
                })}
              </svg>

              {graph.nodes.map((node) => {
                const isFocus = node.id === selectedNode.id;
                const inTrace = activeTrace.nodeIds.has(node.id);
                const matchesFilter =
                  statusFilter === "all" || node.verifiedStatus === statusFilter;

                const state = isFocus
                  ? "focus"
                  : inTrace && matchesFilter
                    ? "connected"
                    : !matchesFilter
                      ? "dimmed"
                      : "idle";

                return (
                  <button
                    key={node.id}
                    ref={(el) => {
                      nodeButtonRefs.current[node.id] = el;
                    }}
                    type="button"
                    data-testid={`graph-node-${node.id}`}
                    data-state={state}
                    aria-pressed={isFocus}
                    className={styles.nodeBtn}
                    style={{
                      left: node.x,
                      top: node.y,
                      width: node.width,
                      height: node.height,
                    }}
                    onClick={() => setSelectedId(node.id)}
                    onKeyDown={(e) => handleNodeKeyDown(e, node)}
                  >
                    <span className={styles.nodeMeta}>
                      <span>{layerText(node.layer)}</span>
                      <span>
                        {node.isArchivedUnlisted
                          ? isZh
                            ? "归档复盘"
                            : "archived"
                          : statusText(node.verifiedStatus)}
                      </span>
                    </span>
                    <span className={styles.nodeTitle}>{node.title[locale]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.matrixTable}>
              <caption className="visually-hidden">
                {isZh ? "节点关联列表" : "Lineage node matrix"}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{isZh ? "层级" : "Layer"}</th>
                  <th scope="col">{isZh ? "节点" : "Node"}</th>
                  <th scope="col">{isZh ? "验证状态" : "Verified Status"}</th>
                  <th scope="col">{isZh ? "关联边" : "Links"}</th>
                </tr>
              </thead>
              <tbody>
                {visibleTableNodes.map((n) => (
                  <tr key={n.id}>
                    <td>{layerText(n.layer)}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.hopBtn}
                        onClick={() => setSelectedId(n.id)}
                      >
                        {n.title[locale]}
                      </button>
                    </td>
                    <td>{statusText(n.verifiedStatus)}</td>
                    <td>{traceCausalPath(graph, n.id).edgeIds.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <aside className={styles.inspectorCard} data-testid="graph-inspector">
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span className="eyebrow">
                {isZh ? layerText(selectedNode.layer) : selectedNode.layer.toUpperCase()} · {selectedNode.slug}
              </span>
              <VerifiedStatusBadge status={selectedNode.verifiedStatus} locale={locale} />
            </div>
            <h2 className="h-display" style={{ fontSize: 22, marginTop: 8 }}>
              {selectedNode.title[locale]}
            </h2>
            <p className="prose" style={{ marginTop: 6 }}>
              {selectedNode.summary[locale]}
            </p>
          </div>

          <div className={styles.gapCallout}>
            <strong style={{ display: "block", marginBottom: 4, color: "var(--text)" }}>
              {isZh ? "诚实边界与未测空白" : "Honest Scope & Verification Gap"}
            </strong>
            {selectedNode.honestGap[locale]}
          </div>

          <Link
            href={selectedNode.href}
            className="btn btn-primary"
            style={{ minHeight: 38, justifySelf: "start" }}
          >
            {isZh ? "查看该节点源记录 →" : "Open Source Record →"}
          </Link>

          <div className={styles.inspectorSection}>
            <span className="eyebrow">
              {isZh
                ? `上游相关节点 (${incomingEdges.length})`
                : `Related upstream (${incomingEdges.length})`}
            </span>
            {incomingEdges.length === 0 ? (
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-3)" }}>
                {isZh ? "演进档案馆里的起源节点。" : "Root node in Archive Vault."}
              </p>
            ) : (
              <ul className={styles.hopList}>
                {incomingEdges.map((edge) => {
                  const src = nodeMap.get(edge.from);
                  if (!src) return null;
                  return (
                    <li key={edge.id} className={styles.hopItem}>
                      <button
                        type="button"
                        className={styles.hopBtn}
                        onClick={() => setSelectedId(src.id)}
                      >
                        ← {src.title[locale]}
                      </button>
                      <span style={{ fontSize: 12.5, color: "var(--text-2)" }}>
                        {edge.mechanism[locale]}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={styles.inspectorSection}>
            <span className="eyebrow">
              {isZh
                ? `下游相关节点 (${outgoingEdges.length})`
                : `Related downstream (${outgoingEdges.length})`}
            </span>
            {outgoingEdges.length === 0 ? (
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-3)" }}>
                {isZh ? "末端专文聚类节点。" : "Terminal Monograph Cluster node."}
              </p>
            ) : (
              <ul className={styles.hopList}>
                {outgoingEdges.map((edge) => {
                  const dst = nodeMap.get(edge.to);
                  if (!dst) return null;
                  return (
                    <li key={edge.id} className={styles.hopItem}>
                      <button
                        type="button"
                        className={styles.hopBtn}
                        onClick={() => setSelectedId(dst.id)}
                      >
                        {dst.title[locale]} →
                      </button>
                      <span style={{ fontSize: 12.5, color: "var(--text-2)" }}>
                        {edge.mechanism[locale]}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {viewMode === "split" && (
        <div className={styles.tableWrap} data-testid="graph-adjacency-table">
          <table className={styles.matrixTable}>
            <caption className="visually-hidden">
              {isZh ? "跨层关联同步索引表" : "Synchronized lineage adjacency matrix"}
            </caption>
            <thead>
              <tr>
                <th scope="col">{isZh ? "层级" : "Layer"}</th>
                <th scope="col">{isZh ? "标题" : "Title"}</th>
                <th scope="col">{isZh ? "验证状态" : "Status"}</th>
                <th scope="col">{isZh ? "坦诚局限说明" : "Verification Limit"}</th>
              </tr>
            </thead>
            <tbody>
              {visibleTableNodes.map((node) => (
                <tr key={node.id}>
                  <td>{layerText(node.layer)}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.hopBtn}
                      onClick={() => setSelectedId(node.id)}
                    >
                      {node.title[locale]}
                    </button>
                  </td>
                  <td>{statusText(node.verifiedStatus)}</td>
                  <td style={{ color: "var(--text-2)" }}>{node.honestGap[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
