import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse, ErrorResponse } from "@/types/apiResponse";
import { GetHistoriesResponse } from "@/types/history";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/queryKeys";

const getHistories = async (
  restaurantId: number
): Promise<GetHistoriesResponse> => {
  const response = await client.get<BaseResponse<GetHistoriesResponse>>({
    url: `histories/${restaurantId}`,
  });
  return response.data;
};

export const useGetHistories = (
  restaurantId: number
): UseQueryResult<GetHistoriesResponse, AxiosError<ErrorResponse>> => {
  return useQuery<GetHistoriesResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEYS.HISTORY.DETAIL(restaurantId)],
    queryFn: () => getHistories(restaurantId),
    enabled: !!restaurantId,
    staleTime: 1000 * 60 * 5,
  });
};
