import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useUserReviews } from "./useUserReviews";
import { useState } from "react";
import { PAGE_SIZE } from "../../UI/Constant";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import Spinner from "../../UI/Spinner";
import EditReviewForm from "./EditReviewForm";
import ReviewsModal from "./ReviewsModal";
import { useDeleteReview } from "./useDeleteReview";
import SpinnerMini from "../../ui/SpinnerMini";
import { formatDate } from "../../UI/helpers";

function Reviews() {
  const { data: reviews, isLoading, error } = useUserReviews();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState(null);
  const { removeReview, isLoading: isDeleting } = useDeleteReview();

  const handleDelete = (reviewId) => {
    removeReview(reviewId);
  };

  if (!reviews?.length) return <p>No reviews yet.</p>;
  if (isLoading)
    return (
      <p>
        <Spinner />
      </p>
    );
  if (error) return <p>Error loading reviews</p>;

  const pageCount = Math.ceil(reviews?.length / PAGE_SIZE);
  const indexOfLastReview = currentPage * PAGE_SIZE;
  const indexOfFirstReview = indexOfLastReview - PAGE_SIZE;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleNext = () => {
    if (currentPage < pageCount) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      <div className="w-full mx-auto px-6 space-y-8">
        <h1 className="text-2xl font-bold">My Reviews</h1>
        {currentReviews.map((review) => (
          <div key={review._id} className="border p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium">{review?.product?.name}</h2>
              <span className="text-gray-500 text-sm">
                {formatDate(review.createdAt)}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              {Array.from({ length: review.rating }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>

            <p className="text-gray-700">{review.review}</p>

            <div className="flex space-x-4 text-sm text-gray-600">
              <button
                onClick={() => setSelectedReview(review)}
                disabled={isDeleting}
                className="flex items-center gap-1 hover:text-blue-600"
              >
                <FiEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(review._id)}
                disabled={isLoading}
                className="flex items-center gap-1 hover:text-red-600"
              >
                {isDeleting ? (
                  <SpinnerMini />
                ) : (
                  <>
                    <FiTrash2 /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      {pageCount > 1 && (
        <div className="flex items-center justify-end space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md border text-sm font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-brand-600 hover:text-white text-gray-800"
            }`}
          >
            <HiArrowLeft />
          </button>

          <p className="text-sm text-gray-600">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{pageCount}</span>
          </p>

          <button
            onClick={handleNext}
            disabled={currentPage === pageCount}
            className={`px-3 py-2 rounded-md border text-sm font-medium ${
              currentPage === pageCount
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-brand-600 hover:text-white text-gray-800"
            }`}
          >
            <HiArrowRight />
          </button>
        </div>
      )}
      {selectedReview && (
        <ReviewsModal onClose={() => setSelectedReview(null)}>
          <EditReviewForm
            review={selectedReview}
            onClose={() => setSelectedReview(null)}
          />
        </ReviewsModal>
      )}
    </>
  );
}

export default Reviews;
