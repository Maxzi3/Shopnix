import { useParams } from "react-router-dom";
import { useState } from "react";
import { useResetPassword } from "../features/Authentication/useResetPassword";
import Logo from "../UI/Logo";
import SpinnerMini from "../UI/SpinnerMini";


function ResetPasswordPage() {
  const { token } = useParams();
  const { reset, isLoading } = useResetPassword();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    reset({ token, password, passwordConfirm });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 flex-col space-x-4 space-y-5">
      <Logo />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-5 text-center">
          Reset Password
        </h2>

        <span className="block mb-2">
          <label htmlFor="password" className="text-sm">
            New Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border px-3 py-2 rounded-md"
          />
        </span>

        <span className="block mb-4">
          <label htmlFor="confirmpasword" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmpasword"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="mt-1 block w-full border px-3 py-2 rounded-md"
          />
        </span>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          {isLoading ? <SpinnerMini /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
