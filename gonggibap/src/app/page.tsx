"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      // 현재 위치를 가져오는 함수
      const getCurrentPosition = () => {
        return new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      };

      // 지도 초기화 함수
      const initializeMap = async () => {
        try {
          const position = await getCurrentPosition();
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);

          // 현재 위치에 마커 추가
          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        } catch (error) {
          console.error("Error getting current position:", error);
          // 위치 정보를 가져오는 데 실패한 경우, 기본 위치 사용
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          new window.kakao.maps.Map(mapRef.current, options);
        }
      };

      initializeMap();
    }
  }, [mapLoaded]);

  const onKakaoMapLoad = () => {
    window.kakao.maps.load(() => setMapLoaded(true));
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&libraries=services&autoload=false`}
        onLoad={onKakaoMapLoad}
      />
      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
    </>
  );
}
