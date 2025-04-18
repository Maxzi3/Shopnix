import React from "react";
import UpdateUserDataForm from "../features/Authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/Authentication/UpdatePasswordForm";

const UpdatePage = () => {
  return (
    <>
      <div className="py-8 md:py-1 ">
        <h1 className="text-center text-xl font-medium underline underline-offset-4 p-4">
          Update User Data
        </h1>
        <UpdateUserDataForm />
      </div>
      <div className="my-8">
        <h1 className="text-center text-xl font-medium underline underline-offset-4 p-4">
          Update Password
        </h1>
        <UpdatePasswordForm />
      </div>
    </>
  );
};

export default UpdatePage;
