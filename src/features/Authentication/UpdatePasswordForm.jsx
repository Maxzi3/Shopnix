import { useForm } from "react-hook-form";
import { useUpdatePassword } from "./useUpdatePassword";
import Spinner from "../../UI/Spinner";
import SpinnerMini from "../../UI/SpinnerMini";
import FormInput from "../../UI/FormInput";

function UpdatePasswordForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { updatePassword, isLoading } = useUpdatePassword();

  const onSubmit = ({ passwordCurrent, password, passwordConfirm }) => {
    updatePassword(
      { passwordCurrent, password, passwordConfirm },
      {
        onSettled: () => reset(), // Reset form after submission
      }
    );
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:w-[600px] mx-auto flex flex-col justify-center p-8 mb-[100px] rounded-lg space-y-6 text-sm md:border border-gray-200"
    >
      {/* currentPassword */}
      <div>
        <label htmlFor="passwordCurrent" className="block font-medium mb-1">
          Current Password (min 8 characters)
        </label>
        <FormInput
          type="password"
          id="passwordCurrent"
          disabled={isLoading}
          {...register("passwordCurrent", {
            required: "This Field is Required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors?.passwordCurrent && (
          <span className="text-red-600 text-sm">
            {errors.passwordCurrent.message}
          </span>
        )}
      </div>

      {/* newPassword */}
      <div>
        <label htmlFor="password" className="block font-medium mb-1">
          New Password (min 8 characters)
        </label>
        <FormInput
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This Field is Required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors?.password && (
          <span className="text-red-600 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="passwordConfirm" className="block font-medium mb-1">
          Repeat Password
        </label>
        <FormInput
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This Field is Required",
            validate: (value) =>
              value === getValues().password || "Passwords must match",
          })}
          
        />
        {errors?.passwordConfirm && (
          <span className="text-red-600 text-sm">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4  border-t border-gray-100">
        <button
          type="button"
          onClick={() => reset()}
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
          {isLoading ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
