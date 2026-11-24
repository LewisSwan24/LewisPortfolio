"use client";

import { useEffect, useState } from "react";
import styles from "./replay.module.css";

interface SerialPortLike {
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  readable?: ReadableStream<Uint8Array>;
}

export function WebSerialProbePanel({ locale }: { locale: "en" | "zh" }) {
  const isZh = locale === "zh";
  const [supported, setSupported] = useState(false);
  const [connected, setConnected] = useState(false);
  const [logLines, setLogLines] = useState<string[]>([]);

  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && "serial" in navigator);
  }, []);

  const handleConnect = async () => {
    if (!supported) return;
    try {
      const serial = (
        navigator as unknown as {
          serial: { requestPort: () => Promise<SerialPortLike> };
        }
      ).serial;
      const port = await serial.requestPort();
      await port.open({ baudRate: 115200 });
      setConnected(true);
      setLogLines((prev) => [
        ...prev,
        isZh
          ? "[115200 baud] 已建立只读 Web Serial 监听（仅接收硬件打印帧，绝不写入或烧录）。"
          : "[115200 baud] Read-only Web Serial monitor attached (zero write/flash frames).",
      ]);

      if (port.readable) {
        const reader = port.readable.getReader();
        const decoder = new TextDecoder();
        const { value } = await reader.read();
        if (value) {
          setLogLines((prev) => [...prev.slice(-4), decoder.decode(value).trim()]);
        }
        reader.releaseLock();
      }
      await port.close();
      setConnected(false);
    } catch {
      setConnected(false);
      setLogLines((prev) => [
        ...prev.slice(-4),
        isZh
          ? "未选择实体串口设备或权限已取消，保持确定性离线波形回放模式。"
          : "No hardware port selected or permission dismissed — staying in deterministic replay mode.",
      ]);
    }
  };

  return (
    <section
      className={styles.serialPanel}
      aria-label={isZh ? "渐进式只读 Web Serial 硬件探针" : "Progressive read-only Web Serial hardware probe"}
      data-testid="web-serial-probe"
    >
      <div className={styles.serialHead}>
        <div>
          <span className={styles.eyebrow}>
            {isZh ? "渐进增强 · 只读 Web Serial 探针" : "Progressive Enhancement · Read-Only Web Serial Probe"}
          </span>
          <h3 className={styles.stageTitle} style={{ fontSize: 17 }}>
            {isZh ? "连接真机串口监听（可选）" : "Optional Live Hardware Serial Sniffer"}
          </h3>
        </div>
        <button
          type="button"
          className="btn btn-ghost"
          disabled={!supported || connected}
          data-testid="web-serial-connect-btn"
          onClick={() => void handleConnect()}
        >
          {!supported
            ? isZh
              ? "当前浏览器不支持 Web Serial"
              : "Web Serial unsupported here"
            : connected
              ? isZh
                ? "监听串口中..."
                : "Listening..."
              : isZh
                ? "只读连接 115200 波特率串口 →"
                : "Attach Read-Only Serial (115200) →"}
        </button>
      </div>

      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--text-2)" }}>
        {supported
          ? isZh
            ? "检测到浏览器支持 Web Serial API。插入已烧录 Walkie 或 MazeRunners 固件的设备后，可只读捕获实时帧并对照上方时序；未插设备时始终提供安全离线重放。"
            : "Web Serial API detected. Plug in an M5StickS3 or Arduino Mega running Walkie/MazeRunners firmware to inspect live read-only frames alongside the deterministic timeline."
          : isZh
            ? "当前运行环境（如 Firefox / Safari / 无头浏览器）未启用 Web Serial API。页面已安全降级，上方全部字节帧、波形与故障注入均为 100% 确定性本地重放。"
            : "Web Serial API is unavailable in this browser/context (e.g., Firefox, Safari, or headless CI). The studio gracefully stays in 100% deterministic offline replay mode."}
      </p>

      <pre className={styles.serialLog} data-testid="web-serial-log">
        {logLines.length > 0
          ? logLines.join("\n")
          : isZh
            ? "// 待命：仅在用户主动授权串口设备后开启只读监听。"
            : "// Standby: read-only monitor activates solely upon explicit user port selection."}
      </pre>
    </section>
  );
}
