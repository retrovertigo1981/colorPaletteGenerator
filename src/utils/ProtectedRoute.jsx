import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return children;
}
