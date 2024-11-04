import axios from "axios";
import { apiClient } from "../../services/api/client";
import { persistService } from "../../services/persistService";
import { tokenStorage } from "../../services/tokenStorage";
import {
  AuthResponse,
  LoginResponse,
  SignupResponse,
  SilentLoginResponse,
} from "./types";

const LOG_PREFIX = "[AuthService]";

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken, userId } = response.data;

      tokenStorage.storeTokens({ accessToken, refreshToken });
      persistService.setUserId(userId);

      // Dispatch auth change event
      window.dispatchEvent(
        new CustomEvent("auth:changed", {
          detail: { isAuthenticated: true, userId },
        }),
      );

      return { success: true, userId };
    } catch (error) {
      console.error(LOG_PREFIX, "Login failed:", error);
      return {
        success: false,
        error,
      };
    }
  },

  signup: async (
    username: string,
    email: string,
    password: string,
  ): Promise<SignupResponse> => {
    try {
      console.log("signup");
      const response = await apiClient.post<{ userId: string }>(
        "auth/register",
        {
          username,
          email,
          password,
        },
      );

      if (!response.data.userId) {
        throw new Error("User ID not found in response");
      }

      persistService.setUserId(response.data.userId);

      return {
        success: true,
        userId: response.data.userId,
      };
    } catch (error) {
      console.error(LOG_PREFIX, "Signup failed:", error);
      return {
        success: false,
        error: error,
      };
    }
  },

  silentLogin: async (): Promise<SilentLoginResponse> => {
    try {
      const accessToken = tokenStorage.getAccessToken();

      const refreshToken = tokenStorage.getRefreshToken();

      if (!accessToken || !refreshToken) {
        return { success: false, userId: null };
      }

      try {
        const response = await apiClient.get<{
          isValid: boolean;
          userId: string;
        }>("/auth/verify-token");

        persistService.setUserId(response.data.userId);

        if (response.data.isValid) {
          window.dispatchEvent(
            new CustomEvent("auth:changed", {
              detail: { isAuthenticated: true, userId: response.data.userId },
            }),
          );
        }

        return { success: response.data.isValid, userId: response.data.userId };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            try {
              const refreshResponse = await apiClient.post<AuthResponse>(
                "/auth/refresh-token",
                {
                  refreshToken,
                },
              );

              const newAccessToken = refreshResponse.data.accessToken;
              await tokenStorage.storeTokens({
                accessToken: newAccessToken,
                refreshToken,
              });

              window.dispatchEvent(
                new CustomEvent("auth:changed", {
                  detail: {
                    isAuthenticated: true,
                    userId: refreshResponse.data.userId,
                  },
                }),
              );

              return { success: true, userId: refreshResponse.data.userId };
            } catch (refreshError) {
              console.error(LOG_PREFIX, "Token refresh failed:", refreshError);
              await tokenStorage.clearTokens();
              return { success: false, userId: null };
            }
          }
        }
        throw error; // Re-throw if it's not a 401 error
      }
    } catch (error) {
      console.error(LOG_PREFIX, "Silent login failed:", error);
      await tokenStorage.clearTokens();
      return { success: false, userId: null };
    }
  },

  logout: async () => {
    await tokenStorage.clearTokens();
    await persistService.clearAll();

    window.dispatchEvent(
      new CustomEvent("auth:changed", {
        detail: { isAuthenticated: false, userId: null },
      }),
    );
  },
};
