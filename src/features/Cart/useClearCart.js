import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../../Services/apiCart";
import { toast } from "react-hot-toast";

export function useClearCart() {
  const queryClient = useQueryClient();

  const { mutate: clear, isLoading } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to clear cart");
    },
  });

  return { clear, isLoading };
}
