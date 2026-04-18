import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for:
    // - /api, /trpc, /_next, /_vercel
    // - files with extensions (e.g. favicon.ico, og-image.svg)
    matcher: "/((?!api|trpc|_next|_vercel|opengraph-image|.*\\..*).*)",
};
