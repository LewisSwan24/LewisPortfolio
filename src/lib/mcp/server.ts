import { redactPii } from "@/lib/ai/redact-jd";
import { hybridRetrieve } from "@/lib/ai/hybrid-retrieval";
import { getListedCases } from "@/lib/cases/registry";
import { getCaseResearchVault } from "@/data/cases/research-vault";
import { getVaultAutopsyBySlug } from "@/data/vault/autopsies";
import { getReplayTraceBySlug } from "@/data/replay/traces";
import { RESUME_COMPOSER_PRESETS } from "@/lib/resume/composer-data";
import { RESUME_COMPOSER_MARKETS } from "@/lib/resume/composer-markets";
import { siteConfig } from "@/lib/site";
import { MCP_TOOL_NAMES, type McpToolName } from "./client-presets";
import {
  AuditVaultLineageArgsSchema,
  ComposeBriefArgsSchema,
  GetReplayFrameArgsSchema,
  InspectCaseTradeoffArgsSchema,
  LISTED_SLUG_SET,
  MCP_PROTOCOL_VERSION,
  McpJsonRpcRequestSchema,
  SearchEvidenceArgsSchema,
  ToolsCallParamsSchema,
  UNLISTED_SLUG_SET,
} from "./schema";

export { MCP_TOOL_NAMES };

export interface McpToolDefinition {
  name: McpToolName;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface McpManifest {
  protocolVersion: string;
  serverInfo: {
    name: string;
    version: string;
    homepage: string;
  };
  endpoint: string;
  readOnly: true;
  tools: McpToolDefinition[];
}

export interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

const TOOL_DEFINITIONS: McpToolDefinition[] = [
  {
    name: "search_portfolio_evidence",
    description:
      "Runs hybrid BM25F and quantized vector retrieval over Lewis Dong's listed flagships, raw research vaults, interaction patterns, and bilingual essays. Scrubs PII and excludes unlisted archival projects.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["query"],
      properties: {
        query: { type: "string", minLength: 2, maxLength: 600 },
        locale: { type: "string", enum: ["en", "zh"], default: "en" },
        limit: { type: "integer", minimum: 1, maximum: 10, default: 5 },
      },
    },
  },
  {
    name: "inspect_case_tradeoff",
    description:
      "Returns structured human tension, rejected shortcuts, chosen tradeoff, residual risk, and verification boundaries for any of the 6 listed flagship builds.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["slug"],
      properties: {
        slug: {
          type: "string",
          enum: ["walkie", "lamplight", "autofill", "maze", "onthebeat", "grassland"],
        },
        locale: { type: "string", enum: ["en", "zh"], default: "en" },
      },
    },
  },
  {
    name: "get_protocol_replay_frame",
    description:
      "Returns deterministic millisecond telemetry frames (nominal or fault-injected) for hardware and protocol tracks: Walkie, MazeRunners, or On The Beat.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["slug"],
      properties: {
        slug: { type: "string", enum: ["walkie", "maze", "onthebeat"] },
        mode: { type: "string", enum: ["nominal", "fault"], default: "nominal" },
        locale: { type: "string", enum: ["en", "zh"], default: "en" },
      },
    },
  },
  {
    name: "audit_vault_lineage",
    description:
      "Audits an explicitly archived-unlisted study in the Archive Vault, exposing what broke and which listed flagship inherited its structural fix.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["slug"],
      properties: {
        slug: {
          type: "string",
          enum: ["fencepost", "connect", "spectra", "vigil", "rules", "gapmapper", "hoop", "pricewise"],
        },
        locale: { type: "string", enum: ["en", "zh"], default: "en" },
      },
    },
  },
  {
    name: "compose_tailored_brief",
    description:
      "Assembles a role-specific summary paired with APAC AI Closed-Loop or ANZ Engineering Critique market emphasis from verified composer presets.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["role"],
      properties: {
        role: { type: "string", enum: ["ixd-ai", "design-tech", "product-ux"] },
        market: {
          type: "string",
          enum: ["apac-closed-loop", "anz-critique"],
          default: "anz-critique",
        },
        locale: { type: "string", enum: ["en", "zh"], default: "en" },
      },
    },
  },
];

export function buildMcpManifest(): McpManifest {
  return {
    protocolVersion: MCP_PROTOCOL_VERSION,
    serverInfo: {
      name: "lewis-dong-portfolio-mcp",
      version: "5.6.0",
      homepage: siteConfig.url,
    },
    endpoint: "/api/mcp",
    readOnly: true,
    tools: TOOL_DEFINITIONS,
  };
}

