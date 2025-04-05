import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../Services/apiReviews";

export function useReviews() {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  return { reviews, isLoading, error };
}
