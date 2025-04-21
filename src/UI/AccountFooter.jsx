import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiArrowLeft,
  HiOutlineHome,
} from "react-icons/hi2";
import { useCartContext } from "../Contexts/CartContext";

const AccountFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useCartContext();

  const isProfilePage = location.pathname === "/account/profile";
  const isCartPage = location.pathname === "/cart";

  const handleClick = () => {
    if (isProfilePage || isCartPage) {
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
            <button onClick={handleClick} className="text-2xl">
              <HiArrowLeft />
            </button>
          ) : (
            <Link to="/account/orders">
              <HiOutlineClipboardDocumentList />
            </Link>
          )}
        </li>

        <Link to="/cart">
          <HiOutlineShoppingCart className="relative" />
          {totalQuantity > 0 && (
            <sup className="absolute top-[10px] right-[115px]  bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full leading-none">
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </sup>
          )}
        </Link>

        {isProfilePage ? (
          <button onClick={handleClick} className="text-2xl">
            <HiArrowLeft />
          </button>
        ) : (
          <Link to="/account/profile">
            <HiOutlineUser />
          </Link>
        )}
      </ul>
    </div>
  );
};

export default AccountFooter;
