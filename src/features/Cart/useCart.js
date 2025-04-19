import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "../../Services/apiCart";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

export function useCart() {
  const [token] = useLocalStorage("token", null);

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await getUserCart();
      return response.data.cart;
    },
    enabled: !!token, // 👈 only run if token exists
    onError: (err) => {
      toast.error(err.message || "Could not fetch cart");
    },
  });
}

