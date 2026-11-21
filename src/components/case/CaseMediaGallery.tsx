import Image from "next/image";
import type { CaseMedia } from "@/lib/cases/schema";

export function CaseMediaGallery({
  media,
  isZh,
}: {
  media: CaseMedia;
  isZh: boolean;
}) {
  const allPhones = media.images.every((image) => image.height > image.width);

  return (
    <section
      className="container case-build-evidence"
      aria-label={isZh ? media.labelZh : media.label}
    >
      <div className="case-build-head">
        <div className="label">{isZh ? media.labelZh : media.label}</div>
        <p>{isZh ? media.blurbZh : media.blurb}</p>
      </div>
      <div className={`case-build-grid${allPhones ? " case-build-grid--phones" : ""}`}>
        {media.images.map((image) => (
          <figure key={image.src}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={isZh ? image.altZh : image.alt}
              sizes="(max-width: 720px) 100vw, 50vw"
            />
            <figcaption>{isZh ? image.captionZh : image.caption}</figcaption>
          </figure>
        ))}
      </div>
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
