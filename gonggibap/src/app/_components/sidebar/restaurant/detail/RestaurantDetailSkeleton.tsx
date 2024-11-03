import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const RestaurantDetailSkeleton = () => {
  return (
    <article className="flex flex-col gap-5 px-4">
      {/* Header Skeleton */}
      <header className="flex-between-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6">
            <Skeleton circle width={24} height={24} />
          </div>
          <div className="flex items-center gap-2">
            <h1>
              <Skeleton width={180} height={32} />
            </h1>
            <div className="flex-shrink-0">
              <Skeleton width={60} />
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Info Skeleton */}
      <section className="flex flex-col gap-4">
        {/* Public Office Name */}
        <div className="inline-block">
          <Skeleton width={100} height={20} borderRadius={12} />
        </div>

        {/* Address & Phone */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Skeleton circle width={20} height={20} />
            <Skeleton width={120} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton circle width={20} height={20} />
            <Skeleton width={120} />
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="flex gap-1 items-center">
            <Skeleton width={30} />
            <Skeleton width={30} />
          </div>
          <div className="flex gap-1 items-center">
            <Skeleton width={40} />
            <Skeleton width={30} />
          </div>
        </div>

        {/* Favorite Button */}
        <Skeleton height={48} borderRadius={12} />
      </section>

      {/* Image Skeleton */}
      <div className="relative w-full">
        <Skeleton height={180} borderRadius={12} />
      </div>

      {/* Tab Navigation Skeleton */}
      <div className="flex w-full border-b-2 border-gray-200">
        <div className="flex-1 px-4 py-2">
          <Skeleton width={40} />
        </div>
        <div className="flex-1 px-4 py-2">
          <Skeleton width={100} />
        </div>
      </div>

      {/* Tab Content Skeleton */}
      <section className="flex flex-col gap-3">
        {[1, 2, 3].map((index) => (
          <Skeleton key={index} height={100} borderRadius={8} />
        ))}
      </section>
    </article>
  );
};
