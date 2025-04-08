import { HiOutlineShoppingCart } from "react-icons/hi2";
import { MdCategory } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import CategoryDropdown from "./CategoryDropdown";
import { Link } from "react-router-dom";

const FooterMobile = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t-2 z-50 ">
      <ul className="md:hidden flex justify-between p-4 text-3xl items-center ">
        <Link to="/">
          <HiOutlineHome />
        </Link>
        <li>
          <CategoryDropdown />
        </li>
        <Link to="/cart">
          <HiOutlineShoppingCart />
        </Link>
        <Link to="/account/updatedata">
          <HiOutlineUser />
        </Link>
      </ul>
    </div>
  );
};

export default FooterMobile;
