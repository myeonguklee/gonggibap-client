export interface Review {
  reviewId: number;
  userId: number;
  userName: string;
  point: number;
  content: string;
  date: string;
  imageUrls: string[];
}