function asToolText(payload: unknown, isError = false) {
  return {
    isError,
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
}

function resolveHref(value: string | { en: string; zh: string } | undefined, locale: "en" | "zh"): string {
  if (!value) return "";
  return typeof value === "string" ? value : value[locale];
}

function referencesUnlistedSlug(value: string | undefined): boolean {
  if (!value) return false;
  for (const hidden of UNLISTED_SLUG_SET) {
    if (value.includes(`/projects/${hidden}`)) return true;
  }
  return false;
}

export async function handleMcpRpcRequest(rawBody: unknown): Promise<JsonRpcResponse> {
  const reqParsed = McpJsonRpcRequestSchema.safeParse(rawBody);
  const fallbackId =
    rawBody && typeof rawBody === "object" && "id" in rawBody
      ? ((rawBody as { id?: string | number | null }).id ?? null)
      : null;

  if (!reqParsed.success) {
    return {
      jsonrpc: "2.0",
      id: fallbackId,
      error: {
        code: -32600,
        message: "Invalid JSON-RPC 2.0 request envelope.",
        data: reqParsed.error.flatten(),
      },
    };
  }

  const req = reqParsed.data;
  const id = req.id ?? null;

  switch (req.method) {
    case "ping":
    case "notifications/initialized":
      return { jsonrpc: "2.0", id, result: {} };

    case "initialize":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: MCP_PROTOCOL_VERSION,
          serverInfo: {
            name: "lewis-dong-portfolio-mcp",
            version: "5.6.0",
          },
          capabilities: {
            tools: { listChanged: false },
          },
        },
      };

    case "tools/list":
      return {
        jsonrpc: "2.0",
        id,
        result: { tools: TOOL_DEFINITIONS },
      };

    case "tools/call": {
      const callParsed = ToolsCallParamsSchema.safeParse(req.params ?? {});
      if (!callParsed.success) {
        return {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32602,
            message: "Invalid tools/call parameters.",
            data: callParsed.error.flatten(),
          },
        };
      }

      const { name, arguments: args } = callParsed.data;
      return executeTool(name, args, id);
    }
  }
}

