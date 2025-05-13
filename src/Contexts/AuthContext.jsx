import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Set token after login
  const login = ({ token }) => {
    setToken(token);
  };

  // Clear token on logout
  const clearAuth = () => {
    setToken(null);
    localStorage.removeItem("token");
    queryClient.clear(); // Clear all queries
    queryClient.setQueryData(["user"], null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token, // Rely only on token
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
