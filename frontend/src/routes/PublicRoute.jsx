import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Redirects already-logged-in users away from Login/Register pages.
export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
