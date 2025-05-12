import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "../../Services/apiCart";
import { toast } from "react-hot-toast";
import { useGetMe } from "../Authentication/useGetMe";

export function useCart() {
  const { isLoading: isUserLoading, isAuthenticated } = useGetMe();

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await getUserCart();
      return response.data.cart;
    },
    enabled: isAuthenticated && !isUserLoading,
    retry: false,
    onError: (err) => {
      toast.error(err.message || "Could not fetch cart");
    },
  });
}
