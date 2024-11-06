import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BaseResponse, ErrorResponse } from '@/types/apiResponse';
import {
  GetRestaurantsResponse,
  Polygon,
  RestaurantDetailCategory,
} from '@/types/restaurant';

import { client } from '@/apis/core/client';

import { QUERY_KEYS } from '@/constants/queryKeys';

const getRestaurants = async (
  polygon: Polygon | null,
  page: number,
  category: RestaurantDetailCategory,
  search?: string,
): Promise<GetRestaurantsResponse> => {
  const params: Record<string, string | number> = {
    page,
  };

  // polygon이 있을때만 coodinates 추가
  if (polygon) {
    const latitudes = [
      polygon.firstCoordinate.latitude,
      polygon.secondCoordinate.latitude,
      polygon.thirdCoordinate.latitude,
      polygon.fourthCoordinate.latitude,
    ].join(',');

    const longitudes = [
      polygon.firstCoordinate.longitude,
      polygon.secondCoordinate.longitude,
      polygon.thirdCoordinate.longitude,
      polygon.fourthCoordinate.longitude,
    ].join(',');

    params.latitudes = latitudes;
    params.longitudes = longitudes;
  }
  if (category) {
    params.category = category;
  }

  if (search) {
    params.search = search;
  }

  const response = await client.get<BaseResponse<GetRestaurantsResponse>>({
    url: '/restaurants',
    params,
  });

  return response.data;
};

export const useGetRestaurants = (
  polygon: Polygon | null,
  page: number,
  category: RestaurantDetailCategory = null,
  search?: string,
): UseQueryResult<GetRestaurantsResponse, AxiosError<ErrorResponse>> => {
  return useQuery<GetRestaurantsResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEYS.RESTAURANT.ALL, polygon, category, page, search],
    queryFn: () => getRestaurants(polygon, page, category, search),
    staleTime: 1000 * 60 * 5,
  });
};
