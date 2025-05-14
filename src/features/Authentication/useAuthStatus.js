import { useQuery } from "@tanstack/react-query";
import { checkAuthStatus } from "../../Services/apiAuth";

export function useAuthStatus() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["authStatus"],
    queryFn: checkAuthStatus,
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });

  
  return {
    isAuthenticated: data?.isAuthenticated,
    user: data?.user,
    isLoading,
    refetch
  };
}
