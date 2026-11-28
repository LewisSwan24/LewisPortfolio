import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET as vitalsGet, POST as vitalsPost } from "../../app/api/vitals/route";
import { getKvConfig } from "@/lib/server/kv";
import {
  kvReadVitals,
  kvRecordVital,
  VITALS_DAILY_CAP,
  VITALS_WINDOW_DAYS,
  vitalsKey,
} from "@/lib/server/vitals-kv";
import { isAutomatedUserAgent } from "@/lib/vitals-filter";
import { resetTelemetryForTests, summarizeVitals } from "@/lib/vitals-store";

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/** A tiny in-memory Upstash REST pipeline, enough for the commands the store sends. */
function installFakeUpstash() {
  const lists = new Map<string, string[]>();
  const sets = new Map<string, Set<string>>();
  const strings = new Map<string, string>();
  const ttls = new Map<string, number>();
  const commands: unknown[][] = [];
  const run = (cmd: (string | number)[]) => {
    commands.push(cmd);
    const [op, key, ...args] = cmd.map(String);
    switch (op) {
      case "RPUSH": {
        const list = lists.get(key) ?? [];
        list.push(...args);
        lists.set(key, list);
        return list.length;
      }
      case "LTRIM": {
        const list = lists.get(key) ?? [];
        const len = list.length;
        let start = Number(args[0]);
        let stop = Number(args[1]);
        if (start < 0) start = Math.max(0, len + start);
        if (stop < 0) stop = len + stop;
        lists.set(key, list.slice(start, stop + 1));
        return "OK";
      }
      case "LRANGE":
        return lists.get(key) ?? [];
      case "EXPIRE":
        ttls.set(key, Number(args[0]));
        return 1;
      case "SADD": {
        const set = sets.get(key) ?? new Set();
        for (const m of args) set.add(m);
        sets.set(key, set);
        return 1;
      }
      case "SMEMBERS":
        return [...(sets.get(key) ?? [])];
      case "SREM": {
        for (const m of args) sets.get(key)?.delete(m);
        return 1;
      }
      case "INCR": {
        const next = Number(strings.get(key) ?? "0") + 1;
        strings.set(key, String(next));
        return next;
      }
      case "GET":
        return strings.get(key) ?? null;
      default:
        throw new Error(`fake upstash: unsupported ${op}`);
    }
  };
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: { body: string }) => {
      const batch = JSON.parse(init.body) as (string | number)[][];
      return new Response(JSON.stringify(batch.map((c) => ({ result: run(c) }))), { status: 200 });
    }),
  );
  return { lists, sets, strings, ttls, commands };
}

function post(body: unknown, ua: string | null = BROWSER_UA) {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (ua !== null) headers["user-agent"] = ua;
  return vitalsPost(
    new Request("http://localhost/api/vitals", { method: "POST", headers, body: JSON.stringify(body) }),
  );
}

const NOW = new Date("2026-11-28T10:00:00Z");

beforeEach(() => {
  resetTelemetryForTests();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("isAutomatedUserAgent", () => {
  it.each([
    ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/131.0.0.0 Safari/537.36", true],
    ["Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse", true],
    ["Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)", true],
    ["Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)", true],
    ["Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)", true],
    ["curl/8.7.1", true],
    ["python-requests/2.32.3", true],
    ["Playwright/1.65.0 (x64; windows 10.0) node/24.15", true],
    ["", true],
    [null, true],
    [BROWSER_UA, false],
    ["Mozilla/5.0 (Linux; Android 9; CUBOT X19) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36", false],
    ["Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1", false],
  ])("%s → %s", (ua, expected) => {
    expect(isAutomatedUserAgent(ua)).toBe(expected);
  });
});

describe("getKvConfig", () => {
  it("accepts the Vercel KV variable names when the Upstash ones are absent", () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("KV_REST_API_URL", "https://kv.example.upstash.io/");
    vi.stubEnv("KV_REST_API_TOKEN", "kv-token");
    expect(getKvConfig()).toEqual({ url: "https://kv.example.upstash.io", token: "kv-token" });
  });

  it("prefers the Upstash names when both are set", () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://a.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "a-token");
    vi.stubEnv("KV_REST_API_URL", "https://b.upstash.io");
    vi.stubEnv("KV_REST_API_TOKEN", "b-token");
    expect(getKvConfig()).toEqual({ url: "https://a.upstash.io", token: "a-token" });
  });
});

