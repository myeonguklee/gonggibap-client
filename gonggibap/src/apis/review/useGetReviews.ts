import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { BaseResponse, ErrorResponse } from '@/types/apiResponse';
import { Review } from '@/types/review';
import { client } from '@/apis/core/client';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getReviews = async (restaurantId: number): Promise<Review[]> => {
  const response = await client.get<BaseResponse<Review[]>>({
    url: `reviews/restaurant/${restaurantId}`,
  });
  return response.data;
};

export const useGetReviews = (
  restaurantId: number,
): UseQueryResult<Review[], AxiosError<ErrorResponse>> => {
  return useQuery<Review[], AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEYS.REVIEW.DETAIL(restaurantId)],
    queryFn: () => getReviews(restaurantId),
    enabled: !!restaurantId,
    staleTime: 1000 * 60 * 5,
  });
};
