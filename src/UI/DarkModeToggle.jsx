import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useState } from "react";
// import { useDarkMode } from "../context/DarkModeContext";

const DarkmodeToggle = () => {
  // eslint-disable-next-line no-unused-vars
  const { isDarkMode, setIsDarkMode } = useState(false);
  return (
    <div>
      <button
        onClick={isDarkMode}
        className="bg-none border-none p-2 hover:bg-gray-100"
      >
        {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
      </button>
    </div>
  );
};

export default DarkmodeToggle;
