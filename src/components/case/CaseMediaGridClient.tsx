"use client";

import { useEffect, useRef, useState } from "react";
import { AdaptiveCaseMedia } from "./AdaptiveCaseMedia";
import { CaseLightbox, type LightboxSlide } from "./CaseLightbox";

export interface CaseGalleryCardItem extends LightboxSlide {
  width: number;
  height: number;
  caption: string;
}

const PREVIEW_COUNT = 2;

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
  // v7.0 L3: two photos first, the rest on request. They stay in the DOM
  // (hidden), and the lightbox still steps through every one.
  const [showAll, setShowAll] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const focusAfterExpand = useRef(false);
  const folded = !showAll && items.length > PREVIEW_COUNT;

  useEffect(() => {
    if (!focusAfterExpand.current) return;
    focusAfterExpand.current = false;
    gridRef.current
      ?.querySelectorAll<HTMLButtonElement>("figure .case-build-trigger")
      [PREVIEW_COUNT]?.focus();
  }, [showAll]);

  return (
    <>
      <div ref={gridRef} className={`case-build-grid${allPhones ? " case-build-grid--phones" : ""}`}>
        {items.map((image, idx) => (
          <figure key={image.src} hidden={folded && idx >= PREVIEW_COUNT}>
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
      {folded && (
        <button
          type="button"
          className="btn btn-ghost case-build-more"
          onClick={() => {
            focusAfterExpand.current = true;
            setShowAll(true);
          }}
        >
          {isZh ? `显示全部 ${items.length} 张` : `Show all ${items.length} photos`}
        </button>
      )}

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
