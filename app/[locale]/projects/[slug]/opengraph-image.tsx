import { ImageResponse } from "next/og";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title || "Project";
  const oneLiner = project?.oneLiner || "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#fafafa",
          fontFamily: "system-ui, sans-serif",
          padding: "60px 80px",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#3b82f6",
          }}
        />

        {/* Site name badge */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#3b82f6",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              fontSize: 20,
              color: "#525252",
              fontWeight: 500,
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "900px",
          }}
        >
          {/* Project title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#171717",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>

          {/* One liner */}
          <div
            style={{
              fontSize: 24,
              color: "#525252",
              lineHeight: 1.5,
            }}
          >
            {oneLiner}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

export function generateImageMetadata() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => {
    const project = getProjectBySlug(slug);
    return {
      id: slug,
      alt: project?.title || "Project",
      size,
      contentType,
    };
  });
}
