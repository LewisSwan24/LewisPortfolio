'use client';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import GeometricShapes from './GeometricShapes';
import MouseParallax from './MouseParallax';
import HeroContent from './HeroContent';

/**
 * Main 3D Canvas container.
 */
export default function Canvas3D() {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <ParticleField />
        <GeometricShapes />
        <MouseParallax />
      </Canvas>
      <HeroContent />
    </>
  );
}
