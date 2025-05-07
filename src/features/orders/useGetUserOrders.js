import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getUserOrdersApi } from "../../Services/apiOrder";
export const useGetUserOrders = () => {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrdersApi,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch orders.");
    },
    // Ensure we return an empty array if no data
    select: (data) => data || [],
  });
};
