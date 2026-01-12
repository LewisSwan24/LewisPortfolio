import { onCLS, onINP, onFCP, onLCP, onTTFB } from "web-vitals";

/**
 * Report Web Vitals metrics using web-vitals v5+
 * FID has been replaced by INP (Interaction to Next Paint)
 */
export function reportWebVitals() {
    try {
        onCLS((metric) => {
            if (process.env.NODE_ENV === "development") {
                console.log(`[Web Vitals] CLS:`, metric.value.toFixed(4), metric.rating);
            }
        });

        onINP((metric) => {
            if (process.env.NODE_ENV === "development") {
                console.log(`[Web Vitals] INP:`, metric.value.toFixed(2), metric.rating);
            }
        });

        onFCP((metric) => {
            if (process.env.NODE_ENV === "development") {
                console.log(`[Web Vitals] FCP:`, metric.value.toFixed(2), metric.rating);
            }
        });

        onLCP((metric) => {
            if (process.env.NODE_ENV === "development") {
                console.log(`[Web Vitals] LCP:`, metric.value.toFixed(2), metric.rating);
            }
        });

        onTTFB((metric) => {
            if (process.env.NODE_ENV === "development") {
                console.log(`[Web Vitals] TTFB:`, metric.value.toFixed(2), metric.rating);
            }
        });
    } catch (error) {
        console.error("Error reporting web vitals:", error);
    }
}
