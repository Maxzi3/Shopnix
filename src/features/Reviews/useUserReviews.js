import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "../../Services/apiReviews";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";

export function useUserReviews() {
 const { token } = useAuth();;

  return useQuery({
    queryKey: ["userReviews"],
    queryFn: getUserReviews,
    enabled: !!token, // Only fetch if token exists
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Could not fetch your reviews"
      );
    },
  });
}
