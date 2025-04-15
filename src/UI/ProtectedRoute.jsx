import { useGetMe } from "../features/Authentication/useGetMe";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Load Authenticated User
  const { isLoading, isAuthenticated } = useGetMe();

  // 2. If there is no authenticated user, redirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
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
