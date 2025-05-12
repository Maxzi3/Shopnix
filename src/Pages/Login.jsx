import LoginForm from "../features/Authentication/LoginForm";
import Logo from "../UI/Logo";

function Login() {
  return (
    <main className="flex flex-col py-14 h-screen bg-white dark:bg-gray-900 dark:text-white text-gray-700 px-4 overflow-hidden">
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
