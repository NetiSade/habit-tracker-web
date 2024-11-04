import { createContext } from "react";
import { LoginResponse, SignupResponse } from "../service/types";

export interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  signup: (
    username: string,
    email: string,
    password: string,
  ) => Promise<SignupResponse>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
