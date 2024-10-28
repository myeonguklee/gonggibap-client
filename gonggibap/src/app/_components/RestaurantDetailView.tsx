// components/RestaurantDetailView.tsx
import { useState } from "react";
import Image from "next/image";
import { Trash2, Footprints, Star, MapPin, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Restaurant } from "@/types/restaurant";
import { useAuthStore } from "@/store/useAuthStore";
import { ReviewForm } from "@/app/_components/ReviewForm";
import { useDeleteReview, useGetReviews } from "@/apis/review";
import { QUERY_KEYS } from "@/constants/queryKeys";

type RestaurantDetailViewProps = {
  restaurant: Restaurant;
  onClose?: () => void; // 웹 닫기 버튼
  onBack?: () => void; // 모바일 뒤로가기 버튼
};

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurant,
  onClose,
  onBack,
}) => {
  const auth = useAuthStore();
  const queryClient = useQueryClient();
  const { data: reviews } = useGetReviews(restaurant.restaurantId);
  const deleteReviewMutation = useDeleteReview();
  const [isWriting, setIsWriting] = useState<boolean>(false);

  const onClickWriteReview = () => setIsWriting((prev) => !prev);

  const onDeleteReview = (reviewId: number) => {
    deleteReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.REVIEW.DETAIL(restaurant.restaurantId)],
        });
        toast.success("리뷰가 삭제되었습니다.");
      },
      onError: (error) => {
        toast.error("리뷰 삭제에 실패했습니다.");
        console.error(error);
      },
    });
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex-between-center">
          <h2 className="text-xl font-bold">{restaurant.restaurantName}</h2>
          <button
            onClick={onClose}
            className="hidden md:block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600"
            aria-label="닫기"
          >
            ✕
          </button>
          <button
            onClick={onBack}
            className="block md:hidden px-2 py-1 text-sm rounded dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border dark:border-none"
            aria-label="뒤로 가기"
          >
            X
          </button>
        </div>
        {/* <dl className="flex flex-col gap-4"> */}
        <dl className="flex flex-col gap-2">
          <div className="flex gap-4">
            <dt className="sr-only">음식점 평점</dt>
            <dd className="flex items-center gap-1 text-yellow-400">
              <Star size="1rem" />
              {restaurant.pointAvg ? restaurant.pointAvg : "-"}
            </dd>

            <dt className="sr-only">방문 횟수</dt>
            <dd className="flex items-center gap-1 text-[#FF9A00]">
              <Footprints size="1rem" /> {restaurant.visitCount}
            </dd>
          </div>
          <div>
            <dt className="sr-only">주소</dt>
            <dd className="flex items-center gap-1">
              <MapPin size="1rem" /> {restaurant.restaurantRoadAddressName}
            </dd>
          </div>
          <div>
            <dt className="sr-only">전화번호</dt>
            <dd className="flex items-center gap-1">
              <Phone size="1rem" /> {restaurant.phone}
            </dd>
          </div>
          <div>
            <dt className="sr-only">상세정보 웹사이트</dt>
            <dd className="flex gap-1">
              <Image
                src="/images/kakaomap.png"
                alt="카카오맵"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </dd>
          </div>
        </dl>
      </div>

      {isWriting ? (
        <div>
          <ReviewForm
            restaurantId={restaurant.restaurantId}
            onClickWriteReview={onClickWriteReview}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={onClickWriteReview}
              className="p-2 rounded-lg text-white bg-[#FF7058] text-right
            dark:bg-gray-700 md:dark:bg-gray-800"
            >
              리뷰 작성
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">리뷰</h3>
            {reviews?.length ? (
              <ul className="flex flex-col gap-4">
                {reviews.map((review) => (
                  <li
                    key={review.reviewId}
                    className="flex flex-col gap-1 p-3 dark:bg-gray-700 md:dark:bg-gray-800 rounded-lg border dark:border-none"
                  >
                    <div className="flex-between">
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-yellow-400">
                        {"⭐".repeat(Math.round(review.point))}
                      </p>
                    </div>

                    {review.imageUrls && (
                      <div className="flex gap-2">
                        {review.imageUrls.map((url) => (
                          <img
                            key={url}
                            src={url}
                            alt="리뷰 이미지"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-sm">{review.content}</p>
                    <time className="text-xs text-gray-400 block">
                      {review.date}
                    </time>

                    {review.userId === auth.userInfo?.id && (
                      <div>
                        <button
                          onClick={() => onDeleteReview(review.reviewId)}
                          disabled={deleteReviewMutation.isPending}
                          className={`${
                            deleteReviewMutation.isPending
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          aria-label="리뷰 삭제"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">작성된 리뷰가 없습니다.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
