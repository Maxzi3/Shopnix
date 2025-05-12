import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";

export function useGetMe() {
  const { setAuth } = useAuth();

  const { data: user, isPending } = useQuery({
    queryKey: ["user"], 
    queryFn: getMe,
    retry: false,
    onSuccess: (userData) => {
      setAuth(userData); // ✅ This updates isAuthenticated reactively
    },
    onError: (err) => {
      toast.error(err.message || "Failed to load user data");
    },
  });

  return { user, isLoading: isPending };
}
