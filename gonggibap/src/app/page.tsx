"use client";

import { useState } from "react";
import Script from "next/script";
import { Polygon } from "@/types/restaurant";
import { ThemeToggleBtn } from "@/app/_components/ThemeToggleBtn";
import { Sidebar } from "@/app/_components/Sidebar";
import { useMapMarkers } from "@/hooks/useMapMarkers";
import { useKakaoMap } from "@/hooks/useKakaoMap";
import { useMapCluster } from "@/hooks/useMapCluster";
import { useGetRestaurants } from "@/apis/restaurant";
import { MdRefresh, MdGpsFixed } from "react-icons/md";

export default function Home() {
  const [polygon, setPolygon] = useState<Polygon | null>(null);

  const { data: restaurants } = useGetRestaurants(polygon, 0);

  const {
    mapRef,
    mapInstance,
    handleSearch,
    moveToCurrentLocation,
    onKakaoMapLoad,
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
  });

  return (
    <>
      <Sidebar restaurants={restaurants?.content || []} />
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services,clusterer&autoload=false`}
        onLoad={onKakaoMapLoad}
      />
      <div ref={mapRef} className="w-screen h-screen" />
      <button
        onClick={() => {
          clearMapMarkers();
          handleSearch();
        }}
        className="fixed left-1/2 -translate-x-1/2 top-4 md:top-auto md:bottom-12 flex-center gap-1 bg-[#FF7058] text-white px-4 py-2 md:px-6 md:py-3 text-base md:text-lg rounded-2xl shadow-lg hover:bg-[#FF6147] z-10 focus:outline-none"
        aria-label="현 지도에서 재검색"
      >
        <MdRefresh />현 지도에서 재검색
      </button>
      <button
        onClick={moveToCurrentLocation}
        className="fixed right-4 bottom-20 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none z-10"
        aria-label="현재 위치로 이동"
      >
        <MdGpsFixed className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
      <ThemeToggleBtn />
    </>
  );
}
