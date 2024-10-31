import { PiNavigationArrowBold } from "react-icons/pi";
import { Restaurant, RestaurantDetailCategory } from "@/types/restaurant";
import { RestaurantListView } from "@/app/_components/sidebar/restaurant/list";
import { RestaurantDetailView } from "@/app/_components/sidebar/restaurant/detail/RestaurantDetailView";
import { ThemeToggleBtn } from "@/app/_components/ThemeToggleBtn";

type DesktopSidebarProps = {
  restaurants?: Restaurant[];
  totalPages?: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
  onCurrentLocation: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectCategory: (category: RestaurantDetailCategory) => void;
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  restaurants,
  totalPages,
  selectedRestaurantId,
  onRestaurantSelect,
  onCurrentLocation,
  currentPage,
  onPageChange,
  onSelectCategory,
}) => {
  const selectedRestaurant =
    selectedRestaurantId && restaurants
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
          currentPage={currentPage}
          onPageChange={onPageChange}
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
      <button
        onClick={() => {
          onCurrentLocation();
          onRestaurantSelect(null);
          onSelectCategory(null);
        }}
        className="fixed right-4 bottom-36 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none z-10"
        aria-label="현재 위치로 이동"
      >
        <PiNavigationArrowBold className="w-6 h-6 text-[#B3B3B3] rotate-90" />
      </button>
      <ThemeToggleBtn />
    </div>
  );
};
