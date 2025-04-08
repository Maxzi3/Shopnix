import { useState } from "react";
// import { useGetMe } from "./useGetMe";
import { useUpdateMe } from "./useUpdateMe";

function UpdateUserDataForm() {
  // const {
  //   user: {
  //     // email,
  //     user_metadata: { fullName: currentFullName },
  //   },
  // } = useGetMe();

  const { updateUser, isUpdating } = useUpdateMe();
  const [fullName, setFullName] = useState("currentFullName");
  const [address, setAddress] = useState("Address");
  const [phoneNumber, setPhoneNumber] = useState("Phone-Number");
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    if (!address) return;
    if (!phoneNumber) return;
    updateUser(
      { fullName, avatar,address, phoneNumber },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName("currentFullName");
    setAvatar(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  md:w-[600px] mx-auto flex flex-col justify-center p-8 rounded-lg  space-y-6 text-sm border border-gray-200"
    >
      {/* Email - Disabled */}
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          // value={email}
          disabled
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block font-medium mb-1">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          // value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      {/*Address*/}
      <div>
        <label htmlFor="fullName" className="block font-medium mb-1">
          Address
        </label>
        <input
          type="text"
          id="Address"
          // value={Address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isUpdating}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      {/* Phone-Number */}
      <div>
        <label htmlFor="fullName" className="block font-medium mb-1">
          Phone-Number
        </label>
        <input
          type="text"
          id="Phone-Number"
          // value={Phone-Number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isUpdating}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>
      {/* Avatar */}
      <div>
        <label htmlFor="avatar" className="block font-medium mb-1">
          Avatar image
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
          className="w-full p-3 border border-gray-300 rounded-md file:border-0 file:bg-black file:text-white file:px-4 file:py-2 file:rounded-md file:cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
        <button
          type="reset"
          onClick={handleCancel}
          disabled={isUpdating}
          className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
        >
          Update account
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
