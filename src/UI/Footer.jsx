import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineShoppingCart,
  HiOutlineHome,
  HiOutlineUser,
  HiArrowLeft,
} from "react-icons/hi2";
import CategoryDropdown from "./CategoryDropdown";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
            <button className="text-2xl">
              <CategoryDropdown />
            </button>
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
          <Link to="/cart" className="text-2xl">
            <HiOutlineShoppingCart />
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Footer;
