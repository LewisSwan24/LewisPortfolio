import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "zh"],
    defaultLocale: "en",
    // English has no prefix: /projects
    // Chinese has prefix:   /zh/projects
    localePrefix: {
        mode: "as-needed",
    },
    // URL is the source of truth. Don't let cookie / Accept-Language
    // redirect — it makes the manual locale toggle a no-op.
    localeDetection: false,
});
