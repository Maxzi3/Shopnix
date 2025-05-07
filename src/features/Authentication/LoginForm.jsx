import { useState } from "react";
import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";
import SpinnerMini from "../../UI/SpinnerMini";
import FormInput from "../../UI/FormInput";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col justify-center md:p-10 py-8  rounded-lg  space-y-6 text-sm md:border border-gray-200 md:w-[30rem] w-[20rem]"
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
            disabled={isLoading}
            className="w-[150px]  mt-2 py-3 bg-black text-white rounded-md disabled:bg-gray-400"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <SpinnerMini />
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p className="p-4 text-center">
            Need an account?{" "}
            <Link className="hover:text-blue-600" to="/signup">
              SignUp
            </Link>
          </p>
          <p className=" text-center">
            Forgot Password? <Link to="/forgotpassword">Click here</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
