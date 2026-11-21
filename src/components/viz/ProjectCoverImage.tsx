import Image from "next/image";
import type { ProjectCover } from "@/lib/project-covers";

/**
 * A case's real image, filling a positioned frame. Portrait phone screens and
 * wide multi-screen strips are letterboxed on the surface rather than cropped,
 * so the interface a reader is judging stays whole.
 *
 * Intentionally stateless (no `"use client"` directive) so both Server
 * Components (homepage) and Client Components (/projects index) can share it
 * without introducing a split client-reference boundary in Next.js dev builds.
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
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
