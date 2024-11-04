import { apiClient } from "./client";

export const api = {
  get: <T>(url: string, config = {}) =>
    apiClient.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data?: unknown, config = {}) =>
    apiClient.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data?: unknown, config = {}) =>
    apiClient.put<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config = {}) =>
    apiClient.delete<T>(url, config).then((response) => response.data),

  patch: <T>(url: string, data?: unknown, config = {}) =>
    apiClient.patch<T>(url, data, config).then((response) => response.data),
};
