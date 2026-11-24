import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { LineageGraphClient } from "@/components/studio/LineageGraphClient";
import { buildCausalLineageGraph } from "@/lib/graph/lineage-graph";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "设计关联图谱 · /studio/graph"
      : "Design Lineage Graph · /studio/graph";
  const description =
    locale === "zh"
      ? "把 Archive Vault 归档作品、公开主案、交互模式和专文聚类连成一张关联图，支持实证状态筛选与全键盘遍历。"
      : "Interactive server-computed graph showing how archived projects, listed cases, interaction patterns and essay clusters relate.";

  return {
    title,
    description,
    alternates: buildAlternates("/studio/graph", locale),
    openGraph: buildOpenGraph({ title, description, path: "/studio/graph", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function CausalLineageGraphPage() {
  const rawLocale = await getLocale();
  const locale: "en" | "zh" = rawLocale === "zh" ? "zh" : "en";
  const isZh = locale === "zh";
  const graph = await buildCausalLineageGraph();

  return (
    <main className="page" data-screen-label="Causal Lineage Graph · v5.7">
      <section className="container idx-hero">
        <div className="label">
          {isZh ? "STUDIO · 关联图谱 (v5.7)" : "STUDIO · LINEAGE GRAPH (v5.7)"}
        </div>
        <h1 className="h-display h1" style={{ marginTop: 14 }}>
          {isZh ? (
            <>
              归档作品、主案、模式与专文，<em>彼此怎么相关</em>。
            </>
          ) : (
            <>
              Archived work, listed cases, patterns and essays: <em>how they relate</em>.
            </>
          )}
        </h1>
        <p className="prose" style={{ maxWidth: "70ch", marginTop: 12 }}>
          {isZh
            ? "四层坐标由服务端预先算好：归档作品、公开主案、交互模式、专文聚类。点击或用方向键选中任一节点，就会高亮和它相连的节点。上方的实证筛选可以找出仍待外部验证的部分。连线只表示相关，不表示因果。"
            : "Precomputed on the server with no heavy client graph library. Click or arrow-navigate any node across the four layers to highlight the nodes it links to. Links mean related, not caused by."}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          <Link href="/vault" className="btn btn-ghost">
            {isZh ? "查看 Archive Vault 档案 →" : "Open Archive Vault →"}
          </Link>
          <Link href="/studio/replay" className="btn btn-ghost">
            {isZh ? "协议帧重放台 (/studio/replay) →" : "Protocol Replay Studio →"}
          </Link>
          <Link href="/patterns" className="btn btn-ghost">
            {isZh ? "交互模式图谱 (/patterns) →" : "Pattern Atlas →"}
          </Link>
        </div>
      </section>

      <section className="section container" style={{ paddingTop: 0 }}>
        <LineageGraphClient graph={graph} locale={locale} />
      </section>
    </main>
  );
}
