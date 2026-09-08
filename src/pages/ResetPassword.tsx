import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { authService } from "../auth/service/authService";

const LOG_TAG = "[RESET_PASSWORD_PAGE]";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(`${LOG_TAG} handleSubmit()`);
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Missing reset token. Please use the link from your email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await authService.resetPassword(token, password);
    console.log(`${LOG_TAG} resetPassword() result:`, result);
    setIsSubmitting(false);
    if (result.success) {
      setIsDone(true);
    } else {
      setError(
        "Couldn't reset the password. The link may have expired - request a new one.",
      );
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Reset Password
          </h2>
          <p className="text-center text-gray-700">
            This reset link is invalid. Please request a new one.
          </p>
          <p className="mt-4 text-center">
            <Link to="/forgot-password" className="text-blue-500">
              Forgot password
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Reset Password</h2>
        {isDone ? (
          <div className="text-center">
            <p className="text-gray-700">
              Your password was reset successfully. You can now log in with the
              new password.
            </p>
            <button
              className="mt-6 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
              onClick={() => navigate("/login")}
            >
              Go to login
            </button>
          </div>
        ) : (
          <>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="mt-1 w-full rounded border p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700"
                >
                  Confirm new password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="mt-1 w-full rounded border p-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? "Resetting..." : "Reset password"}
              </button>
            </form>
            <p className="mt-4 text-center">
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

export default ResetPasswordPage;
