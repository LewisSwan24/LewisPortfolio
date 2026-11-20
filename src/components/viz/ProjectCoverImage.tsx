"use client";

// Used only inside the client /projects index. The server homepage renders
// next/image itself: sharing this module across both broke the homepage in dev
// with "Cannot read properties of undefined (reading 'call')" (2026-11-20).
import Image from "next/image";
import type { ProjectCover } from "@/lib/project-covers";

/**
 * A case's real image, filling a positioned frame. Portrait phone screens and
 * wide multi-screen strips are letterboxed on the surface rather than cropped,
 * so the interface a reader is judging stays whole.
 */
export function ProjectCoverImage({
  cover,
  locale,
  sizes,
  priority = false,
}: {
  cover: ProjectCover;
  locale: "en" | "zh";
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      className={`project-cover project-cover--${cover.fit}`}
      src={cover.src}
      alt={cover.alt[locale]}
      fill
      sizes={sizes}
      priority={priority}
    />
  );
}
