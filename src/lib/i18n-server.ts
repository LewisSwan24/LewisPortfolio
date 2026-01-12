import { cookies } from "next/headers";
import { getDictionary, normalizeLanguage, type Dictionary, type Language } from "./i18n";

export function getCurrentLanguage(): Language {
  const cookieStore = cookies();
  return normalizeLanguage(cookieStore.get("lang")?.value);
}

export function getCurrentDictionary(): { lang: Language; dict: Dictionary } {
  const lang = getCurrentLanguage();
  return { lang, dict: getDictionary(lang) };
}
