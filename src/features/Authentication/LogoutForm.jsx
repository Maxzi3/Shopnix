import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

const LogoutForm = ({ onCloseModal }) => {
  const { logout, isPending } = useLogout();
  return (
    <div className="flex flex-col space-y-3 md:w-[400px]">
      <h3 className="text-xl text-red-600 font-semibold">LOGOUT</h3>
      <p className="text-gray-500 text-justify font-medium">
        Are you sure you want Logout, New products are waiting for you, Shop Now
        !
      </p>

      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-600 text-gray-50 text-base p-2 rounded-lg shadow-sm"
          disabled={isPending}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          disabled={isPending}
          onClick={() => logout()}
          className="bg-red-700 text-red-100 text-base p-2 rounded-lg shadow-sm"
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
