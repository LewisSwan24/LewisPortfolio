import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the shared modules
vi.mock("@/lib/rate-limit", () => ({
    isRateLimited: vi.fn(() => false),
    getClientIp: vi.fn(() => "127.0.0.1"),
}));

vi.mock("@/lib/validators", () => ({
    isValidEmail: vi.fn((email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
    sanitize: vi.fn((str: string) => str.trim()),
}));

// Must import after mocks
import { POST } from "../../../app/api/contact/route";
import { isRateLimited } from "@/lib/rate-limit";

function makeRequest(body: Record<string, unknown>, headers?: Record<string, string>): Request {
    return new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    });
}

describe("POST /api/contact", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return 400 when required fields are missing", async () => {
        const req = makeRequest({ name: "Test" }); // missing email, subject, message
        const res = await POST(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toContain("required");
    });

    it("should return 400 for invalid email", async () => {
        const req = makeRequest({
            name: "Test",
            email: "not-an-email",
            subject: "Hello",
            message: "Test message",
        });
        const res = await POST(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toContain("email");
    });

    it("should return 400 when fields exceed max length", async () => {
        const req = makeRequest({
            name: "A".repeat(101),
            email: "test@example.com",
            subject: "Hello",
            message: "Test",
        });
        const res = await POST(req);
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toContain("length");
    });

    it("should return 429 when rate limited", async () => {
        vi.mocked(isRateLimited).mockReturnValueOnce(true);
        const req = makeRequest({
            name: "Test",
            email: "test@example.com",
            subject: "Hello",
            message: "Test message",
        });
        const res = await POST(req);
        expect(res.status).toBe(429);
    });

    it("should silently accept honeypot submissions", async () => {
        const req = makeRequest({
            name: "Bot",
            email: "bot@spam.com",
            subject: "Buy now",
            message: "Spam",
            _gotcha: "filled-by-bot",
        });
        const res = await POST(req);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.success).toBe(true);
    });

    it("should return success for valid submission", async () => {
        const req = makeRequest({
            name: "Lewis Dong",
            email: "lewis@example.com",
            subject: "Hello",
            message: "Great portfolio!",
        });
        const res = await POST(req);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data.success).toBe(true);
    });
});
