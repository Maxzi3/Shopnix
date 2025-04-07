import { useState } from "react";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineUserCircle,
  HiOutlineTrash,
  HiOutlineArrowRightOnRectangle,
  HiBars3,
} from "react-icons/hi2";

import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const AppNavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const linkclass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 font-medium text-base px-2  py-3 rounded-md transition-all bg-gray-100 text-gray-800"
      : " flex items-center gap-3 font-medium text-base px-2  py-3 rounded-md transition-all text-gray-600 hover:bg-gray-100 hover:text-gray-800";
  return (
    <header className="text-gray-600 body-font fixed w-full top-0 bg-white">
      <div className="md:hidden flex flex-row justify-between w-11/12 h-full  mx-auto py-4 px-2">
        <button onClick={ToggleMenu} className="md:hidden z-50">
          {!isOpen ? (
            <span className="flex items-center">
              {" "}
              <HiBars3 /> <h1 className="z-50">Shopnix</h1>
            </span>
          ) : (
            <h1>x</h1>
          )}
        </button>
      </div>
      <nav
        className={`bg-white h-screen absolute top-0 left-0 flex flex-col px-6 pt-20 pb-40 shadow-2xl ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <NavLink
          to="/account/orders"
          onClick={ToggleMenu}
          className={linkclass}
        >
          <HiOutlineClipboardDocumentList />
          Orders
        </NavLink>
        <NavLink
          to="/account/updatedata"
          onClick={ToggleMenu}
          className={linkclass}
        >
          <HiOutlineUserCircle />
          Update Profile
        </NavLink>
        <NavLink
          to="/account/delete-account"
          onClick={ToggleMenu}
          className={linkclass}
        >
          <HiOutlineUserCircle />
          Delete Account
        </NavLink>
        <NavLink
          to="/account/logout"
          onClick={ToggleMenu}
          className={linkclass}
        >
          <HiOutlineArrowRightOnRectangle />
          Log Out
        </NavLink>
      </nav>
    </header>
  );
};

export default AppNavMobile;
