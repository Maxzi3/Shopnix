import { useState, useEffect, useRef } from "react";
import { useUpdateMe } from "./useUpdateMe";
import { useGetMe } from "./useGetMe";
import toast from "react-hot-toast";
import Spinner from "../../UI/Spinner";
import { FiX } from "react-icons/fi";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

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
    if (!fullName) {
      toast.error("Full name is required.");
      return;
    }
    if (!address) {
      toast.error("Address is required.");
      return;
    }
    if (!phoneNumber) {
      toast.error("Phone number is required.");
      return;
    }

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
    setPreview(null);
    fileInputRef.current.value = null;
    toast.success("Changes reverted");
  }
  const isDirty =
    fullName !== (currentFullName || "") ||
    address !== (currentAddress || "") ||
    phoneNumber !== (currentPhoneNumber || "") ||
    avatar !== null;
  function handleAvatarChange(e) {
    const file = e.target.files[0];

    // Check if a file is selected
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size exceeds 5MB.");
      return;
    }

    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white md:w-[600px] mx-auto flex flex-col justify-center p-8 rounded-lg space-y-6 text-sm md:border border-gray-200"
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
      <div className="flex md:flex-row flex-col items-center md:space-y-4 md:space-x-5">
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
          id="addressField"
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

      {preview && (
        <div className="flex flex-col ">
          <div>
            <p className="block font-medium mb-1">Selected Preview:</p>
            <img
              src={preview}
              alt="Selected preview"
              className="w-20 h-20 object-cover rounded-full border border-gray-300"
            />
          </div>
        </div>
      )}

      {/* Avatar Upload */}
      <div className="relative">
        <label htmlFor="avatar" className="block font-medium mb-1">
          Avatar image
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          ref={fileInputRef}
          disabled={isUpdating}
          className="w-full p-3 pr-10 border border-gray-300 rounded-md file:border-0 file:bg-black file:text-white file:px-4 file:py-2 file:rounded-md file:cursor-pointer disabled:cursor-not-allowed"
        />

        {preview && (
          <button
            type="button"
            onClick={() => {
              setAvatar(null);
              setPreview(null);
              fileInputRef.current.value = null;
            }}
            className="absolute top-1/2 -translate-y-1/2 right-3 text-red-600 p-1 rounded-full hover:bg-red-100 transition-all"
            aria-label="Remove image"
          >
            <FiX size={18} />
          </button>
        )}
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
          disabled={!isDirty || isUpdating}
          className={`px-4 py-2 rounded-md ${
            !isDirty || isUpdating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isUpdating ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Update account"
          )}
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
