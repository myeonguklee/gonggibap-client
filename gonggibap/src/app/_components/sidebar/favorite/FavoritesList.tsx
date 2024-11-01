import { useGetFavoriteRestaurants } from "@/apis/favorite";
import { RestaurantItem } from "../restaurant/list";
import { Pagination } from "../../Pagination";
import { Restaurant } from "@/types/restaurant";
import { useState } from "react";

interface FavoritesListProps {
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
}

export function FavoritesList({
  selectedRestaurantId,
  onRestaurantSelect,
}: FavoritesListProps) {
  const { data: favorites } = useGetFavoriteRestaurants();
  const [currentPage, setCurrentPage] = useState(0);
  const handleRestaurantSelect = (restaurant: Restaurant) => {
    // 기존 레스토랑 선택 핸들러 호출
    onRestaurantSelect(restaurant.restaurantId);
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    // <div>
    //   {favorites?.content.map((favorite) => (
    //     <div key={favorite.restaurantId}>{favorite.restaurantName}</div>
    //   ))}
    // </div>
    <>
      {favorites.content.length === 0 && (
        <p className="text-center">검색된 식당이 없습니다.</p>
      )}
      <ul className="w-full flex flex-col gap-2">
        {favorites?.content.map((favorite, index) => (
          <li key={favorite.restaurantId}>
            <RestaurantItem
              restaurant={favorite}
              index={index}
              isSelected={selectedRestaurantId === favorite.restaurantId}
              onRestaurantSelect={handleRestaurantSelect}
            />
          </li>
        ))}
      </ul>
      {favorites?.content.length > 0 && (
        <Pagination
          totalPages={favorites?.totalPages ? favorites.totalPages : 1}
          currentPage={currentPage}
          onPageChange={handleCurrentPage}
          selectedRestaurantId={selectedRestaurantId}
          onRestaurantSelect={onRestaurantSelect}
        />
      )}
    </>
  );
}
