import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ReviewForm, ReviewList } from "@/app/_components/sidebar/review";
import { useDeleteReview, useGetReviews } from "@/apis/review";
import { QUERY_KEYS } from "@/constants/queryKeys";

type ReviewsContentProps = {
  restaurantId: number;
  currentUserId?: number;
};

export const ReviewsContent = ({ restaurantId, currentUserId }: ReviewsContentProps) => {
  const queryClient = useQueryClient();
  const { data: reviews } = useGetReviews(restaurantId);
  const deleteReviewMutation = useDeleteReview();
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const onClickWriteReview = () => setIsWriting((prev) => !prev);

  const handleDeleteReview = (reviewId: number) => {
    deleteReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.REVIEW.DETAIL(restaurantId)],
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
    <div className="flex flex-col gap-4">
      {isWriting ? (
        <ReviewForm
          restaurantId={restaurantId}
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
                currentUserId={currentUserId}
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