'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from './Skeleton';

export const DynamicImageGallery = dynamic(
  () => import('./ImageGallery').then((mod) => mod.ImageGallery),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
  }
);