describe("kvRecordVital / kvReadVitals", () => {
  beforeEach(() => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://fake.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "t");
  });

  it("pushes a metric onto its day/metric/group list, capped, with a 31-day expiry", async () => {
    const kv = installFakeUpstash();
    expect(await kvRecordVital({ metric: "LCP", value: 1234, routeGroup: "case" }, NOW)).toBe(true);
    const key = vitalsKey("2026-11-28", "LCP", "case");
    expect(key).toBe("rum:v2:2026-11-28:LCP:case");
    expect(kv.lists.get(key)).toEqual(["1234"]);
    expect(kv.ttls.get(key)).toBe(31 * 24 * 60 * 60);
    expect(kv.commands).toContainEqual(["LTRIM", key, -VITALS_DAILY_CAP, -1]);
    expect(kv.commands.length).toBeLessThanOrEqual(5);
  });

  it("counts interactions per day, route group and target", async () => {
    const kv = installFakeUpstash();
    await kvRecordVital({ metric: "INTERACTION", value: 1, routeGroup: "case", interactionTarget: "simulator" }, NOW);
    await kvRecordVital({ metric: "INTERACTION", value: 1, routeGroup: "case", interactionTarget: "simulator" }, NOW);
    expect(kv.strings.get("rum:v2:2026-11-28:INTERACTION:case:simulator")).toBe("2");
  });

  it("keeps only the newest values once a day's list passes the cap", async () => {
    const kv = installFakeUpstash();
    for (let i = 0; i < VITALS_DAILY_CAP + 3; i++) {
      await kvRecordVital({ metric: "TTFB", value: i, routeGroup: "home" }, NOW);
    }
    const list = kv.lists.get(vitalsKey("2026-11-28", "TTFB", "home"))!;
    expect(list).toHaveLength(VITALS_DAILY_CAP);
    expect(list[0]).toBe("3");
  });

  it("reads back the last 30 days and drops older days from the index", async () => {
    const kv = installFakeUpstash();
    const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86_400_000);
    await kvRecordVital({ metric: "LCP", value: 1000, routeGroup: "home" }, daysAgo(0));
    await kvRecordVital({ metric: "LCP", value: 3000, routeGroup: "home" }, daysAgo(29));
    await kvRecordVital({ metric: "LCP", value: 9999, routeGroup: "home" }, daysAgo(30));
    await kvRecordVital({ metric: "INTERACTION", value: 1, routeGroup: "lab", interactionTarget: "specimen" }, daysAgo(1));

    const snap = await kvReadVitals(NOW);
    expect(VITALS_WINDOW_DAYS).toBe(30);
    expect(snap?.samples.map((s) => s.value).sort()).toEqual([1000, 3000]);
    expect(snap?.samples.find((s) => s.value === 3000)?.day).toBe("2026-10-30");
    expect(snap?.interactions).toEqual([{ day: "2026-11-27", routeGroup: "lab", target: "specimen", count: 1 }]);
    expect([...kv.sets.values()].flatMap((s) => [...s]).some((k) => k.includes("2026-10-29"))).toBe(false);
  });

  it("returns null and records nothing when Upstash is not configured", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    const kv = installFakeUpstash();
    expect(await kvRecordVital({ metric: "LCP", value: 1, routeGroup: "home" }, NOW)).toBe(false);
    expect(await kvReadVitals(NOW)).toBeNull();
    expect(kv.commands).toHaveLength(0);
  });
});

