import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import Spinner from "../../UI/Spinner";
import { Link } from "react-router-dom";
import SpinnerMini from "../../UI/SpinnerMini";
import FormInput from "../../UI/FormInput";



function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();

  const onSubmit = ({ fullName, email,phoneNumber, password, passwordConfirm }) => {
    signup(
      { fullName, email,phoneNumber, password, passwordConfirm},
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center md:p-8 py-8 rounded-lg md:border border-gray-200 text-sm md:w-[30rem] w-[20rem]"
    >
      {/* Full Name */}
      <div className="mb-3 flex flex-col items-center">
        <label
          htmlFor="fullName"
          className="block text-base font-medium mb-1 self-start"
        >
          Full name
        </label>
        <FormInput
          type="text"
          id="fullName"
          disabled={isLoading}
          placeholder="John Doe"
          {...register("fullName", { required: "This Field is Required" })}
        />
        {errors?.fullName && (
          <span className="text-red-600 text-sm self-start">
            {errors.fullName.message}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="mb-3 flex flex-col items-center">
        <label
          htmlFor="email"
          className="block text-base font-medium mb-1 self-start"
        >
          Email address
        </label>
        <FormInput
          type="email"
          id="email"
          placeholder="johndoe@email.com"
          disabled={isLoading}
          {...register("email", {
            required: "This Field is Required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
        {errors?.email && (
          <span className="text-red-600 text-sm self-start">
            {errors.email.message}
          </span>
        )}
      </div>
      {/* Phone Number*/}
      <div className="mb-3 flex flex-col items-center">
        <label
          htmlFor="phoneNumber"
          className="block text-base font-medium mb-1 self-start"
        >
          Phone Number
        </label>
        <FormInput
          type="text"
          id="phoneNumber"
          placeholder="+1234567890"
          disabled={isLoading}
          {...register("phoneNumber", { required: "This Field is Required" })}
        />
        {errors?.phoneNumber && (
          <span className="text-red-600 text-sm self-start">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>
      {/* Password */}
      <div className="mb-3 flex flex-col items-center">
        <label
          htmlFor="password"
          className="block text-base font-medium mb-1 self-start"
        >
          Password (min 8 characters)
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
          <span className="text-red-600 text-sm self-start">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-3 flex flex-col items-center">
        <label
          htmlFor="passwordConfirm"
          className="block text-base font-medium mb-1 self-start"
        >
          Repeat password
        </label>
        <FormInput
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This Field is Required",
            validate: (value) =>
              value === getValues().password || "Password needs to match",
          })}
        />
        {errors?.passwordConfirm && (
          <span className="text-red-600 text-sm self-start">
            {errors.passwordConfirm.message}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center pt-2 border-gray-100">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-3 w-[150px] bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 dark:bg-gray-100 dark:text-gray-800 "
        >
          {isLoading ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Signup"
          )}
        </button>
        <p className="py-2 ">
          Have an account?{" "}
          <Link className="hover:text-blue-600" to="/login">
            LogIn
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
