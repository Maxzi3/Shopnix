function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex flex-col gap-4 w-[400px]">
      <h3>Delete {resourceName}</h3>
      <p className="text-gray-500">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <button
         
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button  disabled={disabled} onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
