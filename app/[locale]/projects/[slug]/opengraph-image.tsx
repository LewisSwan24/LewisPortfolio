import { ImageResponse } from "next/og";
import { getCaseMood } from "@/lib/cases/mood";
import { CURRENT_PROJECT_SLUGS, PROJECT_OG_COPY, type CurrentProjectSlug } from "@/lib/project-routes";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return CURRENT_PROJECT_SLUGS.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

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

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const copy =
    slug in PROJECT_OG_COPY
      ? PROJECT_OG_COPY[slug as keyof typeof PROJECT_OG_COPY]
      : null;
  const title = copy?.title || "Project";
  const oneLiner = copy?.oneLiner || "";
  const moodHex = CURRENT_PROJECT_SLUGS.includes(slug as CurrentProjectSlug)
    ? getCaseMood(slug as CurrentProjectSlug).light
    : "#A63F2A";
  const name = siteConfig.name.toUpperCase();
  const kicker = `CASE STUDY · ${slug.toUpperCase()}`;

  const alphabet =
    title +
    oneLiner +
    name +
    kicker +
    " — STUDIO LOG / V4.0 CASE STUDY " +
    siteConfig.url.replace(/^https?:\/\//, "") +
    `/projects/${slug}` +
    "abcdefghijklmnopqrstuvwxyz0123456789 ·—";

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
          borderTop: `8px solid ${moodHex}`,
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
          <div style={{ width: 10, height: 10, backgroundColor: moodHex }} />
          <div style={{ color: INK }}>{name}</div>
          <div>·</div>
          <div>{kicker}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontFamily: "SpaceGrotesk",
              fontWeight: 700,
              fontSize: 98,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: INK,
              display: "flex",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {oneLiner && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ width: 56, height: 3, marginTop: 18, backgroundColor: moodHex, flexShrink: 0 }} />
              <div
                style={{
                  fontFamily: "SpaceGrotesk",
                  fontSize: 28,
                  lineHeight: 1.38,
                  color: MUTED,
                  maxWidth: 900,
                  display: "flex",
                }}
              >
                {oneLiner}
              </div>
            </div>
          )}
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
          <div>— STUDIO LOG / V4.0</div>
          <div>{`${siteConfig.url.replace(/^https?:\/\//, "")}/projects/${slug}`}</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
