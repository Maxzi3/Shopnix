import React from "react";
import { FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const Input = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const handleSearch = (e) => {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    searchParams.delete("search");
    setSearchParams(searchParams);
  };
  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      <input
        className="border border-gray-300 w-full rounded-full p-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder:text-gray-400"
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

export default Input;
