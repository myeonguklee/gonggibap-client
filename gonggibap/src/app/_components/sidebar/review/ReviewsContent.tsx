import { useState } from 'react';

import { ReviewForm, ReviewList } from '@/app/_components/sidebar/review';

import { useGetReviews } from '@/apis/review';

type ReviewsContentProps = {
  restaurantId: number;
};

export const ReviewsContent = ({ restaurantId }: ReviewsContentProps) => {
  const { data: reviews } = useGetReviews(restaurantId);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const onClickWriteReview = () => setIsWriting((prev) => !prev);

  return (
    <div className="flex flex-col gap-4">
      {isWriting ? (
        <ReviewForm
          restaurantId={restaurantId}
          onClickWriteReview={onClickWriteReview}
        />
      ) : (
        <>
          <div className="flex-between-center flex">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black">리뷰</h1>
              <h2 className="translate-y-1 font-bold text-gray-500">
                {reviews?.length}개
              </h2>
            </div>
            <button
              onClick={onClickWriteReview}
              className="rounded-lg bg-[#FF7058] p-2 text-right text-white">
              리뷰 작성
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {reviews && (
              <ReviewList
                reviews={reviews}
                restaurantId={restaurantId}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