function executeTool(
  name: McpToolName,
  rawArgs: Record<string, unknown>,
  id: string | number | null
): JsonRpcResponse {
  if (name === "search_portfolio_evidence") {
    const parsed = SearchEvidenceArgsSchema.safeParse(rawArgs);
    if (!parsed.success) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32602, message: "Invalid arguments for search_portfolio_evidence.", data: parsed.error.flatten() },
      };
    }
    const { sanitized, redactedCount } = redactPii(parsed.data.query);
    const hits = hybridRetrieve(sanitized, parsed.data.locale, parsed.data.limit * 2)
      .filter((h) => {
        const slugPrefix = h.id.split(":")[0] ?? "";
        const href = resolveHref(h.href as string | { en: string; zh: string }, parsed.data.locale);
        if (UNLISTED_SLUG_SET.has(h.slug) || UNLISTED_SLUG_SET.has(slugPrefix)) return false;
        if (referencesUnlistedSlug(href)) return false;
        return true;
      })
      .slice(0, parsed.data.limit)
      .map((h) => ({
        id: h.id,
        caseSlug: h.slug,
        caseTitle: h.caseTitle[parsed.data.locale],
        pillar: h.pillar,
        title: h.title[parsed.data.locale],
        excerpt: h.text[parsed.data.locale],
        href: resolveHref(h.href as string | { en: string; zh: string }, parsed.data.locale),
        hybridScore: h.hybridScore,
      }));

    return {
      jsonrpc: "2.0",
      id,
      result: asToolText({
        redactedCount,
        sanitizedQuery: sanitized,
        count: hits.length,
        matches: hits,
      }),
    };
  }

  if (name === "inspect_case_tradeoff") {
    const parsed = InspectCaseTradeoffArgsSchema.safeParse(rawArgs);
    if (!parsed.success) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32602, message: "Invalid arguments for inspect_case_tradeoff.", data: parsed.error.flatten() },
      };
    }
    const { slug, locale } = parsed.data;
    if (!LISTED_SLUG_SET.has(slug)) {
      return {
        jsonrpc: "2.0",
        id,
        result: asToolText(
          {
            error: "Case is excluded from public flagship inspection. Use audit_vault_lineage for archived works.",
            slug,
          },
          true
        ),
      };
    }

    const record = getListedCases().find((c) => c.slug === slug);
    const vault = getCaseResearchVault(slug);
    if (!record) {
      return { jsonrpc: "2.0", id, result: asToolText({ error: "Case not found." }, true) };
    }

    return {
      jsonrpc: "2.0",
      id,
      result: asToolText({
        slug,
        title: record.card[locale].title,
        role: record.card[locale].role,
        summary: record.card[locale].sub,
        decisions: (record.designDecisions ?? []).map((d) => ({
          title: d.decisionTitle[locale],
          humanTension: d.humanTension[locale],
          rejectedAlternatives: d.rejectedAlternatives.map((r) => ({
            option: r.option[locale],
            flaw: r.flaw[locale],
          })),
          chosenTradeoff: d.chosenTradeoff[locale],
          residualCostOrRisk: d.residualCostOrRisk[locale],
        })),
        rawResearchCount: vault ? vault.observationLogs.length + vault.triRoleTension.length : 0,
        honestCeiling: record.card[locale].m3,
      }),
    };
  }

  if (name === "get_protocol_replay_frame") {
    const parsed = GetReplayFrameArgsSchema.safeParse(rawArgs);
    if (!parsed.success) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32602, message: "Invalid arguments for get_protocol_replay_frame.", data: parsed.error.flatten() },
      };
    }
    const { slug, mode, locale } = parsed.data;
    const trace = getReplayTraceBySlug(slug);
    if (!trace) {
      return { jsonrpc: "2.0", id, result: asToolText({ error: "Trace not found." }, true) };
    }
    const frames = mode === "fault" ? trace.faultFrames : trace.nominalFrames;
    return {
      jsonrpc: "2.0",
      id,
      result: asToolText({
        slug,
        mode,
        title: trace.title[locale],
        transportSummary: trace.transportSummary[locale],
        honestCalibrationNote: trace.honestCalibrationNote[locale],
        frames: frames.map((f) => ({
          id: f.id,
          timestampMs: f.timestampMs,
          channel: f.channel,
          state: f.stateLabel[locale],
          faultState: f.faultState,
          rawHex: f.rawHex,
          humanSummary: f.humanSummary[locale],
        })),
      }),
    };
  }

  if (name === "audit_vault_lineage") {
    const parsed = AuditVaultLineageArgsSchema.safeParse(rawArgs);
    if (!parsed.success) {
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32602, message: "Invalid arguments for audit_vault_lineage.", data: parsed.error.flatten() },
      };
    }
    const { slug, locale } = parsed.data;
    const autopsy = getVaultAutopsyBySlug(slug);
    if (!autopsy) {
      return { jsonrpc: "2.0", id, result: asToolText({ error: "Vault record not found." }, true) };
    }
    return {
      jsonrpc: "2.0",
      id,
      result: asToolText({
        slug,
        status: "archived-unlisted",
        title: autopsy.title[locale],
        year: autopsy.year,
        whatItBuilt: autopsy.whatItBuilt[locale],
        autopsyReason: autopsy.autopsyReason[locale],
        structuralFlawExposed: autopsy.structuralFlawExposed[locale],
        lineageLesson: autopsy.lineageLesson[locale],
        lineageSuccessors: autopsy.lineageSuccessors.map((s) => ({
          slug: s.slug,
          title: s.title[locale],
          transferMechanism: s.transferMechanism[locale],
        })),
      }),
    };
  }

  const parsed = ComposeBriefArgsSchema.safeParse(rawArgs);
  if (!parsed.success) {
    return {
      jsonrpc: "2.0",
      id,
      error: { code: -32602, message: "Invalid arguments for compose_tailored_brief.", data: parsed.error.flatten() },
    };
  }
  const { role, market, locale } = parsed.data;
  const preset = RESUME_COMPOSER_PRESETS.find((p) => p.id === role) ?? RESUME_COMPOSER_PRESETS[0]!;
  const marketSpec = RESUME_COMPOSER_MARKETS.find((m) => m.id === market) ?? RESUME_COMPOSER_MARKETS[0]!;
  const emphasis = preset.marketEmphasis[market];

  return {
    jsonrpc: "2.0",
    id,
    result: asToolText({
      roleId: preset.id,
      marketId: marketSpec.id,
      marketLabel: marketSpec.label[locale],
      headline: emphasis.headline[locale],
      pitch: emphasis.pitch[locale],
      evidenceOrderNote: emphasis.evidenceOrderNote[locale],
      defaultCases: preset.defaultCaseSlugs,
      skills: preset.skills[locale],
    }),
  };
}
