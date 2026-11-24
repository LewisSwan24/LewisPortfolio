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
      ? "设计因果演化知识图谱 · /studio/graph"
      : "Causal Design Lineage Graph · /studio/graph";
  const description =
    locale === "zh"
      ? "一条穿透 Archive Vault(8)、公开旗舰(6)、模式图谱(6) 与 24 篇专文聚类的有向无环因果谱系图，支持实证空白滤镜与全键盘遍历。"
      : "Interactive server-computed DAG tracing how 8 retired Vault autopsies forged 6 flagship builds, 6 interaction patterns, and 4 monograph clusters.";

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
          {isZh ? "STUDIO · 因果演进知识图谱 (v5.7)" : "STUDIO · CAUSAL KNOWLEDGE GRAPH (v5.7)"}
        </div>
        <h1 className="h-display h1" style={{ marginTop: 14 }}>
          {isZh ? (
            <>
              没有哪条设计准则凭空诞生——<em>每次否决都在下游留下结构印记</em>。
            </>
          ) : (
            <>
              Nothing ships in a vacuum — <em>trace every guardrail back to what broke first</em>.
            </>
          )}
        </h1>
        <p className="prose" style={{ maxWidth: "70ch", marginTop: 12 }}>
          {isZh
            ? "由服务端预计算四层拓扑坐标（Archive Vault 8 项退场解剖 → 6 大公开旗舰 → 6 项交互原语 → 4 组研判专文聚类），点击或用方向键任选节点即可全链路高亮上下游因果，并可用上方实证滤镜直接定位仍待外部验证的假说空白。"
            : "Precomputed on the server with zero heavy client graph dependencies. Click or arrow-navigate any node across four topological layers to highlight its BFS upstream flaws, downstream mechanisms, and unresolved cohort gaps."}
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
