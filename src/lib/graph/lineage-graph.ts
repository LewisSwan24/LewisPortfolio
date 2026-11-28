import { getAllVaultAutopsies } from "@/data/vault/autopsies";
import { getListedCases } from "@/lib/cases/registry";
import { getCaseResearchVault } from "@/data/cases/research-vault";
import { getAllInteractionPatterns } from "@/data/patterns/patterns-data";
import { getAllBlogPosts } from "@/lib/blog";
import { BLOG_CLUSTERS, BLOG_CLUSTER_LABELS, type BlogCluster } from "@/lib/blog-clusters";
import type { CaseVerifiedStatus } from "@/lib/cases/modules-schema";
import {
  traceCausalPath,
  type CausalLineageGraph,
  type LineageEdge,
  type LineageNode,
  type LocalizedPair,
} from "./schema";

export { traceCausalPath };

const VIEWBOX_WIDTH = 1120;
const VIEWBOX_HEIGHT = 720;

const COLUMN_X: Record<0 | 1 | 2 | 3, number> = {
  0: 24,
  1: 304,
  2: 584,
  3: 864,
};

const NODE_WIDTH = 228;

const PATTERN_TO_CLUSTERS: Record<
  string,
  Array<{ cluster: BlogCluster; mechanism: LocalizedPair }>
> = {
  "physical-key-commitment-gate": [
    {
      cluster: "ai-safety",
      mechanism: {
        en: "Grounds fail-closed approval gates against voice spoof and Enter-key fatigue.",
        zh: "以实体键隔离防语音误批与回车疲劳，奠定失效闭锁审批规范。",
      },
    },
    {
      cluster: "physical-computing",
      mechanism: {
        en: "Extends physical dual-key affordances and USB preemption to field hardware guides.",
        zh: "把实体双键盲操与 USB 优先抢占经验整理成嵌入式人因实战长文。",
      },
    },
  ],
  "three-tier-confidence-split": [
    {
      cluster: "ai-safety",
      mechanism: {
        en: "Codifies non-hallucinating confidence lanes and hard human Submit locks.",
        zh: "确立三档置信分流与人工最终确认红线，绝不编造开放题。",
      },
    },
    {
      cluster: "bilingual-systems",
      mechanism: {
        en: "Cross-locale field normalization patterns documented cleanly in EN & ZH essays.",
        zh: "整理中英表单语义映射与双语结构对齐的系统经验。",
      },
    },
  ],
  "default-safe-not-now-focus": [
    {
      cluster: "ai-safety",
      mechanism: {
        en: "Reverses habit loops by placing default keyboard focus on 'Not now' deferral.",
        zh: "用默认聚焦「先不要」扭转高危打断卡上的惯性误触循环。",
      },
    },
    {
      cluster: "cs-ixd",
      mechanism: {
        en: "Exemplifies encoding psychological friction rules directly as state invariants.",
        zh: "体现这一方法：从用户心理阻力出发，先于线框写好状态不变量。",
      },
    },
  ],
  "bidirectional-consent-and-retreat": [
    {
      cluster: "physical-computing",
      mechanism: {
        en: "Covers ESP-NOW nearness thresholds and ending a meeting kindly with LET'S FINISH.",
        zh: "整理 ESP-NOW 近场阈值，以及用 LET'S FINISH 温和结束碰面的做法。",
      },
    },
  ],
  "debounced-trapped-state-latch": [
    {
      cluster: "physical-computing",
      mechanism: {
        en: "Documents the three-sample IR debounce and 400 ms cooldown from the course paper.",
        zh: "整理课程论文里的红外三次取样去抖与 400 ms 冷却。",
      },
    },
    {
      cluster: "cs-ixd",
      mechanism: {
        en: "Pairs hardware interrupts with five-state debug consoles for verifiable exhibition UX.",
        zh: "将硬件中断调优与调试台可视反馈结合，展现跨学科排错方法。",
      },
    },
  ],
  "immutable-cross-stage-grammar": [
    {
      cluster: "cs-ixd",
      mechanism: {
        en: "Enforces invariant input grammar across levels rather than single-mission hacks.",
        zh: "要求全流程沿用同一套命令语法、不设破例，并用测试守住不退化。",
      },
    },
    {
      cluster: "bilingual-systems",
      mechanism: {
        en: "Aligns state terminology parity across dual-language architecture notes.",
        zh: "对齐多关卡规则词表与双语文档架构中的术语一致规范。",
      },
    },
  ],
};

