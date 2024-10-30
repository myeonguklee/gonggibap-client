import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Restaurant } from "@/types/restaurant";
import { useAuthStore } from "@/store/useAuthStore";
import { RestaurantHeader, RestaurantInfo } from "@/app/_components/sidebar/restaurant/detail";
import { ReviewForm, ReviewList, ReviewImages } from "@/app/_components/sidebar/review";
import { useDeleteReview, useGetReviews } from "@/apis/review";
import { QUERY_KEYS } from "@/constants/queryKeys";

type RestaurantDetailViewProps = {
  restaurant: Restaurant;
  onClose?: () => void;
  onBack?: () => void;
};

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurant,
  onClose,
  onBack,
}) => {
  const auth = useAuthStore();
  const queryClient = useQueryClient();
  const { data: reviews } = useGetReviews(restaurant.restaurantId);
  const deleteReviewMutation = useDeleteReview();
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const onClickWriteReview = () => setIsWriting((prev) => !prev);

  const handleDeleteReview = (reviewId: number) => {
    deleteReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.REVIEW.DETAIL(restaurant.restaurantId)],
        });
        toast.success("리뷰가 삭제되었습니다.");
      },
      onError: (error) => {
        toast.error("리뷰 삭제에 실패했습니다.");
        console.error(error);
      },
    });
  };

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

      {isWriting ? (
        <ReviewForm
          restaurantId={restaurant.restaurantId}
          onClickWriteReview={onClickWriteReview}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={onClickWriteReview}
              className="p-2 rounded-lg text-white bg-[#FF7058] text-right dark:bg-gray-700 md:dark:bg-gray-800"
            >
              리뷰 작성
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">리뷰</h3>
            {reviews && (
              <ReviewList
                reviews={reviews}
                currentUserId={auth.userInfo?.id}
                onDeleteReview={handleDeleteReview}
                isDeleting={deleteReviewMutation.isPending}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};