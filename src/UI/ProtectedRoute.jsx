import { useGetMe } from "../features/Authentication/useGetMe";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load Authenticated User
  const { isLoading } = useGetMe();
  const { isAuthenticated } = useAuth();

  // 2. If there is no authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. While loading show Spinner
  if (isLoading)
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;

  // (Optional safety fallback)
  return null;
};

export default ProtectedRoute;
