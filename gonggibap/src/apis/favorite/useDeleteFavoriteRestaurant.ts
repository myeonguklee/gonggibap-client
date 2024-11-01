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

const deleteFavoriteRestaurant = async (
  restaurantId: number
): Promise<void> => {
  await client.delete<BaseResponse<void>>({
    url: `restaurant/favorites/${restaurantId}`,
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
    onSuccess: () => {
      toast.success("찜한 식당 삭제");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FAVORITE.ALL],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("찜한 식당 삭제 실패");
    },
  });
};
