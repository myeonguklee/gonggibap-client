import { Restaurant } from '@/types/restaurant';

import {
  RestaurantCategory,
  RestaurantAddress,
  RestaurantStats,
} from '@/app/_components/sidebar/restaurant/list';

interface FavoritesRestaurantItemProps {
  restaurant: Restaurant;
  index: number;
}

export function FavoritesListItem({
  restaurant,
  index,
}: FavoritesRestaurantItemProps) {
  const handleMoveDetail = () => {
    window.location.href = `/entry/${restaurant.restaurantId}`;
  };
  return (
    <button
      onClick={handleMoveDetail}
      className="flex w-full flex-col gap-2 pb-4 pt-3 text-left">
      <div className="flex w-full flex-col gap-3">
        <h3 className="text-lg font-bold text-single-line">
          {index + 1}. {restaurant.restaurantName}
        </h3>
        <div className="flex gap-3 font-medium">
          <RestaurantCategory category={restaurant.restaurantDetailCategory} />
          <RestaurantAddress address={restaurant.restaurantAddressName} />
        </div>
        <RestaurantStats
          pointAvg={restaurant.pointAvg}
          visitCount={restaurant.visitCount}
        />
      </div>
    </button>
  );
}
