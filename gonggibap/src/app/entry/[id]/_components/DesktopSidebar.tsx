import { Restaurant } from "@/types/restaurant";
import { ThemeToggleBtn } from "@/app/_components/ThemeToggleBtn";
import { RestaurantDetailView } from "@/app/entry/[id]/_components/RestaurantDetailView";

interface DesktopSidebarProps {
  restaurant: Restaurant;
}

export function DesktopSidebar({ restaurant }: DesktopSidebarProps) {
  return (
    <div className="flex">
      <div
        className="w-80 h-screen bg-white dark:bg-gray-700 p-4 fixed left-0 top-0 z-20 overflow-y-auto"
        role="navigation"
      >
        <RestaurantDetailView restaurant={restaurant} />
      </div>
      <ThemeToggleBtn />
    </div>
  );
}
