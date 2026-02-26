import { TestClient } from "@/components/TestClient";

export default function TestPage() {
    return (
        <div style={{ padding: "4rem" }}>
            <h2>Test route - Before client component:</h2>
            <TestClient />
            <h2>After client component</h2>
        </div>
    );
}
