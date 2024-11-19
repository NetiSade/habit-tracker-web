import React, { useState } from "react";
import { useAuth } from "../auth/context/useAuth";

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signup(email, email, password);

    if (result.success) {
      // show success dialog - Please check your email to verify your account.
      setSuccess(true);
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>
        {error && !success && <p className="mb-4 text-red-500">{error}</p>}
        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full rounded border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        )}
        {success && (
          <p className="text-green-600">
            Registration Successful! Please check your email to verify your
            account
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
