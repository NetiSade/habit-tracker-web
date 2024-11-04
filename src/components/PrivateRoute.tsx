import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

export const PrivateRoute = ({
  isAuthenticated,
  redirectPath = "/login",
}: PrivateRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
