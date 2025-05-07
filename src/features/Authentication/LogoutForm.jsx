import SpinnerMini from "../../UI/SpinnerMini";
import { useLogout } from "./useLogout";

const LogoutForm = ({ onCloseModal }) => {
  const { logout, isPending } = useLogout();
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
      <h3 className="text-lg sm:text-xl text-red-600 font-semibold">LOGOUT</h3>
      <p className=" text-sm sm:text-base leading-relaxed">
        Are you sure you want Logout, New products are waiting for you, Shop Now
        !
      </p>

      <div className="flex justify-end gap-4 mt-4">
        <button
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
          disabled={isPending}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          disabled={isPending}
          onClick={() => logout()}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition disabled:opacity-50"
        >
          {isPending ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </div>
  );
};

export default LogoutForm;
