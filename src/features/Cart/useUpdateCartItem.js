import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart } from "../../Services/apiCart";
import { toast } from "react-hot-toast";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  const { mutate: updateItem, isLoading } = useMutation({
    mutationFn: ({ itemId, quantity }) => {
      return updateCart({ itemId, quantity });
    },
    onSuccess: () => {
      toast.success("Cart Item updated");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update cart");
    },
  });

  return { updateItem, isLoading };
}
