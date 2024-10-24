const getReviews = async(): Promise<void> => {
  // Review 조회 로직
}

export const useGetReviews = (): () => void => {
  return getReviews;
};