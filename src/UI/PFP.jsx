import { HiOutlineUser } from "react-icons/hi2";

const PFP = ({ avatar, isLoading }) => {
  if (isLoading || !avatar) {
    return <HiOutlineUser className="w-10 h-10 text-gray-400" />;
  }

  return (
    <img
      src={avatar}
      alt="User avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
  );
};

export default PFP;
