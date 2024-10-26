import { Restaurant } from "@/types/restaurant";
import { event } from "@/app/_components/GoogleAnalytics";

type RestaurantListViewProps = {
  restaurants: Restaurant[];
  onRestaurantSelect: (restaurant: Restaurant) => void;
  selectedRestaurantId?: number;
};

export const RestaurantListView: React.FC<RestaurantListViewProps> = ({
  restaurants,
  onRestaurantSelect,
  selectedRestaurantId,
}) => {
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
    onRestaurantSelect(restaurant);
  };

  return (
    <ul className="space-y-4">
      {restaurants.map((restaurant) => (
        <li key={restaurant.restaurantId}>
          <button
            onClick={() => handleRestaurantSelect(restaurant)}
            className={`w-full text-left p-4 rounded-lg transition-colors border dark:border-none
            ${
              selectedRestaurantId === restaurant.restaurantId
                ? "bg-gray-100 dark:bg-gray-700"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <div className=" flex-between-center">
              <div className="flex-col gap-1">
                <h3 className="font-bold">{restaurant.restaurantName}</h3>
                <p className="text-sm">
                  <span className="sr-only">카테고리: </span>
                  {restaurant.restaurantCategory}
                </p>
              </div>
              <div className="text-right">
                <div className="text-yellow-400">
                  <span className="sr-only">방문 횟수: </span>⭐
                  {restaurant.visitCount}
                </div>
              </div>
            </div>

            <address className="text-gray-400 text-xs text-single-line ">
              {restaurant.restaurantRoadAddressName}
            </address>
          </button>
        </li>
      ))}
    </ul>
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
