import { Link } from "react-router-dom";
import { HiArrowLeft, HiOutlineUser } from "react-icons/hi2";
import DarkmodeToggle from "./DarkModeToggle";

const AccountHeader = () => {
  return (
    <header className="bg-white px-12 py-5 border-b border-gray-100 flex items-center justify-between">
      <h1>Account Management</h1>
      <div className="flex items-center gap-2    ">
        <Link to='/' className="flex items-center hover:text-blue-600"> <HiArrowLeft className="mr-2"/> Back to Store</Link>
        <HiOutlineUser className="text-2xl"/>
        <DarkmodeToggle />
      </div>
    </header>
  );
};

export default AccountHeader;
