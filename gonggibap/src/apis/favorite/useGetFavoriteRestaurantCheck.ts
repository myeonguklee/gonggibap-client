import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BaseResponse, ErrorResponse } from '@/types/apiResponse';

import { client } from '@/apis/core/client';

import { QUERY_KEYS } from '@/constants/queryKeys';

interface GetFavoriteRestaurantCheckResponse {
  favoriteStatus: boolean;
  restaurantId: number;
}

const getFavoriteRestaurantCheck = async (
  restaurantId: number,
): Promise<GetFavoriteRestaurantCheckResponse> => {
  const response = await client.get<
    BaseResponse<GetFavoriteRestaurantCheckResponse>
  >({
    url: `/restaurants/favorite/${restaurantId}/check`,
  });
  return response.data;
};

export const useGetFavoriteRestaurantCheck = (
  restaurnatId: number,
  options?: { enabled: boolean },
): UseQueryResult<
  GetFavoriteRestaurantCheckResponse,
  AxiosError<ErrorResponse>
> => {
  return useQuery<
    GetFavoriteRestaurantCheckResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: QUERY_KEYS.FAVORITE.CHECK(restaurnatId),
    queryFn: () => getFavoriteRestaurantCheck(restaurnatId),
    enabled: options?.enabled,
  });
};
