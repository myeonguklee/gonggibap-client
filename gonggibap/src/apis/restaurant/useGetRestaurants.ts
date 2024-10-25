import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse, ErrorResponse } from "@/types/apiResponse";
import { GetRestaurantsResponse, Polygon } from "@/types/restaurant";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/queryKeys";

const getRestaurants = async (
  polygon: Polygon,
  page: number
): Promise<GetRestaurantsResponse> => {
  const latitudes = [
    polygon.firstCoordinate.latitude,
    polygon.secondCoordinate.latitude,
    polygon.thirdCoordinate.latitude,
    polygon.fourthCoordinate.latitude,
  ].join(",");

  const longitudes = [
    polygon.firstCoordinate.longitude,
    polygon.secondCoordinate.longitude,
    polygon.thirdCoordinate.longitude,
    polygon.fourthCoordinate.longitude,
  ].join(",");
  const response = await client.get<BaseResponse<GetRestaurantsResponse>>({
    url: "/restaurants",
    params: { latitudes, longitudes, page },
  });

  return response.data;
};

export const useGetRestaurants = (
  polygon: Polygon | null,
  page: number
): UseQueryResult<GetRestaurantsResponse, AxiosError<ErrorResponse>> => {
  return useQuery<GetRestaurantsResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEYS.RESTAURANT.ALL, polygon],
    queryFn: () => getRestaurants(polygon!, page),
    enabled: !!polygon,
    staleTime: 1000 * 60 * 5,
  });
};
