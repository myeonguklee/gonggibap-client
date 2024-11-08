import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BaseResponse, ErrorResponse } from '@/types/apiResponse';
import { GetHistoriesResponse } from '@/types/history';

import { client } from '@/apis/core/client';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { useEffect } from 'react';
import { getVisiblePageNumbers } from '@/utils/getVisiblePageNumbers ';

const getHistories = async (
  restaurantId: number,
  page: number,
): Promise<GetHistoriesResponse> => {
  const params: Record<string, number> = {
    page,
  };
  const response = await client.get<BaseResponse<GetHistoriesResponse>>({
    url: `histories/${restaurantId}`,
    params,
  });
  return response.data;
};

export const useGetHistories = (
  restaurantId: number,
  page: number,
): UseQueryResult<GetHistoriesResponse, AxiosError<ErrorResponse>> => {
  const queryClient = useQueryClient();  

    // 기본 쿼리
    const query = useQuery<GetHistoriesResponse, AxiosError<ErrorResponse>>({
      queryKey: QUERY_KEYS.HISTORY.DETAIL(restaurantId, page),
      queryFn: () => getHistories(restaurantId, page),
      enabled: !!restaurantId,
      staleTime: Infinity,
    });
  
    // 프리페칭 로직
    useEffect(() => {
      if (restaurantId && query.data?.totalPages) {
        const visiblePages = getVisiblePageNumbers(page, query.data.totalPages);
        
        visiblePages.forEach((targetPage) => {
          if (targetPage !== page) {
            queryClient.prefetchQuery({
              queryKey: QUERY_KEYS.HISTORY.DETAIL(restaurantId, targetPage),
              queryFn: () => getHistories(restaurantId, targetPage),
              staleTime: Infinity,
            });
          }
        });
      }
    }, [queryClient, restaurantId, page, query.data?.totalPages]);
  
    return query;
  };