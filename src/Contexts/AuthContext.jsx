import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      const rawToken = localStorage.getItem("token");
      if (!rawToken || rawToken === "undefined" || rawToken === "null") {
        localStorage.removeItem("token");
        return null;
      }
      return JSON.parse(rawToken);
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (!rawUser || rawUser === "undefined" || rawUser === "null") {
        localStorage.removeItem("user");
        return null;
      }
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  });

  const [hasHydrated, setHasHydrated] = useState(false);

  // Safari fallback: make sure we sync after first load
  useEffect(() => {
    if (!token) {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken && storedToken !== "undefined") {
          setToken(JSON.parse(storedToken));
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (!user) {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.log(err);
      }
    }

    setHasHydrated(true);
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
      {hasHydrated ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
