import { Link } from "react-router-dom";
import { HiArrowLeft} from "react-icons/hi2";
import DarkmodeToggle from "./DarkModeToggle";
import PFP from "./PFP";
import { useAuthStatus } from "../features/Authentication/useAuthStatus";

const AccountHeader = () => {
  const { user, isLoading } = useAuthStatus();
  return (
    <header className="bg-white  dark:bg-gray-900 text-black dark:text-white px-12 py-5 border-b border-gray-100 flex items-center justify-between">
      <h1>Account Management</h1>
      <div className="flex items-center gap-2    ">
        <Link to="/" className="flex items-center hover:text-blue-600">
          {" "}
          <HiArrowLeft className="mr-2" /> Back to Store
        </Link>
        <PFP avatar={user?.avatar} isLoading={isLoading} />
        <DarkmodeToggle />
      </div>
    </header>
  );
};

export default AccountHeader;
