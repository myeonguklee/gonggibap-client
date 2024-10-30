import { Fragment, useState } from "react";
import { Footprints, Star, Coffee, Utensils, MapPinned } from "lucide-react";
import { Restaurant } from "@/types/restaurant";
import { event } from "@/app/_components/GoogleAnalytics";
import { Pagination } from "@/app/_components/Pagination";
import { MapPinLoading } from "@/app/_components/MapPinLoading";

type RestaurantListViewProps = {
  restaurants?: Restaurant[];
  totalPages?: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
};

export const RestaurantListView: React.FC<RestaurantListViewProps> = ({
  restaurants,
  onRestaurantSelect,
  selectedRestaurantId,
  totalPages,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChage = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경에 따른 API 호출 등 로직
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    // GA4 이벤트 발생, 기본적인 선택 이벤트
    event({
      action: "select_restaurant",
      category: "engagement",
      label: restaurant.restaurantName,
      value: 1,
    });

    // 상세 정보가 포함된 커스텀 이벤트
    event({
      action: "view_restaurant_details",
      category: "restaurant_interaction",
      label: `${restaurant.restaurantCategory} | ${restaurant.restaurantName}`,
      value: restaurant.visitCount,
    });

    // 기존 선택 핸들러 호출
    onRestaurantSelect(restaurant.restaurantId);
  };

  return (
    <Fragment>
      {!restaurants && <MapPinLoading />}
      <ul className="w-full flex flex-col gap-2">
        {restaurants?.length === 0 && (
          <p className="text-center">검색된 식당이 없습니다.</p>
        )}
        {restaurants?.map((restaurant, index) => (
          <li key={restaurant.restaurantId}>
            <button
              onClick={() => handleRestaurantSelect(restaurant)}
              className={`w-full text-left flex flex-col gap-2 p-4 rounded-lg transition-colors dark:bg-gray-700 border dark:border-none
            ${
              selectedRestaurantId === restaurant.restaurantId
                ? "bg-gray-100 dark:bg-gray-900"
                : "hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
            >
              <div className="w-full flex flex-col gap-2">
                <h3 className="font-bold text-single-line">
                  {index + 1}. {restaurant.restaurantName}
                </h3>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1">
                    <span className="sr-only">음식점 카테고리</span>
                    {restaurant.restaurantDetailCategory === "카페" ? (
                      <Coffee size="1rem" />
                    ) : (
                      <Utensils size="1rem" />
                    )}
                    {restaurant.restaurantDetailCategory}
                  </div>
                  <address className="flex items-center gap-1 not-italic text-single-line">
                    <MapPinned size="1rem" />
                    {restaurant.restaurantRoadAddressName
                      .split(" ")
                      .slice(2)
                      .join(" ")}
                  </address>
                </div>
                <div className="flex items-center gap-5">
                  <div>
                    <span className="sr-only">관련 구청</span>
                    <p># {restaurant.publicOfficeName}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="sr-only">음식점 평점</span>
                    <Star size="1rem" />
                    {restaurant.pointAvg ? restaurant.pointAvg.toFixed(1) : "-"}
                  </div>
                  <div className="flex items-center gap-1 text-[#FF9A00]">
                    <span className="sr-only">방문 횟수</span>
                    <Footprints size="1rem" />
                    <p>{restaurant.visitCount}</p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {restaurants && restaurants.length > 0 && (
        <Pagination
          totalPages={totalPages ? totalPages : 1}
          currentPage={currentPage}
          onPageChange={handlePageChage}
        />
      )}
    </Fragment>
  );
};

// GA4에서 다음과 같은 데이터를 분석할 수 있습니다 ->
// 어떤 레스토랑이 자주 클릭되는지
// 카테고리별 인기도
// 방문 횟수가 높은 레스토랑의 클릭률
// 사용자의 레스토랑 탐색 패턴

// GA4 대시보드에서는 이러한 이벤트를 기반으로 ->
// 가장 인기 있는 레스토랑 카테고리
// 사용자가 가장 많이 조회하는 레스토랑
// 방문 횟수와 클릭률의 상관관계
