import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ Hydrate state from localStorage on app load
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedToken !== "undefined") {
        setToken(JSON.parse(storedToken));
      }

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading auth from localStorage:", error);
    }
  }, []);

  const setAuth = (newToken, newUser) => {
    try {
      if (newToken) {
        localStorage.setItem("token", JSON.stringify(newToken));
        setToken(newToken);
      } else {
        localStorage.removeItem("token");
        setToken(null);
      }

      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.error("Error setting auth in localStorage:", error);
    }
  };

  const clearAuth = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error clearing auth from localStorage:", error);
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
