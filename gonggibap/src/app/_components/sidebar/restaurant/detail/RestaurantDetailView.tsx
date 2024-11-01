import { useState } from "react";
import { Restaurant } from "@/types/restaurant";
import { useAuthStore } from "@/store/useAuthStore";
import { RestaurantHeader, RestaurantInfo, TapNavigation } from "@/app/_components/sidebar/restaurant/detail";
import { ReviewImages } from "@/app/_components/sidebar/review";
import { ReviewsContent } from "@/app/_components/sidebar/review";
import { HistoryContent } from "@/app/_components/sidebar/history";
import { useGetReviews } from "@/apis/review";

type RestaurantDetailViewProps = {
  restaurant: Restaurant;
  onClose?: () => void;
  onBack?: () => void;
};

type TabType = "reviews" | "history";

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurant,
  onClose,
  onBack,
}) => {
  const auth = useAuthStore();
  const { data: reviews } = useGetReviews(restaurant.restaurantId);
  const [activeTab, setActiveTab] = useState<TabType>("reviews");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  }

  return (
    <div className="flex flex-col gap-5">
      <RestaurantHeader
        restaurantName={restaurant.restaurantName}
        onClose={onClose}
        onBack={onBack}
      />

      {reviews && reviews.length > 0 && reviews[0].imageUrls.length > 0 && (
        <ReviewImages imageUrls={[reviews[0].imageUrls[0]]} />
      )}

      <RestaurantInfo restaurant={restaurant} />

      {/* 탭 네비게이션 */}
      <TapNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 탭 컨텐츠 */}
      <div>
        {activeTab === "reviews" ? (
          <ReviewsContent 
            restaurantId={restaurant.restaurantId}
            currentUserId={auth.userInfo?.id}
          />
        ) : (
          <HistoryContent 
            restaurantId={restaurant.restaurantId}
          />
        )}
      </div>
    </div>
  );
};