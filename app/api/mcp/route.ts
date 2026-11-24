import { NextResponse } from "next/server";
import { handleMcpRpcRequest } from "@/lib/mcp/server";
import { checkScopedRateLimit, extractClientIp } from "@/lib/server/rate-limit";

const MCP_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id",
  "Cache-Control": "private, no-store",
} as const;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...MCP_CORS_HEADERS,
      Allow: "POST, OPTIONS",
    },
  });
}

export async function POST(req: Request) {
  const ip = extractClientIp(req.headers);
  const limit = await checkScopedRateLimit("mcp", ip, 40, 3600);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32029,
          message: "Rate limit exceeded (40 requests/hour).",
        },
      },
      {
        status: 429,
        headers: {
          ...MCP_CORS_HEADERS,
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: "Parse error: invalid JSON payload.",
        },
      },
      { status: 400, headers: MCP_CORS_HEADERS }
    );
  }

  const rpcResponse = await handleMcpRpcRequest(body);
  return NextResponse.json(rpcResponse, {
    status: 200,
    headers: {
      ...MCP_CORS_HEADERS,
      "X-RateLimit-Remaining": String(limit.remaining),
    },
  });
}
