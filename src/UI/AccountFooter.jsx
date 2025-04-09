import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiArrowLeft,
  HiOutlineHome,
} from "react-icons/hi2";

const AccountFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
          <HiOutlineShoppingCart />
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
