import Button from "./Button";

const ErrorFallback = () => {
  return (
    <main className="h-screen  bg-white dark:bg-gray-900 dark:text-white text-gray-700 flex items-center justify-center p-12">
      <div className="bg-grey-0 border border-grey-100 rounded-md p-12 max-w-4xl w-full text-center">
        <h1 className="mb-4">Something went wrong</h1>
        <p className="font-sono mb-8 text-grey-500">
          Please try refreshing the page or go back home.
        </p>
        <Button variant="primary" size="large" onClick={() => window.location.replace("/")}>
          Try Again
        </Button>
      </div>
    </main>
  );
};

export default ErrorFallback;
