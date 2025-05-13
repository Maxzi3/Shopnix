import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";
export function useGetMe() {
  const { token } = useAuth();
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!token, // Only fetch if token exists
    onError: (err) => {
      toast.error(err.message || "Failed to load user data");
    },
  });

  return { user, isLoading: isPending };
}
