export interface GetReviewResponse {
  totalPages: number;
  content: Review[];
}

export interface Review {
  reviewId: number;
  userId: number;
  userName: string;
  userReviewAvg: number;
  userReviewCount: number;
  point: number;
  content: string;
  date: string;
  imageUrls: string[];
}
