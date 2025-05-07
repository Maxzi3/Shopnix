import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getSingleOrderApi } from "../../Services/apiOrder";

export const useGetSingleOrder = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getSingleOrderApi(orderId),
    enabled: !!orderId,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch order.");
    },
  });
};
