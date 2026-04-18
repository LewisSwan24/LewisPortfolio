'use client';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Camera parallax effect following mouse movement.
 */
export default function MouseParallax() {
  const sensitivity = 0.05;

  useFrame((state) => {
    const { x, y } = state.mouse;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      x * sensitivity * 10,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      y * sensitivity * 10,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
