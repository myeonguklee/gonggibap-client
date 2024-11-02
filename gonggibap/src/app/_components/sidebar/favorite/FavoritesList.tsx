import { useGetFavoriteRestaurants } from "@/apis/favorite";
import { RestaurantItem } from "../restaurant/list";
import { Pagination } from "../../Pagination";
import { Restaurant } from "@/types/restaurant";
import { useState } from "react";
import { MapPinLoading } from "../../MapPinLoading";
import { useAuthStore } from "@/store/useAuthStore";

interface FavoritesListProps {
  onTabChange: (tab: string) => void;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
}

export function FavoritesList({
  selectedRestaurantId,
  onRestaurantSelect,
  onTabChange,
}: FavoritesListProps) {
  const { isLogin } = useAuthStore();
  const { data: favorites, isLoading, error } = useGetFavoriteRestaurants();
  const [currentPage, setCurrentPage] = useState(0);
  const handleRestaurantSelect = (restaurant: Restaurant) => {
    // 기존 레스토랑 선택 핸들러 호출
    onRestaurantSelect(restaurant.restaurantId);
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  if (!isLogin) {
    return (
      <div className="absolute inset-0 bg-black/50 flex-center backdrop-blur-sm">
        <div className="flex flex-col gap-5 text-center text-xl">
          <p className="text-white">로그인이 필요합니다</p>
          <a
            href="/login"
            className="inline-block py-2 px-6 bg-[#FF7058] text-white font-bold rounded-lg hover:bg-[#ff7158da]"
          >
            로그인하기
          </a>
          <button
            onClick={() => onTabChange("list")}
            className="py-2 px-6 bg-gray-400 rounded-lg text-white hover:bg-gray-500"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <MapPinLoading />;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    // <div>
    //   {favorites?.content.map((favorite) => (
    //     <div key={favorite.restaurantId}>{favorite.restaurantName}</div>
    //   ))}
    // </div>
    <>
      {favorites && favorites.content.length === 0 && (
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
      {favorites && favorites?.content.length > 0 && (
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
