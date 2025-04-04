import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../Services/apiProduct";

export function useProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    retry: false,
    enabled: !!productId, // Ensures the query only runs if productId is available
  });
}
