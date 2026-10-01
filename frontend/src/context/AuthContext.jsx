import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { accessToken, user, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (accessToken && !user) {
        try {
          const { data } = await authApi.me();
          setUser(data);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    user,
    isAuthenticated: !!accessToken,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
