import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/rate-limit", () => ({
    isRateLimited: vi.fn(() => false),
    getClientIp: vi.fn(() => "127.0.0.1"),
}));

vi.mock("@/lib/validators", () => ({
    isValidEmail: vi.fn((email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
}));

import { POST } from "../../../app/api/subscribe/route";
import { isRateLimited } from "@/lib/rate-limit";

function makeRequest(body: Record<string, unknown>): Request {
    return new Request("http://localhost:3000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

describe("POST /api/subscribe", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return 400 when email is missing", async () => {
        const res = await POST(makeRequest({}));
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toContain("required");
    });

    it("should return 400 for invalid email format", async () => {
        const res = await POST(makeRequest({ email: "not-valid" }));
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toContain("format");
    });

    it("should return 429 when rate limited", async () => {
        vi.mocked(isRateLimited).mockReturnValueOnce(true);
        const res = await POST(makeRequest({ email: "test@example.com" }));
        expect(res.status).toBe(429);
    });

    it("should silently accept honeypot submissions", async () => {
        const res = await POST(makeRequest({ email: "bot@spam.com", honeypot: "bot-value" }));
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.success).toBe(true);
    });

    it("should return success for valid email", async () => {
        const res = await POST(makeRequest({ email: "lewis@example.com" }));
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.success).toBe(true);
        expect(data.message).toContain("subscribing");
    });
});
