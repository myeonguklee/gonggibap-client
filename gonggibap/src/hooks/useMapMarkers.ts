import { useRef, useEffect, useCallback } from 'react';

import { Restaurant } from '@/types/restaurant';

import {
  MARKER_TEMPLATES,
  MARKER_DIMENSIONS,
  MARKER_Z_INDEX,
} from '@/constants/marker';

interface MarkerProps {
  map: kakao.maps.Map | null;
  restaurants: Restaurant[];
  cluster: kakao.maps.MarkerClusterer | null;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
}

export const useMapMarkers = ({
  map,
  restaurants,
  cluster,
  selectedRestaurantId,
  onRestaurantSelect,
}: MarkerProps) => {
  const markersRef = useRef<kakao.maps.Marker[]>([]);

  const clearMarkersAndCluster = useCallback(() => {
    cluster?.clear();
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, [cluster]);
  // 기본 마커 스타일
  const createMarkerImage = (number: number) => {
    const svg = MARKER_TEMPLATES.DEFAULT.replace(
      '${number}',
      number.toString(),
    );
    const markerSize = new window.kakao.maps.Size(
      MARKER_DIMENSIONS.DEFAULT.size.width,
      MARKER_DIMENSIONS.DEFAULT.size.height,
    );
    const markerOption = {
      offset: new window.kakao.maps.Point(
        MARKER_DIMENSIONS.DEFAULT.offset.x,
        MARKER_DIMENSIONS.DEFAULT.offset.y,
      ),
    };

    return new window.kakao.maps.MarkerImage(
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
      markerSize,
      markerOption,
    );
  };

  // 선택된 마커 스타일
  const createSelectedMarkerImage = (number: number) => {
    const svg = MARKER_TEMPLATES.SELECTED.replace(
      '${number}',
      number.toString(),
    );

    const markerSize = new window.kakao.maps.Size(
      MARKER_DIMENSIONS.SELECTED.size.width,
      MARKER_DIMENSIONS.SELECTED.size.height,
    );
    const markerOption = {
      offset: new window.kakao.maps.Point(
        MARKER_DIMENSIONS.SELECTED.offset.x,
        MARKER_DIMENSIONS.SELECTED.offset.y,
      ),
    };

    return new window.kakao.maps.MarkerImage(
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
      markerSize,
      markerOption,
    );
  };

  useEffect(() => {
    if (!map || restaurants.length < 1 || !cluster) return;

    if (markersRef.current.length === 0) {
      const newMarkers = restaurants.map((restaurant, index) => {
        const markerPosition = new window.kakao.maps.LatLng(
          restaurant.restaurantLatitude,
          restaurant.restaurantLongitude,
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: createMarkerImage(index + 1),
        });

        // 마커에 restaurant 정보 저장(클릭 이벤트에서 사용)
        // @ts-expect-error - kakao.maps.Marker type does not include restaurantId property
        marker.restaurantId = restaurant.restaurantId;

        // 클릭 이벤트 추가
        window.kakao.maps.event.addListener(marker, 'click', () => {
          onRestaurantSelect(restaurant.restaurantId);
        });

        markersRef.current.push(marker);
        return marker;
      });

      cluster.addMarkers(newMarkers);
    }
    // 선택된 마커 스타일 변경
    markersRef.current.forEach((marker, index) => {
      // @ts-expect-error - kakao.maps.Marker type does not include restaurantId property
      if (marker.restaurantId === selectedRestaurantId) {
        // 선택된 마커는 다른 스타일 적용
        marker.setImage(createSelectedMarkerImage(index + 1));
        marker.setZIndex(MARKER_Z_INDEX.SELECTED);
      } else {
        // 선택되지 않은 마커는 기본 스타일
        marker.setImage(createMarkerImage(index + 1));
        marker.setZIndex(MARKER_Z_INDEX.DEFAULT);
      }
    });

    return () => {
      clearMarkersAndCluster();
    };
  }, [
    map,
    restaurants,
    cluster,
    selectedRestaurantId,
    onRestaurantSelect,
    clearMarkersAndCluster,
  ]);

  return {
    markers: markersRef.current,
    clearMarkers: clearMarkersAndCluster,
  };
};
