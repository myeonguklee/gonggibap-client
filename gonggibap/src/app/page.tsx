'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { PageContent } from '@/app/_components/PageContent';
import { FirstLoading } from '@/app/_components/FirstLoading';
import { RestaurantDetailErrorFallback } from '@/app/_components/sidebar/restaurant/detail';

export default function Home() {
  return (
    <>
      <ErrorBoundary FallbackComponent={RestaurantDetailErrorFallback}>
        <Suspense fallback={<FirstLoading />}>
          <PageContent />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
