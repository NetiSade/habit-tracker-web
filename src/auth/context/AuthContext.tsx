import React, { useEffect, useState } from "react";

import { AuthContext } from "./types";
import { authService } from "../service/authService";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const result = await authService.silentLogin();

      setIsAuthenticated(result.success);
      setUserId(result.userId);
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    setIsAuthenticated(result.success);
    setUserId(result.userId || null);
    return result;
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUserId(null);
  };

  const signup = async (username: string, email: string, password: string) => {
    const result = await authService.signup(username, email, password);
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
