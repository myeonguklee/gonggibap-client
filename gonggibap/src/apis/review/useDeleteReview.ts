import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { BaseResponse, ErrorResponse } from '@/types/apiResponse';

import { client } from '@/apis/core/client';

import { QUERY_KEYS } from '@/constants/queryKeys';

interface DeleteReviewParams {
  reviewId: number;
  restaurantId: number;
}

const deleteReview = async ({
  reviewId,
}: DeleteReviewParams): Promise<void> => {
  await client.delete<BaseResponse<void>>({
    url: `reviews/${reviewId}`,
  });
};

export const useDeleteReview = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  DeleteReviewParams
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReview,
    onSuccess: (_, params) => {
      // 리뷰 삭제 성공 시
      toast.success('리뷰가 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEW.DETAIL(params.restaurantId),
      });
    },
    onError: (error) => {
      // 리뷰 삭제 실패 시
      switch (error.response?.status) {
        case 400:
          // s3 파일 삭제 실패
          toast.error('사진 파일 삭제에 실패했습니다.');
          break;
        case 404:
          toast.error('존재하지 않는 리뷰입니다.');
          break;
        default:
          toast.error('리뷰 삭제에 실패했습니다.');
      }
    },
  });
};
