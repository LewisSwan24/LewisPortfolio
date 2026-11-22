import dynamic from "next/dynamic";
import { createElement, type ComponentType } from "react";
import type { CaseSimulatorId } from "@/lib/cases/schema";
import type { SimulatorProps } from "./types";

function SimulatorChunkLoading() {
  return createElement(
    "div",
    { className: "case-sim-skeleton-inner", "aria-busy": true },
    createElement("div", {
      className: "case-sim-skeleton-bar case-sim-skeleton-bar--wide",
      "aria-hidden": true,
    }),
    createElement(
      "div",
      { className: "case-sim-skeleton-grid", "aria-hidden": true },
      createElement("div", { className: "case-sim-skeleton-block" }),
      createElement("div", { className: "case-sim-skeleton-block" })
    )
  );
}

const MazeContactSim = dynamic<SimulatorProps>(
  () => import("./MazeContactSim").then((mod) => mod.MazeContactSim),
  { ssr: false, loading: SimulatorChunkLoading }
);

const WalkieWristSim = dynamic<SimulatorProps>(
  () => import("./WalkieWristSim").then((mod) => mod.WalkieWristSim),
  { ssr: false, loading: SimulatorChunkLoading }
);

const LamplightTriageSim = dynamic<SimulatorProps>(
  () => import("./LamplightTriageSim").then((mod) => mod.LamplightTriageSim),
  { ssr: false, loading: SimulatorChunkLoading }
);

const AutofillConfidenceSim = dynamic<SimulatorProps>(
  () => import("./AutofillConfidenceSim").then((mod) => mod.AutofillConfidenceSim),
  { ssr: false, loading: SimulatorChunkLoading }
);

const FencepostRevokeSim = dynamic<SimulatorProps>(
  () => import("./FencepostRevokeSim").then((mod) => mod.FencepostRevokeSim),
  { ssr: false, loading: SimulatorChunkLoading }
);

const ConnectIaResetSim = dynamic<SimulatorProps>(
  () => import("./ConnectIaResetSim").then((mod) => mod.ConnectIaResetSim),
  { ssr: false, loading: SimulatorChunkLoading }
);

const GrasslandRulesSim = dynamic<SimulatorProps>(
  () => import("./GrasslandRulesSim").then((mod) => mod.GrasslandRulesSim),
  { ssr: false, loading: SimulatorChunkLoading }
);

const OntheBeatHandshakeSim = dynamic<SimulatorProps>(
  () => import("./OntheBeatHandshakeSim").then((mod) => mod.OntheBeatHandshakeSim),
  { ssr: false, loading: SimulatorChunkLoading }
);

const SIMULATOR_REGISTRY: Record<CaseSimulatorId, ComponentType<SimulatorProps>> = {
  "maze-contact": MazeContactSim,
  "walkie-wrist": WalkieWristSim,
  "lamplight-triage": LamplightTriageSim,
  "autofill-confidence": AutofillConfidenceSim,
  "fencepost-revoke": FencepostRevokeSim,
  "connect-ia-reset": ConnectIaResetSim,
  "grassland-rules": GrasslandRulesSim,
  "onthebeat-handshake": OntheBeatHandshakeSim,
};

export function getSimulatorComponent(
  id: CaseSimulatorId
): ComponentType<SimulatorProps> | undefined {
  return SIMULATOR_REGISTRY[id];
}
