"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ThreeCapabilityState } from "./types";

export function useWebGLSupport(enabled = true): ThreeCapabilityState {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<{ supported: boolean; checked: boolean; contextLost: boolean }>({
    supported: false,
    checked: false,
    contextLost: false,
  });

  useEffect(() => {
    if (!enabled || reducedMotion || typeof document === "undefined") {
      setState({ supported: false, checked: true, contextLost: false });
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      if (!gl) {
        setState({ supported: false, checked: true, contextLost: false });
        return;
      }
      const loseExt = gl.getExtension("WEBGL_lose_context");
      void loseExt;
      setState({ supported: true, checked: true, contextLost: false });
    } catch {
      setState({ supported: false, checked: true, contextLost: false });
    }
  }, [enabled, reducedMotion]);

  return {
    supported: state.supported && !state.contextLost && !reducedMotion,
    checked: state.checked,
    contextLost: state.contextLost,
    reducedMotion,
  };
}
