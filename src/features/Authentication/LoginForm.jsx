import { useEffect, useRef, useState } from "react";
import { useLogin } from "./useLogin";
import { useResendEmail } from "./useResendEmail";
import { Link, useSearchParams } from "react-router-dom";
import SpinnerMini from "../../UI/SpinnerMini";
import FormInput from "../../UI/FormInput";
import toast from "react-hot-toast";


function LoginForm() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (toastShownRef.current) return;

    const isVerified = searchParams.get("verified");
    const alreadyVerified = searchParams.get("alreadyVerified");

    if (isVerified === "true") {
      toast.success("Your email has been verified. You can now log in!");
      toastShownRef.current = true;
    }

    if (alreadyVerified === "true") {
      toast.info("🔒 Email already verified. You can log in.");
      toastShownRef.current = true;
    }
  }, [searchParams]);

  const lastTriedEmailRef = useRef("");
  const { login, isLoading, error } = useLogin();
  const { resend, isLoading: isResending } = useResendEmail();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    lastTriedEmailRef.current = email;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  function handleResend() {
    if (lastTriedEmailRef.current) resend({ email: lastTriedEmailRef.current });
  }

  const showResend =
    error?.message === "Please verify your email before logging in.";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col justify-center md:p-10 rounded-lg space-y-6 text-sm md:border border-gray-200 md:w-[30rem] w-[20rem]"
      >
        {/* Email Input */}
        <div className="mb-3 flex flex-col items-center">
          <label
            htmlFor="email"
            className="block text-base font-medium mb-2 self-start"
          >
            Email address
          </label>
          <FormInput
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Password Input */}
        <div className="mb-3 flex flex-col items-center">
          <label
            htmlFor="password"
            className="block text-base font-medium mb-2 self-start"
          >
            Password
          </label>
          <FormInput
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-[150px] mt-2 py-3 rounded-md disabled:bg-gray-400 bg-black text-white  dark:bg-gray-100 dark:text-gray-800"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <SpinnerMini />
              </div>
            ) : (
              "Login"
            )}
          </button>

          {/* 🔁 Resend Button */}
          {showResend && (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="mt-4 text-blue-600 hover:underline"
            >
              {isResending ? "Resending..." : "Resend Verification Email"}
            </button>
          )}

          <p className="p-4 text-center">
            Need an account?{" "}
            <Link className="hover:text-blue-600" to="/signup">
              SignUp
            </Link>
          </p>
          <p className="text-center">
            Forgot Password? <Link to="/forgotpassword">Click here</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
