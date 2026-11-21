export function localizeInternalHref(href: string, locale: string) {
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith("/api/") ||
    href.startsWith("/assets/")
  ) {
    return href;
  }

  const suffixIndex = [href.indexOf("?"), href.indexOf("#")]
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  const path = suffixIndex === undefined ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex === undefined ? "" : href.slice(suffixIndex);

  const lastSegment = path.split("/").pop() ?? "";
  if (/\.[a-z0-9]+$/i.test(lastSegment)) {
    return href;
  }

  const unprefixed = path.replace(/^\/(?:en|zh)(?=\/|$)/, "") || "/";

  if (locale === "zh") {
    return `${unprefixed === "/" ? "/zh" : `/zh${unprefixed}`}${suffix}`;
  }

  return `${unprefixed}${suffix}`;
}
