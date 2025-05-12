import React from "react";
import { useGetMe } from "../features/Authentication/useGetMe";
import { HiOutlineUser } from "react-icons/hi2";

const PFP = () => {
  const { user } = useGetMe();
  return (
    <img
      src={user.avatar}
      alt={<HiOutlineUser className="text-2xl" />}
      className="w-10 h-10 rounded-full"
    />
  );
};

export default PFP;
