import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { routeURL } from '@/constants/routeURL';
import { HTTP_METHODS } from '@/constants/http';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => res.data,

  // 우리 서비스에서 401에러는 3가지 상황에서 발생할 수 있음
  // 1. 로그인 한 유저의 토큰이 만료된 경우
  // 2. 로그인 하지 않은 유저가 인증이 필요한 API를 호출한 경우
  // 3. 잘못된 토큰으로 요청한 경우
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();

      // 1, 3번 케이스 : 로그아웃 처리 & 로그인 페이지로 리다이렉트
      if (authStore.isLogin) {
        authStore.logout();
      }

      // 2번 케이스 : 로그인 페이지로 리다이렉트
      window.location.href = routeURL.login;
    }
    return Promise.reject(error);
  },
);

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  <T>(config: AxiosRequestConfig): Promise<T> => {
    return _axiosInstance({
      ...config,
      method: methodType,
    });
  };

export const client = {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHODS.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};
