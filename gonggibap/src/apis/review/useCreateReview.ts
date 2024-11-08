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

export interface CreateReviewDTO {
  restaurantId: number;
  content: string;
  point: number;
  images?: File[];
}

interface UseCreateReviewOptions {
  onSuccess?: () => void;
}

const createReview = async ({
  restaurantId,
  content,
  point,
  images = [],
}: CreateReviewDTO): Promise<void> => {
  const formData = new FormData();

  // required
  formData.append('content', content);
  formData.append('point', point.toString());

  // images는 항상 배열이므로 (undefined가 될 수 없음)
  // 바로 forEach 실행
  images.forEach((image) => {
    formData.append('images', image);
  });

  await client.post<BaseResponse<void>>({
    url: `reviews/restaurant/${restaurantId}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useCreateReview = (
  options?: UseCreateReviewOptions,
): UseMutationResult<void, AxiosError<ErrorResponse>, CreateReviewDTO> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReview,
    onSuccess: (_, formData) => {
      toast.success('리뷰가 등록되었습니다.');
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.REVIEW.DETAIL(formData.restaurantId),
      });
      options?.onSuccess?.();
    },
    onError: (error) => {
      switch (error.response?.status) {
        case 404:
          toast.error('존재하지 않는 식당입니다.');
          break;
        default:
          toast.error('리뷰 등록에 실패했습니다.');
      }
    },
  });
};
