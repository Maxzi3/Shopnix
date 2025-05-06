import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEmailVerification } from "../features/Authentication/useEmailVerification";
import Logo from "../UI/Logo";
import SpinnerMini from "../ui/SpinnerMini";

function EmailVerificationPage() {
  const { token } = useParams();
  const { verify, isLoading } = useEmailVerification();

  useEffect(() => {
    if (token) verify({ token });
  }, [token, verify]);

  return (
    <div className=" my-20 flex items-center justify-center px-4 flex-col gap-10 space-x-4 space-y-5">
      <Logo />
      <div className="bg-white shadow-lg p-6 rounded-md w-full max-w-md text-center">
        <h1 className="text-xl font-semibold mb-4 ">
          {isLoading ? (
            "Verifying your email..."
          ) : (
            <p className="text-green-800">Verification Complete</p>
          )}
        </h1>
        {isLoading && (
          <p>
            Please wait a moment.{" "}
            <span className="flex justify-center">
              <SpinnerMini />
            </span>{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmailVerificationPage;
