const CACHE_VERSION = "v6.3.0";
const SHELL_CACHE = `portfolio-shell-${CACHE_VERSION}`;
const ASSET_CACHE = `portfolio-assets-${CACHE_VERSION}`;

function isBypassedPath(pathname) {
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {}
  if (decoded.startsWith("/api/")) return true;
  if (decoded.startsWith("/brief/") || /^\/(en|zh)\/brief(\/|$)/.test(decoded)) return true;
  if (decoded.includes("/brief/")) return true;
  if (decoded.startsWith("/_next/webpack-hmr")) return true;
  return false;
}

function isImmutableStaticAsset(pathname) {
  if (pathname === "/favicon.svg") return true;
  if (!pathname.startsWith("/_next/static/")) return false;
  return /[-.][a-f0-9]{8,}\.(js|css|woff2?|png|webp|avif)$/i.test(pathname);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .catch(() => undefined)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const validCaches = new Set([SHELL_CACHE, ASSET_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => !validCaches.has(k)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isBypassedPath(url.pathname)) return;

  const accept = request.headers.get("accept") || "";
  if (request.mode === "navigate" || accept.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic" && !isBypassedPath(url.pathname)) {
            const copy = response.clone();
            event.waitUntil(
              caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy)).catch(() => undefined)
            );
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/en")))
    );
    return;
  }

  if (isImmutableStaticAsset(url.pathname)) {
    event.respondWith(
      caches.open(ASSET_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const networkPromise = fetch(request)
            .then((res) => {
              if (res.ok && res.type === "basic") {
                void cache.put(request, res.clone());
              }
              return res;
            })
            .catch(() => cached);
          if (cached) {
            event.waitUntil(networkPromise.catch(() => undefined));
            return cached;
          }
          return networkPromise;
        })
      )
    );
  }
});
