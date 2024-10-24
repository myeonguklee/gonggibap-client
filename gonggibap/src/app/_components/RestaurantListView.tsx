import { Restaurant } from "@/types/restaurant";

type RestaurantListViewProps = {
  restaurants: Restaurant[];
  onRestaurantSelect: (restaurant: Restaurant) => void;
  selectedRestaurantId?: number;
};

export const RestaurantListView: React.FC<RestaurantListViewProps> = ({
  restaurants,
  onRestaurantSelect,
  selectedRestaurantId,
}) => {
  return (
    <div className="space-y-4">
      {restaurants.map((restaurant) => (
        <button
          key={restaurant.restaurantId}
          onClick={() => onRestaurantSelect(restaurant)}
          className={`w-full text-left p-4 rounded-lg transition-colors border dark:border-none
            ${
              selectedRestaurantId === restaurant.restaurantId
                ? "bg-gray-100 dark:bg-gray-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
        >
          <div className=" flex-between-center">
            <div className="flex-col gap-1">
              <h3 className="font-bold">
                {restaurant.restaurantName}
              </h3>
              <p className="text-sm">
                {restaurant.restaurantCategory}
              </p>
            </div>
            <div className="text-right">
              <div className="text-yellow-400">⭐{restaurant.visitCount}</div>
            </div>
          </div>

          <p className="text-gray-400 text-xs text-single-line ">
            {restaurant.restaurantRoadAddressName}
          </p>
        </button>
      ))}
    </div>
  );
};
