import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { PAGE_SIZE } from "../UI/Constant"; 

const Pagination = ({ count, pageSize = PAGE_SIZE }) => {
  // Set default to PAGE_SIZE
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / pageSize); // Use the dynamic pageSize

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  // Ensure smooth scroll after page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams]); // Trigger scroll when searchParams change

  if (pageCount <= 1) return null;

  return (
    <div className="w-full md:flex md:items-center md:justify-between">
      <p className="text-sm">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{" "}
        of <span className="font-semibold">{count}</span>
      </p>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium border transition 
            ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-brand-600 hover:text-white text-gray-800"
            }`}
        >
          <HiChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium border transition 
            ${
              currentPage === pageCount
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-brand-600 hover:text-white text-gray-800"
            }`}
        >
          <span>Next</span>
          <HiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
