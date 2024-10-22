import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { BaseResponse } from "@/types/apiResponse";
import { Restaurant, Polygon } from "@/types/restaurant";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/routeURL";

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
  return response.data ?? [];
};

export const useGetRestaurants = (
  polygon: Polygon | null
): UseQueryResult<Restaurant[], Error> => {
  return useQuery<Restaurant[], Error>({
    queryKey: [QUERY_KEYS.RESTAURENT.ALL, polygon],
    queryFn: () => {
      if (!polygon) {
        return Promise.resolve([]);
      }
      return getRestaurants(polygon!);
    },
    enabled: !!polygon,
    staleTime: 1000 * 60 * 5,
  });
};
