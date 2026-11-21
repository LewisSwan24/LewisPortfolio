import { describe, it, expect } from "vitest";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";
import { routing } from "@/i18n/routing";

function flattenKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

describe("next-intl routing & message parity", () => {
  it("declares en and zh locales with en as default", () => {
    expect(routing.locales).toEqual(["en", "zh"]);
    expect(routing.defaultLocale).toBe("en");
  });

  it("keeps top-level namespaces aligned between en.json and zh.json", () => {
    expect(Object.keys(enMessages).sort()).toEqual(Object.keys(zhMessages).sort());
  });

  it("keeps all flattened translation keys aligned between en.json and zh.json", () => {
    const enKeys = flattenKeys(enMessages as unknown as Record<string, unknown>);
    const zhKeys = flattenKeys(zhMessages as unknown as Record<string, unknown>);
    expect(enKeys).toEqual(zhKeys);
  });
});
