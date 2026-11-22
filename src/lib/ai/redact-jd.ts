const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_RE = /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?){2,4}\d{3,4}/g;
const URL_RE = /(?:https?:\/\/|www\.)[^\s<>"']+/gi;
const INTERNAL_HOST_RE = /\b(?:localhost|127\.0\.0\.1|[\w-]+\.(?:internal|local|corp))\b(?::\d+)?/gi;

export const MAX_JD_QUERY_CHARS = 1200;

export interface RedactResult {
  sanitized: string;
  redactedCount: number;
  truncated: boolean;
}

export function redactPii(raw: string): RedactResult {
  let text = raw.trim();
  let redactedCount = 0;

  const replaceWithCount = (re: RegExp, replacement: string) => {
    text = text.replace(re, (match) => {
      // Avoid redacting standalone 4-digit years or simple numbers when matching phones
      if (re === PHONE_RE && match.replace(/\D/g, "").length < 8) {
        return match;
      }
      redactedCount += 1;
      return replacement;
    });
  };

  replaceWithCount(EMAIL_RE, "[redacted-email]");
  replaceWithCount(URL_RE, "[redacted-url]");
  replaceWithCount(INTERNAL_HOST_RE, "[redacted-host]");
  replaceWithCount(PHONE_RE, "[redacted-phone]");

  const truncated = text.length > MAX_JD_QUERY_CHARS;
  if (truncated) {
    text = text.slice(0, MAX_JD_QUERY_CHARS);
  }

  return {
    sanitized: text,
    redactedCount,
    truncated,
  };
}
