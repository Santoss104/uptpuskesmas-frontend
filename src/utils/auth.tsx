"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import apiClient, { LoginResponse } from "./apiClient";

export interface User {
  _id: string;
  email: string;
  name?: string;
  displayName?: string;
  role: "user" | "admin";
  avatar?: {
    public_id: string;
    url: string;
  };
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    confirmPassword: string;
    avatar?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: { name?: string; email?: string }) => Promise<void>;
  refreshAuthToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const clearAuth = () => {
    console.log("🧹 Auth: Clearing authentication data");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Also clear any other auth-related items that might exist
    localStorage.removeItem("accessToken");

    setAuthState({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,
    });

    console.log("✅ Auth: Authentication data cleared");
  };

  const refreshAuthToken = useCallback(async (): Promise<void> => {
    try {
      const response = await apiClient.refreshToken();

      if (response.success && response.data) {
        const { token } = response.data;
        localStorage.setItem("token", token);

        setAuthState((prev) => ({
          ...prev,
          token,
        }));
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      clearAuth();
      throw error;
    }
  }, []);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("🔍 Auth: Starting initialization...");
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const userStr = localStorage.getItem("user");

        console.log("🔍 Auth: Local storage data:", {
          hasToken: !!token,
          hasRefreshToken: !!refreshToken,
          hasUser: !!userStr,
          token: token?.substring(0, 20) + "...",
        });

        if (token && userStr) {
          const user = JSON.parse(userStr);
          console.log("👤 Auth: User from localStorage:", user);

          setAuthState({
            user,
            token,
            refreshToken,
            isLoading: false,
            isAuthenticated: true,
          });

          console.log("✅ Auth: Initial auth state set to authenticated");

          // Validate token by fetching user profile
          try {
            console.log("🔍 Auth: Validating token with server...");
            const response = await apiClient.getUserProfile();

            if (response.success) {
              console.log("✅ Auth: Token validation successful");
              setAuthState((prev) => ({
                ...prev,
                user: response.data?.user || prev.user,
                isLoading: false,
                isAuthenticated: true,
              }));
            }
          } catch (error) {
            console.error("❌ Auth: Token validation failed:", error);
            // Token might be expired, try to refresh
            try {
              console.log("🔄 Auth: Attempting token refresh...");
              await refreshAuthToken();
              console.log("✅ Auth: Token refresh successful");
            } catch (refreshError) {
              console.error("❌ Auth: Token refresh failed:", refreshError);
              // Refresh failed, clear auth state
              clearAuth();
            }
          }
        } else {
          console.log("❌ Auth: No valid auth data in localStorage");
          setAuthState((prev) => ({
            ...prev,
            isLoading: false,
            isAuthenticated: false,
          }));
        }
      } catch (error) {
        console.error("💥 Auth: Initialization error:", error);
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
      }
    };

    initAuth();
  }, [refreshAuthToken]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log("🔐 Auth: Starting login request...");
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const response: LoginResponse = await apiClient.login({
        email,
        password,
      });
      console.log("📡 Auth: API response received:", response);

      if (response.success) {
        // Backend returns { success, user, accessToken, refreshToken } directly
        const { user, accessToken, refreshToken } = response;
        console.log("👤 Auth: User data:", user);
        console.log(
          "🔑 Auth: Tokens received - accessToken:",
          !!accessToken,
          "refreshToken:",
          !!refreshToken
        );

        // Store in localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        setAuthState({
          user,
          token: accessToken,
          refreshToken,
          isLoading: false,
          isAuthenticated: true,
        });
        console.log("✅ Auth: Login successful, state updated");

        // Small delay to ensure state is updated before redirect
        await new Promise((resolve) => setTimeout(resolve, 100));
      } else {
        console.error("❌ Auth: Login response not successful:", response);
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("💥 Auth: Login error:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    confirmPassword: string;
    avatar?: string;
  }): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const response = await apiClient.register(userData);

      if (response.success) {
        // Successful registration - don't auto-login, let user login manually
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Call logout API
      await apiClient.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Always clear local state regardless of API response
      clearAuth();
    }
  };

  const updateProfile = async (userData: {
    name?: string;
    email?: string;
  }): Promise<void> => {
    try {
      const response = await apiClient.updateUserProfile(userData);

      if (response.success && response.data) {
        const updatedUser = response.data.user;
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setAuthState((prev) => ({
          ...prev,
          user: updatedUser,
        }));
      } else {
        throw new Error(response.message || "Profile update failed");
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    refreshAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Authentication utilities
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { "access-token": token } : {};
};

// User role utilities
export const isAdmin = (user: User | null): boolean => {
  return user?.role === "admin";
};

export const isUser = (user: User | null): boolean => {
  return user?.role === "user";
};

export const hasPermission = (
  user: User | null,
  permission: "read" | "write" | "delete" | "admin"
): boolean => {
  if (!user) return false;

  switch (permission) {
    case "admin":
      return user.role === "admin";
    case "read":
    case "write":
    case "delete":
      return user.role === "user" || user.role === "admin";
    default:
      return false;
  }
};
