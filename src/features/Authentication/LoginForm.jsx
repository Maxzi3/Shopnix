import { useState } from "react";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

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
    <form
      onSubmit={handleSubmit}
      className="p-10 bg-white w-[600px] mt-[50px] mx-auto flex flex-col justify-center border border-gray-200 rounded-lg "
    >
      {/* Email Input */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-lg font-medium mb-2">
          Email address
        </label>
        <input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-lg font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-black text-white rounded-md disabled:bg-gray-400"
        >
          {!isLoading ? (
            "Login"
          ) : (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
