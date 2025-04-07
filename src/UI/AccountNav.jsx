  // MainNav.jsx
  import { NavLink } from "react-router-dom";
  import {
    HiOutlineClipboardDocumentList,
    HiOutlineUserCircle,
    HiOutlineTrash,
    HiOutlineArrowRightOnRectangle,
  } from "react-icons/hi2";



  const AccountNav = () => {
    const linkclass = ({ isActive }) =>
      isActive
        ? "flex items-center gap-3 font-medium text-base px-6 py-3 rounded-md transition-all bg-gray-100 text-gray-800"
        : " flex items-center gap-3 font-medium text-base px-6 py-3 rounded-md transition-all text-gray-600 hover:bg-gray-100 hover:text-gray-800";
    return (
      <ul className="flex flex-col gap-2">
        <NavLink to="/account/orders" className={linkclass}>
          <HiOutlineClipboardDocumentList />
          Orders
        </NavLink>
        <NavLink to="/account/updatedata" className={linkclass}>
          <HiOutlineUserCircle />
          Update Profile
        </NavLink>
        <NavLink to="/account/delete-account" className={linkclass}>
          <HiOutlineUserCircle />
          Delete Account
        </NavLink>
        <NavLink to="/account/logout" className={linkclass}>
          <HiOutlineArrowRightOnRectangle />
          Log Out
        </NavLink>
      </ul>
    );
  };

  export default AccountNav;
