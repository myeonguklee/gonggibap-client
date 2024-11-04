'use client';

import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

import { Polygon } from '@/types/restaurant';

import { FirstLoading } from '@/app/entry/[id]/_components//FirstLoading';
import { MobileSidebar } from '@/app/entry/[id]/_components//MobileSidebar';
import { DesktopSidebar } from '@/app/entry/[id]/_components/DesktopSidebar';
import { SearchBar } from '@/components//SearchBar';

import { useGetRestaurant } from '@/apis/restaurant/useGetRestaurant';

import { useKakaoMap } from '@/hooks/useKakaoMap';
import { useMapCluster } from '@/hooks/useMapCluster';
import { useMapMarkers } from '@/hooks/useMapMarkers';

interface EntryPageProps {
  restaurantId: number;
}

export function EntryPageContent({ restaurantId }: EntryPageProps) {
  const router = useRouter();
  const { data: restaurant } = useGetRestaurant(Number(restaurantId));
  const [polygon, setPolygon] = useState<Polygon | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const handleSearch = (keyword: string) => {
    // 검색어가 있으면 메인 페이지로 이동하면서 검색어 파라미터 추가
    if (keyword) {
      router.push(`/?keyword=${encodeURIComponent(keyword)}`);
      // window.location.href = `/?keyword=${encodeURIComponent(keyword)}`;
    } else {
      router.push('/');
    }
  };

  const { mapRef, mapInstance, onKakaoMapLoad } = useKakaoMap({
    onPolygonChange: setPolygon,
  });

  // cluster 생성
  const { cluster } = useMapCluster({
    map: mapInstance,
  });

  const handleRestaurantSelect = useCallback(
    (id: number | null) => {
      setSelectedRestaurantId(id);
      if (id && mapInstance && restaurant) {
        mapInstance.setCenter(
          new kakao.maps.LatLng(
            restaurant.restaurantLatitude,
            restaurant.restaurantLongitude,
          ),
        );
        mapInstance.setLevel(3);
      }
    },
    [mapInstance, restaurant],
  );

  // useMapMarkers에 cluster 전달
  useMapMarkers({
    map: mapInstance,
    restaurants: restaurant ? [restaurant] : [],
    cluster, // cluster 전달
    selectedRestaurantId,
    onRestaurantSelect: handleRestaurantSelect,
  });

  // 빌드 에러 방지를 위한 useEffect
  useEffect(() => {
    if (polygon) {
      // polygon 데이터를 활용하는 로직
      console.log('Current map bounds:', polygon);
    }
  }, [polygon]);

  // restaurant 데이터가 로드되고 mapInstance가 생성되면 실행
  useEffect(() => {
    if (restaurant && mapInstance) {
      // 식당 위치로 지도 중심 이동
      mapInstance.setCenter(
        new kakao.maps.LatLng(
          restaurant.restaurantLatitude,
          restaurant.restaurantLongitude,
        ),
      );
      mapInstance.setLevel(3);
      // 식당 선택 상태로 설정
      handleRestaurantSelect(Number(restaurantId));
    }
  }, [restaurant, mapInstance, restaurantId, handleRestaurantSelect]);

  return (
    <>
      {/* 지도가 준비된 경우에만 UI 컴포넌트들을 표시 */}
      {mapInstance ? (
        <>
          <div className="absolute inset-x-4 top-4 z-10 md:hidden">
            <SearchBar onSearch={handleSearch} />
          </div>

          <nav aria-label="사이드바">
            <div className="hidden md:block" aria-label="데스크톱 사이드바">
              <DesktopSidebar restaurant={restaurant}>
                <SearchBar onSearch={handleSearch} />
              </DesktopSidebar>
            </div>
            <div className="block md:hidden" aria-label="모바일 사이드바">
              <MobileSidebar restaurant={restaurant} />
            </div>
          </nav>
        </>
      ) : (
        <FirstLoading />
      )}

      {/* 카카오맵 */}
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services,clusterer&autoload=false`}
        onLoad={onKakaoMapLoad}
      />
      <div ref={mapRef} className="h-screen w-screen" />
    </>
  );
}
