import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/account/updatedata"); // go back
  };

  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 812 345 6789",
    address: "123 Main Street, Lagos, Nigeria",
    joined: "January 15, 2024",
    image: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <div className=" bg-white px-4 py-8 md:w-[600px] max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 z-10">
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover  border-2 border-blue-500"
        />
      </div>

      {/* User Info */}
      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Name:</span>
          <span>{user.name}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Phone:</span>
          <span>{user.phone}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Address:</span>
          <span className="text-right max-w-[60%]">{user.address}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-600">Date Joined:</span>
          <span>{user.joined}</span>
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
