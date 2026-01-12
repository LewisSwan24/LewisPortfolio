import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = `${siteConfig.name} - ${siteConfig.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 80px",
            maxWidth: "900px",
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              width: "80px",
              height: "6px",
              backgroundColor: "#3b82f6",
              borderRadius: "3px",
              marginBottom: "32px",
            }}
          />

          {/* Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#171717",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            {siteConfig.name}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 32,
              color: "#525252",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            {siteConfig.title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 20,
              color: "#737373",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {siteConfig.description}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
