import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "../../Services/apiCart";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Contexts/AuthContext";

export function useCart() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["cart", token],
    queryFn: async () => {
      const response = await getUserCart();
      return response.data.cart;
    },
    enabled: !!token,
    onError: (err) => {
      toast.error(err.message || "Could not fetch cart");
    },
  });
}
