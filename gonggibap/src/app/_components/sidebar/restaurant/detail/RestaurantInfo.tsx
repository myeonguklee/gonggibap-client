import { useState } from 'react';


import { Restaurant } from '@/types/restaurant';

import { useAuthStore } from '@/store/useAuthStore';

import { LoginConfirmationModal } from '@/components/LoginConfirmationModal';

import {
  useGetFavoriteRestaurantCheck,
  useCreateFavoriteRestaurant,
  useDeleteFavoriteRestaurant,
} from '@/apis/favorite';

import { FaRegBookmark } from 'react-icons/fa6';
import { GoBookmarkSlash } from 'react-icons/go';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';





type RestaurantInfoProps = {
  restaurant: Restaurant;
};

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const {
    data: favoriteRestaurantCheck,
    isLoading: favoriteRestaurantCheckLoading,
  } = useGetFavoriteRestaurantCheck(restaurant.restaurantId, {
    enabled: isLogin,
  });

  const { mutate: createFavoriteRestaurant, isPending: isCreating } =
    useCreateFavoriteRestaurant();
  const { mutate: deleteFavoriteRestaurant, isPending: isDeleting } =
    useDeleteFavoriteRestaurant();
  const isMutating = isCreating || isDeleting;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFavoriteCreate = () => {
    if (!isLogin) {
      setIsModalOpen(true);
      return;
    }
    if (favoriteRestaurantCheck?.favoriteStatus) {
      deleteFavoriteRestaurant(restaurant.restaurantId);
    }
    if (!favoriteRestaurantCheck?.favoriteStatus) {
      createFavoriteRestaurant(restaurant.restaurantId);
    }
  };

  // 평점 포멧팅 함수
  const formatPointAvg = (point: number | null | undefined) => {
    return point ? point.toFixed(1) : '-';
  };

  // 좋아요 버튼 텍스트, 아이콘 결정 함수
  const getButtonState = () => {
    if (!isLogin || favoriteRestaurantCheckLoading)
      return { text: '내 지도에 추가하기', icon: <FaRegBookmark /> };
    return favoriteRestaurantCheck?.favoriteStatus
      ? {
          text: '내 지도에서 제거하기',
          icon: <GoBookmarkSlash />,
        }
      : {
          text: '내 지도에 추가하기',
          icon: <FaRegBookmark />,
        };
  };

  return (
    <>
      <section className="flex flex-col gap-4" aria-label="음식점 기본 정보">
        <div className="inline-block">
          <span
            className="bg-black text-white px-4 py-1 rounded-xl text-sm dark:bg-white dark:text-black"
            role="text">
            {restaurant.publicOfficeName}
          </span>
        </div>

        <address className="flex flex-col gap-1 not-italic">
          <div className="flex items-center gap-2 font-semibold">
            <IoLocationOutline aria-hidden="true" />
            <span>{restaurant.restaurantAddressName}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <IoCallOutline aria-hidden="true" />
            <span>{restaurant.phone ? restaurant.phone : '미제공'}</span>
          </div>
        </address>

        <dl className="flex gap-4">
          <div className="flex gap-1">
            <dt className="text-gray-500">평점</dt>
            <dd className="bg-[#FF7058] text-white rounded-xl px-3">
              {formatPointAvg(restaurant.pointAvg)}
            </dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-gray-500">방문수</dt>
            <dd>{restaurant.visitCount}</dd>
          </div>
        </dl>

        <button
          disabled={isMutating}
          onClick={handleFavoriteCreate}
          className={`bg-[#FF7058] py-3 gap-1 flex justify-center items-center text-white font-semibold rounded-xl ${
            isMutating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-busy={isMutating}>
          {getButtonState().icon}
          <span>{getButtonState().text}</span>
        </button>
      </section>

      <LoginConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
