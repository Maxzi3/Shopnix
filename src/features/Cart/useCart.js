import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "../../Services/apiCart";
import { toast } from "react-hot-toast";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getUserCart,
    onError: (err) => {
      toast.error(err.message || "Could not fetch cart");
    },
  });
}

