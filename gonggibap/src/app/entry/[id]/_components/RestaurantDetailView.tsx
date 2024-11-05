import Image from 'next/image';

import { Restaurant } from '@/types/restaurant';

import { RestaurantInfo } from '@/app/_components/sidebar/restaurant/detail';
import { ReviewsContent } from '@/app/_components/sidebar/review';

interface RestaurantDetailViewProps {
  restaurant: Restaurant;
}

export function RestaurantDetailView({
  restaurant,
}: RestaurantDetailViewProps) {
  return (
    <div className="flex flex-col gap-5 px-4">
      <div className="flex items-end gap-2">
        <h1 className="text-2xl font-black">{restaurant.restaurantName}</h1>
        {restaurant.restaurantDetailCategory && (
          <h2 className="font-bold text-gray-500">
            {restaurant.restaurantDetailCategory}
          </h2>
        )}
      </div>

      <RestaurantInfo restaurant={restaurant} />

      <div className="relative h-[300px] w-full md:h-[180px]">
        <Image
          src={restaurant.restaurantImage}
          alt={`${restaurant.restaurantName} 이미지`}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div>
        <ReviewsContent restaurantId={restaurant.restaurantId} />
      </div>
    </div>
  );
}
