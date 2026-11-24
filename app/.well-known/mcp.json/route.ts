import { NextResponse } from "next/server";
import { buildMcpManifest } from "@/lib/mcp/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(buildMcpManifest(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
