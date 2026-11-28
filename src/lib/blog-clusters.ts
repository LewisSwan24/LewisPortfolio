export const BLOG_CLUSTERS = [
  "cs-ixd",
  "ai-safety",
  "physical-computing",
  "bilingual-systems",
] as const;

export type BlogCluster = (typeof BLOG_CLUSTERS)[number];

export const BLOG_CLUSTER_LABELS: Record<BlogCluster, { en: string; zh: string }> = {
  "cs-ixd": { en: "CS × IxD", zh: "CS × 交互设计" },
  "ai-safety": { en: "AI Safety", zh: "AI 信任与拒答" },
  "physical-computing": { en: "Physical Computing", zh: "物理计算与硬件" },
  "bilingual-systems": { en: "Bilingual Systems", zh: "双语系统架构" },
};
