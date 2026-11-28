import { describe, expect, it, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SpecimenAxisCanvas } from "@/components/three/SpecimenAxisCanvas";
import { SPECIMEN_NODES } from "@/components/three/specimens";
import { HardwareFieldCanvas } from "@/components/three/HardwareFieldCanvas";

describe("Three.js Specimen Kernel & Silent Fallback", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders 0ms SVG specimen axes and 6 keyboard-navigable nodes when WebGL is disabled", () => {
    const getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, "getContext")
      .mockReturnValue(null);

    render(<SpecimenAxisCanvas locale="en" nodes={SPECIMEN_NODES} />);

    expect(screen.getByRole("region", { name: /Chart of the 6 cases/i })).toBeInTheDocument();
    expect(screen.getByTestId("specimen-svg-baseline")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button", { name: /Select specimen/i });
    expect(buttons).toHaveLength(6);

    fireEvent.click(screen.getByRole("button", { name: /Select specimen: On The Beat/i }));
    expect(screen.getByTestId("specimen-active-title")).toHaveTextContent("On The Beat");
    expect(screen.getByTestId("specimen-active-question")).toHaveTextContent(/music|social|step back/i);
    expect(getContextSpy).toHaveBeenCalled();
  });

  it("renders Chinese annotations and falls back cleanly on HardwareFieldCanvas without WebGL", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const { rerender } = render(<HardwareFieldCanvas slug="walkie" locale="zh" />);
    expect(screen.getByTestId("hardware-field-svg")).toBeInTheDocument();
    expect(screen.getByText(/实体双键/)).toBeInTheDocument();

    rerender(<HardwareFieldCanvas slug="maze" locale="en" />);
    expect(screen.getByTestId("hardware-field-svg")).toBeInTheDocument();
    expect(screen.getByText(/shared colour/i)).toBeInTheDocument();

    rerender(<HardwareFieldCanvas slug="onthebeat" locale="en" />);
    expect(screen.getByTestId("hardware-field-svg")).toBeInTheDocument();
    expect(screen.getByText(/proximity/i)).toBeInTheDocument();
  });
});
