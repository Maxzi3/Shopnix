import ForgotPasswordForm from "../features/Authentication/ForgotPasswordForm";
import Logo from "../UI/Logo";

function ForgotPassword() {
  return (
    <main
      className="min-h-screen grid place-content-center bg-white dark:bg-gray-900 dark:text-white text-gray-700 gap-8 px-4"
    >
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <h4 className="text-xl text-center font-semibold">Forgot Password?</h4>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}

export default ForgotPassword;