const CLUSTER_DETAILS: Record<
  BlogCluster,
  { summary: LocalizedPair; verifiedStatus: CaseVerifiedStatus; honestGap: LocalizedPair }
> = {
  "cs-ixd": {
    summary: {
      en: "Bridges Swansea CS formal invariants and UQ empirical design methods across real builds.",
      zh: "贯通计算机科学状态机思维与交互研究现场实测的跨学科实践笔记。",
    },
    verifiedStatus: "observed",
    honestGap: {
      en: "Captures author-led exhibition & codebase audits; longitudinal external cohort metrics remain open.",
      zh: "涵盖展陈现场观察与代码门禁检查；长期跨团队对比指标尚待后续验证。",
    },
  },
  "ai-safety": {
    summary: {
      en: "Refusal thresholds, physical commitment keys, and zero-hallucination evidence trails.",
      zh: "聚焦高风险 AI 默认拒答、实体确认按键与零幻觉证据溯源。",
    },
    verifiedStatus: "synthetic-gate",
    honestGap: {
      en: "Tested on synthetic ATS forms and bench agents; independent graduate user cohorts still queued.",
      zh: "已在合成网申表与台架代理跑通；外部独立受试者队列对照尚在排期。",
    },
  },
  "physical-computing": {
    summary: {
      en: "Firmware debounce, dual-boot OTA safety, USB preemption, and ESP-NOW proximity thresholds.",
      zh: "总结固件去抖、双分区 OTA 防变砖、有线优先抢占及 ESP-NOW 近场阈值。",
    },
    verifiedStatus: "bench-tested",
    honestGap: {
      en: "Verified across S3/Mega/wristband lab rigs; extended multi-day crowd wear tests remain unexecuted.",
      zh: "真机台架与 36 人展陈均已通过；长周期高密度户外佩戴仍待外部场测。",
    },
  },
  "bilingual-systems": {
    summary: {
      en: "Independent EN/ZH transcreation, WCAG 2.2 AA calibration, and layout symmetry rules.",
      zh: "围绕双语独立创译、去翻译腔门禁、WCAG 2.2 AA 与排版对称展开。",
    },
    verifiedStatus: "observed",
    honestGap: {
      en: "Automated regex/Axe/target checks enforce zero regressions on every PR build.",
      zh: "每次 PR 均通过全自动反翻译腔正则、Axe 扫描与 24px 热区回归检测。",
    },
  },
};

function computeVerticalLayout(count: number, height: number): { startY: number; gap: number } {
  const paddingY = 44;
  const usable = VIEWBOX_HEIGHT - paddingY * 2;
  const gap = count > 1 ? (usable - count * height) / (count - 1) : 0;
  return { startY: paddingY, gap };
}

