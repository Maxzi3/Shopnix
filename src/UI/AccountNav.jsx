  import { NavLink } from "react-router-dom";
  import {
    HiOutlineClipboardDocumentList,
    HiOutlineUserCircle,
    HiOutlineTrash,
    HiOutlineArrowRightOnRectangle,
    HiOutlineUser,
  } from "react-icons/hi2";
  import { MdOutlineRateReview } from "react-icons/md";
import Modal from "./Modal";

  const AccountNav = () => {
    const linkclass = ({ isActive }) =>
      isActive
        ? "flex items-center  gap-2 font-medium text-base px-4  py-3 rounded-md transition-all bg-gray-100 text-gray-800"
        : " flex items-center gap-1 font-medium text-base px-4  py-3 rounded-md transition-all hover:bg-gray-100 hover:text-gray-800";
    return (
      <ul className="flex flex-col gap-2">
        <NavLink to="/account/profile" className={linkclass}>
          <HiOutlineUser />
          Profile
        </NavLink>
        <NavLink to="/account/reviews" className={linkclass}>
          <MdOutlineRateReview />
          My Reviews
        </NavLink>
        <NavLink to="/account/orders" className={linkclass}>
          <HiOutlineClipboardDocumentList />
          Orders
        </NavLink>
        <NavLink to="/account/updatedata" className={linkclass}>
          <HiOutlineUserCircle />
          Update Profile
        </NavLink>
        <Modal.Open opens="delete">
          <button className="flex items-center w-full gap-1 px-4 py-3 text-base font-medium text-left transition-all rounded-md hover:bg-gray-100 hover:text-gray-800">
            <HiOutlineTrash />
            Delete Account
          </button>
        </Modal.Open>
        <Modal.Open opens="logout">
          <button className="flex items-center w-full gap-1 px-4 py-3 text-base font-medium text-left transition-all rounded-md hover:bg-gray-100 hover:text-gray-800">
            <HiOutlineArrowRightOnRectangle />
            Log Out
          </button>
        </Modal.Open>
      </ul>
    );
  };

  export default AccountNav;
