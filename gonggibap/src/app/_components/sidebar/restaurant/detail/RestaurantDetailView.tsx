import { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import {
  RestaurantHeader,
  RestaurantInfo,
  RestaurantTapNavigation,
} from "@/app/_components/sidebar/restaurant/detail";
import { ReviewsContent } from "@/app/_components/sidebar/review";
import { HistoryContent } from "@/app/_components/sidebar/history";
import { useGetRestaurant } from "@/apis/restaurant/useGetRestaurant";

type RestaurantDetailViewProps = {
  restaurantId: number;
  onClose?: () => void;
  onBack?: () => void;
};

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurantId,
  onClose,
  onBack,
}) => {
  const auth = useAuthStore();
  const { data: restaurant } = useGetRestaurant(restaurantId);
  const [activeTab, setActiveTab] = useState("reviews");

  const tabs = [
    { id: "reviews", label: "리뷰" },
    { id: "history", label: "공공기관 사용내역" },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (!restaurant) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 px-4">
      <RestaurantHeader
        restaurantName={restaurant.restaurantName}
        restaurantDetailCategory={restaurant.restaurantDetailCategory}
        onClose={onClose}
        onBack={onBack}
      />

      <RestaurantInfo restaurant={restaurant} />
      <div className="relative w-full h-[300px] md:h-[180px]">
        <Image
          src={restaurant.restaurantImage}
          alt={`${restaurant.restaurantName} 이미지`}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* 탭 네비게이션 */}
      <RestaurantTapNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* 탭 컨텐츠 */}
      <div>
        {activeTab === "reviews" ? (
          <ReviewsContent
            restaurantId={restaurant.restaurantId}
            currentUserId={auth.userInfo?.id}
          />
        ) : (
          <HistoryContent restaurantId={restaurant.restaurantId} />
        )}
      </div>
    </div>
  );
};
