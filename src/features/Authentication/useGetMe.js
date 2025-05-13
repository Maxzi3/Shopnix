import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../Services/apiAuth";

export function useGetMe() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"], // Unique key for caching
    queryFn: getMe, // The getMe function from your API
    retry: false, // Don't retry on failure (e.g., 401 means user is not logged in)
    refetchOnWindowFocus: false, // Prevent refetch on tab focus
    refetchOnReconnect: false, // Prevent refetch on reconnect
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return { user, isLoading, isAuthenticated: !!user, error };
}
