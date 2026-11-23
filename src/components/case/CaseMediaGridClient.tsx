"use client";

import { useState } from "react";
import { AdaptiveCaseMedia } from "./AdaptiveCaseMedia";
import { CaseLightbox, type LightboxSlide } from "./CaseLightbox";

export interface CaseGalleryCardItem extends LightboxSlide {
  width: number;
  height: number;
  caption: string;
}

export function CaseMediaGridClient({
  items,
  allPhones,
  isZh,
}: {
  items: CaseGalleryCardItem[];
  allPhones: boolean;
  isZh: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className={`case-build-grid${allPhones ? " case-build-grid--phones" : ""}`}>
        {items.map((image, idx) => (
          <figure key={image.src}>
            <div className="case-build-media-stage">
              <AdaptiveCaseMedia
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                sizes="(max-width: 720px) 100vw, 50vw"
              />
              <button
                type="button"
                className="case-build-trigger case-build-trigger--overlay"
                onClick={() => setOpenIndex(idx)}
                aria-label={
                  isZh
                    ? `放大查看第 ${idx + 1} 张图片：${image.alt}`
                    : `Inspect image ${idx + 1}: ${image.alt}`
                }
              >
                <span className="case-build-zoom-badge" aria-hidden="true">
                  {isZh ? "放大 ↗" : "Inspect ↗"}
                </span>
              </button>
            </div>
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>

      <CaseLightbox
        slides={items}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onSelectIndex={setOpenIndex}
        isZh={isZh}
      />
    </>
  );
}
