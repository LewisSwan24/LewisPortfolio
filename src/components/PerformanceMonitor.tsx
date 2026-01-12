"use client";

import { useEffect } from "react";

/**
 * Client-side performance monitoring component
 * Loads and initializes Web Vitals tracking
 */
export function PerformanceMonitor() {
    useEffect(() => {
        // Dynamically import web vitals to avoid SSR issues
        import("@/lib/web-vitals")
            .then(({ reportWebVitals }) => {
                reportWebVitals();
            })
            .catch((error) => {
                console.error("Failed to load web vitals:", error);
            });
    }, []);

    return null;
}
