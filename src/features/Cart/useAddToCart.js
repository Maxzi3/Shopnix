import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../Services/apiCart";
import { toast } from "react-hot-toast";

export function useAddToCart() {
  const queryClient = useQueryClient();

  const { mutate: addItem, isLoading } = useMutation({
    mutationFn: ({ productId, quantity }) => {
      console.log("Adding to cart:", { productId, quantity }); // Check if the correct data is being passed
      return addToCart(productId, quantity);
    },
    onSuccess: () => {
      toast.success("Item added to cart");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add to cart");
    },
  });

  return { addItem, isLoading };
}
