import { afterEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "../../app/api/brief/route";
import {
  decodeStatelessBrief,
  encodeStatelessBrief,
  type BriefPayload,
} from "@/lib/server/brief-codec";

describe("V3.9 Brief Codec & /api/brief Route", () => {
  const originalSecret = process.env.PORTFOLIO_ADMIN_SECRET;
  const originalKvUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalKvToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  afterEach(() => {
    process.env.PORTFOLIO_ADMIN_SECRET = originalSecret;
    process.env.UPSTASH_REDIS_REST_URL = originalKvUrl;
    process.env.UPSTASH_REDIS_REST_TOKEN = originalKvToken;
    vi.restoreAllMocks();
  });

  it("encodes and decodes stateless briefs with HMAC verification when secret is configured", () => {
    const sample: BriefPayload = {
      company: "Atlassian",
      roleTrack: "design-eng",
      locale: "en",
      intro: "Curated walkthrough of stateful hardware and AI boundary systems.",
      slugs: ["walkie", "connect", "fencepost"],
      createdAt: "2026-11-21T15:00:00.000Z",
    };

    const token = encodeStatelessBrief(sample, "top-secret-key");
    expect(token.startsWith("s_")).toBe(true);
    expect(token).toContain(".");

    const decoded = decodeStatelessBrief(token, "top-secret-key");
    expect(decoded).toEqual(sample);

    // Tampered signature must be rejected
    expect(decodeStatelessBrief(`${token.slice(0, -1)}X`, "top-secret-key")).toBeNull();
    // Missing signature rejected when secret is configured
    expect(decodeStatelessBrief(token.split(".")[0]!, "top-secret-key")).toBeNull();
  });

  it("gracefully degrades to stateless mode in POST/GET /api/brief when KV is unconfigured", async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.PORTFOLIO_ADMIN_SECRET;

    const req = new Request("http://localhost/api/brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: "Canva",
        roleTrack: "ai-ux",
        locale: "zh",
        intro: "精选 AI 信任边界与表单置信度作品。",
        slugs: ["fencepost", "autofill"],
      }),
    });

    const postRes = await POST(req);
    expect(postRes.status).toBe(200);
    const postJson = (await postRes.json()) as { ok: boolean; mode: string; id: string; url: string };
    expect(postJson.ok).toBe(true);
    expect(postJson.mode).toBe("stateless");
    expect(postJson.url).toBe(`/zh/brief/${postJson.id}`);

    const getRes = await GET(new Request(`http://localhost/api/brief?id=${encodeURIComponent(postJson.id)}`));
    expect(getRes.status).toBe(200);
    const getJson = (await getRes.json()) as { payload: BriefPayload };
    expect(getJson.payload.company).toBe("Canva");
    expect(getJson.payload.slugs).toEqual(["fencepost", "autofill"]);
  });

  it("enforces PORTFOLIO_ADMIN_SECRET on POST /api/brief and persists to Upstash KV when configured", async () => {
    process.env.PORTFOLIO_ADMIN_SECRET = "secret-123";
    process.env.UPSTASH_REDIS_REST_URL = "https://mock-upstash.example.com";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token-abc";

    const unauthorizedRes = await POST(
      new Request("http://localhost/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: "Atlassian",
          roleTrack: "interaction",
          locale: "en",
          intro: "Quick review deck.",
          slugs: ["connect"],
        }),
      })
    );
    expect(unauthorizedRes.status).toBe(401);

    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify([{ result: "OK" }]), { status: 200 }));

    const okRes = await POST(
      new Request("http://localhost/api/brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer secret-123",
        },
        body: JSON.stringify({
          company: "Atlassian",
          roleTrack: "interaction",
          locale: "en",
          intro: "Quick review deck.",
          slugs: ["connect"],
        }),
      })
    );
    expect(okRes.status).toBe(200);
    const json = (await okRes.json()) as { mode: string; id: string };
    expect(json.mode).toBe("kv");
    expect(json.id.startsWith("s_")).toBe(false);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
