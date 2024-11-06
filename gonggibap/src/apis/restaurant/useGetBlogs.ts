import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BaseResponse, ErrorResponse } from '@/types/apiResponse';
import { Blog } from '@/types/restaurant';
import { client } from '@/apis/core/client';
import { QUERY_KEYS } from '@/constants/queryKeys';

const getBlogs = async (restaurantId: number): Promise<Blog[]> => {
  const response = await client.get<BaseResponse<Blog[]>>({
    url: `/restaurants/${restaurantId}/blog`,
  });
  return response.data;
};

export const useGetBlogs = (
  restaurantId: number,
): UseQueryResult<Blog[], AxiosError<ErrorResponse>> => {
  return useQuery<Blog[], AxiosError<ErrorResponse>>({
    queryFn: () => getBlogs(restaurantId),
    queryKey: QUERY_KEYS.RESTAURANT.BLOG(restaurantId),
  });
};
