import SignupForm from "../features/Authentication/SignupForm";
import Logo from "../UI/Logo";

function Signup() {
  return (
    <main className="grid min-h-screen gap-8 p-8 text-gray-700 bg-white place-content-center dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col items-center space-y-5">
        <Logo />
        <h4 className="text-2xl font-semibold text-center">
          Sign-In To Your Account
        </h4>
        <SignupForm />
      </div>
    </main>
  );
}

export default Signup;
