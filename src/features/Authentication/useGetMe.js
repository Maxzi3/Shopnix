import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../Services/apiAuth";
import { toast } from "react-hot-toast";

export function useGetMe() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onError: (err) => {
      toast.error(err.message || "Failed to load user data");
    },
  });

  return { user, isLoading: isPending };
}
