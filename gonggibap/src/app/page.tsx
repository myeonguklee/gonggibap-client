"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Polygon } from "@/types/restaurant";
import { useGetRestaurants } from "@/apis/restaurant";
import { ThemeToggleBtn } from "@/app/_components/ThemeToggleBtn";
import { Sidebar } from "@/app/_components/Sidebar";
import { useDebounce } from "@/hooks/useDebounce";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { MdRefresh, MdGpsFixed } from "react-icons/md";

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [polygon, setPolygon] = useState<Polygon | null>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const clusterRef = useRef<any>(null);
  const [restaurantData, setRestaurantData] = useState<any[]>([]);

  const debouncedPolygon = useDebounce(polygon, 500);
  const { data: restaurants } = useGetRestaurants(debouncedPolygon, 0);
  const { getCurrentLocation } = useCurrentLocation();

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

  // 마커 이미지 생성 함수
  const createMarkerImage = (number: number) => {
    const svg = `<svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 그림자 효과 -->
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- 흰색 테두리 마커 -->
      <path d="M18 0C8.07 0 0 8.07 0 18C0 31.5 18 48 18 48C18 48 36 31.5 36 18C36 8.07 27.93 0 18 0Z" 
        fill="white"
        filter="url(#shadow)"
      />
      <!-- 내부 주황색 마커 -->
      <path d="M18 2C9.17 2 2 9.17 2 18C2 29.5 18 44 18 44C18 44 34 29.5 34 18C34 9.17 26.83 2 18 2Z" 
        fill="#FF7058"
      />
      <!-- 숫자 -->
      <text 
        x="50%" 
        y="43%" 
        text-anchor="middle" 
        dy=".3em" 
        fill="white" 
        font-size="16"
        font-family="Arial, sans-serif"
        font-weight="bold"
      >${number}</text>
    </svg>`;

    const markerSize = new window.kakao.maps.Size(36, 48);
    const markerOption = { offset: new window.kakao.maps.Point(18, 48) };

    return new window.kakao.maps.MarkerImage(
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg),
      markerSize,
      markerOption
    );
  };

  // 마커 생성을 위한 useEffect
  useEffect(() => {
    if (
      !mapInstanceRef.current ||
      restaurantData.length < 1 ||
      !clusterRef.current
    )
      return;

    // 마커가 없을 때만 새로 생성
    if (markersRef.current.length === 0) {
      const newMarkers = restaurantData.map((restaurant, index) => {
        const markerPosition = new window.kakao.maps.LatLng(
          restaurant.restaurantLatitude,
          restaurant.restaurantLongitude
        );

        const markerImage = createMarkerImage(index + 1);

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        markersRef.current.push(marker);
        return marker;
      });

      // 클러스터에 마커들 추가
      clusterRef.current.addMarkers(newMarkers);
    }
  }, [restaurantData]);

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
    clusterRef.current?.clear();
    // 기존 마커들 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
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
