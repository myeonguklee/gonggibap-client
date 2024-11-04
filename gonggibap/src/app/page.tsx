'use client';

import Script from 'next/script';
import { useState } from 'react';

import { Polygon, RestaurantDetailCategory } from '@/types/restaurant';

import { CategoryFilter } from '@/app/_components/CategoryFilter';
import { MapCrosshair } from '@/app/_components/MapCrosshair';
import { Sidebar } from '@/app/_components/sidebar/Sidebar';
import { SearchBar } from '@/components/SearchBar';

import { useGetRestaurants } from '@/apis/restaurant';

import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapCluster } from '@/hooks/useMapCluster';
import { useMapMarkers } from '@/hooks/useMapMarkers';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import { MdRefresh } from 'react-icons/md';

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [polygon, setPolygon] = useState<Polygon | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<RestaurantDetailCategory>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const { data: restaurants } = useGetRestaurants(
    polygon,
    currentPage,
    selectedCategory,
    searchKeyword,
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
    setCurrentPage(0); // 카테고리 변경 시 페이지 리셋
    setSearchKeyword(''); // 카테고리 변경 시 검색어 리셋
  };

  // 검색 핸들러
  const handleRestaurantSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setPolygon(null); // 검색시 polygon초기화
    setCurrentPage(0);
    // 검색시 전국 줌레벨로 이동
    if (mapInstance) {
      mapInstance.setLevel(13);
    }
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
      {isMobile && (
        <SearchBar
          onSearch={handleRestaurantSearch}
          placeholder="장소, 지역 검색"
          className="fixed left-1/2 top-5 z-10 min-w-[332px] -translate-x-1/2 rounded-2xl shadow-lg"
          isMobile
        />
      )}
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
        onRestaurantSearch={handleRestaurantSearch}
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
          setSearchKeyword('');
        }}
        className="fixed left-1/2 top-28 z-10 -translate-x-1/2 gap-1 rounded-3xl bg-[#FF7058] px-4 py-2 text-sm font-semibold text-white shadow-lg flex-center hover:bg-[#FF6147] focus:outline-none md:bottom-12 md:left-[calc(50%+10rem)] md:top-auto md:px-6 md:py-3 md:text-lg"
        aria-label="현 지도에서 재검색">
        <MdRefresh />현 지도에서 재검색
      </button>
    </>
  );
}
