'use client';

import Script from 'next/script';
import { useState } from 'react';

import { Polygon, RestaurantDetailCategory } from '@/types/restaurant';

import { CategoryFilter } from '@/app/_components/CategoryFilter';
import { MapCrosshair } from '@/app/_components/MapCrosshair';
import { Sidebar } from '@/app/_components/sidebar/Sidebar';

import { useGetRestaurants } from '@/apis/restaurant';

import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapCluster } from '@/hooks/useMapCluster';
import { useMapMarkers } from '@/hooks/useMapMarkers';

import { MdRefresh } from 'react-icons/md';

export default function Home() {
  const [polygon, setPolygon] = useState<Polygon | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<RestaurantDetailCategory>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: restaurants } = useGetRestaurants(
    polygon,
    currentPage,
    selectedCategory,
  );

  const handleRestaurantSelect = (id: number | null) => {
    setSelectedRestaurantId(id);
    // 선택된 식당 위치로 지도 이동
    if (id && mapInstance && restaurants?.content) {
      const selected = restaurants.content.find((r) => r.restaurantId === id);
      if (selected) {
        mapInstance.setCenter(
          new kakao.maps.LatLng(
            selected.restaurantLatitude,
            selected.restaurantLongitude,
          ),
        );
        mapInstance.setLevel(3);
      }
    }
  };

  // 카테고리 변경
  const handleCategorySelect = (category: RestaurantDetailCategory) => {
    setSelectedCategory(category);
    setCurrentPage(0); // 카테고리 변경시 페이지 리셋
  };

  // 페이징
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    mapRef,
    mapInstance,
    handleSearch,
    moveToCurrentLocation,
    onKakaoMapLoad,
    isDragging,
  } = useKakaoMap({
    onPolygonChange: setPolygon,
  });

  const { cluster } = useMapCluster({
    map: mapInstance,
  });

  const { clearMarkers: clearMapMarkers } = useMapMarkers({
    map: mapInstance,
    restaurants: restaurants?.content || [],
    cluster,
    selectedRestaurantId,
    onRestaurantSelect: handleRestaurantSelect,
  });

  return (
    <>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <Sidebar
        restaurants={restaurants?.content}
        totalPages={restaurants?.totalPages}
        selectedRestaurantId={selectedRestaurantId}
        onRestaurantSelect={handleRestaurantSelect}
        onCurrentLocation={moveToCurrentLocation}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onSelectCategory={handleCategorySelect}
      />
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services,clusterer&autoload=false`}
        onLoad={onKakaoMapLoad}
      />
      <div ref={mapRef} className="h-screen w-screen" />
      {isDragging && <MapCrosshair />}
      <button
        onClick={() => {
          clearMapMarkers();
          handleSearch();
          handlePageChange(0);
          setSelectedRestaurantId(null);
        }}
        className="fixed left-1/2 top-20 z-10 -translate-x-1/2 gap-1 rounded-3xl bg-[#FF7058] px-4 py-2 text-base font-semibold text-white shadow-lg flex-center hover:bg-[#FF6147] focus:outline-none md:bottom-12 md:left-[calc(50%+10rem)] md:top-auto md:px-6 md:py-3 md:text-lg"
        aria-label="현 지도에서 재검색">
        <MdRefresh />현 지도에서 재검색
      </button>
    </>
  );
}
