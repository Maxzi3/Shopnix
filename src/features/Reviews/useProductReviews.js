import { useQuery } from "@tanstack/react-query";
import { getReviewsByProduct } from "../../Services/apiReviews";

export function useProductReviews(productId) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviewsByProduct(productId),
    enabled: !!productId, // Ensures the query only runs if productId exists
  });
}
