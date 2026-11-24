"use client";

import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  Group,
  LineSegments,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  CylinderGeometry,
  WebGLRenderer,
  type Object3D,
} from "three";
import type { HardwareTwinRenderState, HardwareZoneId } from "@/lib/replay/hardware-twin-map";
import type { HardwareSpecimenSlug } from "./types";

interface HardwareFieldWebGLProps {
  slug: HardwareSpecimenSlug;
  twinState?: HardwareTwinRenderState;
  onContextLost?: () => void;
  onContextRestored?: () => void;
}

interface ZoneVisualRig {
  group: Group;
  meshMats: MeshBasicMaterial[];
  lineMats: LineBasicMaterial[];
  baseScale: number;
}

export function HardwareFieldWebGL({
  slug,
  twinState,
  onContextLost,
  onContextRestored,
}: HardwareFieldWebGLProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const twinStateRef = useRef<HardwareTwinRenderState | undefined>(twinState);
  const renderOnceRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    twinStateRef.current = twinState;
    renderOnceRef.current?.();
  }, [twinState]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = Math.max(host.clientWidth || 360, 240);
    const height = Math.max(host.clientHeight || 220, 180);

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      onContextLost?.();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      onContextLost?.();
    };
    const handleContextRestored = () => {
      onContextRestored?.();
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", handleContextRestored);

    const isDark =
      document.documentElement.dataset.theme === "dark" ||
      document.documentElement.classList.contains("dark");
    const ink = new Color(isDark ? "#F4F2ED" : "#151412");
    const nominalAccent = new Color(
      slug === "walkie"
        ? isDark
          ? "#E69682"
          : "#A63F2A"
        : isDark
          ? "#92BAE0"
          : "#2B4D6F"
    );
    const faultAccent = new Color(isDark ? "#F07B68" : "#C43D2D");
    const recoveredAccent = new Color(isDark ? "#67C496" : "#226F4C");

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(2.4, 1.8, 3.2);
    camera.lookAt(0, 0, 0);

    const root = new Group();
    scene.add(root);

    const disposables: Array<{ dispose: () => void }> = [];
    const zoneRigs = new Map<HardwareZoneId, ZoneVisualRig>();

    const makeZoneRig = (zoneId: HardwareZoneId, baseScale = 1): ZoneVisualRig => {
      const group = new Group();
      root.add(group);
      const rig: ZoneVisualRig = { group, meshMats: [], lineMats: [], baseScale };
      zoneRigs.set(zoneId, rig);
      return rig;
    };

    const addPart = (
      rig: ZoneVisualRig,
      meshOrLine: Object3D,
      meshMat?: MeshBasicMaterial,
      lineMat?: LineBasicMaterial
    ) => {
      rig.group.add(meshOrLine);
      if (meshMat) {
        rig.meshMats.push(meshMat);
        disposables.push(meshMat);
      }
      if (lineMat) {
        rig.lineMats.push(lineMat);
        disposables.push(lineMat);
      }
    };

    if (slug === "walkie") {
      const chassisRig = makeZoneRig("chassis", 1);
      const bodyGeom = new BoxGeometry(1.1, 1.8, 0.42);
      const bodyWire = new EdgesGeometry(bodyGeom);
      const cMeshMat = new MeshBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.22 });
      const cLineMat = new LineBasicMaterial({ color: ink, transparent: true, opacity: 0.72 });
      addPart(chassisRig, new Mesh(bodyGeom, cMeshMat), cMeshMat);
      addPart(chassisRig, new LineSegments(bodyWire, cLineMat), undefined, cLineMat);

      const keyRig = makeZoneRig("front-key", 1);
      const btnGeom = new BoxGeometry(0.46, 0.34, 0.16);
      const btnWire = new EdgesGeometry(btnGeom);
      const kMeshMat = new MeshBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.32 });
      const kLineMat = new LineBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.92 });
      const btnMesh = new Mesh(btnGeom, kMeshMat);
      btnMesh.position.set(0, -0.35, 0.24);
      const btnLines = new LineSegments(btnWire, kLineMat);
      btnLines.position.copy(btnMesh.position);
      addPart(keyRig, btnMesh, kMeshMat);
      addPart(keyRig, btnLines, undefined, kLineMat);

      const relayRig = makeZoneRig("usb-relay", 1);
      const linkGeom = new TorusGeometry(1.25, 0.02, 8, 48);
      const rMeshMat = new MeshBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.28 });
      const linkMesh = new Mesh(linkGeom, rMeshMat);
      linkMesh.rotation.x = Math.PI / 2.4;
      addPart(relayRig, linkMesh, rMeshMat);

      disposables.push(bodyGeom, bodyWire, btnGeom, btnWire, linkGeom);
    } else if (slug === "maze") {
      const trayRig = makeZoneRig("tray", 1);
      const trayGeom = new BoxGeometry(2.1, 0.2, 2.1);
      const trayWire = new EdgesGeometry(trayGeom);
      const tMeshMat = new MeshBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.22 });
      const tLineMat = new LineBasicMaterial({ color: ink, transparent: true, opacity: 0.72 });
      addPart(trayRig, new Mesh(trayGeom, tMeshMat), tMeshMat);
      addPart(trayRig, new LineSegments(trayWire, tLineMat), undefined, tLineMat);

      const bandARig = makeZoneRig("wristband-a", 1);
      const bandBRig = makeZoneRig("wristband-b", 1);
      const ringGeom = new TorusGeometry(0.46, 0.045, 10, 32);
      const aMat = new MeshBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.3 });
      const bMat = new MeshBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.24 });
      const r1 = new Mesh(ringGeom, aMat);
      r1.position.set(-0.48, 0.45, 0);
      r1.rotation.y = Math.PI / 4;
      const r2 = new Mesh(ringGeom, bMat);
      r2.position.set(0.48, 0.45, 0);
      r2.rotation.y = -Math.PI / 4;
      addPart(bandARig, r1, aMat);
      addPart(bandBRig, r2, bMat);

      const irRig = makeZoneRig("ir-gate", 1);
      const irGeom = new CylinderGeometry(0.06, 0.06, 0.9, 12);
      const irWire = new EdgesGeometry(irGeom);
      const irMat = new MeshBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.35 });
      const irLineMat = new LineBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.9 });
      const irMesh = new Mesh(irGeom, irMat);
      irMesh.position.set(0, 0.55, 0.78);
      const irLines = new LineSegments(irWire, irLineMat);
      irLines.position.copy(irMesh.position);
      addPart(irRig, irMesh, irMat);
      addPart(irRig, irLines, undefined, irLineMat);

      disposables.push(trayGeom, trayWire, ringGeom, irGeom, irWire);
    } else {
      const bandGeom = new CylinderGeometry(0.32, 0.32, 0.45, 20, 1, true);
      const bandWire = new EdgesGeometry(bandGeom);

      const bandARig = makeZoneRig("band-a", 1);
      const aLineMat = new LineBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.88 });
      const leftBand = new LineSegments(bandWire, aLineMat);
      leftBand.position.set(-0.75, 0, 0);
      addPart(bandARig, leftBand, undefined, aLineMat);

      const bandBRig = makeZoneRig("band-b", 1);
      const bLineMat = new LineBasicMaterial({ color: ink, transparent: true, opacity: 0.72 });
      const rightBand = new LineSegments(bandWire, bLineMat);
      rightBand.position.set(0.75, 0, 0);
      addPart(bandBRig, rightBand, undefined, bLineMat);

      const rssiRig = makeZoneRig("rssi-ring", 1);
      const pulseGeom = new TorusGeometry(1.15, 0.018, 8, 48);
      const pMat = new MeshBasicMaterial({ color: nominalAccent, transparent: true, opacity: 0.28 });
      const pulse = new Mesh(pulseGeom, pMat);
      pulse.rotation.x = Math.PI / 2;
      addPart(rssiRig, pulse, pMat);

      disposables.push(bandGeom, bandWire, pulseGeom);
    }

    const applyTwinHighlights = () => {
      const st = twinStateRef.current;
      if (!st) return;

      const stateColor =
        st.faultState === "fault"
          ? faultAccent
          : st.faultState === "recovered"
            ? recoveredAccent
            : nominalAccent;
      const pulseScale = 1 + Math.max(0, Math.min(1, st.signalLevel / 100)) * 0.08;

      for (const [zoneId, rig] of zoneRigs.entries()) {
        const isActive = zoneId === st.activeZoneId;
        rig.group.scale.setScalar(isActive ? rig.baseScale * pulseScale : rig.baseScale * 0.98);
        for (const mat of rig.meshMats) {
          mat.color.copy(isActive ? stateColor : nominalAccent);
          mat.opacity = isActive ? 0.56 : 0.12;
        }
        for (const lMat of rig.lineMats) {
          lMat.color.copy(isActive ? stateColor : ink);
          lMat.opacity = isActive ? 1 : 0.34;
        }
      }
    };

    const renderFrame = () => {
      applyTwinHighlights();
      renderer.render(scene, camera);
    };
    renderOnceRef.current = renderFrame;

    let rafId = 0;
    const renderLoop = () => {
      const reduced = twinStateRef.current?.reducedMotion ?? false;
      if (!reduced) {
        root.rotation.y += 0.004;
      }
      renderFrame();
      if (!reduced) {
        rafId = window.requestAnimationFrame(renderLoop);
      }
    };
    renderLoop();

    return () => {
      renderOnceRef.current = null;
      window.cancelAnimationFrame(rafId);
      renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", handleContextRestored);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [slug, onContextLost, onContextRestored]);

  return <div ref={hostRef} className="hardware-webgl-host" data-testid="hardware-twin-webgl" />;
}
