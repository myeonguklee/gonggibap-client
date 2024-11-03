import { useCallback } from 'react';
import { Coordinate } from '@/types/restaurant';

interface UseCurrentLocationReturn {
  getCurrentLocation: () => Promise<Coordinate>; // 위치를 가져오는 함수
}

export const useCurrentLocation = (): UseCurrentLocationReturn => {
  const getCurrentLocation = useCallback(async (): Promise<Coordinate> => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to get location');
      throw error;
    }
  }, []);
  return { getCurrentLocation };
};
