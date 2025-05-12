import React from "react";
import { useGetMe } from "../features/Authentication/useGetMe";
import { HiOutlineUser } from "react-icons/hi2";

const PFP = () => {
  const { user } = useGetMe();

  if (!user)
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <HiOutlineUser className="text-xl text-gray-600 dark:text-gray-300" />
      </div>
    );

  return (
    <img
      src={user.avatar}
      alt="User avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
  );
};

export default PFP;
