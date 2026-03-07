/**
 * Shared rate limiting middleware for API routes
 * In-memory store (resets on cold start / redeploy)
 */

interface RateLimitEntry {
    count: number;
    lastReset: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();
const MAX_MAP_ENTRIES = 1000;

interface RateLimitConfig {
    /** Unique identifier for this rate limiter */
    name: string;
    /** Max requests allowed per window */
    maxRequests: number;
    /** Time window in milliseconds */
    windowMs: number;
}

/**
 * Check if a request from the given IP is rate limited.
 * Uses separate stores per limiter name to avoid collisions.
 */
export function isRateLimited(ip: string, config: RateLimitConfig): boolean {
    const now = Date.now();

    // Get or create store for this limiter
    if (!stores.has(config.name)) {
        stores.set(config.name, new Map());
    }
    const store = stores.get(config.name)!;

    // Evict stale entries to prevent memory leaks
    if (store.size > MAX_MAP_ENTRIES) {
        Array.from(store.entries()).forEach(([key, val]) => {
            if (now - val.lastReset > config.windowMs) {
                store.delete(key);
            }
        });
    }

    const entry = store.get(ip);

    if (!entry || now - entry.lastReset > config.windowMs) {
        store.set(ip, { count: 1, lastReset: now });
        return false;
    }

    if (entry.count >= config.maxRequests) {
        return true;
    }

    entry.count++;
    return false;
}

/**
 * Extract client IP from request headers
 */
export function getClientIp(request: Request): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "anonymous"
    );
}
