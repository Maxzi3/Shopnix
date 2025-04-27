import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

export function useGetMe() {
  const [token] = useLocalStorage("token", null);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", token], // 👈 see? added token here
    queryFn: getMe,
    enabled: !!token,
    onError: (err) => {
      toast.error(err.message || "Failed to load user data");
    },
  });

  const isAuthenticated = !!user && !!token;

  return { user, isLoading, isAuthenticated };
}
