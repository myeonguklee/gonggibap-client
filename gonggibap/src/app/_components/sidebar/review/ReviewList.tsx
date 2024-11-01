import { Review } from "@/types/review";
import { ReviewImages, StarRating } from "@/app/_components/sidebar/review";
import { getRelativeTime } from "@/utils/getRelativeTime";
import { FaRegCircleXmark } from "react-icons/fa6";
type ReviewListProps = {
  reviews: Review[];
  currentUserId?: number;
  onDeleteReview: (reviewId: number) => void;
  isDeleting: boolean;
};

export const ReviewList = ({
  reviews,
  currentUserId,
  onDeleteReview,
  isDeleting,
}: ReviewListProps) => {
  if (reviews.length === 0) {
    return <p className="text-center">작성된 리뷰가 없습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li
          key={review.reviewId}
          className="flex flex-col gap-1 dark:bg-gray-700 md:dark:bg-gray-800 rounded-lg border-b dark:border-none"
        >
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

          <div className="flex gap-2 items-center">
            <StarRating rating={review.point} />
            <div className="text-xs text-gray-500">
              {getRelativeTime(review.date)}
            </div>
          </div>

          <p className="text-sm">{review.content}</p>
          {review.imageUrls.length > 0 && (
            <ReviewImages imageUrls={review.imageUrls} />
          )}

          <div className="">
            {review.userId === currentUserId && (
              <button
                onClick={() => onDeleteReview(review.reviewId)}
                disabled={isDeleting}
                className={`${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="리뷰 삭제"
              >
                <FaRegCircleXmark size={16} />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
