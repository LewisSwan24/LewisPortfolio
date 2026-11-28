import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { trackInteraction } from "@/lib/web-vitals";

function setWebdriver(value: boolean) {
  Object.defineProperty(window.navigator, "webdriver", { value, configurable: true });
}

describe("web-vitals beacon sender", () => {
  const sendBeacon = vi.fn(() => true);

  beforeEach(() => {
    sendBeacon.mockClear();
    Object.defineProperty(window.navigator, "sendBeacon", { value: sendBeacon, configurable: true });
  });

  afterEach(() => {
    setWebdriver(false);
  });

  it("sends a beacon for a normal visitor", () => {
    setWebdriver(false);
    trackInteraction("simulator");
    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon).toHaveBeenCalledWith("/api/vitals", expect.any(Blob));
  });

  it("sends nothing when the browser is driven by automation (Playwright, Lighthouse, WebDriver)", () => {
    setWebdriver(true);
    trackInteraction("simulator");
    expect(sendBeacon).not.toHaveBeenCalled();
  });
});
