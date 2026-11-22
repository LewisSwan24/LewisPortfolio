import { describe, expect, it, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CaseSimulatorFrame } from "@/components/case/CaseSimulatorFrame";
import { WalkieWristSim } from "@/components/case/simulators/WalkieWristSim";
import { LamplightTriageSim } from "@/components/case/simulators/LamplightTriageSim";
import { AutofillConfidenceSim } from "@/components/case/simulators/AutofillConfidenceSim";
import { MazeContactSim } from "@/components/case/simulators/MazeContactSim";
import { FencepostRevokeSim } from "@/components/case/simulators/FencepostRevokeSim";
import { ConnectIaResetSim } from "@/components/case/simulators/ConnectIaResetSim";
import { GrasslandRulesSim } from "@/components/case/simulators/GrasslandRulesSim";
import { OntheBeatHandshakeSim } from "@/components/case/simulators/OntheBeatHandshakeSim";
import { walkieCase } from "@/data/cases/walkie";

describe("CaseSimulatorFrame & Phase 3.6A Simulators", () => {
  const originalIO = globalThis.IntersectionObserver;

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    vi.restoreAllMocks();
  });

  it("renders a CLS-safe skeleton until clicked or intersected, then mounts and resets cleanly", async () => {
    const demo = walkieCase.interactiveDemo!;
    render(<CaseSimulatorFrame demo={demo} locale="en" />);

    expect(screen.getByText(demo.title.en)).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Front Key/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Load interactive prototype/i }));

    const frontKey = await screen.findByRole("button", { name: /Front Key/i });
    expect(frontKey).toBeInTheDocument();

    // Trigger a request, then click Reset to verify state resets
    fireEvent.click(screen.getByRole("button", { name: /Edit config file/i }));
    expect(screen.getByText("APPROVAL GATE")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText("WRIST IDLE")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/reset to initial state/i);
  });

  it("mounts automatically when IntersectionObserver reports intersection", async () => {
    let intersectCallback: IntersectionObserverCallback | null = null;
    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        intersectCallback = cb;
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    }
    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    const demo = walkieCase.interactiveDemo!;
    render(<CaseSimulatorFrame demo={demo} locale="en" />);
    expect(screen.queryByRole("button", { name: /Front Key/i })).not.toBeInTheDocument();

    act(() => {
      intersectCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Front Key/i })).toBeInTheDocument();
    });
  });

  it("WalkieWristSim enforces physical wrist approval, deny with spoken reason, and USB/relay switching", () => {
    const onStatus = vi.fn();
    render(<WalkieWristSim locale="en" onStatusChange={onStatus} />);

    // Idle guard when pressing Front Key before any request
    fireEvent.click(screen.getByRole("button", { name: /Front Key/i }));
    expect(onStatus).toHaveBeenLastCalledWith(expect.stringMatching(/Trigger a simulated Claude request/i));

    // Switch transport to zero-knowledge relay
    fireEvent.click(screen.getByRole("button", { name: /Zero-Knowledge Relay/i }));
    expect(screen.getByText("FLY·ADPCM")).toBeInTheDocument();

    // Trigger read-only search and approve with Front Key
    fireEvent.click(screen.getByRole("button", { name: /Read-only search/i }));
    expect(screen.getByText("APPROVAL GATE")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Front Key/i }));
    expect(screen.getByText("APPROVED · SPOKEN")).toBeInTheDocument();

    // Trigger delete command and deny via Backspace shortcut on watch column
    fireEvent.click(screen.getByRole("button", { name: /Run delete command/i }));
    const watchGroup = screen.getByRole("group", { name: /M5StickS3 wrist terminal/i });
    fireEvent.keyDown(watchGroup, { key: "Backspace" });
    expect(screen.getByText("BLOCKED AT WRIST")).toBeInTheDocument();
  });

  it("LamplightTriageSim focuses 'Not now' by default on risky steps and preserves progress on pause", () => {
    const onStatus = vi.fn();
    render(<LamplightTriageSim locale="en" onStatusChange={onStatus} />);

    // Advance step 03 (low risk)
    fireEvent.click(screen.getByRole("button", { name: /Advance next step/i }));
    expect(screen.getByText(/Organizing · 3\/5/i)).toBeInTheDocument();

    // Advance into step 04 (high risk)
    fireEvent.click(screen.getByRole("button", { name: /Advance next step/i }));
    const notNowBtn = screen.getByRole("button", { name: /Not now/i });
    expect(notNowBtn).toHaveAttribute("data-default-safe", "true");
    expect(document.activeElement).toBe(notNowBtn);

    // Inspect impact scope
    fireEvent.click(screen.getByRole("button", { name: /Inspect impact scope/i }));
    expect(screen.getByText(/Before: existing config\.json/i)).toBeInTheDocument();

    // Click Not now -> safely paused, 3/5 preserved
    fireEvent.click(notNowBtn);
    expect(screen.getByText(/Paused safely · 3\/5/i)).toBeInTheDocument();
    expect(screen.getByRole("note")).toHaveTextContent(/Completed steps and working copies remain intact/i);
  });

  it("AutofillConfidenceSim splits exact, review, and blank fields and keeps Submit human-locked", () => {
    const onStatus = vi.fn();
    render(<AutofillConfidenceSim locale="zh" onStatusChange={onStatus} />);

    const nameInput = screen.getByLabelText("姓名") as HTMLInputElement;
    expect(nameInput.value).toBe("");

    // Run local scan
    fireEvent.click(screen.getByRole("button", { name: "一键本地扫描" }));
    expect(nameInput.value).toBe("Lewis Dong");
    expect(screen.getByLabelText("期望薪资（敏感项）")).toHaveValue("");
    expect(screen.getByLabelText("开放题：为什么申请这个交互设计团队？")).toHaveValue("");

    // Try submitting while review field is unresolved
    const submitBtn = screen.getByRole("button", { name: /手动提交申请/i });
    expect(submitBtn).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(submitBtn);
    expect(onStatus).toHaveBeenLastCalledWith(expect.stringMatching(/提交锁生效/));

    // Resolve ambiguous dropdown -> allows manual human submit
    fireEvent.change(screen.getByLabelText("签证与工作权限"), {
      target: { value: "unrestricted" },
    });
    expect(submitBtn).toHaveAttribute("aria-disabled", "false");
    fireEvent.click(submitBtn);
    expect(screen.getByRole("button", { name: /已由申请人手动提交/i })).toBeInTheDocument();
  });

  it("MazeContactSim locks solo taps and moves orb on two-player co-touch or Arrow keys", () => {
    const onStatus = vi.fn();
    render(<MazeContactSim locale="en" onStatusChange={onStatus} />);

    // Solo tap shakes wristband and stays at 0 steps
    const rightBand = screen.getByRole("button", { name: /B \+ C/i });
    fireEvent.click(rightBand);
    expect(rightBand).toHaveAttribute("data-shake", "true");
    expect(onStatus).toHaveBeenLastCalledWith(expect.stringMatching(/direction locked/i));

    // Switch to Two-player co-touch and move right + down
    fireEvent.click(screen.getByRole("button", { name: /Two-player co-touch/i }));
    fireEvent.click(rightBand);
    expect(rightBand).toHaveAttribute("data-shake", "false");
    expect(onStatus).toHaveBeenLastCalledWith(expect.stringMatching(/orb moved Right to \(2, 1\)/i));

    // Arrow key shortcut also drives co-touch movement
    const board = screen.getByRole("group", { name: /5 by 5 collaborative maze grid/i });
    fireEvent.keyDown(board, { key: "ArrowDown" });
    expect(onStatus).toHaveBeenLastCalledWith(expect.stringMatching(/orb moved Down to \(2, 2\)|maze wall/i));
  });

  it("FencepostRevokeSim cuts off AI context immediately when QR grant is revoked or deleted", () => {
    const onStatus = vi.fn();
    render(<FencepostRevokeSim locale="zh" onStatusChange={onStatus} />);

    // Active share answers using EXIF-free summary
    expect(screen.getByText(/模型上下文：1 条授权记录可见/i)).toBeInTheDocument();
    expect(screen.getByText(/EXIF 元数据|桑克利夫/i)).toBeInTheDocument();

    // Revoke QR -> AI context immediately drops to 0
    fireEvent.click(screen.getByRole("button", { name: "已吊销二维码" }));
    expect(screen.getByText(/模型上下文：0 条记录/i)).toBeInTheDocument();
    expect(screen.getByText(/访问边界生效：该条记录已从查询上下文移除，模型不再可见/i)).toBeInTheDocument();

    // Re-asking any question remains blocked
    fireEvent.click(screen.getByRole("button", { name: /GPS EXIF/i }));
    expect(onStatus).toHaveBeenLastCalledWith(expect.stringMatching(/访问边界生效/));
  });

  it("ConnectIaResetSim contrasts legacy back-route dead-end against October paper-redrawn flow", () => {
    const onStatus = vi.fn();
    render(<ConnectIaResetSim locale="en" onStatusChange={onStatus} />);

    // Legacy flow: Register stays ambiguously clickable and Back hits dead-end
    fireEvent.click(screen.getByRole("button", { name: /Open event/i }));
    fireEvent.click(screen.getByRole("button", { name: "Register" }));
    expect(screen.getByRole("button", { name: /Register \(tapped 1x\?\)/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try to go back" }));
    expect(screen.getByRole("note")).toHaveTextContent(/No explicit back path/i);

    // Switch to Oct Reset IA: Enrolled locks cleanly and Back returns to Events with badge
    fireEvent.click(screen.getByRole("button", { name: /Oct Reset/i }));
    fireEvent.click(screen.getByRole("button", { name: /Open event/i }));
    fireEvent.click(screen.getByRole("button", { name: "Register" }));
    expect(screen.getByRole("button", { name: /Enrolled ✓/i })).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(screen.getByRole("button", { name: /Back to Events/i }));
    expect(screen.getByText("Enrolled ✓")).toBeInTheDocument();
  });

  it("GrasslandRulesSim validates shared command grammar across missions and restores cleanly from checkpoint", () => {
    const onStatus = vi.fn();
    render(<GrasslandRulesSim locale="en" onStatusChange={onStatus} />);

    fireEvent.click(screen.getByRole("button", { name: /M04 · Night Patrol/i }));
    fireEvent.click(screen.getByRole("button", { name: /Box-select & Scout/i }));
    expect(onStatus).toHaveBeenLastCalledWith(expect.stringMatching(/Mission 4 uses the exact same/i));

    fireEvent.click(screen.getByRole("button", { name: /Trigger failure & restore checkpoint/i }));
    expect(screen.getByText(/Restored at checkpoint/i)).toBeInTheDocument();
  });

  it("OntheBeatHandshakeSim preserves anonymity until mutual nod and then withdraws device quietly", () => {
    const onStatus = vi.fn();
    render(<OntheBeatHandshakeSim locale="zh" onStatusChange={onStatus} />);

    fireEvent.click(screen.getByRole("button", { name: /FIRST SONG\?/i }));
    expect(screen.getByText(/附近有人发出匿名脉冲/)).toBeInTheDocument();
    expect(screen.queryByText(/吧台左侧音响柱旁/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /对方手环双向点头确认/i }));
    expect(screen.getByText(/吧台左侧音响柱旁/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /收起手机 · 硬件退场/i }));
    expect(screen.getByText(/设备已静默退居二线/)).toBeInTheDocument();
  });
});
