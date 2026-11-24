export const MCP_TOOL_NAMES = [
  "search_portfolio_evidence",
  "inspect_case_tradeoff",
  "get_protocol_replay_frame",
  "audit_vault_lineage",
  "compose_tailored_brief",
] as const;

export type McpToolName = (typeof MCP_TOOL_NAMES)[number];

export interface McpSandboxPreset {
  tool: McpToolName;
  label: { en: string; zh: string };
  summary: { en: string; zh: string };
  sampleArgs: Record<string, unknown>;
}

export const MCP_SANDBOX_PRESETS: readonly McpSandboxPreset[] = [
  {
    tool: "search_portfolio_evidence",
    label: {
      en: "search_portfolio_evidence",
      zh: "search_portfolio_evidence（混合证据检索）",
    },
    summary: {
      en: "Hybrid BM25F + 64-dim int8 search across listed flagships, raw research vaults, patterns, and 24 essays.",
      zh: "执行 BM25F + 64 维 int8 混合检索（仅命中 6 大公开主案、原始研档、模式与 24 篇专文）。",
    },
    sampleArgs: {
      query: "physical watch key approval AES-256-GCM",
      locale: "en",
      limit: 4,
    },
  },
  {
    tool: "inspect_case_tradeoff",
    label: {
      en: "inspect_case_tradeoff",
      zh: "inspect_case_tradeoff（权衡与拒绝路径）",
    },
    summary: {
      en: "Returns structured human tension, rejected shortcuts, chosen boundary, and residual verification limits.",
      zh: "按公开主案提取用户冲突、被否决方案、选定取舍及仍待验证边界。",
    },
    sampleArgs: {
      slug: "walkie",
      locale: "zh",
    },
  },
  {
    tool: "get_protocol_replay_frame",
    label: {
      en: "get_protocol_replay_frame",
      zh: "get_protocol_replay_frame（毫秒协议帧）",
    },
    summary: {
      en: "Fetches deterministic millisecond traces (nominal or fault-injected) for Walkie, MazeRunners, or On The Beat.",
      zh: "拉取 Walkie、MazeRunners 或 On The Beat 正常/故障注入毫秒波形帧。",
    },
    sampleArgs: {
      slug: "walkie",
      mode: "fault",
      locale: "en",
    },
  },
  {
    tool: "audit_vault_lineage",
    label: {
      en: "audit_vault_lineage",
      zh: "audit_vault_lineage（档案库演进解剖）",
    },
    summary: {
      en: "Audits the 8 archived-unlisted concepts cleanly, showing structural flaws exposed and flagship successors.",
      zh: "显式审计 8 项已退役非公开课题的死亡解剖与向 6 大主案的演化脉络。",
    },
    sampleArgs: {
      slug: "vigil",
      locale: "zh",
    },
  },
  {
    tool: "compose_tailored_brief",
    label: {
      en: "compose_tailored_brief",
      zh: "compose_tailored_brief（双市场简报组装）",
    },
    summary: {
      en: "Generates APAC AI Closed-Loop or ANZ Engineering Critique role briefs backed by live composer presets.",
      zh: "生成 APAC 业务闭环或 ANZ 工程批判双市场定制简报摘要。",
    },
    sampleArgs: {
      role: "design-tech",
      market: "apac-closed-loop",
      locale: "zh",
    },
  },
];
