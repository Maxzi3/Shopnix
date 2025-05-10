import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        className="md:w-10 md:h-10  h-8 text-white p-2 bg-black dark:bg-gray-100 dark:text-gray-800 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-1 font-semibold text-xl md:text-2xl dark:text-white ">
        Shopnix
      </span>
    </div>
  );
}

export default Logo