'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Particle field with 200 floating points and connections.
 */
export default function ParticleField() {
  const count = 200;
  const pointsGeoRef = useRef<THREE.BufferGeometry>(null!);
  const linesGeoRef = useRef<THREE.BufferGeometry>(null!);

  const initialPositions = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 10;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, [count]);

  const currentPositions = useRef(new Float32Array(initialPositions));
  const linePositions = useRef(new Float32Array(count * count * 6));

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pos = currentPositions.current;

    // Animate point positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 1] = initialPositions[i3 + 1] + Math.sin(t * 0.5 + initialPositions[i3]) * 0.5;
    }

    // Update points geometry
    if (pointsGeoRef.current) {
      const attr = pointsGeoRef.current.getAttribute('position') as THREE.BufferAttribute;
      if (attr) {
        (attr.array as Float32Array).set(pos);
        attr.needsUpdate = true;
      }
    }

    // Update lines based on updated point positions
    const lp = linePositions.current;
    let idx = 0;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 2) {
          lp[idx++] = pos[i3];
          lp[idx++] = pos[i3 + 1];
          lp[idx++] = pos[i3 + 2];
          lp[idx++] = pos[j3];
          lp[idx++] = pos[j3 + 1];
          lp[idx++] = pos[j3 + 2];
        }
      }
    }

    if (linesGeoRef.current) {
      const lineAttr = linesGeoRef.current.getAttribute('position') as THREE.BufferAttribute;
      if (lineAttr) {
        lineAttr.needsUpdate = true;
      }
      linesGeoRef.current.setDrawRange(0, idx / 3);
    }
  });

  return (
    <>
      <points>
        <bufferGeometry ref={pointsGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[currentPositions.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#888" transparent opacity={0.6} />
      </points>
      <lineSegments>
        <bufferGeometry ref={linesGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions.current, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#555" transparent opacity={0.2} />
      </lineSegments>
    </>
  );
}
