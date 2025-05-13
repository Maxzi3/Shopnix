import { useGetMe } from "../features/Authentication/useGetMe";
import { HiOutlineUser } from "react-icons/hi2";

const PFP = () => {
  const { user, isLoading } = useGetMe();

  const avatarSrc = user?.avatar
    ? `${user.avatar}?f=jpg&q=auto`
    : "/default-avatar.png";

  if (isLoading) {
    return <HiOutlineUser className="w-10 h-10 text-gray-400" />;
  }

  return (
    <img
      src={avatarSrc}
      alt="User avatar"
      className="w-10 h-10 rounded-full object-cover"
      onError={(e) => (e.target.src = "/default-avatar.png")}
    />
  );
};

export default PFP;
