import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineUserCircle,
  HiOutlineTrash,
  HiOutlineArrowRightOnRectangle,
  HiBars3,
  HiXMark,
  HiOutlineUser,
} from "react-icons/hi2";
import { MdOutlineRateReview } from "react-icons/md";

import Logo from "./Logo";
import DarkmodeToggle from "./DarkModeToggle";
import Modal from "./Modal";

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
      <div className="md:hidden flex flex-row  w-11/12  mx-auto py-4">
        <button onClick={ToggleMenu} className="md:hidden z-50">
          {!isOpen ? (
            <span className="flex items-center text-3xl">
              <HiBars3 />
            </span>
          ) : (
            <span className="flex items-center text-4xl">
              <HiXMark />
            </span>
          )}
        </button>
        <div className="flex flex-row items-center justify-between w-full ml-4 ">
          <Logo />
          <span className="">
            <DarkmodeToggle />
          </span>
        </div>
      </div>
      <nav
        className={`bg-white h-screen  absolute top-0 left-0 flex flex-col px-6 pt-20 pb-40 shadow-xl
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <NavLink
          to="/account/profile"
          onClick={ToggleMenu}
          className={linkclass}
        >
          <HiOutlineUser />
          Profile
        </NavLink>
        <NavLink
          to="/account/reviews"
          onClick={ToggleMenu}
          className={linkclass}
        >
          <MdOutlineRateReview />
          My Reviews
        </NavLink>
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
        <Modal.Open opens="delete">
          <button
            onClick={ToggleMenu}
            className="flex items-center gap-3 font-medium text-base px-2  py-3 rounded-md transition-all text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <HiOutlineTrash />
            Delete Account
          </button>
        </Modal.Open>
        <Modal.Open opens="logout">
          <button
            onClick={ToggleMenu}
            className="flex items-center gap-3 font-medium text-base px-2  py-3 rounded-md transition-all text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          >
            <HiOutlineArrowRightOnRectangle />
            Log Out
          </button>
        </Modal.Open>
      </nav>
    </header>
  );
};

export default AppNavMobile;
