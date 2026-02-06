import { cookies } from "next/headers";
import { getDictionary, normalizeLanguage, defaultLanguage, type Dictionary, type Language } from "./i18n";

export function getCurrentLanguage(): Language {
  try {
    const cookieStore = cookies();
    return normalizeLanguage(cookieStore.get("lang")?.value);
  } catch {
    return defaultLanguage;
  }
}

export function getCurrentDictionary(): { lang: Language; dict: Dictionary } {
  const lang = getCurrentLanguage();
  return { lang, dict: getDictionary(lang) };
}
