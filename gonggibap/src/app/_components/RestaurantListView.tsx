import { Restaurant } from '@/types/sidebar';

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
          key={restaurant.id}
          onClick={() => onRestaurantSelect(restaurant)}
          className={`w-full text-left p-4 rounded-lg transition-colors
            ${
              selectedRestaurantId === restaurant.id
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700"
            }`}
        >
          <div className="flex-between-center">
            <div>
              <h3 className="font-bold">{restaurant.name}</h3>
              <p className="text-sm text-gray-300">{restaurant.category}</p>
            </div>
            <div className="text-right">
              <div className="text-yellow-400">
                {"⭐".repeat(restaurant.rating)}
              </div>
              <p className="text-sm text-gray-300">{restaurant.distance}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};