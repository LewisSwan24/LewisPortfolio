import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = `${siteConfig.name} — studio log`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(family: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (
    await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
      },
    })
  ).text();
  const match = css.match(/src: url\((.+?)\) format\('(truetype|opentype|woff)'\)/);
  if (!match) throw new Error(`Font ${family} TTF not found`);
  const resp = await fetch(match[1]);
  return resp.arrayBuffer();
}

const BONE_100 = "#F6F4EF";
const BONE_300 = "#DBD5C9";
const MUTED = "#5C564D";
const INK = "#151412";
const ACCENT = "#A63F2A";

export default async function Image() {
  const headline = "Studio log.";
  const sub = "Interaction & Product Designer";
  const name = siteConfig.name.toUpperCase();

  const alphabet =
    headline +
    sub +
    name +
    " · STUDIO LOG — PORTFOLIO " +
    siteConfig.url.replace(/^https?:\/\//, "") +
    "abcdefghijklmnopqrstuvwxyz0123456789";

  const [displaySans, mono] = await Promise.all([
    loadGoogleFont("Space+Grotesk:wght@700", alphabet).catch(() => null),
    loadGoogleFont("JetBrains+Mono:wght@500", alphabet).catch(() => null),
  ]);

  const fonts: Array<{ name: string; data: ArrayBuffer; style: "normal"; weight: 500 | 700 }> = [];
  if (displaySans) fonts.push({ name: "SpaceGrotesk", data: displaySans, style: "normal", weight: 700 });
  if (mono) fonts.push({ name: "JetBrainsMono", data: mono, style: "normal", weight: 500 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          backgroundColor: BONE_100,
          borderTop: `8px solid ${ACCENT}`,
          fontFamily: "JetBrainsMono",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "JetBrainsMono",
            fontSize: 18,
            letterSpacing: "0.2em",
            color: MUTED,
          }}
        >
          <div style={{ width: 10, height: 10, backgroundColor: ACCENT }} />
          <div style={{ color: INK }}>{name}</div>
          <div>·</div>
          <div>STUDIO LOG</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontFamily: "SpaceGrotesk",
              fontWeight: 700,
              fontSize: 112,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: INK,
              display: "flex",
            }}
          >
            {headline}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 56, height: 3, backgroundColor: ACCENT }} />
            <div style={{ fontFamily: "JetBrainsMono", fontSize: 22, color: MUTED }}>
              {sub}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${BONE_300}`,
            paddingTop: 20,
            fontFamily: "JetBrainsMono",
            fontSize: 14,
            color: MUTED,
            letterSpacing: "0.18em",
          }}
        >
          <div>— STUDIO LOG</div>
          <div>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
