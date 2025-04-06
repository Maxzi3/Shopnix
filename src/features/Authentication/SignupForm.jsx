import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import Spinner from "../../UI/Spinner";

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();

  const onSubmit = ({ fullName, email, password, passwordConfirm }) => {
    signup(
      { fullName, email, password, passwordConfirm},
      {
        onSettled: () => reset(),
      }
    );
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white  w-[600px] mx-auto  flex flex-col justify-center p-10 rounded-lg border border-gray-200  space-y-2 text-sm"
    >
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block font-medium mb-1">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This Field is Required" })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors?.fullName && (
          <span className="text-red-600 text-sm">
            {errors.fullName.message}
          </span>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This Field is Required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors?.email && (
          <span className="text-red-600 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block font-medium mb-1">
          Password (min 8 characters)
        </label>
        <input
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
          className="w-full p-2 border border-gray-300 rounded-md"
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
          Repeat password
        </label>
        <input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This Field is Required",
            validate: (value) =>
              value === getValues().password || "Password needs to match",
          })}
          className="w-full p-2 border border-gray-300 rounded-md"
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
          Sign up
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
