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
  polygon: Polygon,
  page: number,
  category: RestaurantDetailCategory,
): Promise<GetRestaurantsResponse> => {
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

  const params: Record<string, string | number> = {
    latitudes,
    longitudes,
    page,
  };
  // category가 null이 아닐때만 params에 추가
  if (category !== null) {
    params.category = category;
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
): UseQueryResult<GetRestaurantsResponse, AxiosError<ErrorResponse>> => {
  return useQuery<GetRestaurantsResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEYS.RESTAURANT.ALL, polygon, category, page],
    queryFn: () => getRestaurants(polygon!, page, category),
    enabled: !!polygon,
    staleTime: 1000 * 60 * 5,
  });
};
