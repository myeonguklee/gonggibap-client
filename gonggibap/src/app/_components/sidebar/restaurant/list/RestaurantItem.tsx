import { Restaurant } from "@/types/restaurant";
import {
  RestaurantCategory,
  RestaurantAddress,
  RestaurantStats,
} from "@/app/_components/sidebar/restaurant/list";

interface RestaurantItemProps {
  restaurant: Restaurant;
  index: number;
  isSelected: boolean;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export const RestaurantItem = ({
  restaurant,
  index,
  isSelected,
  onRestaurantSelect,
}: RestaurantItemProps) => (
  <button
    onClick={() => onRestaurantSelect(restaurant)}
    className={`w-full text-left flex flex-col gap-2 p-4 rounded-lg transition-colors dark:bg-gray-700 border dark:border-none
${
  isSelected
    ? "bg-gray-100 dark:bg-gray-900"
    : "hover:bg-gray-100 dark:hover:bg-gray-900"
}`}
  >
    <div className="w-full flex flex-col gap-2">
      <h3 className="font-bold text-single-line">
        {index + 1}. {restaurant.restaurantName}
      </h3>
      <div className="flex gap-3">
        <RestaurantCategory
          category={restaurant.restaurantDetailCategory || ""}
        />
        <RestaurantAddress address={restaurant.restaurantRoadAddressName} />
      </div>
      <RestaurantStats
        publicOfficeName={restaurant.publicOfficeName}
        pointAvg={restaurant.pointAvg}
        visitCount={restaurant.visitCount}
      />
    </div>
  </button>
);
