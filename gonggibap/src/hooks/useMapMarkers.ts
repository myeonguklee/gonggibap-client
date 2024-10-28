import { useRef, useEffect } from "react";
import { Restaurant } from "@/types/restaurant";

const MARKER_SVG_TEMPLATE = `
<svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
  </defs>
  <path d="M18 0C8.07 0 0 8.07 0 18C0 31.5 18 48 18 48C18 48 36 31.5 36 18C36 8.07 27.93 0 18 0Z" 
    fill="white"
    filter="url(#shadow)"
  />
  <path d="M18 2C9.17 2 2 9.17 2 18C2 29.5 18 44 18 44C18 44 34 29.5 34 18C34 9.17 26.83 2 18 2Z" 
    fill="#FF7058"
  />
  <text 
    x="50%" 
    y="43%" 
    text-anchor="middle" 
    dy=".3em" 
    fill="white" 
    font-size="16"
    font-family="Arial, sans-serif"
    font-weight="bold"
  >\${number}</text>
</svg>`;

const MARKER_SIZE = {
  width: 36,
  height: 48,
};

const MARKER_OFFSET = {
  x: 18,
  y: 48,
};

interface MarkerProps {
  map: kakao.maps.Map | null;
  restaurants: Restaurant[];
  cluster: kakao.maps.MarkerClusterer | null;
}

export const useMapMarkers = ({ map, restaurants, cluster }: MarkerProps) => {
  const markersRef = useRef<kakao.maps.Marker[]>([]);

  const clearMarkersAndCluster = () => {
    cluster?.clear();
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const createMarkerImage = (number: number) => {
    const svg = MARKER_SVG_TEMPLATE.replace("${number}", number.toString());
    const markerSize = new window.kakao.maps.Size(
      MARKER_SIZE.width,
      MARKER_SIZE.height
    );
    const markerOption = {
      offset: new window.kakao.maps.Point(MARKER_OFFSET.x, MARKER_OFFSET.y),
    };

    return new window.kakao.maps.MarkerImage(
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg),
      markerSize,
      markerOption
    );
  };

  useEffect(() => {
    if (!map || restaurants.length < 1 || !cluster) return;

    if (markersRef.current.length === 0) {
      const newMarkers = restaurants.map((restaurant, index) => {
        const markerPosition = new window.kakao.maps.LatLng(
          restaurant.restaurantLatitude,
          restaurant.restaurantLongitude
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: createMarkerImage(index + 1),
        });

        markersRef.current.push(marker);
        return marker;
      });

      cluster.addMarkers(newMarkers);
    }

    return () => {
      clearMarkersAndCluster();
    };
  }, [map, restaurants, cluster]);

  return {
    markers: markersRef.current,
    clearMarkers: clearMarkersAndCluster,
  };
};
