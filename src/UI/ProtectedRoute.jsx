import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStatus } from "../features/Authentication/useAuthStatus";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load Authenticated User
  const { isAuthenticated, isLoading } = useAuthStatus();

  // 2. If there is no authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading show Spinner
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;

  // (Optional safety fallback)
  return null;
};

export default ProtectedRoute;
