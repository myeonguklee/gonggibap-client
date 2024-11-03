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
        className="w-80 h-screen flex flex-col gap-5 bg-white dark:bg-gray-700 p-4 fixed left-0 top-0 z-20 overflow-y-auto"
        role="navigation">
        {children}
        <RestaurantDetailView restaurant={restaurant} />
      </div>
      <ThemeToggleBtn />
    </div>
  );
}
