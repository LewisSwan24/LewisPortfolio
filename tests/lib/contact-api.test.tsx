import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { POST } from "../../app/api/contact/route";
import { resetMemoryRateLimiterForTests } from "@/lib/server/rate-limit";
import { QuickContactForm } from "@/components/contact/QuickContactForm";

describe("/api/contact Rate Limit, Zero-PII & QuickContactForm", () => {
  const originalKvUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalKvToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  beforeEach(() => {
    resetMemoryRateLimiterForTests();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  afterEach(() => {
    process.env.UPSTASH_REDIS_REST_URL = originalKvUrl;
    process.env.UPSTASH_REDIS_REST_TOKEN = originalKvToken;
    vi.restoreAllMocks();
  });

  it("enforces 3-per-window rate limit, traps honeypot, returns mailto fallback, and never logs PII", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const makeReq = (body: Record<string, unknown>, ip = "203.0.113.9") =>
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": ip,
        },
        body: JSON.stringify(body),
      });

    // Request 1: honeypot quietly ignored without error
    const trapRes = await POST(
      makeReq({
        name: "Spam Bot",
        email: "bot@example.com",
        message: "Automated promotional message content here.",
        website: "https://spam.invalid",
      })
    );
    expect(trapRes.status).toBe(200);
    expect((await trapRes.json()) as { mode: string }).toMatchObject({ mode: "ignored" });

    // Request 2 & 3: valid fallback responses with mailtoHref
    for (let i = 0; i < 2; i += 1) {
      const okRes = await POST(
        makeReq({
          name: "Hiring Manager",
          email: "hm@example.com",
          companyOrRole: "Atlassian",
          message: "Let us schedule a 30-minute portfolio review.",
          locale: "en",
        })
      );
      expect(okRes.status).toBe(200);
      const data = (await okRes.json()) as { ok: boolean; mode: string; mailtoHref: string };
      expect(data.ok).toBe(true);
      expect(data.mode).toBe("fallback");
      expect(data.mailtoHref).toContain("mailto:");
    }

    // Request 4 from same IP hits limit (3 per 10min) -> 429
    const limitedRes = await POST(
      makeReq({
        name: "Hiring Manager",
        email: "hm@example.com",
        message: "Fourth request within 10 minutes should rate-limit.",
      })
    );
    expect(limitedRes.status).toBe(429);

    // Ensure zero PII ever passed to console loggers
    const combinedLogs = [...logSpy.mock.calls, ...errSpy.mock.calls].flat().join(" ");
    expect(combinedLogs).not.toContain("hm@example.com");
    expect(combinedLogs).not.toContain("203.0.113.9");
  });

  it("validates fields after interaction and exposes aria-invalid on submit errors in QuickContactForm", () => {
    render(<QuickContactForm locale="en" initialRole="Design Engineer" />);

    const nameInput = screen.getByLabelText(/Your name/i);
    expect(nameInput).toHaveAttribute("aria-invalid", "false");

    fireEvent.click(screen.getByRole("button", { name: /Send message/i }));
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("status")).toHaveTextContent(/Enter your name/i);
  });
});
