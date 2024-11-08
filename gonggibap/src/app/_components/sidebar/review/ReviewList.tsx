import { Review } from '@/types/review';

import { ReviewListItem } from './ReviewListItem';

type ReviewListProps = {
  reviews: Review[];
  currentPage: number;
  restaurantId: number;
  handleOpenForm: (mode: 'create' | 'edit', review?: Review) => void;
};

export const ReviewList = ({
  reviews,
  currentPage,
  restaurantId,
  handleOpenForm,
}: ReviewListProps) => {
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
          currentPage={currentPage}
          restaurantId={restaurantId}
          handleOpenForm={handleOpenForm}
        />
      ))}
    </ul>
  );
};
