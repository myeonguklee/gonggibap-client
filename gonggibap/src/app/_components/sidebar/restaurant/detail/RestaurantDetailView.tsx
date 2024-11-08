import Image from 'next/image';
import { useRef, useState } from 'react';

import { HistoryContent } from '@/app/_components/sidebar/history';
import {
  RestaurantHeader,
  RestaurantInfo,
  RestaurantTapNavigation,
  BlogReview,
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
  const { data: restaurant } = useGetRestaurant(restaurantId);
  const [activeTab, setActiveTab] = useState('history');
  const navRef = useRef<HTMLElement>(null);

  const tabs = [
    {
      id: 'history',
      label: '공공기관 사용내역',
      ariaLabel: '공공기관 사용내역 탭',
    },
    { id: 'reviews', label: '리뷰', ariaLabel: '음식점 리뷰 탭' },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleMoveNav = () => {
    if (navRef.current) {
      navRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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

      <RestaurantInfo
        restaurant={restaurant}
        onClose={onClose}
        onBack={onBack}
      />
      <figure className="relative h-[180px] w-full">
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
      <nav ref={navRef} aria-label="음식점 리뷰 사용내역 탭 메뉴">
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
          activeTab === 'history' ? '공공기관 사용내역' : '리뷰 목록'
        }>
        {activeTab === 'history' ? (
          <HistoryContent
            restaurantId={restaurant.restaurantId}
            onMoveNav={handleMoveNav}
          />
        ) : (
          <ReviewsContent
            restaurantId={restaurant.restaurantId}
            onMoveNav={handleMoveNav}
          />
        )}
      </section>
      <section>
        <BlogReview restaurantId={restaurantId} />
      </section>
    </article>
  );
};
