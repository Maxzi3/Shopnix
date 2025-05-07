import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "../features/Authentication/useGetMe";
import Spinner from "../UI/Spinner";
import { formatDate } from "../UI/helpers";


const ProfilePage = () => {
  const { user, isLoading } = useGetMe();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/account/updatedata");
  };

  if (isLoading) return <Spinner />;

  const emailStatusBadge = {
    pending: "bg-blue-100 text-blue-800",
    verified: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const getValueOrNil = (value) => value || "N/A";
  return (
    <div className="  px-4 py-8 md:w-[600px] max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 z-10">
        <img
          src={user.avatar}
          alt={user.fullName?.split(" ")[1]}
          className="relative z-0 w-24 h-24 rounded-full  border-2 border-blue-500"
        />
      </div>

      {/* User Info */}
      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Name:</span>
          <span>{getValueOrNil(user.fullName)}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Email:</span>
          <span>{getValueOrNil(user.email)}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Phone:</span>
          <span>{getValueOrNil(user.phoneNumber)}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Address:</span>
          <span className="text-right max-w-[60%]">
            {getValueOrNil(user.address)}
          </span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Date Joined:</span>
          <span>{formatDate(user.createdAt)}</span>
        </div>

        {/* Email Verification Status */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium">Email Verified:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
              emailStatusBadge[user.emailVerified?.toLowerCase()] ||
              "bg-gray-100 text-gray-800"
            }`}
          >
            {getValueOrNil(user.emailVerified)}
          </span>
        </div>

        <button
          onClick={handleClick}
          className="flex items-center gap-3 bg-blue-600 text-white  md:w-auto px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Update Profile
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
