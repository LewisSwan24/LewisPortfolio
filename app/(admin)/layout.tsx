'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import styles from '@/styles/admin/layout.module.css';

/**
 * Admin Layout for the CMS dashboard.
 * Includes sidebar navigation and top bar.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/login');
        return;
      }
      if (user.user_metadata?.role !== 'ADMIN') {
        router.push('/');
        return;
      }
      setLoading(false);
    };
    checkUser();
  }, [router, supabase]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <h1>Portfolio CMS</h1>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/posts">Posts</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/analytics">Analytics</a></li>
            <li><a href="/settings">Settings</a></li>
          </ul>
        </nav>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <div>Admin Panel</div>
          <button onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
          }}>Logout</button>
        </header>
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
