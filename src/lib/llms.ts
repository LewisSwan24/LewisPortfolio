import { getListedCases } from "@/lib/cases/registry";
import { getAllInteractionPatterns } from "@/data/patterns/patterns-data";
import { getCaseResearchVault } from "@/data/cases/research-vault";
import { getAllReplayTraces } from "@/data/replay/traces";
import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export async function buildLlmsTxt(): Promise<string> {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const listedCases = getListedCases();
  const patterns = getAllInteractionPatterns();
  const posts = await getAllBlogPosts("en");

  const caseLines = listedCases.map((record) => {
    const card = record.card.en;
    const url = `${baseUrl}/en/projects/${record.slug}`;
    const ext = record.links.map((l) => `${l.label}: ${l.href}`).join(" | ");
    const decisionLines = (record.designDecisions ?? []).map(
      (dec, i) =>
        `    ${i + 1}. ${dec.decisionTitle.en} | Tradeoff: ${dec.chosenTradeoff.en} | Limit: ${dec.residualCostOrRisk.en}`
    );
    return [
      `- [${card.title}](${url}) — ${card.kicker}`,
      `  - Summary: ${card.sub}`,
      `  - Scope & Role: ${card.role} (${card.date})`,
      `  - Evidence Metrics: ${card.m1}; ${card.m2}; ${card.m3}`,
      `  - Change Delivered: ${record.workSummary.changed.en}`,
      ...(decisionLines.length > 0
        ? [`  - Structured Design Decisions (${decisionLines.length}):`, ...decisionLines]
        : []),
      ...(ext ? [`  - Public Links: ${ext}`] : []),
    ].join("\n");
  });

  const patternLines = patterns.map(
    (p) => `- [${p.title.en}](${baseUrl}/en/patterns?pattern=${p.slug}) (source: ${p.sourceCaseSlug}) — ${p.tagline.en}`
  );

  const postLines = posts.map(
    (p) => `- [${p.title}](${baseUrl}/en/blog/${p.slug}) (${p.date}) — ${p.excerpt}`
  );

  return [
    `# ${siteConfig.name} — Interaction Designer & Design Engineer Portfolio (v5.6)`,
    "",
    `> Bilingual static portfolio (English & Simplified Chinese) built with Next.js 15, React 19, TypeScript, Zod 4, Tailwind CSS v4, and GSAP.`,
    `> Focus: interaction systems, physical-digital prototyping, AI safety boundaries, ${posts.length} bilingual engineering monographs, WCAG 2.2 AA accessibility, and read-only MCP agent endpoints.`,
    "",
    "## Machine-Readable & Agentic Discovery",
    "",
    `- [Full Evidence Corpus (/llms-full.txt)](${baseUrl}/llms-full.txt): Complete structured corpus with design tradeoffs, raw research vault observations, protocol traces, and code snippets.`,
    `- [MCP Manifest (/.well-known/mcp.json)](${baseUrl}/.well-known/mcp.json): Read-only Model Context Protocol JSON-RPC descriptor.`,
    `- [MCP JSON-RPC Endpoint (/api/mcp)](${baseUrl}/api/mcp): Stateless POST endpoint supporting initialize, tools/list, and tools/call.`,
    "",
    "## Key Hiring & Interactive Surfaces",
    "",
    `- [Home (Top 6 Featured Deck)](${baseUrl}/en): Curated overview of flagship physical, AI, and design-engineering builds.`,
    `- [All Work Index](${baseUrl}/en/projects): Filterable matrix of ${listedCases.length} listed case studies, capability proof table, and cross-case DecisionComparator.`,
    `- [Interaction Pattern Atlas (/patterns)](${baseUrl}/en/patterns): ${patterns.length} reusable interaction patterns with live micro-sandboxes, anti-pattern contrasts, and copyable reference snippets.`,
    `- [Archive Vault (/vault)](${baseUrl}/en/vault): Honest death-autopsy and design-lineage retrospectives mapping 8 retired studies into the 6 listed flagships.`,
    `- [Lab (/lab)](${baseUrl}/en/lab): Swiss Editorial token/contrast inspector, GSAP paper-motion sandbox, 3D/SVG specimen coordinates, deadlock-verified FSM Explorer, and Nielsen 10 Heuristics x WCAG 2.1 Auditor.`,
    `- [Protocol Replay Studio (/studio/replay)](${baseUrl}/en/studio/replay): Millisecond-indexed Walkie AES-256-GCM, MazeRunners 45 ms IR debounce, and On The Beat BLE proximity replay with fault injection.`,
    `- [AI Lab (/ai)](${baseUrl}/en/ai): Zero-hallucination bilingual BM25 rationale workbench indexing all ${listedCases.length} listed cases, interaction patterns, FSM/heuristic audits, and ${posts.length} essays with local PII scrubbing.`,
    `- [Hiring Decision Room](${baseUrl}/en/hire): Role-tailored lens (?role=product|interaction|design-eng|ai-ux), JD evidence matcher, A4 critique print dossiers, and honest project limits.`,
    `- [About](${baseUrl}/en/about): Design stance, UQ/Swansea timeline, and automated engineering verification methodology.`,
    `- [Writing (/blog)](${baseUrl}/en/blog): ${posts.length} bilingual essays with structured methodology comparisons and cross-links.`,
    `- [Resume](${baseUrl}/en/resume): Print-ready A4 experience and verified project history (EN & ZH).`,
    `- [Custom Resume & Dossier Composer](${baseUrl}/en/resume/compose): Interactive role-tailored A4 resume builder filtering cases, design tradeoffs, and honest verification limits.`,
    `- [Contact](${baseUrl}/en/contact): Direct outreach details.`,
    "",
    `## Listed Case Studies (${listedCases.length})`,
    "",
    ...caseLines,
    "",
    `## Interaction Pattern Atlas (${patterns.length})`,
    "",
    ...patternLines,
    "",
    `## Published Engineering & Design Notes (${posts.length})`,
    "",
    ...postLines,
    "",
    "## Integrity & Evidence Policy",
    "",
    "- Every listed case states explicit evidence status, solo vs team boundaries, and unverified constraints.",
    "- Unlisted/abandoned exploratory briefs are excluded from public navigation, feeds, and AI agent indexes.",
    "",
  ].join("\n");
}

