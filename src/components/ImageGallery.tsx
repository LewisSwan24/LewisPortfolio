"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { CaseLightbox } from "@/components/case/CaseLightbox";

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
  }>;
  columns?: 2 | 3 | 4;
}

/**
 * MDX Image Gallery powered by the shared zero-dependency native `<dialog>`
 * `CaseLightbox` (replacing external lightbox bundles).
 */
export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <>
      <div className={cn("grid gap-4", gridCols[columns])}>
        {images.map((image, index) => (
          <button
            key={image.src + index}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-surface cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
            aria-label={`Inspect image ${index + 1}: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <CaseLightbox
        slides={images}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onSelectIndex={setOpenIndex}
      />
    </>
  );
}
