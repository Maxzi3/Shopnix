import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(null);

  // Hydrate token from localStorage on first load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, []);

  // Sync token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = ({ token }) => {
    setToken(token);
  };

  const clearAuth = () => {
    setToken(null);
    localStorage.removeItem("token");
    queryClient.clear();
    queryClient.setQueryData(["user"], null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
