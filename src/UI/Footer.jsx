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
import { useGetMe } from "../features/Authentication/useGetMe";

const Footer = () => {
  const { isAuthenticated } = useGetMe();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useCartContext();

  const isCartPage = location.pathname === "/cart";

  const handleClick = () => {
    if (isCartPage) {
      navigate(-1); // go back
    }
  };
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t z-50">
      <ul className="md:hidden flex justify-between items-center px-5 py-6 text-2xl">
        {/* Home */}
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          <HiOutlineHome />
        </Link>

        {/* Orders or Category Dropdown */}
        <li>
          {isCartPage ? (
            <Link
              to="/account/orders"
              className="text-gray-700 hover:text-blue-600"
            >
              <HiOutlineClipboardDocumentList />
            </Link>
          ) : (
            <CategoryDropdown />
          )}
        </li>

        {/* Auth Icons */}
        {isAuthenticated ? (
          <Link
            to="/account/profile"
            className="text-gray-700 hover:text-blue-600"
          >
            <HiOutlineUser />
          </Link>
        ) : (
          <div className="flex gap-2 text-sm">
            <Link
              to="/login"
              className="hover:text-blue-600 border border-gray-300 rounded px-2 py-1"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-blue-600 border border-gray-300 rounded px-2 py-1"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Cart or Back button */}
        {isCartPage ? (
          <button
            onClick={handleClick}
            className="text-gray-700 hover:text-blue-600"
          >
            <HiArrowLeft />
          </button>
        ) : (
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
          >
            <HiOutlineShoppingCart className="w-6 h-6" />
            {totalQuantity > 0 && (
              <sup className="absolute -top-2 -right-3  bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none">
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </sup>
            )}
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Footer;
