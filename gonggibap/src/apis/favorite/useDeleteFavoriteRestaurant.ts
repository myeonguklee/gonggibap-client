import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { BaseResponse, ErrorResponse } from '@/types/apiResponse';

import { client } from '@/apis/core/client';

import { QUERY_KEYS } from '@/constants/queryKeys';







const deleteFavoriteRestaurant = async (
  restaurantId: number,
): Promise<void> => {
  await client.delete<BaseResponse<void>>({
    url: `/restaurants/favorite/${restaurantId}`,
  });
};

export const useDeleteFavoriteRestaurant = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFavoriteRestaurant,
    onSuccess: (_, restaurantId) => {
      toast.success('찜한 식당 삭제');
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FAVORITE.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FAVORITE.CHECK(restaurantId),
      });
    },
    onError: (error) => {
      switch (error.response?.status) {
        case 404:
          toast.error('맛집 리스트에 없어서 취소할 수 없어요');
          break;
        default:
          toast.error('맛집 제거에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
    },
  });
};
