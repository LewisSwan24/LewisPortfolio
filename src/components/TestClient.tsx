"use client";

import { useState } from "react";

export function TestClient() {
    const [count, setCount] = useState(0);
    return (
        <div style={{ padding: "2rem", border: "2px solid green" }}>
            <h1>Client Component Works! Count: {count}</h1>
            <button onClick={() => setCount(c => c + 1)}>Click me</button>
        </div>
    );
}
