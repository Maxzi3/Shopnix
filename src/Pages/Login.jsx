import LoginForm from "../features/Authentication/LoginForm";
import Logo from "../UI/Logo";

function Login() {
  return (
    <main className="min-h-screen grid place-content-center bg-white  dark:bg-gray-900 text-black dark:text-white gap-8 px-4">
      <div className="flex flex-col items-center space-y-5">
        <Logo />
        <h4 className="text-2xl text-center font-semibold">
          Login To Your Account
        </h4>
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
