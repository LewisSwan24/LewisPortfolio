import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = `${siteConfig.name} — practice log, est. 2024`;
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

const PAPER_100 = "#EFE8DA";
const PAPER_300 = "#D6CDBC";
const PAPER_500 = "#8E8578";
const PAPER_600 = "#756D61";
const PAPER_800 = "#161412";
const TERRA = "#C9523A";

export default async function Image() {
  const headline = "Practice log,\nest. 2024.";
  const sub = "UX + Interaction Design · Brisbane, AU";
  const name = siteConfig.name.toUpperCase();

  const alphabet =
    headline +
    sub +
    name +
    " · PRACTICE LOG — PORTFOLIO / V4 " +
    siteConfig.url.replace(/^https?:\/\//, "") +
    "abcdefghijklmnopqrstuvwxyz0123456789";

  const [displayItalic, mono] = await Promise.all([
    loadGoogleFont("Fraunces:ital,wght@1,400", alphabet).catch(() => null),
    loadGoogleFont("JetBrains+Mono:wght@500", alphabet).catch(() => null),
  ]);

  const fonts: any[] = [];
  if (displayItalic)
    fonts.push({
      name: "Fraunces",
      data: displayItalic,
      style: "italic",
      weight: 400,
    });
  if (mono)
    fonts.push({
      name: "JetBrainsMono",
      data: mono,
      style: "normal",
      weight: 500,
    });

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
          backgroundColor: PAPER_100,
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
            letterSpacing: "0.22em",
            color: PAPER_600,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: TERRA,
            }}
          />
          <div>{name}</div>
          <div style={{ color: PAPER_500 }}>·</div>
          <div style={{ color: PAPER_500 }}>PRACTICE LOG</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontFamily: "Fraunces",
              fontStyle: "italic",
              fontSize: 120,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: PAPER_800,
              whiteSpace: "pre-wrap",
              display: "flex",
            }}
          >
            {headline}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 56, height: 2, backgroundColor: TERRA }} />
            <div
              style={{
                fontFamily: "JetBrainsMono",
                fontSize: 22,
                color: PAPER_600,
                letterSpacing: "0.01em",
              }}
            >
              {sub}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${PAPER_300}`,
            paddingTop: 20,
            fontFamily: "JetBrainsMono",
            fontSize: 14,
            color: PAPER_500,
            letterSpacing: "0.18em",
          }}
        >
          <div>— PORTFOLIO / V4</div>
          <div>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
