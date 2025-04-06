import DarkmodeToggle from "./DarkModeToggle";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      {/* Desktop View  */}
      <div className="hidden container mx-auto md:flex justify-between p-5 flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-black rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Shopnix</span>
        </Link>
        <select name="Cat" class="p-2  rounded">
          <option value="" disabled selected>
            Categories
          </option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Books</option>
        </select>
        <input
          className="border-2 w-[500px] rounded-full p-2"
          type="text"
          placeholder="Search Shopnix"
        />
        <div class="flex justify-between gap-5 items-center text-3xl">
          <Link to="/profile" className=" hover:text-gray-900">
            <HiOutlineUser />
          </Link>
          <DarkmodeToggle />
          <Link to="/cart" className=" hover:text-gray-900">
            <HiOutlineShoppingCart />
          </Link>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden container mx-auto flex justify-between p-5 flex-row items-center mt-2">
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-black rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </Link>
        <input
          className="border-2 w-[300px] rounded-full p-2"
          type="text"
          placeholder="Search Shopnix"
        />
      </div>
    </header>
  );
};

export default Navbar;
