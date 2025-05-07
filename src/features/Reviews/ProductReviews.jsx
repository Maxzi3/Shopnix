import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { PAGE_SIZE } from "../../UI/Constant";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";



const ProductReviews = ({ reviews = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(reviews.length / PAGE_SIZE);
  const indexOfLastReview = currentPage * PAGE_SIZE;
  const indexOfFirstReview = indexOfLastReview - PAGE_SIZE;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleNext = () => {
    if (currentPage < pageCount) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (!reviews?.length) return <p>No reviews yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>

      <div className="space-y-4">
        {currentReviews.map((review) => (
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
            <p className="mt-1">{review.review}</p>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between mt-6">
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
    </div>
  );
};

export default ProductReviews;
