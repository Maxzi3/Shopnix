import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../Services/apiProduct";

const useProducts = () => {
  const {
    isLoading,
    data: products = [],
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const errorMessage =
    error?.response?.data?.message ||
    "An error occurred while fetching products.";
  return { isLoading, products, errorMessage };
};

export default useProducts;
