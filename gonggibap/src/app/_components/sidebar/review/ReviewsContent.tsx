import { useState } from 'react';

import { Review } from '@/types/review';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import { Pagination } from '@/app/_components/Pagination';
import { ReviewForm, ReviewList } from '@/app/_components/sidebar/review';

import { useGetReviews } from '@/apis/review';

interface ReviewFormMode {
  isOpen: boolean;
  mode: 'create' | 'edit';
  review?: Review;
}

interface ReviewsContentProps {
  restaurantId: number;
  onMoveNav: () => void;
}

export const ReviewsContent = ({
  restaurantId,
  onMoveNav,
}: ReviewsContentProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formState, setFormState] = useState<ReviewFormMode>({
    isOpen: false,
    mode: 'create',
  });

  const { data: reviews, isLoading } = useGetReviews(restaurantId, currentPage);

  const handleReviewPageChange = (page: number) => {
    setCurrentPage(page);
    onMoveNav();
  };

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

  if (isLoading) {
    return <MapPinLoading />;
  }

  return (
    <div className="flex flex-col gap-4">
      {formState.isOpen ? (
        <ReviewForm
          restaurantId={restaurantId}
          onClickWriteReview={handleCloseForm}
          currentPage={currentPage}
          mode={formState.mode}
          review={formState.review}
        />
      ) : (
        <>
          <div className="flex-between-center">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-[#FF7058]">리뷰</h1>
              <h2 className="translate-y-0.5 font-bold text-gray-500">
                {reviews?.content?.length}개
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
              <ReviewList
                reviews={reviews.content}
                currentPage={currentPage}
                restaurantId={restaurantId}
                handleOpenForm={handleOpenForm}
              />
            )}

            {reviews && reviews.content.length > 0 && (
              <nav>
                <Pagination
                  totalPages={reviews.totalPages}
                  currentPage={currentPage}
                  onPageChange={handleReviewPageChange}
                />
              </nav>
            )}
          </div>
        </>
      )}
    </div>
  );
};
