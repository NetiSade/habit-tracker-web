import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "../tokenStorage";
import { getApiUrl } from "./utils";

const LOG_TAG = "[API_CLIENT]";

const API_URL = getApiUrl();

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Type guard to ensure originalRequest exists
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Check if error is 401 and we haven't retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest.headers["X-Retry-Count"]
    ) {
      // Mark this request as retried
      originalRequest.headers["X-Retry-Count"] = "1";

      try {
        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(`${API_URL}/refresh-token`, {
          refreshToken,
        });

        const { accessToken } = response.data;

        // Store new tokens
        tokenStorage.storeTokens({
          accessToken,
          refreshToken, // Keep existing refresh token if new one isn't provided
        });

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Clear tokens and reject the promise
        tokenStorage.clearTokens();

        // You might want to trigger a logout action or redirect here
        window.dispatchEvent(new CustomEvent("auth:logout"));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

if (import.meta.env.DEV) {
  // Log requests in development
  apiClient.interceptors.request.use((request) => {
    console.log("~ Starting Request:", request);
    return request;
  });

  // Log responses in development
  apiClient.interceptors.response.use((response) => {
    console.log(LOG_TAG, "Response:", response);
    return response;
  });
}

// Log responses in development
if (import.meta.env.DEV) {
  apiClient.interceptors.response.use((response) => {
    console.log(LOG_TAG, "~ Response:", response);
    return response;
  });
}
