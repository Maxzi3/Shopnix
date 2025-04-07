import ForgotPasswordForm from "../features/Authentication/ForgotPasswordForm";
import Logo from "../UI/Logo";

function ForgotPassword() {
  return (
    <main className="min-h-screen grid place-content-center bg-gray-50 gap-8 px-4">
      <div className="flex flex-col items-center space-y-5">
        <Logo />
        <h4 className="text-2xl text-center font-semibold">
          Login To Your Account
        </h4>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}

export default ForgotPassword;
