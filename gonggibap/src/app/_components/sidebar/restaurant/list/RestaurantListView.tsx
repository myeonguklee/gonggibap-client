import { Fragment } from "react";
import { Restaurant } from "@/types/restaurant";
import { Pagination } from "@/app/_components/Pagination";
import { MapPinLoading } from "@/app/_components/MapPinLoading";
import {
  RestaurantItem,
  trackRestaurantSelection,
} from "@/app/_components/sidebar/restaurant/list";

type RestaurantListViewProps = {
  restaurants?: Restaurant[];
  totalPages?: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const RestaurantListView: React.FC<RestaurantListViewProps> = ({
  restaurants,
  onRestaurantSelect,
  selectedRestaurantId,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handleRestaurantSelect = (restaurant: Restaurant) => {
    // GA4 이벤트 추가
    trackRestaurantSelection(restaurant);
    // 기존 레스토랑 선택 핸들러 호출
    onRestaurantSelect(restaurant.restaurantId);
  };

  // 로딩 스피너
  if (!restaurants) return <MapPinLoading />;

  // 조회된 식당이 없을 때
  if (restaurants.length === 0) {
    return <p className="text-center">검색된 식당이 없습니다.</p>;
  }

  return (
    <Fragment>
      <ul className="w-full flex flex-col gap-2">
        {restaurants?.map((restaurant, index) => (
          <li key={restaurant.restaurantId}>
            <RestaurantItem
              restaurant={restaurant}
              index={index}
              isSelected={selectedRestaurantId === restaurant.restaurantId}
              onRestaurantSelect={handleRestaurantSelect}
            />
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages ? totalPages : 1}
        currentPage={currentPage}
        onPageChange={onPageChange}
        selectedRestaurantId={selectedRestaurantId}
        onRestaurantSelect={onRestaurantSelect}
      />
    </Fragment>
  );
};
