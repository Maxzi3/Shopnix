import React from "react";
import { useGetMe } from "../features/Authentication/useGetMe";
import { HiOutlineUser } from "react-icons/hi2";

const PFP = () => {
  const { user, isLoading } = useGetMe();

  if (isLoading) {
    return <HiOutlineUser className="w-10 h-10 text-gray-400" />;
  }

  return (
    <img
      src={user?.avatar || "/default-avatar.png"} // Fallback image
      alt="User avatar"
      className="w-10 h-10 rounded-full"
    />
  );
};

export default PFP;
