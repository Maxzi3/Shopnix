import ForgotPasswordForm from "../features/Authentication/ForgotPasswordForm";
import Logo from "../UI/Logo";

function ForgotPassword() {
  return (
    <main
      className="grid h-screen px-4 text-gray-700 bg-white place-content-center dark:bg-gray-900 dark:text-white"
    >
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <h4 className="text-xl font-semibold text-center">Forgot Password?</h4>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}

export default ForgotPassword;
