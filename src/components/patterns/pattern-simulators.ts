import type { ComponentType } from "react";
import type { CaseSimulatorId } from "@/lib/cases/schema";
import type { SimulatorProps } from "@/components/case/simulators/types";
import { AutofillConfidenceSim } from "@/components/case/simulators/AutofillConfidenceSim";
import { ConnectIaResetSim } from "@/components/case/simulators/ConnectIaResetSim";
import { FencepostRevokeSim } from "@/components/case/simulators/FencepostRevokeSim";
import { GrasslandRulesSim } from "@/components/case/simulators/GrasslandRulesSim";
import { LamplightTriageSim } from "@/components/case/simulators/LamplightTriageSim";
import { MazeContactSim } from "@/components/case/simulators/MazeContactSim";
import { OntheBeatHandshakeSim } from "@/components/case/simulators/OntheBeatHandshakeSim";
import { WalkieWristSim } from "@/components/case/simulators/WalkieWristSim";

/**
 * /patterns shows a live sandbox in its first screen, so it imports the
 * simulators directly instead of through the lazy case registry. The registry's
 * `ssr: false` widgets sent a 232px loading box and swapped in the ~687px widget
 * after hydration, which on a slow device landed mid-scroll (v48, CLS 0.316 in
 * CI run 45813420189). A lazy import rendered on the server would also suspend
 * and stream the workbench in late. Case pages keep the lazy registry: they
 * mount their simulator on demand.
 */
const PATTERN_SIMULATORS: Record<CaseSimulatorId, ComponentType<SimulatorProps>> = {
  "maze-contact": MazeContactSim,
  "walkie-wrist": WalkieWristSim,
  "lamplight-triage": LamplightTriageSim,
  "autofill-confidence": AutofillConfidenceSim,
  "fencepost-revoke": FencepostRevokeSim,
  "connect-ia-reset": ConnectIaResetSim,
  "grassland-rules": GrasslandRulesSim,
  "onthebeat-handshake": OntheBeatHandshakeSim,
};

export function getPatternSimulator(id: CaseSimulatorId): ComponentType<SimulatorProps> | undefined {
  return PATTERN_SIMULATORS[id];
}
