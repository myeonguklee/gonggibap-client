"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Polygon, Restaurant } from "@/types/restaurant";
import { useGetRestaurants } from "@/apis/restaurant";
import { ThemeToggleBtn } from "@/app/_components/ThemeToggleBtn";
import { Sidebar } from "@/app/_components/Sidebar";
import { useDebounce } from "@/hooks/useDebounce";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useMapMarkers } from "@/hooks/useMapMarkers";
import { MdRefresh, MdGpsFixed } from "react-icons/md";

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [polygon, setPolygon] = useState<Polygon | null>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const clusterRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);

  const debouncedPolygon = useDebounce(polygon, 500);
  const { data: restaurants } = useGetRestaurants(debouncedPolygon, 0);
  const { getCurrentLocation } = useCurrentLocation();
  const { clearMarkers } = useMapMarkers({
    map: mapInstanceRef.current,
    restaurants: restaurantData,
    cluster: clusterRef.current,
  });

  // 레스토랑 데이터 업데이트를 위한 useEffect
  useEffect(() => {
    if (!restaurants?.restaurantResponses) return;
    setRestaurantData(restaurants.restaurantResponses);
  }, [restaurants?.restaurantResponses]);

  // 클러스터 스타일 정의
  const getClusterStyles = () => [
    {
      width: "50px",
      height: "50px",
      background: "#FF9A00",
      color: "#fff",
      textAlign: "center",
      lineHeight: "50px",
      borderRadius: "25px",
      opacity: "0.9",
      fontSize: "16px",
      fontWeight: "bold",
    },
    {
      width: "60px",
      height: "60px",
      background: "#FF9A00",
      color: "#fff",
      textAlign: "center",
      lineHeight: "60px",
      borderRadius: "30px",
      opacity: "0.7",
      fontSize: "18px",
      fontWeight: "bold",
    },
  ];

  // 위치 초기화
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      const initializeMap = async () => {
        try {
          const { latitude: lat, longitude: lng } = await getCurrentLocation();

          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
          };
          if (!mapRef.current) return;
          const map = new window.kakao.maps.Map(mapRef.current, options);
          mapInstanceRef.current = map;

          // 클러스터러 초기화
          clusterRef.current = new window.kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 6,
            styles: getClusterStyles(),
          });

          // 현재 위치에 마커 추가
          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          // 초기 로드시 한번 검색
          handleSearch();
        } catch (error) {
          if (error instanceof GeolocationPositionError) {
            if (error.code === 1) {
              alert("위치 권한을 허용해주세요");
            }
            if (error.code === 2) {
              alert("위치를 가져올 수 없습니다");
            }
          }
          if (!mapRef.current) return;

          // 모든 에러 상황에서 기본 위치(강남구청)로 초기화
          const options = {
            center: new window.kakao.maps.LatLng(37.517139, 127.047523),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);
          mapInstanceRef.current = map;

          // 클러스터러 초기화 (에러 상황에서도)
          clusterRef.current = new window.kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 6,
            styles: getClusterStyles(),
          });

          handleSearch();
        }
      };

      initializeMap();
    }
  }, [mapLoaded]);

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    if (!mapInstanceRef.current) return;

    // 현재 지도 영역 가져오기
    const bounds = mapInstanceRef.current.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    // polygon 업데이트
    setPolygon({
      firstCoordinate: {
        latitude: sw.getLat(),
        longitude: sw.getLng(),
      },
      secondCoordinate: {
        latitude: sw.getLat(),
        longitude: ne.getLng(),
      },
      thirdCoordinate: {
        latitude: ne.getLat(),
        longitude: ne.getLng(),
      },
      fourthCoordinate: {
        latitude: ne.getLat(),
        longitude: sw.getLng(),
      },
    });

    // 기존 클러스터 제거
    clearMarkers();
  };

  const moveToCurrentLocation = async () => {
    try {
      const { latitude: lat, longitude: lng } = await getCurrentLocation();

      if (!mapInstanceRef.current) return;

      // 현재 위치로 지도 이동
      mapInstanceRef.current.setCenter(new window.kakao.maps.LatLng(lat, lng));

      // 줌 레벨도 초기화
      mapInstanceRef.current.setLevel(3);

      handleSearch();
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        if (error.code === 1) {
          alert("위치 권한을 허용해주세요");
        }
        if (error.code === 2) {
          alert("위치를 가져올 수 없습니다");
        }
      }
    }
  };

  const onKakaoMapLoad = () => {
    window.kakao.maps.load(() => {
      setMapLoaded(true);
    });
  };

  return (
    <>
      <Sidebar restaurants={restaurants?.restaurantResponses || []} />
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services,clusterer&autoload=false`}
        onLoad={onKakaoMapLoad}
      />
      <div ref={mapRef} className="w-screen h-screen" />
      <button
        onClick={handleSearch}
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
