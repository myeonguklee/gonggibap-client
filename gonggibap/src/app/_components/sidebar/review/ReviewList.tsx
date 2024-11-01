import { Review } from "@/types/review";
import { ReviewListItem } from "./ReviewListItem";

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
        <ReviewListItem
          key={review.reviewId}
          review={review}
          currentUserId={currentUserId}
          onDeleteReview={onDeleteReview}
          isDeleting={isDeleting}
        />
      ))}
    </ul>
  );
};
