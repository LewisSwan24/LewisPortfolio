"use client";

import { Component, type ReactNode } from "react";

interface Props { children: ReactNode; name: string; }
interface State { hasError: boolean; error: Error | null; }

class DebugErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }
    componentDidCatch(error: Error, info: any) {
        console.error(`[DEBUG] ${this.props.name} crashed:`, error.message, error.stack);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ border: "2px solid red", padding: "1rem", margin: "1rem" }}>
                    <strong>❌ {this.props.name} crashed:</strong>
                    <pre style={{ fontSize: "12px", overflow: "auto" }}>{this.state.error?.message}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export { DebugErrorBoundary };
