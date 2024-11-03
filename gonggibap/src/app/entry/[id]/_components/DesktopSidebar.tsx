
import { Restaurant } from '@/types/restaurant';

import { ThemeToggleBtn } from '@/app/_components/ThemeToggleBtn';
import { RestaurantDetailView } from '@/app/entry/[id]/_components/RestaurantDetailView';

interface DesktopSidebarProps {
  restaurant: Restaurant;
  children?: React.ReactNode;
}

export function DesktopSidebar({ restaurant, children }: DesktopSidebarProps) {
  return (
    <div className="flex">
      <div
        className="fixed left-0 top-0 z-20 flex h-screen w-80 flex-col gap-5 overflow-y-auto bg-white p-4 dark:bg-gray-700"
        role="navigation">
        {children}
        <RestaurantDetailView restaurant={restaurant} />
      </div>
      <ThemeToggleBtn />
    </div>
  );
}
