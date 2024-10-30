import { CircleUserRound, Trash2 } from "lucide-react";
import { Review } from "@/types/review";
import { ReviewImages } from "@/app/_components/sidebar/review";

type ReviewListProps = {
  reviews: Review[];
  currentUserId?: number;
  onDeleteReview: (reviewId: number) => void;
  isDeleting: boolean;
};

export const ReviewList = ({ reviews, currentUserId, onDeleteReview, isDeleting }: ReviewListProps) => {
  if (reviews.length === 0) {
    return <p className="text-center">작성된 리뷰가 없습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li
          key={review.reviewId}
          className="flex flex-col gap-1 p-3 dark:bg-gray-700 md:dark:bg-gray-800 rounded-lg border dark:border-none"
        >
          <div className="flex-between">
            <div className="flex-center gap-1">
              <CircleUserRound />
              <p className="font-bold">{review.userName}</p>
            </div>
            <p className="text-yellow-400">{"⭐".repeat(Math.round(review.point))}</p>
          </div>

          {review.imageUrls.length > 0 && (
            <ReviewImages imageUrls={review.imageUrls} />
          )}

          <p className="text-sm">{review.content}</p>
          <div className="flex-between-center">
            <time className="text-xs text-gray-400 block">{review.date}</time>

            {review.userId === currentUserId && (
              <button
                onClick={() => onDeleteReview(review.reviewId)}
                disabled={isDeleting}
                className={`${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="리뷰 삭제"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};