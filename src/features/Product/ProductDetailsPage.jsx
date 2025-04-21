import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useProduct } from "./useProduct";
import { formatCurrency } from "../../UI/helpers";
import { useCartContext } from "../../Contexts/CartContext";
import { FaStar } from "react-icons/fa";
import { useCreateReviewProduct } from "../Reviews/useCreateReviewProduct";
import Spinner from "../../UI/Spinner";
import StarRating from "../../UI/StarRating";
import SimilarProducts from "./SimilarProducts";
import ProductReviews from "../Reviews/ProductReviews";
import AddReview from "../Reviews/AddReview";
import { HiArrowLeft } from "react-icons/hi2";
import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useProduct(slug);
  const product = data;
  const { isAdding, addToCart } = useCartContext();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const { submitReview, isLoading: isCreating } = useCreateReviewProduct();

  useEffect(() => {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }, [slug]);

  if (isLoading)
    return (
      <div>
        <Spinner />{" "}
      </div>
    );

  const discountPrice = product.price - (product.priceDiscount || 0);

  function handleReviewSubmit(e) {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error("Review is required.");
      return;
    }
    if (!rating) {
      toast.error("Rating is required.");
      return;
    }
    submitReview({
      productId: product._id,
      review: reviewText,
      rating,
    });
    setReviewText("");
    setRating(0);
  }
  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-base md: m-4 cursor-pointer hover:text-blue-600"
      >
        <HiArrowLeft className="mr-2" /> Back
      </button>
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
                ({product.ratingsQuantity || 0} review)
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
        <ProductReviews reviews={product.reviews} />

        {/* Leave a Review */}
        <AddReview
          reviewText={reviewText}
          setReviewText={setReviewText}
          setRating={setRating}
          handleReviewSubmit={handleReviewSubmit}
          isCreating={isCreating}
        />

        <SimilarProducts
          currentSlug={product.slug}
          category={product.category}
        />
      </div>
    </>
  );
};

export default ProductDetailsPage;
