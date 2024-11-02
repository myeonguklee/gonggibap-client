import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { BaseResponse, ErrorResponse } from "@/types/apiResponse";
import { client } from "@/apis/core/client";
import { QUERY_KEYS } from "@/constants/queryKeys";

const createFavoriteRestaurant = async (
  restaurantId: number
): Promise<void> => {
  await client.post<BaseResponse<void>>({
    url: `restaurants/favorite/${restaurantId}`,
  });
};

export const useCreateFavoriteRestaurant = (): UseMutationResult<
  void,
  AxiosError<ErrorResponse>,
  number
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFavoriteRestaurant,
    onSuccess: () => {
      toast.success("나의 맛집 리스트에 저장됐습니다.");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAVORITE.ALL],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("맛집 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    },
  });
};
