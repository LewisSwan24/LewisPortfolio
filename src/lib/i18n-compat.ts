/**
 * Compatibility bridge for the i18n migration.
 *
 * Under next-intl, server components use getTranslations() and client
 * components use useTranslations(). However the existing codebase passes
 * a full dictionary object through props. This shim lets pages inside
 * `app/[locale]` call `getPageDictionary()` which returns the raw
 * messages object — same shape as the old `getCurrentDictionary()`.
 *
 * As pages/components are gradually migrated to use `useTranslations()`
 * directly, this file can be deleted.
 */
import { getMessages, getLocale } from "next-intl/server";
import type { Dictionary } from "@/lib/i18n";

export type Language = "en" | "zh";

export async function getPageDictionary() {
    const locale = (await getLocale()) as Language;
    const messages = await getMessages();
    return {
        lang: locale,
        dict: messages as unknown as Dictionary,
    };
}

/**
 * Legacy re-export: drop-in replacement for old getCurrentDictionary()
 * but now backed by next-intl.
 */
export { getPageDictionary as getCurrentDictionary };
