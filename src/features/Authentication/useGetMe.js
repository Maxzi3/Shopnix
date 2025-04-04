import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../Services/apiAuth";
import { toast } from "react-toastify";

export function useGetMe() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    onError: (err) => {
      toast.error(err.message || "Failed to load user data");
    },
  });

  return { user, isAuthenticated: user?.role === "authenticated", isLoading };
}
