import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function AuthSkeleton() {
  return (
    <main className="flex items-center justify-center h-screen">
      <section className="flex flex-col items-center">
        <figure className="mb-4">
          <Skeleton circle width={128} height={128} />
        </figure>
        <Skeleton width={100} height={24} />
      </section>
    </main>
  );
}
