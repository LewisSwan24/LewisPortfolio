// v7.1 block 2: field data should describe people, not crawlers, CI or lab
// runs. Browsers always send a user agent with a beacon, so an empty one is
// treated as a script too. The client also skips sending when
// navigator.webdriver is set (src/lib/web-vitals.ts); this is the server-side
// half, for automation that does not set it.
const AUTOMATION_PATTERN =
  /bot\/|\+https?:\/\/|crawler|spider|crawling|slurp|headlesschrome|chrome-lighthouse|lighthouse|pagespeed|gtmetrix|playwright|puppeteer|selenium|webdriver|phantomjs|curl\/|wget\/|python-requests|python-urllib|aiohttp|httpx|node-fetch|undici|axios\/|go-http-client|java\/|okhttp|libwww|scrapy|facebookexternalhit|embedly|preview/i;

export function isAutomatedUserAgent(ua: string | null | undefined): boolean {
  const value = ua?.trim();
  if (!value) return true;
  return AUTOMATION_PATTERN.test(value);
}
