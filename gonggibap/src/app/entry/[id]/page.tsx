'use client';

import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { RestaurantDetailErrorFallback } from '@/app/_components/sidebar/restaurant/detail/RestaurantDetailErrorFallback';
import { EntryPageContent } from '@/app/entry/[id]/_components//EntryPageContent';
import { FirstLoading } from '@/app/entry/[id]/_components/FirstLoading';
interface EntryPageProps {
  params: {
    id: string;
  };
}

export default function EntryPage({ params }: EntryPageProps) {
  const restaurantId = Number(params.id);
  return (
    <ErrorBoundary FallbackComponent={RestaurantDetailErrorFallback}>
      <Suspense fallback={<FirstLoading />}>
        <EntryPageContent restaurantId={restaurantId} />
      </Suspense>
    </ErrorBoundary>
  );
}
