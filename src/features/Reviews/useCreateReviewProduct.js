import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviewOnProduc } from "../../Services/apiReviews";
import { toast } from "react-hot-toast";

export function useCreateReview(productId) {
  const queryClient = useQueryClient();

  const { mutate: submitReview, isLoading } = useMutation({
    mutationFn: ({ review, rating }) =>
      createReviewOnProduc({ productId, review, rating }),
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries(["reviews", productId]); // Refetch product reviews
    },
    onError: (err) => {
      toast.error(err.message || "Could not submit review");
    },
  });

  return { submitReview, isLoading };
}
