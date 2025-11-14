import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { reissueAccessToken } from '@api/reissueAccessToken';
import { applyAuthorizationHeader, tokenStorage } from '@utils/token';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions<
  TBody = unknown,
  TParams = Record<string, unknown>,
> {
  endpoint: string;
  method: HttpMethod;
  data?: TBody;
  params?: TParams;
  headers?: Record<string, string>;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (!token) return config;

    config.headers = config.headers || {};

    applyAuthorizationHeader(config.headers, token);

    return config;
  },
  error => Promise.reject(error)
);

export async function apiRequest<
  TResponse = unknown,
  TBody = unknown,
  TParams = Record<string, unknown>,
>({
  endpoint,
  method,
  data,
  params,
  headers,
}: ApiRequestOptions<TBody, TParams>): Promise<TResponse> {
  const axiosConfig = {
    url: endpoint,
    method,
    data,
    params,
    headers,
  };

  const response: AxiosResponse<TResponse> =
    await apiClient.request<TResponse>(axiosConfig);

  return response.data;
}

// Catch errors only when the access token has expired and reissue a new access token
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
apiClient.interceptors.response.use(
  response => response,

  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // TODO : change status
    if (status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = reissueAccessToken().finally(() => {
        isRefreshing = false;
      });
    }

    const newAccessToken = await refreshPromise;

    if (!newAccessToken) {
      tokenStorage.clearTokens();
      return Promise.reject(error);
    }

    originalRequest.headers = originalRequest.headers || {};

    applyAuthorizationHeader(originalRequest.headers, newAccessToken);

    return apiClient(originalRequest);
  }
);
