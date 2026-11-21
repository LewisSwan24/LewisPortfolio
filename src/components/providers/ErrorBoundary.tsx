"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error reporting function - can be extended to send to external services
 * like Sentry, LogRocket, or custom error tracking endpoints
 */
async function reportError(error: Error, errorInfo: ErrorInfo, componentStack?: string) {
  // Log to console in all environments
  console.error("ErrorBoundary caught:", {
    error: error.toString(),
    componentStack,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
  });

  // Example: Send to external error tracking service
  // Uncomment and configure for production use
  /*
  if (process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT) {
    try {
      await fetch(process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: error.toString(),
          componentStack,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (e) {
      console.error("Failed to report error:", e);
    }
  }
  */
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Report error with full context
    reportError(error, errorInfo, errorInfo.componentStack ?? undefined);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const errorDetails = process.env.NODE_ENV === "development" 
        ? this.state.error?.toString() 
        : null;

      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8">
          <div className="text-center max-w-lg">
            <div className="text-5xl mb-4">😵</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re sorry, but something unexpected happened. You can try
              recovering or refresh the page.
            </p>
            
            {/* Error details in development */}
            {errorDetails && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-left overflow-auto max-h-48">
                <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                  {errorDetails}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={this.handleRetry}>
                Try Again
              </Button>
              <Button variant="secondary" onClick={this.handleReload}>
                Refresh Page
              </Button>
            </div>

            {/* Support link */}
            <p className="mt-6 text-sm text-muted-foreground">
              If this keeps happening, please{" "}
              <Link
                href="/contact"
                className="text-accent hover:underline"
              >
                contact support
              </Link>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
