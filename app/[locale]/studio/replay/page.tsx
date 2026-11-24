import { Suspense } from "react";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LocalizedServerLink as Link } from "@/components/LocalizedServerLink";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { getAllReplayTraces } from "@/data/replay/traces";
import { ReplayWorkbenchClient } from "@/components/studio/ReplayWorkbenchClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as "en" | "zh";
  const title =
    locale === "zh"
      ? "硬件与协议帧步进重放工作台 · Protocol Replay Studio"
      : "Protocol Replay Studio · Hardware & Frame Stepper";
  const description =
    locale === "zh"
      ? "按毫秒单步检查 Walkie AES-256-GCM 密封帧、MazeRunners 45 ms 红外防抖与 On The Beat BLE 近场台阶，支持故障注入。"
      : "Step millisecond-by-millisecond through Walkie AES-256-GCM frames, MazeRunners 45 ms IR debounce, and On The Beat BLE pacing with fault injection.";

  return {
    title,
    description,
    alternates: buildAlternates("/studio/replay", locale),
    openGraph: buildOpenGraph({ title, description, path: "/studio/replay", locale }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ProtocolReplayStudioPage() {
  const rawLocale = await getLocale();
  const locale: "en" | "zh" = rawLocale === "zh" ? "zh" : "en";
  const isZh = locale === "zh";
  const traces = getAllReplayTraces();

  return (
    <main className="page" data-screen-label="Studio · Protocol Frame Replay">
      <section className="container lab-hero">
        <div className="v4-editorial-grid">
          <div className="v4-span-8">
            <div className="eyebrow">
              {isZh
                ? "Replay Studio · 确定性硬件与协议帧工作台"
                : "Replay Studio · Hardware & Protocol Frame Workbench"}
            </div>
            <h1 className="h-display h1" style={{ marginTop: 12 }}>
              {isZh
                ? "把毫秒级硬件防抖、加密帧与故障退避摆到桌面"
                : "Inspect every millisecond of hardware debounce, sealing & fault recovery"}
            </h1>
            <p className="sub">
              {isZh
                ? "精选 Walkie、MazeRunners 与 On The Beat 三个软硬协同案例的真实协议状态时序。支持单步步进、注入拔线/毛刺/断连故障，并在支持浏览器中提供只读 Web Serial 串口探针。"
                : "Deterministic telemetry timelines extracted from Walkie, MazeRunners, and On The Beat firmware protocols — complete with interactive fault injection and an optional read-only Web Serial hardware sniffer."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
              <Link href="/lab" className="btn btn-ghost">
                {isZh ? "← 返回设计实验室 (/lab)" : "← Back to Lab Workbench (/lab)"}
              </Link>
              <Link href="/ai" className="btn btn-ghost">
                {isZh ? "查看 AI 红队答辩 (/ai) →" : "Open AI Red-Team Defense (/ai) →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <Suspense fallback={null}>
          <ReplayWorkbenchClient traces={traces} locale={locale} />
        </Suspense>
      </section>
    </main>
  );
}
