import { useState } from 'react';

import { ReviewForm, ReviewList } from '@/app/_components/sidebar/review';

import { useGetReviews } from '@/apis/review';
import { Review } from '@/types/review';

interface ReviewFormMode {
  isOpen: boolean;
  mode: 'create' | 'edit';
  review?: Review;
}

interface ReviewsContentProps {
  restaurantId: number;
};

export const ReviewsContent = ({ restaurantId }: ReviewsContentProps) => {
  const { data: reviews } = useGetReviews(restaurantId);
  const [formState, setFormState] = useState<ReviewFormMode>({
    isOpen: false,
    mode: 'create',

  });
  const handleOpenForm = (mode: 'create' | 'edit', review?: Review) => {
    setFormState({
      isOpen: true,
      mode,
      review,
    });
  };

  const handleCloseForm = () => {
    setFormState({
      isOpen: false,
      mode: 'create',
    });
  };
  return (
    <div className="flex flex-col gap-4">
      {formState.isOpen ? (
        <ReviewForm
          restaurantId={restaurantId}
          onClickWriteReview={handleCloseForm}
          mode={formState.mode}
          review={formState.review}
        />

      ) : (
        <>
          <div className="flex flex-between-center">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-[#FF7058]">리뷰</h1>
              <h2 className="translate-y-0.5 font-bold text-gray-500">
                {reviews?.length}개
              </h2>
            </div>
            <button
              onClick={() => handleOpenForm('create')}
              className="rounded-lg bg-[#FF7058] p-2 text-right text-white">
              작성
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {reviews && (
              <ReviewList reviews={reviews} restaurantId={restaurantId} handleOpenForm={handleOpenForm} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
