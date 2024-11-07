import { Suspense } from 'react';

import { Restaurant } from '@/types/restaurant';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import { RestaurantDetailView } from '@/app/_components/sidebar/restaurant/detail';
import { ThemeToggleBtn } from '@/app/_components/ThemeToggleBtn';

interface DesktopSidebarProps {
  restaurant: Restaurant;
  children?: React.ReactNode;
}

export function DesktopSidebar({ restaurant, children }: DesktopSidebarProps) {
  return (
    <div className="flex">
      <div
        className="fixed left-0 top-0 z-20 flex h-screen w-96 flex-col gap-5 overflow-y-auto bg-white p-4 dark:bg-gray-700"
        role="navigation">
        {children}
        <Suspense fallback={<MapPinLoading />}>
          <RestaurantDetailView restaurantId={restaurant.restaurantId} />
        </Suspense>
      </div>
      <ThemeToggleBtn />
    </div>
  );
}
