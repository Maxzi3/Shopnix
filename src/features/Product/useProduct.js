import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../../Services/apiProduct";

export function useProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductBySlug(productId),
    retry: false,
    enabled: !!productId, // Ensures the query only runs if productId is available
  });
}
