import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { BaseResponse } from "@/types/apiResponse";
import { Restaurant, Polygon, Coordinate } from "@/types/restaurant";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/routeURL";

const getRestaurants = async (polygon: Polygon): Promise<Restaurant[]> => {
  const response = await client.get<BaseResponse<Restaurant[]>>({
    url: "/restaurant/polygon",
    data: polygon,
  });
  return response.data;
};

export const useGetRestaurants = (
  polygon: Polygon
): UseQueryResult<Restaurant[], Error> => {
  return useQuery<Restaurant[], Error>({
    queryKey: QUERY_KEYS.RESTAURENT.ALL,
    queryFn: () => getRestaurants(polygon),
  });
};
