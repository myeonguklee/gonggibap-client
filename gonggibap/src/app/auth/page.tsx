import { Suspense } from 'react';
import { AuthContent } from '@/app/auth/_components/AuthContent';
import { AuthSkeleton } from '@/app/auth/_components/AuthSkeleton';

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <AuthContent />
    </Suspense>
  );
}
