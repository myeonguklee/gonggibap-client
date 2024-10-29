import { useState } from "react";
import Image from "next/image";
import {
  Trash2,
  Footprints,
  Star,
  MapPin,
  Phone,
  CircleUserRound,
  Coffee,
  Utensils,
  ChevronLeft,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Restaurant } from "@/types/restaurant";
import { useAuthStore } from "@/store/useAuthStore";
import { ReviewForm } from "@/app/_components/ReviewForm";
import { useDeleteReview, useGetReviews } from "@/apis/review";
import { QUERY_KEYS } from "@/constants/queryKeys";

type RestaurantDetailViewProps = {
  restaurant: Restaurant;
  onClose?: () => void;
  onBack?: () => void;
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

  const handleDeleteReview = (reviewId: number) => {
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

  const handleMoveToKakaoMap = () => {
    window.open(`https://place.map.kakao.com/${restaurant.restaurantLink}`);
  };

  const renderImages = (imageUrls: string[]) => {
    switch (imageUrls.length) {
      case 1:
        return (
          <div className="h-48">
            <img
              src={imageUrls[0]}
              alt="리뷰 이미지"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        );
      case 2:
        return (
          <div className="flex gap-2 h-48">
            {imageUrls.map((url) => (
              <img
                key={url}
                src={url}
                alt="리뷰 이미지"
                className="w-1/2 h-full object-cover rounded-lg"
              />
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 gap-2 h-48">
            <img
              src={imageUrls[0]}
              alt="리뷰 이미지"
              className="h-full w-full object-cover rounded-lg"
            />
            <div className="grid grid-rows-2 gap-2 h-full">
              <img
                src={imageUrls[1]}
                alt="리뷰 이미지"
                className="w-full h-full object-cover rounded-lg"
              />
              <img
                src={imageUrls[2]}
                alt="리뷰 이미지"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-2 h-48">
            {imageUrls.map((url) => (
              <img
                key={url}
                src={url}
                alt="리뷰 이미지"
                className="w-full h-full object-cover rounded-lg"
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* 식당 정보 */}
      <div className="flex flex-col gap-2">
        <div className="hidden md:block">
          <div className="flex-between-center">
            <button
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-600"
              aria-label="닫기"
            >
              <ChevronLeft size="1.5rem" />
            </button>
            <h2 className="text-xl font-bold">{restaurant.restaurantName}</h2>

            <button
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-600"
              aria-label="닫기"
            >
              <X size="1.5rem" />
            </button>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex-between-center">
            <button
              onClick={onBack}
              className="rounded dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              aria-label="뒤로 가기"
            >
              <ChevronLeft size="1.5rem" />
            </button>
            <h2 className="text-xl font-bold">{restaurant.restaurantName}</h2>

            <button
              onClick={onBack}
              className="rounded dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              aria-label="뒤로 가기"
            >
              <X size="1.5rem" />
            </button>
          </div>
        </div>
      </div>
      <dl className="flex flex-col gap-2">
        {/* 관련 구청, 평점, 방문 횟수 */}
        <div className="flex items-center gap-5">
          <dt className="sr-only">관련 구청</dt>
          <dd className=""># {restaurant.publicOfficeName}</dd>

          <dt className="sr-only">음식점 평점</dt>
          <dd className="flex items-center gap-1 text-yellow-400">
            <Star size="1rem" />
            {restaurant.pointAvg ? restaurant.pointAvg.toFixed(1) : "-"}
          </dd>

          <dt className="sr-only">방문 횟수</dt>
          <dd className="flex items-center gap-1 text-[#FF9A00]">
            <Footprints size="1rem" /> {restaurant.visitCount}
          </dd>
        </div>
        {/* 카테고리 */}
        <div>
          <dt className="sr-only">카테고리</dt>
          <dd className="flex items-center gap-1">
            {restaurant.restaurantDetailCategory === "카페" ? (
              <Coffee size="1rem" />
            ) : (
              <Utensils size="1rem" />
            )}
            {restaurant.restaurantCategory}
          </dd>
        </div>
        {/* 주소 */}
        <div>
          <dt className="sr-only">주소</dt>
          <dd className="flex items-center gap-1">
            <MapPin size="1rem" /> {restaurant.restaurantRoadAddressName}
          </dd>
        </div>
        {/* 전화 번호 */}
        <div>
          <dt className="sr-only">전화번호</dt>
          <dd className="flex items-center gap-1">
            <Phone size="1rem" />{" "}
            {restaurant.phone
              ? restaurant.phone
              : "등록된 전화번호가 없습니다."}
          </dd>
        </div>
        {/* 카카오맵 연결 */}
        <div>
          <dt className="sr-only">상세정보 웹사이트</dt>
          <dd
            className="flex gap-1 cursor-pointer"
            onClick={handleMoveToKakaoMap}
          >
            <Image
              src="/images/kakaomap.png"
              alt="카카오맵"
              width={24}
              height={24}
            />
            <p>카카오맵 상세정보</p>
          </dd>
        </div>
      </dl>

      {/* 리뷰 작성 창 토글 */}
      {isWriting ? (
        <div>
          <ReviewForm
            restaurantId={restaurant.restaurantId}
            onClickWriteReview={onClickWriteReview}
          />
        </div>
      ) : (
        <>
          {/* 리뷰 작성 */}
          <div className="flex justify-end">
            <button
              onClick={onClickWriteReview}
              className="p-2 rounded-lg text-white bg-[#FF7058] text-right
            dark:bg-gray-700 md:dark:bg-gray-800"
            >
              리뷰 작성
            </button>
          </div>

          {/* 리뷰 목록 */}
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
                      <div className="flex-center gap-1">
                        <CircleUserRound />
                        <p className="font-bold">{review.userName}</p>
                      </div>
                      <p className="text-yellow-400">
                        {"⭐".repeat(Math.round(review.point))}
                      </p>
                    </div>

                    {review.imageUrls.length > 0 &&
                      renderImages(review.imageUrls)}

                    <p className="text-sm">{review.content}</p>
                    <div className="flex-between-center">
                      <time className="text-xs text-gray-400 block">
                        {review.date}
                      </time>

                      {review.userId === auth.userInfo?.id && (
                        <button
                          onClick={() => handleDeleteReview(review.reviewId)}
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
                      )}
                    </div>
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
