import styles from './FallbackHero.module.css';

/**
 * Fallback component for SSR or disabled 3D/Reduced motion.
 */
export default function FallbackHero() {
  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <h1>Developer Portfolio</h1>
    </div>
  );
}
