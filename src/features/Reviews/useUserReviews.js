import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "../../Services/apiReviews";
import { toast } from "react-hot-toast";
import { useGetMe } from "../Authentication/useGetMe";

export function useUserReviews() {
  const { isLoading: isUserLoading, isAuthenticated } = useGetMe();

  return useQuery({
    queryKey: ["userReviews"],
    queryFn: getUserReviews,
    enabled: isAuthenticated && !isUserLoading,
    retry: false, // Don't retry on failure
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Could not fetch your reviews"
      );
    },
  });
}
