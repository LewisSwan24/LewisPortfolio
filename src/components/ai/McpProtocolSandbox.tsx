"use client";

import { useState } from "react";
import { MCP_SANDBOX_PRESETS, type McpToolName } from "@/lib/mcp/client-presets";
import styles from "./mcp-sandbox.module.css";

const MCP_CONFIG_SNIPPET = `{
  "mcpServers": {
    "lewis-dong-portfolio": {
      "type": "http",
      "url": "https://lewisdong.com/api/mcp"
    }
  }
}`;

export function McpProtocolSandbox({ locale }: { locale: "en" | "zh" }) {
  const isZh = locale === "zh";
  const [selectedTool, setSelectedTool] = useState<McpToolName>("search_portfolio_evidence");
  const [argsJson, setArgsJson] = useState<string>(() =>
    JSON.stringify(MCP_SANDBOX_PRESETS[0]!.sampleArgs, null, 2)
  );
  const [responseText, setResponseText] = useState<string>(
    isZh
      ? "// 点击「执行 POST /api/mcp」，向只读 JSON-RPC 服务端发起真实工具调用。"
      : "// Click 'Run POST /api/mcp' to invoke the stateless read-only JSON-RPC server live."
  );
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [busy, setBusy] = useState<boolean>(false);

  const activePreset =
    MCP_SANDBOX_PRESETS.find((p) => p.tool === selectedTool) ?? MCP_SANDBOX_PRESETS[0]!;

  const selectTool = (tool: McpToolName) => {
    setSelectedTool(tool);
    const preset = MCP_SANDBOX_PRESETS.find((p) => p.tool === tool);
    if (preset) {
      setArgsJson(JSON.stringify(preset.sampleArgs, null, 2));
    }
    setStatusMessage("");
  };

  const invokeRpc = async (method: "tools/list" | "tools/call") => {
    setBusy(true);
    setStatusMessage("");
    try {
      let parsedArgs: Record<string, unknown> = {};
      if (method === "tools/call") {
        parsedArgs = JSON.parse(argsJson) as Record<string, unknown>;
      }
      const payload =
        method === "tools/list"
          ? { jsonrpc: "2.0", id: "web-list", method: "tools/list" }
          : {
              jsonrpc: "2.0",
              id: `web-${selectedTool}`,
              method: "tools/call",
              params: { name: selectedTool, arguments: parsedArgs },
            };

      const res = await fetch("/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponseText(JSON.stringify(data, null, 2));
      setStatusMessage(
        isZh
          ? `HTTP ${res.status} · 已返回 ${method} 载荷`
          : `HTTP ${res.status} · Received ${method} payload`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setResponseText(JSON.stringify({ error: msg }, null, 2));
      setStatusMessage(isZh ? "JSON 参数解析或请求失败" : "Invalid JSON arguments or request failed");
    } finally {
      setBusy(false);
    }
  };

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(MCP_CONFIG_SNIPPET);
      setStatusMessage(isZh ? "已复制 MCP 客户端配置 JSON" : "Copied MCP config JSON");
    } catch {
      setStatusMessage(
        isZh ? "当前浏览器剪贴板受限，请手动复制下方端点地址" : "Clipboard blocked — copy /api/mcp URL manually"
      );
    }
  };

  return (
    <section className="section container" aria-labelledby="mcp-sandbox-heading">
      <div className={styles.sandboxShell}>
        <div className={styles.sandboxHead}>
          <div>
            <span className="eyebrow">
              {isZh
                ? "MODEL CONTEXT PROTOCOL · 只读 AGENT 接入协议 (v5.6)"
                : "MODEL CONTEXT PROTOCOL · READ-ONLY AGENT ENDPOINT (v5.6)"}
            </span>
            <h2
              id="mcp-sandbox-heading"
              className="h-display h2"
              style={{ marginTop: 6 }}
            >
              {isZh
                ? "供 Cursor / Claude Code / 招聘评估 Agent 直连的 MCP 协议调试台"
                : "Stateless MCP JSON-RPC Sandbox for Coding & Hiring Agents"}
            </h2>
            <p className="prose" style={{ marginTop: 6, maxWidth: "70ch" }}>
              {isZh
                ? "外部 Agent 可直接通过 POST /api/mcp 或 GET /llms-full.txt 读取经过 Schema 校验与脱敏的设计依据、协议重放帧和停做谱系；公开检索工具严格隔离 8 项非公开案例。"
                : "External coding and evaluation agents can query POST /api/mcp or GET /llms-full.txt cleanly without scraping DOM — backed by Zod strict validation, PII scrubbing, and unlisted route isolation."}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ minHeight: 36 }}
            data-testid="mcp-copy-config-btn"
            onClick={copyConfig}
          >
            {isZh ? "复制 .cursor/mcp.json" : "Copy .cursor/mcp.json"}
          </button>
        </div>

        <div
          className={styles.toolTabs}
          role="group"
          aria-label={isZh ? "选择 MCP 只读工具" : "Select MCP read-only tool"}
        >
          {MCP_SANDBOX_PRESETS.map((preset) => (
            <button
              key={preset.tool}
              type="button"
              data-testid={`mcp-tool-${preset.tool}`}
              className={styles.toolBtn}
              aria-pressed={selectedTool === preset.tool}
              onClick={() => selectTool(preset.tool)}
            >
              {preset.label[locale]}
            </button>
          ))}
        </div>

        <p style={{ margin: 0, fontSize: 14, color: "var(--text-2)" }}>
          {activePreset.summary[locale]}
        </p>

        <div className={styles.workbenchSplit}>
          <div className={styles.paneCard}>
            <label
              htmlFor="mcp-args-textarea"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              {isZh ? "JSON-RPC tools/call 参数 (Strict Zod Schema)" : "JSON-RPC tools/call Arguments"}
            </label>
            <textarea
              id="mcp-args-textarea"
              data-testid="mcp-args-input"
              className={styles.argsTextarea}
              value={argsJson}
              onChange={(e) => setArgsJson(e.target.value)}
              spellCheck={false}
            />
            <div className={styles.actionRow}>
              <button
                type="button"
                className="btn btn-primary"
                data-testid="mcp-run-btn"
                disabled={busy}
                onClick={() => invokeRpc("tools/call")}
              >
                {busy
                  ? isZh
                    ? "调用中…"
                    : "Running…"
                  : isZh
                    ? "执行 POST /api/mcp"
                    : "Run POST /api/mcp"}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                data-testid="mcp-list-btn"
                disabled={busy}
                onClick={() => invokeRpc("tools/list")}
              >
                tools/list
              </button>
              {statusMessage && (
                <output role="status" style={{ fontSize: 12, color: "var(--text-2)" }}>
                  {statusMessage}
                </output>
              )}
            </div>
          </div>

          <div className={styles.paneCard}>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              {isZh ? "JSON-RPC 2.0 响应结果" : "JSON-RPC 2.0 Response"}
            </span>
            <pre
              className={styles.responsePre}
              data-testid="mcp-response-pre"
              tabIndex={0}
              aria-label={isZh ? "MCP JSON-RPC 响应报文" : "MCP JSON-RPC response payload"}
            >
              {responseText}
            </pre>
          </div>
        </div>

        <div className={styles.discoveryLinks}>
          <a href="/.well-known/mcp.json" target="_blank" rel="noopener noreferrer">
            GET /.well-known/mcp.json ↗
          </a>
          <a href="/llms-full.txt" target="_blank" rel="noopener noreferrer">
            GET /llms-full.txt ↗
          </a>
          <a href="/llms.txt" target="_blank" rel="noopener noreferrer">
            GET /llms.txt ↗
          </a>
        </div>
      </div>
    </section>
  );
}
