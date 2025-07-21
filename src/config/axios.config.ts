import axios from "axios";

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
export const BASE_URL: string = `${API_BASE_URL}/api`;

export const axiosInstance = axios.create({ baseURL: BASE_URL });

export const setAuthInterceptor = async (token: string | null) => {
  return axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers.Authorization = undefined;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
