import { useParams } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { useState } from "react";
import { useProduct } from "./useProduct";
import { formatCurrency } from "../../UI/helpers";
import { useCartContext } from "../../Contexts/CartContext";
import { FaStar } from "react-icons/fa";
import { useCreateReviewProduct } from "../Reviews/useCreateReviewProduct";
import Spinner from "../../UI/Spinner";
import StarRating from "../../UI/StarRating";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { data, isLoading } = useProduct(slug);
  const product = data?.data;
  const { isAdding, addToCart } = useCartContext();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const { submitReview, isLoading: isCreating } = useCreateReviewProduct();

  if (isLoading)
    return (
      <div>
        <Spinner />{" "}
      </div>
    );

  const discountPrice = product.price - (product.priceDiscount || 0);

  function handleReviewSubmit(e) {
    e.preventDefault();
    submitReview({
      productId: product._id,
      review: reviewText,
      rating,
    });
    setReviewText("");
    setRating(5);
  }

  return (
    <div className="px-6 md:pt-4 md:max-w-3xl max-h-auto mx-auto mb-[100px] max-w-5xl p-6 space-y-10">
      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.imageUrl || "/placeholder.jpg"}
          alt={product.name}
          className="rounded-lg"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center gap-2">
            <FiStar className="text-yellow-500" />
            <span className="font-medium">
              {product.ratingsAverage || "N/A"}
            </span>
            <span className="text-sm text-gray-500">
              ({product.ratingsQuantity || 0} reviews)
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(discountPrice)}
          </p>
          {product.priceDiscount && (
            <p className="text-sm line-through text-gray-500">
              {formatCurrency(product.price)}
            </p>
          )}
          <p
            className={`font-medium ${
              product.stockNo > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stockNo > 0 ? "In stock" : "Out of stock"}
          </p>
          <button
            disabled={product.stockNo === 0 || isAdding}
            onClick={() => addToCart(product._id, 1)}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Existing Reviews */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {product.reviews?.length ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review._id} className="border p-3 rounded-md">
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    {review.user?.fullName?.split(" ")[1] || "Anonymous"}
                  </span>
                  <span className="flex items-center text-yellow-500">
                    {Array.from({ length: review.rating }, (_, index) => (
                      <FaStar key={index} />
                    ))}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{review.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* Leave a Review */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your Rating</label>
            <div className="flex flex-col space-y-2">
              <StarRating />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Share your experience..."
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
