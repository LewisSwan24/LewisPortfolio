import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import styles from './HeroScene.module.css';
import FallbackHero from './FallbackHero';

const Canvas3D = dynamic(() => import('./Canvas3D'), {
  ssr: false,
  loading: () => <FallbackHero />,
});

/**
 * HeroScene wrapper component.
 * Uses next/dynamic to load 3D scene only on client-side.
 */
export default function HeroScene() {
  // Simple check for reduced motion - would ideally be a hook context
  const isReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion) {
    return <FallbackHero />;
  }

  return (
    <div className={styles.container}>
      <Suspense fallback={<FallbackHero />}>
        <Canvas3D />
      </Suspense>
    </div>
  );
}
