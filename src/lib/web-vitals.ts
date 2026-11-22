import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

type RouteGroup = "home" | "projects" | "case" | "hire" | "lab" | "blog" | "brief" | "other";

function resolveRouteGroup(): RouteGroup {
  if (typeof window === "undefined") return "other";
  const raw = window.location.pathname.replace(/^\/(?:en|zh)(?=\/|$)/, "") || "/";
  if (raw === "/") return "home";
  if (raw === "/projects") return "projects";
  if (raw.startsWith("/projects/")) return "case";
  if (raw.startsWith("/hire")) return "hire";
  if (raw.startsWith("/lab")) return "lab";
  if (raw.startsWith("/blog")) return "blog";
  if (raw.startsWith("/brief")) return "brief";
  return "other";
}

function sendVitalBeacon(payload: {
  metric: "LCP" | "INP" | "CLS" | "FCP" | "TTFB" | "INTERACTION";
  value: number;
  routeGroup: RouteGroup;
  interactionTarget?: "specimen" | "simulator" | "rationale-ai" | "comparator" | "brief-print";
}) {
  if (typeof navigator === "undefined" || typeof window === "undefined") return;
  const json = JSON.stringify(payload);
  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([json], { type: "application/json" });
      navigator.sendBeacon("/api/vitals", blob);
      return;
    }
    void fetch("/api/vitals", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: json,
      keepalive: true,
    });
  } catch {
    // Telemetry is best-effort and must never throw UI errors
  }
}

export function trackInteraction(
  interactionTarget: "specimen" | "simulator" | "rationale-ai" | "comparator" | "brief-print"
) {
  sendVitalBeacon({
    metric: "INTERACTION",
    value: 1,
    routeGroup: resolveRouteGroup(),
    interactionTarget,
  });
}

/**
 * Report Web Vitals metrics using web-vitals v5+ to zero-PII /api/vitals endpoint.
 */
export function reportWebVitals() {
  try {
    const routeGroup = resolveRouteGroup();
    onCLS((metric) => {
      sendVitalBeacon({ metric: "CLS", value: Number(metric.value.toFixed(4)), routeGroup });
    });
    onINP((metric) => {
      sendVitalBeacon({ metric: "INP", value: Math.round(metric.value), routeGroup });
    });
    onFCP((metric) => {
      sendVitalBeacon({ metric: "FCP", value: Math.round(metric.value), routeGroup });
    });
    onLCP((metric) => {
      sendVitalBeacon({ metric: "LCP", value: Math.round(metric.value), routeGroup });
    });
    onTTFB((metric) => {
      sendVitalBeacon({ metric: "TTFB", value: Math.round(metric.value), routeGroup });
    });
  } catch {
    // Non-fatal
  }
}
