import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Spinner } from "../components/UI/Spinner";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" />;

  return children;
}
