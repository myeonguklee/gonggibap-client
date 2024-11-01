import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { BaseResponse, ErrorResponse } from "@/types/apiResponse";
import { GetRestaurantsResponse } from "@/types/restaurant";
import { useAuthStore } from "@/store/useAuthStore";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/queryKeys";

const getFavoriteRestaurants = async (): Promise<GetRestaurantsResponse> => {
  const response = await client.get<BaseResponse<GetRestaurantsResponse>>({
    url: "restaurants/favorite",
  });
  return response.data;
};

export const useGetFavoriteRestaurants = (): UseQueryResult<
  GetRestaurantsResponse,
  AxiosError<ErrorResponse>
> => {
  const { isLogin } = useAuthStore();
  return useQuery<GetRestaurantsResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEYS.FAVORITE.ALL],
    queryFn: () => getFavoriteRestaurants(),
    enabled: isLogin,
    staleTime: 1000 * 60 * 5,
  });
};
