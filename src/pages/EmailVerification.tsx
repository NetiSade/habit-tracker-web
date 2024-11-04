import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const verifyEmail = async () => {
      console.log("verify email called");
      const token = searchParams.get("token");

      if (!token) {
        //redirect to '/'
        navigate("/", { replace: true });
        return;
      }

      try {
        const baseUrl = import.meta.env.VITE_API_URL;

        const res = await axios({
          method: "post",
          url: `${baseUrl}/auth/verify-email`,
          data: { token },
          withCredentials: true, // Include cookies or auth headers if needed
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("res", res.data);

        setVerificationStatus("success");
      } catch (error) {
        console.error(error);
        setVerificationStatus("error");
        setError("Failed to verify email. Link may have expired.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {verificationStatus === "verifying" && (
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
            <h2 className="mt-4 text-xl font-semibold text-gray-700">
              Verifying your email...
            </h2>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-700">
              Email Verified Successfully!
            </h2>
            <p className="mt-2 text-gray-500">
              Your email has been verified. You can now proceed to login in the
              app.
            </p>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-700">
              Verification Failed
            </h2>
            <p className="mt-2 text-sm text-red-500">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
