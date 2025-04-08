import SignupForm from "../features/Authentication/SignupForm";
import Logo from "../UI/Logo";

function Signup() {
  return (
    <main className="min-h-screen grid place-content-center bg-white gap-8 px-4">
      <div className="flex flex-col items-center space-y-5">
        <Logo />
        <h4 className="text-2xl text-center font-semibold">
          Sign-In To Your Account
        </h4>
        <SignupForm />
      </div>
    </main>
  );
}

export default Signup;
