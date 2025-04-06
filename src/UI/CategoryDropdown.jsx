import { useState } from "react";
import { MdCategory } from "react-icons/md";

const CategoryDropdown = () => {
  const [open, setOpen] = useState(false);

  const categories = ["Electronics", "Clothing", "Books"];

  return (
    <div className="relative inline-block">
      {/* Dropdown list */}
      {open && (
        <ul className="absolute bottom-full mb-2 bg-white shadow-lg rounded p-2 w-40 z-10 text-xl">
          {categories.map((cat) => (
            <li
              key={cat}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                console.log("Selected:", cat);
                setOpen(false);
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}

      {/* Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full "
      >
        <MdCategory />
      </button>
    </div>
  );
};

export default CategoryDropdown;
