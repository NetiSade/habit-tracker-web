import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/home/Home";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from "./auth/context/useAuth";
import SignupPage from "./pages/Signup";
import { HabitsProvider } from "./habits/context/HabitsContext";
import HabitPerformanceDashboard from "./pages/dashboard/Dashboard";

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <div>Loading...</div>; // TODO: Replace with loading component
  }

  return (
    <HabitsProvider>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<HabitPerformanceDashboard />} />

          {/* Add more protected routes here */}
        </Route>

        {/* Redirect root to home or login based on auth status */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
          }
        />
      </Routes>
    </HabitsProvider>
  );
};

export default AppRoutes;
