import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getAllVaultAutopsies } from "@/data/vault/autopsies";
import { ArchiveVaultClient } from "@/components/vault/ArchiveVaultClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "设计演进与死亡解剖档案馆 · Archive Vault"
      : "Archive Vault · Death Autopsies & Design Lineage";
  const description =
    locale === "zh"
      ? "如实记录 8 项退场、中止与课程归档作品为何停下，以及它们如何把教训输血给 6 大公开旗舰案例。"
      : "Eight retired, abandoned, and coursework prototypes documented honestly — exposing the structural flaws that shaped the six public flagships.";

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

  return (
    <main className="page" data-screen-label="Archive Vault · Death Autopsies">
      <section className="container idx-hero">
        <div className="label">
          {isZh ? "Archive Vault · 负向复盘与演进谱系" : "Archive Vault · Death Autopsies & Lineage"}
        </div>
        <h1 className="h-display h1" style={{ marginTop: 16 }}>
          {isZh ? (
            <>
              把「为什么放弃」与「哪里算失败」，<em>同样摆上台面</em>。
            </>
          ) : (
            <>
              Eight retired builds, <em>autopsied in public</em>.
            </>
          )}
        </h1>
        <p className="prose" style={{ maxWidth: "68ch", marginTop: 16 }}>
          {isZh
            ? "公开简历与作品集主列表只保留 6 件完成度最高的主案；但真正决定交互判断力的，往往是另外 8 件被主动中止、退居二线或停在课程研究阶段的作品。这里记录它们暴露出的结构缺陷，以及每一条教训后来注入了哪一件公开旗舰。"
            : "The public portfolio stays intentionally disciplined at six listed flagships. Yet design judgment is forged just as much by what was stopped early, scoped out, or falsified. This vault documents all eight unlisted builds and maps the exact invariants they handed off."}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
          <Link href="/projects" className="btn btn-primary">
            {isZh ? "回到 6 大公开旗舰 →" : "Back to 6 Listed Flagships →"}
          </Link>
          <Link href="/studio/graph" className="btn btn-ghost">
            {isZh ? "打开因果演进图谱 (/studio/graph) →" : "Open Causal Lineage Graph →"}
          </Link>
          <Link href="/patterns" className="btn btn-ghost">
            {isZh ? "查看交互模式图谱 →" : "Open Pattern Atlas →"}
          </Link>
        </div>
      </section>

      <section className="container section">
        <ArchiveVaultClient autopsies={autopsies} locale={locale} />
      </section>
    </main>
  );
}
