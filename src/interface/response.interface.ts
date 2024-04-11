export interface ApiResponse<T> {
  status: 'success' | 'error';
  statusCode: number;
  data?: T;
}