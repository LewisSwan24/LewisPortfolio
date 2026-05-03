import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!/^\/(en|zh)(\/|$)/.test(pathname)) {
        return NextResponse.next();
    }

    return handleI18nRouting(request);
}

export const config = {
    // Match all pathnames except for:
    // - /api, /trpc, /_next, /_vercel
    // - files with extensions (e.g. favicon.ico, og-image.svg)
    matcher: "/((?!api|trpc|_next|_vercel|opengraph-image|.*\\..*).*)",
};
