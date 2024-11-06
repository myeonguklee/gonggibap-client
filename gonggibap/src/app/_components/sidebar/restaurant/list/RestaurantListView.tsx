import { useState, useEffect } from 'react';

import { Restaurant } from '@/types/restaurant';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import { Pagination } from '@/app/_components/Pagination';
import {
  RestaurantItem,
  trackRestaurantSelection,
} from '@/app/_components/sidebar/restaurant/list';
import { RestaurantEmptyState } from '@/app/_components/sidebar/restaurant/list/RestaurantEmptyState';
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
  isFavorite: boolean;
  onFavoriteRestaurantFilter: (value: boolean) => void;
};

export const RestaurantListView: React.FC<RestaurantListViewProps> = ({
  restaurants,
  selectedRestaurantId,
  onRestaurantSelect,
  totalPages,
  currentPage,
  onPageChange,
  onRestaurantSearch,
  isFavorite,
  onFavoriteRestaurantFilter,
}) => {
  const [activeTab, setActiveTab] = useState(isFavorite ? 'favorite' : 'list');

  useEffect(() => {
    setActiveTab(isFavorite ? 'favorite' : 'list');
  }, [isFavorite]);

  const tabs = [
    { id: 'list', label: '맛집 리스트', favorite: false },
    { id: 'favorite', label: '내가 찜한', favorite: true },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // tab.id에 해당하는 tab 객체를 찾아서 favorite 값을 전달
    const selectedTab = tabs.find((t) => t.id === tab);
    if (selectedTab) {
      onFavoriteRestaurantFilter(selectedTab.favorite);
    }
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
      <>
        {onRestaurantSearch && !isFavorite && (
          <SearchBar onSearch={onRestaurantSearch} />
        )}
        {restaurants.length === 0 && <RestaurantEmptyState />}
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
    </div>
  );
};
