import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Restaurant } from '@/types/restaurant';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import { Pagination } from '@/app/_components/Pagination';
import { FavoritesList } from '@/app/_components/sidebar/favorite';
import {
  RestaurantItem,
  trackRestaurantSelection,
} from '@/app/_components/sidebar/restaurant/list';
import { TabNavigation } from '@/app/_components/sidebar/restaurant/list/TapNavigation';
import { SearchBar } from '@/components/SearchBar';

type RestaurantListViewProps = {
  restaurants?: Restaurant[];
  totalPages?: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRestaurantSearch?: (searchKeyword: string) => void;
};

export const RestaurantListView: React.FC<RestaurantListViewProps> = ({
  restaurants,
  selectedRestaurantId,
  onRestaurantSelect,
  totalPages,
  currentPage,
  onPageChange,
  onRestaurantSearch,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL의 tab 파라미터를 읽어와 초기 상태로 설정
  const initialTab = searchParams.get('tab') || 'list';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'list', label: '맛집 리스트' },
    { id: 'favorite', label: '내가 찜한' },
  ];

  // URL 파라미터가 변경될 때마다 탭 상태 업데이트
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && (tabParam === 'list' || tabParam === 'favorite')) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    // 현재 URL의 검색 파라미터를 유지하면서 tab 파라미터만 업데이트
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('tab', tab);

    // URL 업데이트
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`, { scroll: false });

    setActiveTab(tab);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    trackRestaurantSelection(restaurant);
    onRestaurantSelect(restaurant.restaurantId);
  };

  if (!restaurants) return <MapPinLoading />;

  return (
    <div className="flex flex-col gap-3">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {activeTab === 'list' ? (
        <>
          {onRestaurantSearch && <SearchBar onSearch={onRestaurantSearch} />}
          {restaurants.length === 0 && (
            <p className="text-center">검색된 식당이 없습니다.</p>
          )}
          <ul className="flex w-full flex-col gap-2">
            {restaurants?.map((restaurant, index) => (
              <li key={restaurant.restaurantId}>
                <RestaurantItem
                  restaurant={restaurant}
                  index={index}
                  onRestaurantSelect={handleRestaurantSelect}
                />
                {index !== restaurants.length - 1 && (
                  <div className="flex-center">
                    <div className="w-full border-b dark:border-gray-500"></div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {restaurants.length > 0 && (
            <Pagination
              totalPages={totalPages ? totalPages : 1}
              currentPage={currentPage}
              onPageChange={onPageChange}
              selectedRestaurantId={selectedRestaurantId}
              onRestaurantSelect={onRestaurantSelect}
            />
          )}
        </>
      ) : (
        <FavoritesList onTabChange={handleTabChange} />
      )}
    </div>
  );
};
