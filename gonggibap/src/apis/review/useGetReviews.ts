import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BaseResponse, ErrorResponse } from '@/types/apiResponse';
import { GetReviewResponse } from '@/types/review';

import { client } from '@/apis/core/client';

import { QUERY_KEYS } from '@/constants/queryKeys';

const getReviews = async (
  restaurantId: number,
  page: number,
): Promise<GetReviewResponse> => {
  const params: Record<string, number> = {
    page,
  };
  const response = await client.get<BaseResponse<GetReviewResponse>>({
    url: `reviews/restaurant/${restaurantId}`,
    params,
  });
  return response.data;
};

export const useGetReviews = (
  restaurantId: number,
  page: number,
): UseQueryResult<GetReviewResponse, AxiosError<ErrorResponse>> => {
  return useQuery<GetReviewResponse, AxiosError<ErrorResponse>>({
    queryKey: QUERY_KEYS.REVIEW.DETAIL(restaurantId, page),
    queryFn: () => getReviews(restaurantId, page),
    enabled: !!restaurantId,
    staleTime: 1000 * 60 * 5,
  });
};
