import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const DYNAMIC_BRIEF_RE = /^\/(?:(?:en|zh)\/)?brief(\/|$)/;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const nonce = DYNAMIC_BRIEF_RE.test(pathname) ? crypto.randomUUID() : null;

  let response: NextResponse;
  if (!/^\/(en|zh)(\/|$)/.test(pathname)) {
    if (nonce) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-nonce", nonce);
      response = NextResponse.next({ request: { headers: requestHeaders } });
    } else {
      response = NextResponse.next();
    }
  } else {
    response = handleI18nRouting(request);
  }

  if (nonce) {
    response.headers.set("x-csp-layer", "dynamic-brief");
    response.headers.set("x-request-nonce", nonce);
    response.headers.set("Cache-Control", "private, no-store");
  }

  return response;
}

export const config = {
  // Match all pathnames except for:
  // - /api, /trpc, /_next, /_vercel
  // - files with extensions (e.g. favicon.ico, og-image.svg)
  matcher: "/((?!api|trpc|_next|_vercel|opengraph-image|.*\\..*).*)",
};
