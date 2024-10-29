import { useState } from "react";
import { Restaurant } from "@/types/restaurant";
import { RestaurantListView } from "@/app/_components/RestaurantListView";
import { RestaurantDetailView } from "@/app/_components/RestaurantDetailView";

type DesktopSidebarProps = {
  restaurants: Restaurant[];
  totalPages: number;
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  restaurants,
  totalPages,
}) => {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  return (
    <div className="flex">
      <div
        className="w-96 h-screen bg-white dark:bg-gray-800 p-4 fixed left-0 top-0 z-20 overflow-y-auto"
        role="navigation"
      >
        <RestaurantListView
          restaurants={restaurants}
          onRestaurantSelect={setSelectedRestaurant}
          selectedRestaurantId={selectedRestaurant?.restaurantId}
          totalPages={totalPages}
        />
      </div>

      <section
        className={`w-96 h-[96%] bg-white dark:bg-gray-700 p-6 fixed left-[25rem] top-[2%] rounded-xl
          transition-transform duration-300 ease-in-out z-10 overflow-y-auto
          ${selectedRestaurant ? "translate-x-0" : "-translate-x-[25rem]"}`}
        aria-label="레스토랑 상세 정보"
        aria-hidden={!selectedRestaurant}
      >
        {selectedRestaurant && (
          <RestaurantDetailView
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        )}
      </section>
    </div>
  );
};
