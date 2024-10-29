import { Restaurant } from "@/types/restaurant";
import { RestaurantListView } from "@/app/_components/RestaurantListView";
import { RestaurantDetailView } from "@/app/_components/RestaurantDetailView";

type DesktopSidebarProps = {
  restaurants?: Restaurant[];
  totalPages?: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  restaurants,
  totalPages,
  selectedRestaurantId,
  onRestaurantSelect,
}) => {
  const selectedRestaurant = selectedRestaurantId && restaurants
    ? restaurants.find((r) => r.restaurantId === selectedRestaurantId)
    : null;

  return (
    <div className="flex">
      <div
        className="w-80 h-screen bg-white dark:bg-gray-800 p-4 fixed left-0 top-0 z-20 overflow-y-auto"
        role="navigation"
      >
        <RestaurantListView
          restaurants={restaurants}
          totalPages={totalPages}
          onRestaurantSelect={onRestaurantSelect}
          selectedRestaurantId={selectedRestaurantId}
        />
      </div>

      <section
        className={`w-96 h-[96%] bg-white dark:bg-gray-700 p-4 fixed left-[21rem] top-[2%] rounded-xl
          transition-transform duration-300 ease-in-out z-10 overflow-y-auto
          ${selectedRestaurantId ? "translate-x-0" : "-translate-x-[25rem]"}`}
        aria-label="레스토랑 상세 정보"
        aria-hidden={!selectedRestaurantId}
      >
        {selectedRestaurant && (
          <RestaurantDetailView
            restaurant={selectedRestaurant}
            onClose={() => onRestaurantSelect(null)}
          />
        )}
      </section>
    </div>
  );
};
