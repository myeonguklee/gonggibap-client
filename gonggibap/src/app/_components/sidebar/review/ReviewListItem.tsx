import { Review } from '@/types/review';

import { useAuthStore } from '@/store/useAuthStore';

import { StarRating, ReviewImages } from '@/app/_components/sidebar/review';

import { getRelativeTime } from '@/utils/getRelativeTime';

type ReviewListItemProps = {
  review: Review;
  onDeleteReview: (reviewId: number) => void;
  isDeleting: boolean;
};

export const ReviewListItem = ({
  review,
  onDeleteReview,
  isDeleting,
}: ReviewListItemProps) => {

  const auth = useAuthStore();

  return (
    <li className="flex flex-col gap-1 border-b pb-4 dark:border-gray-500">
      <div className="flex items-center gap-2">
        <p className="text-lg font-bold">{review.userName}</p>
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
        <div className="flex items-center gap-2">
          <StarRating rating={review.point} />
          <div className="text-xs text-gray-500">
            {getRelativeTime(review.date)}
          </div>
        </div>
        {review.userId === auth.userInfo?.userId && (
          <button
            onClick={() => onDeleteReview(review.reviewId)}
            disabled={isDeleting}
            className={`rounded-xl bg-gray-200 px-2 py-1 text-xs${
              isDeleting ? 'cursor-not-allowed opacity-50' : ''
            }`}
            aria-label="리뷰 삭제">
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
