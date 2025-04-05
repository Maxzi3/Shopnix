import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../Services/apiReviews";
import { toast } from "react-hot-toast";

export function useDeleteReview(productId) {
  const queryClient = useQueryClient();

  const { mutate: removeReview, isLoading } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success("Review deleted!");
      queryClient.invalidateQueries(["reviews", productId]);
    },
    onError: (err) => toast.error(err.message || "Could not delete review"),
  });

  return { removeReview, isLoading };
}
