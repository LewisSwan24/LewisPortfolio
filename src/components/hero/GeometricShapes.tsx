'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

/**
 * Geometric shapes rotating in the scene.
 */
export default function GeometricShapes() {
  const icoRef = useRef<Mesh>(null!);
  const torusRef = useRef<Mesh>(null!);
  const octRef = useRef<Mesh>(null!);

  useFrame(() => {
    icoRef.current.rotation.x += 0.01;
    torusRef.current.rotation.y += 0.005;
    octRef.current.rotation.z += 0.008;
  });

  return (
    <>
      <mesh ref={icoRef} position={[-2, 1, 0]}>
        <icosahedronGeometry args={[0.5]} />
        <meshBasicMaterial wireframe color="#3b82f6" />
      </mesh>
      <mesh ref={torusRef} position={[2, -1, 0]}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshBasicMaterial wireframe color="#ef4444" />
      </mesh>
      <mesh ref={octRef} position={[0, -2, 1]}>
        <octahedronGeometry args={[0.4]} />
        <meshBasicMaterial wireframe color="#10b981" />
      </mesh>
    </>
  );
}
