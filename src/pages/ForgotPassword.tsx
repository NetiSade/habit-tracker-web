import { Link } from "react-router-dom";
import { useState } from "react";
import { authService } from "../auth/service/authService";

const LOG_TAG = "[FORGOT_PASSWORD_PAGE]";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(`${LOG_TAG} handleSubmit()`);
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = await authService.forgotPassword(email);
    console.log(`${LOG_TAG} forgotPassword() result:`, result);
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Forgot Password
        </h2>
        {isSubmitted ? (
          <div className="text-center">
            <p className="text-gray-700">
              If an account with that email exists, a password reset link is on
              its way.
            </p>
            <p className="mt-4">
              <Link to="/login" className="text-blue-500">
                Back to login
              </Link>
            </p>
          </div>
        ) : (
          <>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <p className="mb-4 text-gray-600">
              Enter your account email and we'll send you a link to reset your
              password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full rounded border p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send reset link"}
              </button>
            </form>
            <p className="mt-4 text-center">
              Remembered it?{" "}
              <Link to="/login" className="text-blue-500">
                Back to login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
