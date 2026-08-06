"use client";

import { useState } from "react";

interface DemoEmbedProps {
  src: string;
  title: string;
  poster: string;
  posterAlt: string;
  label: string;
  blurb: string;
  action: string;
  openLabel: string;
}

/**
 * Click-to-load embed. The MazeRunners showcase pulls a 31 MB audio track and
 * several video files, so mounting the iframe on page load would undo the
 * weight savings the rest of the site just made. The poster carries the intent
 * and the iframe only mounts once someone actually wants to play.
 */
export function DemoEmbed({
  src,
  title,
  poster,
  posterAlt,
  label,
  blurb,
  action,
  openLabel,
}: DemoEmbedProps) {
  const [live, setLive] = useState(false);

  return (
    <section className="container case-demo" aria-label={label}>
      <div className="case-demo-head">
        <div className="label">{label}</div>
        <p>{blurb}</p>
      </div>

      <div className="case-demo-frame">
        {live ? (
          <iframe
            src={src}
            title={title}
            allow="autoplay; fullscreen; serial"
            loading="lazy"
          />
        ) : (
          <button type="button" className="case-demo-poster" onClick={() => setLive(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt={posterAlt} loading="lazy" />
            <span className="case-demo-cta">{action}</span>
          </button>
        )}
      </div>

      <a className="case-demo-open" href={src} target="_blank" rel="noreferrer noopener">
        {openLabel}
      </a>
    </section>
  );
}
