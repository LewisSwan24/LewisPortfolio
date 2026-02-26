'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

/**
 * AutoThemeSwitch - Automatically switches theme based on local time
 * Switches to dark mode between 6 PM and 6 AM
 */
export function AutoThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Check if user has manually set a preference
    const hasManualPreference = localStorage.getItem('theme-manual');
    if (hasManualPreference) return;

    const checkTimeAndSetTheme = () => {
      const hour = new Date().getHours();
      // Dark mode from 6 PM (18) to 6 AM (6)
      const shouldBeDark = hour >= 18 || hour < 6;
      
      if (shouldBeDark && resolvedTheme !== 'dark') {
        setTheme('dark');
      } else if (!shouldBeDark && resolvedTheme !== 'light') {
        setTheme('light');
      }
    };

    // Check immediately
    checkTimeAndSetTheme();

    // Check every minute
    const interval = setInterval(checkTimeAndSetTheme, 60000);

    return () => clearInterval(interval);
  }, [setTheme, resolvedTheme]);

  return null;
}
