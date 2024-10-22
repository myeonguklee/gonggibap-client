import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { BaseResponse } from "@/types/apiResponse";
import { Restaurant, Polygon } from "@/types/restaurant";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/queryKeys";

const getRestaurants = async (polygon: Polygon): Promise<Restaurant[]> => {
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
  const response = await client.get<BaseResponse<Restaurant[]>>({
    url: "/restaurant/polygon",
    params: { latitudes, longitudes },
  });
  if (!response || !response.data) {
    return [];
  }

  return response.data;
};

export const useGetRestaurants = (
  polygon: Polygon | null
): UseQueryResult<Restaurant[], Error> => {
  return useQuery<Restaurant[], Error>({
    queryKey: [QUERY_KEYS.RESTAURANT.ALL, polygon],
    queryFn: () => getRestaurants(polygon!),
    enabled: !!polygon,
    staleTime: 1000 * 60 * 5,
  });
};
