import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy usage

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useCartContext must be used within a CartProvider");
  return context;
}
