import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useEmailVerification } from "../features/Authentication/useEmailVerification";
import Logo from "../UI/Logo";
import SpinnerMini from "../UI/SpinnerMini";

function EmailVerificationPage() {
  const { token } = useParams();
  const { verify, isLoading } = useEmailVerification();
  const hasVerified = useRef(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (token && !hasVerified.current) {
      verify(
        { token },
        {
          onError: (err) => {
            setError(err.message || "Email verification failed");
          },
        }
      );
      hasVerified.current = true;
    }
  }, [token, verify]);

  return (
    <div className="my-20 flex items-center justify-center px-4 flex-col gap-10 space-x-4 space-y-5 bg-white dark:bg-gray-900 dark:text-white text-gray-700">
      <Logo />
      <div className="p-6 rounded-md w-full max-w-md text-center">
        <h1 className="text-xl font-semibold mb-4">
          {isLoading ? (
            "Verifying your email..."
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p className="text-green-800">Verification Complete</p>
          )}
        </h1>
        {isLoading && (
          <p>
            Please wait a moment.
            <span className="flex justify-center">
              <SpinnerMini />
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default EmailVerificationPage;
