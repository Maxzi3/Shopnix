import { useDeleteAccount } from "../features/Authentication/useDeleteAccount";

function ConfirmDelete({  onCloseModal }) {
  const { deleteAccount, isLoading } = useDeleteAccount();
  
  return (
    <div className="flex flex-col space-y-3  md:w-[400px]">
      <h3 className="text-xl text-red-600 font-semibold">Delete Account</h3>
      <p className="text-gray-500 text-justify font-medium">
        Are you sure you want to delete this Account permanently? This action
        cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-600 text-gray-50 text-base p-2 rounded-lg shadow-sm"
          disabled={isLoading}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          onClick={() => deleteAccount()}
          className="bg-red-700 text-red-100 text-base p-2 rounded-lg shadow-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
