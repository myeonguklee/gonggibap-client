import { useState } from "react";
import { Polygon, RestaurantDetailCategory } from "@/types/restaurant";
import { useGetRestaurants } from "@/apis/restaurant";

export const useRestaurantSearch = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [polygon, setPolygon] = useState<Polygon | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<RestaurantDetailCategory>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const {
    data: restaurants,
    isLoading,
    error,
  } = useGetRestaurants(polygon, currentPage, selectedCategory);

  const resetSearch = () => {
    setCurrentPage(0);
    setSelectedRestaurantId(null);
  };

  return {
    // 상태
    currentPage,
    polygon,
    selectedCategory,
    selectedRestaurantId,
    restaurants,
    isLoading,
    error,

    // 액션
    setCurrentPage,
    setPolygon,
    setSelectedCategory,
    setSelectedRestaurantId,
    resetSearch,
  };
};
