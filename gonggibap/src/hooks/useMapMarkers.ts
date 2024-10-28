import { useRef, useEffect } from "react";
import { Restaurant } from "@/types/restaurant";

interface MarkerProps {
  map: kakao.maps.Map | null;
  restaurants: Restaurant[];
  cluster: kakao.maps.MarkerClusterer | null;
}

export const useMapMarkers = ({ map, restaurants, cluster }: MarkerProps) => {
  const markersRef = useRef<kakao.maps.Marker[]>([]);

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

  // 마커 생성 및 관리
  useEffect(() => {
    if (!map || restaurants.length < 1 || !cluster) return;

    // 마커가 없을때만 새로 생성
    if (markersRef.current.length === 0) {
      const newMarkers = restaurants.map((restaurant, index) => {
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

      // 클러스터에 마커 추가
      cluster.addMarkers(newMarkers);
    }

    // 클린업
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      cluster.clear();
      markersRef.current = [];
    };
  }, [map, restaurants, cluster]);

  const clearMarkers = () => {
    cluster?.clear();
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  return {
    markers: markersRef.current,
    clearMarkers,
  };
};
