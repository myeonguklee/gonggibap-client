import { Review } from "@/types/review";
import { StarRating, ReviewImages } from "@/app/_components/sidebar/review";
import { getRelativeTime } from "@/utils/getRelativeTime";

type ReviewListItemProps = {
  review: Review;
  currentUserId?: number;
  onDeleteReview: (reviewId: number) => void;
  isDeleting: boolean;
};

export const ReviewListItem = ({
  review,
  currentUserId,
  onDeleteReview,
  isDeleting,
}: ReviewListItemProps) => {
  return (
    <li className="flex flex-col pb-4 gap-1 border-b dark:border-gray-500">
      <div className="flex items-center gap-2">
        <p className="font-bold text-lg">{review.userName}</p>
        <div className="flex gap-1 text-xs font-semibold">
          <p className="text-gray-500">리뷰</p>
          <p>{review.userReviewCount}</p>
        </div>
        <div className="flex gap-1 text-xs font-semibold">
          <p className="text-gray-500">평균별점</p>
          <p>{review.userReviewAvg}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <StarRating rating={review.point} />
          <div className="text-xs text-gray-500">
            {getRelativeTime(review.date)}
          </div>
        </div>
        {review.userId === currentUserId && (
          <button
            onClick={() => onDeleteReview(review.reviewId)}
            disabled={isDeleting}
            className={`text-xs bg-gray-200 px-2 py-1 rounded-xl${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="리뷰 삭제"
          >
            삭제
          </button>
        )}
      </div>

      <p className="text-sm">{review.content}</p>
      {review.imageUrls.length > 0 && (
        <ReviewImages imageUrls={review.imageUrls} />
      )}
    </li>
  );
};
