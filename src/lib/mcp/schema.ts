import { z } from "zod";
import { LISTED_PROJECT_SLUGS, UNLISTED_PROJECT_SLUGS } from "@/lib/project-routes";
import { REPLAY_TRACK_SLUGS } from "@/lib/replay/schema";
import { MCP_TOOL_NAMES } from "./client-presets";

export const MCP_PROTOCOL_VERSION = "2025-03-26";

export const McpJsonRpcRequestSchema = z
  .object({
    jsonrpc: z.literal("2.0"),
    id: z.union([z.string(), z.number(), z.null()]).optional(),
    method: z.enum(["initialize", "notifications/initialized", "tools/list", "tools/call", "ping"]),
    params: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export const SearchEvidenceArgsSchema = z
  .object({
    query: z.string().trim().min(2).max(600),
    locale: z.enum(["en", "zh"]).optional().default("en"),
    limit: z.number().int().min(1).max(10).optional().default(5),
  })
  .strict();

export const InspectCaseTradeoffArgsSchema = z
  .object({
    slug: z.string().trim().min(2).max(40),
    locale: z.enum(["en", "zh"]).optional().default("en"),
  })
  .strict();

export const GetReplayFrameArgsSchema = z
  .object({
    slug: z.enum(REPLAY_TRACK_SLUGS),
    mode: z.enum(["nominal", "fault"]).optional().default("nominal"),
    locale: z.enum(["en", "zh"]).optional().default("en"),
  })
  .strict();

export const AuditVaultLineageArgsSchema = z
  .object({
    slug: z.enum(UNLISTED_PROJECT_SLUGS),
    locale: z.enum(["en", "zh"]).optional().default("en"),
  })
  .strict();

export const ComposeBriefArgsSchema = z
  .object({
    role: z.enum(["ixd-ai", "design-tech", "product-ux"]),
    market: z.enum(["apac-closed-loop", "anz-critique"]).optional().default("anz-critique"),
    locale: z.enum(["en", "zh"]).optional().default("en"),
  })
  .strict();

export const ToolsCallParamsSchema = z
  .object({
    name: z.enum(MCP_TOOL_NAMES),
    arguments: z.record(z.string(), z.unknown()).optional().default({}),
  })
  .strict();

export const LISTED_SLUG_SET = new Set<string>(LISTED_PROJECT_SLUGS);
export const UNLISTED_SLUG_SET = new Set<string>(UNLISTED_PROJECT_SLUGS);
