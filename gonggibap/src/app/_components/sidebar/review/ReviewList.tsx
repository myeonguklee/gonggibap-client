import { Review } from '@/types/review';

import { ReviewListItem } from './ReviewListItem';

type ReviewListProps = {
  reviews: Review[];
  restaurantId: number;
};

export const ReviewList = ({ reviews, restaurantId }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <p className="my-10 text-center text-gray-500">작성된 리뷰가 없습니다.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <ReviewListItem
          key={review.reviewId}
          review={review}
          restaurantId={restaurantId}
        />
      ))}
    </ul>
  );
};
