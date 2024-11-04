'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { EntryPageContent } from './_components/EntryPageContent';
import { MapPinLoading } from '@/app/_components/MapPinLoading';

interface EntryPageProps {
  params: {
    id: string;
  };
}

export default function EntryPage({ params }: EntryPageProps) {
  const restaurantId = Number(params.id);
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
      <Suspense 
        fallback={
          <div className="h-screen w-screen">
            <MapPinLoading />
          </div>
        }
      >
        <EntryPageContent restaurantId={restaurantId} />
      </Suspense>
    </ErrorBoundary>
  );
}