import Image from "next/image";
import { Restaurant } from "@/types/restaurant";
import { useAuthStore } from "@/store/useAuthStore";
import { ReviewsContent } from "@/app/_components/sidebar/review";
import { RestaurantInfo } from "@/app/_components/sidebar/restaurant/detail";

interface RestaurantDetailViewProps {
  restaurant: Restaurant;
}

export function RestaurantDetailView({
  restaurant,
}: RestaurantDetailViewProps) {
  const auth = useAuthStore();

  return (
    <div className="flex flex-col gap-5 px-4">
      <div className="flex items-end gap-2">
        <h1 className="text-2xl font-black">{restaurant.restaurantName}</h1>
        {restaurant.restaurantDetailCategory && (
          <h2 className="text-gray-500 font-bold">
            {restaurant.restaurantDetailCategory}
          </h2>
        )}
      </div>

      <RestaurantInfo restaurant={restaurant} />

      <div className="relative w-full h-[300px] md:h-[180px]">
        <Image
          src={restaurant.restaurantImage}
          alt={`${restaurant.restaurantName} 이미지`}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div>
        <ReviewsContent
          restaurantId={restaurant.restaurantId}
          currentUserId={auth.userInfo?.id}
        />
      </div>
    </div>
  );
}
