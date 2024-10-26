import { client } from "@/apis/core/client";
import { BaseResponse, ErrorResponse } from "@/types/apiResponse";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const deleteReview = async (reviewId: number): Promise<void> => {
  // Review 삭제 로직
  await client.delete<BaseResponse<void>>({
    url: `reviews/${reviewId}`,
  });
};

export const useDeleteReview = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  number,
  unknown
> => {
  return useMutation({
    mutationFn: deleteReview,
  });
};
