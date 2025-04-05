import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../../Services/apiCart";
import { toast } from "react-hot-toast";

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  const { mutate: deleteItem, isLoading } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to remove item");
    },
  });

  return { deleteItem, isLoading };
}
