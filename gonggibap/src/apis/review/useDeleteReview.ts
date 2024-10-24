const deleteReview = async (): Promise<void> => {
  // Review 삭제 로직
}

export const useDeleteReview = (): () => void => {
  return deleteReview;
};