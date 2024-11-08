import { useRef } from 'react';

import { Restaurant } from '@/types/restaurant';
import { MobilePosition } from '@/types/sidebar';

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
  mobilePosition?: MobilePosition;
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
  mobilePosition,
}) => {
  const refTap = useRef<HTMLDivElement>(null);

  const handleMoveTap = () => {
    if (refTap.current) {
      refTap.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
    handleMoveTap();
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    trackRestaurantSelection(restaurant);
    onRestaurantSelect(restaurant.restaurantId);
  };

  if (!restaurants) return <MapPinLoading />;

  return (
    <div ref={refTap} className="flex flex-col gap-3">
      <TabNavigation
        isFavorite={isFavorite}
        onTabChange={onFavoriteRestaurantFilter}
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
        {restaurants.length > 0 &&
          (!mobilePosition || mobilePosition !== 'peek') && (
            <Pagination
              totalPages={totalPages ? totalPages : 1}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              selectedRestaurantId={selectedRestaurantId}
              onRestaurantSelect={onRestaurantSelect}
            />
          )}
      </>
    </div>
  );
};
