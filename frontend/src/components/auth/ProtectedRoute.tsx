import { Navigate, Outlet } from "react-router-dom";
import {
  getCurrentUser,
  isAuthenticated,
  type UserRole,
} from "../../services/authService";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  if (!authenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    if (user.role === "CUSTOMER") {
      return (
        <Navigate
          to="/customer/dashboard"
          replace
        />
      );
    }

    if (user.role === "PROVIDER") {
      return (
        <Navigate
          to="/provider/dashboard"
          replace
        />
      );
    }

    if (user.role === "ADMIN") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;