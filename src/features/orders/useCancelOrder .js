import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrderApi } from "../../Services/apiOrder";
import { toast } from "react-hot-toast";

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      toast.success("Order cancelled successfully!");
      queryClient.invalidateQueries(["userOrders"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to cancel order.");
    },
  });
};
