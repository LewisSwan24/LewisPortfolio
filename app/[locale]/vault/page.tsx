import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getAllVaultAutopsies } from "@/data/vault/autopsies";
import { ArchiveVaultClient } from "@/components/vault/ArchiveVaultClient";
import { LineageGraphClient } from "@/components/studio/LineageGraphClient";
import { CaseAppendixHashOpener } from "@/components/case/story/CaseAppendixHashOpener";
import { buildCausalLineageGraph } from "@/lib/graph/lineage-graph";

const NO_ALIASES = {} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "演进档案馆 · 负向复盘与演进谱系"
      : "Archive Vault · Death Autopsies & Design Lineage";
  const count = getAllVaultAutopsies().length;
  const description =
    locale === "zh"
      ? `如实记录 ${count} 项退场与课程归档作品为何停下，以及各自和哪些公开主案相关。`
      : `${count} retired and coursework prototypes, documented honestly: why each stopped, and which listed cases it relates to.`;

  return {
    title,
    description,
    alternates: buildAlternates("/vault", locale),
    openGraph: buildOpenGraph({ title, description, path: "/vault", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ArchiveVaultPage() {
  const rawLocale = await getLocale();
  const locale: "en" | "zh" = rawLocale === "zh" ? "zh" : "en";
  const isZh = locale === "zh";
  const autopsies = getAllVaultAutopsies();
  const graph = await buildCausalLineageGraph();

  return (
    <main className="page" data-screen-label="Archive Vault · Death Autopsies">
      <section className="container idx-hero">
        <div className="label">
          {isZh ? "演进档案馆 · 负向复盘与演进谱系" : "Archive Vault · Death Autopsies & Lineage"}
        </div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? (
            <>
              把「为什么放弃」与「哪里算失败」，<em>同样摆上台面</em>。
            </>
          ) : (
            <>
              {autopsies.length} retired builds, <em>autopsied in public</em>.
            </>
          )}
        </h1>
        <p className="prose" style={{ maxWidth: "68ch", marginTop: 16 }}>
          {isZh
            ? `公开主列表只保留 6 件完成度最高的主案。这里是另外 ${autopsies.length} 件退居二线或停在课程阶段的作品：为什么停下，暴露了什么问题，和哪个公开主案相关。`
            : `The main list stays at six cases. This vault documents the other ${autopsies.length} unlisted builds: why each stopped, what it exposed, and which listed case it relates to.`}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
          <Link href="/projects" className="btn btn-primary">
            {isZh ? "回到 6 大公开旗舰 →" : "Back to 6 Listed Flagships →"}
          </Link>
          <a href="#lineage-graph" className="btn btn-ghost">
            {isZh ? "关联图谱 ↓" : "Lineage graph ↓"}
          </a>
          <Link href="/patterns" className="btn btn-ghost">
            {isZh ? "查看交互模式图谱 →" : "Open Pattern Atlas →"}
          </Link>
        </div>
      </section>

      <section className="container section">
        <ArchiveVaultClient autopsies={autopsies} locale={locale} />
      </section>

      {/* v7.0 S2: the lineage graph used to be its own page (/studio/graph,
          now a redirect here). It stays whole, folded; #lineage-graph opens it. */}
      <section className="container section" style={{ paddingTop: 0 }}>
        <CaseAppendixHashOpener aliases={NO_ALIASES} />
        <details id="lineage-graph" className="fold-row">
          <summary>
            <span className="h-display h3">
              {isZh ? "关联图谱：归档作品、主案、模式与专文" : "Lineage graph: archived work, listed cases, patterns and essays"}
            </span>
          </summary>
          <p className="prose" style={{ maxWidth: "70ch", marginTop: 12 }}>
            {isZh
              ? "四层坐标由服务端预先算好：归档作品、公开主案、交互模式、专文聚类。点击或用方向键选中任一节点，就会高亮相连的节点。上方的实证筛选可以找出仍待外部验证的部分。连线只表示相关，不表示因果。"
              : "Precomputed on the server with no heavy client graph library. Click or arrow-navigate any node across the four layers to highlight the nodes it links to. Links mean related, not caused by."}
          </p>
          <LineageGraphClient graph={graph} locale={locale} />
        </details>
      </section>
    </main>
  );
}
