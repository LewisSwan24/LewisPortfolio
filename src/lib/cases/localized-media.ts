/**
 * v6.9 (review R09): case drawings that have a Simplified Chinese twin
 * (`name.zh.svg` beside `name.svg`). Chinese pages load the twin.
 */
const ZH_SVG_TWINS = new Set([
  "/projects/walkie/01-architecture.svg",
  "/projects/walkie/02-key-state-machine.svg",
  "/projects/walkie/03-sealed-relay-frame.svg",
  "/projects/walkie/after-architecture.svg",
  "/projects/autofill/after-architecture.svg",
  "/projects/grassland/after-architecture.svg",
  "/projects/maze/after-architecture.svg",
  "/projects/onthebeat/after-architecture.svg",
]);

export function localizeMediaSrc(src: string, locale: string): string {
  if (locale !== "zh" || !ZH_SVG_TWINS.has(src)) return src;
  return src.replace(/\.svg$/, ".zh.svg");
}

export const zhSvgTwins: ReadonlySet<string> = ZH_SVG_TWINS;
