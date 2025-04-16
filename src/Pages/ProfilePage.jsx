import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "../features/Authentication/useGetMe";
import Spinner from "../UI/Spinner";

const ProfilePage = () => {
  const { user, isLoading } = useGetMe();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/account/updatedata");
  };

  if (isLoading) return <Spinner />;

  const emailStatusBadge = {
    Pending: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  const getValueOrNil = (value) => value || "N/A";
  return (
    <div className=" bg-white px-4 py-8 md:w-[600px] max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 z-10">
        <img
          src={getValueOrNil(user.data.doc.photo)}
          alt={user.data.doc.fullName}
          className="w-24 h-24 rounded-full object-cover  border-2 border-blue-500"
        />
      </div>

      {/* User Info */}
      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Name:</span>
          <span>{getValueOrNil(user.data.doc.fullName)}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Email:</span>
          <span>{getValueOrNil(user.data.doc.email)}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Phone:</span>
          <span>{getValueOrNil(user.data.doc.phoneNumber)}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Address:</span>
          <span className="text-right max-w-[60%]">
            {getValueOrNil(user.data.doc.address)}
          </span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Date Joined:</span>
          <span>{user.data.doc.createdAt}</span>
        </div>

        {/* Email Verification Status */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Email Verified:</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
              emailStatusBadge[user.data.doc.emailVerified?.toLowerCase()] ||
              "bg-gray-100 text-gray-800"
            }`}
          >
            {getValueOrNil(user.data.doc.emailVerified)}
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
