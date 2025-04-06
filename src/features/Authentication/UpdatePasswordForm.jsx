import { useForm } from "react-hook-form";
import { useUpdatePassword } from "./useUpdatePassword";
import Spinner from "../../UI/Spinner";

function UpdatePasswordForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { updatePassword, isLoading } = useUpdatePassword();

  const onSubmit = ({ currentPassword, newPassword, passwordConfirm }) => {
    updatePassword(
      { currentPassword, newPassword, passwordConfirm },
      {
        onSettled: () => reset(),
      }
    );
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white  w-[600px] mx-auto  flex flex-col justify-center p-10 rounded-lg border border-gray-200 shadow-md space-y-6 text-sm"
    >
      {/* currentPassword*/}
      <div>
        <label htmlFor="currentPassword" className="block font-medium mb-1">
          Current Password (min 8 characters)
        </label>
        <input
          type="currentPassword"
          id="currentPassword"
          disabled={isLoading}
          {...register("currentPassword", {
            required: "This Field is Required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors?.currentPassword && (
          <span className="text-red-600 text-sm">
            {errors.currentPassword.message}
          </span>
        )}
      </div>

      {/* newPassword */}
      <div>
        <label htmlFor="newPassword" className="block font-medium mb-1">
          New Password (min 8 characters)
        </label>
        <input
          type="newPassword"
          id="newPassword"
          disabled={isLoading}
          {...register("newPassword", {
            required: "This Field is Required",
            minLength: {
              value: 8,
              message: "newPassword must be at least 8 characters",
            },
          })}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors?.newPassword && (
          <span className="text-red-600 text-sm">
            {errors.newPassword.message}
          </span>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="passwordConfirm" className="block font-medium mb-1">
          Repeat password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This Field is Required",
            validate: (value) =>
              value === getValues().newPassword || "Password needs to match",
          })}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        {errors?.passwordConfirm && (
          <span className="text-red-600 text-sm">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
        <button
          type="reset"
          onClick={reset}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400"
        >
          Update Password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