export async function buildLlmsFullTxt(): Promise<string> {
  const baseText = await buildLlmsTxt();
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const listedCases = getListedCases();
  const patterns = getAllInteractionPatterns();
  const traces = getAllReplayTraces();

  const deepVaultBlocks = listedCases.map((record) => {
    const vault = getCaseResearchVault(record.slug);
    if (!vault) return "";
    const obs = vault.observationLogs.map(
      (o) => `  - Observation [${o.sessionRef.en}]: ${o.observation.en} (Response: ${o.designResponse.en})`
    );
    const tensions = vault.triRoleTension.map(
      (t) => `  - Tri-Role Tension (${t.roleLabel.en}): Priority=${t.priority.en} | Conflict=${t.tension.en} | Rule=${t.resolution.en}`
    );
    const rebuild = vault.rebuildToday.map((r) => `  - Rebuild (${r.question.en}): ${r.answer.en}`);
    return [
      `### ${record.card.en.title} (${baseUrl}/en/projects/${record.slug})`,
      ...obs,
      ...tensions,
      ...rebuild.slice(0, 2),
    ].join("\n");
  });

  const patternSnippets = patterns.map((p) =>
    [
      `### Pattern ${p.order}: ${p.title.en} (${p.sourceCaseSlug})`,
      `- Human Tension: ${p.humanTension.en}`,
      `- Anti-Pattern Rejected: ${p.commonAntiPattern.en}`,
      `- Chosen Rule: ${p.chosenRule.en}`,
      `- Evidence Ceiling: ${p.metricsCeiling.summary.en}`,
      `- Reference Code (${p.codeSnippet.filename}):`,
      "```" + p.codeSnippet.language,
      p.codeSnippet.code,
      "```",
    ].join("\n")
  );

  const traceBlocks = traces.map((tr) =>
    [
      `### Hardware Replay Trace: ${tr.title.en} (${baseUrl}/en/studio/replay?track=${tr.slug})`,
      `- Transport: ${tr.transportSummary.en}`,
      `- Calibration Note: ${tr.honestCalibrationNote.en}`,
      `- Fault Scenario (${tr.faultInjectionLabel.en}): ${tr.faultInjectionSummary.en}`,
    ].join("\n")
  );

  return [
    baseText,
    "---",
    "",
    "## Deep Raw Research Vaults (6 Flagships)",
    "",
    ...deepVaultBlocks.filter(Boolean),
    "",
    "## Executable Pattern Code Specifications (6)",
    "",
    ...patternSnippets,
    "",
    "## Deterministic Hardware & Protocol Traces (3)",
    "",
    ...traceBlocks,
    "",
  ].join("\n");
}
