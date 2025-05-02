import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      const item = window.localStorage.getItem("token");
      return item !== null && item !== "undefined" ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return null;
    }
  });
  const [user, setUser] = useState(() => {
    try {
      const item = window.localStorage.getItem("user");
      return item !== null && item !== "undefined" ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return null;
    }
  });

  const setAuth = (newToken, newUser) => {
    try {
      if (newToken) {
        window.localStorage.setItem("token", JSON.stringify(newToken));
        setToken(newToken);
      } else {
        window.localStorage.removeItem("token");
        setToken(null);
      }
      if (newUser) {
        window.localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
      } else {
        window.localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  const clearAuth = () => {
    try {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
