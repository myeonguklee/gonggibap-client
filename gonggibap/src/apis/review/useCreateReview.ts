import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BaseResponse, ErrorResponse } from '@/types/apiResponse';

import { client } from '@/apis/core/client';

interface CreateReviewDTO {
  restaurantId: number;
  content: string;
  point: number;
  images?: File[];
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

export const useCreateReview = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  CreateReviewDTO
> => {
  return useMutation({
    mutationFn: createReview,
  });
};
