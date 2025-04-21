import React from "react";
import { FiX } from "react-icons/fi";

function ReviewsModal({ children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[350px] md:w-full relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-1 p-2 text-gray-500"
        >
          <FiX size={24}/>
        </button>
        {children}
      </div>
    </div>
  );
}

export default ReviewsModal;
