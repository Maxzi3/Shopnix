import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "../features/Authentication/useGetMe";
import Spinner from "../UI/Spinner";
import { formatDate } from "../UI/helpers";
import Button from "../UI/Button";


const ProfilePage = () => {
  const { user, isLoading } = useGetMe();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/account/updatedata");
  };

  if (isLoading) return (
    <div className="px-4 py-8 ">
      <Spinner />
    </div>
  );

  const emailStatusBadge = {
    pending: "bg-blue-100 text-blue-800",
    verified: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  const getValueOrNil = (value) => value || "N/A";
  return (
    <div className=" px-4 py-8 lg:w-[600px] w-full mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">Your Profile</h1>

      {/* Profile Image */}
      <div className="z-10 flex justify-center mb-6">
        <img
          src={user.avatar}
          alt={user.fullName?.split(" ")[1]}
          className="relative z-0 w-24 h-24 border-2 border-blue-500 rounded-full"
        />
      </div>

      {/* User Info */}
      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium">Name:</span>
          <span>{getValueOrNil(user.fullName)}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium">Email:</span>
          <span>{getValueOrNil(user.email)}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium">Phone:</span>
          <span>{getValueOrNil(user.phoneNumber)}</span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="w-1/2 font-medium shrink-0">Address:</span>
          <span className="text-right max-w-[60%]">
            {getValueOrNil(user.address)}
          </span>
        </div>
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="font-medium">Date Joined:</span>
          <span>{formatDate(user.createdAt)}</span>
        </div>

        {/* Email Verification Status */}
        <div className="flex items-center justify-between pb-2 border-b">
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

        <Button
          variant="primary"
          onClick={handleClick}
          className="flex items-center gap-3 px-6 py-3 font-medium text-white transition bg-blue-600 rounded-lg md:w-auto hover:bg-blue-700"
        >
          Update Profile
          <HiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
