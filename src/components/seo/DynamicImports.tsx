'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

// Dynamically import heavy components

export const DynamicSearchModal = dynamic(
  () => import('@/components/navigation/SearchModal').then((mod) => mod.SearchModal),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
  }
);

export const DynamicKeyboardShortcutsModal = dynamic(
  () => import('@/components/providers/KeyboardShortcutsModal').then((mod) => mod.KeyboardShortcutsModal),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,
  }
);

export const DynamicCustomCursor = dynamic(
  () => import('@/components/effects/CustomCursor').then((mod) => mod.CustomCursor),
  {
    ssr: false,
  }
);

export const DynamicImageGallery = dynamic(
  () => import('@/components/content/ImageGallery').then((mod) => mod.ImageGallery),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
  }
);

interface SkillItem {
  name: string;
  level: number;
  category?: "design" | "research" | "technical" | "soft";
}

interface DynamicSkillsProps {
  skills: SkillItem[];
  className?: string;
  size?: number;
  showLabels?: boolean;
}

export const DynamicSkillsVisualization = dynamic<DynamicSkillsProps>(
  () => import('@/components/seo/SkillsVisualization').then((mod) => mod.SkillsRadar),
  {
    loading: () => <Skeleton className="h-48 w-full" />,
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
