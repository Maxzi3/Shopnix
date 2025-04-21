import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";

export function useGetMe() {
  const { token } = useAuth();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    enabled: !!token, // 👈 only run if token exists
    onError: (err) => {
      toast.error(err.message || "Failed to load user data");
    },
  });

  const isAuthenticated = !!user && !!token;

  return { user, isLoading, isAuthenticated };
}

