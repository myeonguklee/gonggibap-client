const updateReview = async(): Promise<void> => {
  // Review 수정 로직
}

export const useUpdateReview = (): () => void => {
  return updateReview;
};