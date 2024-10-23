import { useState } from "react";
import { Restaurant } from "@/types/sidebar";
import { RestaurantListView } from "@/app/_components/RestaurantListView";
import { RestaurantDetailView } from "@/app/_components/RestaurantDetailView";

type DesktopSidebarProps = {
  restaurants: Restaurant[];
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  return (
    <div className="flex">
      <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed left-0 top-0 z-20 overflow-y-auto">
        <RestaurantListView
          restaurants={restaurants}
          onRestaurantSelect={setSelectedRestaurant}
          selectedRestaurantId={selectedRestaurant?.id}
        />
      </div>

      <div
        className={`w-80 h-screen bg-gray-700 text-white p-6 fixed left-64 top-0 
          transition-transform duration-300 ease-in-out z-10 overflow-y-auto
          ${selectedRestaurant ? "translate-x-0" : "-translate-x-full"}`}
      >
        {selectedRestaurant && (
          <RestaurantDetailView
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
            isMobile={false}
          />
        )}
      </div>
    </div>
  );
};