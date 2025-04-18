import { useState } from "react";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { Link } from "react-router-dom";

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
        className="bg-white  mx-auto flex flex-col justify-center p-8 rounded-lg  space-y-6 text-sm md:border border-gray-200"
      >
        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="block text-base font-medium mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-[350px] p-[10px] border border-gray-300 rounded-md"
          />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-base font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="w-[350px] p-[10px] border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-[150px] mx-[100px] mt-2 py-3 bg-black text-white rounded-md disabled:bg-gray-400"
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
