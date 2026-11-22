"use client";

import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  Color,
  EdgesGeometry,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  RingGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
  BufferGeometry,
} from "three";
import { SPECIMEN_NODES } from "./specimens";
import type { SpecimenNodeSpec } from "./types";

interface SpecimenAxisWebGLProps {
  activeSlug: SpecimenNodeSpec["slug"];
  onSelect: (slug: SpecimenNodeSpec["slug"]) => void;
  onContextLost?: () => void;
}

export function SpecimenAxisWebGL({
  activeSlug,
  onSelect,
  onContextLost,
}: SpecimenAxisWebGLProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeSlugRef = useRef(activeSlug);
  activeSlugRef.current = activeSlug;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = Math.max(host.clientWidth || 560, 280);
    const height = Math.max(host.clientHeight || 340, 220);

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

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(2.8, 2.0, 3.8);
    camera.lookAt(0, 0, 0);

    const root = new Group();
    scene.add(root);

    const disposables: Array<{ dispose: () => void }> = [];

    // Drafting instrument box frame & 3 orthogonal axes
    const axisColor = new Color(isDark ? "#726F67" : "#6E675C");
    const subtleColor = new Color(isDark ? "#33322E" : "#D6D1C6");

    const frameGeom = new EdgesGeometry(new BoxGeometry(2.2, 2.2, 2.2));
    const frameMat = new LineBasicMaterial({ color: subtleColor, transparent: true, opacity: 0.45 });
    const frameLines = new LineSegments(frameGeom, frameMat);
    root.add(frameLines);
    disposables.push(frameGeom, frameMat);

    const axisPairs: Array<[Vector3, Vector3]> = [
      [new Vector3(-1.35, 0, 0), new Vector3(1.35, 0, 0)],
      [new Vector3(0, -1.35, 0), new Vector3(0, 1.35, 0)],
      [new Vector3(0, 0, -1.35), new Vector3(0, 0, 1.35)],
    ];
    for (const [start, end] of axisPairs) {
      const g = new BufferGeometry().setFromPoints([start, end]);
      const m = new LineBasicMaterial({ color: axisColor, transparent: true, opacity: 0.72 });
      root.add(new Line(g, m));
      disposables.push(g, m);
    }

    const activeRingGeom = new RingGeometry(0.14, 0.17, 24);
    const activeRingMat = new MeshBasicMaterial({
      color: new Color(isDark ? "#F4F2ED" : "#151412"),
      side: 2,
    });
    const activeRing = new Mesh(activeRingGeom, activeRingMat);
    root.add(activeRing);
    disposables.push(activeRingGeom, activeRingMat);

    const nodeEntries = SPECIMEN_NODES.map((node) => {
      const geom = new OctahedronGeometry(0.11, 0);
      const wireGeom = new EdgesGeometry(geom);
      const hex = isDark ? node.colorDark : node.colorLight;
      const mat = new MeshBasicMaterial({ color: new Color(hex), transparent: true, opacity: 0.92 });
      const wireMat = new LineBasicMaterial({ color: new Color(isDark ? "#F4F2ED" : "#151412") });
      const mesh = new Mesh(geom, mat);
      const wire = new LineSegments(wireGeom, wireMat);
      mesh.add(wire);
      mesh.position.set(node.axisCoords[0], node.axisCoords[1], node.axisCoords[2]);
      root.add(mesh);
      disposables.push(geom, wireGeom, mat, wireMat);
      return { node, mesh, mat };
    });

    // Pointer rotation + resize observation
    let dragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = -0.38;
    let rotX = 0.22;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      rotY += (e.clientX - prevX) * 0.008;
      rotX = Math.max(-0.85, Math.min(0.85, rotX + (e.clientY - prevY) * 0.006));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            const w = Math.max(host.clientWidth || 560, 280);
            const h = Math.max(host.clientHeight || 340, 220);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
          })
        : null;
    resizeObserver?.observe(host);

    let rafId = 0;
    const renderLoop = () => {
      if (!dragging) {
        rotY += 0.0022;
      }
      root.rotation.y = rotY;
      root.rotation.x = rotX;

      const currentSlug = activeSlugRef.current;
      for (const entry of nodeEntries) {
        const isActive = entry.node.slug === currentSlug;
        const targetScale = isActive ? 1.45 : 0.92;
        entry.mesh.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.14);
        entry.mat.opacity = isActive ? 1.0 : 0.68;
        if (isActive) {
          activeRing.position.copy(entry.mesh.position);
          activeRing.lookAt(camera.position);
        }
      }

      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(renderLoop);
    };
    renderLoop();

    void onSelect;

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onContextLost, onSelect]);

  return <div ref={hostRef} className="specimen-webgl-host" />;
}
