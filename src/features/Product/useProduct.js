import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../../Services/apiProduct";

export function useProduct(productSlug) {
  return useQuery({
    queryKey: ["product", productSlug],
    queryFn: () => getProductBySlug(productSlug),
    retry: false,
    enabled: !!productSlug, // Ensures the query only runs if productSlug is available
  });
}
