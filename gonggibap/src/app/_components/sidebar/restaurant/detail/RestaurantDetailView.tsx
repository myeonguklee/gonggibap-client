import { useState } from "react";
import { Restaurant } from "@/types/restaurant";
import { useAuthStore } from "@/store/useAuthStore";
import { RestaurantHeader, RestaurantInfo } from "@/app/_components/sidebar/restaurant/detail";
import { ReviewImages } from "@/app/_components/sidebar/review";
import { useGetReviews } from "@/apis/review";
import { ReviewsContent } from "@/app/_components/sidebar/review";
import { HistoryContent } from "@/app/_components/sidebar/history";

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
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 ${
            activeTab === "reviews"
              ? "border-b-2 border-[#FF7058] text-[#FF7058]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          리뷰
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "history"
              ? "border-b-2 border-[#FF7058] text-[#FF7058]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          사용내역
        </button>
      </div>

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