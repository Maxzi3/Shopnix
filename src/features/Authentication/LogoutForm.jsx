const LogoutForm = ({  onCloseModal }) => {
  return (
    <div className="flex flex-col space-y-3 md:w-[400px]">
      <h3 className="text-xl text-red-600 font-semibold">LOGOUT</h3>
      <p className="text-gray-500 text-justify font-medium">
        Are you sure you want Logout, New products are waiting for you, Shop Now !
      </p>

      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-600 text-gray-50 text-base p-2 rounded-lg shadow-sm"
          // disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          // disabled={disabled}
          // onClick={onConfirm}
          className="bg-red-700 text-red-100 text-base p-2 rounded-lg shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutForm;
