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
} from "three";
import type { HardwareSpecimenSlug } from "./types";

interface HardwareFieldWebGLProps {
  slug: HardwareSpecimenSlug;
  onContextLost?: () => void;
}

export function HardwareFieldWebGL({ slug, onContextLost }: HardwareFieldWebGLProps) {
  const hostRef = useRef<HTMLDivElement>(null);

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
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

    const isDark =
      document.documentElement.dataset.theme === "dark" ||
      document.documentElement.classList.contains("dark");
    const ink = new Color(isDark ? "#F4F2ED" : "#151412");
    const accent = new Color(
      slug === "walkie"
        ? isDark
          ? "#E69682"
          : "#A63F2A"
        : isDark
          ? "#92BAE0"
          : "#2B4D6F"
    );

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(2.4, 1.8, 3.2);
    camera.lookAt(0, 0, 0);

    const root = new Group();
    scene.add(root);

    const disposables: Array<{ dispose: () => void }> = [];
    const wireMat = new LineBasicMaterial({ color: ink, transparent: true, opacity: 0.72 });
    const accentMat = new MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.24 });
    const solidAccentMat = new LineBasicMaterial({ color: accent });
    disposables.push(wireMat, accentMat, solidAccentMat);

    if (slug === "walkie") {
      // M5StickS3 rectangular chassis + front approval keycap + USB/relay ring
      const bodyGeom = new BoxGeometry(1.1, 1.8, 0.42);
      const bodyWire = new EdgesGeometry(bodyGeom);
      root.add(new Mesh(bodyGeom, accentMat));
      root.add(new LineSegments(bodyWire, wireMat));

      const btnGeom = new BoxGeometry(0.46, 0.34, 0.16);
      const btnWire = new EdgesGeometry(btnGeom);
      const btnMesh = new Mesh(btnGeom, accentMat);
      btnMesh.position.set(0, -0.35, 0.24);
      const btnLines = new LineSegments(btnWire, solidAccentMat);
      btnLines.position.copy(btnMesh.position);
      root.add(btnMesh, btnLines);

      const linkGeom = new TorusGeometry(1.25, 0.015, 8, 48);
      const linkMesh = new Mesh(linkGeom, accentMat);
      linkMesh.rotation.x = Math.PI / 2.4;
      root.add(linkMesh);
      disposables.push(bodyGeom, bodyWire, btnGeom, btnWire, linkGeom);
    } else if (slug === "maze") {
      // 4-quadrant contact tray + 2 paired wristband interlock rings
      const trayGeom = new BoxGeometry(2.1, 0.2, 2.1);
      const trayWire = new EdgesGeometry(trayGeom);
      root.add(new Mesh(trayGeom, accentMat));
      root.add(new LineSegments(trayWire, wireMat));

      const ringGeom = new TorusGeometry(0.46, 0.04, 10, 32);
      const r1 = new Mesh(ringGeom, accentMat);
      r1.position.set(-0.45, 0.45, 0);
      r1.rotation.y = Math.PI / 4;
      const r2 = new Mesh(ringGeom, accentMat);
      r2.position.set(0.45, 0.45, 0);
      r2.rotation.y = -Math.PI / 4;
      root.add(r1, r2);
      disposables.push(trayGeom, trayWire, ringGeom);
    } else {
      // On The Beat: two wrist beacons + quiet RSSI proximity boundary rings
      const bandGeom = new CylinderGeometry(0.32, 0.32, 0.45, 20, 1, true);
      const bandWire = new EdgesGeometry(bandGeom);
      const leftBand = new LineSegments(bandWire, solidAccentMat);
      leftBand.position.set(-0.75, 0, 0);
      const rightBand = new LineSegments(bandWire, wireMat);
      rightBand.position.set(0.75, 0, 0);
      root.add(leftBand, rightBand);

      const pulseGeom = new TorusGeometry(1.15, 0.012, 8, 48);
      const pulse = new Mesh(pulseGeom, accentMat);
      pulse.rotation.x = Math.PI / 2;
      root.add(pulse);
      disposables.push(bandGeom, bandWire, pulseGeom);
    }

    let rafId = 0;
    const renderLoop = () => {
      root.rotation.y += 0.004;
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.cancelAnimationFrame(rafId);
      renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [slug, onContextLost]);

  return <div ref={hostRef} className="hardware-webgl-host" />;
}
