import { api } from "../UI/Constant";
export async function createReview({ review, rating, product }) {
  try {
    const { data } = await api.post("/reviews", { review, rating, product });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit review");
  }
}

export async function getReviews() {
  try {
    const { data } = await api.get("/reviews");
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch reviews");
  }
}

export async function getUserReviews() {
  try {
    const res = await api.get("/reviews/user", {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user reviews"
    );
  }
}


export async function getReviewsByProduct(productId) {
  try {
    const { data } = await api.get(`/products/${productId}/reviews`);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch product reviews"
    );
  }
}
export async function createReviewOnProduct({ productId, review, rating }) {
  try {
    const { data } = await api.post(`/products/${productId}/reviews`, {
      review,
      rating,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create review");
  }
}
// PATCH: Update a review
export async function updateReview({ reviewId, review, rating }) {
  try {
    const { data } = await api.patch(`/reviews/${reviewId}`, {
      review,
      rating,
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update review");
  }
}

// DELETE: Delete a review
export async function deleteReview(reviewId) {
  try {
    const res = await api.delete(`/reviews/${reviewId}`);
    return res.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete review");
  }
}

