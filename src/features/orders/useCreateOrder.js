import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderApi } from "../../Services/apiOrder";
import { toast } from "react-hot-toast";
import { useCartContext } from "../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { clearCart } = useCartContext();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries(["userOrders", "cart"]);
      clearCart();
      navigate("/account/orders"); // redirect to confirmation
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to place order.");
    },
  });
};
