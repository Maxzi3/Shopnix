import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCartSizeApi } from "../../Services/apiCart";

export function useUpdateCartSize() {
  const queryClient = useQueryClient();

  const { mutate: updateSize, isPending } = useMutation({
    mutationFn: async ({ cartItemId, size }) => {
      return updateCartSizeApi(cartItemId, size);
    },
    onSuccess: () => {
      toast.success("Size updated");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update size");
    },
  });

  return { updateSize, isLoading: isPending };
}
