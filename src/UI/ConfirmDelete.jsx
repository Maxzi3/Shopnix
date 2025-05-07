import { useDeleteAccount } from "../features/Authentication/useDeleteAccount";

function ConfirmDelete({ onCloseModal }) {
  const { deleteAccount, isLoading } = useDeleteAccount();

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 w-full max-w-sm sm:max-w-md">
      <h3 className="text-lg sm:text-xl text-red-600 font-semibold">
        Delete Account
      </h3>

      <p className=" text-sm sm:text-base leading-relaxed">
        Are you sure you want to delete this account permanently?
        <span className="font-medium"> This action cannot be undone.</span>
      </p>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onCloseModal}
          disabled={isLoading}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={() => deleteAccount()}
          disabled={isLoading}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}


export default ConfirmDelete;
