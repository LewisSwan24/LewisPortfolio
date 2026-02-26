import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "zh"],
    defaultLocale: "en",
    // English has no prefix: /projects
    // Chinese has prefix:   /zh/projects
    localePrefix: {
        mode: "as-needed",
    },
});
