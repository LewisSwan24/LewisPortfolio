import type { CaseMedia } from "@/lib/cases/schema";
import { CaseMediaGridClient, type CaseGalleryCardItem } from "./CaseMediaGridClient";

export function CaseMediaGallery({
  media,
  isZh,
}: {
  media: CaseMedia;
  isZh: boolean;
}) {
  const allPhones = media.images.every((image) => image.height > image.width);
  const items: CaseGalleryCardItem[] = media.images.map((image) => ({
    src: image.src,
    width: image.width,
    height: image.height,
    alt: isZh ? image.altZh : image.alt,
    caption: isZh ? image.captionZh : image.caption,
  }));

  return (
    <section
      className="container case-build-evidence"
      aria-label={isZh ? media.labelZh : media.label}
    >
      <div className="case-build-head">
        <div className="label">{isZh ? media.labelZh : media.label}</div>
        <p>{isZh ? media.blurbZh : media.blurb}</p>
      </div>
      <CaseMediaGridClient items={items} allPhones={allPhones} isZh={isZh} />
      {media.video && (
        <figure className="case-build-video">
          <video
            controls
            preload="none"
            poster={media.video.poster}
            src={media.video.src}
          />
          <figcaption>{isZh ? media.video.captionZh : media.video.caption}</figcaption>
        </figure>
      )}
    </section>
  );
}
