export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginResponse {
  success: boolean;
  userId?: string;
  error?: unknown;
}

export interface SignupResponse {
  success: boolean;
  userId?: string;
  error?: unknown;
}

export interface SilentLoginResponse {
  success: boolean;
  userId: string | null;
}

export interface ForgotPasswordResponse {
  success: boolean;
  error?: unknown;
}

export interface ResetPasswordResponse {
  success: boolean;
  error?: unknown;
}
