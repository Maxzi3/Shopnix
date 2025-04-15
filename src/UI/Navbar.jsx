import { Link, useLocation } from "react-router-dom";
import DarkmodeToggle from "./DarkModeToggle";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi2";
import Logo from "./Logo";
import { useCartContext } from "../Contexts/CartContext";
import { HiArrowLeft } from "react-icons/hi";
import { useGetMe } from "../features/Authentication/useGetMe";

const Navbar = () => {
  const { isAuthenticated, user } = useGetMe();
  const location = useLocation();
  const { totalQuantity } = useCartContext();
  const isCartPage = location.pathname === "/cart";

  return (
    <header className="text-gray-600 body-font">
      {/* Desktop View */}
      <div className="hidden container mx-auto md:flex justify-between p-5 flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <Logo />
        </Link>

        <select name="Cat" className="p-2 rounded">
          <option disabled defaultValue>
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

        <div className="flex justify-between gap-5 items-center text-3xl">
          {/* 👇 Only show if authenticated */}
          {isAuthenticated ? (
            <>
              {isCartPage ? (
                <Link
                  to="/"
                  className="flex items-center text-base hover:text-blue-600"
                >
                  <HiArrowLeft className="mr-2" /> Back to Store
                </Link>
              ) : (
                <Link to="/cart" className="relative hover:text-gray-900">
                  <HiOutlineShoppingCart className="w-6 h-6" />
                  {totalQuantity > 0 && (
                    <sup className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none">
                      {totalQuantity > 99 ? "99+" : totalQuantity}
                    </sup>
                  )}
                </Link>
              )}
              <Link to="/account/profile" className="hover:text-gray-900">
                <HiOutlineUser />
              </Link>
            </>
          ) : (
            // 👇 Show these if NOT authenticated
            <div className="flex gap-4 text-base">
              <Link
                to="/login"
                className="hover:text-blue-600 border border-gray-300 rounded px-3 py-1"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className=" hover:text-blue-600 rounded px-3 py-1"
              >
                Sign Up
              </Link>
            </div>
          )}

          <DarkmodeToggle />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden container mx-auto flex justify-between p-3 flex-row items-center mt-2 mb-10">
        <Link to="/">
          <Logo />
        </Link>
        <input
          className="border-2 md:w-[200px] text-xs rounded-full p-2"
          type="text"
          placeholder="Search Shopnix"
        />
      </div>
    </header>
  );
};

export default Navbar;
