import { NextResponse } from "next/server";
import { buildSearchIndexItems } from "@/lib/search-index";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string }> }
) {
  const { locale: rawLocale } = await context.params;
  const locale = rawLocale === "zh" ? "zh" : "en";
  const items = await buildSearchIndexItems(locale);

  return NextResponse.json(items, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
