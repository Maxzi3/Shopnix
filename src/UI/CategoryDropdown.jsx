import { useState } from "react";
import { MdCategory } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const CategoryDropdown = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = ["all", "jerseys", "watches", "shoes"];
  const filterValue = searchParams.get("category") || "all"; // Get the selected category from URL search params

  const handleCategoryChange = (category) => {
    searchParams.set("category", category); // Set the new category in search params
    setSearchParams(searchParams); // Update the URL
    setOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown list */}
      {open && (
        <ul className="absolute bottom-full mb-2 bg-white dark:bg-gray-900 dark:text-white text-gray-700shadow-lg rounded p-2 w-40 z-10 text-xl">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`p-2 cursor-pointer hover:bg-gray-400 ${
                cat === filterValue ? "bg-gray-400" : ""
              }`} // Highlight the selected category
              onClick={() => handleCategoryChange(cat)} // Handle category change
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
              {/* Capitalize first letter */}
            </li>
          ))}
        </ul>
      )}

      {/* Icon Button */}
      <button onClick={() => setOpen(!open)} className="p-2 rounded-full">
        <MdCategory />
      </button>
    </div>
  );
};

export default CategoryDropdown;
