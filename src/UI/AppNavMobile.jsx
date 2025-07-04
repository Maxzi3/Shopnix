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
      : " flex items-center gap-3 font-medium text-base px-2  py-3 rounded-md transition-all  hover:bg-gray-100 hover:text-gray-800";
  return (
    <header className="fixed top-0 z-50 w-full text-gray-700 bg-white dark:bg-gray-900 dark:text-white body-font">
      <div className="flex flex-row w-11/12 py-4 mx-auto lg:hidden">
        <button onClick={ToggleMenu} className="z-50 lg:hidden">
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
        className={`bg-white dark:bg-gray-900 dark:text-white text-gray-700 h-screen  absolute top-0 left-0 flex flex-col px-6 pt-20 pb-40 shadow-xl
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
            className="flex items-center gap-3 px-2 py-3 text-base font-medium transition-all rounded-md hover:bg-gray-100 hover:text-gray-800"
          >
            <HiOutlineTrash />
            Delete Account
          </button>
        </Modal.Open>
        <Modal.Open opens="logout">
          <button
            onClick={ToggleMenu}
            className="flex items-center gap-3 px-2 py-3 text-base font-medium transition-all rounded-md hover:bg-gray-100 hover:text-gray-800"
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
