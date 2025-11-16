export interface BaseResponse {
  success: boolean;
  message: string | null;
  timestamp: string;
  errorCode: string | null;
}
