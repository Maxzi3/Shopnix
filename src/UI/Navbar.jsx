import { Link, useLocation, useSearchParams } from "react-router-dom";
import DarkmodeToggle from "./DarkModeToggle";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi2";
import Logo from "./Logo";
import { useCartContext } from "../Contexts/CartContext";
import { HiArrowLeft } from "react-icons/hi";
import Input from "./Input";
import PFP from "./PFP";
import { useAuthStatus } from "../features/Authentication/useAuthStatus";

const Navbar = () => {
  const { isAuthenticated, user, isLoading } = useAuthStatus();
  const location = useLocation();
  const { totalQuantity } = useCartContext();
  const isCartPage = location.pathname.startsWith("/cart");
  const isProductPage = location.pathname.startsWith("/product/");
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get("category") || "all";

  const handleFilterChange = (e) => {
    searchParams.set("category", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <header className="relative text-gray-600 dark:text-gray-200 body-font">
      {/* Desktop View */}
      <div className="items-center justify-between hidden w-full px-4 py-5 lg:flex md:px-8">
        <Link
          to="/"
          className="flex items-center mb-4 mr-2 font-medium text-gray-900 title-font dark:text-gray-100 md:mb-0"
        >
          <Logo />
        </Link>
        {isCartPage || isProductPage ? (
          ""
        ) : (
          <>
            {/* Category Filter */}
            <select
              className="p-2 ml-10 text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <option value="all">All Categories</option>
              <option value="jerseys">Jerseys</option>
              <option value="watches">Watches</option>
              <option value="shoes">Shoes</option>
            </select>
            {/* Search Input */}
            <Input />
          </>
        )}
        <div className="flex items-center justify-between gap-5 text-3xl">
          {isCartPage ? (
            <Link
              to="/"
              className="flex items-center text-base hover:text-blue-600 dark:hover:text-blue-400"
            >
              <HiArrowLeft className="mr-2" /> Back to Store
            </Link>
          ) : (
            <Link
              to="/cart"
              className="relative hover:text-gray-900 dark:hover:text-white"
            >
              <HiOutlineShoppingCart className="w-6 h-6" />
              {totalQuantity > 0 && (
                <sup className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </sup>
              )}
            </Link>
          )}
          {isAuthenticated ? (
            <Link
              to="/account/profile"
              className="hover:text-gray-900 dark:hover:text-white"
            >
              <PFP avatar={user?.avatar} isLoading={isLoading} />
            </Link>
          ) : (
            <div className="flex gap-4 text-base">
              <Link
                to="/login"
                className="px-3 py-1 border border-gray-300 rounded hover:text-blue-600 dark:hover:text-blue-400 dark:border-gray-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded hover:text-blue-600 dark:hover:text-blue-400"
              >
                Sign Up
              </Link>
            </div>
          )}
          <DarkmodeToggle />
        </div>
      </div>

      {/* Mobile View */}
      <div className="fixed top-0 left-0 z-50 flex items-center justify-between w-full gap-4 px-4 py-4 bg-white shadow-sm lg:hidden dark:bg-gray-900 dark:shadow-md">
        <Link to="/">
          <Logo />
        </Link>
        {isCartPage || isProductPage ? (
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            <DarkmodeToggle />
          </h1>
        ) : (
          <div className="flex-1">
            <Input />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
