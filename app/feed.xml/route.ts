import { generateRSSFeed } from "@/lib/feed";

export async function GET() {
  const feed = await generateRSSFeed();

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
