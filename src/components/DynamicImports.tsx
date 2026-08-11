'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from './Skeleton';

// Dynamically import heavy components

export const DynamicSearchModal = dynamic(
  () => import('./SearchModal').then((mod) => mod.SearchModal),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
  }
);

export const DynamicKeyboardShortcutsModal = dynamic(
  () => import('./KeyboardShortcutsModal').then((mod) => mod.KeyboardShortcutsModal),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,
  }
);

export const DynamicCustomCursor = dynamic(
  () => import('./CustomCursor').then((mod) => mod.CustomCursor),
  {
    ssr: false,
  }
);

export const DynamicImageGallery = dynamic(
  () => import('./ImageGallery').then((mod) => mod.ImageGallery),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
  }
);

export const DynamicSkillsVisualization = dynamic(
  () => import('./SkillsVisualization').then((mod) => mod.SkillsRadar),
  {
    loading: () => <Skeleton className="h-48 w-full" />,
    ssr: false,
  }
);

export const DynamicCountUp = dynamic(
  () => import('./effects/CountUp').then((mod) => mod.CountUp),
  {
    ssr: false,
  }
);

interface DynamicWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function DynamicWrapper({ children, fallback }: DynamicWrapperProps) {
  return (
    <Suspense fallback={fallback || <Skeleton className="h-32 w-full" />}>
      {children}
    </Suspense>
  );
}
