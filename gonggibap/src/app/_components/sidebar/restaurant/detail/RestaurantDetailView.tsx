import Image from 'next/image';
import { useState } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

import { HistoryContent } from '@/app/_components/sidebar/history';
import {
  RestaurantHeader,
  RestaurantInfo,
  RestaurantTapNavigation,
} from '@/app/_components/sidebar/restaurant/detail';
import { ReviewsContent } from '@/app/_components/sidebar/review';

import { useGetRestaurant } from '@/apis/restaurant/useGetRestaurant';

type RestaurantDetailViewProps = {
  restaurantId: number;
  onClose?: () => void;
  onBack?: () => void;
};

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurantId,
  onClose,
  onBack,
}) => {
  const auth = useAuthStore();
  const { data: restaurant } = useGetRestaurant(restaurantId);
  const [activeTab, setActiveTab] = useState('reviews');

  const tabs = [
    { id: 'reviews', label: '리뷰', ariaLabel: '음식점 리뷰 탭' },
    {
      id: 'history',
      label: '공공기관 사용내역',
      ariaLabel: '공공기관 사용내역 탭',
    },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (!restaurant) {
    return null;
  }

  return (
    <article
      className="flex flex-col gap-5 px-4"
      role="article"
      aria-label={`${restaurant.restaurantName} 상세 정보`}>
      <RestaurantHeader
        restaurantName={restaurant.restaurantName}
        restaurantDetailCategory={restaurant.restaurantDetailCategory}
        onClose={onClose}
        onBack={onBack}
      />

      <RestaurantInfo restaurant={restaurant} />
      <figure className="relative h-[300px] w-full md:h-[180px]">
        <Image
          src={restaurant.restaurantImage}
          alt={`${restaurant.restaurantName} 이미지`}
          fill
          className="rounded-xl object-cover"
          priority
        />
        <figcaption className="sr-only">
          {restaurant.restaurantName} 음식점 이미지
        </figcaption>
      </figure>

      {/* 탭 네비게이션 */}
      <nav aria-label="음식점 리뷰 사용내역 탭 메뉴">
        <RestaurantTapNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </nav>

      {/* 탭 컨텐츠 */}
      <section
        aria-live="polite"
        role="tabpanel"
        aria-label={
          activeTab === 'reviews' ? '리뷰 목록' : '공공기관 사용내역'
        }>
        {activeTab === 'reviews' ? (
          <ReviewsContent
            restaurantId={restaurant.restaurantId}
            currentUserId={auth.userInfo?.id}
          />
        ) : (
          <HistoryContent restaurantId={restaurant.restaurantId} />
        )}
      </section>
    </article>
  );
};
