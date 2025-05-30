export interface BaseResponse<T> {
  success: boolean;
  data: T;
}

export interface ErrorResponse {
  success: boolean;
  error: string;
}