function buildBezierEdge(from: LineageNode, to: LineageNode): string {
  const x1 = from.x + from.width;
  const y1 = from.y + from.height / 2;
  const x2 = to.x;
  const y2 = to.y + to.height / 2;
  const dx = (x2 - x1) * 0.48;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export async function buildCausalLineageGraph(): Promise<CausalLineageGraph> {
  const autopsies = getAllVaultAutopsies();
  const flagships = getListedCases();
  const patterns = getAllInteractionPatterns();
  const enPosts = await getAllBlogPosts("en");

  const nodes: LineageNode[] = [];
  const edges: LineageEdge[] = [];

  // Layer 0: Archive Vault autopsies (count comes from the data)
  const vaultH = 62;
  const vaultLayout = computeVerticalLayout(autopsies.length, vaultH);
  autopsies.forEach((a, idx) => {
    nodes.push({
      id: `vault:${a.slug}`,
      slug: a.slug,
      layer: "vault",
      layerIndex: 0,
      title: a.title,
      summary: a.structuralFlawExposed,
      verifiedStatus: a.verifiedStatus,
      honestGap: a.autopsyReason,
      isArchivedUnlisted: true,
      href: `/vault#${a.slug}`,
      x: COLUMN_X[0],
      y: Math.round(vaultLayout.startY + idx * (vaultH + vaultLayout.gap)),
      width: NODE_WIDTH,
      height: vaultH,
    });
  });

  // Layer 1: 6 Flagship Systems
  const flagH = 84;
  const flagLayout = computeVerticalLayout(flagships.length, flagH);
  flagships.forEach((c, idx) => {
    const vault = getCaseResearchVault(c.slug);
    const verifiedStatus: CaseVerifiedStatus = vault?.studyStatus ?? "bench-tested";
    nodes.push({
      id: `flagship:${c.slug}`,
      slug: c.slug,
      layer: "flagship",
      layerIndex: 1,
      title: { en: c.card.en.title, zh: c.card.zh.title },
      summary: { en: c.workSummary.changed.en, zh: c.workSummary.changed.zh },
      verifiedStatus,
      honestGap: vault?.honestScopeNote ?? {
        en: c.card.en.m3,
        zh: c.card.zh.m3,
      },
      isArchivedUnlisted: false,
      href: `/projects/${c.slug}`,
      x: COLUMN_X[1],
      y: Math.round(flagLayout.startY + idx * (flagH + flagLayout.gap)),
      width: NODE_WIDTH,
      height: flagH,
    });
  });

  // Layer 2: 6 Interaction Patterns
  const patH = 84;
  const patLayout = computeVerticalLayout(patterns.length, patH);
  patterns.forEach((p, idx) => {
    nodes.push({
      id: `pattern:${p.slug}`,
      slug: p.slug,
      layer: "pattern",
      layerIndex: 2,
      title: p.title,
      summary: p.tagline,
      verifiedStatus: p.metricsCeiling.verifiedStatus,
      honestGap: p.metricsCeiling.summary,
      isArchivedUnlisted: false,
      href: `/patterns?pattern=${p.slug}`,
      x: COLUMN_X[2],
      y: Math.round(patLayout.startY + idx * (patH + patLayout.gap)),
      width: NODE_WIDTH,
      height: patH,
    });
  });

  // Layer 3: 4 Monograph Clusters
  const clusterH = 112;
  const clusterLayout = computeVerticalLayout(BLOG_CLUSTERS.length, clusterH);
  BLOG_CLUSTERS.forEach((clusterId, idx) => {
    const count = enPosts.filter((p) => p.cluster === clusterId).length;
    const meta = CLUSTER_DETAILS[clusterId];
    nodes.push({
      id: `cluster:${clusterId}`,
      slug: clusterId,
      layer: "cluster",
      layerIndex: 3,
      title: {
        en: `${BLOG_CLUSTER_LABELS[clusterId].en} (${count})`,
        zh: `${BLOG_CLUSTER_LABELS[clusterId].zh} (${count} 篇)`,
      },
      summary: meta.summary,
      verifiedStatus: meta.verifiedStatus,
      honestGap: meta.honestGap,
      isArchivedUnlisted: false,
      href: "/blog",
      x: COLUMN_X[3],
      y: Math.round(clusterLayout.startY + idx * (clusterH + clusterLayout.gap)),
      width: NODE_WIDTH + 4,
      height: clusterH,
    });
  });

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // Edges: Vault -> Flagship
  for (const a of autopsies) {
    const fromNode = nodeMap.get(`vault:${a.slug}`);
    if (!fromNode) continue;
    for (const succ of a.lineageSuccessors) {
      const toNode = nodeMap.get(`flagship:${succ.slug}`);
      if (!toNode) continue;
      edges.push({
        id: `edge:${fromNode.id}->${toNode.id}`,
        from: fromNode.id,
        to: toNode.id,
        pathD: buildBezierEdge(fromNode, toNode),
        mechanism: succ.transferMechanism,
      });
    }
  }

  // Edges: Flagship -> Pattern
  for (const p of patterns) {
    const fromNode = nodeMap.get(`flagship:${p.sourceCaseSlug}`);
    const toNode = nodeMap.get(`pattern:${p.slug}`);
    if (!fromNode || !toNode) continue;
    edges.push({
      id: `edge:${fromNode.id}->${toNode.id}`,
      from: fromNode.id,
      to: toNode.id,
      pathD: buildBezierEdge(fromNode, toNode),
      mechanism: p.tagline,
    });
  }

  // Edges: Pattern -> Cluster
  for (const p of patterns) {
    const fromNode = nodeMap.get(`pattern:${p.slug}`);
    if (!fromNode) continue;
    for (const target of PATTERN_TO_CLUSTERS[p.slug] ?? []) {
      const toNode = nodeMap.get(`cluster:${target.cluster}`);
      if (!toNode) continue;
      edges.push({
        id: `edge:${fromNode.id}->${toNode.id}`,
        from: fromNode.id,
        to: toNode.id,
        pathD: buildBezierEdge(fromNode, toNode),
        mechanism: target.mechanism,
      });
    }
  }

  return {
    viewBox: { width: VIEWBOX_WIDTH, height: VIEWBOX_HEIGHT },
    nodes,
    edges,
  };
}
