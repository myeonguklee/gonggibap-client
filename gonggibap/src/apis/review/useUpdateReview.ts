import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { BaseResponse, ErrorResponse } from '@/types/apiResponse';

import { client } from '@/apis/core/client';
import { CreateReviewDTO } from '@/apis/review/useCreateReview';

import { QUERY_KEYS } from '@/constants/queryKeys';

// reviewId만 추가
interface UpdateReviewDTO extends CreateReviewDTO {
  reviewId: number;
}

interface UseReviewOptions {
  onSuccess?: () => void;
}

const updateReview = async ({
  reviewId,
  restaurantId,
  content,
  point,
  images = [],
}: UpdateReviewDTO): Promise<void> => {
  const formData = new FormData();
  formData.append('restaurantId', restaurantId.toString());
  formData.append('content', content);
  formData.append('point', point.toString());

  images.forEach((image) => {
    formData.append('images', image);
  });

  await client.put<BaseResponse<void>>({
    url: `reviews/${reviewId}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUpdateReview = (
  options?: UseReviewOptions,
): UseMutationResult<void, AxiosError<ErrorResponse>, UpdateReviewDTO> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReview,
    onSuccess: (_, formData) => {
      toast.success('리뷰가 수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEW.DETAIL(
          formData.restaurantId,
          formData.page,
        ),
      });
      options?.onSuccess?.();
    },
    onError: (error) => {
      switch (error.response?.status) {
        case 404:
          toast.error('존재하지 않는 리뷰입니다.');
          break;
        default:
          toast.error('리뷰 수정에 실패했습니다.');
      }
    },
  });
};
