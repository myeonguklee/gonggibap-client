import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse, ErrorResponse } from "@/types/apiResponse";
import { Restaurant } from "@/types/restaurant";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/queryKeys";

const getRestaurant = async (restaurantId: number): Promise<Restaurant> => {
  const response = await client.get<BaseResponse<Restaurant>>({
    url: `/restaurants/${restaurantId}`,
  });

  return response.data;
};

export const useGetRestaurant = (
  restaurantId: number
): UseQueryResult<Restaurant, AxiosError<ErrorResponse>> => {
  return useQuery<Restaurant, AxiosError<ErrorResponse>>({
    queryKey: QUERY_KEYS.RESTAURANT.DETAIL(restaurantId),
    queryFn: () => getRestaurant(restaurantId),
  });
};
