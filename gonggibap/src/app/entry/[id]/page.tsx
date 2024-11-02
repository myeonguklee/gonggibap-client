"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useGetRestaurant } from "@/apis/restaurant/useGetRestaurant";
import { MapPinLoading } from "@/app/_components/MapPinLoading";
import { Sidebar } from "@/app/entry/[id]/_components/Sidebar";
import { useKakaoMap } from "@/hooks/useKakaoMap";
import { Polygon } from "@/types/restaurant";
import { useMapMarkers } from "@/hooks/useMapMarkers";
import { useMapCluster } from "@/hooks/useMapCluster";

interface SharePageProps {
  params: {
    id: string; // Next.js는 URL 파라미터를 항상 문자열로 전달
  };
}

export default function SharePage({ params }: SharePageProps) {
  const [polygon, setPolygon] = useState<Polygon | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const restaurantId = params.id;
  const { data: restaurant, isLoading } = useGetRestaurant(Number(restaurantId));

  const handleRestaurantSelect = (id: number | null) => {
    setSelectedRestaurantId(id);
    if (id && mapInstance && restaurant) {
      mapInstance.setCenter(
        new kakao.maps.LatLng(
          restaurant.restaurantLatitude,
          restaurant.restaurantLongitude
        )
      );
      mapInstance.setLevel(3);
    }
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

  // cluster 생성
  const { cluster } = useMapCluster({
    map: mapInstance,
  });

  // useMapMarkers에 cluster 전달
  const { clearMarkers } = useMapMarkers({
    map: mapInstance,
    restaurants: restaurant ? [restaurant] : [],
    cluster, // cluster 전달
    selectedRestaurantId,
    onRestaurantSelect: handleRestaurantSelect,
  });

  useEffect(() => {
    if (restaurant) {
      handleRestaurantSelect(Number(restaurantId));
    }
  }, [restaurant, restaurantId]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen">
        <MapPinLoading />
      </div>
    );
  }

  if (!restaurant) {
    return <div>식당 정보가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <Sidebar restaurant={restaurant} />
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services,clusterer&autoload=false`}
        onLoad={onKakaoMapLoad}
      />
      <div ref={mapRef} className="w-screen h-screen" />
    </>
  );
}