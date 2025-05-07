import { useState } from "react";
import { useForgotPassword } from "./useForgotPassword";
import { Link } from "react-router-dom";
import SpinnerMini from "../../UI/SpinnerMini";
import FormInput from "../../UI/FormInput";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { sendResetEmail, isPending } = useForgotPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    sendResetEmail(
      { email },
      {
        onSettled: () => {
          // ✅ Clear the input after success or error
          setEmail("");
        },
      }
    );
  }

  return (
    <form className="p-10 mx-auto flex flex-col justify-center md:border border-gray-200 rounded-lg space-y-2 text-sm">
      {/* Email Input */}
      <div className="mb-3">
        <label htmlFor="email" className="block text-base font-medium mb-2">
          Email address
        </label>
        <FormInput
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isPending || !email}
          onClick={handleSubmit}
          className="w-[150px] mx-[100px] mt-2 py-3 bg-black text-white dark:bg-gray-100 dark:text-gray-800  rounded-md disabled:bg-gray-400"
        >
          {isPending ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Send Reset Email"
          )}
        </button>

        <p className="p-4 text-center">
          Need an account?{" "}
          <Link className="hover:text-blue-600" to="/signup">
            SignUp
          </Link>
        </p>
        <p className="text-center">
          Login?{" "}
          <Link className="hover:text-blue-600" to="/login">
            Click here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
