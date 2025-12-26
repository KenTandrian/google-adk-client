export interface ApiClient {
  appName: string;
  userId: string;
  requestJson: <T>(endpoint: string, options?: RequestInit) => Promise<T>;
  request: (endpoint: string, options?: RequestInit) => Promise<Response>;
}
