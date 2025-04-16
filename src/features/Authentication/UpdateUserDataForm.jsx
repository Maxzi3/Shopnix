import { useState, useEffect } from "react";
import { useUpdateMe } from "./useUpdateMe";
import { useGetMe } from "./useGetMe";

function UpdateUserDataForm() {
  const { user, isLoading } = useGetMe();

  const {
    fullName: currentFullName,
    email,
    emailVerified,
    phoneNumber: currentPhoneNumber,
    photo: currentPhoto,
    address: currentAddress,
  } = user?.data?.doc || {};

  const { updateUser, isUpdating } = useUpdateMe();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setFullName(currentFullName || "");
      setAddress(currentAddress || "");
      setPhoneNumber(currentPhoneNumber || "");
      setAvatar(null);
    }
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName || !address || !phoneNumber) return;

    const userData = { fullName, address, phoneNumber };
    if (avatar) userData.avatar = avatar;

    updateUser(userData, {
      onSuccess: () => {
        setAvatar(null);
      },
    });
  }

  function handleCancel() {
    setFullName(currentFullName || "");
    setAddress(currentAddress || "");
    setPhoneNumber(currentPhoneNumber || "");
    setAvatar(null);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white md:w-[600px] mx-auto flex flex-col justify-center p-8 rounded-lg space-y-6 text-sm border border-gray-200"
    >
      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email || "N/A"}
          disabled
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* Email Verified */}
      <div className="flex items-center gap-2">
        <span className="font-medium">Email Verified:</span>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            emailVerified === "verified"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {emailVerified || "N/A"}
        </span>
      </div>

      {/* Avatar Display */}
      <div>
        <label className="block font-medium mb-1">Current Avatar</label>
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="User Avatar"
            className="w-20 h-20 object-cover rounded-full border border-gray-300"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
            N/A
          </div>
        )}
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block font-medium mb-1">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block font-medium mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isUpdating}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block font-medium mb-1">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isUpdating}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      {/* Avatar Upload */}
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
          type="button"
          onClick={handleCancel}
          disabled={isUpdating}
          className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
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
