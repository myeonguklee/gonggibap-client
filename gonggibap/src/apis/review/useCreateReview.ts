const createReview = async(): Promise<void> => {
  // Review 생성 로직
}

export const useCreateReview = (): () => void => {
  return createReview;
};