import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineShoppingCart,
  HiOutlineHome,
  HiOutlineUser,
  HiArrowLeft,
} from "react-icons/hi2";
import CategoryDropdown from "./CategoryDropdown";
import { useCartContext } from "../Contexts/CartContext";
import PFP from "./PFP";
import { useAuthStatus } from "../features/Authentication/useAuthStatus";

const Footer = () => {
  const { isAuthenticated, user, isLoading } = useAuthStatus();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useCartContext();

  const isCartPage = location.pathname === "/cart";
  const isProductPage = location.pathname.startsWith("/product/");

  const handleClick = () => {
    if (isCartPage) {
      navigate(-1); // go back
    }
  };
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full text-gray-700 bg-white border-t shadow-t-md dark:bg-gray-900 dark:text-white">
      <ul className="flex items-center justify-between px-5 py-4 text-2xl lg:hidden">
        {/* Home */}
        <Link to="/" className=" hover:text-blue-600">
          <HiOutlineHome />
        </Link>
        {/* Orders or Category Dropdown */}
        <li>
          {isCartPage || isProductPage ? (
            <Link to="/account/orders" className=" hover:text-blue-600">
              <HiOutlineClipboardDocumentList />
            </Link>
          ) : (
            <CategoryDropdown />
          )}
        </li>
        {/* Cart or Back button */}
        {isCartPage ? (
          <>
            {/* Auth Icons */}
            {isAuthenticated ? (
              <Link to="/account/profile" className=" hover:text-blue-600">
                <PFP avatar={user?.avatar} isLoading={isLoading} />
              </Link>
            ) : (
              <div className="flex gap-2 text-sm">
                <Link
                  to="/login"
                  className="px-2 py-1 border border-gray-300 rounded hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-2 py-1 border border-gray-300 rounded hover:text-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {isCartPage ? (
              <button onClick={handleClick} className=" hover:text-blue-600">
                <HiArrowLeft />
              </button>
            ) : (
              <Link to="/cart" className="relative hover:text-blue-600">
                <HiOutlineShoppingCart className="w-6 h-6" />
                {totalQuantity > 0 && (
                  <sup className="absolute -top-2 -right-3  bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                  </sup>
                )}
              </Link>
            )}
          </>
        ) : (
          <>
            {isCartPage ? (
              <button onClick={handleClick} className=" hover:text-blue-600">
                <HiArrowLeft />
              </button>
            ) : (
              <Link to="/cart" className="relative hover:text-blue-600">
                <HiOutlineShoppingCart className="w-6 h-6" />
                {totalQuantity > 0 && (
                  <sup className="absolute -top-2 -right-3  bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                  </sup>
                )}
              </Link>
            )}
            {/* Auth Icons */}
            {isAuthenticated ? (
              <Link to="/account/profile" className=" hover:text-blue-600">
                <PFP avatar={user?.avatar} isLoading={isLoading} />
              </Link>
            ) : (
              <div className="flex gap-2 text-sm">
                <Link
                  to="/login"
                  className="px-2 py-1 border border-gray-300 rounded hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-2 py-1 border border-gray-300 rounded hover:text-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default Footer;
