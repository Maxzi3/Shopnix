import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviewOnProduct } from "../../Services/apiReviews";
import { toast } from "react-hot-toast";

export function useCreateReviewProduct(productId) {
  const queryClient = useQueryClient();

  const { mutate: submitReview, isPending} = useMutation({
    mutationFn: ({ productId, review, rating }) =>
      createReviewOnProduct({ productId, review, rating }),
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      queryClient.invalidateQueries(["product", productId]);
    },
    onError: (err) => {
      toast.error(err.message || "Could not submit review");
    },
  });

  return { submitReview, isLoading:  isPending, };
}
