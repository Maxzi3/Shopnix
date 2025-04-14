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

const Footer = () => {
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
    <div className="fixed bottom-0 w-full bg-white border-t-2 z-50 ">
      <ul className="md:hidden flex justify-between p-5 text-3xl items-center ">
        <Link to="/">
          <HiOutlineHome />
        </Link>
        <li>
          {isCartPage ? (
            <Link to="/account/orders">
              <HiOutlineClipboardDocumentList />
            </Link>
          ) : (
            <span className="text-2xl">
              <CategoryDropdown />
            </span>
          )}
        </li>
        <Link to="/account/profile">
          <HiOutlineUser />
        </Link>
        {isCartPage ? (
          <button onClick={handleClick} className="text-2xl">
            <HiArrowLeft />
          </button>
        ) : (
          <Link to="/cart" className="relative hover:text-gray-900">
            <HiOutlineShoppingCart className="w-6 h-6" />

            {/* Sup badge */}
            {totalQuantity > 0 && (
              <sup className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none">
                {/* {totalQuantity > 99 ? "99+" : totalQuantity} */}
                2345
              </sup>
            )}
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Footer;
