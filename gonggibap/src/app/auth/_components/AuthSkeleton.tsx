import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function AuthSkeleton() {
  return (
    <main className="flex h-screen items-center justify-center">
      <section className="flex flex-col items-center">
        <figure className="mb-4">
          <Skeleton circle width={128} height={128} />
        </figure>
        <Skeleton width={100} height={24} />
      </section>
    </main>
  );
}
