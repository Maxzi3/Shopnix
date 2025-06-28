import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineShoppingCart,
  HiArrowLeft,
  HiOutlineHome,
} from "react-icons/hi2";
import { useCartContext } from "../Contexts/CartContext";
import PFP from "./PFP";
import { useAuthStatus } from "../features/Authentication/useAuthStatus";

const AccountFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useCartContext();
  const {  user, isLoading } = useAuthStatus();

  const isProfilePage = location.pathname === "/account/profile";
  const isCartPage = location.pathname === "/cart";

  const handleClick = () => {
    if (isCartPage) {
      navigate(-1); // go back
    }
  };
  const handleClick2 = () => {
    if (isProfilePage ) {
      navigate('/'); // go back
    }
  };
  return (
    <div className="fixed bottom-0 z-50 w-full text-gray-700 bg-white border-t-2 dark:bg-gray-900 dark:text-white ">
      <ul className="flex items-center justify-between px-5 py-4 text-2xl lg:hidden ">
        <Link to="/">
          <HiOutlineHome />
        </Link>
        <li>
          {isCartPage ? (
            <button onClick={handleClick} className="text-2xl">
              <HiArrowLeft />
            </button>
          ) : (
            <Link to="/account/orders">
              <HiOutlineClipboardDocumentList />
            </Link>
          )}
        </li>

        <Link to="/cart" className="relative hover:text-blue-600">
          <HiOutlineShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <sup className="absolute -top-2 -right-3  bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none">
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </sup>
          )}
        </Link>

        {isProfilePage ? (
          <button onClick={handleClick2} className="text-2xl">
            <HiArrowLeft />
          </button>
        ) : (
          <Link to="/account/profile">
            <PFP avatar={user?.avatar} isLoading={isLoading} />
          </Link>
        )}
      </ul>
    </div>
  );
};

export default AccountFooter;
