import { useState } from 'react';

import { toast } from 'react-toastify';

import { Restaurant } from '@/types/restaurant';

import { useAuthStore } from '@/store/useAuthStore';

import { LoginConfirmationModal } from '@/components/LoginConfirmationModal';

import {
  useGetFavoriteRestaurantCheck,
  useCreateFavoriteRestaurant,
  useDeleteFavoriteRestaurant,
} from '@/apis/favorite';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { FaRegBookmark } from 'react-icons/fa6';
import { GoBookmarkSlash } from 'react-icons/go';
import { GoLinkExternal } from 'react-icons/go';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import { PiLinkBold } from 'react-icons/pi';

type RestaurantInfoProps = {
  restaurant: Restaurant;
  onClose?: () => void;
  onBack?: () => void;
};

export const RestaurantInfo = ({
  restaurant,
  onClose,
  onBack,
}: RestaurantInfoProps) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    data: favoriteRestaurantCheck,
    isLoading: favoriteRestaurantCheckLoading,
  } = useGetFavoriteRestaurantCheck(restaurant.restaurantId, {
    enabled: isLogin,
  });

  const { mutate: createFavoriteRestaurant, isPending: isCreating } =
    useCreateFavoriteRestaurant();
  const { mutate: deleteFavoriteRestaurant, isPending: isDeleting } =
    useDeleteFavoriteRestaurant({
      onSuccess: isMobile ? onBack : onClose,
    });
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

  const handleShare = () => {
    navigator.clipboard.writeText(
      `https://gonggibap.co.kr/entry/${restaurant.restaurantId}`,
    );
    toast.info('주소가 복사되었습니다.');
  };

  const handleMoveKakaoMap = () => {
    window.open(
      `https://place.map.kakao.com/${restaurant.restaurantLink}`,
      '_blank',
    );
  };

  return (
    <>
      <section className="flex flex-col gap-4" aria-label="음식점 기본 정보">
        <div className="inline-block">
          <span
            className="rounded-xl bg-black px-4 py-1 text-sm text-white dark:bg-white dark:text-black"
            role="text">
            {restaurant.publicOfficeName}
          </span>
        </div>

        <div className="flex flex-col">
          <address className="flex flex-col gap-2.5 not-italic">
            <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-white">
              <IoLocationOutline aria-hidden="true" />
              <span>{restaurant.restaurantAddressName}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-white">
              <IoCallOutline aria-hidden="true" />
              <span>{restaurant.phone ? restaurant.phone : '미제공'}</span>
            </div>
            <div>
              <button
                onClick={handleMoveKakaoMap}
                className="flex items-center gap-2 font-semibold text-gray-700 dark:text-white">
                <GoLinkExternal />
                <span>카카오맵 상세보기</span>
              </button>
            </div>
          </address>
        </div>

        <div className="flex-between-center">
          <dl className="flex gap-1">
            <dt className="text-gray-500 dark:text-white">평점</dt>
            <dd className="rounded-xl bg-[#FF7058] px-3 text-white">
              {formatPointAvg(restaurant.pointAvg)}
            </dd>
          </dl>
          <dl className="flex gap-1">
            <dt className="text-gray-500 dark:text-white">방문수</dt>
            <dd>{restaurant.visitCount}</dd>
          </dl>
          <button
            onClick={handleShare}
            className="gap-1 text-gray-500 flex-center hover:text-black dark:text-white">
            <PiLinkBold />
            <span>공유하기</span>
          </button>
        </div>

        <button
          disabled={isMutating}
          onClick={handleFavoriteCreate}
          className={`flex items-center justify-center gap-1 rounded-xl  py-3 font-semibold text-white
            ${isMutating ? 'cursor-not-allowed opacity-50' : ''}
            ${favoriteRestaurantCheck?.favoriteStatus ? 'bg-gray-400' : 'bg-[#FF7058]'}
            `}
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
