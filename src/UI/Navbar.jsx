import DarkmodeToggle from "./DarkModeToggle";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font">
      {/* Desktop View  */}
      <div className="hidden container mx-auto md:flex justify-between p-5 flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Logo />
        </Link>
        <select name="Cat" className="p-2  rounded">
          <option disabled selected>
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
          <Link
            to="/account/updatedata"
            className=" hover:text-gray-900"
          >
            <HiOutlineUser />
          </Link>
          <DarkmodeToggle />
          <Link to="/cart" className=" hover:text-gray-900">
            <HiOutlineShoppingCart />
          </Link>
        </div>
      </div>
      {/* Mobile View */}
      <div className="md:hidden container mx-auto flex justify-between p-3 flex-row items-center mt-2 space-x-6">
        <Link to="/">
          <Logo />
        </Link>
        <input
          className="border-2 w-[200px] rounded-full p-2"
          type="text"
          placeholder="Search Shopnix"
        />
      </div>
    </header>
  );
};

export default Navbar;
