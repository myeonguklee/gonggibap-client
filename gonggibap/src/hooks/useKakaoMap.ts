import { useEffect, useRef, useState, useCallback } from 'react';

import { Polygon } from '@/types/restaurant';

import { useCurrentLocation } from '@/hooks/useCurrentLocation';

import {
  MARKER_TEMPLATES,
  MARKER_DIMENSIONS,
  MARKER_Z_INDEX,
} from '@/constants/marker';



interface UseKakaoMapProps {
  onPolygonChange: (polygon: Polygon) => void;
}

export const useKakaoMap = ({ onPolygonChange }: UseKakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const currentLocationMarkerRef = useRef<kakao.maps.Marker | null>(null);
  const { getCurrentLocation } = useCurrentLocation();

  const handleSearch = useCallback(() => {
    if (!mapInstanceRef.current) return;

    const bounds = mapInstanceRef.current.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    onPolygonChange({
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
  }, [onPolygonChange]);

  // 드래그 이벤트
  const setupMapEventListeners = useCallback((map: kakao.maps.Map) => {
    // 드래그 시작
    kakao.maps.event.addListener(map, 'dragstart', () => {
      setIsDragging(true);
    });

    // 드래드 종료
    kakao.maps.event.addListener(map, 'dragend', () => {
      setIsDragging(false);
    });

    // 줌 변경 시작
    kakao.maps.event.addListener(map, 'zoom_start', () => {
      setIsDragging(true);
    });

    // 줌 변경 종료
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      setIsDragging(false);
    });
  }, []);

  const createCurrentLocationMarker = useCallback(
    (map: kakao.maps.Map, position: { lat: number; lng: number }) => {
      // 기존 위치 마커가 있으면 제거
      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.setMap(null);
      }

      const { size, offset } = MARKER_DIMENSIONS.CURRENT_LOCATION;

      const imageSize = new window.kakao.maps.Size(size.width, size.height);
      const imageOption = {
        offset: new window.kakao.maps.Point(offset.x, offset.y),
      };

      const markerImage = new window.kakao.maps.MarkerImage(
        'data:image/svg+xml;charset=utf-8,' +
          encodeURIComponent(MARKER_TEMPLATES.CURRENT_LOCATION),
        imageSize,
        imageOption,
      );

      const markerPosition = new window.kakao.maps.LatLng(
        position.lat,
        position.lng,
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        zIndex: MARKER_Z_INDEX.CURRENT_LOCATION,
      });

      marker.setMap(map);
      currentLocationMarkerRef.current = marker;

      return marker;
    },
    [],
  );

  const handleMapInitError = useCallback(
    (error: unknown) => {
      if (!mapRef.current) return;

      if (error instanceof GeolocationPositionError) {
        if (error.code === 1) {
          alert('위치 권한을 허용해주세요');
        }
        if (error.code === 2) {
          alert('위치를 가져올 수 없습니다');
        }
      }

      // 기본 위치(강남구청)로 초기화
      const options = {
        center: new window.kakao.maps.LatLng(37.517139, 127.047523),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);
      mapInstanceRef.current = map;

      setupMapEventListeners(map);

      handleSearch();
    },
    [handleSearch, setupMapEventListeners],
  );

  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      const { latitude: lat, longitude: lng } = await getCurrentLocation();
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      mapInstanceRef.current = map;

      setupMapEventListeners(map);

      // 현재 위치 마커 이미지 생성
      createCurrentLocationMarker(map, { lat, lng });
      handleSearch();
    } catch (error) {
      handleMapInitError(error);
    }
  }, [
    getCurrentLocation,
    handleSearch,
    handleMapInitError,
    setupMapEventListeners,
    createCurrentLocationMarker,
  ]);

  const moveToCurrentLocation = useCallback(async () => {
    try {
      const { latitude: lat, longitude: lng } = await getCurrentLocation();

      if (!mapInstanceRef.current) return;

      mapInstanceRef.current.setCenter(new window.kakao.maps.LatLng(lat, lng));
      mapInstanceRef.current.setLevel(3);
      createCurrentLocationMarker(mapInstanceRef.current, { lat, lng });
      handleSearch();
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        if (error.code === 1) {
          alert('위치 권한을 허용해주세요');
        }
        if (error.code === 2) {
          alert('위치를 가져올 수 없습니다');
        }
      }
    }
  }, [getCurrentLocation, handleSearch, createCurrentLocationMarker]);

  // 카카오맵 SDK 초기화 후 mapLoaded 상태 변경
  const onKakaoMapLoad = () => {
    window.kakao.maps.load(() => {
      setMapLoaded(true);
    });
  };

  // mapLoaded가 true가 되면 지도 초기화
  useEffect(() => {
    if (mapLoaded) {
      initializeMap();
    }
  }, [mapLoaded, initializeMap]);

  return {
    mapRef,
    mapInstance: mapInstanceRef.current,
    handleSearch,
    moveToCurrentLocation,
    onKakaoMapLoad,
    isDragging,
  };
};
