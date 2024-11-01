import { AxiosError } from "axios";
import { useSuspenseQuery, UseSuspenseQueryResult } from "@tanstack/react-query";
import { BaseResponse, ErrorResponse } from "@/types/apiResponse";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { GetRestaurantsResponse } from "@/types/restaurant";

const getFavoriteRestaurants = async (): Promise<GetRestaurantsResponse> => {
  const response = await client.get<BaseResponse<GetRestaurantsResponse>>({
    url: "restaurants/favorite",
  });
  return response.data;
};

export const useGetFavoriteRestaurants = (
): UseSuspenseQueryResult<GetRestaurantsResponse, AxiosError<ErrorResponse>> => {
  return useSuspenseQuery<GetRestaurantsResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEYS.FAVORITE.ALL],
    queryFn: () => getFavoriteRestaurants(),
    staleTime: 1000 * 60 * 5,
  });
};