describe("summarizeVitals", () => {
  it("gives p75 and counts per route group and metric, overall and per day", () => {
    const summary = summarizeVitals(
      {
        samples: [
          { day: "2026-11-27", metric: "LCP", routeGroup: "case", value: 1000 },
          { day: "2026-11-27", metric: "LCP", routeGroup: "case", value: 2000 },
          { day: "2026-11-28", metric: "LCP", routeGroup: "case", value: 3000 },
          { day: "2026-11-28", metric: "LCP", routeGroup: "case", value: 4000 },
          { day: "2026-11-28", metric: "INP", routeGroup: "home", value: 120 },
        ],
        interactions: [{ day: "2026-11-28", routeGroup: "case", target: "simulator", count: 3 }],
      },
      "kv",
    );
    expect(summary.source).toBe("kv");
    expect(summary.windowDays).toBe(30);
    expect(summary.sampleCount).toBe(5 + 3);
    expect(summary.metricsP75.LCP).toBe(4000);
    expect(summary.metricsP75.CLS).toBeNull();
    expect(summary.byRouteGroup.case.LCP).toEqual({ p75: 4000, count: 4 });
    expect(summary.byRouteGroup.home.INP).toEqual({ p75: 120, count: 1 });
    expect(summary.p75ByRouteGroup.case).toEqual({ LCP: 4000, INP: null });
    expect(summary.totalsByRouteGroup).toEqual({ case: 4 + 3, home: 1 });
    expect(summary.interactionsByTarget).toEqual({ simulator: 3 });
    expect(summary.daily).toEqual([
      { day: "2026-11-27", routeGroup: "case", metric: "LCP", p75: 2000, count: 2 },
      { day: "2026-11-28", routeGroup: "case", metric: "LCP", p75: 4000, count: 2 },
      { day: "2026-11-28", routeGroup: "home", metric: "INP", p75: 120, count: 1 },
    ]);
  });
});

describe("/api/vitals", () => {
  it("accepts but does not store beacons from bots, automation or no user agent", async () => {
    for (const ua of ["HeadlessChrome/131.0", "Chrome-Lighthouse", "Googlebot/2.1", null]) {
      const res = await post({ metric: "LCP", value: 900, routeGroup: "home" }, ua);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true, stored: false });
    }
    const summary = (await (await vitalsGet()).json()).summary;
    expect(summary.sampleCount).toBe(0);
    expect(summary.source).toBe("memory");
  });

  it("still rejects payloads with extra keys before looking at the user agent", async () => {
    const res = await post({ metric: "LCP", value: 900, routeGroup: "home", url: "/secret" }, "Googlebot");
    expect(res.status).toBe(400);
  });

  it("stores in Upstash when configured and reports the 30-day summary from it", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://fake.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "t");
    const kv = installFakeUpstash();
    for (const value of [800, 1600, 2400, 3200]) {
      const res = await post({ metric: "LCP", value, routeGroup: "case" });
      expect(await res.json()).toEqual({ ok: true, stored: true });
    }
    expect(kv.lists.get("rum:v2:2026-11-28:LCP:case")).toHaveLength(4);

    resetTelemetryForTests(); // a cold start: memory is empty, Upstash is not
    const summary = (await (await vitalsGet()).json()).summary;
    expect(summary.source).toBe("kv");
    expect(summary.byRouteGroup.case.LCP).toEqual({ p75: 3200, count: 4 });
  });

  it("falls back to memory without Upstash", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    vi.stubEnv("KV_REST_API_URL", "");
    vi.stubEnv("KV_REST_API_TOKEN", "");
    await post({ metric: "CLS", value: 0.05, routeGroup: "blog" });
    const summary = (await (await vitalsGet()).json()).summary;
    expect(summary.source).toBe("memory");
    expect(summary.byRouteGroup.blog.CLS).toEqual({ p75: 0.05, count: 1 });
    expect(summary.daily).toEqual([{ day: "2026-11-28", routeGroup: "blog", metric: "CLS", p75: 0.05, count: 1 }]);
  });
});
